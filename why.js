// Why each wrong option is wrong, written per question.
//
// The notes live in one file per subject (why-physics.js and so on), each exporting `why`: an object keyed by question id
// whose value lists one note per option, with null where the option is the right answer. They are fetched the first time
// a question of that subject is shown, so they cost nothing until they are needed. A question with no notes yet, or a
// file that cannot be loaded, simply shows the explanation it always had.

const loaders = {
  physics: () => import('./why-physics.js'),
  chemistry: () => import('./why-chemistry.js'),
  biology: () => import('./why-biology.js'),
  mathematics: () => import('./why-mathematics.js'),
};

const tables = new Map();
const pending = new Map();

// Start loading a subject's notes (safe to call again and again). Resolves when they are ready, or when they could not be.
export function warm(subjectId) {
  if (tables.has(subjectId) || !loaders[subjectId]) return Promise.resolve();
  if (!pending.has(subjectId)) {
    pending.set(subjectId, loaders[subjectId]().then(
      module => { tables.set(subjectId, module.why ?? {}); },
      () => { pending.delete(subjectId); },
    ));
  }
  return pending.get(subjectId);
}

export const ready = subjectId => tables.has(subjectId);

// A note only counts if it is whole: one string for every wrong option and null for the right one.
export function validNotes(question, notes) {
  return Array.isArray(notes)
    && !question.parts
    && notes.length === question.options.length
    && notes.every((note, index) => (index === question.answer ? note == null : typeof note === 'string' && note.trim() !== ''));
}

// The notes for a multiple-choice question, or null if there are none (yet) or they are not loaded.
export function notesFor(question) {
  const notes = tables.get(question.subjectId)?.[question.id];
  return validNotes(question, notes) ? notes : null;
}
