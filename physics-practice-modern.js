import { calc, drill, exact, plotFigure, practice, scenario } from './physics-practice-tools.js';

const particles = practice('11', [
  ['hadron-family', 'Which group contains particles each built from a quark and an antiquark?', ['Mesons', 'Baryons', 'Leptons', 'Photons'], 0, 'A meson is a hadron with a valence quark and antiquark. A baryon has three valence quarks.'],
  ['charged-lepton', 'Which particle is a lepton?', ['Neutron', 'Pion', 'Electron', 'Proton'], 2, 'The electron is an elementary lepton. The neutron, pion and proton are hadrons made from quarks.'],
  ['neutral-current', 'Which particle listed here has zero electric charge and belongs to the lepton family?', ['Neutrino', 'Photon', 'Neutron', 'Positron'], 0, 'A neutrino is electrically neutral and is a lepton. Neutrons are hadrons and photons are bosons.'],
], [
  drill('pair-threshold', [['electron', 'positron', 0.511, 2.8, 2.2], ['muon', 'antimuon', 105.7, 380, 320], ['electron', 'positron', 0.511, 3.2, 2.5], ['muon', 'antimuon', 105.7, 520, 460]], (particle, anti, rest, maximum, beam) => {
    const threshold = 2 * rest;
    return scenario(
      `A photon near a heavy nucleus can produce a ${particle} and a ${anti}. Neglect nuclear recoil energy. The graph shows the total kinetic energy of the pair for photons above the threshold. Consider a photon of energy ${beam} MeV.`,
      calc('Read the minimum photon energy for production of this pair.', 'MeV', threshold, 'Read the photon energy where the pair first has zero kinetic energy.'),
      calc(`Find the rest energy of one ${particle}.`, 'MeV', rest, 'At the threshold there is just enough energy to create two equal rest masses. Divide the threshold photon energy by two.'),
      calc('If the kinetic energy is shared equally, find the kinetic energy of each produced particle for the stated photon.', 'MeV', (beam - threshold) / 2, 'Subtract the combined rest energy from the photon energy and divide the remaining kinetic energy by two.'),
      plotFigure({ caption: 'Kinetic energy available in pair production', alt: `The straight segment begins at photon energy ${threshold} MeV and zero pair kinetic energy. It has gradient one and ends at photon energy ${maximum} MeV.`, xLabel: 'photon energy / MeV', yLabel: 'pair kinetic energy / MeV', xTicks: [0, threshold, maximum], yTicks: [0, (maximum - threshold) / 2, maximum - threshold], traces: [{ points: [[threshold, 0], [maximum, maximum - threshold]] }] }),
    );
  }),
  drill('valence-particles', [[3, 2, 1], [5, 4, 2], [4, 6, 3], [6, 5, 2]], (protons, neutrons, antiprotons) => scenario(
    `Consider ${protons} protons, ${neutrons} neutrons and ${antiprotons} antiprotons before any interactions. A proton’s valence content is uud, a neutron’s is udd, and an antiproton contains the antiparticles of a proton’s quarks.`,
    exact('Find the net electric charge in units of the elementary charge.', 'e', protons - antiprotons, 'Each proton contributes +1, each neutron zero and each antiproton −1.'),
    exact('Find the total baryon number.', '', protons + neutrons - antiprotons, 'Protons and neutrons each have baryon number +1. An antiproton contributes −1.'),
    exact('Find the number of valence down quarks in the protons and neutrons combined. Do not count antiquarks.', 'quarks', protons + 2 * neutrons, 'Count one down quark in each proton and two in each neutron.'),
  )),
  drill('beta-change', [['carbon-14', 14, 6, -1], ['cobalt-60', 60, 27, -1], ['sodium-22', 22, 11, 1], ['fluorine-18', 18, 9, 1]], (isotope, massNumber, protons, betaCharge) => {
    const newZ = protons - betaCharge;
    return scenario(
      `A bare ${isotope} nucleus has mass number ${massNumber} and proton number ${protons}. It undergoes β${betaCharge === 1 ? '⁺' : '⁻'} decay.`,
      exact('Find the number of neutrons in the original nucleus.', 'neutrons', massNumber - protons, 'The starting neutron number is mass number minus proton number.'),
      exact('Find the proton number of the daughter nucleus.', '', newZ, 'In β⁻ decay a neutron becomes a proton, increasing Z by one. In β⁺ decay a proton becomes a neutron, decreasing Z by one.'),
      exact('Find the number of valence up quarks in the daughter nucleus.', 'quarks', massNumber + newZ, 'The mass number remains constant. Count two up quarks per daughter proton and one per daughter neutron.'),
    );
  }),
  drill('annihilation-photons', [[25], [60], [85], [120]], kinetic => {
    const eV = 1000 * (511 + kinetic);
    return scenario(
      `An electron and a positron approach one another with equal and opposite momenta. Each has kinetic energy ${kinetic} keV and rest energy 511 keV. They annihilate into two photons. Use 1 eV = 1.60 × 10⁻¹⁹ J, h = 6.63 × 10⁻³⁴ J s and c = 3.00 × 10⁸ m s⁻¹.`,
      calc('Find the combined energy of the two photons.', 'keV', 2 * (511 + kinetic), 'Add both rest energies and both kinetic energies. Total energy is conserved.'),
      calc('Find the energy of one photon in joules.', 'J', eV * 1.6e-19, 'Zero initial net momentum requires equal-magnitude photon momenta in opposite directions, so the photons share total energy equally. Convert one photon’s energy to joules.'),
      calc('Find the wavelength of either photon.', 'pm', 1e12 * 6.63e-34 * 3e8 / (eV * 1.6e-19), 'Use E = hc/λ and convert the resulting wavelength to picometres.'),
    );
  }),
  drill('decay-conservation', [
    ['π⁺', 'μ⁺ and one unknown lepton', 1, 1, 1],
    ['π⁻', 'μ⁻ and one unknown lepton', -1, -1, -1],
    ['μ⁻', 'e⁻, an electron antineutrino and one unknown lepton', -1, -1, 1],
    ['μ⁺', 'e⁺, an electron neutrino and one unknown lepton', 1, 1, -1],
  ], (initial, final, initialCharge, knownCharge, missingLepton) => scenario(
    `In a decay, ${initial} produces ${final}. Use conservation of electric charge and of muon-family lepton number. Muons and muon neutrinos have muon-family number +1, their antiparticles −1, and all other particles here zero.`,
    exact('Find the initial electric charge in units of the elementary charge.', 'e', initialCharge, 'The superscript sign indicates a single positive or negative elementary charge.'),
    exact('Find the electric charge of the unknown lepton in units of the elementary charge.', 'e', initialCharge - knownCharge, 'Subtract the total charge of the known products from the initial charge. The known neutrino, if present, has zero charge.'),
    exact('Find the muon-family lepton number of the unknown particle.', '', missingLepton, 'Subtract the muon-family number of the listed products from the initial particle’s muon-family number. For a pion it starts at zero, while a muon already carries muon-family number.'),
  )),
]);

