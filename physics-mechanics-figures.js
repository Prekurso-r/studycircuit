const ink = '#322c40';
const accent = '#5532a8';
const line = '#706681';
const width = 408;

function diagram(caption, alt, height, drawing) {
  return {
    caption,
    alt,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" aria-hidden="true" focusable="false" fill="none" stroke="${ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${drawing}</svg>`,
  };
}

function label(x, y, value, { anchor = 'start', color = ink, weight = 600 } = {}) {
  return `<text x="${x}" y="${y}" fill="${color}" stroke="none" font-family="Inter, system-ui, sans-serif" font-size="17" font-weight="${weight}" text-anchor="${anchor}">${value}</text>`;
}

function arrow(x1, y1, x2, y2, color = accent) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headX = x2 - 8 * Math.cos(angle);
  const headY = y2 - 8 * Math.sin(angle);
  const wingX = 4 * Math.sin(angle);
  const wingY = 4 * Math.cos(angle);
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="2.4"/>
    <path d="M${x2} ${y2}L${headX - wingX} ${headY + wingY}L${headX + wingX} ${headY - wingY}Z" fill="${color}" stroke="none"/>`;
}

function validateMeasurements(values) {
  for (const [name, value] of Object.entries(values)) {
    if (!Number.isFinite(value)) throw new TypeError(`${name} must be a finite number`);
  }
}

function measurement(value) {
  return Number(value.toPrecision(10)).toString().replaceAll('-', '−');
}

export function beamFigure({ span, loadPosition, beamWeight, loadWeight, angle }) {
  validateMeasurements({ span, loadPosition, beamWeight, loadWeight, angle });
  if (span <= 0 || loadPosition < 0 || loadPosition > span || angle <= 0 || angle >= 90) {
    throw new RangeError('Beam dimensions or cable angle are out of range');
  }

  const pin = 42;
  const end = 365;
  const height = 125;
  const centre = (pin + end) / 2;
  const loadX = pin + (end - pin) * loadPosition / span;
  const theta = angle * Math.PI / 180;
  const cableLength = Math.min(205, 87 / Math.sin(theta));
  const cableX = end - cableLength * Math.cos(theta);
  const cableY = height - cableLength * Math.sin(theta);
  const arcRadius = 32;
  const arcX = end - arcRadius * Math.cos(theta);
  const arcY = height - arcRadius * Math.sin(theta);

  const forces = [
    { x: centre, name: 'Beam weight', reading: beamWeight, position: span / 2 },
    { x: loadX, name: 'Load', reading: loadWeight, position: loadPosition },
  ].sort((first, second) => first.x - second.x);
  const coincident = Math.abs(forces[0].x - forces[1].x) < 12;
  const forceLabels = forces.map((force, index) => {
    const labelX = index === 0 ? 110 : 297;
    const arrowX = coincident ? force.x + (index === 0 ? -6 : 6) : force.x;
    return `${arrow(arrowX, 128, arrowX, 163)}
      <path d="M${arrowX} 168L${labelX} 180" stroke="${line}" stroke-dasharray="3 4"/>
      ${label(labelX, 201, force.name, { anchor: 'middle' })}
      ${label(labelX, 221, `${measurement(force.reading)} N at ${measurement(force.position)} m`, { anchor: 'middle', color: accent })}`;
  }).join('');

  return diagram(
    'Horizontal beam, pin and supporting cable',
    `A uniform ${measurement(span)} metre beam is pinned at its left end. Its weight of ${measurement(beamWeight)} newtons acts downwards at its midpoint, ${measurement(span / 2)} metres from the pin. A ${measurement(loadWeight)} newton load acts downwards ${measurement(loadPosition)} metres from the pin. A cable pulls up and to the left at the right end of the beam, making an angle of ${measurement(angle)} degrees with the beam.`,
    284,
    `${label(42, 26, `Cable at ${measurement(angle)}° to beam`, { color: accent })}
      <path d="M24 90V159M13 101l11 -7m-11 22l11 -7m-11 22l11 -7m-11 22l11 -7m-11 22l11 -7" stroke="${line}"/>
      <path d="M24 138H54L42 125Z" fill="#ede8f7"/>
      <rect x="${pin}" y="120" width="${end - pin}" height="10" rx="2" fill="#ece8f4"/>
      <circle cx="${pin}" cy="${height}" r="5" fill="#faf9fd"/>
      <circle cx="${end}" cy="${height}" r="4" fill="${accent}" stroke="none"/>
      ${label(32, 108, 'Pin')}
      ${arrow(end, height, cableX, cableY)}
      <path d="M${end - arcRadius} ${height}A${arcRadius} ${arcRadius} 0 0 1 ${arcX} ${arcY}" stroke="${accent}"/>
      ${forceLabels}
      <path d="M${pin} 245H${end}M${pin} 239V251M${end} 239V251" stroke="${line}"/>
      ${label(centre, 274, `Span ${measurement(span)} m`, { anchor: 'middle' })}`,
  );
}

export function pulleyFigure({ cartMass, hangingMass, friction }) {
  validateMeasurements({ cartMass, hangingMass, friction });

  return diagram(
    'Cart and hanging mass connected over a pulley',
    `A ${measurement(cartMass)} kilogram cart is on a level table. A string runs from the cart to the right, over a pulley, and down to a ${measurement(hangingMass)} kilogram hanging mass. A friction force of ${measurement(friction)} newtons acts leftwards on the cart, away from the pulley.`,
    235,
    `<path d="M26 137H328V151H26Z" fill="#ede9f5"/>
      <path d="M36 151V207M315 151V207" stroke="${line}"/>
      <path d="M326 137l12 -33 8 33Z" fill="#ece8f4"/>
      <rect x="90" y="76" width="139" height="47" rx="7" fill="#efe9fb"/>
      <circle cx="113" cy="129" r="8" fill="#faf9fd"/>
      <circle cx="207" cy="129" r="8" fill="#faf9fd"/>
      <circle cx="337" cy="102" r="17" fill="#f7f4fd"/>
      <circle cx="337" cy="102" r="4" fill="${ink}"/>
      <path d="M229 85H337A17 17 0 0 1 354 102V179" stroke="${accent}" stroke-width="2.4"/>
      <rect x="313" y="179" width="82" height="42" rx="5" fill="#efe9fb"/>
      ${arrow(89, 100, 28, 100)}
      ${label(28, 62, `Friction ${measurement(friction)} N`, { color: accent })}
      ${label(159, 106, `Cart · ${measurement(cartMass)} kg`, { anchor: 'middle' })}
      ${label(354, 206, `${measurement(hangingMass)} kg`, { anchor: 'middle' })}
      ${label(303, 206, 'Hanging mass', { anchor: 'end' })}`,
  );
}

export function loopFigure({ radius, mass, topSpeed }) {
  validateMeasurements({ radius, mass, topSpeed });

  return diagram(
    'Mass travelling around the inside of a vertical loop',
    `A ${measurement(mass)} kilogram mass travels clockwise around a vertical circular track of radius ${measurement(radius)} metres. Its speed at the top is ${measurement(topSpeed)} metres per second, directed to the right. The top, right-hand side and bottom of the track are marked.`,
    267,
    `<circle cx="196" cy="136" r="96" stroke="${line}" stroke-width="1.4"/>
      <circle cx="196" cy="136" r="90" stroke="${ink}" stroke-width="2.3"/>
      <path d="M196 136H286" stroke="${line}" stroke-dasharray="4 4"/>
      <circle cx="196" cy="136" r="3" fill="${line}" stroke="none"/>
      <circle cx="196" cy="46" r="7" fill="${accent}" stroke="#faf9fd"/>
      <circle cx="286" cy="136" r="5" fill="#faf9fd"/>
      <circle cx="196" cy="226" r="5" fill="#faf9fd"/>
      ${arrow(204, 46, 288, 46)}
      ${label(196, 27, 'Top', { anchor: 'middle' })}
      ${label(297, 52, `${measurement(topSpeed)} m s⁻¹`, { color: accent })}
      ${label(196, 80, `${measurement(mass)} kg`, { anchor: 'middle' })}
      ${label(240, 126, `${measurement(radius)} m`, { anchor: 'middle' })}
      ${label(306, 142, 'Side')}
      ${label(196, 258, 'Bottom', { anchor: 'middle' })}`,
  );
}
