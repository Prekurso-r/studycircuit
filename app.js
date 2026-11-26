import { originalRoundNames, questions, subjects, topics } from './questions.js';
import { richText } from './format.js';
import { createAccount } from './account.js';
import { createWelcome, heardIds, skippedAnswer } from './welcome.js';
import { numericHint } from './hints.js';
import * as why from './why.js';
import * as motion from './motion.js';

const icons = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  coffee: '<path d="M4 9h12.5v4.5a5.5 5.5 0 0 1-5.5 5.5H9.5A5.5 5.5 0 0 1 4 13.5Zm12.5 1H18a2.5 2.5 0 0 1 0 5h-1.5M8 3v3m4-3v3"/>',
  brand: '<path d="M2.5 12h6.3m6.4 0h6.3M5 20.5l4.7-6.1m4.6-4.8L19 3.5"/><circle cx="12" cy="12" r="3.3"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2m0 14.6v2.2M4.6 4.6l1.6 1.6m11.6 11.6 1.6 1.6M2.5 12h2.2m14.6 0h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/>',
  books: '<path d="M4 5h5v15H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm5 0h5v15H9m5-13 4.7-1.3 3.2 13.6-4.7 1.3L14 7Z"/><path d="M5.8 8h1.4m3.6 0h1.4"/>',
  chart: '<path d="M3 4v16h18M8 16v-4m5 4V8m5 8V5"/>',
  bookmark: '<path d="M6 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-6-4-6 4Z"/>',
  bookmarkFilled: '<path d="M6 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-6-4-6 4Z" fill="currentColor"/>',
  device: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M12 17v4m-4 0h8"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
};

const main = document.querySelector('#main');
const announcement = document.querySelector('#announcement');
const storageNote = document.querySelector('#storage-note span:last-child');
const navLinks = [...document.querySelectorAll('[data-nav]')];
const storageKey = 'study-circuit:revision:v1';
const mixedKind = 'mixed-all';
const mixedLength = 10;
const physicsDiagramKind = 'physics-diagrams';
const retryKind = 'retry-missed';
const weakestKind = 'weakest-mix';
const roundSize = 10;
const paperNumbers = ['1', '2', '3', '4', '5', '6'];
const subjectById = Object.fromEntries(subjects.map(subject => [subject.id, subject]));
const topicById = Object.fromEntries(topics.map(topic => [topic.id, topic]));
const physicsDiagramTopics = subjectById.physics.syllabus.topics
  .map(topic => levelQuestions(topic.questionIds, 'challenge').filter(hasDiagram))
  .filter(ids => ids.length);
const currentQuestionIds = new Set(subjects.flatMap(subject => subject.syllabus.questionIds));
const paperByTopic = new Map();
const placeByQuestion = new Map();
for (const subject of subjects) {
  for (const section of subject.syllabus.sections) {
    const paper = subject.id === 'mathematics' ? section.name.split(' · ')[0] : null;
    for (const topic of section.groups.flatMap(group => group.topics)) {
      paperByTopic.set(topic.id, paper);
      for (const id of topic.questionIds) {
        if (!placeByQuestion.has(id)) placeByQuestion.set(id, { topic, paper });
      }
    }
  }
}
const levelHints = {
  simple: 'Multiple-choice questions. The level applies to every subject.',
  challenge: 'Harder questions, many in several parts with a number or fraction as the answer. The level applies to every subject.',
};
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
let storageAvailable = true;
const state = restoreState();
const account = createAccount({
  main, state, blankState, cleanState, replaceState, icon, heading, render, announce: text => { announcement.textContent = text; },
  persistRemote: () => persist({ remote: true }),
  showStorage: () => showStorageStatus(),
});

const welcome = createWelcome({
  main, state, subjects, paperNumbers, icon, lineChooser, networkMap, persist, navigate,
  announce: text => { announcement.textContent = text; },
});

