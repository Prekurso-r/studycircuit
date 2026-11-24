function question(topic, level, slug, prompt, options, answer, explanation, figure) {
  return {
    id: 'math-5-' + topic + '-' + slug,
    bank: 'mathematics-5.' + topic,
    level,
    prompt,
    options,
    answer,
    explanation,
    ...(figure ? { figure } : {}),
  };
}

function numericalQuestion(topic, slug, prompt, parts, explanation, figure) {
  return {
    id: 'math-5-' + topic + '-' + slug,
    bank: 'mathematics-5.' + topic,
    level: 'challenge',
    prompt,
    parts,
    explanation,
    ...(figure ? { figure } : {}),
  };
}

function part(label, unit, answer, tolerance = 0) {
  return { label, unit, answer, tolerance };
}

function table(caption, headers, rows) {
  return { caption, headers, rows };
}

function normalTable(rows) {
  return table('Extract from a standard normal cumulative probability table', ['z', 'P(Z ≤ z)'], rows);
}

function figure(caption, alt, content) {
  return {
    caption,
    alt,
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 242" width="560" height="242" font-family="system-ui,sans-serif" font-size="15" fill="#17233a">' +
      content + '</svg>',
  };
}

function label(x, y, value, anchor = 'middle') {
  return '<text x="' + x + '" y="' + y + '" text-anchor="' + anchor + '">' + value + '</text>';
}

function line(x1, y1, x2, y2, color = '#17233a') {
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
    '" stroke="' + color + '" stroke-width="1.5"/>';
}

function histogram(caption, alt, edges, heights, ticks, xLabel, yLabel) {
  const x = value => 64 + 442 * (value - edges[0]) / (edges.at(-1) - edges[0]);
  const y = value => 190 - 151 * value / ticks.at(-1);
  const grid = ticks.map(tick => line(64, y(tick), 506, y(tick), '#c5d1e4') + label(55, y(tick) + 5, tick, 'end')).join('');
  const bars = heights.map((height, i) =>
    '<rect x="' + x(edges[i]) + '" y="' + y(height) + '" width="' + (x(edges[i + 1]) - x(edges[i])) +
    '" height="' + (190 - y(height)) + '" fill="#bfcef5" stroke="#28478a" stroke-width="2"/>').join('');
  const xTicks = edges.map(edge => line(x(edge), 190, x(edge), 196) + label(x(edge), 213, edge)).join('');
  return figure(caption, alt, grid + bars + line(64, 36, 64, 190) + line(64, 190, 517, 190) +
    xTicks + label(64, 23, yLabel, 'start') + label(285, 234, xLabel));
}

function cumulativeGraph(caption, alt, points, xLabel, yTicks) {
  const last = points.at(-1);
  const x = value => 62 + 444 * (value - points[0][0]) / (last[0] - points[0][0]);
  const y = value => 190 - 150 * value / last[1];
  const grid = yTicks.map(tick =>
    line(62, y(tick), 506, y(tick), '#c5d1e4') + label(55, y(tick) + 5, tick, 'end')).join('');
  const pointString = points.map(([value, total]) => x(value) + ',' + y(total)).join(' ');
  const dots = points.map(([value, total]) => {
    const rightEnd = value === last[0];
    const pointLabel = total
      ? label(x(value) + (rightEnd ? -8 : 8), y(total) - 9, '(' + value + ', ' + total + ')', rightEnd ? 'end' : 'start')
      : '';
    return '<circle cx="' + x(value) + '" cy="' + y(total) + '" r="3.5" fill="#28478a"/>' +
      pointLabel + line(x(value), 190, x(value), 196) + label(x(value), 213, value);
  }).join('');
  return figure(caption, alt, grid + line(62, 36, 62, 190) + line(62, 190, 517, 190) +
    '<polyline points="' + pointString + '" fill="none" stroke="#28478a" stroke-width="2.5"/>' +
    dots + label(62, 23, 'Cumulative frequency', 'start') + label(284, 235, xLabel));
}

function boxPlots(caption, alt, sets, unit) {
  const values = sets.flatMap(set => set.values);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const x = value => 70 + 430 * (value - minimum) / (maximum - minimum);
  const plots = sets.map((set, i) => {
    const y = 64 + i * 89;
    const [low, q1, median, q3, high] = set.values.map(x);
    return line(low, y, high, y) + line(low, y - 12, low, y + 12) + line(high, y - 12, high, y + 12) +
      '<rect x="' + q1 + '" y="' + (y - 16) + '" width="' + (q3 - q1) +
      '" height="32" fill="#bfcef5" stroke="#28478a" stroke-width="2"/>' +
      line(median, y - 16, median, y + 16) + label(20, y + 5, set.name, 'start') +
      set.values.map(value => label(x(value), y + 42, value)).join('');
  }).join('');
  return figure(caption, alt, plots + label(285, 232, unit));
}

function normalTail() {
  const x = z => 280 + 62 * z;
  const y = z => 180 - 127 * Math.exp(-z * z / 2);
  const points = Array.from({ length: 71 }, (_, i) => i / 10 - 3.5);
  const path = zs => zs.map(z => x(z).toFixed(2) + ',' + y(z).toFixed(2)).join(' ');
  const region = x(1.5) + ',180 ' + path(points.slice(50)) + ' ' + x(3.5) + ',180';
  return figure('Standard normal curve with its upper tail shaded',
    'The horizontal axis is z. The shaded upper tail is to the right of z = 1.50.',
    '<polygon points="' + region + '" fill="#bfcef5"/><polyline points="' + path(points) +
    '" fill="none" stroke="#28478a" stroke-width="2.5"/>' + line(45, 180, 515, 180) +
    line(x(0), 180, x(0), 188) + line(x(1.5), y(1.5), x(1.5), 188) +
    label(x(0), 207, '0') + label(x(1.5), 207, '1.50') + label(518, 207, 'z'));
}

