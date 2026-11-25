// Accounts: sign in, create an account, keep progress in step across devices.
//
// Studying never needs an account. Progress always lives on the device first (localStorage); signing in
// adds an online copy, merged with whatever this device already has. If the sign-in service cannot be
// reached, the app carries on exactly as it did before.
import { supportUrl } from './cloud-config.js';
import { cloudConfigured, fetchRemote, friendlyError, getClient, hasAuthTraces, removeAccount, saveRemote } from './cloud.js';
import { mergeProgress, sameProgress } from './merge.js';
import { setHidden, swapText } from './motion.js';

const ownerKey = 'study-circuit:owner';
const minPassword = 8;
const syncDelay = 3000;
const focusSyncGap = 30000;
const timeFormat = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function remember(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch { /* storage blocked: nothing to remember */ }
}

function recall(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function createAccount(ctx) {
  const { main, state } = ctx;
  // status: off (accounts not configured) | loading | out | in | recovery | unavailable
  const account = { status: cloudConfigured ? 'out' : 'off', user: null, mode: 'signin', notice: null, sync: 'idle', syncedAt: 0 };
  let ready = null;
  let client = null;
  let timer = 0;
  let running = null;
  let runAgain = false;
  let lastSync = 0;
  let dirty = false;

  const onAccountRoute = () => location.hash.startsWith('#/account');
  const signedIn = () => account.status === 'in' || account.status === 'recovery';

  // ---------- The sign-in service ----------
  function ensureClient() {
    ready ??= getClient()
      .then(created => {
        client = created;
        created.auth.onAuthStateChange((event, session) => setTimeout(() => onAuth(event, session), 0));
        return created;
      })
      .catch(error => {
        ready = null;
        throw error;
      });
    return ready;
  }

  function onAuth(event, session) {
    const user = session?.user ?? null;
    if (!user) {
      if (account.status !== 'out' && account.status !== 'unavailable') {
        account.user = null;
        account.status = 'out';
        account.sync = 'idle';
        account.mode = 'signin';
        changed();
      }
      return;
    }
    const wasSignedInAs = signedIn() && account.user?.id === user.id;
    account.user = user;
    if (event === 'PASSWORD_RECOVERY') {
      account.status = 'recovery';
      account.notice = null;
      if (!onAccountRoute()) history.replaceState(null, '', `${location.pathname}#/account`);
      changed(true);
      return;
    }
    if (wasSignedInAs) {
      // The same student again (tab refocus, token refresh): keep the form they may be typing in.
      updateUi();
      runSync();
      return;
    }
    account.status = 'in';
    account.notice = null;
    account.mode = 'signin';
    changed(true);
    adoptSession(user);
  }

  async function adoptSession(user) {
    const owner = recall(ownerKey);
    if (owner && owner !== user.id) {
      // Left over from a different student on a shared device: it must not flow into this account.
      ctx.replaceState(ctx.blankState());
      ctx.persistRemote();
      ctx.render();
    }
    remember(ownerKey, user.id);
    await runSync({ force: true });
  }

  // ---------- Sync ----------
  function scheduleSync() {
    if (account.status !== 'in') return;
    dirty = true;
    clearTimeout(timer);
    timer = setTimeout(() => runSync({ force: true }), syncDelay);
  }

  function runSync({ force = false } = {}) {
    if (account.status !== 'in') return Promise.resolve();
    if (!force && Date.now() - lastSync < focusSyncGap) return Promise.resolve();
    if (running) {
      runAgain = true;
      return running;
    }
    clearTimeout(timer);
    running = doSync().finally(() => {
      running = null;
      if (runAgain) {
        runAgain = false;
        runSync({ force: true });
      }
    });
    return running;
  }

  async function doSync() {
    account.sync = 'syncing';
    updateUi();
    try {
      const active = await ensureClient();
      const userId = account.user.id;
      const row = await fetchRemote(active, userId);
      const remote = row ? ctx.cleanState(row.state) : null;
      // A row this version cannot read (written by a newer app) is never overwritten.
      if (row && !remote) throw new Error('unreadable progress');
      const merged = remote ? mergeProgress(state, remote) : structuredClone(state);
      if (!sameProgress(merged, state)) {
        ctx.replaceState(merged);
        ctx.persistRemote();
        ctx.render();
      }
      if (!remote || !sameProgress(merged, remote)) await saveRemote(active, userId, merged);
      account.sync = 'synced';
      account.syncedAt = Date.now();
      lastSync = account.syncedAt;
      dirty = false;
    } catch (error) {
      // The progress table does not exist yet (the one-time database setup has not been run): not a fault to retry loudly.
      account.sync = error?.code === 'PGRST205' || error?.code === '42P01' ? 'setup' : navigator.onLine ? 'error' : 'offline';
    }
    updateUi();
  }

  function syncText() {
    switch (account.sync) {
      case 'syncing': return 'Syncing your progress…';
      case 'synced': return `Synced at ${timeFormat.format(account.syncedAt)}.`;
      case 'offline': return 'Offline. Your progress syncs when you are back online.';
      case 'setup': return 'Online sync is not switched on yet. Your progress is saved on this device.';
      case 'error': return 'Could not sync just now. It is saved on this device and will try again.';
      default: return 'Waiting to sync.';
    }
  }

  function storageText(deviceOk) {
    if (account.status === 'in') {
      return {
        syncing: 'Syncing your progress…',
        synced: 'Progress synced to your account.',
        offline: 'Offline. Progress syncs later.',
        error: 'Sync paused. Progress is saved on this device.',
        setup: 'Progress is saved on this device.',
      }[account.sync] ?? 'Signed in. Progress syncs to your account.';
    }
    return deviceOk ? 'Progress is saved on this device.' : 'Progress is available for this visit only.';
  }

  // ---------- Updating the page ----------
  function updateUi() {
    for (const link of document.querySelectorAll('[data-account-link]')) {
      link.hidden = !cloudConfigured;
      link.classList.toggle('is-signed-in', signedIn());
    }
    const label = signedIn() || (account.status === 'loading') ? 'Account' : 'Sign in';
    for (const slot of document.querySelectorAll('[data-account-label]')) swapText(slot, label);
    for (const slot of document.querySelectorAll('[data-sync-status]')) swapText(slot, syncText());
    ctx.showStorage();
  }

  // A change of who is signed in: refresh the links, and the page if it is the account page.
  function changed(moveFocus = false) {
    updateUi();
    if (onAccountRoute()) {
      ctx.render(moveFocus);
      if (moveFocus) ctx.announce(account.status === 'in' ? 'Signed in.' : account.status === 'recovery' ? 'Choose a new password.' : 'Signed out.');
    }
  }

  // ---------- Pages ----------
  function notice() {
    if (!account.notice) return '';
    const { text, email } = account.notice;
    return `<p class="account-notice" role="status" tabindex="-1">${email ? `${text.replace('{email}', `<strong>${esc(email)}</strong>`)}` : text}</p>`;
  }

  function field({ label, name, type = 'text', autocomplete, hint = '' }) {
    const attrs = type === 'email' ? ' inputmode="email" autocapitalize="none" spellcheck="false"' : type === 'password' ? ' autocapitalize="none" spellcheck="false"' : '';
    return `<label class="field"><span class="field-label">${label}</span><input class="field-input" type="${type}" name="${name}" autocomplete="${autocomplete}"${attrs} required>${hint ? `<span class="field-hint">${hint}</span>` : ''}</label>`;
  }

  const showPassword = '<label class="check-line"><input type="checkbox" data-show-password><span>Show password</span></label>';
  const formError = '<p class="selection-error" data-form-error hidden role="alert"></p>';

  function modeSwitch() {
    return `<div class="account-switch" role="group" aria-label="Sign in or create an account">
      <button type="button" data-account-action="mode" data-mode="signin" aria-pressed="${account.mode === 'signin'}">Sign in</button>
      <button type="button" data-account-action="mode" data-mode="signup" aria-pressed="${account.mode === 'signup'}">Create account</button>
    </div>`;
  }

  function signedOutForm() {
    if (account.mode === 'reset') {
      return `<form class="account-form" data-account-form="reset" novalidate aria-label="Reset your password">
        <p class="account-lead">Enter your email and we will send you a link to choose a new password.</p>
        ${field({ label: 'Email', name: 'email', type: 'email', autocomplete: 'email' })}
        ${formError}
        <div class="account-actions">
          <button type="submit" class="button primary">Send reset link</button>
          <button type="button" class="button secondary" data-account-action="mode" data-mode="signin">Back to sign in</button>
        </div>
      </form>`;
    }
    if (account.mode === 'signup') {
      return `${modeSwitch()}
      <form class="account-form" data-account-form="signup" novalidate aria-label="Create an account">
        ${field({ label: 'Email', name: 'email', type: 'email', autocomplete: 'email' })}
        ${field({ label: 'Password', name: 'password', type: 'password', autocomplete: 'new-password', hint: `At least ${minPassword} characters.` })}
        ${showPassword}
        ${formError}
        <div class="account-actions"><button type="submit" class="button primary">Create account${ctx.icon('arrow')}</button></div>
        <p class="account-fine">You need to be 13 or older. Progress on this device joins your account the first time you sign in.</p>
      </form>`;
    }
    return `${modeSwitch()}
      <form class="account-form" data-account-form="signin" novalidate aria-label="Sign in">
        ${field({ label: 'Email', name: 'email', type: 'email', autocomplete: 'email' })}
        ${field({ label: 'Password', name: 'password', type: 'password', autocomplete: 'current-password' })}
        ${showPassword}
        ${formError}
        <div class="account-actions">
          <button type="submit" class="button primary">Sign in${ctx.icon('arrow')}</button>
          <button type="button" class="account-textbutton" data-account-action="mode" data-mode="reset">Forgot your password?</button>
        </div>
        <p class="account-fine">Progress on this device joins your account the first time you sign in.</p>
      </form>`;
  }

  const privacy = `<details class="account-details">
    <summary>What we keep${ctx.icon('chevron')}</summary>
    <p>Your email address, your password (stored scrambled, so nobody can read it) and your progress: answers, saved questions and finished rounds. We use them to sign you in and keep your devices in step, and for nothing else. You can delete all of it at any time from this page.</p>
    <p>The site also counts visits with Cloudflare Web Analytics, which does not use cookies and does not follow people from site to site.</p>
  </details>`;

  const support = `<section class="account-support" aria-labelledby="support-heading">
    <h2 id="support-heading">Support Study Circuit</h2>
    <p>It is free and has no adverts. If it helps your revision, a coffee helps keep it going.</p>
    <a class="button secondary" href="${supportUrl}" target="_blank" rel="noopener noreferrer">${ctx.icon('coffee')}Buy me a coffee</a>
  </section>`;

  function page() {
    const lead = 'Keep your progress on every device. Studying works without one, so this is optional.';
    switch (account.status) {
      case 'loading':
        return `${ctx.heading('Account', lead)}<p class="account-lead" role="status">Checking your sign-in…</p>${support}`;
      case 'unavailable':
        return `${ctx.heading('Account', lead)}${notice()}
          <p class="account-lead">Sign-in could not load. Check your connection and refresh the page. Your progress is still saved on this device.</p>${support}`;
      case 'recovery':
        return `${ctx.heading('Choose a new password', 'You followed a reset link, so you are signed in. Pick a new password to finish.')}
          <section class="account-panel" aria-label="New password">
            <form class="account-form" data-account-form="newpassword" novalidate>
              ${field({ label: 'New password', name: 'password', type: 'password', autocomplete: 'new-password', hint: `At least ${minPassword} characters.` })}
              ${showPassword}
              ${formError}
              <div class="account-actions"><button type="submit" class="button primary">Save password</button></div>
            </form>
          </section>`;
      case 'in':
        return `${ctx.heading('Account', `Signed in as <strong>${esc(account.user?.email ?? 'your account')}</strong>.`)}
          <div class="account-panel">
            ${notice()}
            <section class="account-card" aria-labelledby="sync-heading">
              <h2 id="sync-heading">Your progress</h2>
              <p class="account-lead" data-sync-status role="status">${syncText()}</p>
              <p class="account-fine">Your answers, saved questions and rounds follow you to any device you sign in on.</p>
              <div class="account-actions">
                <button type="button" class="button secondary" data-account-action="sync">Sync now</button>
                <button type="button" class="button secondary" data-account-action="signout">Sign out</button>
              </div>
              ${formError}
              <p class="account-fine">Signing out removes your progress from this device. It stays in your account.</p>
            </section>
            <details class="account-details">
              <summary>Change password${ctx.icon('chevron')}</summary>
              <form class="account-form" data-account-form="changepassword" novalidate aria-label="Change password">
                ${field({ label: 'New password', name: 'password', type: 'password', autocomplete: 'new-password', hint: `At least ${minPassword} characters.` })}
                ${showPassword}
                ${formError}
                <div class="account-actions"><button type="submit" class="button secondary">Change password</button></div>
              </form>
            </details>
            <details class="account-details">
              <summary>Delete my account${ctx.icon('chevron')}</summary>
              <p>This permanently deletes your login and the online copy of your progress. Progress on this device stays here.</p>
              <p class="selection-error" data-form-error hidden role="alert"></p>
              <div class="account-actions"><button type="button" class="button secondary danger" data-account-action="delete">Delete everything</button></div>
            </details>
            ${privacy}
          </div>${support}`;
      default:
        return `${ctx.heading('Account', lead)}
          <div class="account-panel">
            ${notice()}
            ${signedOutForm()}
            ${privacy}
          </div>${support}`;
    }
  }

  // ---------- Forms and buttons ----------
  function showError(scope, text) {
    const slot = scope.querySelector('[data-form-error]');
    if (!slot) return;
    // A new message unfolds, a changed one cross-fades, and a cleared one folds away (keeping its words until it has).
    if (!text) {
      setHidden(slot, true);
    } else if (slot.hidden) {
      slot.textContent = text;
      setHidden(slot, false);
    } else {
      swapText(slot, text);
    }
  }

  async function submitForm(form) {
    const kind = form.dataset.accountForm;
    const emailInput = form.elements.email;
    const passwordInput = form.elements.password;
    const email = emailInput?.value.trim() ?? '';
    const password = passwordInput?.value ?? '';
    const stop = (text, field) => {
      showError(form, text);
      field?.focus();
    };
    if (emailInput && !/^\S+@\S+\.\S+$/.test(email)) return stop('Enter your email address.', emailInput);
    if (passwordInput && !password) return stop('Enter your password.', passwordInput);
    if (kind !== 'signin' && passwordInput && password.length < minPassword) return stop(`Use at least ${minPassword} characters.`, passwordInput);

    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    showError(form, '');
    try {
      const active = await ensureClient();
      // The app's own folder, wherever it is hosted (a github.io project page lives under /studycircuit/).
      const here = new URL('./', location.href).href;
      if (kind === 'signin') {
        const { error } = await active.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (kind === 'signup') {
        const { data, error } = await active.auth.signUp({ email, password, options: { emailRedirectTo: here } });
        if (error) throw error;
        if (!data.session) {
          // Same words whether or not the address already has an account, so this form never reveals who does.
          account.notice = { text: 'If {email} is new here, we have sent it a link. Open it to confirm, then sign in. If you already have an account, sign in instead.', email };
          account.mode = 'signin';
          ctx.render(true);
          ctx.announce('Check your email for a confirmation link.');
        }
      } else if (kind === 'reset') {
        const { error } = await active.auth.resetPasswordForEmail(email, { redirectTo: here });
        if (error) throw error;
        account.notice = { text: 'If there is an account for {email}, a link to choose a new password is on its way.', email };
        account.mode = 'signin';
        ctx.render(true);
        ctx.announce('If there is an account for that email, a reset link is on its way.');
      } else {
        const { error } = await active.auth.updateUser({ password });
        if (error) throw error;
        account.status = 'in';
        account.notice = { text: 'Password changed.' };
        ctx.render(true);
        ctx.announce('Password changed.');
        runSync({ force: true });
      }
    } catch (error) {
      stop(friendlyError(error));
    } finally {
      submit.disabled = false;
    }
  }

  async function signOut() {
    try {
      const active = await ensureClient();
      if (running) await running;
      await runSync({ force: true });
      // Only clear this device once the online copy is known to be complete.
      const safe = account.sync === 'synced';
      clearTimeout(timer);
      const kept = account.sync === 'setup' ? 'Signed out. Online sync is not switched on yet, so your progress stays on this device.' : 'Signed out. Some progress could not be synced, so it stays on this device.';
      account.notice = { text: safe ? 'Signed out. Your progress is saved in your account.' : kept };
      await active.auth.signOut();
      if (safe) {
        ctx.replaceState(ctx.blankState());
        ctx.persistRemote();
        remember(ownerKey, null);
        ctx.render();
      }
    } catch (error) {
      showError(main.querySelector('.account-card'), friendlyError(error));
    }
  }

  async function deleteAccount(button) {
    button.disabled = true;
    try {
      const active = await ensureClient();
      await removeAccount(active);
      clearTimeout(timer);
      account.notice = { text: 'Your account and its online copy of your progress are deleted. Progress on this device is still here.' };
      await active.auth.signOut({ scope: 'local' });
      remember(ownerKey, null);
    } catch (error) {
      showError(button.closest('.account-details'), friendlyError(error));
      button.disabled = false;
    }
  }

  main.addEventListener('submit', event => {
    const form = event.target.closest('[data-account-form]');
    if (!form) return;
    event.preventDefault();
    submitForm(form);
  });

  main.addEventListener('change', event => {
    if (!event.target.matches('[data-show-password]')) return;
    for (const input of event.target.form.querySelectorAll('input[name="password"]')) input.type = event.target.checked ? 'text' : 'password';
  });

  main.addEventListener('click', event => {
    const button = event.target.closest('[data-account-action]');
    if (!button) return;
    const action = button.dataset.accountAction;
    if (action === 'mode') {
      account.mode = button.dataset.mode;
      account.notice = null;
      ctx.render().then(() => main.querySelector('.account-form input')?.focus());
    } else if (action === 'sync') {
      runSync({ force: true });
    } else if (action === 'signout') {
      signOut();
    } else if (action === 'delete') {
      deleteAccount(button);
    }
  });

  // ---------- Starting up ----------
  function readLinkError() {
    const fromHash = location.hash.startsWith('#error');
    const params = new URLSearchParams(fromHash ? location.hash.slice(1) : location.search);
    if (!params.get('error') && !params.get('error_description')) return;
    account.notice = { text: 'That link has expired or was already used. Ask for a new one and open it on the same device.' };
    account.mode = 'signin';
    history.replaceState(null, '', `${location.pathname}#/account`);
  }

  function start() {
    updateUi();
    if (!cloudConfigured) return;
    readLinkError();
    if (hasAuthTraces()) {
      account.status = 'loading';
      updateUi();
      ensureClient().catch(() => {
        account.status = 'unavailable';
        changed();
      });
    }
    // Opening the account page warms up the sign-in service so the form answers quickly.
    const warm = () => {
      if (onAccountRoute() && !ready) ensureClient().catch(() => {});
    };
    window.addEventListener('hashchange', warm);
    warm();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        if (dirty) runSync({ force: true });
      } else {
        runSync();
      }
    });
    window.addEventListener('online', () => runSync({ force: true }));
  }

  return {
    enabled: cloudConfigured,
    start,
    page,
    scheduleSync,
    storageText,
    hint() {
      if (account.status === 'in') return 'Your progress is saved on this device and synced to your account.';
      if (cloudConfigured) return 'Your progress is saved on this device. <a class="text-link" href="#/account">Create a free account</a> to keep it on every device.';
      return 'Your progress is saved on this device. No account needed.';
    },
  };
}