const quantum = practice('22', [
  ['photoelectric-intensity', 'Above threshold, what is the effect of raising light intensity at fixed frequency in an ideal photoelectric experiment?', ['Greater maximum electron kinetic energy', 'Smaller work function', 'More photoelectrons emitted per second', 'Lower photon energy'], 2, 'At fixed frequency, photons have the same individual energy. Increasing intensity adds photons per second and can increase emission rate.'],
  ['wave-evidence', 'Which observation supports the wave behaviour of electrons?', ['Electron beams are deflected by an electric field', 'An electron beam diffracts through a thin crystal', 'Electrons have negative charge', 'An electron accelerated by a voltage gains kinetic energy'], 1, 'A crystalline lattice produces a diffraction pattern, which is evidence of wave behaviour.'],
], [
  drill('photoelectric-graph', [[4, 8, 6], [5, 9, 7.5], [5.5, 10, 8], [6, 11, 9]], (threshold, maximum, incident) => {
    const h = 6.63e-34;
    const e = 1.60e-19;
    const stopping = (maximum - threshold) * 1e14 * h / e;
    return scenario(
      `The graph shows stopping potential for photoelectrons emitted from a clean metal. Plot values of frequency are in units of 10¹⁴ Hz. The light frequency is then set to ${incident} × 10¹⁴ Hz. Use e = 1.60 × 10⁻¹⁹ C.`,
      calc('Read the threshold frequency.', '10¹⁴ Hz', threshold, 'Photoelectrons have zero maximum kinetic energy at the frequency-axis intercept.'),
      calc('Calculate Planck’s constant from the gradient.', 'J s', h, 'From eVstop = hf − work function, the gradient on a hertz scale is h/e. Divide the plotted slope by 10¹⁴, then multiply by e.'),
      calc('Find the maximum photoelectron kinetic energy at the stated new frequency.', 'eV', (incident - threshold) * 1e14 * h / e, 'Read or interpolate the stopping voltage at the new frequency. The maximum kinetic energy in eV has the same numerical value as the stopping voltage in volts.'),
      plotFigure({ caption: 'Photoelectric stopping potential against light frequency', alt: `The line starts at zero volts for a frequency of ${threshold} × 10¹⁴ Hz and reaches ${stopping.toFixed(3)} volts at ${maximum} × 10¹⁴ Hz.`, xLabel: 'frequency / 10¹⁴ Hz', yLabel: 'stopping p.d. / V', xTicks: [0, threshold, incident, maximum], yTicks: [0, stopping / 2, stopping], traces: [{ points: [[threshold, 0], [maximum, stopping]] }] }),
    );
  }),
  drill('accelerated-electron', [[120, 2], [240, 3], [180, 4], [300, 1.5]], (voltage, factor) => {
    const momentum = Math.sqrt(2 * 9.11e-31 * 1.6e-19 * voltage);
    const wave = 6.63e-34 / momentum;
    return scenario(
      `An electron is accelerated from rest through ${voltage} V. In a repeat, the accelerating p.d. is multiplied by ${factor}. Use e = 1.60 × 10⁻¹⁹ C, mₑ = 9.11 × 10⁻³¹ kg and h = 6.63 × 10⁻³⁴ J s. Use nonrelativistic mechanics.`,
      calc('Find its kinetic energy on leaving the original accelerating region.', 'eV', voltage, 'An electron moving through one volt from rest gains one eV in kinetic energy.'),
      calc('Calculate its original de Broglie wavelength.', 'pm', 1e12 * wave, 'Find p = √(2meV), using SI units. Then evaluate h/p and convert to picometres.'),
      calc('Calculate its de Broglie wavelength with the higher accelerating p.d.', 'pm', 1e12 * wave / Math.sqrt(factor), 'Momentum is proportional to the square root of the accelerating p.d., so wavelength falls by the square root of the voltage factor.'),
    );
  }),
  drill('energy-levels', [[-8, -4, -2], [-10, -5, -2.5], [-9, -5, -3], [-12, -7, -4]], (ground, mid, upper) => scenario(
    `An atom has three energy levels at ${ground} eV (ground), ${mid} eV and ${upper} eV. It starts in the upper level and returns to the ground level. Use hc = 1240 eV nm. Any downward transition between the stated levels is allowed.`,
    calc('Find the photon energy for a direct drop from the upper level to the ground level.', 'eV', upper - ground, 'An emitted photon carries the positive energy difference between the two levels.'),
    calc('Find the shortest wavelength it can emit in these transitions.', 'nm', 1240 / (upper - ground), 'The largest level difference gives the shortest wavelength. Divide hc by that energy difference.'),
    calc('If it returns via the middle level, find the wavelength emitted in the first step.', 'nm', 1240 / (upper - mid), 'The first step drops from the upper level to the middle level. Use that difference in λ = hc/E.'),
  )),
  drill('photon-counting', [[450, 2, 25, 2], [500, 4, 35, 3], [550, 3, 40, 4], [620, 5, 20, 1.5]], (wavelength, power, percent, time) => {
    const ePhoton = 6.63e-34 * 3e8 / (wavelength * 1e-9);
    const rate = power * 1e-3 / ePhoton;
    return scenario(
      `A ${power} mW beam of ${wavelength} nm light reaches a detector for ${time} ms. Assume ${percent}% of incident photons each transfer one electron into the collection circuit. Use h = 6.63 × 10⁻³⁴ J s, c = 3.00 × 10⁸ m s⁻¹ and e = 1.60 × 10⁻¹⁹ C.`,
      calc('Find the energy of one photon.', 'J', ePhoton, 'Use E = hc/λ, converting the wavelength from nanometres to metres.'),
      calc('Find the average number of photoelectrons collected over the stated time.', 'electrons', rate * time * 1e-3 * percent / 100, 'Divide incident power by photon energy for photons per second. Multiply by the time in seconds and by the detected fraction.'),
      calc('Find the magnitude of the mean photocurrent while the beam is on.', 'A', rate * percent / 100 * 1.6e-19, 'Multiply the collected electron rate by the magnitude of the charge per electron.'),
    );
  }),
  drill('electron-diffraction', [[210, 9, 2], [185, 12, 2.5], [240, 8, 1.5], [200, 10, 3]], (spacing, angle, pRatio) => {
    const wavelength = 2 * spacing * Math.sin(angle * Math.PI / 180);
    return scenario(
      `An electron beam diffracts from planes of spacing ${spacing} pm in a crystal. The first-order Bragg angle, measured from the planes, is ${angle}°. Use λ = 2d sin θ for first order and h = 6.63 × 10⁻³⁴ J s.`,
      calc('Find the de Broglie wavelength.', 'pm', wavelength, 'Use twice the plane spacing multiplied by the sine of the stated Bragg angle.'),
      calc('Find the electron momentum.', 'kg m s⁻¹', 6.63e-34 / (wavelength * 1e-12), 'Rearrange the de Broglie relationship to p = h/λ with λ in metres.'),
      calc(`Find the new first-order angle if the momentum is increased by a factor of ${pRatio}.`, '°', Math.asin(Math.sin(angle * Math.PI / 180) / pRatio) * 180 / Math.PI, 'Increasing momentum reduces wavelength inversely. This reduces sin θ by the same factor, so take the inverse sine of the new value.'),
    );
  }),
]);