const representation = [
  question(1, 'simple', 'stem-median',
    'What is the median of the values in the stem-and-leaf diagram?',
    ['23', '24.5', '25', '26'], 1,
    'There are 10 values. The fifth and sixth are 23 and 26, so the median is (23 + 26)/2 = 24.5.',
    table('Stem-and-leaf diagram. The key 2 | 6 represents 26.', ['Stem', 'Leaves'],
      [[1, '5 7 9'], [2, '1 3 6 8'], [3, '0 2 7']])),
  question(1, 'simple', 'back-to-back',
    'How many values below 40 are recorded in group A and group B?',
    ['2 in A and 3 in B', '3 in A and 3 in B', '3 in A and 2 in B', '2 in A and 2 in B'], 2,
    'Only the stem 3 represents values below 40. There are three leaves on the left and two on the right of this stem.',
    table('Back-to-back stem-and-leaf diagram. A left leaf 8 with stem 3 represents 38 in group A.',
      ['Group A leaves', 'Stem', 'Group B leaves'], [['8 4 0', 3, '1 7'], ['9 6 2', 4, '2 4 6'], ['5 1', 5, '0 3 8']])),
  question(1, 'simple', 'box-iqr',
    'What is the interquartile range of these journey times?',
    ['15 min', '19 min', '21 min', '25 min'], 0,
    'The ends of the box are the lower quartile, 16 min, and upper quartile, 31 min. Subtract 16 from 31 to obtain 15 min.',
    boxPlots('Journey times', 'Minimum 12 min, lower quartile 16 min, median 22 min, upper quartile 31 min, maximum 37 min.',
      [{ name: '', values: [12, 16, 22, 31, 37] }], 'Time in minutes')),
  question(1, 'simple', 'histogram-area',
    'Use the histogram to find the frequency in the class 5 ≤ t < 15.',
    ['2.5', '15', '20', '25'], 3,
    'The class has width 10 and frequency density 2.5. Its frequency is the bar area, 10 × 2.5 = 25.',
    histogram('Histogram of journey times', 'The intervals 0 to 5, 5 to 15, and 15 to 20 have frequency densities 4, 2.5, and 3 respectively.',
      [0, 5, 15, 20], [4, 2.5, 3], [0, 1, 2, 2.5, 3, 4], 'Time t in minutes', 'Frequency density')),
  question(1, 'simple', 'cumulative-median',
    'The cumulative frequency graph represents 60 journeys. What is the estimated median time?',
    ['20 min', '25 min', '30 min', '40 min'], 2,
    'Read the time corresponding to cumulative frequency 60/2 = 30. The graph gives 30 min.',
    cumulativeGraph('Cumulative frequency of journey times', 'The points (time in minutes, cumulative frequency) are (0, 0), (10, 6), (20, 18), (30, 30), (40, 49), and (50, 60).',
      [[0, 0], [10, 6], [20, 18], [30, 30], [40, 49], [50, 60]], 'Time in minutes', [0, 15, 30, 45, 60])),
  question(1, 'simple', 'raw-mean',
    'Five measurements are 13, 19, 20, 24 and 24. What is their mean?',
    ['19', '20', '21', '24'], 1,
    'The five values sum to 100. Dividing by 5 gives a mean of 20.'),
  question(1, 'simple', 'spread-comparison',
    'Two batches have the same mean length. The standard deviations are 1.8 cm for batch A and 0.7 cm for batch B. What does this comparison show?',
    ['Batch A has a higher median.', 'Batch B contains fewer items.', 'Batch A has a smaller range.', 'Batch B has less spread about its mean as measured by standard deviation.'], 3,
    'Standard deviation measures spread about the mean. A smaller standard deviation indicates less spread by this measure.'),
  question(1, 'simple', 'modal-class',
    'The table describes the times taken to complete a puzzle. What is the modal class?',
    ['0 ≤ t < 10', '10 ≤ t < 20', '20 ≤ t < 30', '30 ≤ t < 40'], 1,
    'All intervals have the same width. The modal class has the greatest frequency, which is 16 for 10 ≤ t < 20.',
    table('Puzzle times', ['Time t in minutes', 'Frequency'], [['0 ≤ t < 10', 5], ['10 ≤ t < 20', 16], ['20 ≤ t < 30', 11], ['30 ≤ t < 40', 8]])),
  question(1, 'simple', 'coded-mean',
    'For eight measurements x, the coded total Σ(x − 50) equals −14. What is the mean of the original measurements?',
    ['48.25', '36', '51.75', '50'], 0,
    'The mean of x − 50 is −14/8 = −1.75. Adding 50 gives an original mean of 48.25.'),
  question(1, 'simple', 'presentation-choice',
    'Two small sets of integer scores need to be compared. Which display most directly shows both distributions side by side and preserves every individual score?',
    ['Two box-and-whisker plots', 'Two grouped histograms', 'Two cumulative frequency graphs', 'A back-to-back stem-and-leaf diagram'], 3,
    'The stems and leaves retain each score, including repeats. The two sets share stems, which makes their shapes and centres easy to compare.'),
  numericalQuestion(1, 'histogram-scale',
    'A histogram was copied onto a grid without its frequency density scale. The class 0 ≤ x < 4 contains 24 observations. Use the height and width of each bar to recover the frequencies.',
    [part('Find the frequency in 4 ≤ x < 10.', 'observations', 60),
      part('Find the percentage of all observations in 10 ≤ x < 12.', '%', 16)],
    'The first bar has area 4 × 3 = 12 grid area units, so each unit represents two observations. The second and third classes have frequencies 2 × 6 × 5 = 60 and 2 × 2 × 4 = 16. There are 100 observations in total, giving 16% in the third class.',
    histogram('Histogram drawn on an unlabelled frequency density scale', 'Widths of the three classes are 4, 6, and 2. Their bar heights in grid units are 3, 5, and 4.',
      [0, 4, 10, 12], [3, 5, 4], [0, 1, 2, 3, 4, 5], 'Measurement x', 'Bar height in grid units')),
  numericalQuestion(1, 'cumulative-interpolation',
    'Use linear interpolation between the plotted points on the cumulative frequency graph for 80 journeys.',
    [part('Estimate the interquartile range.', 'min', 19, 0.03),
      part('Estimate the percentage of journeys longer than 25 min and at most 45 min.', '%', 52.5, 0.1)],
    'The quartile cumulative frequencies are 20 and 60. Interpolation gives Q₁ = 25 min and Q₃ = 44 min, so the interquartile range is 19 min. The cumulative frequencies at 25 and 45 min are 20 and 62, giving 100 × (62 − 20)/80 = 52.5%.',
    cumulativeGraph('Cumulative frequency of 80 journey times', 'The points (time in minutes, cumulative frequency) are (10, 0), (20, 12), (30, 28), (40, 52), (50, 72), and (60, 80). Consecutive points are joined by straight segments.',
      [[10, 0], [20, 12], [30, 28], [40, 52], [50, 72], [60, 80]], 'Time in minutes', [0, 20, 40, 60, 80])),
  numericalQuestion(1, 'combine-totals',
    'Two sets of distances in metres are combined. Use the given totals to calculate the mean and standard deviation of the combined set.',
    [part('Calculate the combined mean.', 'm', 9.125, 0.006),
      part('Calculate the combined standard deviation.', 'm', 3.443744, 0.006)],
    'The combined count, sum and sum of squares are 8, 73 and 761. The mean is 73/8 = 9.125 m. The standard deviation is √[761/8 − (73/8)²] ≈ 3.444 m.',
    table('Summary statistics for the two sets of distances', ['Set', 'Number of values', 'Σx', 'Σx²'], [['A', 3, 18, 116], ['B', 5, 55, 645]])),
  question(1, 'challenge', 'coded-standard-deviation',
    'For 10 values x, Σ(x − 30) = 15 and Σ(x − 30)² = 112.5. What are the mean and standard deviation of x?',
    ['Mean 31.5 and standard deviation 3', 'Mean 31.5 and standard deviation 3.35', 'Mean 1.5 and standard deviation 3', 'Mean 28.5 and standard deviation 9'], 0,
    'The coded mean is 15/10 = 1.5. The coded variance is 112.5/10 − 1.5² = 9. Adding 30 changes the mean to 31.5 and preserves the standard deviation of √9 = 3.'),
  question(1, 'challenge', 'missing-observations',
    'Six values are 3, 5, 7, 9, x and y. Their mean is 7.5 and their sum of squares is 385. What are x and y in ascending order?',
    ['9 and 12', '7 and 14', '10 and 11', '8 and 13'], 2,
    'The missing values satisfy x + y = 45 − 24 = 21 and x² + y² = 385 − 164 = 221. Thus 2xy = 21² − 221 = 220. They are the roots 10 and 11 of t² − 21t + 110 = 0.'),
  numericalQuestion(1, 'grouped-midpoints',
    'Estimate the mean and standard deviation of the grouped waiting times by using class midpoints.',
    [part('Estimate the mean waiting time.', 'min', 6.95, 0.006),
      part('Estimate the standard deviation.', 'min', 3.980892, 0.008)],
    'The midpoints are 2, 7 and 15. The estimated sum is 5 × 2 + 12 × 7 + 3 × 15 = 139. The estimated sum of squares is 1283. The mean is 139/20 = 6.95 min and the standard deviation is √[1283/20 − 6.95²] ≈ 3.98 min.',
    table('Waiting times for 20 visitors', ['Waiting time t in minutes', 'Frequency'],
      [['0 ≤ t < 4', 5], ['4 ≤ t < 10', 12], ['10 ≤ t < 20', 3]])),
  question(1, 'challenge', 'box-comparison',
    'Which comparison of the scores for groups A and B is supported by the two box plots?',
    ['B has a higher median and greater full range.', 'B has a higher median and smaller interquartile range.', 'B has a lower median and greater interquartile range.', 'B has a higher median and greater interquartile range, with a smaller full range.'], 3,
    'The medians are 20 and 24. The interquartile ranges are 25 − 14 = 11 for A and 30 − 16 = 14 for B. Their full ranges are 38 − 8 = 30 and 35 − 6 = 29.',
    boxPlots('Score distributions for two groups', 'Group A minimum 8, lower quartile 14, median 20, upper quartile 25, maximum 38. Group B minimum 6, lower quartile 16, median 24, upper quartile 30, maximum 35.',
      [{ name: 'A', values: [8, 14, 20, 25, 38] }, { name: 'B', values: [6, 16, 24, 30, 35] }], 'Score')),
  question(1, 'challenge', 'remove-outlier',
    'The ordered observations are 11, 12, 15, 16, 18, 23, 24, 25, 29, 30 and 36. For these data, use the medians of the lower and upper halves as quartiles, excluding the overall median when the sample size is odd. How do the median and interquartile range change when 36 is removed?',
    ['Median falls by 4 and interquartile range falls by 2.5.', 'Median falls by 2.5 and interquartile range falls by 4.', 'Median falls by 2.5 and interquartile range is unchanged.', 'Median is unchanged and interquartile range falls by 4.'], 1,
    'Initially the median is 23 and the interquartile range is 29 − 15 = 14. After removing 36, the median is (18 + 23)/2 = 20.5 and the quartiles are 15 and 25. The new interquartile range is 10.'),
  question(1, 'challenge', 'missing-class-frequency',
    'A grouped distribution has its midpoint-based mean estimated as 17. What are the missing frequency k and the resulting estimate for the standard deviation?',
    ['k = 8 and standard deviation 7.48', 'k = 8 and standard deviation 56.0', 'k = 4 and standard deviation 7.48', 'k = 4 and standard deviation 8.37'], 0,
    'The midpoint estimate gives (220 + 15k)/(12 + k) = 17, so k = 8. The midpoint sum of squares is 4 × 5² + 8 × 15² + 8 × 25² = 6900. The standard deviation is √(6900/20 − 17²) ≈ 7.48.',
    table('Grouped frequency distribution', ['Class of x', 'Frequency'], [['0 ≤ x < 10', 4], ['10 ≤ x < 20', 'k'], ['20 ≤ x < 30', 8]])),
  question(1, 'challenge', 'recalibration',
    'A sensor produces readings x with mean 25 and standard deviation 3. It is recalibrated so each new reading is y = 1.2x − 4. What are the mean and standard deviation of y?',
    ['Mean 26 and standard deviation 0.4', 'Mean 30 and standard deviation 3.6', 'Mean 26 and standard deviation 3.6', 'Mean 26 and standard deviation 3'], 2,
    'The new mean is 1.2 × 25 − 4 = 26. Distances from the mean increase by a factor of 1.2, so the standard deviation becomes 1.2 × 3 = 3.6.'),
];

