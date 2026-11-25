// How two copies of one student's progress become one. Pure functions, no DOM: easy to test.
//
// What only ever grows (answers given, finished rounds) is combined, so nothing earned on one device is lost.
// What a student can undo (saved questions, the round in progress, their lines, the level) follows
// whichever copy was changed last, so un-saving a question on one device sticks on the other.

const roundKey = round => `${round?.kind}|${round?.finishedAt}`;

function moreAnswered(a, b) {
  if (!a) return b;
  if (!b) return a;
  if (a.answered !== b.answered) return a.answered > b.answered ? a : b;
  return a.correct >= b.correct ? a : b;
}

export function mergeProgress(local, remote) {
  const localIsNewer = (local.updatedAt ?? 0) >= (remote.updatedAt ?? 0);
  const [newer, older] = localIsNewer ? [local, remote] : [remote, local];

  const attempts = {};
  for (const id of new Set([...Object.keys(local.attempts), ...Object.keys(remote.attempts)])) {
    attempts[id] = structuredClone(moreAnswered(local.attempts[id], remote.attempts[id]));
  }

  const seen = new Set();
  const history = [...local.history, ...remote.history]
    .filter(round => {
      const key = roundKey(round);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => (b.finishedAt ?? 0) - (a.finishedAt ?? 0))
    .slice(0, 12)
    .map(round => structuredClone(round));

  const merged = structuredClone(newer);
  merged.attempts = attempts;
  merged.history = history;
  merged.lines = structuredClone(newer.lines ?? older.lines ?? null);
  merged.updatedAt = Math.max(local.updatedAt ?? 0, remote.updatedAt ?? 0);
  return merged;
}

// Same content, whatever the key order.
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value) ?? 'null';
}

export const sameProgress = (a, b) => canonical(a) === canonical(b);
