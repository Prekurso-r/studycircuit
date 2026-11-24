// Cambridge International AS & A Level Mathematics 9709, Probability & Statistics 2.
const items = [];

function add(number, level, slug, prompt, response, explanation, figure) {
  const id = `math-6-${number}-${slug}`;
  items.push({
    id, bank: `mathematics-6.${number}`, level, prompt, ...response, explanation,
    ...(figure ? { figure } : {}),
  });
}

function choice(number, level, slug, prompt, [correct, ...options], explanation, figure) {
  // Keep the answer order stable when other questions are added or moved.
  const answer = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 4;
  options.splice(answer, 0, correct);
  add(number, level, slug, prompt, { options, answer }, explanation, figure);
}

function topic(number) {
  return {
    simple: (...args) => choice(number, 'simple', ...args),
    challenge: (...args) => choice(number, 'challenge', ...args),
    numeric: (slug, prompt, parts, explanation, figure) =>
      add(number, 'challenge', slug, prompt, { parts }, explanation, figure),
  };
}

function format(value, places) {
  return value.toFixed(places).replace(/^-/, '−');
}

function probabilities(...values) {
  return values.map(value => format(value, 4));
}

function part(label, value, places = 4, tolerance = 0.0005) {
  return { label, unit: '', answer: Number(value.toFixed(places)), tolerance };
}

function poissonMass(mean, count) {
  let probability = Math.exp(-mean);
  for (let index = 1; index <= count; index += 1) probability *= mean / index;
  return probability;
}

function poissonLower(mean, count) {
  let probability = 0;
  for (let index = 0; index <= count; index += 1) probability += poissonMass(mean, index);
  return probability;
}

function binomialMass(trials, rate, count) {
  let probability = (1 - rate) ** trials;
  for (let index = 1; index <= count; index += 1) {
    probability *= (trials - index + 1) / index * rate / (1 - rate);
  }
  return probability;
}

function binomialLower(trials, rate, count) {
  let probability = 0;
  for (let index = 0; index <= count; index += 1) probability += binomialMass(trials, rate, index);
  return probability;
}