const arrangements = [
  question(2, 'simple', 'books-in-line',
    'Five different books are put in a line on a shelf. How many orders are possible?',
    ['25', '60', '120', '720'], 2,
    'There are five choices for the first book, then four, three, two and one. Their product is 5! = 120.'),
  question(2, 'simple', 'select-students',
    'A teacher selects three students from nine for an activity. Each selected student has the same role. How many different groups can be selected?',
    ['27', '84', '252', '504'], 1,
    'The order of selection does not matter. The answer is ⁹C₃ = (9 × 8 × 7)/(3 × 2 × 1) = 84.'),
  question(2, 'simple', 'two-roles',
    'A club has eight members. It chooses a chair and a treasurer, who must be different people. How many ways can it fill the roles?',
    ['16', '28', '64', '56'], 3,
    'There are eight choices for the chair. For each chair, seven different members are available for treasurer, giving 8 × 7 = 56.'),
  question(2, 'simple', 'repeated-letters',
    'How many distinct arrangements are there of the seven letters in BALLOON?',
    ['1260', '840', '2520', '5040'], 0,
    'There are two Ls and two Os. Dividing the 7! orders of labelled positions by 2! for each repeated letter gives 7!/(2! × 2!) = 1260.'),
  question(2, 'simple', 'adjacent-friends',
    'Six friends stand in a line for a photograph. Asha and Bea must stand next to each other. How many arrangements are possible?',
    ['120', '144', '240', '360'], 2,
    'Treat Asha and Bea as one block. The block and the other four friends can be arranged in 5! orders. The block has two internal orders, giving 2 × 5! = 240.'),
  question(2, 'simple', 'fixed-endings',
    'Seven runners stand in a line. Nia must be at the left end and Arun must be at the right end. How many orders are possible?',
    ['24', '120', '240', '720'], 1,
    'The two ends are fixed. The other five runners can be arranged in the middle positions in 5! = 120 ways.'),
  question(2, 'simple', 'repeated-code-digits',
    'A code has three positions. Each position can contain any digit from 1 to 6 and a digit may be used more than once. How many codes are possible?',
    ['18', '20', '120', '216'], 3,
    'Each of the three positions has six choices, so there are 6³ = 216 codes.'),
  question(2, 'simple', 'two-rows',
    'Six different people sit in two rows of three seats. Dara must sit somewhere in the front row. How many seat assignments are possible?',
    ['360', '120', '180', '720'], 0,
    'Dara has three choices of seat. After assigning Dara, the other five people can fill the remaining seats in 5! orders. This gives 3 × 5! = 360.'),
  question(2, 'simple', 'nonzero-first-digit',
    'How many four-digit integers can be made from the digits 0, 2, 4, 6 and 8 if no digit is repeated?',
    ['24', '80', '96', '120'], 2,
    'There are four choices for the first digit because it cannot be zero. For the remaining positions there are four, three and two choices, giving 4 × 4 × 3 × 2 = 96.'),
  question(2, 'simple', 'choose-two-groups',
    'A sample consists of two different items chosen from seven fabrics and one chosen from five threads. How many samples are possible?',
    ['70', '105', '210', '245'], 1,
    'Choose the fabrics in ⁷C₂ = 21 ways and the thread in five ways. Multiplying gives 105 possible samples.'),
  question(2, 'challenge', 'fixed-and-apart',
    'Eight people stand in a line. R must be first, and P and Q must stand apart. How many arrangements are possible?',
    ['1440', '2880', '5040', '3600'], 3,
    'With R fixed, the remaining seven people have 7! orders. In 2 × 6! of those orders, P and Q are adjacent because they form a block with two internal orders. Subtracting gives 5040 − 1440 = 3600.'),
  question(2, 'challenge', 'separate-cups',
    'Five distinct bowls and three distinct cups are arranged in a line. No two cups can be adjacent. How many arrangements are possible?',
    ['14 400', '2400', '7200', '40 320'], 0,
    'Arrange the five bowls in 5! ways. The bowls create six gaps including the ends. Choose three gaps and arrange the three cups in them. The count is 5! × ⁶C₃ × 3! = 14 400.'),
  question(2, 'challenge', 'two-letter-restrictions',
    'In an arrangement of all six letters of TOOTER, the Os must be adjacent and the Ts must be separated. How many arrangements are possible?',
    ['24', '30', '36', '60'], 2,
    'The OO block, T, T, E and R have 5!/2! = 60 orders. The cases with adjacent Ts give four distinct blocks or letters, and hence 4! = 24 orders. The difference is 36.'),
  question(2, 'challenge', 'restricted-roles',
    'Four guitarists and five keyboard players are available for three distinct roles of lead, deputy and organiser. Exactly one guitarist must be selected, and the lead must be a keyboard player. How many assignments fit?',
    ['80', '160', '240', '360'], 1,
    'Choose the lead from five keyboard players. Choose the other keyboard player from four, and the guitarist from four. Either of these last two can be deputy, giving 5 × 4 × 4 × 2 = 160.'),
  question(2, 'challenge', 'adjacent-other-row',
    'Eight people sit in two rows of four seats. P and Q must occupy adjacent seats in one row and S must sit in the other row. How many seat assignments satisfy both rules?',
    ['1440', '2880', '4320', '5760'], 3,
    'Choose the row of P and Q in two ways, their neighbouring seat pair in three ways and their order in two ways. S has four possible seats in the other row. The other five people can sit in 5! ways, giving 2 × 3 × 2 × 4 × 5! = 5760.'),
  question(2, 'challenge', 'even-repeated-digits',
    'All five digits 0, 1, 1, 2 and 3 are used to form a five-digit even integer. How many such distinct integers are there?',
    ['21', '18', '24', '36'], 0,
    'Ending in 0 gives 4!/2! = 12 valid orders. Ending in 2 also gives 12 orders before excluding 3!/2! = 3 with a leading 0. The total is 12 + 9 = 21.'),
  question(2, 'challenge', 'committee-exclusion',
    'A committee consists of exactly two apprentices from four and three supervisors from six. Two specified apprentices cannot both be chosen. How many committees are possible?',
    ['60', '80', '100', '120'], 2,
    'There are ⁴C₂ − 1 = 5 acceptable apprentice pairs and ⁶C₃ = 20 choices of supervisors. Multiplying gives 100 committees.'),
  question(2, 'challenge', 'relative-order-and-block',
    'Seven different people stand in a line. From left to right A must appear before B, who must appear before C. D and E must stand together. How many arrangements are possible?',
    ['120', '240', '480', '1440'], 1,
    'Treat D and E as one block. There are 2 × 6! arrangements with D and E together. The six possible relative orders of A, B and C occur equally often, and exactly one meets the rule. Divide by 6 to obtain 240.'),
  question(2, 'challenge', 'fixed-end-letters',
    'Arrange all letters of ANANAS in a line so the first and last letters are both A and the Ns are separated. How many distinct arrangements result?',
    ['3', '4', '12', '6'], 3,
    'After fixing the ends, the middle letters A, N, N and S have 4!/2! = 12 orders. The NN block, A and S have 3! = 6 orders, so 12 − 6 = 6 are allowed.'),
  question(2, 'challenge', 'three-rows',
    'Nine students occupy three rows of three seats. E sits one row directly in front of F in the same column. G and H both sit in row 3, the back row. How many assignments are possible?',
    ['2880', '2160', '4320', '5760'], 0,
    'If E and F occupy rows 1 and 2, there are three choices of column and 3 × 2 ways to seat G and H. If E and F occupy rows 2 and 3, there are three choices of column and 2 × 1 ways to seat G and H. Multiply (18 + 6) by 5! to seat the others, giving 2880.'),
];

