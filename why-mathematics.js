// Why each wrong option is wrong, for the mathematics questions that have notes so far (see why.js for the format).
export const why = {
  // ---- 1.1 Quadratics ----
  'math-1-1-square-form': [
    'Expanding (x + 4)² gives x² + 8x + 16, so a 16 has been added and has to be taken away: 3 − 16 = −13, not +3.',
    null,
    'The bracket should use half the coefficient of x, which is 4, not 8. (x + 8)² − 61 expands to x² + 16x + 3.',
    'The sign inside the bracket is wrong. (x − 4)² − 13 expands to x² − 8x + 3, with −8x instead of +8x.',
  ],
  'math-1-1-vertex-from-square': [
    'The bracket (x − 3) is zero when x = 3, not −3. The sign of the number inside the bracket is reversed to find x.',
    'The 7 outside the bracket is the y-coordinate exactly as it stands. Its sign is not reversed.',
    null,
    'The coordinates are the wrong way round. The x-coordinate comes from the bracket, 3, and the y-coordinate from the constant, 7.',
  ],
  'math-1-1-discriminant': [
    'This subtracts the wrong way round. b² − 4ac is 25 − 24 = 1, not 24 − 25.',
    '13 is 25 − 12, so only half of 4ac has been taken away. The full term is 4 × 2 × 3 = 24.',
    'This adds the two terms, 25 + 24. The discriminant subtracts 4ac from b².',
    null,
  ],
  'math-1-1-repeated-root': [
    null,
    'x = −3 is a root, because (x + 3)² is zero there. A discriminant of zero means one real root, not none.',
    'The two roots are the same number, −3. Distinct roots are counted once each, so there is one.',
    'A quadratic equation has at most two roots, so three is never possible.',
  ],
  'math-1-1-factor-roots': [
    'The signs are reversed. x = 2 gives 2(4) + 2 − 6 = 4, which is not zero.',
    null,
    'Neither is a root. x = 2 gives 2(4) + 2 − 6 = 4, and x = −3 gives 2(9) − 3 − 6 = 9.',
    'x = −2 is a root, but x = −3/2 is not: 2(9/4) − 3/2 − 6 = −3.',
  ],
  'math-1-1-formula-surds': [
    'The discriminant is 9 + 4 = 13, not 9 − 4 = 5. The −4ac term is positive here because c is −1.',
    'The surd is right, but −b is −3, not 3, so the sign in front of the 3 is wrong.',
    null,
    'The whole numerator has to be divided by 2a, which is 2. Here the 3 is not divided, and neither is the surd.',
  ],
  'math-1-1-strict-inequality': [
    'This is where the quadratic is positive, outside the roots. It is below zero only between them.',
    'At x = 2 and x = 3 the expression equals zero, which is not less than zero, so the end points are left out.',
    'The roots are 2 and 3, not −3 and −2. The answer lies between the roots.',
    null,
  ],
  'math-1-1-downward-inequality': [
    null,
    'This is outside the roots, where −x² + x + 6 is negative. The parabola opens downwards, so it is above the axis between the roots.',
    'The inequality is ≥, so the end points, where the expression equals zero, are included.',
    'The roots are −2 and 3, not −3 and 2. Factorising gives −(x + 2)(x − 3).',
  ],
  'math-1-1-line-and-parabola': [
    'These are the right roots with their signs reversed. x = 1 gives 1 − 2 − 3 = −4 in x² − 2x − 3, not zero.',
    null,
    'x = 1 does not solve x² − 2x − 3 = 0, because 1 − 2 − 3 = −4. The factors (x + 1) and (x − 3) give −1 and 3.',
    'Neither solves x² − 2x − 3 = 0. x = 4 gives 16 − 8 − 3 = 5, and x = −2 gives 4 + 4 − 3 = 5.',
  ],
  'math-1-1-quadratic-in-x-squared': [
    '1 and 9 are the values of u = x², not of x. Take the square roots to get the values of x.',
    '1 and 9 are the values of x², not of x. The values of x are their square roots, ±1 and ±3.',
    null,
    'The positive roots are right, but every positive square root has a negative partner too, so −1 and −3 are missing.',
  ],
  'math-1-1-parameter-distinct-roots': [
    'This is where the discriminant is negative, which means no real roots. Two distinct roots need 4k² − 36 > 0.',
    null,
    'At k = −3 and k = 3 the discriminant is zero, which gives one repeated root. The end points are left out for distinct roots.',
    'k < −3 works as well, because the discriminant depends on k², so a negative k can make it positive too.',
  ],
  'math-1-1-quartic-two-roots': [
    'This gives two positive values of u = x², and each gives two values of x, so there are four solutions, not two.',
    'k = 0 gives u = 0 or 8, so x = 0 or x = ±2√2. That is three solutions, not two.',
    null,
    'k = 16 gives two solutions, but k = 0 gives three (x = 0 and x = ±2√2), so k = 0 does not belong.',
  ],
  'math-1-1-quadratic-in-square-root': [
    'x = 9/4 comes from squaring u = −3/2, but √x cannot be negative. Substituting gives 9/2 + 3/2 − 3 = 3, not 0.',
    'x = 9/4 is not a solution: 2(9/4) + 3/2 − 3 = 3, not 0. It comes from the rejected value u = −3/2.',
    'There is a real solution. x = 1 gives 2 + 1 − 3 = 0.',
    null,
  ],
  'math-1-1-reciprocal-quadratic': [
    null,
    '2 and 8 are the values of u = x², not of x. The values of x are their square roots.',
    'x = √5 does not work: 5 + 16/5 = 8.2, not 10.',
    'Each positive value of x² also gives a negative x, so −√2 and −2√2 are missing.',
  ],
  'math-1-1-simultaneous-product': [
    'The y-value is wrong for the second pair. y = (x + 2)/2 with x = −8/3 gives −1/3, not +1/3.',
    null,
    'The x-values should be 2 and −8/3. x = 8/3 does not satisfy 3x² + 2x − 16 = 0.',
    'The pair (2, 1) does not satisfy 2y = x + 2, because 2(1) = 2 but x + 2 = 4.',
  ],
  'math-1-1-combined-inequalities': [
    'This is the union of the two solution sets. Both inequalities must hold at once, so only where they overlap counts.',
    'The end points are mixed up. x = −1 makes the second expression 0, which is not > 0, so −1 is out, and x = 3 satisfies the first, so 3 is in.',
    null,
    'This is only the solution of the first inequality. The second, −x² + 3x + 4 > 0, also has to hold, and it fails for x ≤ −1.',
  ],
  'math-1-1-roots-opposite-signs': [
    'A positive product means the roots have the same sign, both positive or both negative, not opposite signs.',
    'c < 4 makes the roots real, but not of opposite signs. For c = 3 the roots are 1 and 3, both positive.',
    'c = 0 gives the roots 0 and 4, and 0 is neither positive nor negative.',
    null,
  ],
  'math-1-1-positive-for-all-x': [
    null,
    'At p = 4 the expression is (x − 2)², which is zero at x = 2. It must be strictly greater than zero.',
    'For p < 4 the minimum value, p − 4, is negative, so the expression dips below zero.',
    'p = 1 is not enough: the minimum is then 1 − 4 = −3 at x = 2. Positivity for every x needs p > 4, and p > 0 alone is not enough.',
  ],
};
