const ink = '#282038';
const muted = '#635d74';
const accent = '#5b36bd';
const guide = '#a89bbb';
const tint = '#efe9fa';

function escapeLabel(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function diagram(caption, alt, height, content) {
  return {
    caption,
    alt,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 ${height}" width="420" height="${height}" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" font-family="Inter, system-ui, sans-serif" font-size="16">${content}</svg>`,
  };
}

export function interferenceFigure({ separation, distance, spacing }) {
  return diagram(
    'Young’s double-slit arrangement and the three central bright fringes. The diagram is schematic.',
    `Incident light passes through two slits ${separation} mm apart. The screen is ${distance} m from the slit plate. The central bright fringe is on the axis. Its nearest bright neighbours are each ${spacing} mm away.`,
    280,
    `<path d="M110 43V83m0 12v47m0 12v37M305 43V191" stroke="${ink}" stroke-width="4"/>
    <path d="M19 76v84m14-84v84m14-84v84m14-84v84" stroke="${guide}" stroke-width="1.5"/>
    <path d="M113 119H301" stroke="${guide}" stroke-dasharray="4 4"/>
    <path d="M110 89L305 68M110 148L305 68M110 89L305 170M110 148L305 170" stroke="${guide}" stroke-width="1.5" stroke-dasharray="5 4"/>
    <path d="M110 89L305 119 110 148" stroke="${accent}" stroke-width="2"/>
    <g fill="${accent}">
      <circle cx="305" cy="68" r="4.5"/><circle cx="305" cy="119" r="5.5"/><circle cx="305" cy="170" r="4.5"/>
    </g>
    <path d="M92 89v59m-4-59h8m-8 59h8M383 119v51m-4-51h8m-8 51h8M110 197v20m195-20v20M110 207H305m-195 0 7-4m-7 4 7 4m188-4-7-4m7 4-7 4" stroke="${muted}" stroke-width="1.5"/>
    <g fill="${ink}" font-weight="650">
      <text x="110" y="28" text-anchor="middle">Slit plate</text>
      <text x="305" y="28" text-anchor="middle">Screen</text>
      <text x="317" y="124">Central</text>
    </g>
    <g fill="${muted}" font-size="15">
      <text x="8" y="185">Incident light</text>
      <text x="317" y="73">Bright</text><text x="317" y="175">Bright</text>
      <text x="80" y="124" text-anchor="middle">d</text>
      <text x="401" y="149" text-anchor="middle">Δy</text>
      <text x="207" y="231" text-anchor="middle">L</text>
    </g>
    <g fill="${tint}">
      <rect x="8" y="242" width="128" height="32" rx="7"/>
      <rect x="146" y="242" width="128" height="32" rx="7"/>
      <rect x="284" y="242" width="128" height="32" rx="7"/>
    </g>
    <g fill="${ink}" font-weight="650" text-anchor="middle">
      <text x="72" y="264">d = ${escapeLabel(separation)} mm</text>
      <text x="210" y="264">L = ${escapeLabel(distance)} m</text>
      <text x="348" y="264">Δy = ${escapeLabel(spacing)} mm</text>
    </g>`,
  );
}

export function echoFigure({ speed, front, rear }) {
  return diagram(
    'Pulse paths and the arrival times of two echoes from a tissue layer. Signal amplitudes are schematic.',
    `An ultrasound probe sends a pulse towards a tissue layer with a sound speed of ${speed} metres per second. The echo from the front face is received at ${front} microseconds after transmission and the echo from the rear face is received at ${rear} microseconds.`,
    326,
    `<rect x="178" y="43" width="145" height="67" fill="${tint}"/>
    <path d="M178 42v69m145-69v69" stroke="${ink}" stroke-width="2.5"/>
    <rect x="38" y="44" width="28" height="64" rx="5" fill="#ded4f0" stroke="${ink}" stroke-width="2"/>
    <path d="M38 63H25v24h13" stroke="${ink}" stroke-width="2"/>
    <path d="M73 55h241m-7-4 7 4-7 4" stroke="${ink}" stroke-width="2"/>
    <path d="M173 77H73m7-4-7 4 7 4M318 98H73m7-4-7 4 7 4" stroke="${accent}" stroke-width="2.5"/>
    <g fill="${ink}" font-weight="650" text-anchor="middle">
      <text x="50" y="29">Probe</text><text x="178" y="29">Front face</text><text x="323" y="29">Rear face</text>
      <text x="250" y="133">Sound speed: ${escapeLabel(speed)} m s⁻¹</text>
    </g>
    <path d="M17 151h386" stroke="#dcd5e6"/>
    <text x="39" y="175" fill="${muted}">Received signal</text>
    <path d="M39 187v82h362m-4-4 4 4-4 4" stroke="${muted}" stroke-width="1.6"/>
    <path d="M145 215v54m151-44v44" stroke="${guide}" stroke-dasharray="3 4"/>
    <path d="M40 259h76l8-4 7 7 7-16 7-30 7 42 7-12 7 14 7-1h100l7-3 7 4 9-35 8 35 7-8 7 8 8-1h65" stroke="${accent}" stroke-width="2.6"/>
    <path d="M145 269v8m151-8v8" stroke="${muted}" stroke-width="1.6"/>
    <g fill="${ink}" font-weight="650" text-anchor="middle">
      <text x="145" y="201">Front echo</text><text x="296" y="211">Rear echo</text>
      <text x="145" y="298">${escapeLabel(front)} µs</text><text x="296" y="298">${escapeLabel(rear)} µs</text>
    </g>
    <text x="220" y="319" fill="${muted}" text-anchor="middle">Time after transmission</text>`,
  );
}

export function parallaxFigure({ baseline, angle }) {
  return diagram(
    'Stellar parallax from opposite points in Earth’s orbit. The angle is exaggerated.',
    `The Sun is midway between Earth’s observing positions A and B, ${baseline} astronomical units apart. The direction from the Sun to the star bisects the angle between the two sightlines. The parallax angle p, between that centreline and one sightline, is ${angle} arcseconds.`,
    299,
    `<ellipse cx="210" cy="188" rx="144" ry="26" stroke="${guide}" stroke-dasharray="4 5"/>
    <path d="M210 42 66 188M210 42l144 146" stroke="${accent}" stroke-width="2.5"/>
    <path d="M210 42v146" stroke="${muted}" stroke-width="1.5" stroke-dasharray="4 5"/>
    <path d="M172 81A54 54 0 0 0 210 96" stroke="${ink}" stroke-width="2"/>
    <path d="M210 34l2.2 5.8 6.2.2-4.9 3.8 1.7 5.9-5.2-3.4-5.2 3.4 1.7-5.9-4.9-3.8 6.2-.2Z" fill="${ink}"/>
    <circle cx="66" cy="188" r="6" fill="${accent}"/><circle cx="354" cy="188" r="6" fill="${accent}"/>
    <circle cx="210" cy="188" r="9" fill="#f2bd65" stroke="#855520" stroke-width="2"/>
    <g fill="${ink}" font-weight="650" text-anchor="middle">
      <text x="210" y="24">Nearby star</text>
      <text x="190" y="115">p</text>
      <text x="66" y="224">Earth at A</text>
      <text x="210" y="224">Sun</text>
      <text x="354" y="224">Earth at B</text>
    </g>
    <path d="M66 234v17m288-17v17M66 243h288m-288 0 7-4m-7 4 7 4m281-4-7-4m7 4-7 4" stroke="${muted}" stroke-width="1.5"/>
    <g fill="${tint}">
      <rect x="8" y="258" width="196" height="34" rx="7"/><rect x="216" y="258" width="196" height="34" rx="7"/>
    </g>
    <g fill="${ink}" font-weight="650" text-anchor="middle">
      <text x="106" y="281">Baseline = ${escapeLabel(baseline)} AU</text>
      <text x="314" y="281">p = ${escapeLabel(angle)} arcsec</text>
    </g>`,
  );
}
