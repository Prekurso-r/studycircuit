// Motion for Study Circuit.
//
// Thesis: the student rides the line. Moving between pages is riding to the next stop (the page arrives from the
// direction you are travelling and a bar glides along the navigation to your stop), the network draws itself out
// from the hub, and an answered question lights its station. Everything else is quiet, quick feedback.
//
// The world is flat (no shadows, glows or blur), so motion is movement, opacity, clip-path, stroke drawing and colour.
// Content is always visible without this file: if it fails to load, pages simply appear.
//
// Two layers:
//  - View Transitions (where the browser has them) carry whole-page changes: page to page, question to question,
//    the theme switch, and in-place updates. Browsers without them get an equivalent Web Animations fade/slide.
//  - CSS does the entrance choreography. It only plays while <main data-motion="..."> says what kind of change it
//    is, so ordinary re-renders never replay an entrance.
// Under prefers-reduced-motion nothing travels: pages and messages fade, colours ease, and that is all.

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_IN = 'cubic-bezier(0.7, 0, 0.84, 0)';
const EASE_IO = 'cubic-bezier(0.65, 0, 0.35, 1)';
const root = document.documentElement;
const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
const lineIds = ['physics', 'chemistry', 'biology', 'mathematics'];

export const reduced = () => reduceQuery.matches;
const hasTransitions = () => typeof document.startViewTransition === 'function';
const pageVisible = () => document.visibilityState === 'visible';

// ---------- Whole-page changes ----------
let latest = null;

