function choices(topic, level, rows) {
  return rows.map(([slug, prompt, correct, distractors, explanation, figure], index) => {
    const answer = (index + topic) % 4;
    const options = [...distractors];
    options.splice(answer, 0, correct);
    return {
      id: 'math-1-' + topic + '-' + slug, bank: 'mathematics-1.' + topic, level,
      prompt, options, answer, explanation, ...(figure && { figure }),
    };
  });
}

function part(label, answer, unit = '', tolerance = 0) {
  return { label, unit, answer, tolerance };
}

function calculations(topic, rows) {
  return rows.map(([slug, prompt, parts, explanation, figure]) => ({
    id: 'math-1-' + topic + '-' + slug, bank: 'mathematics-1.' + topic, level: 'challenge',
    prompt, parts, explanation, ...(figure && { figure }),
  }));
}

const inverseDiagram = {
  caption: 'P is on y = f(x). Q is its image in the line y = x.',
  alt: 'Coordinate axes with equal scales. P, labelled (2, 7), lies above the dashed line y = x. Its reflection Q lies across that line.',
  svg: `<svg viewBox="0 0 390 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="none" stroke="#667085" stroke-width="2"><path d="M68 198H326m-11-5 11 5-11 5 M68 198V18m-5 11 5-11 5 11"/></g>
    <path d="M68 198L248 18" stroke="#8d929e" stroke-width="2" stroke-dasharray="6 5"/>
    <path d="M108 58L208 158" stroke="#006c67" stroke-width="2"/>
    <circle cx="108" cy="58" r="5" fill="#006c67"/><circle cx="208" cy="158" r="5" fill="#006c67"/>
    <g fill="#191f2c" font-size="16" font-family="sans-serif"><text x="336" y="204">x</text><text x="53" y="19">y</text><text x="47" y="218">O</text><text x="253" y="27">y = x</text><text x="117" y="54">P (2, 7)</text><text x="218" y="164">Q</text></g>
  </svg>`,
};

const chordDiagram = {
  caption: 'Chord AB with the centre O. The diagram shows the smaller central angle.',
  alt: 'A circle with centre O and two radii OA and OB, both marked 4 cm. The chord AB spans a central angle of π/3 radians.',
  svg: `<svg viewBox="0 0 390 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="182" cy="113" r="85" fill="none" stroke="#667085" stroke-width="2"/>
    <path d="M182 113L255.6 70.5V155.5Z" fill="#d4f5ec" stroke="#006c67" stroke-width="2"/>
    <path d="M203.7 100.5A25 25 0 0 1 203.7 125.5" fill="none" stroke="#006c67" stroke-width="1.5"/>
    <g fill="#191f2c" font-size="16" font-family="sans-serif"><text x="164" y="119">O</text><text x="265" y="68">A</text><text x="265" y="166">B</text><text x="214" y="119">π/3</text><text x="195" y="83">4 cm</text><text x="194" y="153">4 cm</text></g>
  </svg>`,
};

