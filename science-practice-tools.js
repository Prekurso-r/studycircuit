export function choices(bank, level, rows) {
  return rows.map(([slug, prompt, correct, distractors, explanation, figure]) => {
    const answer = [...slug].reduce((sum, character) => sum + character.charCodeAt(0), 0) % 4;
    const options = [...distractors];
    options.splice(answer, 0, correct);
    return {
      id: `${bank}-practice-${slug}`, bank, level, prompt, options, answer, explanation,
      ...(figure && { figure }),
    };
  });
}

export function calculations(bank, rows) {
  return rows.map(([slug, prompt, parts, explanation, figure]) => ({
    id: `${bank}-practice-${slug}`, bank, level: 'challenge', prompt, parts, explanation,
    ...(figure && { figure }),
  }));
}

export function part(label, answer, unit = '', tolerance = 0) {
  return { label, answer, unit, tolerance };
}

export function table(caption, headers, rows) {
  return { caption, headers, rows };
}