// Elements that keep their identity across a re-render (a saved question, a weak topic) glide to their new place
// instead of blinking out and in. The name must be unique on the page, or the browser skips the transition.
function nameFlips() {
  const used = new Set();
  for (const element of document.querySelectorAll('[data-flip]')) {
    const name = `f-${element.dataset.flip.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    if (used.has(name)) continue;
    used.add(name);
    element.style.viewTransitionName = name;
  }
}

function clearFlips() {
  for (const element of document.querySelectorAll('[data-flip]')) element.style.removeProperty('view-transition-name');
}

// No View Transitions: the new page fades in (and slides in from the side it was reached from).
function fallbackEnter(kind, dir) {
  // Between the greeting's steps only the question slides; the map stays put.
  const target = kind === 'flow' ? document.querySelector('#main .next-copy') : document.querySelector('#main');
  if (!target || !pageVisible()) return;
  const travels = kind === 'route' || kind === 'flow';
  const slide = travels && !reduced() ? (dir === 'back' ? -18 : 18) : 0;
  target.animate(
    [{ opacity: travels ? 0 : 0.4, transform: `translateX(${slide}px)` }, { opacity: 1, transform: 'translateX(0)' }],
    { duration: travels ? 380 : 220, easing: EASE_OUT },
  );
}

// Runs a DOM update inside a transition. Returns a promise that resolves once the update has been applied
// (which, with View Transitions, is a frame later: the browser first photographs the old page).
// kind: 'route' (page to page) | 'flow' (between the greeting's steps) | 'step' (next question) | 'check' (answer checked) | 'update' (anything else)
export function run(update, { kind = 'update', dir = 'forward' } = {}) {
  if (!hasTransitions() || !pageVisible()) {
    update();
    fallbackEnter(kind, dir);
    return Promise.resolve();
  }
  nameFlips();
  root.dataset.vt = kind;
  root.dataset.dir = dir;
  const transition = document.startViewTransition(() => {
    update();
    nameFlips();
  });
  latest = transition;
  const finish = () => {
    if (latest !== transition) return;
    latest = null;
    delete root.dataset.vt;
    delete root.dataset.dir;
    clearFlips();
  };
  // A newer transition skips an older one; that is normal, not an error.
  transition.ready.catch(() => {});
  transition.finished.then(finish, finish);
  return transition.updateCallbackDone;
}

// The colour theme change is a circle that grows from the button that was pressed.
export function themeSwap(apply, origin) {
  if (!hasTransitions() || !pageVisible()) {
    // No View Transitions: let every colour ease for a moment instead of snapping.
    root.classList.add('theme-easing');
    apply();
    setTimeout(() => root.classList.remove('theme-easing'), 450);
    return;
  }
  if (reduced()) {
    run(apply, { kind: 'update' });
    return;
  }
  const box = origin?.getBoundingClientRect?.();
  const x = box ? box.left + box.width / 2 : innerWidth / 2;
  const y = box ? box.top + box.height / 2 : 0;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.dataset.vt = 'theme';
  const transition = document.startViewTransition(apply);
  const finish = () => {
    if (root.dataset.vt === 'theme') delete root.dataset.vt;
  };
  transition.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 640, easing: EASE_IO, pseudoElement: '::view-transition-new(root)' },
    );
  }, finish);
  transition.finished.then(finish, finish);
}

// ---------- Entrance choreography (after a page change) ----------
// Marks the page with what kind of change it was, and numbers the things that arrive one after another.
export function settle(main, kind) {
  main.dataset.motion = kind;
  if (kind !== 'route' && kind !== 'flow') return;
  stagger(main);
  if (kind === 'flow') return;
  drawNetwork(main);
  lightStrips(main);
  numberStops(main);
  countUp(main);
}

function stagger(main) {
  const holder = main.children.length === 1 && main.firstElementChild.classList.contains('practice') ? main.firstElementChild : main;
  [...holder.children].forEach((element, index) => element.style.setProperty('--i', Math.min(index, 6)));
  main.querySelectorAll('.next-copy > *').forEach((element, index) => element.style.setProperty('--i', Math.min(index, 6)));
  const rows = main.querySelectorAll('.lines-list > li, .station-row, .syllabus-topic, .activity-list > li, .saved-row, .review-item');
  rows.forEach((element, index) => element.style.setProperty('--r', Math.min(index, 10)));
  // The greeting's choices arrive one after another.
  main.querySelectorAll('.chooser-lines > .line-toggle, .heard-options > .heard-option').forEach((element, index) => element.style.setProperty('--r', Math.min(index, 10)));
}

// The network draws line by line out from the hub; each line's stations light as the line passes them.
// (The greeting's map is not drawn here: it lights a line when its subject is chosen.)
function drawNetwork(main) {
  for (const svg of main.querySelectorAll('.network:not(.greeting-map)')) {
    const rank = new Map();
    const placed = new Map();
    const lineOf = element => {
      const id = lineIds.find(name => element.classList.contains(name)) ?? 'neutral';
      if (!rank.has(id)) rank.set(id, rank.size);
      return [id, rank.get(id)];
    };
    for (const path of svg.querySelectorAll('.net-line')) {
      const [, order] = lineOf(path);
      let length = 1200;
      try {
        length = Math.ceil(path.getTotalLength());
      } catch { /* not rendered: a generous default draws the whole line */ }
      path.style.setProperty('--len', length);
      path.style.setProperty('--d', `${120 + order * 110}ms`);
    }
    for (const dot of svg.querySelectorAll('.net-station, .net-tick')) {
      const [id, order] = lineOf(dot);
      const index = placed.get(id) ?? 0;
      placed.set(id, index + 1);
      dot.style.setProperty('--d', `${300 + order * 110 + Math.min(index * 14, 520)}ms`);
    }
  }
}

// Station strips fill left to right, row after row.
function lightStrips(main) {
  main.querySelectorAll('.lines-list > li').forEach((row, index) => {
    const base = 240 + Math.min(index, 6) * 90;
    row.querySelectorAll('.strip i').forEach((stop, k) => stop.style.setProperty('--d', `${base + Math.min(k * 12, 520)}ms`));
  });
}

// A round's journey strip draws in stop by stop.
function numberStops(main) {
  main.querySelectorAll('.journey-line li').forEach((stop, k) => stop.style.setProperty('--d', `${160 + Math.min(k * 40, 600)}ms`));
}

// Numbers marked data-count climb to their value. The markup already holds the final value, so no script means no change.
function countUp(main) {
  if (reduced()) return;
  for (const element of main.querySelectorAll('[data-count]')) {
    const target = Number(element.dataset.count);
    if (!Number.isFinite(target) || target <= 0) continue;
    const delay = Number(element.dataset.delay ?? 260);
    const started = performance.now() + delay;
    element.textContent = '0';
    const tick = now => {
      if (!element.isConnected) return;
      const t = Math.min(1, Math.max(0, (now - started) / 750));
      element.textContent = t >= 1 ? String(target) : String(Math.round(target * (1 - (1 - t) ** 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

// ---------- Small things that used to snap ----------
// Show or hide an element that is toggled with the hidden attribute: it unfolds and folds instead of jumping.
export function setHidden(element, hide) {
  if (!element) return;
  for (const animation of element.getAnimations()) animation.cancel();
  if (element.hidden === hide) return;
  if (!element.isConnected || !pageVisible()) {
    element.hidden = hide;
    return;
  }
  if (!hide) {
    element.hidden = false;
    if (reduced()) {
      element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180 });
      return;
    }
    const style = getComputedStyle(element);
    const open = { height: `${element.offsetHeight}px`, marginTop: style.marginTop, marginBottom: style.marginBottom, paddingTop: style.paddingTop, paddingBottom: style.paddingBottom, opacity: 1 };
    const folded = { height: '0px', marginTop: '0px', marginBottom: '0px', paddingTop: '0px', paddingBottom: '0px', opacity: 0 };
    element.style.overflow = 'hidden';
    const clear = () => element.style.removeProperty('overflow');
    element.animate([folded, open], { duration: 300, easing: EASE_OUT }).finished.then(clear, clear);
    return;
  }
  const style = getComputedStyle(element);
  const open = { height: `${element.offsetHeight}px`, marginTop: style.marginTop, marginBottom: style.marginBottom, paddingTop: style.paddingTop, paddingBottom: style.paddingBottom, opacity: 1 };
  const folded = reduced() ? { opacity: 0 } : { height: '0px', marginTop: '0px', marginBottom: '0px', paddingTop: '0px', paddingBottom: '0px', opacity: 0 };
  element.style.overflow = 'hidden';
  const animation = element.animate([reduced() ? { opacity: 1 } : open, folded], { duration: 200, easing: EASE_IN });
  // Stay displayed until folded away. A cancelled fold (shown again meanwhile) must not hide it.
  animation.finished.then(() => {
    element.hidden = true;
    element.style.removeProperty('overflow');
  }, () => element.style.removeProperty('overflow'));
}

// Change a piece of text with a quick cross-fade instead of a jump.
export function swapText(element, text) {
  if (!element || element.textContent === text) return;
  if (reduced() || !element.isConnected || !element.getClientRects().length || !pageVisible()) {
    element.textContent = text;
    return;
  }
  for (const animation of element.getAnimations()) animation.cancel();
  element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 90, easing: 'ease-in' }).finished.then(() => {
    element.textContent = text;
    element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: EASE_OUT });
  }, () => { element.textContent = text; });
}

// A mark that has just changed state lands with a small pop.
export function pop(element) {
  if (!element || !pageVisible()) return;
  element.animate(
    reduced()
      ? [{ opacity: 0.2 }, { opacity: 1 }]
      : [{ transform: 'scale(0.5)', opacity: 0.4 }, { transform: 'scale(1.16)', opacity: 1, offset: 0.6 }, { transform: 'scale(1)', opacity: 1 }],
    { duration: reduced() ? 160 : 380, easing: EASE_OUT },
  );
}

// ---------- Accordions ----------
const folding = new WeakMap();

function toggleDetails(details) {
  // Where it is right now (mid-animation if it was moving), so an interrupted fold carries on from there.
  const from = details.getBoundingClientRect().height;
  folding.get(details)?.forEach(animation => animation.cancel());
  // A details that is still folding shut is still [open]; a click on it means "open again".
  const opening = !details.open || details.dataset.folding === 'closed';
  const summary = details.querySelector(':scope > summary');
  const body = [...details.children].filter(child => child !== summary);
  if (opening) details.removeAttribute('data-folding');
  else details.dataset.folding = 'closed';
  let to;
  if (opening) {
    details.open = true;
    to = details.getBoundingClientRect().height;
  } else {
    details.open = false;
    to = details.getBoundingClientRect().height;
    details.open = true;
  }
  details.style.overflow = 'hidden';
  const height = details.animate({ height: [`${from}px`, `${to}px`] }, { duration: opening ? 380 : 260, easing: opening ? EASE_OUT : EASE_IN });
  const fades = body.map(child => child.animate(
    opening ? [{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }] : [{ opacity: 1 }, { opacity: 0 }],
    { duration: opening ? 340 : 160, delay: opening ? 70 : 0, easing: opening ? EASE_OUT : EASE_IN, fill: opening ? 'backwards' : 'forwards' },
  ));
  const all = [height, ...fades];
  folding.set(details, all);
  height.finished.then(() => {
    folding.delete(details);
    details.removeAttribute('data-folding');
    details.style.removeProperty('overflow');
    if (!opening) details.open = false;
    for (const animation of fades) animation.cancel();
  }, () => {
    // Cancelled because a newer fold took over: it owns the overflow now.
    if (folding.get(details) !== all) return;
    details.style.removeProperty('overflow');
    for (const animation of fades) animation.cancel();
  });
}

function bindDetails() {
  document.addEventListener('click', event => {
    const summary = event.target.closest('summary');
    const details = summary?.parentElement;
    if (!(details instanceof HTMLDetailsElement) || event.defaultPrevented || reduced()) return;
    event.preventDefault();
    toggleDetails(details);
  });
}

// ---------- The bar that rides along the navigation ----------
export function moveBars() {
  const rem = parseFloat(getComputedStyle(root).fontSize) || 16;
  for (const bar of document.querySelectorAll('[data-nav-bar]')) {
    const nav = bar.parentElement;
    const link = nav.querySelector('a[aria-current="page"]');
    if (!link || !nav.getClientRects().length) {
      bar.style.opacity = '0';
      continue;
    }
    const n = nav.getBoundingClientRect();
    const l = link.getBoundingClientRect();
    const rail = bar.dataset.navBar === 'rail';
    const x = rail ? l.left - n.left + 2.85 * rem : l.left - n.left + (l.width - 1.75 * rem) / 2;
    const y = rail ? l.bottom - n.top - 0.3 * rem - 3 : l.bottom - n.top - 0.45 * rem - 3;
    const first = !bar.dataset.placed;
    if (first) bar.style.transition = 'none';
    bar.style.transform = `translate(${x}px, ${y}px)`;
    bar.style.opacity = '1';
    if (first) {
      bar.getBoundingClientRect();
      bar.style.removeProperty('transition');
      bar.dataset.placed = '1';
    }
  }
}

export function init() {
  bindDetails();
  addEventListener('resize', () => requestAnimationFrame(moveBars));
  document.fonts?.ready.then(moveBars);
}
