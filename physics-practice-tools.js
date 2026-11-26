function rounded(value) {
  return Number(value.toPrecision(4));
}

// Very large and very small numbers are written in scientific notation, as 2.14 × 10³⁰ and never as 2.141e+30. The switch
// points match the "Expected" line in app.js (a million and above, below a thousandth).
const SUPERSCRIPT_DIGITS = '⁰¹²³⁴⁵⁶⁷⁸⁹';

function needsScientific(value) {
  const size = Math.abs(value);
  return size !== 0 && (size >= 1e6 || size < 1e-3);
}

function scientific(value) {
  const [mantissa, exponent] = rounded(value).toExponential().split('e');
  const power = Number(exponent);
  const digits = String(Math.abs(power)).replace(/\d/g, digit => SUPERSCRIPT_DIGITS[digit]);
  return `${mantissa} × 10${power < 0 ? '⁻' : ''}${digits}`.replace(/^-/, '−');
}

function display(value, integer = false, useScientific = needsScientific(value)) {
  if (useScientific && value !== 0) return scientific(value);
  return String(integer ? value : rounded(value)).replace(/^-/, '−');
}

export function calc(label, unit, value, working) {
  return { label, unit, value, working, exact: false };
}

export function exact(label, unit, value, working) {
  return { ...calc(label, unit, value, working), exact: true };
}

export function drill(key, cases, solve, bank) {
  return { key, cases, solve, bank };
}

export function scenario(prompt, simple, first, second, figure) {
  return { prompt, simple, parts: [first, second], figure };
}

// A count of exactly one takes the singular of the unit: "1 neutron", not "1 neutrons".
const SINGULAR_UNITS = { neutrons: 'neutron', protons: 'proton', nucleons: 'nucleon', quarks: 'quark', photons: 'photon', electrons: 'electron' };
function withUnit(shown, unit) {
  if (!unit) return shown;
  return `${shown} ${shown === '1' && SINGULAR_UNITS[unit] ? SINGULAR_UNITS[unit] : unit}`;
}

// The three wrong choices for a check. A check's answer and its choices are always written in one style, so a question never
// mixes 0.000002592 with 1.296 × 10⁻⁷.
function alternativesOf({ value, exact: integer }) {
  return integer || value === 0
    ? [value + 1, value - 1, value + 2]
    : [value * 0.5, value * 2, value * 0.1];
}

function scientificFor(check) {
  return [check.value, ...alternativesOf(check)].some(needsScientific);
}

function explanation(checks) {
  return checks.map(check =>
    `${check.working} The result is ${withUnit(display(check.value, check.exact, scientificFor(check)), check.unit)}.`
  ).join(' ');
}

function choicesFor(check, position) {
  const { value, unit, exact: integer } = check;
  const alternatives = alternativesOf(check);
  alternatives.splice(position, 0, value);
  const useScientific = scientificFor(check);
  return alternatives.map(n => withUnit(display(n, integer, useScientific), unit));
}

function numericPart({ label, unit, value, exact: integer }) {
  return {
    label,
    unit,
    answer: integer ? value : rounded(value),
    tolerance: integer ? 0 : Math.abs(value) * 0.008,
  };
}

export function practice(bank, concepts, drills) {
  const prefix = 'physics-' + bank;
  const items = concepts.map(([key, prompt, options, answer, explanation]) => ({
    id: `${prefix}-practice-${key}`,
    bank: prefix,
    level: 'simple',
    prompt, options, answer, explanation,
  }));

  for (const [drillIndex, family] of drills.entries()) {
    for (const [caseIndex, row] of family.cases.entries()) {
      const { prompt, simple, parts, figure } = family.solve(...row);
      const id = `${prefix}-practice-${family.key}-${caseIndex + 1}`;
      const shared = { bank: 'physics-' + (family.bank ?? bank), ...(figure && { figure }) };
      const answer = (drillIndex + caseIndex) % 4;
      items.push({
        ...shared,
        id: id + '-simple',
        level: 'simple',
        prompt: prompt + ' ' + simple.label,
        options: choicesFor(simple, answer),
        answer,
        explanation: explanation([simple]),
      }, {
        ...shared,
        id: id + '-challenge',
        level: 'challenge',
        prompt,
        parts: parts.map(numericPart),
        explanation: explanation(parts),
      });
    }
  }
  return items;
}

function svgText(x, y, value, attributes = '') {
  return `<text x="${x}" y="${y}" ${attributes}>${value}</text>`;
}

export function plotFigure({ caption, alt, xLabel, yLabel, xTicks, yTicks, traces }) {
  const xMin = xTicks[0];
  const xMax = xTicks.at(-1);
  const yMin = yTicks[0];
  const yMax = yTicks.at(-1);
  const left = 90;
  const right = 528;
  const top = 36;
  const bottom = 195;
  const xAt = x => left + (x - xMin) / (xMax - xMin) * (right - left);
  const yAt = y => bottom - (y - yMin) / (yMax - yMin) * (bottom - top);
  const yGrid = yTicks.map(y => {
    const at = yAt(y);
    return `<path d="M${left} ${at}H${right}"/>`;
  }).join('');
  const xGrid = xTicks.map(x => {
    const at = xAt(x);
    return `<path d="M${at} ${top}V${bottom}"/>`;
  }).join('');
  let tickRow = 0;
  const xLabels = xTicks.map((x, index) => {
    const at = xAt(x);
    const closeToPrevious = index > 0 && at - xAt(xTicks[index - 1]) < 54;
    tickRow = closeToPrevious ? 1 - tickRow : 0;
    return svgText(at, bottom + 23 + 20 * tickRow, display(x), 'text-anchor="middle"');
  });
  const labels = [
    ...xLabels,
    ...yTicks.map(y => svgText(left - 9, yAt(y) + 6, display(y), 'text-anchor="end"')),
    svgText(left, 24, yLabel),
    svgText(right, bottom + 65, xLabel, 'text-anchor="end"'),
  ].join('');
  const colors = ['#5940b6', '#15716f'];
  const lines = traces.map(({ points, markers = true }, index) => {
    const stroke = colors[index];
    const path = points.map(([x, y]) => `${xAt(x)},${yAt(y)}`).join(' ');
    const dots = markers
      ? points.map(([x, y]) => `<circle cx="${xAt(x)}" cy="${yAt(y)}" r="4.5" fill="${stroke}"/>`).join('')
      : '';
    return `<polyline points="${path}" fill="none" stroke="${stroke}" stroke-width="3.5" stroke-linejoin="round"${index ? ' stroke-dasharray="8 5"' : ''}/>${dots}`;
  }).join('');
  const zeroLine = yMin < 0 && yMax > 0 ? `<path d="M${left} ${yAt(0)}H${right}"/>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 270" aria-hidden="true" focusable="false">
    <rect width="560" height="270" rx="12" fill="#fff"/>
    <g fill="none" stroke="#d8d3e5">${yGrid}${xGrid}</g>
    <g fill="none" stroke="#49425b" stroke-width="1.5"><path d="M${left} ${top}V${bottom}H${right}"/>${zeroLine}</g>
    ${lines}
    <g fill="#282039" font-family="system-ui, sans-serif" font-size="19">${labels}</g>
  </svg>`;
  return { caption, alt, svg };
}