function normalLower(z) {
  // Standard normal approximation with absolute error below 0.00000008.
  const positive = Math.abs(z);
  const t = 1 / (1 + 0.2316419 * positive);
  const density = Math.exp(-(positive ** 2) / 2) / Math.sqrt(2 * Math.PI);
  const tail = density * t * (0.319381530 + t * (-0.356563782
    + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z < 0 ? tail : 1 - tail;
}

{
  const { simple, challenge, numeric } = topic(1);

  simple('point-probability', 'The number X of walk-in desk enquiries in an hour has a Poisson distribution with mean 2.4. Find P(X = 3).',
    probabilities(poissonMass(2.4, 3), poissonMass(2.4, 2), poissonLower(2.4, 3), 1 - poissonLower(2.4, 3)),
    `Use P(X = 3) = e⁻²·⁴ × 2.4³ ÷ 3! = ${format(poissonMass(2.4, 3), 4)}.`);

  simple('at-least-two', 'The daily number of faulty labels is modelled by Po(1.7). What is the probability of at least two faulty labels in a day?',
    probabilities(1 - poissonLower(1.7, 1), poissonLower(1.7, 1), poissonMass(1.7, 2), 1 - poissonLower(1.7, 2)),
    `The complement consists of counts 0 and 1. Subtract e⁻¹·⁷(1 + 1.7) from 1 to obtain ${format(1 - poissonLower(1.7, 1), 4)}.`);

  simple('mean-and-variance', 'Monthly equipment call-outs have a Poisson distribution with parameter 3.8. What are the mean and variance?',
    ['Mean 3.8, variance 3.8', 'Mean 3.8, variance 14.44', 'Mean 3.8, variance √3.8', 'Mean √3.8, variance 3.8'],
    'For Po(λ), both the mean and the variance are λ. The standard deviation here is √3.8.');

  simple('model-condition', 'Which situation most directly supports a constant-rate Poisson model for the number of events in one hour?',
    ['Independent requests arrive at a steady mean rate, with negligible chance of simultaneous arrivals.',
      'A planned announcement causes many requests at exactly the same time.',
      'A new request can arrive only after the previous one is cleared.',
      'One request is scheduled at the start of every ten-minute period.'],
    'The model describes independent events at a steady mean rate. The other mechanisms introduce clustering, dependence or fixed timing.');

  simple('scale-to-minutes', 'Reports arrive independently at a constant mean rate of 2.8 per hour. Use a Poisson model. What parameter applies to a period of 45 minutes?',
    ['2.1', '3.73', '0.0622', '2.8'],
    'Forty-five minutes is three-quarters of an hour, so the expected count is 2.8 × 0.75 = 2.1.');

  simple('binomial-conditions', 'Which binomial distribution best meets the Cambridge conditions for a Poisson approximation?',
    ['Binomial with n = 220 and p = 0.015', 'Binomial with n = 25 and p = 0.15',
      'Binomial with n = 240 and p = 0.24', 'Binomial with n = 40 and p = 0.40'],
    'Look for a large number of trials and rare successes, in practice n greater than 50 and np less than about 5. The first model has np = 3.3.');

  simple('approximate-no-returns', 'There are 160 independent orders, each with probability 0.01875 of being returned. Use a Poisson approximation to find the probability that none is returned.',
    probabilities(poissonMass(3, 0), poissonMass(0.01875, 0), poissonMass(3, 1), 1 - poissonMass(3, 0)),
    `The Poisson mean is np = 160 × 0.01875 = 3. For a count of zero the probability is e⁻³ = ${format(Math.exp(-3), 4)}.`);

  simple('normal-model', 'A count with distribution Po(24) is to be approximated by a normal random variable. What mean and variance should that variable have?',
    ['Mean 24, variance 24', 'Mean 24, variance 576', 'Mean 24, variance √24', 'Mean 12, variance 24'],
    'A normal approximation uses the Poisson mean and variance. Both are 24, comfortably above the approximate minimum mean of 15 for this method.');

  simple('lower-bound-correction', 'Let X have a Poisson distribution with mean 20, and let Y be its normal approximation. Which event should be used to approximate P(X ≥ 18)?',
    ['Y > 17.5', 'Y > 18.5', 'Y > 18', 'Y < 17.5'],
    'The integer value 18 is represented by the interval from 17.5 to 18.5. Include that entire interval and all larger values.');

  simple('time-scaled-lower-tail', 'A rink averages 6 equipment requests every two hours. Assume a constant-rate Poisson model. What is the probability of at most one request in 20 minutes?',
    probabilities(poissonLower(1, 1), poissonMass(1, 1), 1 - poissonLower(1, 1), poissonLower(3, 1)),
    `Twenty minutes is one-sixth of two hours, so the count has mean 1. Add P(X = 0) and P(X = 1) to obtain 2e⁻¹ = ${format(poissonLower(1, 1), 4)}.`);

  const jamsMean = 3.6;
  const fewerThanFive = poissonLower(jamsMean, 4);
  numeric('printer-jams', 'Printer pauses occur independently at a constant average rate of 0.9 per half hour. Model the number X of pauses in two hours.',
    [part('Find the Poisson parameter for X.', jamsMean), part('Find P(X ≥ 5). Give your probability to 4 decimal places.', 1 - fewerThanFive)],
    `Two hours contains four half-hours, giving λ = 4 × 0.9 = 3.6. The complement P(X ≤ 4) is ${format(fewerThanFive, 4)}, so P(X ≥ 5) = ${format(1 - fewerThanFive, 4)}.`);

  const queryTail = 1 - poissonLower(2.6, 1);
  const queryConditional = poissonMass(2.6, 3) / queryTail;
  numeric('conditional-count', 'The number X of evening bookings has distribution Po(2.6). Give probabilities to 4 decimal places.',
    [part('Find P(X ≥ 2).', queryTail), part('Given that X ≥ 2, find the probability that X = 3.', queryConditional)],
    `Subtract e⁻²·⁶(1 + 2.6) from 1 to find P(X ≥ 2) = ${format(queryTail, 4)}. Every outcome with X = 3 is already in that event. Divide P(X = 3) by P(X ≥ 2) to get ${format(queryConditional, 4)}.`);

  const quietMean = -Math.log(0.22);
  numeric('recover-rate', 'The number X of weekend bicycle repair requests has a Poisson distribution. The probability of zero requests is 0.22. Give answers to 4 decimal places.',
    [part('Find the mean of X.', quietMean), part('Find P(X = 2).', poissonMass(quietMean, 2))],
    `Since P(X = 0) = exp(−λ), solve exp(−λ) = 0.22 to get λ = −ln(0.22) = ${format(quietMean, 4)}. Then P(X = 2) = 0.22λ² ÷ 2 = ${format(poissonMass(quietMean, 2), 4)}.`);

  const transitRange = poissonLower(3, 4) - poissonLower(3, 1);
  numeric('binomial-interval', 'Each of 240 independent phone calls has probability 0.0125 of being wrongly routed. Let X count the wrongly routed calls. Use a Poisson approximation.',
    [part('Find the approximate variance of X under the Poisson model.', 3, 0, 0), part('Approximate P(2 ≤ X ≤ 4) to 4 decimal places.', transitRange)],
    `The Poisson parameter and variance are both 240 × 0.0125 = 3. Add the Poisson probabilities for counts 2, 3 and 4. This gives ${format(transitRange, 4)}.`);

  const minimumSensors = Math.floor(-Math.log(0.05) / 0.003) + 1;
  numeric('sample-size-at-least-one', 'A study checks n devices. Each independently has probability 0.003 of a particular signal. Use a Poisson approximation to plan n.',
    [part('Write the Poisson parameter as a multiple of n. Enter the multiplier.', 0.003, 4, 0.00001),
      part('Find the smallest integer n for which the approximate probability of at least one signal exceeds 0.95.', minimumSensors, 0, 0)],
    `The mean is 0.003n. Solve 1 − exp(−0.003n) > 0.95 to get n > −ln(0.05)/0.003 = ${format(-Math.log(0.05) / 0.003, 3)}. The smallest integer is ${minimumSensors}. Its mean is below 5 and n is large, so the approximation is appropriate.`);

  const collectionLower = (47.5 - 54) / Math.sqrt(54);
  const collectionUpper = (61.5 - 54) / Math.sqrt(54);
  numeric('normal-range', 'A depot models its daily bicycle rentals X by Po(54). Use a normal approximation for P(48 ≤ X ≤ 61).',
    [part('Enter the lower continuity-corrected boundary.', 47.5, 1, 0),
      part('Find the approximate probability to 4 decimal places.', normalLower(collectionUpper) - normalLower(collectionLower))],
    `Use the interval 47.5 to 61.5 under the normal model with mean 54 and variance 54. Standardising gives z-values ${format(collectionLower, 3)} and ${format(collectionUpper, 3)}. Subtract the lower standard normal area from the upper area to obtain ${format(normalLower(collectionUpper) - normalLower(collectionLower), 4)}.`);

  const bookingsThreshold = Math.ceil(48 + 1.2816 * Math.sqrt(48) - 0.5);
  challenge('normal-quantile', 'Demand for bus seats in a period is modelled by Po(48). Use a normal approximation with continuity correction. What is the smallest integer capacity k for which P(X ≤ k) is approximately at least 0.90? The 90th standard normal percentile is 1.2816.',
    [String(bookingsThreshold), String(bookingsThreshold - 1), String(bookingsThreshold + 1), '49'],
    `The normal model has 90th percentile 48 + 1.2816√48 ≈ ${format(48 + 1.2816 * Math.sqrt(48), 2)}. The event X ≤ k uses the boundary k + 0.5. Require k + 0.5 to reach that percentile, giving k = ${bookingsThreshold}.`);

  const equalMean = Math.sqrt(12);
  numeric('equal-masses', 'A random variable X has a Poisson distribution with a positive parameter λ. It satisfies P(X = 2) = P(X = 4). Give answers to 4 decimal places.',
    [part('Find λ.', equalMean), part('Find the common value of P(X = 2) and P(X = 4).', poissonMass(equalMean, 2))],
    `The equality is exp(−λ) × λ² ÷ 2! = exp(−λ) × λ⁴ ÷ 4!. Cancel exp(−λ) and λ² to get λ² = 4!/2! = 12. The positive root is ${format(equalMean, 4)}. Substitution gives the common probability ${format(poissonMass(equalMean, 2), 4)}.`);

  const shortLongConditional = 2 * 0.25 * 0.75;
  challenge('count-in-two-windows', 'Requests follow a constant-rate Poisson model. In a 40-minute period exactly two requests arrive. What is the probability that exactly one arrives in the first 10 minutes?',
    probabilities(shortLongConditional, 0.25, 0.25 ** 2, 0.5),
    'Write μ for the 40-minute mean. The independent subperiod means are μ/4 and 3μ/4. The probability of one event in each is exp(−μ) × (μ/4) × (3μ/4). Divide by P(total = 2) = exp(−μ) × μ²/2 to get 2 × 0.25 × 0.75 = 0.375.');

  const lowDaily = poissonLower(1.4, 2);
  const quietDaily = poissonMass(1.4, 0);
  numeric('three-independent-days', 'Daily counts of a particular checkout fault are independent and each has distribution Po(1.4). Consider three days. Give probabilities to 4 decimal places.',
    [part('Find the probability that every day has at most two faults.', lowDaily ** 3),
      part('Find the probability that exactly one day has zero faults.', 3 * quietDaily * (1 - quietDaily) ** 2)],
    `One day has probability ${format(lowDaily, 4)} of at most two faults. Cube the unrounded probability to obtain ${format(lowDaily ** 3, 4)}. The zero-fault probability is e⁻¹·⁴. Exactly one zero day can occur in three positions, so use 3e⁻¹·⁴(1 − e⁻¹·⁴)² = ${format(3 * quietDaily * (1 - quietDaily) ** 2, 4)}.`);
}

{
  const { simple, challenge, numeric } = topic(2);

  simple('scaled-mean', 'A random variable X has mean 8. Find E(4X − 7).',
    ['25', '3', '32', '39'], 'Apply E(aX + b) = aE(X) + b. Here 4 × 8 − 7 = 25.');

  simple('scaled-variance', 'The variance of X is 6. Find Var(3X + 5).',
    ['54', '18', '23', '59'], 'A constant shift has no effect on spread. Multiplying X by 3 multiplies its variance by 3², so the result is 54.');

  simple('mean-difference', 'E(X) = 12 and E(Y) = 4. What is E(X − 2Y), even if X and Y are dependent?',
    ['4', '8', '16', '20'], 'Expectations are linear regardless of dependence, so E(X − 2Y) = 12 − 2 × 4 = 4.');

  simple('weighted-variance', 'Independent random variables X and Y have variances 5 and 3. Find Var(2X − Y).',
    ['23', '17', '13', '8'], 'The squared multiplier of X is 4 and that of Y is 1. Independence gives 4 × 5 + 3 = 23.');

  simple('reflected-normal', 'X is normal with mean 7 and variance 4. Which distribution describes 20 − 2X?',
    ['Normal with mean 6 and variance 16', 'Normal with mean 6 and variance 8',
      'Normal with mean 34 and variance 16', 'Normal with mean 6 and variance 4'],
    'A linear transformation of a normal variable is normal. Its mean is 20 − 2 × 7 = 6 and its variance is (−2)² × 4 = 16.');

  simple('difference-of-normals', 'Independent normal variables X and Y have means 18 and 9 and variances 7 and 5, respectively. What is the distribution of X − Y?',
    ['Normal with mean 9 and variance 12', 'Normal with mean 9 and variance 2',
      'Normal with mean 27 and variance 12', 'Normal with mean 27 and variance 2'],
    'Subtract the means and add the variances. The combination is normal because the two normal variables are independent.');

  simple('poisson-sum', 'X and Y are independent. X has distribution Po(2.8) and Y has distribution Po(1.7). What is the distribution of X + Y?',
    ['Po(4.5)', 'Po(4.76)', 'Po(1.1)', 'A binomial distribution with mean 4.5'],
    'The sum of independent Poisson variables is Poisson with the sum of their parameters, 2.8 + 1.7 = 4.5.');

  simple('poisson-difference', 'X and Y are independent Poisson variables, each with a positive parameter. Why is X − Y not a Poisson variable?',
    ['It can take a negative value.', 'Its variance must be zero.', 'Its mean must be positive.', 'Its variance is the difference of the two variances.'],
    'An outcome with Y greater than X is possible and makes X − Y negative. A Poisson variable takes only non-negative integer values.');

  simple('variance-condition', 'Only the two individual variances are known. Which information allows Var(5X + 2Y) to be found by adding 25 Var(X) and 4 Var(Y)?',
    ['X and Y are independent.', 'X and Y have the same mean.', 'X and Y have the same variance.', 'X and Y are both discrete.'],
    'Independence makes the two scaled variances add. Having the same mean, the same variance or the same kind of variable is insufficient.');

  simple('independent-versus-doubled', 'Tank volume measurements X and Y are independent, with the same mean and with variance 9 each. Compare Var(X + Y) with Var(2X).',
    ['18 and 36, respectively', '18 and 18, respectively', '36 and 18, respectively', '36 and 36, respectively'],
    'The sum of two independent measurements has variance 9 + 9 = 18. Doubling one measurement multiplies its variance by 4, giving 36.');

  numeric('same-term-twice', 'Daily costs X and Y from two services are independent. Their means are 12 and 20, and their variances are 4 and 9, respectively. A total is T = 2X + Y + X + 5. The two appearances of X refer to the same variable.',
    [part('Find E(T).', 61, 0, 0), part('Find Var(T).', 45, 0, 0)],
    'Combine the X terms first to get T = 3X + Y + 5. The mean is 3 × 12 + 20 + 5 = 61. Independence of X and Y gives variance 9 × 4 + 9 = 45.');

  const totalBottleZ = (1018 - 1000) / Math.sqrt(41);
  numeric('sum-of-fill-volumes', 'Two filling machines independently fill bottles. Their fill volumes in millilitres are normal with means 498 and 502 and standard deviations 4 and 5, respectively. One bottle is selected from each machine.',
    [part('Find the variance of the sum of their fill volumes in mL².', 41, 0, 0),
      part('Find the probability the total exceeds 1018 mL, to 4 decimal places.', 1 - normalLower(totalBottleZ))],
    `The total is normal with mean 1000 and variance 4² + 5² = 41. Standardise 1018 to (1018 − 1000)/√41 ≈ ${format(totalBottleZ, 3)}. The upper tail is ${format(1 - normalLower(totalBottleZ), 4)}.`);

  const reserveLoss = normalLower(-1.5);
  numeric('affine-fuel-reserve', 'A delivery route uses a normally distributed amount X litres of fuel, with mean 31 and standard deviation 2. The dispatch plan sets the reserve indicator to R = 68 − 2X.',
    [part('Find the standard deviation of R.', 4, 0, 0),
      part('Find P(R < 0) to 4 decimal places.', reserveLoss)],
    `R is normal with mean 68 − 2 × 31 = 6 and variance 4 × 2² = 16. The standard deviation is 4 and the standardised boundary for zero is −1.5. The lower tail is ${format(reserveLoss, 4)}.`);

  const raceDifference = normalLower(-2 / Math.sqrt(10));
  challenge('paired-times', 'Two independent task times X and Y are normal with means 24 and 22 minutes and variances 9 and 1 minutes squared, respectively. What is the probability that task X finishes first if they start together, and what is the variance of X − Y?',
    [`${format(raceDifference, 4)} and 10`, `${format(1 - raceDifference, 4)} and 10`, `${format(normalLower(-2 / Math.sqrt(8)), 4)} and 8`, '0.5000 and 10'],
    `X − Y is normal with mean 2 and variance 9 + 1 = 10. X finishes first when this difference is negative. The lower tail below −2/√10 is ${format(raceDifference, 4)}.`);

  const workshopRisk = 1 - normalLower(2 / Math.sqrt(13));
  numeric('double-stock', 'Independent normal variables X and Y give package masses in grams. Their means are 61 and 29, and variances are 9 and 1, respectively. A comparison uses the variable X − 2Y.',
    [part('Find the variance of X − 2Y.', 13, 0, 0),
      part('Find the probability that X exceeds twice Y by more than 5 g, to 4 decimal places.', workshopRisk)],
    `The difference is normal with mean 61 − 2 × 29 = 3 and variance 9 + 4 × 1 = 13. Standardising 5 gives (5 − 3)/√13, so the upper-tail probability is ${format(workshopRisk, 4)}.`);

  const combinedMean = 5.6;
  numeric('combine-enquiry-desks', 'Independent help desks A and B each follow a constant-rate Poisson model. A receives a mean of 2.1 enquiries per hour and is observed for two hours. B receives a mean of 2.8 enquiries per hour and is observed for half an hour.',
    [part('Find the Poisson parameter for the combined count.', combinedMean, 1, 0),
      part('Find the probability that the combined count is at least seven, to 4 decimal places.', 1 - poissonLower(combinedMean, 6))],
    `The interval means are 2.1 × 2 = 4.2 and 2.8 × 0.5 = 1.4. Add them for Po(5.6). The complement of at least seven is at most six, giving 1 − P(X ≤ 6) = ${format(1 - poissonLower(combinedMean, 6), 4)}.`);

  numeric('find-two-weights', 'Independent variables X and Y have means 4 and 6 and variances 2 and 3, respectively. T = aX + Y + b, with a positive. The variance of T is 21 and its mean is 15.',
    [part('Find a.', 3, 0, 0), part('Find b.', -3, 0, 0)],
    'The variance relation is 2a² + 3 = 21, so the positive value of a is 3. The mean equation is 4a + 6 + b = 15. This gives b = −3.');

  numeric('calibrate-measurement-model', 'Independent normal variables X and Y are modeled with E(Y) = 7 and Var(Y) = 5. The combined variable 2X − 3Y has mean 11 and standard deviation 9.',
    [part('Find E(X).', 16, 0, 0), part('Find Var(X).', 9, 0, 0)],
    'The mean gives 2E(X) − 21 = 11 and so E(X) = 16. The variance gives 4 Var(X) + 9 × 5 = 81, producing Var(X) = 9.');

  const centredVariance = (0.25 ** 2) * 9 + (0.75 ** 2) * 1;
  const stableReading = 2 * normalLower(2 / Math.sqrt(centredVariance)) - 1;
  numeric('weighted-calibration', 'Two independent readings X and Y of one quantity are normal with the same unknown mean μ and variances 9 and 1. A weighted reading is T = 0.25X + 0.75Y.',
    [part('Find Var(T).', centredVariance, 3, 0.0005),
      part('Find the probability that T differs from μ by less than 2, to 4 decimal places.', stableReading)],
    `The weights sum to 1, so E(T) = μ. Independence gives variance 0.25² × 9 + 0.75² × 1 = ${format(centredVariance, 3)}. The normal model places T within 2 of μ with probability 2Φ(2/√${format(centredVariance, 3)}) − 1 = ${format(stableReading, 4)}.`);

  const repeatsVariance = 2 ** 2 * 3 + 5 + 8;
  challenge('three-independent-components', 'Independent variables X, Y and Z model three energy contributions. Their means are 5, 9 and 6 and their variances are 3, 5 and 8, respectively. An adjustment has value T = 2X + Y − Z − 4. What are E(T) and Var(T)?',
    [`9 and ${repeatsVariance}`, '9 and 9', '13 and 25', '9 and 19'],
    'The mean is 2 × 5 + 9 − 6 − 4 = 9. For independent components, square the coefficients and add the variances. That gives 4 × 3 + 5 + 8 = 25.');
}

{
  const { simple, challenge, numeric } = topic(3);

  simple('triangular-normalisation', 'The density of X is f(x) = kx on 0 ≤ x ≤ 4 and zero elsewhere. Find k.',
    ['1/8', '1/4', '1/16', '1/2'],
    'The total area is 1, so k × [x²/2] from 0 to 4 equals 1. This gives 8k = 1 and k = 1/8.');

  simple('point-probability', 'A continuous random variable has positive density at x = 0.6. What is P(X = 0.6)?',
    ['0', '0.6', '1', 'The value of the density at 0.6'],
    'Probability is area under the density. A single point has zero width and therefore zero probability, even when the density at that point is positive.');

  simple('constant-density', 'X has constant density 1/5 on the interval 2 ≤ x ≤ 7 and zero density elsewhere. What is P(3 ≤ X ≤ 5)?',
    ['2/5', '1/5', '3/5', '4/5'],
    'The required rectangle has width 5 − 3 = 2 and height 1/5. Its area is 2/5.');

  simple('decreasing-density-tail', 'The density of X is f(x) = 2(1 − x) for 0 ≤ x ≤ 1 and zero elsewhere. What is P(X > 0.4)?',
    ['0.36', '0.64', '0.60', '0.48'],
    'The region to the right of 0.4 is a triangle with base 0.6 and height 2(1 − 0.4) = 1.2. Its area is 0.5 × 0.6 × 1.2 = 0.36.');

  simple('mean-from-polynomial', 'X has density f(x) = 3x² for 0 ≤ x ≤ 1 and zero elsewhere. Find E(X).',
    ['3/4', '1/4', '3/5', '1/2'],
    'Multiply the density by x and integrate. The integral of 3x³ from 0 to 1 is 3/4.');

  simple('second-moment', 'X has constant density 1/3 on 2 ≤ x ≤ 5 and zero density elsewhere. Find E(X²).',
    ['13', '12.25', '7', '39'],
    'Integrate x²/3 over the support. The result is [x³/9] from 2 to 5 = (125 − 8)/9 = 13.');

  simple('variance-from-moments', 'For a continuous random variable X, E(X) = 2.5 and E(X²) = 9.25. Find Var(X).',
    ['3', '6.75', '9.25', '6.25'],
    'Variance is E(X²) − [E(X)]² = 9.25 − 6.25 = 3.');

  simple('median-by-area', 'The density of X is f(x) = 2x for 0 ≤ x ≤ 1 and zero elsewhere. Which value is the median?',
    ['1/√2', '1/2', '1/4', '√3/2'],
    'Call the median m and set the area below it to 0.5. The integral of 2x from 0 to m is m², so m is the positive square root of 0.5.');

  simple('valid-density', 'Each option describes a function that is zero outside its stated interval. Which function is a valid probability density?',
    ['f(x) = 2x on 0 ≤ x ≤ 1', 'f(x) = −2x on 0 ≤ x ≤ 1',
      'f(x) = 1 on 0 ≤ x ≤ 2', 'f(x) = 1 − 2x on 0 ≤ x ≤ 1'],
    'A density is non-negative and integrates to 1. For f(x) = 2x on this interval, the integral is [x²] from 0 to 1 = 1. The constant function integrates to 2 and the other two take negative values.');

  simple('read-density-graph', 'The figure shows the complete density on the interval where it can be positive. Find P(X ≥ 2).',
    ['0.25', '0.50', '0.75', '0.125'],
    'The shaded right-hand triangle has base 4 − 2 = 2 and height 0.25. Its area is ½ × 2 × 0.25 = 0.25.',
    {
      caption: 'Linear probability density with the region x ≥ 2 shaded',
      alt: 'The line descends from density 0.50 at x = 0 to density 0 at x = 4. At x = 2 the density is 0.25. The triangle between x = 2 and x = 4 is shaded.',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 240" aria-hidden="true" focusable="false">
        <rect width="440" height="240" rx="10" fill="#fff"/>
        <path d="M215 179V111L360 179Z" fill="#ddd3fc"/>
        <path d="M70 111H215M215 111V179" fill="none" stroke="#777083" stroke-dasharray="5 5"/>
        <path d="M70 30V179H394" fill="none" stroke="#49425b" stroke-width="2"/>
        <path d="M70 43L360 179" fill="none" stroke="#5940b6" stroke-width="3"/>
        <path d="M65 43H70M65 111H70M215 179V184M360 179V184" fill="none" stroke="#49425b" stroke-width="2"/>
        <g fill="#282039" font-family="system-ui, sans-serif" font-size="17">
          <text x="68" y="25">f(x)</text><text x="58" y="49" text-anchor="end">0.50</text>
          <text x="58" y="117" text-anchor="end">0.25</text><text x="70" y="207" text-anchor="middle">0</text>
          <text x="215" y="207" text-anchor="middle">2</text><text x="360" y="207" text-anchor="middle">4</text>
          <text x="398" y="184">x</text>
        </g>
      </svg>`,
    });

  numeric('cubic-moments', 'The density of X is f(x) = kx³ on 0 ≤ x ≤ 2 and zero elsewhere.',
    [part('Find k.', 1 / 4), part('Find Var(X). Give your result to 4 decimal places.', 8 / 75)],
    'The integral of kx³ from 0 to 2 is 4k, so k = 1/4. Integrating x⁴/4 and x⁵/4 over that same interval gives E(X) = 8/5 and E(X²) = 8/3. Hence Var(X) = 8/3 − (8/5)² = 8/75 ≈ 0.1067.');

  numeric('fit-linear-density', 'The density of X is f(x) = a + bx on 0 ≤ x ≤ 2 and zero elsewhere. The probability that X is at most 1 is 3/8.',
    [part('Find a.', 0.25), part('Find b.', 0.25), part('Find E(X). Give your result to 4 decimal places.', 7 / 6)],
    'The total area is 2a + 2b = 1. The area from 0 to 1 is a + b/2 = 3/8. Solving gives a = b = 1/4. For the mean, integrate ax + bx² over 0 to 2 to obtain 2a + 8b/3 = 7/6.');

  numeric('infinite-interval-moments', 'A continuous random variable X has density f(x) = k/x⁴ for x ≥ 2 and zero elsewhere.',
    [part('Find k.', 24, 0, 0), part('Find Var(X).', 3, 0, 0)],
    'Integrating x⁻⁴ from 2 to infinity gives 1/24, so k = 24. Integrals of 24x⁻³ and 24x⁻² over the same interval give E(X) = 3 and E(X²) = 12. The variance is 12 − 3² = 3.');

  numeric('infinite-interval-conditional', 'The density of X is f(x) = c/(1 + x)⁴ for x ≥ 0 and zero elsewhere.',
    [part('Find c.', 3, 0, 0), part('Find P(X > 3 given X > 1).', 0.125)],
    'The integral of (1 + x)⁻⁴ from 0 to infinity is 1/3, so c = 3. Integrating the density from a to infinity gives (1 + a)⁻³. The conditional probability is (1/64)/(1/8) = 1/8.');

  numeric('symmetric-density-variance', 'The density of X is f(x) = (4 − x²)/a for −2 ≤ x ≤ 2 and zero elsewhere.',
    [part('Find a. Give your result to 4 decimal places.', 32 / 3), part('Find Var(X).', 0.8)],
    'The integral of 4 − x² over −2 to 2 is 32/3, which determines a. By symmetry E(X) = 0. The integral of 4x² − x⁴ over −2 to 2 is 128/15. Divide that by a to get E(X²) = 4/5, also the variance.');

  const iqr = 2 * Math.sqrt(3) - 2;
  numeric('quartiles-and-iqr', 'The density of X is f(x) = (x − 1)/8 for 1 ≤ x ≤ 5 and zero elsewhere.',
    [part('Find the lower quartile.', 3, 0, 0),
      part('Find the interquartile range to 4 decimal places.', iqr)],
    `The area from 1 to x is (x − 1)²/16. Set it equal to 1/4 to get the lower quartile 3 and to 3/4 to get the upper quartile 1 + 2√3. Their difference is ${format(iqr, 4)}.`);

  numeric('conditional-triangle-area', 'The density of X is f(x) = (4 − x)/8 for 0 ≤ x ≤ 4 and zero elsewhere. Give answers to 4 decimal places.',
    [part('Find P(X > 1).', 9 / 16), part('Given X > 1, find the probability that X > 3.', 1 / 9)],
    'The upper tail above a is a triangle of area (4 − a)²/16. For a = 1 the area is 9/16 and for a = 3 it is 1/16. The latter event lies entirely inside the former, so the conditional probability is 1/9.');

  const upperPercentile = 2 * Math.log(10);
  numeric('infinite-percentile', 'The density of X is f(x) = k exp(−x/2) for x ≥ 0 and zero elsewhere.',
    [part('Find k.', 0.5), part('Find the 90th percentile to 4 decimal places.', upperPercentile)],
    `The integral of exp(−x/2) from 0 to infinity is 2, giving k = 1/2. At the 90th percentile t, the upper area is 0.10. Integrating from t to infinity gives exp(−t/2) = 0.10, so t = 2 ln(10) ≈ ${format(upperPercentile, 4)}.`);

  challenge('quadratic-density-area', 'The density of X is f(x) = k(x − 1)(4 − x) for 1 ≤ x ≤ 4 and zero elsewhere. Find k and P(2 ≤ X ≤ 3).',
    ['k = 2/9, probability = 13/27', 'k = 2/9, probability = 14/27',
      'k = 1/3, probability = 13/27', 'k = 2/9, probability = 1/3'],
    'Substitute t = x − 1 to integrate 3t − t² from 0 to 3. The result is 9/2 before multiplying by k, so k = 2/9. The area for t from 1 to 2 is k × (13/6) = 13/27.');

  numeric('unknown-endpoint', 'X has density f(x) = 2x/b² on 0 ≤ x ≤ b and zero elsewhere, with b > 2. The probability that X is at least 2 is 3/4.',
    [part('Find b.', 4, 0, 0), part('Find E(X). Give your result to 4 decimal places.', 8 / 3)],
    'The area below 2 is 4/b² and equals 1/4. Since b is positive, b = 4. Integrating 2x²/b² from 0 to b gives E(X) = 2b/3 = 8/3.');
}

{
  const { simple, challenge, numeric } = topic(4);

  simple('population-versus-sample', 'A factory checks 30 tiles selected from all the tiles it makes on Tuesday. For a study of Tuesday’s output, what is the population?',
    ['All the tiles made on Tuesday', 'Only the 30 tiles checked', 'Every tile ever made at the factory', 'Only the damaged tiles among the 30'],
    'The population is the complete group about which the study seeks information. The 30 checked tiles form a sample from Tuesday’s output.');

  simple('time-of-day-bias', 'A transport study surveys only the passengers on the first bus of the morning. It aims to estimate the mean journey length of all passengers throughout the day. Why might this method be unsatisfactory?',
    ['Passengers later in the day are excluded and may travel different distances.',
      'Journey length cannot be estimated from any sample.',
      'An early bus is always completely empty.',
      'A sample must contain every member of the population.'],
    'This timing systematically excludes passengers on later services. If their journey lengths differ, the selected passengers may be unrepresentative.');

  simple('select-by-random-numbers', 'A college wants to choose 12 distinct students from a list of 80. Which method gives each student an equal chance of selection?',
    ['Number the list 1 to 80 and draw random integers in that range until 12 different numbers have been selected.',
      'Take the first 12 students who volunteer.',
      'Choose 12 students whose names are easiest to remember.',
      'Pick 12 students from the year group with the closest classroom.'],
    'Each distinct number corresponds to one student. Drawing uniformly and skipping duplicates treats all 80 students equally.');

  simple('expected-sample-mean', 'A population has mean 19.6. What is the expected value of the mean of an independent random sample of size 40?',
    ['19.6', '19.6/40', '19.6/√40', '40 × 19.6'],
    'Each observation has expectation 19.6. Adding the 40 expectations and dividing by 40 leaves 19.6.');

  simple('sample-mean-variance', 'A population has standard deviation 12. The sample mean is formed from 36 independent observations. What is the variance of that sample mean?',
    ['4', '2', '144', '1/3'],
    'Use population variance divided by sample size. Here Var(X̄) = 12²/36 = 4, giving a standard deviation of 2.');

  simple('normal-sampling-distribution', 'An independent random sample of size 9 is taken from a normal population with mean 27 and variance 81. What is the distribution of the sample mean?',
    ['Normal with mean 27 and variance 9', 'Normal with mean 3 and variance 9',
      'Normal with mean 27 and variance 81', 'Only approximately normal because the sample is small'],
    'A mean of independent normal observations is normal. The mean remains 27 and the variance becomes 81/9 = 9.');

  simple('central-limit-theorem', 'A population has a skewed distribution with finite variance. Independent random samples of size 120 are selected. What does the Central Limit Theorem suggest?',
    ['The distribution of the sample mean is approximately normal.',
      'The population itself becomes approximately normal.',
      'All possible sample means must equal the population mean.',
      'A single observation must have a normal distribution.'],
    'A mean of many independent observations has an approximately normal distribution under the given conditions. Individual observations still follow the population distribution.');

  simple('unbiased-variance-raw', 'The values in a random sample are 2, 4, 6 and 8. Find the unbiased estimate of the population variance.',
    ['20/3', '5', '20', '4'],
    'The sample mean is 5. The sum of squared deviations is 9 + 1 + 1 + 9 = 20. Divide by 4 − 1 for the unbiased estimate, giving 20/3.');

  simple('confidence-interval-interpretation', 'A method produces a 95% confidence interval for a fixed population mean. Which interpretation is correct?',
    ['If the sampling process were repeated many times, about 95% of intervals constructed by the method would contain the population mean.',
      'The method gives the middle 95% of individual values in the population.',
      'The population mean changes between samples and falls in the interval with probability 0.95.',
      'Every interval constructed using this method contains 95% of the sample observations.'],
    'The confidence level describes the coverage of the procedure over repeated samples. The population mean is a fixed quantity and the interval varies from sample to sample.');

  const proportionError = Math.sqrt(0.25 * 0.75 / 400);
  simple('proportion-standard-error', 'In a large random sample, 100 of 400 observations have a particular property. What is the estimated standard error used for a normal confidence interval for the population proportion?',
    probabilities(proportionError, 0.25 * 0.75 / 400, Math.sqrt(0.25 / 400), Math.sqrt(0.25 * 0.75)),
    `The observed proportion is 100/400 = 0.25. Estimate its standard error by √(0.25 × 0.75/400) = ${format(proportionError, 4)}.`);

  numeric('raw-mean-and-variance', 'The table shows five independent measurements in a random sample.',
    [part('Find the unbiased estimate of the population mean.', 14, 0, 0),
      part('Find the unbiased estimate of the population variance.', 14.5, 1, 0)],
    'The observations sum to 70, so the sample mean is 14. The squared deviations from 14 add to 58. Divide by 5 − 1 to get 14.5.',
    {
      caption: 'Five measurements',
      headers: ['Observation', '1', '2', '3', '4', '5'],
      rows: [['Value', 12, 15, 10, 13, 20]],
    });

  numeric('summary-shifted', 'For a random sample of 40 values of X, the total of (x − 30) is 64 and the total of (x − 30)² is 282.4.',
    [part('Estimate the population mean.', 31.6, 1, 0),
      part('Calculate the unbiased estimate of the population variance to 4 decimal places.', 180 / 39)],
    'The mean of the shifted values is 64/40 = 1.6. Add 30 to get 31.6. Shifting does not affect variance. The sum of squares about the sample mean is 282.4 − 64²/40 = 180. Divide by 39 for 4.6154.');

  const smallSampleMargin = 1.96 * 0.6 / Math.sqrt(9);
  numeric('known-variance-interval', 'The lifetime of a component is normally distributed with known standard deviation 0.6 years. A random sample of nine lifetimes has mean 5.42 years. Use z = 1.96 to construct a 95% confidence interval for the population mean.',
    [part('Enter the lower limit to 3 decimal places.', 5.42 - smallSampleMargin, 3),
      part('Enter the upper limit to 3 decimal places.', 5.42 + smallSampleMargin, 3)],
    'The sample mean has standard deviation 0.6/√9 = 0.2 years. The margin of error is 1.96 × 0.2 = 0.392 years. Subtract and add it to 5.42 to get 5.028 and 5.812 years.');

  const largeSampleMargin = 1.645 * Math.sqrt(40 / 81);
  numeric('large-sample-mean-interval', 'A random sample of size 81 has mean 50. The sum of squared deviations from 50 is 3200. The population variance is unknown. Use z = 1.645 to find an approximate 90% confidence interval for the population mean.',
    [part('Enter the lower limit to 3 decimal places.', 50 - largeSampleMargin, 3),
      part('Enter the upper limit to 3 decimal places.', 50 + largeSampleMargin, 3)],
    `The unbiased variance estimate is 3200/80 = 40. With the large sample, use standard error √(40/81). The interval is 50 ± 1.645√(40/81), giving (${format(50 - largeSampleMargin, 3)}, ${format(50 + largeSampleMargin, 3)}).`);

  const sampleSizeBound = (2.576 * 1.2 / 0.25) ** 2;
  challenge('minimum-size-for-precision', 'A normal population has a known standard deviation of 1.2. A 99% confidence interval for its mean must have a half-width of at most 0.25. Use the critical value z = 2.576. What is the minimum random sample size?',
    [String(Math.ceil(sampleSizeBound)), String(Math.floor(sampleSizeBound)), String(Math.ceil(sampleSizeBound / 4)), '16'],
    `The margin is 2.576 × 1.2/√n. It is at most 0.25 when n ≥ (2.576 × 1.2/0.25)² ≈ ${format(sampleSizeBound, 3)}. Round up to ${Math.ceil(sampleSizeBound)} observations.`);

  numeric('interpret-reported-limits', 'A normal population has known standard deviation σ. A random sample of 64 observations gives a 95% confidence interval of (30.53, 33.47) for the mean. Treat the limits as exact and use z = 1.96.',
    [part('Find the observed sample mean.', 32, 0, 0),
      part('Find σ.', 6, 0, 0)],
    'The sample mean is the midpoint 32. The half-width is 1.47. Since the half-width equals 1.96σ/√64, the population standard deviation is 1.47 × 8/1.96 = 6.');

  const normalSampleArea = normalLower(5 / 3) - normalLower(-4 / 3);
  numeric('normal-sample-mean-area', 'A normal population has mean 80 and standard deviation 12. The mean X̄ is calculated for a random sample of 16 independent observations.',
    [part('Find Var(X̄).', 9, 0, 0),
      part('Find P(76 < X̄ < 85) to 4 decimal places.', normalSampleArea)],
    `The sample mean is normal with mean 80 and variance 144/16 = 9. The bounds standardise to −4/3 and 5/3. The standard normal area between them is ${format(normalSampleArea, 4)}.`);

  const largeSampleTail = 1 - normalLower(0.4);
  numeric('central-limit-total', 'The mass of a single piece has a skewed distribution with mean 18 g and standard deviation 8 g. A batch contains 100 randomly chosen pieces whose masses can be treated as independent.',
    [part('Find the expected total mass of the batch in grams.', 1800, 0, 0),
      part('Approximate the probability that the total mass exceeds 1832 g, to 4 decimal places.', largeSampleTail)],
    `The total exceeds 1832 g when the sample mean exceeds 18.32 g. By the Central Limit Theorem the sample mean is approximately normal with mean 18 and standard deviation 8/√100 = 0.8. The upper-tail z-value is (18.32 − 18)/0.8 = 0.4, giving probability ${format(largeSampleTail, 4)}.`);

  const recyclingEstimate = 148 / 400;
  const recyclingMargin = 2.576 * Math.sqrt(recyclingEstimate * (1 - recyclingEstimate) / 400);
  numeric('confidence-interval-for-proportion', 'A random sample of 400 households finds that 148 use a particular recycling scheme. Construct an approximate 99% confidence interval for the population proportion using z = 2.576.',
    [part('Enter the lower limit as a proportion, to 4 decimal places.', recyclingEstimate - recyclingMargin),
      part('Enter the upper limit as a proportion, to 4 decimal places.', recyclingEstimate + recyclingMargin)],
    `The estimate is p̂ = 148/400 = 0.37. The normal margin is 2.576√(0.37 × 0.63/400) ≈ ${format(recyclingMargin, 4)}. Apply that margin on both sides of 0.37 to obtain (${format(recyclingEstimate - recyclingMargin, 4)}, ${format(recyclingEstimate + recyclingMargin, 4)}).`);

  challenge('compare-interval-widths', 'Intervals A and B were computed from the same random sample and the same known population variance. They use different confidence levels. Which has higher confidence, and by what factor must the sample size grow to halve its width at that confidence level?',
    ['B, by a factor of 4', 'A, by a factor of 4', 'B, by a factor of 2', 'A, by a factor of 2'],
    'The wider interval B has the larger normal critical value and hence the higher confidence level. For that fixed critical value and variance, width is proportional to 1/√n. Multiplying n by 4 halves the width.',
    {
      caption: 'Confidence intervals for the same population mean',
      headers: ['Interval', 'Lower limit', 'Upper limit'],
      rows: [['A', 26.4, 29.6], ['B', 25.6, 30.4]],
    });
}

{
  const { simple, challenge, numeric } = topic(5);

  simple('one-tailed-hypotheses', 'A survey claims that 40% of readers use the library each week. A researcher suspects the actual proportion p is higher. Which hypotheses should the researcher use?',
    ['H₀: p = 0.40 and H₁: p > 0.40', 'H₀: p > 0.40 and H₁: p = 0.40',
      'H₀: p = 0.40 and H₁: p < 0.40', 'H₀: p = 0.40 and H₁: p ≠ 0.40'],
    'The null model uses the claimed value. The suspected increase specifies an upper-tailed alternative for the population proportion.');

  simple('two-tailed-hypotheses', 'A process is set to produce rods with mean length 120 mm. A supervisor investigates whether the mean μ has changed in either direction. Which hypotheses are appropriate?',
    ['H₀: μ = 120 and H₁: μ ≠ 120', 'H₀: μ = 120 and H₁: μ > 120',
      'H₀: μ = 120 and H₁: μ < 120', 'H₀: μ ≠ 120 and H₁: μ = 120'],
    'The null model sets the population mean to the target. A departure in either direction counts as evidence for μ ≠ 120, so the test is two-tailed.');

  simple('identify-test-statistic', 'A binomial test of a claimed preference rate counts how many of 30 independent respondents prefer a particular design. Which is the test statistic used with the binomial model?',
    ['The observed number who prefer the design', 'The claimed preference probability',
      'The significance level chosen before the survey', 'The probability of a preference under the alternative'],
    'The test compares the observed count, a quantity computed from the data, with the distribution of that count under the null model.');

  simple('critical-region-decision', 'A researcher is testing for an increase in a count rate. The critical region is X ≥ 9. The observed count is 8. What is the appropriate conclusion?',
    ['There is insufficient evidence of an increase at the test’s significance level.',
      'There is sufficient evidence of an increase.',
      'The count rate is exactly its value in the null hypothesis.',
      'There is sufficient evidence of a decrease.'],
    'A count of 8 lies in the acceptance region, so the test fails to reject the null hypothesis. It does not establish any particular value of the count rate.');

  simple('small-p-value', 'A one-tailed test for a decrease in mean processing time gives p-value 0.032. The significance level is 5%. What conclusion follows?',
    ['There is sufficient evidence that the mean processing time decreased.',
      'There is insufficient evidence that the mean processing time decreased.',
      'There is sufficient evidence that the mean processing time increased.',
      'The probability that the null hypothesis is true is 0.032.'],
    'The p-value is below 0.05, so reject the null hypothesis in favour of the specified decrease.');

  simple('significance-level', 'A test is designed at a 5% significance level. Which probability is controlled by that significance level?',
    ['The probability of rejecting H₀ when H₀ is true', 'The probability of failing to reject H₀ when H₀ is false',
      'The probability that H₀ is true', 'The probability of failing to reject H₀ when H₀ is true'],
    'The significance level sets the allowed probability of a Type I error. For a discrete test, the actual probability can be smaller than the nominal level.');

  simple('type-one-context', 'A test uses H₀: p = 0.08 and H₁: p > 0.08 for the proportion of deliveries arriving late. Which situation is a Type I error?',
    ['Concluding that p exceeds 0.08 when p is actually 0.08.',
      'Finding insufficient evidence that p exceeds 0.08 when p does exceed 0.08.',
      'Finding insufficient evidence that p exceeds 0.08 when p equals 0.08.',
      'Concluding that p exceeds 0.08 when p really exceeds 0.08.'],
    'A Type I error is rejection of a true null hypothesis. Here the true proportion is 0.08, yet the test concludes that it is higher.');

  simple('type-two-context', 'A test looks for a decrease from the usual mean waiting time of 20 minutes. Which situation is a Type II error?',
    ['The true mean is 18 minutes, but the test finds insufficient evidence of a decrease.',
      'The true mean is 20 minutes, but the test finds evidence of a decrease.',
      'The true mean is 18 minutes and the test finds evidence of a decrease.',
      'The true mean is 20 minutes and the test finds insufficient evidence of a decrease.'],
    'A Type II error occurs when the test fails to reject a false null hypothesis. A true mean of 18 lies below the null value of 20.');

  simple('standardised-mean', 'A normally distributed measurement has known standard deviation 6. A random sample of 25 observations has mean 42.4. Under H₀: μ = 40, what is the standardised test statistic?',
    ['2.00', '0.40', '10.00', '−2.00'],
    'The sample mean has standard error 6/√25 = 1.2. Standardising the deviation from 40 gives (42.4 − 40)/1.2 = 2.');

  simple('choose-poisson-tail', 'A count X is Poisson under the null model. The alternative is that the mean has fallen. If the observed value is 3, which probability is the p-value?',
    ['P(X ≤ 3) under the null model', 'P(X ≥ 3) under the null model',
      'P(X = 3) under the null model', 'P(X ≤ 2) under the null model'],
    'A decrease corresponds to small counts. Include the observed count and all smaller values, evaluated using the null distribution.');

  const binomialUpperP = 1 - binomialLower(16, 0.25, 7);
  challenge('exact-binomial-upper-test', 'A company claims the proportion of people choosing a new display is 0.25. A random sample of 16 people contains eight who choose it. Treat choices as independent. Test whether the proportion exceeds 0.25 at the 5% level using the exact binomial distribution.',
    [`p-value ${format(binomialUpperP, 4)}, sufficient evidence of a higher proportion`,
      `p-value ${format(binomialMass(16, 0.25, 8), 4)}, sufficient evidence of a higher proportion`,
      `p-value ${format(1 - binomialUpperP, 4)}, insufficient evidence of a higher proportion`,
      `p-value ${format(binomialUpperP, 4)}, insufficient evidence of a higher proportion`],
    `Use H₀: p = 0.25 and H₁: p > 0.25. The observed value is 8. Under H₀, P(X ≥ 8) = 1 − P(X ≤ 7) = ${format(binomialUpperP, 4)}. This is below 0.05, so there is evidence that the proportion choosing the display is higher.`);

  const poissonLowerP = poissonLower(6.8, 1);
  challenge('exact-poisson-lower-test', 'The daily number of report corrections has a Poisson distribution with mean 6.8. After a change to the reporting process, a comparable day has one correction. Test for a reduction in the mean at the 1% level using an exact Poisson probability.',
    [`p-value ${format(poissonLowerP, 4)}, sufficient evidence of a reduction`,
      `p-value ${format(poissonMass(6.8, 1), 4)}, sufficient evidence of a reduction`,
      `p-value ${format(1 - poissonLowerP, 4)}, insufficient evidence of a reduction`,
      `p-value ${format(poissonLowerP, 4)}, insufficient evidence of a reduction`],
    `Use H₀: λ = 6.8 and H₁: λ < 6.8. Under H₀ the lower tail is e⁻⁶·⁸(1 + 6.8) = ${format(poissonLowerP, 4)}. It is below 0.01, so there is evidence that the mean number of daily corrections fell.`);

  const binaryLowerP = binomialLower(18, 0.5, 4);
  challenge('exact-binomial-two-tailed', 'A model claims that each of 18 independent selections has probability 0.5 of category A. Only four are category A. Test for a difference from 0.5 at the 5% level, using both equally extreme tails of the null distribution.',
    [`p-value ${format(2 * binaryLowerP, 4)}, reject H₀`, `p-value ${format(binaryLowerP, 4)}, reject H₀`,
      `p-value ${format(2 * binaryLowerP, 4)}, fail to reject H₀`, `p-value ${format(1 - 2 * binaryLowerP, 4)}, fail to reject H₀`],
    `Use H₀: p = 0.5 and H₁: p ≠ 0.5. The null distribution is symmetric about 9, with equally extreme counts at most 4 and at least 14. The two-tailed p-value is 2P(X ≤ 4) = ${format(2 * binaryLowerP, 4)}. Reject H₀ at 5%. There is evidence that the category A probability differs from 0.5.`);

  const preferenceMean = 240 * 0.42;
  const preferenceDeviation = Math.sqrt(preferenceMean * 0.58);
  const approximateBinomialP = 1 - normalLower((116.5 - preferenceMean) / preferenceDeviation);
  numeric('approximate-binomial-test', 'Of 240 independent purchases in a random sample, 117 were made online. The previous population proportion was 0.42. Test for an increase at the 5% level using a continuity-corrected normal approximation to the null binomial distribution.',
    [part('Enter the continuity-corrected start of the upper tail.', 116.5, 1, 0),
      part('Find the approximate p-value to 4 decimal places.', approximateBinomialP)],
    `Under H₀: p = 0.42 the count has mean ${format(preferenceMean, 1)} and variance ${format(preferenceDeviation ** 2, 3)}. H₁: p > 0.42 uses the upper tail. For X ≥ 117, start at 116.5. This gives upper-tail p-value ${format(approximateBinomialP, 4)}. At 5% there is evidence of an increase in the online purchase proportion.`);

  const approximatePoissonP = normalLower((48.5 - 60) / Math.sqrt(60));
  numeric('approximate-poisson-test', 'The usual daily request count at a help desk is modelled by Po(60). After a website redesign, a comparable day has 48 requests. Test for a decrease at the 5% level using a normal approximation with continuity correction.',
    [part('Enter the continuity-corrected end of the lower tail.', 48.5, 1, 0),
      part('Find the approximate p-value to 4 decimal places.', approximatePoissonP)],
    `Under H₀: λ = 60 use a normal distribution with mean and variance 60. H₁: λ < 60 uses the lower tail. X ≤ 48 corresponds to a continuous boundary of 48.5. The lower-tail p-value is ${format(approximatePoissonP, 4)}, above 0.05, so there is insufficient evidence that the daily mean request count decreased.`);

  const twoSidedMeanP = 2 * (1 - normalLower(2.25));
  numeric('normal-mean-two-tailed', 'Fill volumes are normal with known standard deviation 3.2 units. A random sample of 16 containers has mean 28.3 units. Test whether the population mean differs from 26.5 at the 5% level.',
    [part('Calculate the standardised test statistic.', 2.25, 2, 0.0005),
      part('Find the two-tailed p-value to 4 decimal places.', twoSidedMeanP)],
    `Use H₀: μ = 26.5 and H₁: μ ≠ 26.5. The standard error is 3.2/√16 = 0.8. The statistic is (28.3 − 26.5)/0.8 = 2.25. Adding the two symmetric tails gives ${format(twoSidedMeanP, 4)}. Reject H₀. There is evidence that the mean volume differs from 26.5.`);

  const largeSampleMeanP = 1 - normalLower(2);
  numeric('large-sample-mean-test', 'Sampled trip lengths have unknown population variance. A random sample of 100 lengths has mean 57.4 km and sum of squared deviations from that sample mean equal to 14 256 km². Use a large-sample test at the 5% level for an increase above a population mean of 55 km.',
    [part('Find the unbiased estimate of the population variance in km².', 144, 0, 0),
      part('Find the approximate p-value to 4 decimal places.', largeSampleMeanP)],
    `Divide 14 256 by 99 to estimate variance 144. The large-sample standard error is √(144/100) = 1.2 km. For H₀: μ = 55 against H₁: μ > 55 the statistic is (57.4 − 55)/1.2 = 2. The upper tail is ${format(largeSampleMeanP, 4)}. At 5% the sample supports an increase in the mean trip length.`);

  const binomialRejection = Array.from({ length: 13 }, (_, count) => count)
    .find(count => 1 - binomialLower(12, 0.2, count - 1) <= 0.05);
  const binomialTypeOne = 1 - binomialLower(12, 0.2, binomialRejection - 1);
  const binomialTypeTwo = binomialLower(12, 0.5, binomialRejection - 1);
  numeric('binomial-critical-and-errors', 'Twelve independently selected users each either report or do not report a navigation issue. Let X count reports. Use H₀: p = 0.20 and H₁: p > 0.20. Choose the smallest integer c for a rejection region X ≥ c at a nominal 5% significance level. Give probabilities to 4 decimal places.',
    [part('Find c.', binomialRejection, 0, 0), part('Find the actual probability of a Type I error.', binomialTypeOne),
      part('Find the probability of a Type II error when p = 0.50.', binomialTypeTwo)],
    `Under p = 0.20, P(X ≥ 5) = ${format(1 - binomialLower(12, 0.2, 4), 4)} exceeds 0.05, and P(X ≥ 6) = ${format(binomialTypeOne, 4)} is below it. Thus c = 6 and the latter tail is the actual Type I probability. Under p = 0.50, a Type II error means X ≤ 5, with probability ${format(binomialTypeTwo, 4)}.`);

  const poissonTypeOne = 1 - poissonLower(4, 7);
  const poissonTypeTwo = poissonLower(7.5, 7);
  numeric('poisson-error-probabilities', 'An editorial team models the count X of correction requests per issue by a Poisson distribution. It tests H₀: λ = 4 against H₁: λ > 4 and uses the critical region X ≥ 8. Give probabilities to 4 decimal places.',
    [part('Find the probability of a Type I error.', poissonTypeOne),
      part('Find the probability of a Type II error when λ = 7.5.', poissonTypeTwo)],
    `A Type I error is a rejection when λ = 4, so calculate 1 − P(X ≤ 7) using Po(4) to get ${format(poissonTypeOne, 4)}. A Type II error at λ = 7.5 is failing to reject, meaning X ≤ 7 under Po(7.5), with probability ${format(poissonTypeTwo, 4)}.`);

  const criticalMean = Math.floor(35 - 1.96 * 0.8);
  const normalTypeOne = normalLower((criticalMean - 35) / 0.8);
  const normalTypeTwo = 1 - normalLower((criticalMean - 33.5) / 0.8);
  numeric('normal-critical-and-type-two', 'Individual waiting times are modelled as normal with known standard deviation 4 minutes. A random sample of 25 times is used to test H₀: μ = 35 against H₁: μ < 35. The rule rejects H₀ when the sample mean is below c, where c is a whole number of minutes. The Type I error probability must be at most 0.025. Use the lower-tail standard normal critical value −1.96. The standard deviation stays at 4 if the mean changes.',
    [part('Find the largest permissible value of c.', criticalMean, 0, 0),
      part('Find the actual Type I error probability to 4 decimal places.', normalTypeOne),
      part('Find the Type II error probability when μ = 33.5, to 4 decimal places.', normalTypeTwo)],
    `The standard error is 4/√25 = 0.8. The unrounded cutoff is 35 − 1.96 × 0.8 = 33.432. Use the largest whole number below this, c = 33. Under μ = 35 the standardised boundary is −2.5, yielding lower-tail probability ${format(normalTypeOne, 4)}. Under μ = 33.5 a Type II error occurs at or above 33. The standardised boundary is −0.625, yielding upper-tail probability ${format(normalTypeTwo, 4)}.`,
    {
      caption: 'Schematic lower-tail rejection region under H₀',
      alt: 'A bell curve for the sample mean is centred at 35. The rejection region to the left of an unknown cutoff c is shaded.',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" aria-hidden="true" focusable="false">
        <rect width="440" height="220" rx="10" fill="#fff"/>
        <path d="M33 169C71 169 98 165 126 145V169Z" fill="#ddd3fc"/>
        <path d="M33 169C71 169 98 165 126 145C166 116 174 46 220 46C266 46 274 116 314 145C342 165 369 169 407 169" fill="none" stroke="#5940b6" stroke-width="3"/>
        <path d="M24 169H415" fill="none" stroke="#49425b" stroke-width="1.5"/>
        <path d="M126 145V178M220 46V178" fill="none" stroke="#49425b" stroke-width="1.5" stroke-dasharray="5 5"/>
        <g fill="#282039" font-family="system-ui, sans-serif" font-size="17">
          <text x="126" y="198" text-anchor="middle">c</text><text x="220" y="198" text-anchor="middle">35</text>
          <text x="415" y="198" text-anchor="end">Sample mean</text>
        </g>
      </svg>`,
    });
}

export const mathematicsPaper6 = items;
