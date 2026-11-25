// A plain, checkable observation about a wrong numeric answer. No DOM: easy to test.
//
// It only says what the numbers show ("1000 times too big", "right size, wrong sign"), never a guess about what the
// student was thinking, and it only speaks when the pattern is exact enough to be sure of. Anything else gets no hint.

const near = (value, target, within) => Math.abs(value - target) <= within * Math.abs(target);

// 10, 100, 1000 and a million: the slips that come from units and prefixes.
const powers = new Map([[1, '10'], [2, '100'], [3, '1000'], [6, 'a million']]);

// expected: the stored answer. given: what the student typed, already read as a number. figures: how many significant
// figures the part's accepted margin needs (0 when it does not say).
export function numericHint(expected, given, figures = 0) {
  if (!Number.isFinite(expected) || !Number.isFinite(given) || expected === 0 || given === expected) return '';
  const ratio = given / expected;

  if (near(given, expected, 0.05)) {
    return `Very close. Check your rounding${figures ? `: give at least ${figures} significant figures` : ''}.`;
  }
  if (near(given, -expected, 0.02)) return 'Right size, wrong sign.';

  if (ratio > 0) {
    const exponent = Math.log10(ratio);
    const whole = Math.round(exponent);
    if (Math.abs(exponent - whole) < 0.006 && powers.has(Math.abs(whole))) {
      const times = powers.get(Math.abs(whole));
      return `Your answer is ${times} times too ${whole > 0 ? 'big' : 'small'}. Check the units and any powers of ten.`;
    }
    if (near(ratio, 2, 0.01)) return 'Your answer is double the expected value. Check for a factor of 2.';
    if (near(ratio, 0.5, 0.01)) return 'Your answer is half the expected value. Check for a factor of 2.';
    if (near(ratio, Math.PI, 0.01)) return 'Your answer is the expected value multiplied by π. Check whether π belongs in this step.';
    if (near(ratio, 1 / Math.PI, 0.01)) return 'Your answer is the expected value divided by π. Check whether π belongs in this step.';
  }

  if (Math.abs(expected) !== 1 && near(given, 1 / expected, 0.02)) {
    return 'This looks like the reciprocal of the expected value. Check which way up the division goes.';
  }
  return '';
}