const nuclei = practice('23', [
  ['half-life-definition', 'Which change would normally alter the half-life of an ordinary alpha-decaying nuclide?', ['Double the mass of the sample', 'Heat it by 10 K', 'Dilute it with a stable compound', 'Replace the source with a different nuclide'], 3, 'Half-life depends on the nuclear decay probability, which is characteristic of the nuclide and normally independent of ordinary physical and chemical changes.'],
  ['binding-energy', 'What does a higher binding energy per nucleon generally indicate?', ['The whole nucleus is unbound', 'More energy per nucleon is needed to separate the nucleus into free nucleons', 'It necessarily has a higher atomic number', 'Each nucleon has zero mass'], 1, 'Binding energy per nucleon measures the average energy cost of fully separating the constituent nucleons.'],
], [
  drill('background-curve', [[240, 30, 8], [320, 40, 12], [200, 25, 6], [280, 35, 10]], (initial, background, half) => {
    const total = Array.from({ length: 37 }, (_, i) => [half * i / 12, background + initial * 2 ** (-i / 12)]);
    return scenario(
      'A counter measures a radioactive sample plus constant background. The solid curve gives the total rate. The dashed line shows the background rate measured separately.',
      calc('Find the corrected initial count rate attributable to the sample.', 'counts min⁻¹', initial, 'Subtract the background line from the total rate at the start.'),
      calc('Find the half-life of the nuclide.', 'min', half, 'Locate where the corrected rate halves. The corresponding total count is half the corrected initial rate plus the background.'),
      calc('Find the expected total detector rate after four half-lives.', 'counts min⁻¹', background + initial / 16, 'Divide the initial sample contribution by 2⁴, then add back the constant background.'),
      plotFigure({ caption: 'Detector readings with and without the source', alt: `Background is ${background} counts per minute. The total rate at 0, ${half}, ${2 * half} and ${3 * half} minutes is ${background + initial}, ${background + initial / 2}, ${background + initial / 4} and ${background + initial / 8} counts per minute respectively.`, xLabel: 'time / min', yLabel: 'rate / counts min⁻¹', xTicks: [0, half, 2 * half, 3 * half], yTicks: [background, background + initial / 2, initial + background], traces: [{ points: total, markers: false }, { points: [[0, background], [3 * half, background]], markers: false }] }),
    );
  }),
  drill('binding-per-nucleon', [[4, 2, 4.001506], [12, 6, 11.996709], [16, 8, 15.990526], [56, 26, 55.92067]], (a, z, nuclear) => {
    const massDefect = z * 1.007276 + (a - z) * 1.008665 - nuclear;
    const binding = massDefect * 931.5;
    return scenario(
      `A nucleus has mass number ${a}, proton number ${z}, and nuclear mass ${nuclear} u. Use proton mass 1.007276 u, neutron mass 1.008665 u and 1 u c² = 931.5 MeV.`,
      exact('Find the neutron number.', 'neutrons', a - z, 'Subtract the proton number from the mass number.'),
      calc('Find the mass defect.', 'u', massDefect, 'Add the masses of the separate protons and neutrons, then subtract the bound nuclear mass.'),
      calc('Calculate the binding energy per nucleon.', 'MeV', binding / a, 'Convert the mass defect into an energy using 931.5 MeV per u and divide by the total nucleon number.'),
    );
  }),
  drill('activity-and-nuclei', [[2, 240, 3], [4, 360, 2], [6, 500, 4], [8, 640, 3]], (half, initial, elapsed) => {
    const lambda = Math.LN2 / (half * 3600);
    return scenario(
      `A sealed radioactive tracer has a half-life of ${half} h and initial activity ${initial} Bq. Consider the original radionuclide alone, and assume none is added or removed except by decay.`,
      calc('Calculate the decay constant in inverse seconds.', 's⁻¹', lambda, 'The decay constant is ln 2 divided by the half-life in seconds.'),
      calc('Estimate the initial number of nuclei of the radionuclide.', 'nuclei', initial / lambda, 'Activity equals λN, so divide the initial activity in decays per second by λ.'),
      calc(`Find the remaining activity after ${elapsed} h.`, 'Bq', initial * 2 ** (-elapsed / half), 'The remaining activity is the initial activity multiplied by ½ to the power t divided by the half-life.'),
    );
  }),
  drill('alpha-recoil', [[226, 88, 4.87], [210, 84, 5.41], [222, 86, 5.59], [238, 92, 4.27]], (a, z, energy) => {
    const daughter = a - 4;
    return scenario(
      `A parent nucleus initially at rest has mass number ${a} and proton number ${z}. It emits one alpha particle and no photon, releasing ${energy} MeV as kinetic energy shared between the alpha particle and daughter nucleus. Use nonrelativistic mechanics and approximate the masses by their mass numbers in u.`,
      exact('Find the daughter nucleus’s proton number.', '', z - 2, 'An alpha particle carries away two protons.'),
      calc('Find the ratio of alpha-particle kinetic energy to daughter recoil energy.', '', daughter / 4, 'The alpha particle and daughter have equal and opposite momenta. At equal momentum, kinetic energy is inversely proportional to mass.'),
      calc('Find the kinetic energy of the alpha particle.', 'MeV', energy * daughter / a, 'Split the total energy in the ratio mdaughter : malpha for the alpha particle and daughter respectively.'),
    );
  }),
  drill('carbon-dating', [[15, 7.5], [13.2, 3.3], [14.8, 5.55], [16, 6]], (fresh, current) => {
    const fraction = current / fresh;
    const halfLife = 5730;
    return scenario(
      `An organic sample gives ${current} decays per minute per gram of carbon after background correction. A modern reference gives ${fresh} under the same conditions. Take the carbon-14 half-life as ${halfLife} years, and assume the reference represents the sample’s initial activity per gram.`,
      calc('Find the sample’s activity per gram as a fraction of the reference.', '', fraction, 'Divide the sample’s activity by the reference activity.'),
      calc('Estimate how many years ago the organism died.', 'years', -halfLife * Math.log2(fraction), 'Use activity fraction = 2 to the power −age/half-life and solve for age using logarithms.'),
      calc('Estimate the sample’s activity per gram after another two half-lives.', 'decays min⁻¹ g⁻¹', current / 4, 'Two half-lives reduce the current activity by a factor of four.'),
    );
  }),
]);

export const modernPractice = [...particles, ...quantum, ...nuclei];