function twoBagTree() {
  const inner = line(64, 114, 205, 65) + line(64, 114, 205, 170) +
    line(205, 65, 408, 37) + line(205, 65, 408, 95) +
    line(205, 170, 408, 142) + line(205, 170, 408, 201) +
    label(117, 81, '0.5') + label(119, 154, '0.5') +
    label(315, 43, '0.4') + label(315, 99, '0.6') +
    label(315, 151, '0.2') + label(315, 204, '0.8') +
    label(20, 119, 'Start', 'start') + label(204, 49, 'A') + label(204, 152, 'B') +
    label(417, 42, 'Both red', 'start') + label(417, 100, 'Other outcome', 'start') +
    label(417, 147, 'Both red', 'start') + label(417, 206, 'Other outcome', 'start');
  return figure('Probability tree for the choice of bag and the two draws',
    'The branches for bags A and B both have probability 0.5. From A the probability of both red is 0.4 and of any other outcome is 0.6. From B these probabilities are 0.2 and 0.8.',
    inner);
}

const probability = [
  question(3, 'simple', 'two-dice-total',
    'Two fair six-sided dice are rolled independently. What is the probability that the total score is 8?',
    ['1/6', '5/36', '1/9', '1/36'], 1,
    'There are 36 equally likely ordered pairs. The five pairs with total 8 are (2, 6), (3, 5), (4, 4), (5, 3) and (6, 2), giving 5/36.'),
  question(3, 'simple', 'two-red',
    'A bag contains four red counters and three blue counters. Two counters are drawn randomly without replacement. What is the probability that both are red?',
    ['2/7', '16/49', '1/7', '4/7'], 0,
    'The chance of red first is 4/7. After removing one red counter, three of the remaining six are red. The product (4/7)(3/6) is 2/7.'),
  question(3, 'simple', 'exclusive-events',
    'On one roll of a fair six-sided die, A is the event that the score is 1 or 2 and B is the event that the score is 5 or 6. Which statement holds?',
    ['A and B are independent and can occur together.', 'A and B can occur together and are dependent.', 'A and B are mutually exclusive and independent.', 'A and B are mutually exclusive and dependent.'], 3,
    'None of the scores is in both events, so the events are mutually exclusive. Both probabilities are positive. Their product is positive and their intersection has probability zero, so the events are dependent.'),
  question(3, 'simple', 'independence-check',
    'The probabilities are P(A) = 0.40, P(B) = 0.25 and P(A ∩ B) = 0.10. What can be concluded?',
    ['A and B are mutually exclusive.', 'A and B are complements.', 'A and B are independent.', 'A and B are dependent.'], 2,
    'The product P(A)P(B) = 0.40 × 0.25 = 0.10 equals P(A ∩ B). This establishes independence.'),
  question(3, 'simple', 'conditional-from-intersection',
    'Suppose P(A ∩ B) = 0.09 and P(B) = 0.30. Find P(A | B).',
    ['0.30', '0.027', '0.39', '0.21'], 0,
    'Restricting attention to event B gives P(A | B) = P(A ∩ B)/P(B) = 0.09/0.30 = 0.30.'),
  question(3, 'simple', 'at-least-one-pass',
    'A component passes a test with probability 0.20. Three components are tested independently. What is the probability that at least one passes?',
    ['0.008', '0.512', '0.600', '0.488'], 3,
    'Each component fails with probability 0.80. All three fail with probability 0.80³ = 0.512, so the complementary event has probability 1 − 0.512 = 0.488.'),
  question(3, 'simple', 'coin-tails',
    'Two fair coins are tossed independently. What is the probability of getting exactly one tail?',
    ['1/4', '1/2', '3/4', '1/8'], 1,
    'The two favourable outcomes are HT and TH. They are two of the four equally likely outcomes.'),
  question(3, 'simple', 'frequency-table-joint',
    'One response is selected at random from the table. What is the probability that it is from Class B and the choice is cycling?',
    ['1/3', '3/5', '3/10', '1/5'], 2,
    'Six responses satisfy both conditions. There are 6 + 4 + 6 + 4 = 20 responses in all, so the probability is 6/20 = 3/10.',
    table('Travel choices by class', ['Class', 'Walking', 'Cycling'], [['A', 6, 4], ['B', 4, 6]])),
  question(3, 'simple', 'one-colour-union',
    'A spinner has ten equal sectors. Three are purple, two are white and five are green. Find the probability of getting purple or white on one spin.',
    ['1/2', '3/50', '1/5', '3/10'], 0,
    'Purple and white are disjoint outcomes. Together they occupy five of the ten equal sectors, giving probability 5/10.'),
  question(3, 'simple', 'digit-complement',
    'A random digit is equally likely to be any integer from 0 to 9. A is the event that the digit is strictly less than 4. What is P(A′)?',
    ['3/10', '2/5', '1/2', '3/5'], 3,
    'There are four digits below 4, namely 0, 1, 2 and 3. The other six digits belong to A′, so P(A′) = 6/10 = 3/5.'),
  question(3, 'challenge', 'source-of-fault',
    'Line A makes 55% of a factory’s components and Line B makes 45%. The fault rates for the lines are 2% and 6%, respectively. A randomly selected component is faulty. What is the probability it was made by Line B, to three significant figures?',
    ['0.450', '0.600', '0.711', '0.0270'], 2,
    'A component is faulty and from A with probability 0.55 × 0.02 = 0.011. It is faulty and from B with probability 0.45 × 0.06 = 0.027. Among faulty components the fraction from B is 0.027/(0.011 + 0.027) ≈ 0.711.'),
  question(3, 'challenge', 'more-green-counters',
    'A bag contains six green and four blue counters. Three are selected at random without replacement. Given that at least one green counter was selected, what is the probability that at least two were selected?',
    ['2/3', '20/29', '29/30', '25/29'], 1,
    'There are ¹⁰C₃ − ⁴C₃ = 116 selections with at least one green. Exactly two greens give ⁶C₂ × 4 = 60 selections, and three greens give ⁶C₃ = 20. The conditional probability is (60 + 20)/116 = 20/29.'),
  question(3, 'challenge', 'dice-multiple-four',
    'Two independent fair six-sided dice have a total that is a multiple of 4. What is the probability that both scores are even?',
    ['5/9', '1/4', '4/9', '5/36'], 0,
    'The totals 4, 8 and 12 have 3, 5 and 1 ordered pairs, respectively. Both dice are even in 1 of the pairs for total 4, 3 for total 8 and 1 for total 12. Thus the required fraction of the nine possible pairs is 5/9.'),
  numericalQuestion(3, 'independent-survey',
    'In a survey of 100 people, 40 choose sport and 50 choose music. For a randomly selected respondent, choosing sport and choosing music are independent. A respondent may choose both.',
    [part('Find the number who choose both sport and music.', 'people', 20),
      part('Find the number who choose neither activity.', 'people', 30)],
    'Independence gives P(both) = 0.40 × 0.50 = 0.20, so 20 people choose both. The disjoint groups sport only, music only and both contain 20, 30 and 20 people. The remaining 30 choose neither.'),
  question(3, 'challenge', 'conditional-colour-pair',
    'Four blue, three green and two red counters are in a bag. Two are selected at random without replacement. Given that at least one selected counter is green, what is the probability of selecting a green and a red?',
    ['1/6', '3/7', '2/7', '2/9'], 2,
    'At least one green occurs in ⁹C₂ − ⁶C₂ = 21 equally likely pairs. A green and a red occur in 3 × 2 = 6 pairs, giving conditional probability 6/21 = 2/7.'),
  question(3, 'challenge', 'given-a-five',
    'A blue and a yellow fair six-sided die are rolled independently. Given that at least one die shows 5, what is the probability that both show 5?',
    ['1/12', '1/11', '1/6', '1/36'], 1,
    'Six ordered pairs have 5 on the blue die. Another five have 5 on the yellow die and a different number on the blue die. Only one of these eleven pairs is (5, 5).'),
  question(3, 'challenge', 'all-three-colours',
    'Five red, four blue and three green tokens are available. A sample of four distinct tokens is selected at random. What is the probability that all three colours occur?',
    ['6/11', '4/11', '9/11', '20/33'], 0,
    'A sample containing all colours repeats exactly one of them. Repeating red, blue and green gives respectively ⁵C₂ × 4 × 3 = 120, 5 × ⁴C₂ × 3 = 90 and 5 × 4 × ³C₂ = 60 selections. Divide the total of 270 by ¹²C₄ = 495 to obtain 6/11.'),
  question(3, 'challenge', 'two-bags',
    'Bag A contains four red and two blue counters. Bag B contains three red and three blue counters. A bag is chosen at random and two counters are drawn without replacement from it. The tree gives the branch probabilities. What are P(both red) and P(B | both red)?',
    ['0.20 and 1/2', '0.30 and 1/2', '0.60 and 1/3', '0.30 and 1/3'], 3,
    'The two paths to both red have probabilities 0.5 × 0.4 = 0.2 and 0.5 × 0.2 = 0.1. Add them to get P(both red) = 0.3. The second path represents bag B, so divide 0.1 by 0.3 to get 1/3.',
    twoBagTree()),
  question(3, 'challenge', 'one-success-two-days',
    'A player’s attempts on Monday and Tuesday are independent. Their success probabilities are 0.40 and 0.30, respectively. Given that exactly one success occurs, what is the probability that it occurs on Monday?',
    ['2/5', '7/25', '14/23', '3/7'], 2,
    'The probability of success on Monday and failure on Tuesday is 0.40 × 0.70 = 0.28. The other way to get exactly one success has probability 0.60 × 0.30 = 0.18. The conditional probability is 0.28/(0.28 + 0.18) = 14/23.'),
  question(3, 'challenge', 'event-pair-relations',
    'A fair six-sided die is rolled. Let A be the event that the score is even, B the event that the score is less than 5, and C the event that the score is at least 5. Which description is correct?',
    ['A and B are mutually exclusive. B and C are independent.', 'A and B are independent. B and C are mutually exclusive.', 'A and B are dependent. B and C can occur together.', 'A and C are mutually exclusive. A and B are dependent.'], 1,
    'Scores 2 and 4 belong to both A and B, so P(A ∩ B) = 2/6 = (1/2)(4/6). Therefore A and B are independent. A score cannot be both below 5 and at least 5, so B and C are mutually exclusive.'),
];

