function part(label, unit, answer, tolerance = 0) {
  return { label, unit, answer, tolerance };
}

export const structuredChallenge = [
  {
    id: 'challenge-trolley-coupling', bank: 'physics-3',
    prompt: 'A 0.60 kg trolley moving at 2.0 m s⁻¹ catches a 0.40 kg trolley moving in the same direction at 0.50 m s⁻¹. They couple. External forces are negligible during the collision.',
    parts: [part('Calculate their common speed.', 'm s⁻¹', 1.4, 0.01), part('Calculate the kinetic energy lost in the collision.', 'J', 0.27, 0.005)],
    explanation: 'The initial momentum is 0.60 × 2.0 + 0.40 × 0.50 = 1.40 kg m s⁻¹. Dividing by the combined mass gives 1.40 m s⁻¹. The kinetic energy falls from 1.25 J to 0.98 J, a loss of 0.27 J.',
  },
  {
    id: 'challenge-wire-extension', bank: 'physics-6',
    prompt: 'A straight wire has an unloaded length of 1.80 m and a cross-sectional area of 0.200 mm². Its extension varies linearly with force throughout the range shown.',
    figure: {caption: 'Extension measured from the unloaded length', headers: ['Force / N', 'Extension / mm'], rows: [[10, '0.45'], [20, '0.90'], [30, '1.35']]},
    parts: [part('Determine the Young modulus.', 'GPa', 200, 1), part('Calculate the additional elastic energy stored as the force increases from 10 N to 30 N.', 'mJ', 18, 0.2)],
    explanation: 'At 20 N the stress is 20/(0.200 × 10⁻⁶) = 1.00 × 10⁸ Pa and the strain is 0.00090/1.80. Their ratio is 200 GPa. The extra energy is the area under the force–extension graph between the two loads, ½(10 + 30) × 0.00090 = 0.018 J.',
  },
  {
    id: 'challenge-wire-balance', bank: 'physics-20',
    prompt: 'A magnet rests on a balance. A separately supported horizontal wire carries a current through the uniform field between its poles. With 40.0 mm of wire perpendicular to the field, switching on a 2.00 A current increases the balance reading by 1.60 g. Take g = 9.81 m s⁻².',
    parts: [part('Determine the magnetic flux density in the gap.', 'T', 0.1962, 0.004), part('The current is reversed and reduced to 1.50 A. Relative to the reading with the current off, give the signed change in balance reading.', 'g', -1.20, 0.015)],
    explanation: 'The extra downward force on the magnet equals the magnetic force on the wire in magnitude. Thus B = 0.00160 × 9.81/(2.00 × 0.0400) = 0.196 T. Reversing the current reverses the force. Its magnitude scales with the current, so the change is −1.60 × 1.50/2.00 = −1.20 g.',
  },
  {
    id: 'challenge-capacitor-sharing', bank: 'physics-19',
    prompt: 'A 6.0 µF capacitor is charged to 12 V and disconnected from the supply. Its terminals are connected across an initially uncharged 3.0 µF capacitor. Charge leakage is negligible.',
    parts: [part('Find the common final potential difference.', 'V', 8.0, 0.05), part('Find the decrease in total energy stored by the capacitors.', 'µJ', 144, 4)],
    explanation: 'Initially the charge is 72 µC. After connection the effective capacitance is 9.0 µF, so the common voltage is 8.0 V. Using ½CV² gives 432 µJ initially and 288 µJ finally.',
  },
  {
    id: 'challenge-sound-echo', bank: 'physics-24',
    prompt: 'An ultrasound pulse returns from the front and rear surfaces of a tissue layer. Take the wave speed in the layer as 1540 m s⁻¹. The transducer emits pulses at 5.0 MHz.',
    figure: {caption: 'Echo arrival times after emission', headers: ['Reflecting surface', 'Time / µs'], rows: [['Front', '22.0'], ['Rear', '36.0']]},
    parts: [part('Calculate the thickness of the tissue layer.', 'mm', 10.78, 0.25), part('Calculate the number of wavelengths along the one-way path through the layer.', 'wavelengths', 35, 0.3)],
    explanation: 'Only the 14.0 µs difference is due to the layer. The one-way flight time is 7.0 µs, giving a thickness of 10.78 mm. During this time 5.0 × 10⁶ × 7.0 × 10⁻⁶ = 35 cycles elapse.',
  },
  {
    id: 'challenge-carbonate-sample', bank: 'chemistry-2',
    prompt: 'A 1.20 g sample of impure calcium carbonate reacts completely with excess acid. The impurities do not react. At room conditions the reaction produces 216 cm³ of dry carbon dioxide. Use a molar gas volume of 24.0 dm³ mol⁻¹ and Mᵣ(CaCO₃) = 100.',
    parts: [part('Calculate the amount of calcium carbonate in the sample.', 'mmol', 9, 0.05), part('Calculate the percentage by mass of impurities.', '%', 25, 0.2)],
    explanation: 'One mole of carbonate gives one mole of CO₂. The sample therefore contains 0.216/24.0 = 0.00900 mol of CaCO₃, with mass 0.900 g. The remaining 0.300 g is 25.0% of 1.20 g.',
  },
  {
    id: 'challenge-equilibrium-vessel', bank: 'chemistry-7',
    prompt: 'A sealed 2.00 dm³ vessel initially contains 0.800 mol of H₂ and 0.600 mol of I₂. At equilibrium it contains 0.800 mol of HI. All substances are gaseous. The equation is H₂ + I₂ ⇌ 2HI.',
    parts: [part('Calculate the equilibrium concentration of I₂.', 'mol dm⁻³', 0.100, 0.001), part('Calculate Kc at this temperature.', '(dimensionless)', 8.0, 0.05)],
    explanation: 'Making 0.800 mol of HI consumes 0.400 mol of each reactant. Dividing their remaining amounts by 2.00 gives [H₂] = 0.200 and [I₂] = 0.100 mol dm⁻³. Hence Kc = 0.400²/(0.200 × 0.100) = 8.00.',
  },
  {
    id: 'challenge-buffer-addition', bank: 'chemistry-25',
    prompt: 'A buffer initially contains 40.0 mmol of ethanoic acid and 30.0 mmol of sodium ethanoate. Then 10.0 mmol of sodium hydroxide is added. Take pKa = 4.76 and assume negligible volume change.',
    parts: [part('Calculate the amount of ethanoic acid immediately after neutralisation.', 'mmol', 30, 0.1), part('Calculate the new buffer pH to two decimal places.', 'pH', 4.88, 0.005)],
    explanation: 'Each mmol of hydroxide converts one mmol of acid into ethanoate. This leaves 30.0 mmol of acid and 40.0 mmol of ethanoate. Their concentration ratio is 40/30, so pH = 4.76 + log₁₀(40/30) = 4.88.',
  },
  {
    id: 'challenge-rate-constant', bank: 'chemistry-26',
    prompt: 'A reaction between X and Y is studied at constant temperature. Use the initial rates to deduce the rate law and predict a fourth result.',
    figure: {caption: 'Initial rate measurements', headers: ['[X] / mol dm⁻³', '[Y] / mol dm⁻³', 'Rate / mmol dm⁻³ s⁻¹'], rows: [['0.10', '0.20', '1.20'], ['0.20', '0.20', '4.80'], ['0.20', '0.10', '2.40']]},
    parts: [part('Determine the overall order of the reaction.', '(order)', 3), part('Predict the rate when [X] = 0.30 and [Y] = 0.10 mol dm⁻³.', 'mmol dm⁻³ s⁻¹', 5.4, 0.04)],
    explanation: 'Doubling [X] alone quadruples rate, giving order two. Halving [Y] alone halves rate, giving order one. The overall order is three. Relative to the third run, the rate changes by (0.30/0.20)², giving 2.40 × 2.25 = 5.40.',
  },
  {
    id: 'challenge-graticule', bank: 'biology-1',
    prompt: 'At one magnification, 48 eyepiece divisions line up with 0.120 mm on a stage micrometer. At the same magnification a cell spans 18 eyepiece divisions. Its image in a printed diagram is 81 mm long.',
    parts: [part('Calculate the actual length of the cell.', 'µm', 45, 0.1), part('Calculate the magnification of the printed diagram.', '×', 1800, 1)],
    explanation: 'One division represents 120/48 = 2.50 µm. The cell therefore measures 18 × 2.50 = 45 µm. The printed image measures 81 000 µm, so magnification is 81 000/45 = 1800.',
  },
  {
    id: 'challenge-seed-respiration', bank: 'biology-12',
    prompt: 'Germinating seeds of mass 4.0 g are measured for 20 minutes at constant temperature and pressure. Two determinations give the corrected gas-volume changes below. Assume these arise only from O₂ uptake and CO₂ release.',
    figure: {caption: 'Net decrease in gas volume', headers: ['Condition', 'Decrease / cm³'], rows: [['CO₂ absorbed', '2.40'], ['CO₂ left in gas phase', '0.72']]},
    parts: [part('Calculate the O₂ uptake rate per gram of seeds.', 'cm³ g⁻¹ h⁻¹', 1.80, 0.02), part('Determine the respiratory quotient.', '(ratio)', 0.70, 0.01)],
    explanation: 'With CO₂ absorbed, the entire 2.40 cm³ decrease measures oxygen uptake. Its rate is 2.40 × 3/4.0 = 1.80 cm³ g⁻¹ h⁻¹. The second decrease equals oxygen used minus CO₂ released, so CO₂ release is 1.68 cm³. RQ = 1.68/2.40 = 0.70.',
  },
  {
    id: 'challenge-beetle-testcross', bank: 'biology-16',
    prompt: 'A beetle heterozygous for two linked genes is test-crossed. Offspring phenotypes directly identify the gametes produced by the heterozygote. Assume equal viability.',
    figure: {caption: 'Gametes inferred from 500 offspring', headers: ['Gamete type', 'AB', 'Ab', 'aB', 'ab'], rows: [['Count', 201, 51, 49, 199]]},
    parts: [part('Calculate the recombination frequency.', '%', 20, 0.1), part('Using this frequency and equal reciprocal classes, predict the number of Ab offspring in a second cross of 800.', 'offspring', 80)],
    explanation: 'AB and ab are the two common parental classes. The recombinant classes total 51 + 49 = 100, or 20% of 500. Ab should account for half the recombinants, hence 800 × 0.20/2 = 80.',
  },
  {
    id: 'challenge-light-response', bank: 'biology-13',
    prompt: 'A leaf is studied in a sealed chamber at two light intensities. Assume respiration continues at the measured dark rate under both light conditions.',
    figure: {caption: 'Net CO₂ uptake by the leaf', headers: ['Condition', 'Net uptake / µmol h⁻¹'], rows: [['Dark', '−4.0'], ['Low light', '+6.0'], ['High light', '+16.0']]},
    parts: [part('Calculate gross CO₂ fixation at low light.', 'µmol h⁻¹', 10, 0.1), part('Calculate the percentage increase in gross fixation from low to high light.', '%', 100, 0.1)],
    explanation: 'Dark CO₂ release gives the respiration rate of 4.0 µmol h⁻¹. Adding this to net uptake gives gross fixation of 10 at low light and 20 at high light. The increase relative to the low-light value is 10/10 × 100 = 100%.',
  },
];
