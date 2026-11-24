// Turns plain question text into safe HTML with real superscripts/subscripts and marked-up maths.
//
// The question bank writes exponents and subscripts as Unicode characters (m s⁻², CO₃²⁻).
// Most of those characters are missing from the app's two fonts, so browsers draw them in a
// fallback font and they sit unevenly. Converting them to <sup>/<sub> keeps them in the
// app's own type. Runs of maths (formulas, quantities with units, chemical formulas) are
// wrapped in <span class="math"> so headings can set them in a quieter weight.

const superscripts = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁺': '+', '⁻': '−', '⁼': '=', '⁽': '(', '⁾': ')', 'ⁿ': 'n', 'ᴬ': 'A', 'ᴮ': 'B', 'ᐟ': '/', 'ᵞ': 'γ',
};
const subscripts = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  '₊': '+', '₋': '−', 'ₙ': 'n', 'ᵣ': 'r', 'ₐ': 'a', 'ₘ': 'm', 'ₛ': 's', 'ₓ': 'x', 'ₑ': 'e', 'ₚ': 'p', 'ₒ': 'o',
  'ᵧ': 'γ', 'ᵦ': 'β',
};
const supRun = new RegExp(`[${Object.keys(superscripts).join('')}]+`, 'g');
const subRun = new RegExp(`[${Object.keys(subscripts).join('')}]+`, 'g');
const scriptChar = new RegExp(`[${Object.keys(superscripts).join('')}${Object.keys(subscripts).join('')}]`);

const operator = /^[+\-−×÷=≈≤≥<>→⇌±·/≡≠∝√∛]$/;
const proseRun = /[A-Za-z]{4,}/;
const units = new Set(('m s ms kg g mg µg μg N kN J kJ MJ mJ W kW MW mW V kV mV A mA µA μA C nC µC μC K Pa kPa MPa GPa Hz kHz MHz '
  + 'mol dm cm mm km nm µm μm pm eV keV MeV GeV T mT F µF μF nF pF Ω kΩ MΩ h min rad sr L ml mL cd Bq Gy Sv u °C ° °F').split(' '));
const sentenceEnd = /[.?!;:]["'”’)]*$/;
const functions = new Set('sin cos tan sec cosec cot ln log exp arcsin arccos arctan sinh cosh tanh lim max min'.split(' '));
const greekOrSymbol = /^[α-ωΑ-Ωπθλμµσρτφχψωε∞]$/;

function escape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function scripts(html) {
  return html
    // Caret powers written in the bank as 5^(x + 1) or e^2x.
    .replace(/\^\(([^()]{1,24})\)/g, '<sup>$1</sup>')
    .replace(/\^([−\-]?[\w.]{1,6})/g, '<sup>$1</sup>')
    .replace(supRun, run => `<sup>${[...run].map(ch => superscripts[ch]).join('')}</sup>`)
    .replace(subRun, run => `<sub>${[...run].map(ch => subscripts[ch]).join('')}</sub>`);
}

// Long formulas may wrap between terms, never inside a bracket: "A/(x − 1)" stays on one line.
function keepBracketsTogether(text) {
  let depth = 0;
  return [...text].map(ch => {
    if ('([{'.includes(ch)) depth += 1;
    if (')]}'.includes(ch)) depth = Math.max(0, depth - 1);
    return ch === ' ' && depth > 0 ? ' ' : ch;
  }).join('');
}

function core(token) {
  return token.replace(/^["'“‘]+|[.,;:?!"'”’]+$/g, '');
}

function hasDigit(token) {
  return /[0-9½⅓⅔¼¾]/.test(token);
}

// 'math' = definitely maths, 'op' = an operator on its own, 'weak' = maths only next to an operator, '' = prose.
function classify(token, previousToken, previousKind) {
  const text = core(token);
  if (!text) return '';
  const startsSentence = previousToken === undefined || sentenceEnd.test(previousToken);
  if (operator.test(text)) return 'op';
  if (scriptChar.test(text)) return proseRun.test(text.replace(scriptChar, '')) && !/[A-Z]/.test(text) ? '' : 'math';
  if (hasDigit(text)) return proseRun.test(text) ? '' : 'math';
  if (!startsSentence && previousKind === 'math' && hasDigit(previousToken) && units.has(text)) return 'math';
  if (/[()[\]/=^√]/.test(text) && !proseRun.test(text)) return 'math';
  if (greekOrSymbol.test(text) || functions.has(text)) return 'math';
  if (/^[b-zB-HJ-Z]$/.test(text)) return 'math';
  // "A" is a label (point A, star A) except as the article starting a sentence.
  if (text === 'A') return startsSentence ? 'weak' : 'math';
  if (/^[aI]$/.test(text)) return 'weak';
  return '';
}

export function richText(value) {
  const source = String(value ?? '');
  if (!source) return '';
  const tokens = source.split(' ');
  const kinds = [];
  tokens.forEach((token, index) => kinds.push(classify(token, tokens[index - 1], kinds[index - 1])));
  // A lone capital or 'a' counts as maths only beside an operator: "A = 2" but not "A 3.4 kg box".
  kinds.forEach((kind, index) => {
    if (kind === 'weak') kinds[index] = kinds[index - 1] === 'op' || kinds[index + 1] === 'op' ? 'math' : '';
  });

  const out = [];
  for (let index = 0; index < tokens.length;) {
    if (!kinds[index]) {
      out.push(scripts(escape(tokens[index])));
      index += 1;
      continue;
    }
    // A run of maths never crosses the end of a sentence.
    let end = index;
    while (end + 1 < tokens.length && kinds[end + 1] && !sentenceEnd.test(tokens[end])) end += 1;
    const run = tokens.slice(index, end + 1);
    if (!run.some((_, offset) => kinds[index + offset] === 'math')) {
      out.push(...run.map(token => scripts(escape(token))));
    } else {
      const joined = run.join(' ');
      // Sentence punctuation after the maths stays outside it ("… = 5." / "…, B, C)?").
      const tail = joined.match(/[.,;:?!]+$/)?.[0] ?? '';
      const text = joined.slice(0, joined.length - tail.length);
      const wrap = text.length <= 14 ? 'math nowrap' : 'math';
      out.push(`<span class="${wrap}">${scripts(escape(keepBracketsTogether(text)))}</span>${escape(tail)}`);
    }
    index = end + 1;
  }
  return out.join(' ');
}
