const ink = '#322842';
const violet = '#4828a4';
const paper = '#faf9fd';

function label(x, y, value, { anchor = 'middle', accent = false } = {}) {
  const text = String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${accent ? violet : ink}" stroke="none">${text}</text>`;
}

function circuit(caption, alt, height, drawing) {
  return {
    caption,
    alt,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 360 ${height}" fill="none" color="${ink}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" font-family="Inter, system-ui, sans-serif" font-size="17" font-weight="600">${drawing}</svg>`,
  };
}

function dividerSupply(supply, top) {
  return `<path d="M62 103V42H175V59M175 95v40M175 173v25H62v-79"/>
    <path d="M43 103h38m-31 16h24" stroke-width="3.5"/>
    <rect x="164" y="59" width="22" height="36" rx="1"/>
    ${label(62, 27, `${supply} V`, { accent: true })}
    ${label(196, 83, `${top} kΩ`, { anchor: 'start' })}`;
}

function dividerJunctions() {
  return '<circle cx="175" cy="112" r="4" fill="currentColor" stroke="none"/><circle cx="175" cy="198" r="4" fill="currentColor" stroke="none"/>';
}

export function dividerFigure({ supply, top, bottom, meter }) {
  return circuit(
    'Loaded potential divider',
    `A ${supply} V ideal DC supply is connected across a ${top} kΩ upper resistor and a ${bottom} kΩ lower resistor. A voltmeter with internal resistance ${meter} kΩ is in parallel with the lower resistor, between the junction and the negative supply terminal.`,
    234,
    `${dividerSupply(supply, top)}
    <rect x="164" y="135" width="22" height="38" rx="1"/>
    ${label(196, 160, `${bottom} kΩ`, { anchor: 'start' })}
    <g stroke="${violet}">
      <path d="M175 112h129v24m0 38v24H175"/>
      <circle cx="304" cy="155" r="19"/>
    </g>
    ${label(304, 161, 'V', { accent: true })}
    ${label(304, 223, `${meter} kΩ`, { accent: true })}
    ${dividerJunctions()}`,
  );
}

export function capacitorFigure({ supply, first, second }) {
  return circuit(
    'Two capacitors in series',
    `A ${supply} V ideal DC supply is connected across two capacitors in series. The ${first} µF capacitor C₁ is nearest the positive terminal, and the ${second} µF capacitor C₂ is nearest the negative terminal.`,
    210,
    `<path d="M58 111V69h76m16 0h80m16 0h58v105H58v-47"/>
    <path d="M38 111h40m-31 16h22" stroke-width="3.5"/>
    <path d="M134 52v34m16-34v34m80-34v34m16-34v34" stroke="${violet}" stroke-width="3.5"/>
    ${label(142, 35, 'C₁', { accent: true })}
    ${label(238, 35, 'C₂', { accent: true })}
    ${label(142, 112, `${first} µF`)}
    ${label(238, 112, `${second} µF`)}
    ${label(58, 197, `${supply} V`, { accent: true })}`,
  );
}

export function transformerFigure({ input, primary, secondary, load }) {
  return circuit(
    'Ideal transformer with a resistive load',
    `The ${primary}-turn primary winding is connected to a ${input} V r.m.s. AC source. The separate ${secondary}-turn secondary winding is connected across a ${load} Ω load. The windings share a magnetic core.`,
    220,
    `<path d="M56 91V65h80m0 100H56v-28"/>
    <circle cx="56" cy="114" r="23"/>
    <path d="M41 114q7-14 15 0t15 0" stroke="${violet}"/>
    <path d="M136 65q43 12.5 0 25q43 12.5 0 25q43 12.5 0 25q43 12.5 0 25"/>
    <path d="M178 54h10v121h-10Z" fill="#e9e1f8" stroke-width="2"/>
    <path d="M231 65q-43 12.5 0 25q-43 12.5 0 25q-43 12.5 0 25q-43 12.5 0 25"/>
    <path d="M231 65h75v32m0 36v32h-75"/>
    <rect x="295" y="97" width="22" height="36" rx="1"/>
    ${label(58, 29, `${input} V r.m.s.`, { accent: true })}
    ${label(306, 29, `${load} Ω`, { accent: true })}
    ${label(119, 193, `${primary} turns`)}
    ${label(246, 193, `${secondary} turns`)}`,
  );
}

export function sensorFigure({ supply, fixed, sensor, name }) {
  const ldr = name === 'LDR';
  const symbol = ldr
    ? `<circle cx="175" cy="154" r="26"/>
      <path d="m121 134 22 12m-8-2 8 2-4-7m-19 17 23 12m-8-2 8 2-4-7" stroke="${violet}"/>`
    : '<path d="M148 176h10l34-47"/>';

  return circuit(
    'Resistive sensor potential divider',
    `A ${supply} V ideal DC supply is connected across a ${fixed} kΩ fixed upper resistor and a lower ${name} of resistance ${sensor} kΩ. The output voltage is measured across the sensor with the positive output at the junction and the negative output at the negative supply terminal.`,
    225,
    `${dividerSupply(supply, fixed)}
    <rect x="164" y="135" width="22" height="38" rx="1"/>
    ${symbol}
    ${label(209, 149, name, { anchor: 'start' })}
    ${label(209, 171, `${sensor} kΩ`, { anchor: 'start' })}
    <g stroke="${violet}">
      <path d="M175 112h133m-133 86h133"/>
      <circle cx="312" cy="112" r="4" fill="${paper}"/>
      <circle cx="312" cy="198" r="4" fill="${paper}"/>
    </g>
    ${label(332, 118, '+', { accent: true })}
    ${label(324, 161, 'Vₒᵤₜ', { accent: true })}
    ${label(332, 204, '−', { accent: true })}
    ${dividerJunctions()}`,
  );
}