const discreteVariables = [
  question(4, 'simple', 'distribution-total',
    'The table lists all possible values of X. Find k.',
    ['0.40', '0.25', '0.35', '0.60'], 0,
    'The three probabilities sum to 1, so k = 1 − 0.25 − 0.35 = 0.40.',
    table('Probability distribution of X', ['x', 'P(X = x)'], [[0, '0.25'], [1, 'k'], [2, '0.35']])),
  question(4, 'simple', 'expected-value',
    'What is the expected value of X?',
    ['1.00', '1.20', '1.40', '1.50'], 2,
    'Weight each value by its probability. The expected value is 0 × 0.20 + 1 × 0.50 + 3 × 0.30 = 1.40.',
    table('Probability distribution of X', ['x', 'P(X = x)'], [[0, '0.20'], [1, '0.50'], [3, '0.30']])),
  question(4, 'simple', 'distribution-variance',
    'Use the probability distribution to find Var(X).',
    ['2', '0.5', '4', '4.5'], 1,
    'The mean is 2 and E(X²) = 1 × 0.25 + 4 × 0.50 + 9 × 0.25 = 4.5. Subtract the squared mean to get Var(X) = 4.5 − 4 = 0.5.',
    table('Probability distribution of X', ['x', 'P(X = x)'], [[1, '0.25'], [2, '0.50'], [3, '0.25']])),
  question(4, 'simple', 'binomial-context',
    'Twelve people respond independently to a poll. Each person has probability 0.35 of choosing option A. X counts the people choosing option A. Which model applies?',
    ['Geo(0.35)', 'B(0.35, 12)', 'B(12, 0.65)', 'B(12, 0.35)'], 3,
    'There are 12 independent trials with constant success probability 0.35. A binomial variable counts the successes, so X follows B(12, 0.35).'),
  question(4, 'simple', 'exactly-two-successes',
    'X follows B(5, 0.30). Find P(X = 2).',
    ['0.3087', '0.03087', '0.16308', '0.2160'], 0,
    'Choose the two success positions in ⁵C₂ = 10 ways. Each pattern has probability 0.30² × 0.70³. Their total is 0.3087.'),
  question(4, 'simple', 'binomial-mean',
    'X follows B(18, 0.40). Find E(X).',
    ['4.32', '7.2', '10.8', '18'], 1,
    'For B(n, p), the expected number of successes is np. Here 18 × 0.40 = 7.2.'),
  question(4, 'simple', 'binomial-variance',
    'X follows B(25, 0.20). Find Var(X).',
    ['2', '5', '20', '4'], 3,
    'A binomial variable has variance np(1 − p), which here is 25 × 0.20 × 0.80 = 4.'),
  question(4, 'simple', 'geometric-third-trial',
    'Independent trials with success probability 0.25 continue until the first success. What is the probability that the first success occurs on trial 3?',
    ['0.1875', '0.421875', '0.140625', '0.015625'], 2,
    'The required sequence is two failures and one success. Its probability is 0.75² × 0.25 = 0.140625.'),
  question(4, 'simple', 'geometric-mean',
    'X is the number of independent trials up to and including the first success. The success probability is 0.20 on every trial. Find E(X).',
    ['4', '5', '1.25', '0.20'], 1,
    'X follows Geo(0.20). The expected number of trials up to the first success is 1/p = 1/0.20 = 5.'),
  question(4, 'simple', 'geometric-tail',
    'X follows Geo(0.30), where X counts the trials up to and including the first success. Find P(X > 4).',
    ['0.0081', '0.1029', '0.7599', '0.2401'], 3,
    'X exceeds 4 when all of the first four trials fail. The probability is 0.70⁴ = 0.2401.'),
  numericalQuestion(4, 'minimum-of-two-dice',
    'Two fair four-sided dice, each numbered 1 to 4, are rolled independently. X is the smaller score, or their common score if they match.',
    [part('Find E(X).', '', 1.875, 0.0051),
      part('Find Var(X).', '', 0.859375, 0.002)],
    'Among 16 equally likely pairs, the counts with minimum 1, 2, 3 and 4 are 7, 5, 3 and 1. For example, minimum 2 occurs in the 3² pairs with both scores at least 2, excluding the 2² pairs with both scores at least 3. Then E(X) = (7 + 10 + 9 + 4)/16 = 1.875 and E(X²) = (7 + 20 + 27 + 16)/16 = 4.375. Subtract 1.875² to get variance 0.859375.'),
  question(4, 'challenge', 'variance-from-mean',
    'The table gives the distribution of X. If E(X) = 2.2, find b and Var(X).',
    ['b = 0.40 and variance 7.60', 'b = 0.40 and variance 2.76', 'b = 0.30 and variance 2.76', 'b = 0.55 and variance 4.84'], 1,
    'The probabilities give a + b = 0.7 and the mean gives 2a + 4b = 2.2. Solving gives a = 0.3 and b = 0.4. The variance is 4 × 0.3 + 16 × 0.4 − 2.2² = 2.76.',
    table('Probability distribution of X', ['x', 'P(X = x)'], [[0, '0.30'], [2, 'a'], [4, 'b']])),
  question(4, 'challenge', 'recover-binomial-parameters',
    'A binomial random variable has mean 8 and variance 4.8. Which distribution is it?',
    ['B(20, 0.40)', 'B(20, 0.60)', 'B(12, 0.40)', 'B(16, 0.50)'], 0,
    'For B(n, p), np = 8 and np(1 − p) = 4.8. Dividing gives 1 − p = 0.6. Then p = 0.4 and n = 8/0.4 = 20.'),
  question(4, 'challenge', 'binomial-lower-complement',
    'Nine independent tests each return a positive result with probability 0.20. To three significant figures, what is the probability of getting at least three positive results?',
    ['0.738', '0.176', '0.134', '0.262'], 3,
    'Let X follow B(9, 0.20). Subtract the probabilities of 0, 1 and 2 positives from 1. The calculation is 1 − [0.8⁹ + 9 × 0.2 × 0.8⁸ + 36 × 0.2² × 0.8⁷] ≈ 0.262.'),
  question(4, 'challenge', 'conditional-binomial',
    'X follows B(5, 0.35). Given that X is positive, what is the probability that X equals 2, to three significant figures?',
    ['0.336', '0.884', '0.381', '0.274'], 2,
    'The probability of exactly two successes is ⁵C₂ × 0.35² × 0.65³. The probability that X is positive is 1 − 0.65⁵. Dividing the first probability by the second gives approximately 0.381.'),
  question(4, 'challenge', 'geometric-given-failures',
    'Each independent trial succeeds with probability 0.30. Let X be the trial number of the first success. Given that the first two trials fail, find P(X ≥ 6).',
    ['0.343', '0.16807', '0.2401', '0.657'], 0,
    'Reaching trial 6 requires trials 1 to 5 to fail. Failures at trials 1 and 2 are already known, leaving three independent failures required at trials 3, 4 and 5. The probability is 0.70³ = 0.343.'),
  question(4, 'challenge', 'geometric-recover-mean',
    'X follows Geo(p) with 0 < p < 1. The probability of X = 3 is 0.36 times the probability of X = 1. What are p and E(X)?',
    ['p = 0.36 and E(X) ≈ 2.78', 'p = 0.40 and E(X) = 2.5', 'p = 0.60 and E(X) ≈ 1.67', 'p = 0.64 and E(X) = 1.5625'], 1,
    'The ratio [p(1 − p)²]/p equals (1 − p)². Thus 1 − p = √0.36 = 0.60, so p = 0.40 and E(X) = 1/0.40 = 2.5.'),
  question(4, 'challenge', 'number-of-trials',
    'Independent trials have success probability 0.18 each. What is the smallest number of trials needed for the probability of at least one success to reach 0.92?',
    ['11', '12', '14', '13'], 3,
    'For n trials the probability of at least one success is 1 − 0.82ⁿ. The failure probabilities for 12 and 13 trials are about 0.09242 and 0.07578. The first time the failure probability is at most 0.08 is at 13 trials, since 0.82ⁿ decreases as n increases.'),
  question(4, 'challenge', 'model-without-replacement',
    'Three counters are chosen without replacement from five blue and three red counters. X is the number of red counters selected. Which statement is correct?',
    ['X follows B(3, 3/8) and P(X = 2) = 15/56.', 'X follows Geo(3/8) and P(X = 2) = 15/56.', 'The draws are dependent and P(X = 2) = 15/56.', 'The draws are dependent and P(X = 2) = 3/8.'], 2,
    'The draws are dependent and their conditional success probabilities change. For exactly two reds and one blue, there are ³C₂ × ⁵C₁ = 15 selections out of ⁸C₃ = 56 equally likely sets.'),
  numericalQuestion(4, 'two-round-credit',
    'A player completes two independent puzzles, with success probability 0.60 for each. The net credit X is −3 for no successes, 1 for one success and 8 for two successes.',
    [part('Find the expected net credit.', 'credits', 2.88, 0.006),
      part('Find the variance of the net credit.', 'credits²', 16.6656, 0.06)],
    'The probabilities of zero, one and two successes are 0.16, 0.48 and 0.36. The expected credit is −3 × 0.16 + 1 × 0.48 + 8 × 0.36 = 2.88. The expected squared credit is 9 × 0.16 + 1 × 0.48 + 64 × 0.36 = 24.96. Then Var(X) = 24.96 − 2.88² = 16.6656.'),
];