function icon(name) {
  return `<svg class="icon icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
}

// lines: null until the student chooses (or skips) the subjects and Maths papers they take.
// heard: null until the student answers (or skips) "How did you hear about us?"; kept here so a second device does not ask again.
// updatedAt: when the student last changed anything here, so two devices can tell which copy is newer.
function blankState() {
  return { version: 1, level: 'simple', attempts: {}, saved: [], drafts: {}, active: null, history: [], lines: null, heard: null, updatedAt: 0 };
}

function cleanAttempts(value) {
  const clean = {};
  if (!value || typeof value !== 'object' || Array.isArray(value)) return clean;
  for (const [id, attempt] of Object.entries(value)) {
    if (Number.isInteger(attempt?.answered) && Number.isInteger(attempt?.correct) && attempt.answered >= 0 && attempt.correct >= 0) {
      clean[id] = { answered: attempt.answered, correct: attempt.correct };
    }
  }
  return clean;
}

// Turns saved progress (from this device or from the student's account) into a safe, current state.
// Returns null for something this version cannot read.
function cleanState(savedState) {
  const initial = blankState();
  if (!savedState || typeof savedState !== 'object' || savedState.version !== initial.version) return null;
  const { edition, ...saved } = savedState;
  // Fill in anything an older or damaged save is missing, so one bad field never breaks the app.
  const progress = { ...initial };
  for (const key of Object.keys(initial)) {
    const value = saved[key];
    if (value !== undefined && typeof value === typeof initial[key] && Array.isArray(value) === Array.isArray(initial[key])) progress[key] = value;
  }
  if (typeof saved.active === 'string') progress.active = saved.active;
  progress.lines = cleanLines(saved.lines);
  progress.heard = heardIds.has(saved.heard) || saved.heard === skippedAnswer ? saved.heard : null;
  progress.attempts = cleanAttempts(saved.attempts);
  progress.updatedAt = Number.isFinite(saved.updatedAt) ? saved.updatedAt : 0;
  expandPhysicsDrafts(progress.drafts, progress.attempts);
  keepCurrentSyllabus(progress);
  // A past round whose questions no longer exist cannot be shown on Results; drop it.
  progress.history = progress.history.filter(round => Array.isArray(round?.ids) && round.ids.every(id => Object.hasOwn(questions, id)));
  return { ...progress, level: progress.level === 'challenge' ? 'challenge' : 'simple' };
}

function restoreState() {
  let raw;
  try {
    raw = localStorage.getItem(storageKey);
  } catch {
    storageAvailable = false;
  }
  if (raw) {
    try {
      const restored = cleanState(JSON.parse(raw));
      if (restored) return restored;
    } catch { /* damaged save: start fresh */ }
  }
  return blankState();
}

// Swap in a different copy of the progress without replacing the object everything else points at.
function replaceState(next) {
  for (const key of Object.keys(state)) delete state[key];
  Object.assign(state, next);
}

// Saved questions and unfinished rounds from older syllabus topics are dropped on load.
function keepCurrentSyllabus(progress) {
  progress.saved = (progress.saved ?? []).filter(id => currentQuestionIds.has(id));
  for (const [key, draft] of Object.entries(progress.drafts ?? {})) {
    const ids = draft.ids.filter(id => currentQuestionIds.has(id));
    if (!ids.length) {
      delete progress.drafts[key];
      continue;
    }
    const badIndex = !Number.isInteger(draft.index) || draft.index < 0 || draft.index >= draft.ids.length;
    if (ids.length !== draft.ids.length || badIndex) {
      const showing = draft.ids[draft.index];
      draft.ids = ids;
      draft.index = Math.min(ids.filter(id => Object.hasOwn(draft.answers, id)).length, ids.length - 1);
      if (ids[draft.index] !== showing) draft.selected = null;
    }
  }
  if (!Object.hasOwn(progress.drafts ?? {}, progress.active)) {
    progress.active = Object.keys(progress.drafts ?? {}).at(-1) ?? null;
  }
}

// remote: true when the change came from the student's account, not from the student, so it is not "new" work to upload.
function persist({ remote = false } = {}) {
  if (!remote) state.updatedAt = Date.now();
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  showStorageStatus();
  if (!remote) account.scheduleSync();
}

function showStorageStatus() {
  motion.swapText(storageNote, account.storageText(storageAvailable));
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]];
  }
  return shuffled;
}

function summary(ids) {
  const total = { answered: 0, correct: 0, unique: 0 };
  for (const id of ids) {
    const attempt = state.attempts[id];
    if (attempt) {
      total.answered += attempt.answered;
      total.correct += attempt.correct;
      total.unique += 1;
    }
  }
  return total;
}

function accuracy({ correct, answered }) {
  return answered ? `${Math.round(correct / answered * 100)}%` : '—';
}

// A topic gets a status only once there is enough evidence: at least 5 answers across both levels.
const statusMinimum = 5;
const statusLabels = ['Needs work', 'Getting there', 'Secure'];

function topicStatus(topic) {
  const result = summary(topic.questionIds);
  if (result.answered < statusMinimum) return { result, level: 0 };
  const ratio = result.correct / result.answered;
  return { result, ratio, level: ratio >= .8 ? 3 : ratio >= .6 ? 2 : 1 };
}

function statusBadge(status) {
  if (!status.level) return '';
  return `<span class="topic-status" data-level="${status.level}"><span class="status-meter" aria-hidden="true"><i></i><i></i><i></i></span>${statusLabels[status.level - 1]} · ${accuracy(status.result)}</span>`;
}

// Station marks carry right and wrong by shape, never by colour: a filled ring with a tick, a broken ring with a cross.
function stationMark(kind) {
  const shapes = {
    done: '<circle cx="12" cy="12" r="9" fill="currentColor"/><path d="m7.8 12.3 2.8 2.8 5.6-6" fill="none" stroke="var(--mark-ink)" stroke-width="2.2"/>',
    miss: '<circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-dasharray="4.3 2.4"/><path d="m9 9 6 6m0-6-6 6" fill="none" stroke="currentColor" stroke-width="2.2"/>',
    now: '<circle cx="12" cy="12" r="8.4" fill="var(--surface)" stroke="currentColor" stroke-width="2.6"/><circle cx="12" cy="12" r="3.4" fill="currentColor"/>',
    open: '<circle cx="12" cy="12" r="6.5" fill="var(--surface)" stroke="currentColor" stroke-width="2"/>',
  };
  return `<svg class="station-mark mark-${kind}" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[kind]}</svg>`;
}

// "2.141e+30" and "-7" read badly as answers: write 2.14 × 10³⁰ and a true minus.
function formatAnswer(value) {
  if (!Number.isFinite(value)) return String(value);
  const size = Math.abs(value);
  let text;
  if (size !== 0 && (size >= 1e6 || size < 1e-3)) {
    const [mantissa, exponent] = value.toExponential(2).split('e');
    text = `${mantissa.replace(/\.?0+$/, '')} × 10<sup>${Number(exponent).toString().replace('-', '−')}</sup>`;
  } else {
    text = String(Number(value.toPrecision(6)));
  }
  return text.replace(/^-/, '−');
}

function topicsVisited(topicList) {
  return topicList.filter(topic => summary(topic.questionIds).unique > 0).length;
}

// The student's next stop: an unfinished round, else the weakest topic, else the next unvisited station
// on the line they ride most, else a first stop.
function nextStop() {
  const draft = currentDraft();
  if (draft) return { kind: 'resume', draft, topic: topicById[draft.kind] };
  const weak = weakestTopics(1)[0];
  if (weak) return { kind: 'weak', ...weak };
  const busiest = mySubjects()
    .map(subject => ({ subject, visited: topicsVisited(myTopics(subject)) }))
    .sort((a, b) => b.visited - a.visited)[0];
  if (busiest?.visited) {
    const topic = myTopics(busiest.subject).find(item => !summary(item.questionIds).unique && levelQuestions(item.questionIds).length);
    if (topic) return { kind: 'continue', subject: busiest.subject, topic };
  }
  return { kind: 'start' };
}

// ---------- The network: every subject a line, every syllabus topic a station, bends at 45 and 90 degrees ----------
const hub = [480, 286];
const lineRoutes = {
  physics: [hub, [394, 200], [52, 200]],
  chemistry: [hub, [566, 200], [936, 200], [936, 18]],
  biology: [hub, [566, 372], [908, 372]],
  economics: [hub, [480, 94], [190, 94]],
  business: [hub, [480, 518], [820, 518]],
};
const mathsJunction = [334, 372];
const mathsTrunk = [hub, [394, 372], mathsJunction];

function routeLength(route) {
  let total = 0;
  for (let i = 1; i < route.length; i += 1) total += Math.hypot(route[i][0] - route[i - 1][0], route[i][1] - route[i - 1][1]);
  return total;
}

function pointOnRoute(route, distance) {
  let left = distance;
  for (let i = 1; i < route.length; i += 1) {
    const [x1, y1] = route[i - 1];
    const [x2, y2] = route[i];
    const length = Math.hypot(x2 - x1, y2 - y1);
    if (left <= length || i === route.length - 1) {
      const t = length ? Math.min(left / length, 1) : 0;
      return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, (x2 - x1) / (length || 1), (y2 - y1) / (length || 1)];
    }
    left -= length;
  }
  return [...route.at(-1), 1, 0];
}

function stationsAlong(route, topicList, offset) {
  const length = routeLength(route);
  const step = (length - offset) / Math.max(topicList.length - 1, 1);
  return topicList.map((topic, index) => ({ topic, point: pointOnRoute(route, offset + step * index) }));
}

const routePath = route => route.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

// preview: the greeting's map. Every subject and all six Maths papers are drawn, each waiting as a dotted track, and the
// greeting lights the ones the student picks. It is a picture only: no names, no links, and its elements carry the paper
// they belong to.
function networkMap(nextTopicId, { list = mySubjects(), papers = takenPapers(), preview = false } = {}) {
  const parts = [];
  const stations = [];
  const labels = [];
  const track = (id, route, paper) => {
    const attributes = paper ? ` data-paper="${paper}"` : '';
    if (preview) parts.push(`<path class="net-ghost ${id}" d="${routePath(route)}"/>`);
    parts.push(`<path class="net-line ${id}"${attributes} d="${routePath(route)}"/>`);
  };
  const named = (id, text) => preview ? text : `<a href="#/subjects/${id}" tabindex="-1">${text}</a>`;
  for (const subject of list) {
    const sections = subject.syllabus.sections;
    if (subject.id === 'mathematics') {
      track(subject.id, mathsTrunk);
      sections.forEach((section, index) => {
        if (!papers.includes(String(index + 1))) return;
        const y = mathsJunction[1] + index * 30;
        const branch = index ? [mathsJunction, [mathsJunction[0] - index * 30, y], [96, y]] : [mathsJunction, [96, y]];
        track(subject.id, branch, index + 1);
        const topicList = section.groups.flatMap(group => group.topics);
        stations.push(...stationsAlong(branch, topicList, index ? 34 : 26).map(item => ({ ...item, subject, paper: index + 1 })));
        if (!preview) labels.push(`<text class="net-branch ${subject.id}" x="86" y="${y + 5}" text-anchor="end">P${index + 1}</text>`);
      });
      const lastBranch = Math.max(...papers.map(Number)) - 1;
      if (!preview) labels.push(named(subject.id, `<text class="net-label ${subject.id}" x="62" y="${mathsJunction[1] + (lastBranch + 1) * 30 + 18}">${subject.name} ${subject.code}</text>`));
      continue;
    }
    const route = lineRoutes[subject.id];
    track(subject.id, route);
    const topicList = subject.syllabus.topics;
    const placed = stationsAlong(route, topicList, 40);
    stations.push(...placed.map(item => ({ ...item, subject })));
    // AS / A Level fare-zone boundary, drawn across the line between the two zones.
    const asCount = sections[0].groups.flatMap(group => group.topics).length;
    if (!preview && sections.length > 1 && placed[asCount]) {
      const [ax, ay] = placed[asCount - 1].point;
      const [bx, by, dx, dy] = placed[asCount].point;
      const mx = (ax + bx) / 2;
      const my = (ay + by) / 2;
      parts.push(`<path class="net-zone" d="M${(mx - dy * 13).toFixed(1)} ${(my + dx * 13).toFixed(1)} L${(mx + dy * 13).toFixed(1)} ${(my - dx * 13).toFixed(1)}"/>`);
    }
    const [ex, ey] = route.at(-1);
    const anchor = ['physics', 'economics'].includes(subject.id) ? 'start' : 'end';
    const lx = subject.id === 'chemistry' ? ex - 16 : ex;
    const ly = subject.id === 'biology' || subject.id === 'business' ? ey + 30 : subject.id === 'chemistry' ? ey + 6 : ey - 18;
    if (!preview) labels.push(named(subject.id, `<text class="net-label ${subject.id}" x="${lx}" y="${ly}" text-anchor="${anchor}">${subject.name} ${subject.code}</text>`));
  }
  // Unvisited stations are small ticks on the line; visited ones are lit rings; the next stop is named.
  let next = '';
  for (const { topic, point: [x, y], subject, paper } of stations) {
    const visited = summary(topic.questionIds).unique > 0;
    const cx = x.toFixed(1);
    const cy = y.toFixed(1);
    if (topic.id === nextTopicId) {
      const anchor = x < 220 ? 'start' : x > 740 ? 'end' : 'middle';
      const dx = anchor === 'start' ? -10 : anchor === 'end' ? 10 : 0;
      // Physics names its line above the track, so its next-stop label goes below; every other line labels above.
      const ly = subject.id === 'physics' ? y + 36 : y - 22;
      next = `<g class="net-next ${subject.id}"><circle class="net-halo" cx="${cx}" cy="${cy}" r="16"/><circle class="net-next-ring" cx="${cx}" cy="${cy}" r="9"/>
        <text class="net-next-label" x="${(x + dx).toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}">${escapeText(topicLabel(topic))}</text></g>`;
      continue;
    }
    const tag = preview && paper ? ` data-paper="${paper}"` : '';
    parts.push(visited
      ? `<circle class="net-station is-visited ${subject.id}"${tag} cx="${cx}" cy="${cy}" r="6"/>`
      : `<circle class="net-tick ${subject.id}"${tag} cx="${cx}" cy="${cy}" r="2.6"/>`);
  }
  return `<svg class="network${preview ? ' greeting-map' : ''}" viewBox="0 0 960 580" aria-hidden="true" focusable="false">
    ${parts.join('')}
    <circle class="net-hub" cx="${hub[0]}" cy="${hub[1]}" r="13"/>
    ${next}${labels.join('')}
  </svg>`;
}

// One line as a strip of stations, for lists and phones (where the full network would be too small to read).
function lineStrip(subject, nextTopicId) {
  // A Maths line only shows the papers the student takes (all six when none are chosen, or when browsing it as another subject).
  const showPaper = index => subject.id !== 'mathematics' || !takesSubject('mathematics') || takenPapers().includes(String(index + 1));
  return `<span class="strip ${subject.id}" aria-hidden="true">${subject.syllabus.sections.map((section, index) => {
    if (!showPaper(index)) return '';
    const topicList = section.groups.flatMap(group => group.topics);
    const breakLabel = subject.id === 'mathematics' ? `P${index + 1}` : index ? 'A' : '';
    // Each zone or paper is one unbroken run; the strip only wraps between runs.
    return `<span class="strip-run">${breakLabel ? `<b class="strip-break">${breakLabel}</b>` : ''}${topicList.map(topic => {
      const visited = summary(topic.questionIds).unique > 0;
      return `<i class="${topic.id === nextTopicId ? 'is-next' : visited ? 'is-visited' : ''}"></i>`;
    }).join('')}</span>`;
  }).join('')}</span>`;
}

function linesList(nextTopicId, detail = false, list = mySubjects()) {
  return `<ul class="lines-list" role="list">${list.map(subject => {
    const topicList = takesSubject(subject.id) ? myTopics(subject) : subject.syllabus.topics;
    const visited = topicsVisited(topicList);
    const result = summary(subject.syllabus.questionIds);
    const facts = `${visited} of ${count(topicList.length, 'station')} visited${detail && result.answered ? ` · ${accuracy(result)} correct` : ''}`;
    return `<li><a class="line-row ${subject.id}" href="#/subjects/${subject.id}">
      <span class="line-name"><span class="line-chip">${subject.name}</span><span class="line-code">${subject.code}</span></span>
      ${lineStrip(subject, nextTopicId)}
      <span class="line-facts">${facts}</span>
      <span class="line-go">${icon('arrow')}</span>
    </a></li>`;
  }).join('')}</ul>`;
}

const mapLegend = `<p class="map-legend" aria-hidden="true"><span><i class="is-tick"></i>Not practised</span><span><i class="is-visited"></i>Practised</span><span><i class="is-next"></i>Next stop</span></p>`;

// ---------- Colour theme: Light, Dark, or Match device (default), remembered on this device ----------
const themeKey = 'study-circuit:theme';
const darkQuery = matchMedia('(prefers-color-scheme: dark)');

function readTheme() {
  try {
    const value = localStorage.getItem(themeKey);
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
}

function applyTheme(choice) {
  if (choice === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = choice;
  const dark = choice === 'dark' || (choice === 'system' && darkQuery.matches);
  document.querySelector('#theme-color')?.setAttribute('content', dark ? '#0b1230' : '#ffffff');
  for (const button of document.querySelectorAll('[data-theme-choice]')) {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === choice));
  }
}

function themeControl(compact) {
  const choices = [['light', 'sun', 'Light'], ['dark', 'moon', 'Dark'], ['system', 'device', 'Match device']];
  const current = readTheme();
  return `<div class="theme-control${compact ? ' is-compact' : ''}" role="group" aria-label="Colour theme">${choices.map(([value, symbol, label]) =>
    `<button type="button" data-theme-choice="${value}" aria-pressed="${current === value}"${compact ? ` aria-label="${label} theme"` : ''}>${icon(symbol)}${compact ? '' : `<span>${label}</span>`}</button>`).join('')}</div>`;
}

function weakestTopics(limit = 3) {
  return mySubjects().flatMap(subject => myTopics(subject).map(topic => ({ subject, topic, status: topicStatus(topic) })))
    .filter(item => item.status.level && item.status.level < 3)
    .sort((a, b) => a.status.ratio - b.status.ratio || b.status.result.answered - a.status.result.answered)
    .slice(0, limit);
}

function weakTopicRows(items) {
  return `<ol class="syllabus-topics weak-topics" role="list">${items.map(item => {
    const { subject, topic, status } = item;
    const size = levelQuestions(topic.questionIds).length;
    const action = state.drafts[draftKey(topic.id)] ? 'Resume' : 'Practise';
    return `<li class="syllabus-topic ${subject.id}" data-flip="topic-${topic.id}">
      <span class="topic-number">${topic.number}</span>
      <div class="topic-copy">
        <div class="topic-title-line"><h3>${topic.name}</h3>${statusBadge(status)}</div>
        <p>${subject.name}${paperByTopic.get(topic.id) ? ` · ${paperByTopic.get(topic.id)}` : ''} · ${item.note ?? `${count(status.result.answered, 'answer')} so far`}</p>
      </div>
      <button type="button" class="button secondary" data-action="start" data-kind="${topic.id}" ${size ? '' : 'disabled'} aria-label="${action} ${subject.name} topic ${topic.number} ${topic.name}">${action}</button>
    </li>`;
  }).join('')}</ol>`;
}

// One round across the weakest topics together; resumes an unfinished one.
function weakestButton(style) {
  const label = state.drafts[draftKey(weakestKind)] ? 'Resume weakest topics' : 'Practise my weakest topics';
  return `<button class="button ${style}" type="button" data-action="start" data-kind="${weakestKind}">${label}${icon('arrow')}</button>`;
}

function weakestSection(onProgressPage) {
  const items = weakestTopics();
  if (!items.length && !onProgressPage) return '';
  return `<section class="content-section" aria-labelledby="weakest-heading">
    <div class="section-heading"><h2 id="weakest-heading">Your weakest topics</h2>${items.length ? weakestButton('secondary') : ''}</div>
    ${onProgressPage ? `<p class="section-note">A topic gets a status once you have answered ${statusMinimum} of its questions. Under 60% correct is Needs work, 60 to 79% is Getting there, and 80% or more is Secure.</p>` : ''}
    ${items.length ? weakTopicRows(items) : `<div class="empty-state compact"><span class="glyph neutral">${icon('target')}</span>
      <div><h3>No weak topics yet</h3><p>Topics you score under 80% on will appear here once you have answered ${statusMinimum} of their questions.</p></div>
    </div>`}
  </section>`;
}

function count(number, singular, plural = singular + 's') {
  return `${number} ${number === 1 ? singular : plural}`;
}

function currentDraft() {
  return state.drafts[state.active];
}

function roundName(kind) {
  if (kind === 'mixed' || kind.startsWith('mixed-')) return 'Mixed practice';
  if (kind === 'saved') return 'Saved questions';
  if (kind === retryKind) return 'Missed questions';
  if (kind === weakestKind) return 'Weakest topics';
  if (kind === physicsDiagramKind) return 'Physics diagram practice';
  return topicById[kind] ? topicLabel(topicById[kind]) : originalRoundNames[kind] ?? 'Practice';
}

// "Simple", "Challenge", or nothing for rounds whose questions keep their own level.
function roundLevelLabel(round) {
  return round.kind === 'saved' || round.kind === retryKind ? '' : levelName(round.level);
}

function isNewcomer() {
  return !Object.keys(state.attempts).length && !state.history.length && !Object.keys(state.drafts).length;
}

// Topics are named the way the syllabus lists them: "3.1 Algebra", "2 Kinematics".
function topicLabel(topic) {
  return topic.number ? `${topic.number} ${topic.name}` : topic.name;
}

// "Mathematics · Paper 3 · 3.1 Algebra", "Physics · 2 Kinematics"
function placeLabel(question, roundTopic) {
  const subject = subjectById[question.subjectId];
  const place = roundTopic && paperByTopic.has(roundTopic.id) && roundTopic.questionIds.includes(question.id)
    ? { topic: roundTopic, paper: paperByTopic.get(roundTopic.id) }
    : placeByQuestion.get(question.id);
  return [subject.name, place?.paper, place && topicLabel(place.topic)].filter(Boolean).join(' · ');
}

function roundLevel(kind) {
  return kind === physicsDiagramKind ? 'challenge' : state.level;
}

function draftKey(kind) {
  return kind !== 'saved' && kind !== retryKind && roundLevel(kind) === 'challenge' ? kind + ':challenge' : kind;
}

function levelName(level) {
  return level === 'challenge' ? 'Challenge' : 'Simple';
}

function levelQuestions(ids, level = state.level) {
  return ids.filter(id => questions[id].level === level);
}

function hasDiagram(id) {
  return Boolean(questions[id].figure?.svg);
}

// Questions for a round on one topic: never-answered first, then ones answered wrong before, then the rest.
function topicRoundIds(topic, level, existing = [], limit = Infinity, attempts = state.attempts) {
  const used = new Set(existing);
  const rank = id => {
    const attempt = attempts[id];
    return !attempt ? 0 : attempt.correct < attempt.answered ? 1 : 2;
  };
  const ids = shuffle(levelQuestions(topic.questionIds, level).filter(id => !used.has(id)))
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, limit);
  if (topic.subjectId === 'physics' && level === 'challenge') {
    const firstDiagram = ids.findIndex(hasDiagram);
    if (firstDiagram > 0) ids.unshift(...ids.splice(firstDiagram, 1));
  }
  return ids;
}

// Older Physics rounds were saved before their banks grew; extend those to the full pool.
// Rounds with a fixed size (every round started since 10-question rounds) keep their length.
function expandPhysicsDrafts(drafts, attempts) {
  for (const [key, draft] of Object.entries(drafts)) {
    if (!Array.isArray(draft?.ids) || typeof draft.answers !== 'object' || draft.answers === null) {
      delete drafts[key];
      continue;
    }
    const topic = topicById[draft.kind];
    if (topic?.subjectId === 'physics' && !draft.size) {
      draft.ids.push(...topicRoundIds(topic, draft.level ?? 'simple', draft.ids, Infinity, attempts));
    }
  }
}

// ---------- Your lines: the subjects and Maths papers the student takes ----------
function cleanLines(value) {
  if (!value || typeof value !== 'object' || !Array.isArray(value.subjects)) return null;
  // A skipped chooser means all subjects, including new ones added later.
  const subjectIds = value.skipped ? subjects.map(subject => subject.id) : value.subjects.filter(id => subjects.some(subject => subject.id === id));
  if (!subjectIds.length) return null;
  const papers = Array.isArray(value.papers) ? value.papers.filter(paper => paperNumbers.includes(paper)) : [];
  return { subjects: subjectIds, papers, skipped: Boolean(value.skipped) };
}

const takesSubject = id => !state.lines || state.lines.subjects.includes(id);
// No papers picked means all six count.
const takenPapers = () => state.lines?.papers?.length ? state.lines.papers : paperNumbers;

function topicTaken(topic) {
  if (!takesSubject(topic.subjectId)) return false;
  if (topic.subjectId !== 'mathematics') return true;
  const paper = paperByTopic.get(topic.id);
  return !paper || takenPapers().includes(paper.replace('Paper ', ''));
}

const mySubjects = () => subjects.filter(subject => takesSubject(subject.id));
const myTopics = subject => subject.syllabus.topics.filter(topicTaken);

function linesSummary() {
  if (!state.lines || state.lines.skipped) return 'All subjects';
  return mySubjects().map(subject => subject.id === 'mathematics' && state.lines.papers.length
    ? `${subject.name} (${state.lines.papers.map(paper => `P${paper}`).join(', ')})`
    : subject.name).join(', ');
}

// The chooser: subject line chips as toggles; Maths opens its six papers.
// mode 'welcome' is the greeting's question (with a way on and a way to skip); 'edit' is the Subjects page's.
// The greeting keeps its words to a minimum: no course codes, and the six papers are bare "P1" to "P6" chips
// (their full names are spoken to screen readers) in a slot that is always reserved, so choosing Maths fades them
// in without moving anything. `between` is drawn above the buttons (the greeting puts its map there).
function lineChooser(mode, between = '') {
  const greeting = mode === 'welcome';
  const chosen = state.lines && !state.lines.skipped ? state.lines.subjects : [];
  const papers = state.lines?.papers ?? [];
  const maths = subjectById.mathematics;
  const paperName = section => escapeText(section.name.split(' · ')[1] ?? section.name);
  const paperToggle = (section, index) => greeting
    ? `<label class="paper-toggle" title="${paperName(section)}"><input type="checkbox" name="paper" value="${index + 1}" aria-label="Paper ${index + 1}, ${paperName(section)}"${papers.includes(String(index + 1)) ? ' checked' : ''}><span><b>P${index + 1}</b></span></label>`
    : `<label class="paper-toggle"><input type="checkbox" name="paper" value="${index + 1}"${papers.includes(String(index + 1)) ? ' checked' : ''}><span><b>P${index + 1}</b> ${paperName(section)}</span></label>`;
  const picked = chosen.includes('mathematics');
  return `<form class="line-chooser${greeting ? ' welcome-chooser' : ''}" data-line-chooser="${mode}" novalidate>
    <fieldset><legend>${greeting ? 'Which subjects do you take?' : 'Subjects you take'}</legend>
      <div class="chooser-lines">${subjects.map(subject => `<label class="line-toggle ${subject.id}"><input type="checkbox" name="line" value="${subject.id}"${chosen.includes(subject.id) ? ' checked' : ''}><span class="line-toggle-name">${subject.name}</span>${greeting ? '' : `<span class="line-toggle-code">${subject.code}</span>`}</label>`).join('')}</div>
    </fieldset>
    <fieldset class="paper-picker mathematics${greeting && !picked ? ' is-off' : ''}"${greeting || picked ? '' : ' hidden'}><legend>${greeting ? 'Maths papers (optional)' : 'Maths papers you take'}</legend>
      <div class="chooser-papers">${maths.syllabus.sections.map(paperToggle).join('')}</div>
      ${greeting ? '' : '<p class="chooser-hint">Pick none and all six papers count.</p>'}
    </fieldset>
    <p class="selection-error" id="lines-error" hidden role="alert">Choose at least one subject${greeting ? ', or skip for now' : ''}.</p>
    ${between}
    <div class="chooser-actions">
      <button type="submit" class="button primary">${greeting ? 'Continue' : 'Save my lines'}${icon('arrow')}</button>
      ${greeting ? '<button type="button" class="button secondary" data-action="skip-lines">Skip for now</button>' : ''}
    </div>
  </form>`;
}

function levelControl() {
  return `<fieldset class="level-control"><legend>Practice level</legend>
    <div class="level-switch">${['simple', 'challenge'].map(level => `<label><input type="radio" name="practice-level" value="${level}"${state.level === level ? ' checked' : ''} aria-describedby="level-hint"><span>${levelName(level)}</span></label>`).join('')}</div>
    <p class="level-hint" id="level-hint">${levelHints[state.level]}</p>
  </fieldset>`;
}

function heading(title, description, back) {
  return `<header class="page-heading">
    ${back ? `<a class="back-link" href="${back.href}">${back.label}</a>` : ''}
    <h1 data-page-title tabindex="-1">${title}</h1>
    <p>${description}</p>
  </header>`;
}

function totalsLine() {
  const topicList = mySubjects().flatMap(myTopics);
  const overall = summary([...new Set(topicList.flatMap(topic => topic.questionIds))]);
  const climb = number => `<span data-count="${number}">${number}</span>`;
  const accuracyText = overall.answered ? `${climb(Math.round(overall.correct / overall.answered * 100))}%` : '—';
  return `${climb(overall.answered)} ${overall.answered === 1 ? 'answer' : 'answers'} · ${accuracyText} correct · ${climb(topicsVisited(topicList))} of ${topicList.length} stations visited`;
}

function activityRows(limit) {
  if (!state.history.length) {
    return `<div class="empty-state compact">${stationMark('open')}
      <div><h3>No completed practice yet</h3><p>Your results will appear here after your first round.</p></div>
    </div>`;
  }
  return `<ul class="activity-list" role="list">${state.history.slice(0, limit).map(round => {
    const topic = topicById[round.kind];
    const line = topic ? topic.subjectId : round.kind === physicsDiagramKind ? 'physics' : 'neutral';
    const level = roundLevelLabel(round);
    return `<li class="${line}">
    <span class="activity-mark">${stationMark(round.correct === round.ids.length ? 'done' : 'now')}</span>
    <div class="activity-title"><strong>${roundName(round.kind)}</strong><span>${level ? `${level} · ` : ''}${dateFormat.format(round.finishedAt)}</span></div>
    <span class="activity-result">${round.correct} / ${round.ids.length} correct</span>
  </li>`;
  }).join('')}</ul>`;
}

function overview() {
  const next = nextStop();
  const mixed = draftKey(mixedKind);
  const mixedButton = (primary = false) => state.active === mixed && next.kind === 'resume' ? ''
    : `<button class="button ${primary ? 'primary' : 'secondary'}" type="button" data-action="start" data-kind="${mixedKind}">${state.drafts[mixed] ? 'Resume mixed practice' : primary ? 'Start mixed practice' : 'Mixed practice'}${icon('arrow')}</button>`;
  let lead;
  let name;
  let meta;
  let actions;
  let line = 'neutral';
  let nextTopicId = null;
  if (next.kind === 'resume') {
    const { draft, topic } = next;
    lead = 'Continue';
    name = roundName(draft.kind);
    line = topic?.subjectId ?? 'neutral';
    nextTopicId = topic?.id ?? null;
    meta = `<strong class="next-tag">${lead}</strong>${[roundLevelLabel(draft), `Question ${draft.index + 1} of ${draft.ids.length}`].filter(Boolean).map(part => ` ·&nbsp;${part}`).join('')}`;
    actions = `<a class="button primary" href="#/practice">Continue practice${icon('arrow')}</a>${mixedButton()}`;
  } else if (next.kind === 'weak' || next.kind === 'continue') {
    const { subject, topic } = next;
    const paper = paperByTopic.get(topic.id);
    lead = 'Next stop';
    name = topic.name;
    line = subject.id;
    nextTopicId = topic.id;
    const status = next.kind === 'weak'
      ? `${statusLabels[next.status.level - 1].replace(' ', '&nbsp;')} · ${accuracy(next.status.result)} from ${count(next.status.result.answered, 'answer')}`
      : 'Not practised yet';
    meta = `<span class="station-badge">${topic.number}</span><span class="next-meta-text"><strong class="next-tag">${lead}</strong> ·&nbsp;${subject.name}${paper ? ` ·&nbsp;${paper}` : ''} ·&nbsp;${status}</span>`;
    const action = state.drafts[draftKey(topic.id)] ? 'Resume' : 'Practise';
    actions = `<button class="button primary" type="button" data-action="start" data-kind="${topic.id}">${action} this topic${icon('arrow')}</button>${next.kind === 'weak' ? weakestButton('secondary') : ''}${mixedButton()}`;
  } else {
    // The greeting has already asked which subjects the student takes, so a first visit goes straight to practice.
    lead = 'First stop';
    name = 'Pick a line';
    meta = `<strong class="next-tag">${lead}</strong> ·&nbsp;Choose a topic below, or sample your lines with a mixed round of 10 questions.`;
    actions = `${mixedButton(true)}<a class="button secondary" href="#/subjects">Choose a subject${icon('arrow')}</a>`;
  }
  return `<section class="next-stop ${line}" aria-labelledby="next-heading">
      <div class="next-copy">
        <h1 class="next-heading" id="next-heading" data-page-title tabindex="-1"><span class="sr-only">${lead}: </span><span class="next-name">${name}</span></h1>
        <p class="next-meta">${meta.includes('station-badge') ? meta : `<span class="next-meta-text">${meta}</span>`}</p>
        <div class="next-actions">${actions}</div>
        ${levelControl()}
      </div>
      <div class="next-map">${networkMap(nextTopicId)}${mapLegend}</div>
    </section>
    <section class="content-section" aria-labelledby="lines-heading">
      <div class="section-heading"><h2 id="lines-heading">Your lines</h2>${isNewcomer() ? '' : `<p class="section-meta">${totalsLine()}</p>`}</div>
      ${linesList(nextTopicId)}
    </section>
    ${isNewcomer() ? firstSteps() : `${weakestSection(false)}
    <section class="content-section" aria-labelledby="activity-heading">
      <div class="section-heading"><h2 id="activity-heading">Recent practice</h2><a class="text-link" href="#/progress">View progress</a></div>
      ${activityRows(3)}
    </section>`}
    <p class="support-line">Study Circuit is free. <a class="text-link" href="https://www.buymeacoffee.com/dexoisalbep" target="_blank" rel="noopener noreferrer">Buy me a coffee<span class="sr-only"> (opens in a new tab)</span></a></p>`;
}

// Shown until the first answer: the three stops of using the app, drawn as a short line.
function firstSteps() {
  return `<section class="first-steps" aria-labelledby="first-steps-heading">
    <h2 id="first-steps-heading">How Study Circuit works</h2>
    <ol>
      <li><span class="step-number" aria-hidden="true">1</span><p><strong>Answer, then read the explanation</strong> that follows every question.</p></li>
      <li><span class="step-number" aria-hidden="true">2</span><p><strong>Watch your stations light up</strong> on the map as you practise each topic.</p></li>
      <li><span class="step-number" aria-hidden="true">3</span><p><strong>Find your weak spots.</strong> After ${statusMinimum} answers a topic shows Needs work, Getting there or Secure, and your weakest become your next stop.</p></li>
    </ol>
    ${storageAvailable ? `<p class="first-steps-note">${account.hint()}</p>` : ''}
  </section>`;
}

function subjectIndex() {
  const others = subjects.filter(subject => !takesSubject(subject.id));
  return `${heading('Subjects', 'Every line is a subject and every station a topic from the Cambridge International AS &amp; A Level syllabus.')}
    <div class="syllabus-toolbar">${levelControl()}</div>
    <section aria-labelledby="your-lines-heading">
      <div class="section-heading"><h2 id="your-lines-heading">Your lines</h2><p class="section-meta">${linesSummary()}</p></div>
      ${linesList(null, true)}
      <details class="lines-edit"${state.lines ? '' : ' open'}><summary>${state.lines ? 'Change your lines' : 'Choose your lines'}${icon('chevron')}</summary>${lineChooser('edit')}</details>
    </section>
    ${others.length ? `<section class="content-section" aria-labelledby="other-lines-heading">
      <div class="section-heading"><h2 id="other-lines-heading">Other subjects</h2></div>
      ${linesList(null, true, others)}
    </section>` : ''}`;
}

function syllabusGroup(group) {
  const topicHeading = group.name ? 'h4' : 'h3';
  return `<div class="line-group">
    ${group.name ? `<h3 class="group-head">${group.name}</h3>` : ''}
    <ol class="stations" role="list">${group.topics.map(topic => {
      const ids = levelQuestions(topic.questionIds);
      const size = ids.length;
      const tried = summary(ids).unique;
      const visited = summary(topic.questionIds).unique > 0;
      const diagrams = topic.subjectId === 'physics' ? ids.filter(hasDiagram).length : 0;
      const action = state.drafts[draftKey(topic.id)] ? 'Resume' : 'Practise';
      const level = levelName(state.level);
      const available = !size ? `No ${level} questions yet`
        : tried ? `${tried} of ${count(size, `${level} question`)} answered`
        : count(size, `${level} question`);
      const figures = diagrams === 1 ? '1 with a diagram' : `${diagrams} with diagrams`;
      // The whole station row is the target: number, name, status and a trailing action with an arrow.
      return `<li class="station-row${visited ? ' is-visited' : ''}">
        <span class="station-dot" aria-hidden="true"></span>
        <${topicHeading} class="station-heading">
          <button type="button" class="station-button" data-action="start" data-kind="${topic.id}" ${size ? '' : 'disabled'}>
            ${topic.number ? `<span class="topic-number">${topic.number}</span>` : ''}
            <span class="topic-copy">
              <span class="topic-title-line"><span class="topic-name">${topic.name}</span>${statusBadge(topicStatus(topic))}</span>
              <span class="topic-meta">${available}${diagrams && state.level === 'challenge' ? ` · ${figures}` : ''}</span>
            </span>
            <span class="station-go">${size ? action : 'No questions'}${size ? icon('arrow') : ''}</span>
          </button>
        </${topicHeading}>
      </li>`;
    }).join('')}</ol>
  </div>`;
}

function subjectPage(subject) {
  const { syllabus } = subject;
  const visited = topicsVisited(syllabus.topics);
  const indexes = syllabus.sections.map((_, index) => index);
  const narrowed = subject.id === 'mathematics' && takesSubject('mathematics') && state.lines?.papers?.length;
  const shown = narrowed ? indexes.filter(index => state.lines.papers.includes(String(index + 1))) : indexes;
  const hidden = indexes.filter(index => !shown.includes(index));
  const zone = index => `
      <section class="line-zone" aria-labelledby="syllabus-section-${index}">
        <div class="zone-head"><span class="zone-mark" aria-hidden="true"></span><h2 id="syllabus-section-${index}" tabindex="-1">${escapeText(syllabus.sections[index].name)}</h2></div>
        ${syllabus.sections[index].groups.map(syllabusGroup).join('')}
      </section>`;
  return `<div class="${subject.id}">${heading(`<span class="title-line" aria-hidden="true"></span>${subject.name}`,`${subject.code} · Cambridge International AS &amp; A Level · ${count(syllabus.topics.length, 'station')}, ${visited} visited · ${count(syllabus.questionIds.length, 'question')}`, { href: '#/subjects', label: 'All subjects' })}
    ${subject.practiceNote ? `<p class="section-note">${escapeText(subject.practiceNote)}</p>` : ''}
    <div class="syllabus-toolbar">
      ${levelControl()}
      <div class="toolbar-actions">
        ${subject.id === 'physics' ? `<button type="button" class="button secondary" data-action="start" data-kind="${physicsDiagramKind}">${state.drafts[draftKey(physicsDiagramKind)] ? 'Resume diagram practice' : 'Practise diagrams'}</button>` : ''}
        <a class="text-link" href="${syllabus.source}" target="_blank" rel="noopener">View Cambridge syllabus<span class="sr-only"> (opens in a new tab)</span></a>
      </div>
    </div>
    ${shown.length > 1 ? `<nav class="jump-nav" aria-label="Syllabus sections"><span class="jump-label" aria-hidden="true">Jump to</span>
      ${shown.map(index => `<button type="button" class="jump-chip" data-jump="syllabus-section-${index}">${escapeText(syllabus.sections[index].name.split(' · ')[0].replace(' subject content', ''))}</button>`).join('')}
    </nav>` : ''}
    <div class="line-map${subject.id === 'mathematics' ? ' is-branched' : ''}">${shown.map(zone).join('')}
      ${hidden.length ? `<details class="other-papers"><summary>Other papers: ${hidden.map(index => `P${index + 1}`).join(', ')}${icon('chevron')}</summary>${hidden.map(zone).join('')}</details>` : ''}
    </div></div>`;
}

function progressPage() {
  const next = nextStop();
  const nextTopicId = next.topic?.id ?? null;
  return `${heading('Your progress', 'Your syllabus as a network: every practised topic lights its station.')}
    <section class="progress-map" aria-labelledby="map-heading">
      <h2 id="map-heading" class="sr-only">Network</h2>
      ${networkMap(nextTopicId)}${mapLegend}
      ${isNewcomer() ? '' : `<p class="section-meta">${totalsLine()}</p>`}
    </section>
    ${isNewcomer() ? `<div class="empty-state">${stationMark('open')}
      <h2>Your progress starts with your first answer</h2>
      <p>Every question you answer counts towards your accuracy and lights a station here.</p>
      <a class="button primary" href="#/subjects">Browse subjects${icon('arrow')}</a>
    </div>` : weakestSection(true)}
    <section class="content-section" aria-labelledby="coverage-heading">
      <div class="section-heading"><h2 id="coverage-heading">Progress by line</h2></div>
      ${linesList(nextTopicId, true, [...mySubjects(), ...subjects.filter(subject => !takesSubject(subject.id) && topicsVisited(subject.syllabus.topics))])}
    </section>
    <section class="content-section" aria-labelledby="history-heading">
      <div class="section-heading"><h2 id="history-heading">Practice history</h2></div>
      ${activityRows(12)}
    </section>`;
}

function bookmarkButton(id, listButton = false) {
  const saved = state.saved.includes(id);
  const label = listButton ? 'Remove from saved' : 'Save for review';
  return `<button class="button bookmark-button" type="button" data-action="bookmark" data-id="${id}"${listButton ? '' : ` aria-pressed="${saved}"`}>
    ${icon(saved ? 'bookmarkFilled' : 'bookmark')}<span>${label}</span>
  </button>`;
}

function savedPage() {
  const savedQuestions = state.saved.map(id => questions[id]).filter(Boolean);
  return `${heading('Saved questions', 'Revisit questions you’ve saved during practice.')}
    ${savedQuestions.length ? `
      <div class="list-toolbar">
        <p>${count(savedQuestions.length, 'saved question')}</p>
        <button type="button" class="button primary" data-action="start" data-kind="saved">${state.drafts.saved ? 'Resume saved practice' : 'Practise saved questions'}</button>
      </div>
      <ul class="saved-list">${savedQuestions.map(question => {
        const subject = subjectById[question.subjectId];
        return `<li class="saved-row ${subject.id}" data-flip="saved-${question.id}">
          <div><p class="question-category">${placeLabel(question)} · ${levelName(question.level)}</p><h2>${richText(question.prompt)}</h2></div>
          ${bookmarkButton(question.id, true)}
        </li>`;
      }).join('')}</ul>` : `
      <div class="empty-state"><span class="glyph physics">${icon('bookmark')}</span>
        <h2>No saved questions yet</h2><p>Use “Save for review” during any round to add a question here.</p>
        <a class="button primary" href="#/subjects">Browse subjects</a>
      </div>`}`;
}

function emptyRound(title, description) {
  return `${heading(title, description)}<a class="button primary" href="#/">Return to overview</a>`;
}

function escapeText(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function renderFigure(figure) {
  if (!figure) return '';
  const caption = richText(figure.caption);
  if (figure.svg) {
    return `<figure class="exam-figure"><div role="img" aria-label="${escapeText(figure.alt)}">${figure.svg}</div><figcaption>${caption}</figcaption></figure>`;
  }
  return `<div class="exam-data"><table><caption>${caption}</caption>
    <thead><tr>${figure.headers.map(value => `<th scope="col">${richText(value)}</th>`).join('')}</tr></thead>
    <tbody>${figure.rows.map(row => `<tr>${row.map(value => `<td>${richText(value)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
}

const decimalInput = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;

function numericValue(value) {
  const terms = String(value ?? '').split('/').map(term => term.trim());
  if (terms.length > 2 || !terms.every(term => decimalInput.test(term) && Number.isFinite(Number(term)))) return NaN;
  const [numerator, denominator = 1] = terms.map(Number);
  return numerator / denominator;
}

function correctPart(part, value) {
  return Math.abs(numericValue(value) - part.answer) <= part.tolerance + Number.EPSILON * Math.abs(part.answer);
}

function questionCorrect(question, response) {
  return question.parts
    ? question.parts.every((part, index) => correctPart(part, response[index]))
    : response === question.answer;
}

// The fewest significant figures whose rounding error still falls inside the part's accepted margin.
function figuresNeeded(part) {
  if (!part.tolerance || !part.answer) return 0;
  const exponent = Math.floor(Math.log10(Math.abs(part.answer)));
  for (let figures = 1; figures <= 6; figures += 1) {
    if (0.5 * 10 ** (exponent - figures + 1) <= part.tolerance * (1 + 1e-9)) return Math.max(figures, 2);
  }
  return 0;
}

// For a wrong numeric part: what the numbers show about the slip, when that is clear (see hints.js).
function partHint(part, value) {
  if (correctPart(part, value)) return '';
  const hint = numericHint(part.answer, numericValue(value), figuresNeeded(part));
  return hint ? `<p class="part-hint">${hint}</p>` : '';
}

function numericParts(question, response, checked) {
  const figures = Math.max(0, ...question.parts.map(figuresNeeded));
  const hint = figures ? ` Give each answer to at least ${figures} significant figures, or as an exact fraction.` : '';
  // inputmode stays "text": phone number pads cannot type the "/" of a fraction or a minus sign on every platform.
  return `<legend>Enter a number or fraction for each part.${hint}</legend>${question.parts.map((part, i) =>
    `<label class="numeric-part"><span><strong>(${'abc'[i]})</strong> ${richText(part.label)}</span>
      <span><input type="text" inputmode="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" data-part="${i}" value="${escapeText(response?.[i] ?? '')}"> ${richText(part.unit)}</span></label>
      ${checked ? `<p class="part-result">${correctPart(part, response[i]) ? `${stationMark('done')}Correct` : `${stationMark('miss')}Expected ${formatAnswer(part.answer)} ${richText(part.unit)}`}</p>${partHint(part, response[i])}` : ''}`).join('')}`;
}

// ---------- Teaching notes: why the option the student picked is wrong, and why the others are (see why.js) ----------
const letters = 'ABCD';
const countWords = ['none', 'one', 'two', 'three', 'four'];

// The notes load on their own; if they arrive after the answer was checked, the page is redrawn once to show them.
function showNotesWhenLoaded(subjectId, stillShown) {
  if (why.ready(subjectId)) return;
  why.warm(subjectId).then(() => {
    if (why.ready(subjectId) && stillShown()) render(false, 'update');
  });
}

// Right after a wrong answer: why that option is wrong.
function chosenNote(question, selected) {
  const notes = why.notesFor(question);
  return notes?.[selected] ? `<p class="why-wrong"><strong>You chose ${letters[selected]}.</strong> ${richText(notes[selected])}</p>` : '';
}

// Under the explanation, folded away: why each of the remaining wrong options is wrong.
function otherNotes(question, selected) {
  const notes = why.notesFor(question);
  const rows = (notes ?? []).map((note, index) => ({ note, index })).filter(({ note, index }) => note != null && index !== selected);
  if (!rows.length) return '';
  const heading = `Why the other ${countWords[rows.length]} ${rows.length === 1 ? 'is' : 'are'} wrong`;
  return `<details class="why-others"><summary>${heading}${icon('chevron')}</summary>
    <ul class="why-list">${rows.map(({ note, index }) => `<li><span class="why-letter" aria-hidden="true">${letters[index]}</span><span><span class="sr-only">Option ${letters[index]}: </span>${richText(note)}</span></li>`).join('')}</ul>
  </details>`;
}

function quizPage() {
  const round = currentDraft();
  if (!round) return emptyRound('Practice', 'Choose a subject or start mixed practice from the overview.');

  const question = questions[round.ids[round.index]];
  const checked = Object.hasOwn(round.answers, question.id);
  const selected = checked ? round.answers[question.id] : round.selected;
  const isCorrect = checked && questionCorrect(question, selected);
  const subject = subjectById[question.subjectId];
  const last = round.index + 1 === round.ids.length;
  if (!question.parts) {
    // Start fetching this subject's notes while the student reads; if they are still on their way at check time, redraw when they land.
    if (!checked) why.warm(question.subjectId);
    else showNotesWhenLoaded(question.subjectId, () => location.hash === '#/practice' && currentDraft()?.ids[currentDraft().index] === question.id && Object.hasOwn(currentDraft().answers, question.id));
  }

  return `<div class="practice ${subject.id}">
    <header class="practice-header">
      <a class="back-link" href="#/">Save and exit</a>
      <p>${roundName(round.kind)}</p>
    </header>
    ${journey(round, checked, false, topicById[round.kind]
      // A topic round already names its topic in the header; the journey only adds subject and level.
      ? `${subject.name} · ${levelName(question.level)}`
      : `${placeLabel(question)} · ${levelName(question.level)}`)}
    <div class="quiz-card">
      <div class="quiz-meta ${subject.id}">
        ${bookmarkButton(question.id)}
      </div>
      <h1 data-page-title tabindex="-1">${richText(question.prompt)}</h1>
      ${renderFigure(question.figure)}
      <form id="quiz-form" novalidate>
        <fieldset ${checked ? 'disabled' : ''}>
          ${question.parts ? numericParts(question, selected, checked) : `<legend>Choose one answer</legend>
          <div class="options">${question.options.map((option, index) => {
            let resultClass = '';
            if (checked && index === question.answer) resultClass = ' is-correct';
            if (checked && index === selected && !isCorrect) resultClass = ' is-incorrect';
            return `<label class="option${resultClass}">
              <input type="radio" name="answer" value="${index}" ${index === selected ? 'checked' : ''}>
              <span class="option-letter" aria-hidden="true">${'ABCD'[index]}</span>
              <span>${richText(option)}</span>
              ${resultClass ? `<span class="option-tag">${index === question.answer ? (index === selected ? 'Your answer · Correct' : 'Correct answer') : 'Your answer'}</span>${stationMark(index === question.answer ? 'done' : 'miss')}` : ''}
            </label>`;
          }).join('')}</div>`}
        </fieldset>
        <p class="selection-error" id="selection-error" hidden role="alert">${question.parts ? 'Enter a valid number or fraction for every part.' : 'Select an answer before checking.'}</p>
        ${checked ? `<div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
          <h2 id="feedback-title" tabindex="-1">${stationMark(isCorrect ? 'done' : 'miss')}${isCorrect ? 'Correct' : 'Incorrect'}</h2>
          ${isCorrect || question.parts ? '' : chosenNote(question, selected)}
          ${isCorrect || question.parts ? '' : `<p class="correct-answer">Correct answer: ${letters[question.answer]}. ${richText(question.options[question.answer])}</p>`}
          <p>${richText(question.explanation)}</p>
          ${question.parts ? '' : otherNotes(question, selected)}
          ${!isCorrect && !topicById[round.kind] ? topicFollowUp(question) : ''}
        </div>` : ''}
        <div class="quiz-actions">${checked
          ? `<button class="button primary" type="button" data-action="next">${last ? 'See results' : 'Next question'}</button>`
          : '<button class="button primary" type="submit">Check answer</button>'}
        </div>
      </form>
    </div>
  </div>`;
}

// The round as a short line of stations: answered ones show right or wrong by shape, the current one is a double ring.
// Very long rounds (big saved lists) fall back to a plain progress bar.
function journey(round, checked = false, finished = false, place = '') {
  const total = round.ids.length;
  const position = finished ? total : round.index + Number(checked);
  const label = finished ? 'Your round, question by question'
    : `Question ${round.index + 1} of ${total}${place ? `<span class="journey-place"> · ${place}</span>` : ''}`;
  const legend = finished ? `<p class="journey-legend">${stationMark('done')}Correct${stationMark('miss')}Incorrect</p>` : '';
  if (total > 30) {
    return `<div class="journey"><p class="journey-label" id="journey-label">${label}</p>
      <progress id="round-progress" max="${total}" value="${position}" aria-labelledby="journey-label"></progress></div>`;
  }
  return `<div class="journey"><p class="journey-label">${label}</p>
    <ol class="journey-line" aria-hidden="true" style="--stops: ${total}">${round.ids.map((id, index) => {
      const answered = Object.hasOwn(round.answers, id) && (finished || index < round.index || (index === round.index && checked));
      const kind = answered ? (questionCorrect(questions[id], round.answers[id]) ? 'done' : 'miss') : index === round.index && !finished ? 'now' : 'open';
      const fresh = checked && !finished && index === round.index ? ' is-fresh' : '';
      return `<li class="stop-${kind}${fresh}">${stationMark(kind)}</li>`;
    }).join('')}</ol>${legend}</div>`;
}

// After a wrong answer in a mixed or saved round: a way into that question's topic. The round stays saved.
function topicFollowUp(question) {
  const place = placeByQuestion.get(question.id);
  if (!place || !levelQuestions(place.topic.questionIds).length) return '';
  return `<p class="feedback-next"><button type="button" class="text-button" data-action="start" data-kind="${place.topic.id}">Practise ${topicLabel(place.topic)}</button><span>This round stays saved.</span></p>`;
}

function missedIds(round) {
  return round.ids.filter(id => !questionCorrect(questions[id], round.answers[id]));
}

// In the review: why the option the student picked was wrong, when there is a note for it.
function reviewNote(item, selected) {
  const notes = why.notesFor(item);
  return notes?.[selected] ? `<p><strong>Why that is wrong:</strong> ${richText(notes[selected])}</p>` : '';
}

function resultsPage() {
  const round = state.history[0];
  if (!round) return emptyRound('Practice results', 'Complete a practice round to see your results.');
  for (const subjectId of new Set(round.ids.filter(id => !questions[id].parts).map(id => questions[id].subjectId))) {
    showNotesWhenLoaded(subjectId, () => location.hash === '#/results');
  }

  const missed = missedIds(round);
  const retryable = missed.filter(id => currentQuestionIds.has(id));
  // A topic round can carry on with the next ten from that topic.
  const roundTopic = topicById[round.kind];
  const remaining = roundTopic ? levelQuestions(roundTopic.questionIds, round.level ?? state.level).filter(id => !round.ids.includes(id)).length : 0;
  const keepGoing = remaining ? `<button class="button ${retryable.length ? 'secondary' : 'primary'}" type="button" data-action="start" data-kind="${roundTopic.id}">Keep going: next ${Math.min(roundSize, remaining)}${icon('arrow')}</button>` : '';
  const summaryLine = `${accuracy({ correct: round.correct, answered: round.ids.length })} accuracy this round.`;
  const nextLine = !missed.length ? ' Every answer was correct.'
    : retryable.length ? ` Retry the ${retryable.length === 1 ? 'one' : retryable.length} you missed while the explanations are fresh.` : '';

  // Topics behind the missed questions, most misses first. Only worth listing when the round spanned topics.
  const byTopic = new Map();
  for (const id of round.ids) {
    const place = placeByQuestion.get(id);
    if (!place) continue;
    const entry = byTopic.get(place.topic.id) ?? { topic: place.topic, missed: 0, total: 0 };
    entry.total += 1;
    entry.missed += Number(missed.includes(id));
    byTopic.set(place.topic.id, entry);
  }
  const revisit = [...byTopic.values()].filter(entry => entry.missed).sort((a, b) => b.missed - a.missed).slice(0, 4);
  const revisitSection = byTopic.size > 1 && revisit.length ? `<section class="content-section" aria-labelledby="revisit-heading">
      <div class="section-heading"><h2 id="revisit-heading">Topics to revisit</h2></div>
      ${weakTopicRows(revisit.map(entry => ({ subject: subjectById[entry.topic.subjectId], topic: entry.topic, status: topicStatus(entry.topic), note: `Missed ${entry.missed} of ${entry.total} this round` })))}
    </section>` : '';

  return `<div class="practice">
    ${heading('Practice complete', roundName(round.kind), { href: '#/', label: 'Overview' })}
    <section class="result-card" aria-labelledby="result-heading">
      <h2 id="result-heading" class="result-heading"><span data-count="${round.correct}" data-delay="520">${round.correct}</span> of ${round.ids.length} correct</h2>
      <div class="result-copy">${journey(round, false, true)}<p>${nextLine.trim() || summaryLine}</p></div>
      <div class="result-actions">
        ${retryable.length ? `<button class="button primary" type="button" data-action="start" data-kind="${retryKind}">Retry the ${retryable.length === 1 ? 'one' : retryable.length} you missed</button>` : ''}
        ${keepGoing}
        <a class="button ${retryable.length || keepGoing ? 'secondary' : 'primary'}" href="#/progress">View progress</a>
      </div>
    </section>
    ${revisitSection}
    <section class="content-section" aria-labelledby="review-heading">
      <div class="section-heading"><h2 id="review-heading">Review your answers</h2></div>
      <div class="review-list">${round.ids.map((id, index) => {
        const item = questions[id];
        const correct = questionCorrect(item, round.answers[id]);
        return `<details class="review-item">
          <summary>
            <span class="result-icon">${stationMark(correct ? 'done' : 'miss')}<span class="result-word">${correct ? 'Correct' : 'Incorrect'}</span></span>
            <span class="review-title"><span>${index + 1}. ${richText(item.prompt)}</span><span class="review-topic">${placeLabel(item)}</span></span>
            <span class="review-chevron">${icon('chevron')}</span>
          </summary>
          <div class="review-copy">
            ${renderFigure(item.figure)}
            ${item.parts ? item.parts.map((part, i) => `<p><strong>(${'abc'[i]}) ${richText(part.label)}</strong><br>Your answer: ${escapeText(round.answers[id][i])} ${richText(part.unit)} · Expected: ${formatAnswer(part.answer)} ${richText(part.unit)}</p>${partHint(part, round.answers[id][i])}`).join('') : `<p><strong>Your answer:</strong> ${richText(item.options[round.answers[id]])}</p>
            ${correct ? '' : `${reviewNote(item, round.answers[id])}<p><strong>Correct answer:</strong> ${richText(item.options[item.answer])}</p>`}`}
            <p>${richText(item.explanation)}</p>
          </div>
        </details>`;
      }).join('')}</div>
    </section>
  </div>`;
}

// Where a page sits along the journey, so the new page can arrive from the direction of travel:
// tabs run in navigation order, a subject sits just past Subjects, and a round sits past them all.
// The greeting sits before everything: its two steps (subjects, then how they heard) run forward into the overview.
const routeOrder = { welcome: -2, '': 0, subjects: 1, progress: 2, saved: 3, account: 4, practice: 5, results: 6 };
let lastRoute = null;

function routeRank(hash) {
  const [, section = '', sub = ''] = hash.slice(1).split('/');
  return (routeOrder[section] ?? 0) + (sub ? 0.5 : 0);
}

// kind: 'check' (an answer was checked), 'step' (on to the next question); otherwise it is worked out here:
// a different page is a 'route', a move between the greeting's own steps is a 'flow', anything else on the same page is a quiet 'update'.
// Returns a promise that resolves once the page has been redrawn (View Transitions draw it a frame later).
function render(focus = false, kind) {
  welcome.gate();
  const hash = location.hash;
  const [, section = '', sub = ''] = hash.slice(1).split('/');
  const key = `${section}/${sub}`;
  const first = lastRoute === null;
  const moved = !first && key !== lastRoute.key;
  const inFlow = moved && section === 'welcome' && lastRoute.key.startsWith('welcome/');
  const dir = moved && routeRank(hash) < lastRoute.rank ? 'back' : 'forward';
  lastRoute = { key, rank: routeRank(hash) };
  const motionKind = kind ?? (inFlow ? 'flow' : first || moved ? 'route' : 'update');
  const apply = () => paint(focus, motionKind);
  if (first) {
    apply();
    return Promise.resolve();
  }
  return motion.run(apply, { kind: motionKind, dir });
}

function paint(focus, motionKind) {
  const [, section, subjectId] = location.hash.slice(1).split('/');
  const subject = Object.hasOwn(subjectById, subjectId) ? subjectById[subjectId] : null;
  let active = section;
  let title;
  let content;
  switch (section) {
    case 'subjects':
      content = subject ? subjectPage(subject) : subjectIndex();
      title = subject?.name ?? 'Subjects';
      break;
    case 'progress':
      content = progressPage();
      title = 'Progress';
      break;
    case 'saved':
      content = savedPage();
      title = 'Saved questions';
      break;
    case 'account':
      content = account.page();
      title = 'Account';
      break;
    case 'welcome':
      content = welcome.page(subjectId);
      title = 'Welcome';
      break;
    case 'practice':
      content = quizPage();
      title = 'Practice';
      active = navForRound(currentDraft()?.kind);
      break;
    case 'results':
      // Results belong to where the round was started from, not to Progress.
      content = resultsPage();
      title = 'Results';
      active = navForRound(state.history[0]?.kind);
      break;
    default:
      content = overview();
      title = 'A Level revision';
      active = 'overview';
  }

  const previousProgress = main.querySelector('#round-progress');
  main.innerHTML = content;
  const newProgress = main.querySelector('#round-progress');
  if (previousProgress && newProgress && previousProgress.max === newProgress.max) {
    const nextValue = newProgress.value;
    newProgress.replaceWith(previousProgress);
    previousProgress.value = nextValue;
  }
  document.title = `Study Circuit · ${title}`;
  document.body.dataset.route = ['subjects', 'progress', 'saved', 'practice', 'results', 'account', 'welcome'].includes(section) ? section : 'overview';
  for (const link of navLinks) {
    if (link.dataset.nav === active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  if (section === 'welcome') welcome.afterPaint();
  if (focus) {
    window.scrollTo(0, 0);
    main.querySelector('[data-page-title]')?.focus({ preventScroll: true });
  }
  motion.settle(main, motionKind);
  motion.moveBars();
}

function navForRound(kind) {
  if (kind === 'saved') return 'saved';
  return topicById[kind] || kind === physicsDiagramKind ? 'subjects' : 'overview';
}

function navigate(path) {
  if (location.hash === path) render(true);
  else location.hash = path;
}

function startRound(kind) {
  const key = draftKey(kind);
  // A retry always uses the latest results, never an older unfinished retry.
  if (kind === retryKind) delete state.drafts[key];
  if (!Object.hasOwn(state.drafts, key)) {
    const level = roundLevel(kind);
    let ids;
    if (kind === mixedKind) {
      // Mixed practice rides only the student's own lines (and Maths papers).
      const lines = mySubjects();
      const perSubject = Math.floor(mixedLength / lines.length);
      const extraQuestions = mixedLength % lines.length;
      ids = shuffle(shuffle(lines).flatMap((subject, index) => {
        const subjectIds = levelQuestions([...new Set(myTopics(subject).flatMap(topic => topic.questionIds))], level);
        return shuffle(subjectIds).slice(0, perSubject + Number(index < extraQuestions));
      }));
    } else if (kind === weakestKind) {
      // Up to ten questions taken in turn from up to five of the weakest topics.
      const pools = weakestTopics(5).map(item => topicRoundIds(item.topic, level, [], roundSize));
      ids = [];
      while (ids.length < roundSize && pools.some(pool => pool.length)) {
        for (const pool of pools) if (pool.length && ids.length < roundSize) ids.push(pool.shift());
      }
    } else if (kind === physicsDiagramKind) {
      ids = shuffle(physicsDiagramTopics).slice(0, 10).map(options => shuffle(options)[0]);
    } else if (kind === 'saved') {
      ids = shuffle(state.saved.filter(id => Object.hasOwn(questions, id)));
    } else if (kind === retryKind) {
      ids = state.history[0] ? shuffle(missedIds(state.history[0]).filter(id => currentQuestionIds.has(id))) : [];
    } else if (Object.hasOwn(topicById, kind)) {
      // Ten at a time; "Keep going" skips the questions of the last round on this topic while others remain.
      const last = state.history.find(round => round.kind === kind);
      ids = topicRoundIds(topicById[kind], level, last?.ids ?? [], roundSize);
      if (!ids.length) ids = topicRoundIds(topicById[kind], level, [], roundSize);
    }
    if (!ids?.length) return;
    state.drafts[key] = { kind, level, ids, index: 0, selected: null, answers: {}, size: ids.length };
  }
  state.active = key;
  persist();
  navigate('#/practice');
}

function submitAnswer() {
  const round = currentDraft();
  if (!round) return;
  const id = round.ids[round.index];
  const question = questions[id];
  if (Object.hasOwn(round.answers, id)) return;
  const selected = round.selected;
  const invalid = question.parts
    ? question.parts.some((_, index) => !Number.isFinite(numericValue(selected?.[index])))
    : !Number.isInteger(selected) || !question.options[selected];
  if (invalid) {
    motion.setHidden(document.querySelector('#selection-error'), false);
    main.querySelector(question.parts ? '[data-part]' : 'input[name="answer"]').focus();
    return;
  }

  round.answers[id] = selected;
  const attempt = state.attempts[id] ?? { answered: 0, correct: 0 };
  attempt.answered += 1;
  attempt.correct += Number(questionCorrect(question, selected));
  state.attempts[id] = attempt;
  persist();
  render(false, 'check').then(() => {
    // Move focus to the result without yanking the round header off screen; scroll only if the feedback is hidden.
    const feedbackTitle = document.querySelector('#feedback-title');
    feedbackTitle?.focus({ preventScroll: true });
    feedbackTitle?.closest('.feedback')?.scrollIntoView({ block: 'nearest', behavior: motion.reduced() ? 'auto' : 'smooth' });
  });
}

function advance() {
  const round = currentDraft();
  if (!round || !Object.hasOwn(round.answers, round.ids[round.index])) return;
  if (round.index + 1 < round.ids.length) {
    round.index += 1;
    round.selected = null;
    persist();
    render(true, 'step');
    return;
  }

  const correct = round.ids.filter(id => questionCorrect(questions[id], round.answers[id])).length;
  state.history.unshift({ ...round, correct, finishedAt: Date.now() });
  state.history.length = Math.min(state.history.length, 12);
  delete state.drafts[state.active];
  state.active = Object.keys(state.drafts).at(-1) ?? null;
  persist();
  navigate('#/results');
}

function toggleSaved(button) {
  const { id } = button.dataset;
  if (!Object.hasOwn(questions, id)) return;
  const isSaved = state.saved.includes(id);
  state.saved = isSaved ? state.saved.filter(item => item !== id) : [...state.saved, id];
  persist();
  announcement.textContent = isSaved ? 'Question removed from saved questions.' : 'Question saved for review.';
  if (location.hash === '#/saved') {
    render().then(() => (main.querySelector('[data-action="bookmark"]') ?? main.querySelector('h1')).focus());
  } else {
    button.setAttribute('aria-pressed', String(!isSaved));
    button.querySelector('svg').outerHTML = icon(isSaved ? 'bookmark' : 'bookmarkFilled');
    motion.pop(button.querySelector('svg'));
  }
}

for (const element of document.querySelectorAll('[data-icon]')) {
  element.innerHTML = icon(element.dataset.icon);
}

// Theme controls: compact icons in the phone and tablet header, labelled buttons in the rail.
for (const slot of document.querySelectorAll('[data-theme-slot]')) {
  slot.innerHTML = themeControl(slot.dataset.themeSlot === 'compact');
}
applyTheme(readTheme());
darkQuery.addEventListener('change', () => applyTheme(readTheme()));
document.addEventListener('click', event => {
  const themeButton = event.target.closest('[data-theme-choice]');
  const choice = themeButton?.dataset.themeChoice;
  if (!choice) return;
  try {
    if (choice === 'system') localStorage.removeItem(themeKey);
    else localStorage.setItem(themeKey, choice);
  } catch { /* storage blocked: the choice lasts for this visit */ }
  motion.themeSwap(() => applyTheme(choice), themeButton);
  announcement.textContent = choice === 'system' ? 'Theme now matches your device.' : `${choice === 'dark' ? 'Dark' : 'Light'} theme on.`;
});

const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('#desktop-sidebar');
// The sidebar hangs from the bottom of the header; track the header's real height (zoom, safe areas, wrapping).
const appHeader = document.querySelector('.app-header');
new ResizeObserver(() => document.documentElement.style.setProperty('--header-h', `${appHeader.offsetHeight}px`)).observe(appHeader);
// The desktop sidebar is a non-modal panel: opening it moves focus in, and it closes on Escape,
// on choosing a link, on clicking elsewhere, or when focus moves out of it.
// From 1100px the sidebar is a permanent rail: always visible, never inert, nothing to open or close.
const railQuery = matchMedia('(min-width: 1100px)');
const sidebarIsOpen = () => sidebarToggle.getAttribute('aria-expanded') === 'true';

function syncRail() {
  if (railQuery.matches) {
    sidebarToggle.setAttribute('aria-expanded', 'false');
    sidebarToggle.innerHTML = icon('menu');
    document.body.classList.remove('sidebar-open');
    sidebar.inert = false;
  } else {
    sidebar.inert = !sidebarIsOpen();
  }
}
railQuery.addEventListener('change', syncRail);

function setSidebar(open, { returnFocus = false } = {}) {
  if (railQuery.matches || open === sidebarIsOpen()) return;
  sidebarToggle.setAttribute('aria-expanded', String(open));
  sidebarToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  sidebarToggle.innerHTML = icon(open ? 'close' : 'menu');
  sidebar.inert = !open;
  document.body.classList.toggle('sidebar-open', open);
  if (open) (sidebar.querySelector('a[aria-current="page"]') ?? sidebar.querySelector('a'))?.focus();
  else if (returnFocus) sidebarToggle.focus();
}

sidebarToggle.addEventListener('click', () => setSidebar(!sidebarIsOpen()));
sidebar.addEventListener('click', event => {
  if (event.target.closest('a')) setSidebar(false);
});
sidebar.addEventListener('focusout', event => {
  if (event.relatedTarget && !sidebar.contains(event.relatedTarget) && event.relatedTarget !== sidebarToggle) setSidebar(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && sidebarIsOpen()) setSidebar(false, { returnFocus: true });
});
document.addEventListener('pointerdown', event => {
  if (sidebarIsOpen() && !sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) setSidebar(false);
});
// Shrinking to phone width hides the sidebar; leave it closed rather than invisibly open.
matchMedia('(max-width: 780px)').addEventListener('change', event => {
  if (event.matches) setSidebar(false);
});

// Another tab saved progress: take its copy so the two tabs do not overwrite each other's work.
window.addEventListener('storage', event => {
  if (event.key !== storageKey) return;
  const fresh = restoreState();
  for (const key of Object.keys(state)) delete state[key];
  Object.assign(state, fresh);
  render();
});

document.addEventListener('click', event => {
  const skip = event.target.closest('[data-skip]');
  if (skip) {
    event.preventDefault();
    main.focus();
    return;
  }

  const jump = event.target.closest('[data-jump]');
  if (jump) {
    const target = document.getElementById(jump.dataset.jump);
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    target?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    target?.focus({ preventScroll: true });
    return;
  }

  const button = event.target.closest('button[data-action]');
  if (!button) return;
  if (button.dataset.action === 'start') startRound(button.dataset.kind);
  if (button.dataset.action === 'skip-lines') {
    state.lines = { subjects: subjects.map(subject => subject.id), papers: [], skipped: true };
    persist();
    announcement.textContent = 'All subjects kept. You can choose your lines any time on the Subjects page.';
    welcome.subjectsDone();
  }
  if (button.dataset.action === 'skip-heard') welcome.skipHeard();
  if (button.dataset.action === 'next') advance();
  if (button.dataset.action === 'bookmark') toggleSaved(button);
});

main.addEventListener('input', event => {
  if (!event.target.matches('[data-part]')) return;
  const round = currentDraft();
  if (!round || Object.hasOwn(round.answers, round.ids[round.index])) return;
  if (!Array.isArray(round.selected)) round.selected = [];
  round.selected[Number(event.target.dataset.part)] = event.target.value.replaceAll('−', '-');
  motion.setHidden(document.querySelector('#selection-error'), true);
  persist();
});

main.addEventListener('change', event => {
  if (event.target.matches('input[name="line"]')) {
    const form = event.target.form;
    motion.setHidden(form.querySelector('#lines-error'), true);
    if (event.target.value === 'mathematics') {
      const picker = form.querySelector('.paper-picker');
      // The greeting's papers keep their place and fade in; elsewhere the picker unfolds.
      if (form.dataset.lineChooser === 'welcome') picker.classList.toggle('is-off', !event.target.checked);
      else motion.setHidden(picker, !event.target.checked);
    }
    welcome.sync(form);
    return;
  }
  if (event.target.matches('input[name="paper"]')) {
    welcome.sync(event.target.form);
    return;
  }
  if (event.target.matches('input[name="practice-level"]')) {
    state.level = event.target.value === 'challenge' ? 'challenge' : 'simple';
    persist();
    // The page is redrawn a frame later, so keyboard focus goes back to the chosen radio once it exists.
    render().then(() => main.querySelector('input[name="practice-level"]:checked')?.focus({ preventScroll: true }));
    announcement.textContent = levelName(state.level) + ' practice selected.';
    return;
  }
  if (event.target.matches('input[name="answer"]') && currentDraft()) {
    currentDraft().selected = Number(event.target.value);
    motion.setHidden(document.querySelector('#selection-error'), true);
    persist();
  }
});

function saveLines(form) {
  const chosen = [...form.querySelectorAll('input[name="line"]:checked')].map(input => input.value);
  if (!chosen.length) {
    motion.setHidden(form.querySelector('#lines-error'), false);
    form.querySelector('input[name="line"]').focus();
    return;
  }
  const papers = chosen.includes('mathematics') ? [...form.querySelectorAll('input[name="paper"]:checked')].map(input => input.value) : [];
  state.lines = { subjects: chosen, papers, skipped: false };
  persist();
  announcement.textContent = `Your lines are saved: ${linesSummary()}.`;
  if (form.dataset.lineChooser === 'welcome') welcome.subjectsDone();
  else render(true);
}

main.addEventListener('submit', event => {
  if (event.target.matches('[data-line-chooser]')) {
    event.preventDefault();
    saveLines(event.target);
    return;
  }
  if (event.target.matches('[data-heard-form]')) {
    event.preventDefault();
    welcome.submitHeard(event.target);
    return;
  }
  if (event.target.id === 'quiz-form') {
    event.preventDefault();
    submitAnswer();
  }
});

window.addEventListener('hashchange', () => render(true));
motion.init();
syncRail();
showStorageStatus();
account.start();
welcome.start();
render();
