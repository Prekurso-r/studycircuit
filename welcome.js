// The first visit: a greeting where students pick their subjects, then one question about how they found the app.
// The page markup, the live map that lights as subjects are chosen, and the anonymous survey answer live here.
import { supabaseUrl, supabasePublishableKey } from './cloud-config.js';

export const skippedAnswer = 'skipped';

// [stored value, label]. The stored value is what the survey table accepts (see supabase/schema.sql).
export const heardOptions = [
  ['friend', 'A friend or classmate'],
  ['teacher', 'A teacher or tutor'],
  ['telegram', 'Telegram'],
  ['whatsapp', 'WhatsApp'],
  ['tiktok', 'TikTok'],
  ['instagram', 'Instagram'],
  ['facebook', 'Facebook'],
  ['youtube', 'YouTube'],
  ['search', 'Searching online'],
  ['other', 'Somewhere else'],
];
export const heardIds = new Set(heardOptions.map(([id]) => id));

const pendingKey = 'study-circuit:heard-pending';

// One anonymous row: just the choice. No name, no email, nothing that says who chose it.
async function postAnswer(source) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/heard_from`, {
      method: 'POST',
      headers: { apikey: supabasePublishableKey, 'content-type': 'application/json', prefer: 'return=minimal' },
      body: JSON.stringify({ source }),
      keepalive: true,
    });
    return response.ok;
  } catch {
    return false;
  }
}

// An answer that could not be sent (offline) is kept on the device and tried again next time the app opens.
async function sendAnswer(source) {
  if (await postAnswer(source)) return;
  try { localStorage.setItem(pendingKey, source); } catch { /* storage blocked: the answer is simply lost */ }
}

async function sendPending() {
  let source = null;
  try { source = localStorage.getItem(pendingKey); } catch { return; }
  if (!source || !heardIds.has(source)) return;
  if (await postAnswer(source)) {
    try { localStorage.removeItem(pendingKey); } catch { /* nothing to clear */ }
  }
}

export function createWelcome(ctx) {
  const { main, state, subjects, paperNumbers, icon, lineChooser, networkMap, persist, announce, navigate } = ctx;
  const lineOf = element => subjects.find(subject => element.classList.contains(subject.id))?.id;
  // True once the student has been through the subjects step in this visit, so the survey can say "step 2" and offer Back.
  let throughSubjects = false;

  // Where a student has to go before the app opens: subjects first, then the one-tap survey. null = nowhere, carry on.
  function target(section, sub) {
    const unfinished = !state.lines ? '' : !state.heard ? 'heard' : null;
    if (section === '') return unfinished === null ? null : unfinished ? `#/welcome/${unfinished}` : '#/welcome';
    if (section !== 'welcome') return null;
    if (unfinished === null) return '#/';
    if (unfinished === '' && sub === 'heard') return '#/welcome';
    return sub === '' || sub === 'heard' ? null : '#/welcome';
  }

  // Called before every redraw. Rewrites the address in place (no history entry, no flicker of the wrong page).
  function gate() {
    const [, section = '', sub = ''] = location.hash.slice(1).split('/');
    const next = target(section, sub);
    if (next !== null && next !== location.hash) history.replaceState(null, '', next);
  }

  // The map sits between the choices and the buttons, so a choice and its line are seen together.
  const map = () => `<div class="next-map">${networkMap(null, { list: subjects, papers: paperNumbers, preview: true })}</div>`;

  // Two stations on a short line: where the student is in the greeting. Drawn, not written (screen readers get the words).
  const progress = step => `<p class="welcome-steps"><span class="sr-only">Step ${step} of 2</span><i class="${step === 1 ? 'is-now' : 'is-done'}" aria-hidden="true"></i><b aria-hidden="true"></b><i class="${step === 2 ? 'is-now' : ''}" aria-hidden="true"></i></p>`;

  function subjectsStep() {
    return `<div class="next-copy">
      <h1 class="next-heading" id="welcome-heading" data-page-title tabindex="-1"><span class="next-name">Welcome to Study Circuit</span></h1>
      ${lineChooser('welcome', map())}
      ${progress(1)}
    </div>`;
  }

  function heardStep() {
    return `<div class="next-copy">
      <h1 class="next-heading" id="welcome-heading" data-page-title tabindex="-1"><span class="next-name">How did you hear about us?</span></h1>
      <form class="heard-form" data-heard-form novalidate>
        <fieldset>
          <legend class="sr-only">How did you hear about Study Circuit?</legend>
          <div class="heard-options">${heardOptions.map(([id, label]) => `<label class="heard-option"><input type="radio" name="heard" value="${id}"><span>${label}</span></label>`).join('')}</div>
        </fieldset>
        ${map()}
        <div class="chooser-actions">
          <button type="submit" class="button primary">Start studying${icon('arrow')}</button>
          <button type="button" class="button secondary" data-action="skip-heard">Skip</button>
          ${throughSubjects ? '<a class="back-link" href="#/welcome">Back</a>' : ''}
        </div>
      </form>
      ${throughSubjects ? progress(2) : ''}
    </div>`;
  }

  function page(sub) {
    return `<section class="next-stop welcome-stop${sub === 'heard' ? ' is-survey' : ''}" aria-labelledby="welcome-heading">
      ${sub === 'heard' ? heardStep() : subjectsStep()}
    </section>`;
  }

  // ---------- The live map: every line waits as a dotted track and lights up when its subject is chosen ----------
  function prepareMap(svg) {
    for (const path of svg.querySelectorAll('.net-line')) {
      let length = 1200;
      try { length = Math.ceil(path.getTotalLength()); } catch { /* not rendered: a generous default draws the whole line */ }
      path.style.setProperty('--len', length);
      // A Maths branch leaves the junction once the trunk has reached it.
      path.style.setProperty('--d', `${path.dataset.paper ? 300 : 0}ms`);
    }
    // Stations light in turn along their line, in step with the line being drawn.
    const groups = new Map();
    for (const dot of svg.querySelectorAll('.net-tick, .net-station')) {
      const key = `${lineOf(dot)}|${dot.dataset.paper ?? ''}`;
      groups.set(key, [...(groups.get(key) ?? []), dot]);
    }
    for (const [key, dots] of groups) {
      const start = key.endsWith('|') ? 120 : 400;
      dots.forEach((dot, index) => dot.style.setProperty('--d', `${start + Math.round(index / Math.max(dots.length - 1, 1) * 620)}ms`));
    }
  }

  function light(svg, ids, papers, instant) {
    if (instant) svg.classList.add('is-setting');
    for (const element of svg.querySelectorAll('.net-line, .net-tick, .net-station')) {
      const paper = element.dataset.paper;
      element.classList.toggle('is-on', ids.has(lineOf(element)) && (!paper || papers.includes(paper)));
    }
    if (instant) {
      svg.getBoundingClientRect();
      svg.classList.remove('is-setting');
    }
  }

  function chosenIn(form) {
    const ids = new Set([...form.querySelectorAll('input[name="line"]:checked')].map(input => input.value));
    const picked = ids.has('mathematics') ? [...form.querySelectorAll('input[name="paper"]:checked')].map(input => input.value) : [];
    return { ids, papers: picked.length ? picked : paperNumbers };
  }

  // The chips changed: draw or take back the matching lines.
  function sync(form) {
    if (!form?.matches('[data-line-chooser="welcome"]')) return;
    const svg = main.querySelector('.greeting-map');
    if (!svg) return;
    const { ids, papers } = chosenIn(form);
    light(svg, ids, papers, false);
  }


  // The page has just been drawn: measure the map, then show what is already chosen without animating it.
  function afterPaint() {
    const svg = main.querySelector('.greeting-map');
    if (!svg) return;
    prepareMap(svg);
    const form = main.querySelector('[data-line-chooser="welcome"]');
    if (form) {
      const { ids, papers } = chosenIn(form);
      light(svg, ids, papers, true);
    } else if (state.lines) {
      light(svg, new Set(state.lines.subjects), state.lines.papers.length ? state.lines.papers : paperNumbers, true);
    }
  }

  // ---------- What the student does ----------
  // The subjects step is saved: on to the survey.
  function subjectsDone() {
    throughSubjects = true;
    navigate('#/welcome/heard');
  }

  function finish(answer) {
    state.heard = answer;
    persist();
    if (answer !== skippedAnswer) sendAnswer(answer);
    announce(answer === skippedAnswer ? 'You are all set.' : 'Thanks. You are all set.');
    // Replace the survey's history entry with the overview, so Back never lands on a finished question.
    location.replace('#/');
  }

  function submitHeard(form) {
    const picked = form.querySelector('input[name="heard"]:checked')?.value;
    finish(picked && heardIds.has(picked) ? picked : skippedAnswer);
  }

  return { gate, page, afterPaint, sync, subjectsDone, submitHeard, skipHeard: () => finish(skippedAnswer), start: sendPending };
}