const annularDiagram = {
  caption: 'An annular sector with inner radius 6 cm and outer radius 10 cm.',
  alt: 'Two concentric arcs centred at O. Two rays form a 1.2 radian angle. The shaded region between the arcs lies between radii 6 cm and 10 cm.',
  svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M174.3 40A124 124 0 0 1 174.3 180L133.4 152A74.4 74.4 0 0 0 133.4 68Z" fill="#d4f5ec" stroke="#006c67" stroke-width="2"/>
    <path d="M72 110L133.4 68M72 110L133.4 152M93.5 95.3A26 26 0 0 1 93.5 124.7" fill="none" stroke="#667085" stroke-width="2"/>
    <g fill="#191f2c" font-size="16" font-family="sans-serif"><text x="52" y="116">O</text><text x="103" y="116">1.2</text><text x="92" y="79">6 cm</text><text x="142" y="38">10 cm</text></g>
  </svg>`,
};

const chordGradients = {
  caption: 'Chord gradients for y = x² from x = 2 to x = 2 + h',
  headers: ['h', 'Chord gradient'],
  rows: [[1, '5.0'], [0.5, '4.5'], [0.1, '4.1'], [0.01, '4.01']],
};

const curveAreaDiagram = {
  caption: 'The shaded region lies between y = x² and y = 2x + 3.',
  alt: 'On a coordinate grid, the straight line y = 2x + 3 lies above the parabola y = x² between their intersection points at x = −1 and x = 3.',
  svg: `<svg viewBox="0 0 390 245" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M115 187 L275 43 Q195 259 115 187Z" fill="#d4f5ec" stroke="none"/>
    <path d="M45 205H342m-11-5 11 5-11 5 M155 227V16m-5 11 5-11 5 11" fill="none" stroke="#667085" stroke-width="2"/>
    <path d="M75 133 Q180 322 285 14.875" fill="none" stroke="#006c67" stroke-width="2.5"/>
    <path d="M75 223 L285 34" fill="none" stroke="#26357e" stroke-width="2.5"/>
    <circle cx="115" cy="187" r="4" fill="#26357e"/><circle cx="275" cy="43" r="4" fill="#26357e"/>
    <path d="M115 187V205M275 43V205" fill="none" stroke="#667085" stroke-width="1.3" stroke-dasharray="4 4"/>
    <g fill="#191f2c" font-size="16" font-family="sans-serif"><text x="350" y="211">x</text><text x="143" y="19">y</text><text x="107" y="225">−1</text><text x="270" y="225">3</text><text x="290" y="58">y = 2x + 3</text><text x="45" y="121">y = x²</text></g>
  </svg>`,
};

export const mathematicsPaper1 = [
  ...choices(1, 'simple', [
    ['square-form', 'Which expression is the completed-square form of x² + 8x + 3?', '(x + 4)² − 13',
      ['(x + 4)² + 3', '(x + 8)² − 61', '(x − 4)² − 13'], 'Half the coefficient of x is 4. Since (x + 4)² = x² + 8x + 16, subtract 13.'],
    ['vertex-from-square', 'What is the vertex of y = 2(x − 3)² + 7?', '(3, 7)',
      ['(−3, 7)', '(3, −7)', '(7, 3)'], 'The square is zero at x = 3. Its coefficient is positive, so the minimum occurs at (3, 7).'],
    ['discriminant', 'Find the discriminant of 2x² − 5x + 3.', '1',
      ['−1', '13', '49'], 'Use b² − 4ac = (−5)² − 4(2)(3) = 25 − 24 = 1.'],
    ['repeated-root', 'How many distinct real roots does x² + 6x + 9 = 0 have?', 'One',
      ['None', 'Two', 'Three'], 'The left side is (x + 3)², so x = −3 is a repeated root. It counts once as a distinct solution.'],
    ['factor-roots', 'Solve 2x² + x − 6 = 0.', 'x = −2 or x = 3/2',
      ['x = 2 or x = −3/2', 'x = −3 or x = 2', 'x = −2 or x = −3/2'], 'Factor as (x + 2)(2x − 3) = 0 and set the two factors equal to zero.'],
    ['formula-surds', 'Find the exact solutions of x² + 3x − 1 = 0.', 'x = (−3 ± √13)/2',
      ['x = (−3 ± √5)/2', 'x = (3 ± √13)/2', 'x = −3 ± √13'], 'The discriminant is 3² − 4(1)(−1) = 13. Substitute into (−b ± √(b² − 4ac))/(2a).'],
    ['strict-inequality', 'Solve x² − 5x + 6 < 0.', '2 < x < 3',
      ['x < 2 or x > 3', '2 ≤ x ≤ 3', 'x < −3 or x > −2'], 'The roots are 2 and 3. The upward-opening parabola lies below the axis between the roots.'],
    ['downward-inequality', 'Solve −x² + x + 6 ≥ 0.', '−2 ≤ x ≤ 3',
      ['x ≤ −2 or x ≥ 3', '−2 < x < 3', '−3 ≤ x ≤ 2'], 'The roots of −(x + 2)(x − 3) are −2 and 3. The downward-opening parabola is non-negative between and at those roots.'],
    ['line-and-parabola', 'At what x-values do y = 2x − 1 and y = x² − 4 intersect?', '−1 and 3',
      ['−3 and 1', '1 and 3', '−2 and 4'], 'Equating the expressions gives x² − 2x − 3 = 0. The factors are (x + 1) and (x − 3).'],
    ['quadratic-in-x-squared', 'Solve x⁴ − 10x² + 9 = 0 for real x.', 'x = −3, −1, 1 or 3',
      ['x = 1 or 9', 'x = −9, −1, 1 or 9', 'x = 1 or 3'], 'Set u = x². Then (u − 1)(u − 9) = 0, so take both square roots of 1 and 9.'],
  ]),
  ...choices(1, 'challenge', [
    ['parameter-distinct-roots', 'For which values of k does x² − 2kx + 9 = 0 have two distinct real roots?', 'k < −3 or k > 3',
      ['−3 < k < 3', 'k ≤ −3 or k ≥ 3', 'k > 3 only'], 'Two distinct real roots require a positive discriminant. Here 4k² − 36 > 0, so |k| > 3.'],
    ['quartic-two-roots', 'For which values of k does x⁴ − 8x² + k = 0 have exactly two distinct real solutions?', 'k < 0 or k = 16',
      ['0 < k < 16', 'k ≤ 0', 'k = 0 or k = 16'], 'Set u = x², which must be non-negative. If k < 0 the two u-roots have opposite signs. If k = 16 there is one repeated positive u-root. Each case gives two x-values. For 0 < k < 16 there are four x-values, for k = 0 there are three, and for k > 16 there are none.'],
    ['quadratic-in-square-root', 'Solve 2x + √x − 3 = 0 for real x.', 'x = 1 only',
      ['x = 1 or x = 9/4', 'x = 9/4 only', 'No real solutions'], 'Set u = √x ≥ 0. Then (2u + 3)(u − 1) = 0. Only u = 1 is allowed, so x = 1.'],
    ['reciprocal-quadratic', 'Find the real solutions of x² + 16/x² = 10.', 'x = ±√2 or x = ±2√2',
      ['x = ±2 or x = ±8', 'x = ±√5', 'x = √2 or x = 2√2 only'], 'For x ≠ 0, multiply by x² and put u = x². Then u² − 10u + 16 = (u − 2)(u − 8). Each positive root gives two values of x.'],
    ['simultaneous-product', 'Find both ordered pairs (x, y) satisfying 2y = x + 2 and x² + xy = 8.', '(2, 2) and (−8/3, −1/3)',
      ['(2, 2) and (−8/3, 1/3)', '(2, 2) and (8/3, 7/3)', '(2, 1) and (−8/3, −1/3)'], 'Substitute y = (x + 2)/2 into x² + xy = 8. This gives 3x² + 2x − 16 = (3x + 8)(x − 2) = 0. Substitute each x-value back into the line.'],
    ['combined-inequalities', 'Find all x satisfying both x² − x − 6 ≤ 0 and −x² + 3x + 4 > 0.', '−1 < x ≤ 3',
      ['−2 ≤ x < 4', '−1 ≤ x < 3', '−2 ≤ x ≤ 3'], 'The first inequality gives [−2, 3]. The second gives (−1, 4), since the roots are −1 and 4 and the parabola opens downwards. Their intersection is (−1, 3].'],
    ['roots-opposite-signs', 'For which c does x² − 4x + c = 0 have one strictly positive root and one strictly negative root?', 'c < 0',
      ['c > 0', 'c < 4', 'c = 0'], 'The product of the roots equals c, so opposite signs require c < 0. For c < 0, the discriminant 16 − 4c is positive and the roots are real.'],
    ['positive-for-all-x', 'Find all values of p for which x² − 4x + p > 0 for every real x.', 'p > 4',
      ['p ≥ 4', 'p < 4', 'p > 0'], 'Write the expression as (x − 2)² + p − 4. Its minimum is p − 4, which must be strictly positive.'],
  ]),
  ...calculations(1, [
    ['minimum-and-symmetry', 'Let f(x) = 3x² − 12x + 5. Use a completed square to describe its graph.', [
      part('Find the minimum value of f.', -7), part('Find the larger x-value for which f(x) = 5.', 4),
    ], 'f(x) = 3(x − 2)² − 7, so its minimum is −7. Setting f(x) = 5 gives (x − 2)² = 4 and therefore x = 0 or x = 4.'],
    ['repeated-root-parameter', 'The equation ax² − 12x + 9 = 0 has a repeated root, where a > 0.', [
      part('Find a.', 4), part('Find the repeated root, giving a decimal if needed.', 1.5),
    ], 'The discriminant is 144 − 36a, so a = 4. The repeated root is −b/(2a) = 12/8 = 1.5.'],
  ]),
  ...choices(2, 'simple', [
    ['square-root-domain', 'What is the largest real domain of f(x) = √(3x − 9)?', 'x ≥ 3',
      ['x > 3', 'x ≤ 3', 'All real x'], 'A real square root requires 3x − 9 ≥ 0, so x ≥ 3. The endpoint gives f(3) = 0.'],
    ['quadratic-range', 'What is the range of f(x) = (x + 2)² + 4 for real x?', 'f(x) ≥ 4',
      ['f(x) > 4', 'f(x) ≤ 4', 'f(x) ≥ 2'], 'The square is at least zero and attains zero at x = −2. Adding 4 gives a minimum of 4.'],
    ['reciprocal-domain', 'Which input must be excluded from the domain of f(x) = 5/(x − 2)?', '2',
      ['−2', '0', '5'], 'At x = 2 the denominator is zero, so the function is undefined.'],
    ['composition-order', 'Let f(x) = 3x + 2 and g(x) = x². Find f(g(x)).', '3x² + 2',
      ['(3x + 2)²', '9x² + 2', '3x² + 4'], 'The inner function g is applied first. Substitute x² into f to obtain 3x² + 2.'],
    ['one-to-one', 'Which function with domain all real numbers is one-to-one?', 'f(x) = x³',
      ['f(x) = x²', 'f(x) = (x − 1)² + 5', 'f(x) = 4'], 'The cube function is strictly increasing, so two different inputs cannot share the same output.'],
    ['linear-inverse', 'For f(x) = 4x − 7, find f⁻¹(x).', '(x + 7)/4',
      ['(x − 7)/4', '4x + 7', '1/(4x − 7)'], 'From y = 4x − 7, solve for x to get x = (y + 7)/4. Then write the inverse with input x.'],
    ['inverse-reflection', 'f is one-to-one and f(2) = 7. Which point lies on y = f⁻¹(x)?', '(7, 2)',
      ['(2, 7)', '(−2, −7)', '(7, −2)'], 'Inverse functions swap inputs and outputs. The reflection in y = x swaps the coordinates of P.', inverseDiagram],
    ['translation-left', 'Which transformation takes y = f(x) to y = f(x + 5)?', 'Translate 5 units left',
      ['Translate 5 units right', 'Translate 5 units up', 'Translate 5 units down'], 'At the new coordinate x = a − 5, the input x + 5 equals the old coordinate a. The point moves 5 units left.'],
    ['horizontal-stretch', 'Which transformation takes y = f(x) to y = f(3x)?', 'Stretch parallel to the x-axis by scale factor 1/3',
      ['Stretch parallel to the x-axis by scale factor 3', 'Stretch parallel to the y-axis by scale factor 3', 'Translate 3 units left'], 'For the same output formerly achieved at x = a, the new x-coordinate is a/3.'],
    ['reflect-in-x-axis', 'Which transformation takes y = f(x) to y = −f(x)?', 'Reflection in the x-axis',
      ['Reflection in the y-axis', 'Reflection in y = x', 'Translation one unit down'], 'The x-coordinate is fixed and the y-coordinate changes sign.'],
  ]),
  ...choices(2, 'challenge', [
    ['restricted-quadratic-inverse', 'Let f(x) = 2(x − 1)² + 5 for x ≤ 1. Which formula gives f⁻¹?', 'f⁻¹(x) = 1 − √((x − 5)/2), x ≥ 5',
      ['f⁻¹(x) = 1 + √((x − 5)/2), x ≥ 5', 'f⁻¹(x) = 1 − √((x − 5)/2), x ≤ 1', 'f⁻¹(x) = 1 − √((x + 5)/2), x ≥ −5'], 'The range of f is [5, ∞), so this is the inverse domain. Solve y = 2(x − 1)² + 5 and choose the negative square root because x − 1 ≤ 0.'],
    ['composite-domain', 'Let f(x) = 3 − 2x on ℝ and g(x) = √x on [0, ∞). On which largest set of inputs is g(f(x)) defined?', 'x ≤ 3/2',
      ['x ≥ 3/2', 'x ≥ 0', 'All real x'], 'The output of f must be in the domain of g. Thus 3 − 2x ≥ 0, which rearranges to x ≤ 3/2.'],
    ['solve-composition', 'Let f(x) = 2x − 5 and g(x) = x² + 3. Solve g(f(x)) = 28.', 'x = 0 or x = 5',
      ['x = 0 or x = 10', 'x = 5 only', 'x = −5 or x = 5'], 'The composite is (2x − 5)² + 3. Equating to 28 yields 2x − 5 = ±5, hence x = 0 or x = 5.'],
    ['reciprocal-inverse-domain', 'Let f(x) = 2 + 6/(x − 1) for x > 1. Which inverse and domain are correct?', 'f⁻¹(x) = 1 + 6/(x − 2), x > 2',
      ['f⁻¹(x) = 1 + 6/(x − 2), x > 1', 'f⁻¹(x) = 2 + 6/(x − 1), x > 2', 'f⁻¹(x) = 1 − 6/(x − 2), x > 2'], 'The range of f is (2, ∞). Solving y − 2 = 6/(x − 1) for x gives x = 1 + 6/(y − 2).'],
    ['range-closed-domain', 'Find the range of f(x) = 8 − (x − 1)² for −2 ≤ x ≤ 3.', '−1 ≤ f(x) ≤ 8',
      ['4 ≤ f(x) ≤ 8', '−1 ≤ f(x) ≤ 4', 'f(x) ≤ 8'], 'The largest value is 8 at x = 1. The endpoint farther from 1 is −2, giving the smallest value 8 − 9 = −1.'],
    ['fixed-point-inverse', 'Let f(x) = √(2x + 3) for x ≥ −3/2. Which point lies on the graphs of both f and f⁻¹ and on y = x?', '(3, 3)',
      ['(−1, −1)', '(1, 1)', '(−3, −3)'], 'A point on y = x must satisfy √(2x + 3) = x, which requires x ≥ 0. Squaring gives (x − 3)(x + 1) = 0. Only x = 3 meets the original equation.'],
    ['transformed-asymptotes', 'The graph of y = f(x) has asymptotes x = 2 and y = −1. Find the corresponding asymptotes of y = 2f(3 − x) + 5.', 'x = 1 and y = 3',
      ['x = 5 and y = 3', 'x = 1 and y = 4', 'x = −1 and y = −7'], 'The vertical asymptote occurs where 3 − x = 2. The horizontal asymptote is at twice the old y-value plus 5, giving 2(−1) + 5 = 3.'],
    ['composable-parameter', 'Let f(x) = h − (x − 3)² for all real x and g(x) = √(2 − x) for x ≤ 2. When is g(f(x)) defined for every real x?', 'h ≤ 2',
      ['h < 2', 'h ≥ 2', 'h ≥ 3'], 'The maximum output of f is h. Every output must be at most 2, the largest allowed input to g. Equality is allowed.'],
  ]),
  ...calculations(2, [
    ['reflect-stretch-translate', 'The point (4, −2) lies on y = f(x). Track this point under the transformation to y = −3f(2x − 6) + 4.', [
      part('Find the transformed x-coordinate.', 5), part('Find the transformed y-coordinate.', 10),
    ], 'The old input 4 must equal 2x − 6, so x = 5. The old output −2 becomes −3(−2) + 4 = 10.'],
    ['infer-transformation', 'A graph y = f(x) has one turning point at (−2, 3) and passes through (0, −1). The corresponding points on y = af(x − h) + b are (3, 10) and (5, 2).', [
      part('Find h.', 5), part('Find a.', 2), part('Find b.', 4),
    ], 'The horizontal displacement is 3 − (−2) = 5. The outputs give 3a + b = 10 and −a + b = 2. Subtracting gives 4a = 8, then b = 4.'],
  ]),
  ...choices(3, 'simple', [
    ['gradient-two-points', 'Find the gradient of the line through (−2, 4) and (6, −2).', '−3/4',
      ['3/4', '−4/3', '−1'], 'The change in y divided by the change in x is (−2 − 4)/(6 − (−2)) = −6/8 = −3/4.'],
    ['midpoint', 'What is the midpoint of the segment joining (−4, 5) to (8, −3)?', '(2, 1)',
      ['(4, 2)', '(6, −4)', '(−2, 1)'], 'Average each pair of coordinates. The averages are (−4 + 8)/2 = 2 and (5 − 3)/2 = 1.'],
    ['distance', 'Find the distance between (−1, 2) and (2, 6).', '5',
      ['7', '√13', '25'], 'The horizontal and vertical differences are 3 and 4. The distance is √(3² + 4²) = 5.'],
    ['line-point-gradient', 'Find the equation of the line with gradient 2 passing through (4, −3).', 'y = 2x − 11',
      ['y = 2x − 3', 'y = 2x + 5', 'y = −2x + 5'], 'Use y + 3 = 2(x − 4) and rearrange.'],
    ['standard-form-gradient', 'What is the gradient of 3x − 2y + 6 = 0?', '3/2',
      ['−3/2', '2/3', '−2/3'], 'Rearrange to y = (3/2)x + 3 and read the coefficient of x.'],
    ['perpendicular-gradient', 'What is the gradient of a line perpendicular to y = −4x + 7?', '1/4',
      ['−1/4', '4', '−4'], 'The product of the gradients of these perpendicular lines is −1. Thus −4m = −1.'],
    ['circle-centre-radius', 'Find the centre and radius of (x + 2)² + (y − 5)² = 49.', 'Centre (−2, 5), radius 7',
      ['Centre (2, −5), radius 7', 'Centre (−2, 5), radius 49', 'Centre (2, 5), radius 7'], 'Compare with (x − a)² + (y − b)² = r². The centre is (−2, 5) and the radius is √49 = 7.'],
    ['expanded-circle', 'Find the centre and radius of x² + y² − 4x + 6y − 12 = 0.', 'Centre (2, −3), radius 5',
      ['Centre (−2, 3), radius 5', 'Centre (2, −3), radius √12', 'Centre (4, −6), radius 5'], 'Completing the squares gives (x − 2)² + (y + 3)² = 12 + 4 + 9 = 25.'],
    ['line-intersection', 'Where do the lines y = 3x + 2 and y = −x + 10 meet?', '(2, 8)',
      ['(2, 6)', '(3, 7)', '(−2, 8)'], 'Equate 3x + 2 = −x + 10, so 4x = 8. Substituting x = 2 gives y = 8.'],
    ['point-on-circle', 'Which point lies on (x − 2)² + (y + 1)² = 25?', '(5, 3)',
      ['(5, 4)', '(2, 5)', '(−3, 1)'], 'At (5, 3), the squared distance from (2, −1) is 3² + 4² = 25.'],
  ]),
  ...choices(3, 'challenge', [
    ['tangent-expanded-circle', 'Find the line tangent to x² + y² − 2x + 4y − 20 = 0 at (4, 2).', '3x + 4y = 20',
      ['4x − 3y = 10', '3x + 4y = 25', '4x + 3y = 22'], 'The centre is (1, −2). The radius to (4, 2) has gradient 4/3, so the tangent has gradient −3/4. Through the given point this gives 3x + 4y = 20.'],
    ['oblique-chord-length', 'The line y = x + 1 cuts the circle x² + y² = 25 at A and B. Find the length AB.', '7√2',
      ['7', '5√2', '10'], 'Solve x² + (x + 1)² = 25 to get x = 3 or x = −4. The points are (3, 4) and (−4, −3), which differ by 7 in both coordinates.'],
    ['diameter-tangent', 'Points A(−3, 2) and B(5, 8) are endpoints of a diameter of a circle. Find the tangent at B.', '4x + 3y = 44',
      ['3x − 4y = −17', '4x + 3y = 26', '3x + 4y = 47'], 'The diameter AB has gradient 6/8 = 3/4. The tangent at B is perpendicular to AB, so y − 8 = −(4/3)(x − 5).'],
    ['perpendicular-foot', 'Find the point on 3x + 4y = 20 closest to the origin.', '(12/5, 16/5)',
      ['(16/5, 12/5)', '(4, 2)', '(0, 5)'], 'The shortest segment is perpendicular to the line. The perpendicular through the origin is y = (4/3)x. Substituting gives x = 12/5 and y = 16/5.'],
    ['line-cuts-parabola-twice', 'For which values of k does y = x + k meet y = x² + 3x − 4 at two distinct points?', 'k > −5',
      ['k ≥ −5', 'k < −5', 'k > 5'], 'Equate the equations to obtain x² + 2x − (4 + k) = 0. The discriminant is 20 + 4k. It must be positive for two intersections.'],
    ['right-triangle-area', 'Find the area of the triangle with vertices A(0, 2), B(2, 4) and C(6, 0).', '8 square units',
      ['4 square units', '12 square units', '16 square units'], 'AB has gradient 1 and BC has gradient −1, so the angle at B is right. The lengths are √8 and √32, giving area ½ × √8 × √32 = 8.'],
    ['circle-through-three', 'Find the circle through A(2, 1), B(6, 5) and C(6, 1).', '(x − 4)² + (y − 3)² = 8',
      ['(x − 4)² + (y − 3)² = 16', '(x − 6)² + (y − 1)² = 16', '(x − 4)² + (y − 3)² = 4'], 'CA and CB are perpendicular, so AB is a diameter by the angle-in-a-semicircle property. Its midpoint is (4, 3). The squared distance from that centre to C is 8.'],
    ['parallel-tangent-parameter', 'A line 3x + 4y = k is tangent to x² + y² = 100 at a point in the first quadrant. Find k and the point of tangency.', 'k = 50 at (6, 8)',
      ['k = 50 at (8, 6)', 'k = 48 at (8, 6)', 'k = 25 at (3, 4)'], 'The radius to the tangent point is perpendicular to the line, so its gradient is 4/3. The radius has length 10, making the point (6, 8). Substitute to obtain k = 50.'],
  ]),
  ...calculations(3, [
    ['circle-touches-axis', 'The circle x² + y² − 6x + 4y + k = 0 touches the x-axis.', [
      part('Find k.', 9), part('Find the radius of the circle.', 2),
    ], 'When y = 0, x² − 6x + k = 0 has a repeated root, so 36 − 4k = 0 and k = 9. The centre is (3, −2), so the distance to the tangent x-axis equals the radius, 2.'],
    ['vertical-chord', 'A vertical chord lies on x = 5 inside the circle x² + y² − 4x − 6y − 12 = 0.', [
      part('Find the y-coordinate of the midpoint of the chord.', 3), part('Find the length of the chord.', 8),
    ], 'Complete the squares to get (x − 2)² + (y − 3)² = 25. Substituting x = 5 gives (y − 3)² = 16. The endpoints have y = −1 and 7, so their midpoint has y = 3 and the chord is 8 units long.'],
  ]),
  ...choices(4, 'simple', [
    ['definition-of-radian', 'An arc of a circle subtends exactly 1 radian at the centre. How does its length compare with the radius r?', 'It equals r.',
      ['It equals 2r.', 'It equals πr.', 'It equals r/π.'], 'One radian is the angle subtended at the centre when the arc length equals the radius.'],
    ['degrees-to-radians', 'Convert 210° to radians.', '7π/6',
      ['7π/12', '5π/6', '7π/3'], 'Since 180° equals π radians, multiply 210 by π/180.'],
    ['radians-to-degrees', 'Convert 5π/12 radians to degrees.', '75°',
      ['30°', '60°', '150°'], 'Multiply 5π/12 by 180/π to obtain 75°.'],
    ['arc-length', 'An arc on a circle of radius 9 cm subtends 2/3 radians at the centre. Find its length.', '6 cm',
      ['27/2 cm', '3 cm', '9π cm'], 'Apply s = rθ to obtain 9 × 2/3 = 6 cm.'],
    ['radius-from-arc', 'An arc of length 7.5 m subtends 1.5 radians at the centre. Find the radius.', '5 m',
      ['11.25 m', '6 m', '9 m'], 'From s = rθ, the radius is s/θ = 7.5/1.5 = 5 m.'],
    ['sector-area', 'Find the area of a sector of radius 8 cm and angle 3/4 radians.', '24 cm²',
      ['48 cm²', '6 cm²', '32 cm²'], 'The sector area is ½r²θ = ½ × 64 × 3/4 = 24 cm².'],
    ['angle-from-area', 'A sector of radius 5 m has area 20 m². What is its central angle?', '1.6 radians',
      ['0.8 radians', '4 radians', '2.5 radians'], 'Solve 20 = ½ × 5² × θ to obtain θ = 40/25 = 1.6.'],
    ['sector-perimeter', 'Find the perimeter of a sector of radius 7 cm and angle 2 radians.', '28 cm',
      ['14 cm', '21 cm', '35 cm'], 'The arc has length 7 × 2 = 14 cm. The two straight edges contribute another 2 × 7 = 14 cm.'],
    ['triangle-in-sector', 'Two radii of 6 cm enclose an angle of π/6 radians. Find the area of the triangle formed by those radii and their chord.', '9 cm²',
      ['18 cm²', '9√3 cm²', '3π cm²'], 'Apply ½ab sin θ to the two radii. The area is ½ × 6 × 6 × sin(π/6) = 9 cm².'],
    ['chord-pi-by-three', 'Find the length of AB in the diagram.', '4 cm',
      ['2 cm', '4√3 cm', '4π/3 cm'], 'OA = OB and the angle at O is 60°, so all three angles are 60°. Thus AB equals OA, which is 4 cm.', chordDiagram],
  ]),
  ...choices(4, 'challenge', [
    ['minor-segment-exact', 'A chord in a circle of radius 8 cm subtends π/3 radians at the centre. Find the exact area of the smaller segment cut off by the chord.', '(32π/3 − 16√3) cm²',
      ['(32π/3) cm²', '(32π/3 + 16√3) cm²', '(16π/3 − 8√3) cm²'], 'The minor sector has area ½ × 64 × π/3 = 32π/3. Its triangle has area ½ × 64 × sin(π/3) = 16√3. Subtract the triangle.'],
    ['major-sector-from-arc', 'A circle of radius 10 cm has a minor arc of length 8 cm. Find the area of the corresponding major sector.', '(100π − 40) cm²',
      ['(100π − 80) cm²', '(50π − 40) cm²', '40 cm²'], 'The minor angle is 8/10 = 0.8 radians. The minor sector has area ½ × 100 × 0.8 = 40 cm². Subtract from the full area 100π cm².'],
    ['arc-from-sector-area', 'A sector has area 54 cm² and central angle 1.5 radians. Find its exact arc length.', '9√2 cm',
      ['6√2 cm', '18 cm', '12√2 cm'], 'Since 54 = ½ × r² × 1.5, r² = 72 and r = 6√2. Thus s = 1.5r = 9√2.'],
    ['chord-to-sector', 'A chord of length 10 cm subtends π/2 radians at the centre. Find the area of the corresponding minor sector.', '25π/2 cm²',
      ['25π cm²', '50π cm²', '25π/4 cm²'], 'The chord is the hypotenuse of a right triangle with both legs of length r. Thus r² = 100/2 = 50. The sector is one quarter of the circle, so its area is 25π/2.'],
    ['segment-from-chord', 'A chord of length 8 cm lies in a circle of radius 5 cm. Find the area of the minor segment to two decimal places.', '11.18 cm²',
      ['23.18 cm²', '12.00 cm²', '5.59 cm²'], 'The bisector of the central angle gives sin(θ/2) = 4/5 and θ ≈ 1.85459 radians. The sector area is 12.5θ. The triangle has base 8 and height √(25 − 16) = 3, so its area is 12. Their difference is 11.18 cm².'],
    ['equal-area-sectors', 'Two sectors have equal areas. The ratio of the radius of the first sector to the radius of the second is 3:2. Find the ratio of their arc lengths in the same order.', '2:3',
      ['3:2', '4:9', '1:1'], 'Combining A = ½r²θ and s = rθ gives A = ½rs. For fixed A, the arc length is inversely proportional to the radius.'],
    ['major-segment-exact', 'A chord subtends a smaller angle of 2π/3 radians at the centre of a circle of radius 4 cm. Find the area of the larger segment.', '(32π/3 + 4√3) cm²',
      ['(32π/3 − 4√3) cm²', '(16π/3 − 4√3) cm²', '(16π/3 + 4√3) cm²'], 'The larger segment consists of the major sector and the triangle. The major angle is 4π/3, so the sector area is 32π/3. The triangle adds ½ × 16 × sin(2π/3) = 4√3.'],
    ['arc-plus-area', 'A sector has arc length 6 cm and area 24 cm². Find its radius and central angle.', '8 cm and 0.75 radians',
      ['4 cm and 1.5 radians', '8 cm and 1.25 radians', '6 cm and 1 radian'], 'The area equals ½rs, so 24 = ½ × r × 6 and r = 8. Then θ = 6/8 = 0.75 radians.'],
  ]),
  ...calculations(4, [
    ['sector-perimeter-to-area', 'A sector has perimeter 24 cm including its two radii. Its angle is 1 radian.', [
      part('Calculate the radius.', 8, 'cm'), part('Calculate the sector area.', 32, 'cm²'),
    ], 'The arc length is r, so the perimeter is 2r + r = 24. Thus r = 8 and the area is ½ × 8² × 1 = 32 cm².'],
    ['annular-sector', 'The arcs in the diagram have a common centre and subtend the same angle of 1.2 radians.', [
      part('Calculate the shaded area.', 38.4, 'cm²'), part('Calculate the perimeter of the shaded region.', 27.2, 'cm'),
    ], 'The area is the difference of the sector areas, ½ × 1.2 × (10² − 6²) = 38.4. The perimeter includes both arcs and both 4 cm straight edges, giving 1.2(10 + 6) + 8 = 27.2.', annularDiagram],
  ]),
  ...choices(5, 'simple', [
    ['sine-related-angle', 'Find the exact value of sin 150°.', '1/2',
      ['−1/2', '√3/2', '−√3/2'], '150° is in the second quadrant and has reference angle 30°. Sine is positive there, so sin 150° = sin 30° = 1/2.'],
    ['cosine-third-quadrant', 'Find the exact value of cos(5π/4).', '−√2/2',
      ['√2/2', '−1/2', '−√3/2'], 'The reference angle is π/4. Cosine is negative in the third quadrant.'],
    ['tangent-negative-angle', 'Find the exact value of tan(−π/3).', '−√3',
      ['√3', '−1/√3', '−1'], 'Tangent is odd. Since tan(π/3) = √3, negating the angle negates the value.'],
    ['principal-arcsine', 'Find the principal value of sin⁻¹(−1/2) in radians.', '−π/6',
      ['π/6', '7π/6', '−5π/6'], 'The principal arcsine lies between −π/2 and π/2. In this interval sin(−π/6) = −1/2.'],
    ['principal-arccosine', 'Find the principal value of cos⁻¹(−1/2) in degrees.', '120°',
      ['60°', '240°', '−120°'], 'The principal arccosine lies in [0°, 180°]. Within that interval the angle with cosine −1/2 is 120°.'],
    ['sine-period', 'What is the smallest positive period of y = 2 sin(3x), with x measured in radians?', '2π/3',
      ['2π', '3π', 'π/3'], 'A complete cycle takes an increase of 2π in 3x. The corresponding increase in x is 2π/3.'],
    ['cosine-range', 'What is the range of y = 1 − 2 cos x for real x?', '−1 ≤ y ≤ 3',
      ['−2 ≤ y ≤ 2', '−3 ≤ y ≤ 1', '1 ≤ y ≤ 3'], 'Cosine takes every value from −1 to 1, so −2 cos x lies between −2 and 2. Adding 1 shifts both endpoints.'],
    ['tangent-asymptote', 'In the interval 0 < x < π, where is y = tan x undefined?', 'x = π/2',
      ['x = π/4', 'x = 3π/4', 'It is defined throughout the interval.'], 'Since tan x = sin x/cos x, it is undefined where cos x = 0. Here that occurs at π/2.'],
    ['tangent-from-ratios', 'Given sin θ = 3/5 and cos θ = 4/5, find tan θ.', '3/4',
      ['4/3', '7/5', '12/25'], 'Use tan θ = sin θ/cos θ = (3/5)/(4/5) = 3/4.'],
    ['cosine-zeros', 'Solve cos x = 0 for 0 ≤ x ≤ 2π.', 'x = π/2 or x = 3π/2',
      ['x = 0 or x = π', 'x = π/2 only', 'x = π or x = 2π'], 'Cosine is zero at the two points of the unit circle with zero horizontal coordinate. They have angles π/2 and 3π/2.'],
  ]),
  ...choices(5, 'challenge', [
    ['sine-quadratic-degrees', 'Solve 2 sin² x − 3 sin x + 1 = 0 for 0° ≤ x ≤ 360°.', 'x = 30°, 90° or 150°',
      ['x = 30° or 90°', 'x = 30°, 150° or 270°', 'x = 30°, 90°, 150° or 270°'], 'The expression factors as (2 sin x − 1)(sin x − 1). Sine is 1/2 at 30° and 150°, and 1 at 90°.'],
    ['cosine-quadratic-radians', 'Solve 2 cos² x − cos x − 1 = 0 for −π ≤ x ≤ π.', 'x = −2π/3, 0 or 2π/3',
      ['x = 0 or x = 2π/3', 'x = −π/3, 0 or π/3', 'x = −2π/3, π or 2π/3'], 'Factor as (2 cos x + 1)(cos x − 1). Cosine equals 1 at 0, and −1/2 at −2π/3 and 2π/3 in this interval.'],
    ['double-input-sine', 'Solve 2 sin(2x) = 1 for 0 ≤ x < 2π.', 'x = π/12, 5π/12, 13π/12 or 17π/12',
      ['x = π/12 or 5π/12', 'x = π/6, 5π/6, 7π/6 or 11π/6', 'x = π/12, 5π/12, 7π/12 or 11π/12'], 'For 0 ≤ 2x < 4π, sine equals 1/2 when 2x is π/6, 5π/6, 13π/6 or 17π/6. Halve each angle.'],
    ['translated-tangent', 'Solve tan(x + π/4) = −1 for 0 ≤ x < 2π.', 'x = π/2 or x = 3π/2',
      ['x = 3π/4 or x = 7π/4', 'x = 0 or x = π', 'x = π/4 or x = 5π/4'], 'In the allowed interval [π/4, 9π/4) for the input, tangent equals −1 at 3π/4 and 7π/4. Subtract π/4.'],
    ['identity-equation', 'Solve 3 cos² x = 1 + sin² x for 0 ≤ x < 2π.', 'x = π/4, 3π/4, 5π/4 or 7π/4',
      ['x = π/4 or x = 3π/4', 'x = π/6, 5π/6, 7π/6 or 11π/6', 'x = π/3, 2π/3, 4π/3 or 5π/3'], 'Substitute cos² x = 1 − sin² x, then obtain 2 = 4 sin² x. Each quadrant gives one angle where sin² x = 1/2.'],
    ['cosine-line-intersections', 'Where does y = 2 − 3 cos(2x) meet the line y = 3.5 for 0 ≤ x ≤ π?', 'x = π/3 or x = 2π/3',
      ['x = π/6 or x = 5π/6', 'x = 2π/3 only', 'x = π/6 or x = π/3'], 'Equating the y-values gives cos(2x) = −1/2. The inputs in [0, 2π] are 2π/3 and 4π/3. Dividing by 2 gives the stated x-values.'],
    ['use-identity-to-simplify', 'Simplify (1 − cos² x)/(sin x cos x) wherever the expression is defined.', 'tan x',
      ['cos x/sin x', 'sin x cos x', 'sin² x'], 'Replace the numerator by sin² x. Since sin x is nonzero on the domain, cancel one factor of sin x to obtain sin x/cos x.'],
    ['signed-trig-ratios', 'Given cos θ = −5/13 and π < θ < 3π/2, find sin θ and tan θ.', 'sin θ = −12/13 and tan θ = 12/5',
      ['sin θ = 12/13 and tan θ = −12/5', 'sin θ = −12/13 and tan θ = −12/5', 'sin θ = 5/13 and tan θ = −1'], 'The identity gives sin² θ = 1 − 25/169 = 144/169. Sine is negative in the third quadrant, and dividing by the negative cosine makes tangent positive.'],
  ]),
  ...calculations(5, [
    ['linear-sine-cosine-equation', 'Solve sin x = 2 cos x for 0° ≤ x < 360°. Give the answers to 1 decimal place.', [
      part('Find the smaller solution.', 63.4, '°', 0.05), part('Find the larger solution.', 243.4, '°', 0.05),
    ], 'If cos x = 0 the equation is not satisfied. Divide by cos x to get tan x = 2. The principal value is about 63.435°. The other solution is 180° greater.'],
    ['count-sine-peaks', 'The curve y = 1 + 2 sin(3x) meets y = 3 for certain values of x in 0 ≤ x ≤ 360°, with x measured in degrees.', [
      part('Find the number of such values of x.', 3), part('Find the smallest of these values of x.', 30, '°'),
    ], 'The intersections require sin(3x) = 1. The input 3x ranges from 0° to 1080°, reaching the three peaks 90°, 450° and 810°. Divide by 3 to get 30°, 150° and 270°.'],
  ]),
  ...choices(6, 'simple', [
    ['binomial-x-squared', 'Find the coefficient of x² in (1 + 2x)⁵.', '40',
      ['10', '20', '80'], 'Choose the 2x term from two of the five factors in 10 ways. The coefficient is 10 × 2² = 40.'],
    ['binomial-negative-term', 'Find the coefficient of x³ in (2 − x)⁴.', '−8',
      ['8', '−4', '−16'], 'The x³ term contains three factors of (−x) and one factor of 2. There are four choices for the factor of 2, giving coefficient −8.'],
    ['binomial-coefficient', 'What is the binomial coefficient 7 choose 2?', '21',
      ['14', '42', '35'], 'Use 7!/(2!5!) = (7 × 6)/2 = 21.'],
    ['recognise-progression', 'The first four terms are 48, −24, 12, −6. Which description fits?', 'Geometric with common ratio −1/2',
      ['Geometric with common ratio 1/2', 'Arithmetic with common difference −24', 'Arithmetic with common difference −72'], 'Every term is obtained by multiplying the previous term by −1/2. The differences are not constant.'],
    ['arithmetic-term', 'Find the 12th term of the arithmetic progression 4, 9, 14, …', '59',
      ['54', '64', '60'], 'The first term is 4 and each of the 11 steps to the 12th term adds 5. So the term is 4 + 11 × 5 = 59.'],
    ['arithmetic-partial-sum', 'Find the sum of the first 10 terms of the arithmetic progression 3, 7, 11, …', '210',
      ['190', '390', '420'], 'The 10th term is 3 + 9 × 4 = 39. The sum is 10 times the mean of the first and last terms, giving 10 × 21 = 210.'],
    ['geometric-fifth-term', 'Find the fifth term of the geometric progression 80, 40, 20, …', '5',
      ['10', '2.5', '16'], 'The common ratio is 1/2. The fifth term is 80 × (1/2)⁴ = 5.'],
    ['geometric-partial-sum', 'Find the sum of the first five terms of the geometric progression 3, 6, 12, …', '93',
      ['48', '96', '45'], 'The common ratio is 2, so the sum is 3(2⁵ − 1)/(2 − 1) = 93.'],
    ['convergence-negative-ratio', 'Which common ratio gives a convergent geometric series with a nonzero first term?', '−0.5',
      ['−1.5', '1', '−1'], 'The ratio must be strictly between −1 and 1. A negative ratio inside that interval can converge.'],
    ['infinite-sum-alternating', 'Find the sum to infinity of 12 − 4 + 4/3 − …', '9',
      ['18', '8', '16'], 'The first term is 12 and the common ratio is −1/3. The sum is 12/(1 − (−1/3)) = 9.'],
  ]),
  ...choices(6, 'challenge', [
    ['scaled-binomial-coefficient', 'Find the coefficient of x³ in (2 − 3x)⁶.', '−4320',
      ['4320', '−540', '−1440'], 'Choose three of the six factors to supply (−3x) in 20 ways. The remaining factors supply 2³, so the coefficient is 20 × (−3)³ × 2³ = −4320.'],
    ['cancelling-binomial-terms', 'Find the coefficient of x² in (1 + x)(2 − x)⁵.', '0',
      ['80', '−80', '160'], 'The x² coefficient of (2 − x)⁵ is 10 × 2³ = 80, and its x coefficient is −5 × 2⁴ = −80. Multiplying by 1 + x combines these two contributions.'],
    ['arithmetic-known-terms', 'In an arithmetic progression the fourth term is 11 and the ninth term is 31. Find the sum of the first 15 terms.', '405',
      ['375', '420', '435'], 'Five steps add 20, so d = 4. The first term is 11 − 3 × 4 = −1 and the fifteenth is 55. The sum is 15(−1 + 55)/2 = 405.'],
    ['arithmetic-threshold', 'The sum of the first n terms of 2, 5, 8, … is strictly greater than 100. What is the smallest possible integer n?', '9',
      ['7', '8', '10'], 'The sum is n(3n + 1)/2. At n = 8 it is exactly 100, and at n = 9 it is 126. All terms are positive, so the partial sums increase.'],
    ['geometric-ratio-from-terms', 'The third term of a real geometric progression is 12 and the sixth term is −96. Find the common ratio and sum of the first six terms.', 'Ratio −2 and sum −63',
      ['Ratio 2 and sum 189', 'Ratio −2 and sum −96', 'Ratio −8 and sum −63'], 'The ratio cubed is −96/12 = −8, giving r = −2 and first term 12/4 = 3. The sum is 3(1 − (−2)⁶)/(1 − (−2)) = −63.'],
    ['arithmetic-and-geometric', 'The numbers 2, x, y form an increasing arithmetic progression. The numbers x, y, 9 form a geometric progression. Find x and y.', 'x = 4, y = 6',
      ['x = 1/4, y = −3/2', 'x = 3, y = 4', 'x = 5, y = 8'], 'The arithmetic progression gives y = 2x − 2. The geometric progression gives y² = 9x. Substitution yields (4x − 1)(x − 4) = 0. Since x > 2, x = 4 and y = 6.'],
    ['negative-ratio-from-two-terms', 'A geometric progression has second term 6, fourth term 1.5 and a negative common ratio. Find its sum to infinity.', '−8',
      ['8', '−24', '24'], 'The square of the ratio is 1.5/6 = 1/4, so r = −1/2. Its first term is 6/(−1/2) = −12. The sum is −12/(1 + 1/2) = −8.'],
    ['compare-saving-plans', 'Two saving plans each deposit £32 in week 1. Plan A adds £18 to the weekly deposit each week. Plan B multiplies each weekly deposit by 1.5. By how much does the larger total exceed the smaller total after four deposits?', 'Plan B exceeds Plan A by £24',
      ['Plan A exceeds Plan B by £24', 'Plan B exceeds Plan A by £22', 'The totals are the same.'], 'Plan A totals 32 + 50 + 68 + 86 = 236. Plan B totals 32(1.5⁴ − 1)/0.5 = 260. The difference is £24.'],
  ]),
  ...calculations(6, [
    ['binomial-parameter', 'The coefficient of x² in (1 + kx)⁵ is 90, where k is positive.', [
      part('Find k.', 3), part('Find the coefficient of x³.', 270),
    ], 'The x² coefficient is 10k². Equating this to 90 gives k = 3 since k is positive. The x³ coefficient is 10 × 3³ = 270.'],
    ['geometric-tail', 'The first term of a convergent geometric series is 12. Its sum to infinity is 40.', [
      part('Find the common ratio.', 0.7), part('Find the sum from the fourth term onward.', 13.72),
    ], 'From 12/(1 − r) = 40, r = 0.7. The tail is geometrically scaled by r³, so its sum is 40 × 0.7³ = 13.72.'],
  ]),
  ...choices(7, 'simple', [
    ['differentiate-rational-power', 'Differentiate y = 5x^(3/2) − 2x for x > 0.', 'dy/dx = (15/2)√x − 2',
      ['dy/dx = (5/2)√x − 2', 'dy/dx = (15/2)x^(3/2) − 2', 'dy/dx = 15√x − 2'], 'Multiply the coefficient 5 by the power 3/2 and reduce that power to 1/2. The derivative of −2x is −2.'],
    ['differentiate-negative-power', 'Differentiate y = 7x − 3/x for x ≠ 0.', 'dy/dx = 7 + 3/x²',
      ['dy/dx = 7 − 3/x²', 'dy/dx = 7 + 3/x', 'dy/dx = 7 − 6/x²'], 'Write the second term as −3x⁻¹. Its derivative is (−3)(−1)x⁻² = 3/x².'],
    ['second-derivative', 'Find f″(x) for f(x) = 2x³ − 4x² + 5.', '12x − 8',
      ['6x² − 8x', '12x − 4', '12x + 8'], 'The first derivative is 6x² − 8x. Differentiate it to obtain 12x − 8.'],
    ['chain-power', 'Find dy/dx for y = (3x − 2)⁴.', '12(3x − 2)³',
      ['4(3x − 2)³', '12(3x − 2)⁴', '4(3x − 2)⁵'], 'Differentiate the outer fourth power to get 4(3x − 2)³, then multiply by the derivative 3 of the inner expression.'],
    ['stationary-condition', 'A differentiable curve y = f(x) has a stationary point at x = a. What must be true there?', 'f′(a) = 0',
      ['f(a) = 0', 'f″(a) = 0', 'f′(a) = 1'], 'The tangent at a stationary point is horizontal, so its gradient f′(a) is zero.'],
    ['gradient-at-x', 'Find the gradient of y = x² + 3x at x = −2.', '−1',
      ['1', '−2', '−7'], 'The gradient function is 2x + 3. At x = −2 it equals −4 + 3 = −1.'],
    ['from-chords-to-tangent', 'The table shows chord gradients as the second point approaches x = 2. What is the gradient of the tangent at x = 2?', '4',
      ['4.01', '4.5', '2'], 'The chord gradients approach 4 as h approaches zero. This limiting gradient is the tangent gradient.', chordGradients],
    ['increasing-interval', 'On which interval is the gradient of y = x² − 6x + 2 positive?', 'x > 3',
      ['x < 3', 'x > 6', 'x < 0'], 'The derivative is 2x − 6. It is positive precisely when x > 3.'],
    ['normal-gradient', 'A tangent has gradient 2 at a point of a curve. What is the gradient of the normal there?', '−1/2',
      ['1/2', '−2', '2'], 'The normal is perpendicular to the tangent. Multiply their gradients to get −1.'],
    ['maximum-from-second-derivative', 'At x = −3, a curve has f′(−3) = 0 and f″(−3) = −8. What is the nature of the stationary point?', 'A local maximum',
      ['A local minimum', 'It is on the x-axis.', 'It is on the y-axis.'], 'The second derivative is negative at the stationary point, so the gradient decreases through zero and the point is a local maximum.'],
  ]),
  ...choices(7, 'challenge', [
    ['tangent-and-normal', 'Find both the tangent and the normal to y = x³ − 4x at x = 1.', 'Tangent y = −x − 2, normal y = x − 4',
      ['Tangent y = x − 4, normal y = −x − 2', 'Tangent y = −x − 4, normal y = x − 2', 'Tangent y = −x − 2, normal y = x + 4'], 'The point is (1, −3). Since dy/dx = 3x² − 4, the tangent gradient is −1 and the normal gradient is 1. Use each gradient with the given point.'],
    ['chain-rule-decreasing', 'On which open interval does y = (2x − 1)³ − 24x have negative gradient?', '−1/2 < x < 3/2',
      ['−3/2 < x < 1/2', 'x < −1/2 or x > 3/2', '−1 < x < 1'], 'The gradient is 6(2x − 1)² − 24. It is negative when (2x − 1)² < 4, equivalently −2 < 2x − 1 < 2.'],
    ['connected-sphere-rates', 'A sphere with radius r has volume V = 4πr³/3 and surface area S = 4πr². Its volume increases at 18π cm³/s when r = 3 cm. What is dS/dt at that instant?', '12π cm²/s',
      ['6π cm²/s', '24π cm²/s', '36π cm²/s'], 'At r = 3, dV/dr = 4πr² = 36π, so dr/dt = 18π/(36π) = 1/2 cm/s. Multiply by dS/dr = 8πr = 24π to get dS/dt = 12π cm²/s.'],
    ['cubic-chord-gradient', 'For y = x³, take the chord joining x = 2 and x = 2 + h, where h ≠ 0. Which formula for the chord gradient and value for the tangent gradient at x = 2 are correct?', '12 + 6h + h², and 12',
      ['12 + 6h + h², and 6', '8 + 6h + h², and 8', '12h + 6h² + h³, and 0'], 'The difference (2 + h)³ − 8 is 12h + 6h² + h³. Dividing by h yields the chord gradient. As h approaches zero, this tends to 12.'],
    ['infer-stationary-quadratic', 'The curve y = x² + ax + b has a stationary point at (2, 5). Find a and b.', 'a = −4, b = 9',
      ['a = 4, b = −7', 'a = −4, b = 5', 'a = −2, b = 5'], 'At x = 2 the derivative 2x + a is zero, so a = −4. The point lies on the curve, giving 5 = 4 − 8 + b and b = 9.'],
    ['normal-x-intercept', 'The normal to y = x² − x + 1 at x = 2 meets the x-axis at (a, 0). Find a.', '11',
      ['5', '−7', '3'], 'The point of contact is (2, 3), and the tangent gradient is 2(2) − 1 = 3. The normal is y − 3 = −(x − 2)/3. Set y = 0 to find x = 11.'],
    ['open-box-maximum', 'Equal squares of side x cm are removed from the corners of a 20 cm square card. Its sides fold to form an open box of volume x(20 − 2x)² cm³. What x with 0 < x < 10 maximises the volume?', '10/3 cm',
      ['5 cm', '20/3 cm', '10 cm'], 'Expanding gives V = 400x − 80x² + 4x³. Its derivative is (20 − 2x)(20 − 6x), which changes from positive to negative at x = 10/3 within the allowed interval.'],
    ['parallel-tangents', 'At which x-values is a tangent to y = x³ − 6x² + 7x parallel to y = −2x + 4?', 'x = 1 or x = 3',
      ['x = −1 or x = −3', 'x = 2 only', 'x = 0 or x = 4'], 'Set 3x² − 12x + 7 = −2. The resulting equation is 3(x − 1)(x − 3) = 0.'],
  ]),
  ...calculations(7, [
    ['stationary-cubic', 'Consider the curve y = x³ − 3x² − 9x + 5. Find its stationary points and use the second derivative to classify them.', [
      part('Give the x-coordinate of the local maximum.', -1), part('Give the y-coordinate of the local minimum.', -22),
    ], 'The derivative is 3(x + 1)(x − 3), so the stationary x-values are −1 and 3. The second derivative 6x − 6 is negative at −1 and positive at 3. The maximum is (−1, 10) and the minimum is (3, −22).'],
    ['maximum-garden-area', 'A rectangular garden borders a straight wall. Fencing of total length 36 m goes along the other three sides. Let x be the length of each side perpendicular to the wall, with 0 < x < 18.', [
      part('Find x when the area is maximised.', 9, 'm'), part('Find the maximum area.', 162, 'm²'),
    ], 'The side parallel to the wall is 36 − 2x, so the area is A = 36x − 2x². Set A′ = 36 − 4x = 0 to obtain x = 9. Since A″ = −4, the area has a maximum there, equal to 9 × 18 = 162 m².'],
  ]),
  ...choices(8, 'simple', [
    ['antiderivative-linear-combination', 'Find ∫(6x² − 4 + 3√x) dx for x > 0.', '2x³ − 4x + 2x^(3/2) + C',
      ['2x³ − 4x + 3x^(3/2) + C', '3x³ − 4 + 2x^(3/2) + C', '12x − 4 + 3√x + C'], 'Integrate each term by raising the power by one and dividing by the new power. In particular 3 ÷ (3/2) = 2 for the final term.'],
    ['antiderivative-linear-power', 'Find ∫(2x + 3)⁴ dx.', '(2x + 3)⁵/10 + C',
      ['(2x + 3)⁵/5 + C', '(2x + 3)⁴/8 + C', '2(2x + 3)⁵/5 + C'], 'Raise the power to 5 and divide by 5. Also divide by the inner gradient 2 because differentiation would multiply by 2.'],
    ['integrate-reciprocal-square', 'Find ∫1/(3x + 4)² dx for x > −4/3.', '−1/[3(3x + 4)] + C',
      ['1/[3(3x + 4)] + C', '−1/(3x + 4) + C', '−3/(3x + 4) + C'], 'Write the integrand as (3x + 4)⁻². Raise the power to −1 and divide by −1 and by the inner gradient 3.'],
    ['curve-from-gradient', 'A curve has dy/dx = 4x and passes through (1, 3). Find y in terms of x.', 'y = 2x² + 1',
      ['y = 2x² + 3', 'y = 4x² − 1', 'y = 2x² − 1'], 'Integration gives y = 2x² + C. From 3 = 2 + C, obtain C = 1.'],
    ['definite-polynomial', 'Evaluate the definite integral of 3x² from x = 0 to x = 2.', '8',
      ['4', '6', '24'], 'An antiderivative of 3x² is x³. Its value at 2 minus its value at 0 is 8.'],
    ['signed-area', 'Evaluate the definite integral of y = −2 from x = 0 to x = 3.', '−6',
      ['6', '−2', '−3'], 'The integrand is a constant, so the integral is −2 × (3 − 0) = −6. It is negative because the graph lies below the x-axis.'],
    ['improper-integral-simple', 'Evaluate the improper integral of 1/√x from x = 0 to x = 4.', '4',
      ['2', '8', 'The integral diverges.'], 'The antiderivative 2√x tends to zero as x decreases to 0. The integral is 2√4 − 0 = 4.'],
    ['area-under-line', 'Find the area bounded by y = 3x + 1, the x-axis, and the lines x = 0 and x = 2.', '8 square units',
      ['6 square units', '7 square units', '14 square units'], 'The line is above the x-axis throughout. Integrate to get (3/2)x² + x and evaluate at 2 and 0.'],
    ['volume-cross-section', 'A positive curve y = f(x) bounds a region above the x-axis for a ≤ x ≤ b. What is the integrand for the volume when the region is revolved about the x-axis?', 'π(f(x))²',
      ['πf(x)', '2πf(x)', '(f(x))²/π'], 'At each x, the perpendicular cross-section is a disc of radius f(x), giving area π(f(x))².'],
    ['revolution-of-rectangle', 'The region between y = 2 and the x-axis for 1 ≤ x ≤ 4 rotates once about the x-axis. What is the volume?', '12π cubic units',
      ['6π cubic units', '16π cubic units', '24π cubic units'], 'Each disc has area π × 2² = 4π. Integrating the constant cross-sectional area through a length of 3 gives 12π.'],
  ]),
  ...choices(8, 'challenge', [
    ['area-line-parabola', 'Find the exact area of the bounded region between y = x² and y = 2x + 3.', '32/3 square units',
      ['16/3 square units', '32 square units', '10 square units'], 'The intersections solve (x − 3)(x + 1) = 0. Integrate 2x + 3 − x² from −1 to 3. The antiderivative −x³/3 + x² + 3x takes values 9 and −5/3 at these endpoints, giving 32/3.', curveAreaDiagram],
    ['area-both-sides-of-axis', 'Find the total area between y = x² − 4x + 3 and the x-axis for 0 ≤ x ≤ 4.', '4 square units',
      ['4/3 square units', '8/3 square units', '16/3 square units'], 'The curve crosses the axis at x = 1 and x = 3. An antiderivative is x³/3 − 2x² + 3x, whose values at 0, 1, 3 and 4 are 0, 4/3, 0 and 4/3. Add the magnitudes of all three differences to get 4.'],
    ['sum-definite-integral', 'Evaluate the definite integral of 1/√(2x) + 3/∛x from x = 1 to x = 8.', '35/2 − √2',
      ['35/2 + √2', '22 − √2', '31/2 − √2'], 'An antiderivative is √(2x) + (9/2)x^(2/3). The square-root term contributes 4 − √2. The other term contributes (9/2)(4 − 1) = 27/2. Add the two contributions.'],
    ['washer-between-lines', 'The region between y = 1 and y = x + 1 for 0 ≤ x ≤ 2 rotates about the x-axis. Find the exact volume.', '20π/3 cubic units',
      ['8π/3 cubic units', '26π/3 cubic units', '4π cubic units'], 'The outer disc has radius x + 1 and the inner disc has radius 1. The cross-sectional area is π[(x + 1)² − 1] = π(x² + 2x). Integrating gives π(8/3 + 4) = 20π/3.'],
    ['rotation-about-y-axis', 'The region between x = y² and the y-axis for 1 ≤ y ≤ 3 rotates about the y-axis. Find the exact volume.', '242π/5 cubic units',
      ['26π/3 cubic units', '243π/5 cubic units', '80π cubic units'], 'Each section perpendicular to the y-axis is a disc of radius y². Integrate πy⁴ from 1 to 3 to get π(3⁵ − 1⁵)/5 = 242π/5.'],
    ['upper-limit-from-integral', 'The definite integral of 2x + 1 from x = 0 to x = k equals 30, where k is positive. Find k.', '5',
      ['6', '√30', '15'], 'The integral equals k² + k. Solving k² + k − 30 = (k − 5)(k + 6) = 0 and using k > 0 gives 5.'],
    ['bisect-area', 'A vertical line x = k bisects the area under y = x² above the x-axis between x = 0 and x = 3. Find k exactly.', '∛(27/2)',
      ['3/2', '√(9/2)', '∛(9/2)'], 'The total area is 3³/3 = 9. The area from 0 to k is k³/3. Setting it to 9/2 gives k³ = 27/2.'],
    ['average-curves-area', 'Find the area enclosed by y = x + 2 and y = 4 − x².', '9/2 square units',
      ['9 square units', '3 square units', '27/2 square units'], 'Equating the curves gives (x + 2)(x − 1) = 0. The parabola is above the line on [−2, 1]. Integrate 2 − x − x² on that interval to get 9/2.'],
  ]),
  ...calculations(8, [
    ['curve-constant-from-two-points', 'A curve has gradient dy/dx = 6ax² + 2x, where a is constant. The curve passes through (1, 4) and (2, 21).', [
      part('Find a.', 1), part('Find the value of y when x = 3.', 64),
    ], 'Integrating gives y = 2ax³ + x² + C. The points give 2a + C = 3 and 16a + C = 17. Subtract to get a = 1, then C = 1. At x = 3, y = 54 + 9 + 1 = 64.'],
    ['washer-root-curve', 'The region bounded by x = 0, y = 1 and the curve y = √(5 − x) rotates about the x-axis. Write the resulting volume in the form V = kπ.', [
      part('Find the x-coordinate where the curve meets y = 1.', 4), part('Find k.', 8),
    ], 'The curves intersect when √(5 − x) = 1, giving x = 4. The cross-sectional area of the rotated region is π[(5 − x) − 1] = π(4 − x). Integrating from 0 to 4 gives V = 8π.'],
  ]),
];