const normalDistribution = [
  question(5, 'simple', 'read-normal-notation',
    'A variable follows N(60, 16). What is its standard deviation?',
    ['4', '8', '16', '60'], 0,
    'In N(μ, σ²), the second parameter is the variance. The standard deviation is √16 = 4.'),
  question(5, 'simple', 'symmetry-about-mean',
    'X follows N(50, 9). What is P(X > 50)?',
    ['0.09', '0.25', '0.50', '0.91'], 2,
    'The normal curve is symmetric about its mean, 50. Half of its area lies above 50.'),
  question(5, 'simple', 'standardise-threshold',
    'X is normally distributed with mean 75 and standard deviation 8. What standard normal value corresponds to X = 87?',
    ['0.67', '1.50', '8.00', '12.0'], 1,
    'The standardisation formula is z = (x − μ)/σ. At x = 87 this gives (87 − 75)/8 = 1.50.'),
  question(5, 'simple', 'read-normal-table',
    'Z is a standard normal variable. Use the table to find P(Z < 1.25).',
    ['0.1056', '0.2112', '0.3944', '0.8944'], 3,
    'The table gives the area below z directly. At z = 1.25 that area is 0.8944.',
    normalTable([['1.20', '0.8849'], ['1.25', '0.8944'], ['1.30', '0.9032']])),
  question(5, 'simple', 'upper-tail-diagram',
    'For a standard normal variable Z, P(Z ≤ 1.50) = 0.9332. What is the shaded probability?',
    ['0.0668', '0.1336', '0.4332', '0.9332'], 0,
    'The shaded region lies above 1.50. Its area is 1 − 0.9332 = 0.0668.',
    normalTail()),
  question(5, 'simple', 'within-one-standard-deviation',
    'For a standard normal variable Z, P(Z ≤ 1) = 0.8413. Find P(−1 < Z < 1).',
    ['0.1587', '0.3174', '0.6826', '0.8413'], 2,
    'By symmetry, P(Z ≤ −1) = 1 − 0.8413 = 0.1587. The central area is 0.8413 − 0.1587 = 0.6826.'),
  question(5, 'simple', 'lower-quartile',
    'X is normal with mean 52 and standard deviation 8. The lower quartile of the standard normal distribution corresponds to z ≈ −0.674. What is the lower quartile of X to one decimal place?',
    ['57.4', '46.6', '51.3', '44.0'], 1,
    'Reverse the standardisation using x = μ + σz. The value is 52 + 8 × (−0.674) ≈ 46.6.'),
  question(5, 'simple', 'normal-model-suitability',
    'Which description is most consistent with measurements modelled by a normal distribution?',
    ['Counts of successes confined to the integers 0 through 5', 'Positive values with most observations near zero and a long right tail', 'Continuous measurements with two widely separated peaks', 'Continuous measurements clustered around one centre with roughly symmetric tapering tails'], 3,
    'A normal density describes continuous measurements. It has one central peak and symmetric tails that taper away from the mean.'),
  question(5, 'simple', 'normal-approximation-condition',
    'For which binomial model do both np and n(1 − p) exceed 5?',
    ['B(40, 0.20)', 'B(20, 0.25)', 'B(12, 0.30)', 'B(28, 0.85)'], 0,
    'For B(40, 0.20), the products are 8 and 32. Each other model has at least one product at or below 5.'),
  question(5, 'simple', 'single-value-correction',
    'A continuous normal variable Y approximates a binomial variable X. Which event for Y should be used for P(X = 12) after continuity correction?',
    ['Y = 12', '11 < Y < 13', '11.5 < Y < 12.5', '12 < Y < 13'], 2,
    'The integer count 12 is represented by the unit-width interval centred at 12. Its endpoints are 11.5 and 12.5.'),
  question(5, 'challenge', 'mean-from-lower-tail',
    'The masses of a product are normally distributed with standard deviation 6 g. About 10% of the products have mass below 194 g. Use the standard normal 10th percentile z ≈ −1.282 to estimate the mean to one decimal place.',
    ['186.3 g', '194.0 g', '195.3 g', '201.7 g'], 3,
    'The cutoff satisfies (194 − μ)/6 ≈ −1.282. Rearranging gives μ ≈ 194 + 6 × 1.282 = 201.692 g.'),
  question(5, 'challenge', 'spread-from-upper-tail',
    'A normal distribution has mean 75. Five per cent of the observations exceed 87. Using z ≈ 1.645 for the upper 5% cutoff, estimate the standard deviation to one decimal place.',
    ['19.7', '7.3', '12.0', '1.6'], 1,
    'Standardising the cutoff gives (87 − 75)/σ ≈ 1.645. Thus σ ≈ 12/1.645 = 7.3 to one decimal place.'),
  numericalQuestion(5, 'two-quantiles',
    'For a normal variable X, the 5th and 95th percentiles are 48.42 and 61.58. Use z = −1.645 and z = 1.645 as the corresponding standard normal percentiles.',
    [part('Estimate the mean.', '', 55, 0.04),
      part('Estimate the standard deviation.', '', 4, 0.03)],
    'By symmetry, the mean is halfway between the percentiles, (48.42 + 61.58)/2 = 55. The difference from the mean to the 95th percentile is 6.58 = 1.645σ, so σ = 4.'),
  question(5, 'challenge', 'asymmetric-interval',
    'A waiting time X is modelled by N(34, 16), with time in minutes. Use the table to estimate P(29 < X ≤ 44).',
    ['0.8882', '0.8944', '0.9938', '0.0994'], 0,
    'The lower and upper standardised endpoints are (29 − 34)/4 = −1.25 and (44 − 34)/4 = 2.50. Subtract the cumulative probabilities to obtain 0.9938 − 0.1056 = 0.8882.',
    normalTable([['−1.25', '0.1056'], ['1.25', '0.8944'], ['2.50', '0.9938']])),
  question(5, 'challenge', 'approximate-binomial-upper-tail',
    'X follows B(200, 0.40). Use a normal approximation with a continuity correction to estimate P(X ≥ 88). Which value is closest?',
    ['0.860', '0.124', '0.140', '0.0625'], 2,
    'Both 200 × 0.4 = 80 and 200 × 0.6 = 120 exceed 5. The approximating normal distribution has mean 80 and variance 48. The corrected lower endpoint is 87.5, giving z = (87.5 − 80)/√48 ≈ 1.083. Its upper-tail probability is about 0.140.',
    normalTable([['1.00', '0.8413'], ['1.08', '0.8599'], ['1.15', '0.8749'], ['1.22', '0.8888']])),
  question(5, 'challenge', 'approximate-binomial-interval',
    'X follows B(100, 0.50). Use a normal approximation with a continuity correction to estimate P(46 ≤ X < 58).',
    ['0.725', '0.749', '0.771', '0.933'], 1,
    'Here np = n(1 − p) = 50, so the approximation is suitable. The normal mean is 50 and standard deviation is 5. The integer counts 46 through 57 give corrected endpoints 45.5 and 57.5, which standardise to −0.90 and 1.50. The approximate area is 0.9332 − 0.1841 = 0.7491.',
    normalTable([['−0.90', '0.1841'], ['−0.80', '0.2119'], ['1.40', '0.9192'], ['1.50', '0.9332'], ['1.60', '0.9452']])),
  question(5, 'challenge', 'binomial-cutoff',
    'X follows B(100, 0.40). Using a normal approximation with a continuity correction, find the smallest integer k for which P(X ≥ k) is at most 0.10. The standard normal upper 10% cutoff is z ≈ 1.282.',
    ['45', '46', '48', '47'], 3,
    'The approximating normal has mean 40 and variance 24. Its upper tail from k − 0.5 is at most 0.10 when (k − 0.5 − 40)/√24 ≥ 1.282. This gives k ≥ 40.5 + 1.282√24 ≈ 46.78. The smallest integer is 47.'),
  question(5, 'challenge', 'conditional-normal-tail',
    'A normal variable X has mean 30 and variance 25. Given that X > 33, what is the probability that X > 38, to three significant figures?',
    ['0.200', '0.0548', '0.274', '0.219'], 0,
    'The cutoffs 33 and 38 standardise to 0.60 and 1.60. Their upper tails have areas about 0.2743 and 0.0548. The region above 38 is entirely within the region above 33, so the conditional probability is 0.0548/0.2743 ≈ 0.200.',
    normalTable([['0.60', '0.7257'], ['0.80', '0.7881'], ['1.30', '0.9032'], ['1.60', '0.9452']])),
  numericalQuestion(5, 'outside-acceptable-range',
    'The masses of 120 jars are independent and each follows N(500, 25), with mass in grams. A jar is rejected if its mass is below 492 g or above 509 g.',
    [part('Find the probability that a jar is rejected.', '', 0.09073, 0.0004),
      part('Find the expected number of rejected jars.', 'jars', 10.888, 0.06)],
    'The cutoffs standardise to −1.60 and 1.80. The two disjoint tails have areas about 0.0548 and 0.0359. Their sum is about 0.0907. Multiplying by 120 gives an expected count of about 10.9.',
    normalTable([['−1.80', '0.0359'], ['−1.60', '0.0548'], ['1.60', '0.9452'], ['1.80', '0.9641']])),
  numericalQuestion(5, 'central-area-and-tail',
    'A normal variable has mean 120. Its probability of lying between 110 and 130 is 0.80. Use the standard normal 90th percentile z ≈ 1.282 and estimate the upper tail above 135.',
    [part('Estimate the standard deviation.', '', 7.8003, 0.018),
      part('Estimate P(X > 135).', '', 0.02724, 0.0003)],
    'Symmetry leaves an area of 0.10 in each tail beyond 110 and 130. The upper cutoff gives (130 − 120)/σ ≈ 1.282, so σ ≈ 7.80. The threshold 135 standardises to about 1.923, whose upper-tail probability is about 0.0272. A table lookup at 1.92 gives 0.0274.',
    normalTable([['1.90', '0.9713'], ['1.91', '0.9719'], ['1.92', '0.9726'], ['1.93', '0.9732']])),
];

export const mathematicsPaper5 = [
  ...representation,
  ...arrangements,
  ...probability,
  ...discreteVariables,
  ...normalDistribution,
];
