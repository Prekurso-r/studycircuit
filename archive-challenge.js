export const archiveChallenge = [
  {
    bank: 'physics-forces',
    prompt: 'A uniform shelf of weight 60 N is hinged to a wall. A cable attached at the free end holds it horizontal. What is the tension in the cable?',
    figure: {
      caption: 'Side view of the shelf and cable',
      alt: 'A 1.20 m shelf projects horizontally from a hinge. A 90 N load acts 0.80 m from the hinge. The cable at the free end makes 30° with the shelf.',
      svg: `<svg viewBox="0 0 460 230" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="#384057" stroke-width="3">
          <path d="M45 18V175 M45 150H280 M45 20L280 150"/>
          <circle cx="45" cy="150" r="5" fill="white"/>
          <path d="M202 150v35m-5-8 5 8 5-8"/>
          <path d="M233 150q0-12 7-22" stroke-width="1.5"/>
        </g>
        <g fill="#26334b" font-family="system-ui,sans-serif" font-size="15">
          <text x="52" y="172">hinge</text><text x="88" y="45">cable</text>
          <text x="193" y="140">30°</text><text x="211" y="185">90 N</text>
          <text x="45" y="214">Hinge to load 0.80 m · Shelf length 1.20 m</text>
        </g></svg>`,
    },
    options: ['90 N', '120 N', '180 N', '240 N'],
    answer: 2,
    explanation: 'Take moments about the hinge. The shelf’s weight acts at its centre, 0.60 m from the hinge. The clockwise moment is 60 × 0.60 + 90 × 0.80 = 108 N m. The cable supplies a moment of T × sin 30° × 1.20, giving T = 180 N.',
  },
  {
    bank: 'physics-phases',
    prompt: 'A metal casting of mass 1.62 kg occupies 240 cm³ including a sealed air cavity. Solid metal of the same composition has a density of 7.50 g cm⁻³. A scan suggests that the cavity occupies 15% of the casting. Which conclusion follows if the mass of air is negligible?',
    options: ['The cavity occupies 10%, so the scan overestimates its volume.', 'The cavity occupies 10%, so the scan underestimates its volume.', 'The cavity occupies 11.1%, so the scan overestimates its volume.', 'The cavity occupies 90%, so the scan underestimates its volume.'],
    answer: 0,
    explanation: 'The metal itself occupies 1620 ÷ 7.50 = 216 cm³. The enclosed air therefore occupies 24 cm³ out of a total 240 cm³, or 10%. The scan’s estimate corresponds to 36 cm³.',
  },
  {
    bank: 'physics-magnetic-fields',
    prompt: 'Two long parallel wires are 12 cm apart. Both carry current out of the page. The current in the left wire is 3.0 A and that in the right wire is 6.0 A. Where on the line joining the wires is the resultant magnetic flux density zero? For each wire, B is proportional to I/r.',
    options: ['4.0 cm to the left of the left wire', '6.0 cm to the right of the left wire', '8.0 cm to the right of the left wire', '4.0 cm to the right of the left wire'],
    answer: 3,
    explanation: 'Between the wires the fields point in opposite directions. If the distance from the left wire is x cm, equal magnitudes require 3/x = 6/(12 − x). This gives x = 4.0 cm. Outside the wires the fields reinforce each other.',
  },
  {
    bank: 'physics-charged-particles',
    prompt: 'Two positive ions start from rest and accelerate through the same potential difference. They then enter the same uniform magnetic field perpendicular to their velocities. Ion P has mass 20u and charge +e. Ion Q has mass 40u and charge +2e. Which statement compares their circular paths?',
    options: ['Q has twice the radius and the same period as P.', 'Both ions have the same radius and the same period.', 'Both ions have the same radius, but Q has twice the period.', 'Q has half the radius and half the period of P.'],
    answer: 1,
    explanation: 'Both ions have the same q/m, so v² = 2qV/m gives the same speed for each. Since r = mv/(qB), their radii also match. They cover the same circumference at the same speed, giving equal periods.',
  },
  {
    bank: 'physics-electronics',
    prompt: 'An inverting amplifier has a 10 kΩ input resistor, a 60 kΩ feedback resistor and a grounded non-inverting input. Its output is limited to ±9.0 V and is otherwise ideal. The input varies slowly between −1.2 V and +2.0 V. What are the minimum and maximum output voltages?',
    options: ['−9.0 V and +7.2 V', '−12 V and +7.2 V', '−7.2 V and +9.0 V', '−9.0 V and +9.0 V'],
    answer: 0,
    explanation: 'The gain is −60/10 = −6. At −1.2 V the output reaches +7.2 V. At +2.0 V the ideal linear output would be −12 V, so this end of the waveform is clipped at −9.0 V.',
  },
  {
    bank: 'physics-direct-sensing',
    prompt: 'A 6.0 V supply powers a potential divider. The upper component is a thermistor and the lower component is a 4.0 kΩ resistor connected to 0 V. A comparator switches when the junction rises above 2.0 V. Using the calibration table, determine the threshold temperature and what happens as the thermistor is warmed through it. Assume linear interpolation between readings.',
    figure: { caption: 'Thermistor calibration', headers: ['Temperature / °C', 'Resistance / kΩ'], rows: [['20', '10.0'], ['30', '6.0'], ['40', '4.0']] },
    options: ['25 °C, junction voltage falls', '35 °C, junction voltage rises', '25 °C, junction voltage rises', '35 °C, junction voltage falls'],
    answer: 2,
    explanation: 'The junction voltage is 6.0 × 4.0/(R + 4.0) with R in kΩ. At 2.0 V, R = 8.0 kΩ, halfway between the 20 °C and 30 °C readings. Warming decreases R, increasing the fraction of the supply across the fixed resistor.',
  },
  {
    bank: 'physics-communication',
    prompt: 'An optical link launches 8.0 mW into a fibre. The receiver needs at least 0.50 mW. Two connectors each cause a loss of 1.5 dB. Fibre loss is 0.30 dB km⁻¹. What is the approximate maximum fibre length? Use loss in dB = 10 log₁₀(Pin/Pout).',
    options: ['10 km', '30 km', '40 km', '50 km'],
    answer: 1,
    explanation: 'A power ratio of 8.0/0.50 = 16 allows 12.04 dB of loss. The connectors use 3.0 dB, leaving about 9.0 dB for the fibre. The maximum length is approximately 9.0/0.30 = 30 km.',
  },
  {
    bank: 'physics-transformers',
    prompt: 'A transformer supplies 12 V r.m.s. to a 6.0 Ω resistor from a 240 V r.m.s. supply. Its efficiency is 80%. Assume the primary current and voltage are in phase. Which pair gives the primary current and the power lost by the transformer?',
    options: ['0.080 A and 4.8 W', '0.100 A and 6.0 W', '0.125 A and 4.8 W', '0.125 A and 6.0 W'],
    answer: 3,
    explanation: 'Output power is 12²/6.0 = 24 W. The input must supply 24/0.80 = 30 W. This corresponds to 30/240 = 0.125 A, and the difference of 6.0 W is dissipated.',
  },
  {
    bank: 'chemistry-group-iv',
    prompt: 'A 2.392 g sample of pure PbO₂ decomposes to a single oxide and oxygen. The remaining oxide has mass 2.232 g. Use Ar(Pb) = 207.2 and Ar(O) = 16.0. What is the oxidation state of lead in the product and what amount of O₂ was released?',
    options: ['+2 and 0.0100 mol', '+4 and 0.00500 mol', '+2 and 0.00500 mol', '+1 and 0.0100 mol'],
    answer: 2,
    explanation: 'The sample contains 2.392/239.2 = 0.0100 mol of lead. The 0.160 g mass loss is 0.00500 mol of O₂, removing 0.0100 mol of oxygen atoms. One oxygen atom per lead remains, giving PbO with lead in oxidation state +2.',
  },
  {
    bank: 'chemistry-life',
    prompt: 'An unbranched tripeptide contains one glycine residue and two alanine residues. The relative molecular masses of the free amino acids are 75 and 89 respectively. What is the relative molecular mass of the tripeptide and how many distinct amino acid sequences have this composition?',
    options: ['217 and 3', '217 and 6', '235 and 3', '253 and 6'],
    answer: 0,
    explanation: 'Joining three residues makes two peptide bonds, eliminating two water molecules. The relative molecular mass is 75 + 2 × 89 − 2 × 18 = 217. Glycine can occupy the first, second or third position. Exchanging the two alanines leaves the sequence identical.',
  },
  {
    bank: 'chemistry-materials',
    prompt: 'A sample contains 80 identical linear polyester molecules with 120 repeat units per molecule. Hydrolysis breaks exactly three internal backbone ester links per original molecule, each at a boundary between repeat units. All fragments are retained. What is the new number-average length in repeat units?',
    options: ['29.25', '40', '117', '30'],
    answer: 3,
    explanation: 'Three cuts divide each linear molecule into four fragments. The total number of repeat units stays at 80 × 120 = 9600 and the number of molecules rises to 320. The number-average length is 9600/320 = 30 repeat units.',
  },
  {
    bank: 'biology-smoking',
    prompt: 'Two blood samples have the same haemoglobin concentration. In each sample a haemoglobin binding site can carry one O₂ molecule or one CO molecule. Use the table to compare the amount of O₂ delivered per unit volume as blood passes from arteries to veins. Ignore dissolved gases.',
    figure: { caption: 'Oxygen occupancy is expressed as a percentage of sites still available after CO has bound', headers: ['Sample', 'Sites blocked by CO', 'Arterial O₂ occupancy', 'Venous O₂ occupancy'], rows: [['P', '0%', '98%', '73%'], ['Q', '20%', '95%', '75%']] },
    options: ['Q delivers 80% as much O₂ as P.', 'Q delivers 64% as much O₂ as P.', 'Q delivers 16% as much O₂ as P.', 'Q delivers 125% as much O₂ as P.'],
    answer: 1,
    explanation: 'Per 100 original sites, P releases 98 − 73 = 25 O₂ molecules. Q has 80 available sites and releases 0.20 × 80 = 16 O₂ molecules. Its delivery relative to P is 16/25 × 100 = 64%.',
  },
  {
    bank: 'biology-ecology',
    prompt: 'The annual energy budget of a meadow is expressed per square metre. Which value is the percentage efficiency of transfer from net production by the plants to net production by herbivores?',
    figure: { caption: 'Annual energy budget', headers: ['Measurement', 'Energy / kJ m⁻² year⁻¹'], rows: [['Gross primary production', '18 000'], ['Plant respiration', '7000'], ['Energy ingested by herbivores', '2200'], ['Herbivore faeces', '880'], ['Herbivore respiration', '990']] },
    options: ['1.8%', '12%', '3.0%', '15%'],
    answer: 2,
    explanation: 'Net plant production is 18 000 − 7000 = 11 000 kJ m⁻² year⁻¹. Herbivore net production is 2200 − 880 − 990 = 330 in the same units. Transfer efficiency is 330/11 000 × 100 = 3.0%.',
  },
  {
    bank: 'biology-biotechnology',
    prompt: 'Two columns contain equal masses of immobilised lactase. Milk with the same starting lactose concentration flows through both. Which column hydrolyses more lactose per minute, and by what factor?',
    figure: { caption: 'Steady-state measurements', headers: ['Column', 'Milk flow / cm³ min⁻¹', 'Percentage of lactose hydrolysed'], rows: [['P', '12', '80'], ['Q', '20', '60']] },
    options: ['P by a factor of 1.33', 'P by a factor of 1.25', 'Q by a factor of 1.67', 'Q by a factor of 1.25'],
    answer: 3,
    explanation: 'For a common inlet concentration, lactose hydrolysed per minute is proportional to volume flow multiplied by the converted fraction. P gives 12 × 0.80 = 9.6 and Q gives 20 × 0.60 = 12. The ratio Q/P is 12/9.6 = 1.25.',
  },
  {
    bank: 'biology-crops',
    prompt: 'Equal leaf areas of a C₃ crop and a C₄ crop are tested under hot, bright conditions. Carbon dioxide concentration and water supply are held constant. Which observation supports the explanation that concentrating CO₂ around Rubisco reduces photorespiration in the C₄ crop?',
    figure: { caption: 'Net carbon dioxide uptake / µmol m⁻² s⁻¹', headers: ['Crop', 'At 21% oxygen', 'At 2% oxygen'], rows: [['C₃', '12', '20'], ['C₄', '23', '24']] },
    options: ['Lower oxygen increases uptake much more in the C₃ crop, consistent with greater competition by O₂ at Rubisco in air.', 'Higher oxygen increases uptake in both crops, so Rubisco requires oxygen for carbon fixation.', 'The C₄ crop must have fewer chloroplasts because its uptake changes less.', 'The C₃ crop must concentrate CO₂ more strongly because it shows the larger response.'],
    answer: 0,
    explanation: 'Reducing oxygen increases uptake by 8 units in the C₃ crop but only 1 unit in the C₄ crop. Oxygen competes with CO₂ at Rubisco. A high local CO₂ concentration in C₄ bundle-sheath cells explains the smaller response to oxygen.',
  },
  {
    bank: 'biology-reproduction',
    prompt: 'A researcher uses hormone measurements to estimate the timing of ovulation in a cycle. Which interval is best supported by the data, and which observation corroborates the estimate?',
    figure: { caption: 'Hormone concentrations on selected days (arbitrary units for each hormone)', headers: ['Day', 'LH', 'Progesterone'], rows: [['10', '5', '1'], ['13', '42', '1'], ['16', '6', '7'], ['20', '4', '13']] },
    options: ['Days 10–13, because progesterone is low on both days.', 'Days 13–16, because progesterone rises after the LH surge.', 'Days 16–20, because progesterone reaches its highest measured value on day 20.', 'Days 10–13, because LH is lowest before ovulation.'],
    answer: 1,
    explanation: 'The large LH reading on day 13 indicates the surge that triggers ovulation. By day 16 progesterone has risen, consistent with secretion by the newly formed corpus luteum. The sampling interval supports an estimate but cannot identify an exact day.',
  },
];
