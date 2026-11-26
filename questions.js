import { physicsChallenge } from './physics-challenge.js';
import { economicsPractice } from './economics-practice.js';
import { businessPractice } from './business-practice.js';
import { biologyChallenge } from './biology-challenge.js';
import { chemistryChallenge } from './chemistry-challenge.js';
import { archiveChallenge } from './archive-challenge.js';
import { structuredChallenge } from './structured-challenge.js';
import { currentEdition, syllabusSubjects } from './syllabuses.js';
import { physicsQuestions } from './physics-questions.js';
import { chemistryQuestions } from './chemistry-questions.js';
import { biologyQuestions } from './biology-questions.js';
import { archiveQuestions } from './archive-questions.js';
import { mechanicsPractice } from './physics-practice-mechanics.js';
import { wavePractice } from './physics-practice-waves.js';
import { circuitPractice } from './physics-practice-circuits.js';
import { thermalPractice } from './physics-practice-thermal.js';
import { modernPractice } from './physics-practice-modern.js';
import { mathematicsPaper1 } from './mathematics-paper-1.js';
import { mathematicsPaper2 } from './mathematics-paper-2.js';
import { mathematicsPaper3 } from './mathematics-paper-3.js';
import { mathematicsPaper4 } from './mathematics-paper-4.js';
import { mathematicsPaper5 } from './mathematics-paper-5.js';
import { mathematicsPaper6 } from './mathematics-paper-6.js';
import { chemistryExtraSimple } from './chemistry-extra-simple.js';
import { chemistryExtraChallenge } from './chemistry-extra-challenge.js';
import { chemistryPracticeAsCore } from './chemistry-practice-as-core.js';
import { chemistryPracticeAsOrganic } from './chemistry-practice-as-organic.js';
import { chemistryPracticeAPhysicalAndArchive } from './chemistry-practice-a-physical-and-archive.js';
import { chemistryPracticeAOrganic } from './chemistry-practice-a-organic.js';
import { biologyExtra } from './biology-extra.js';
import { biologyPracticeAsCore } from './biology-practice-as-core.js';
import { biologyPracticeAAndArchive } from './biology-practice-a-and-archive.js';
import { scienceExtraArchive } from './science-extra-archive.js';

function question(prompt, options, answer, explanation) {
  return { prompt, options, answer, explanation };
}

const originalSubjects = [
  {
    id: 'physics',
    name: 'Physics',
    icon: 'atom',
    description: 'Forces and motion, waves and electrical circuits.',
    topics: [
      {
        id: 'mechanics',
        name: 'Mechanics',
        description: 'Forces, energy and momentum',
        questions: [
          question(
            'A 2.0 kg trolley accelerates from rest to 6.0 m s⁻¹ in 3.0 s. What is the resultant force?',
            ['2.0 N', '4.0 N', '6.0 N', '12 N'],
            1,
            'The acceleration is the change in velocity divided by time, 6.0 ÷ 3.0 = 2.0 m s⁻². Newton’s second law gives F = ma = 2.0 × 2.0 = 4.0 N.',
          ),
          question(
            'A ball is launched horizontally off a bench. In the absence of air resistance, which quantity stays constant during its flight?',
            ['Vertical velocity', 'Kinetic energy', 'Speed', 'Horizontal velocity'],
            3,
            'Gravity acts vertically, so the horizontal resultant force and acceleration are zero. The horizontal component of velocity stays constant while the downward component increases.',
          ),
          question(
            'A 0.20 kg ball travelling at 8.0 m s⁻¹ rebounds in the opposite direction at 5.0 m s⁻¹. What is the magnitude of its change in momentum?',
            ['2.6 kg m s⁻¹', '0.60 kg m s⁻¹', '1.6 kg m s⁻¹', '1.0 kg m s⁻¹'],
            0,
            'Take the initial direction as positive. The change is 0.20 × (−5.0 − 8.0) = −2.6 kg m s⁻¹. The magnitude is 2.6 kg m s⁻¹.',
          ),
          question(
            'A motor lifts a 15 kg mass through 4.0 m in 3.0 s at constant speed. What is the useful output power? Use g = 9.8 m s⁻².',
            ['49 W', '147 W', '196 W', '588 W'],
            2,
            'The useful energy transferred is the gain in gravitational potential energy, mgh = 15 × 9.8 × 4.0 = 588 J. Dividing by 3.0 s gives 196 W.',
          ),
        ],
      },
      {
        id: 'waves',
        name: 'Waves',
        description: 'Wave speed, interference and diffraction',
        questions: [
          question(
            'A sound wave travels at 340 m s⁻¹ and has a frequency of 850 Hz. What is its wavelength?',
            ['0.25 m', '0.40 m', '2.5 m', '4.0 m'],
            1,
            'Wave speed is frequency multiplied by wavelength. Rearranging v = fλ gives λ = 340 ÷ 850 = 0.40 m.',
          ),
          question(
            'Two coherent sources emit in phase. At a point, their waves have a path difference of 1.5 wavelengths. What happens at that point?',
            ['The waves are in phase and interfere constructively', 'The waves have different frequencies', 'The waves are in antiphase and interfere destructively', 'The waves travel at different speeds'],
            2,
            'A difference of one full wavelength brings the waves back into phase. The extra half wavelength introduces a phase difference of π radians, so the waves interfere destructively.',
          ),
          question(
            'A string fixed at both ends forms its fundamental standing wave. How is the string length L related to the wavelength λ?',
            ['L = λ ÷ 2', 'L = λ ÷ 4', 'L = λ', 'L = 2λ'],
            0,
            'The fundamental has a node at each end and one antinode midway. Adjacent nodes are half a wavelength apart, so the string length is λ ÷ 2.',
          ),
          question(
            'For a wave of fixed wavelength, what change to a single gap increases the angle through which the wave diffracts?',
            ['Increase the width of the gap', 'Increase the wave amplitude', 'Decrease the wave amplitude', 'Decrease the width of the gap'],
            3,
            'A narrower gap increases angular spreading. Diffraction is particularly noticeable when the gap width is comparable to the wavelength.',
          ),
        ],
      },
      {
        id: 'electricity',
        name: 'Electricity',
        description: 'Current, resistance and potential difference',
        questions: [
          question(
            'A charge of 36 C passes a point in a circuit in 12 s. What is the mean current?',
            ['0.33 A', '12 A', '3.0 A', '432 A'],
            2,
            'Current is the rate of flow of charge. I = Q ÷ t = 36 ÷ 12 = 3.0 A.',
          ),
          question(
            'A 6.0 Ω resistor and a 3.0 Ω resistor are connected in parallel. What is their combined resistance?',
            ['2.0 Ω', '3.0 Ω', '4.5 Ω', '9.0 Ω'],
            0,
            'For parallel resistors, add reciprocals. The sum 1/6.0 + 1/3.0 is 1/2.0, so the equivalent resistance is 2.0 Ω.',
          ),
          question(
            'Two wires of the same material and length have diameters d and 2d. What is the resistance of the wider wire if the narrower wire has resistance R?',
            ['R ÷ 2', 'R ÷ 4', '2R', '4R'],
            1,
            'Resistance is given by R = ρL/A. Doubling the diameter quadruples the cross-sectional area, so the resistance falls to one quarter.',
          ),
          question(
            'A cell has an emf of 1.5 V and an internal resistance of 0.40 Ω. It supplies a current of 0.50 A. What is its terminal potential difference?',
            ['0.20 V', '0.75 V', '1.5 V', '1.3 V'],
            3,
            'The potential difference across the internal resistance is Ir = 0.50 × 0.40 = 0.20 V. Subtract that from the emf to get 1.30 V.',
          ),
        ],
      },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: 'flask',
    description: 'Moles, chemical bonding and energy changes.',
    topics: [
      {
        id: 'amount-of-substance',
        name: 'Amount of substance',
        description: 'Moles, concentrations and reacting amounts',
        questions: [
          question(
            'How many moles are in 5.85 g of sodium chloride? Use a molar mass of 58.5 g mol⁻¹.',
            ['0.0100 mol', '1.00 mol', '10.0 mol', '0.100 mol'],
            3,
            'Amount in moles equals mass divided by molar mass. Here, 5.85 ÷ 58.5 = 0.100 mol.',
          ),
          question(
            'What amount of solute is present in 25.0 cm³ of a 0.200 mol dm⁻³ solution?',
            ['0.00500 mol', '0.0500 mol', '0.125 mol', '5.00 mol'],
            0,
            'Convert 25.0 cm³ to 0.0250 dm³. Multiplying concentration by volume gives 0.200 × 0.0250 = 0.00500 mol.',
          ),
          question(
            'Nitrogen and hydrogen react according to N₂ + 3H₂ → 2NH₃. How many moles of ammonia can form from 0.60 mol of hydrogen with excess nitrogen?',
            ['0.20 mol', '0.30 mol', '0.40 mol', '0.90 mol'],
            2,
            'The balanced equation gives a 3:2 mole ratio of hydrogen to ammonia. Multiply 0.60 mol by 2/3 to get 0.40 mol of ammonia.',
          ),
          question(
            'What volume does 0.075 mol of gas occupy at room temperature and pressure? Use a molar gas volume of 24 dm³ mol⁻¹.',
            ['0.0031 dm³', '1.8 dm³', '24 dm³', '320 dm³'],
            1,
            'Volume = amount × molar gas volume. Multiplying 0.075 mol by 24 dm³ mol⁻¹ gives 1.8 dm³.',
          ),
        ],
      },
      {
        id: 'bonding',
        name: 'Bonding and structure',
        description: 'Molecular shapes, lattices and intermolecular forces',
        questions: [
          question(
            'What is the shape of an ammonia molecule, NH₃?',
            ['Trigonal planar', 'Trigonal pyramidal', 'Tetrahedral', 'Linear'],
            1,
            'Nitrogen has three bonding pairs and one lone pair. The four electron pairs arrange approximately tetrahedrally, with the three hydrogen atoms forming a trigonal pyramid.',
          ),
          question(
            'Why does molten sodium chloride conduct electricity?',
            ['It contains delocalised electrons', 'It becomes a metal when it melts', 'It contains neutral atoms that move freely', 'Its ions can move and carry charge'],
            3,
            'In the solid, ions are held in fixed positions in the lattice. When the lattice melts, the charged sodium and chloride ions can move and carry current.',
          ),
          question(
            'Which interaction accounts for the relatively high boiling point of water compared with hydrogen sulfide?',
            ['Hydrogen bonding between water molecules', 'Ionic bonding between water molecules', 'Covalent bonding breaking during evaporation', 'Metallic bonding between oxygen atoms'],
            0,
            'Water molecules form intermolecular hydrogen bonds between a partially positive hydrogen and a lone pair on a neighbouring oxygen. Separating the molecules takes more energy.',
          ),
          question(
            'Why can graphite conduct electricity along its layers?',
            ['Carbon ions move between the layers', 'Each carbon atom forms four covalent bonds', 'Electrons are delocalised within each layer', 'The layers contain mobile protons'],
            2,
            'Each carbon atom forms three covalent bonds. One electron per carbon contributes to a delocalised system, allowing charge to move along the layers.',
          ),
        ],
      },
      {
        id: 'energetics',
        name: 'Energetics',
        description: 'Enthalpy changes, calorimetry and energy profiles',
        questions: [
          question(
            'The surroundings warm up during a reaction at constant pressure. What does this indicate about the reaction?',
            ['It is endothermic and ΔH is positive', 'It is endothermic and ΔH is negative', 'It is exothermic and ΔH is negative', 'It is exothermic and ΔH is positive'],
            2,
            'The system transfers heat to its surroundings, so the reaction is exothermic. The products are at lower enthalpy than the reactants and ΔH is negative.',
          ),
          question(
            'A reaction heats 50 g of water by 8.0 °C. How much energy does the water gain? Use c = 4.18 J g⁻¹ K⁻¹.',
            ['0.167 kJ', '1.67 kJ', '16.7 kJ', '167 kJ'],
            1,
            'Use q = mcΔT. A change of 8.0 °C is 8.0 K, so q = 50 × 4.18 × 8.0 = 1,672 J, or about 1.67 kJ.',
          ),
          question(
            'The enthalpy change for A → B is +25 kJ mol⁻¹ and for B → C it is −85 kJ mol⁻¹. What is the enthalpy change for A → C?',
            ['−110 kJ mol⁻¹', '+60 kJ mol⁻¹', '+110 kJ mol⁻¹', '−60 kJ mol⁻¹'],
            3,
            'Hess’s law makes the total enthalpy change independent of the route. Adding +25 and −85 gives −60 kJ mol⁻¹.',
          ),
          question(
            'How does a catalyst affect the energy profile of a reaction?',
            ['It provides a pathway with a lower activation energy', 'It lowers the enthalpy of the products', 'It makes the overall enthalpy change more negative', 'It increases the enthalpy of the reactants'],
            0,
            'The catalyst provides an alternative route with a lower activation energy. The reactants and products remain at the same enthalpies, so the overall enthalpy change is unchanged.',
          ),
        ],
      },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: 'leaf',
    description: 'Biological molecules, cell membranes and inheritance.',
    topics: [
      {
        id: 'biological-molecules',
        name: 'Biological molecules',
        description: 'Enzymes, carbohydrates and proteins',
        questions: [
          question(
            'Why does an enzyme-catalysed reaction reach a maximum rate as substrate concentration increases while enzyme concentration stays fixed?',
            ['All available active sites are occupied most of the time', 'Substrate molecules become denatured', 'The enzyme raises the activation energy', 'The reaction stops producing products'],
            0,
            'At high substrate concentration the enzymes are saturated. Most active sites are occupied, so adding more substrate makes little difference to the rate.',
          ),
          question(
            'Which bond joins two amino acids in a protein?',
            ['Glycosidic bond', 'Ester bond', 'Peptide bond', 'Phosphodiester bond'],
            2,
            'A condensation reaction between the amino group of one amino acid and the carboxyl group of another forms a peptide bond and releases water.',
          ),
          question(
            'What is a structural feature of glycogen that helps an animal cell release glucose rapidly?',
            ['It is made from β-glucose', 'It has many branches that provide multiple ends', 'It is a protein with four subunits', 'It consists of one long unbranched chain'],
            1,
            'Enzymes can remove glucose units from multiple ends of the many branches. This allows faster glucose mobilisation than working from just a few ends.',
          ),
          question(
            'Why does the activity of many enzymes fall rapidly above their optimum temperature?',
            ['Substrate molecules stop moving', 'The enzyme is used up during the reaction', 'The enzyme becomes an inhibitor of the substrate', 'Interactions that maintain the active site’s shape are disrupted'],
            3,
            'High temperatures disrupt interactions that maintain the enzyme’s tertiary structure. The active site changes shape and no longer binds the substrate effectively.',
          ),
        ],
      },
      {
        id: 'cells-and-transport',
        name: 'Cells and transport',
        description: 'Membranes, osmosis and active transport',
        questions: [
          question(
            'Which process moves water across a partially permeable membrane from higher to lower water potential?',
            ['Active transport', 'Endocytosis', 'Facilitated diffusion of solutes', 'Osmosis'],
            3,
            'Osmosis is the net movement of water across a partially permeable membrane down a water potential gradient.',
          ),
          question(
            'Which feature distinguishes active transport from facilitated diffusion?',
            ['It can use transmembrane proteins', 'It can move a solute against its concentration gradient', 'It occurs only through channel proteins', 'It always moves water'],
            1,
            'Active transport uses energy to move a substance against its concentration gradient. Facilitated diffusion uses membrane proteins to move substances down their gradients.',
          ),
          question(
            'What happens to the surface-area-to-volume ratio of a cube when each side doubles in length?',
            ['It halves', 'It doubles', 'It stays the same', 'It is reduced to a quarter'],
            0,
            'Surface area is proportional to length squared, so it increases fourfold. Volume increases eightfold, so the surface-area-to-volume ratio halves.',
          ),
          question(
            'Which molecule can most readily diffuse directly through the phospholipid bilayer of a cell membrane?',
            ['A sodium ion', 'Glucose', 'Oxygen', 'A large protein'],
            2,
            'Oxygen is small and non-polar, so it passes readily through the hydrophobic centre of the bilayer. Charged or larger polar substances generally need transport proteins.',
          ),
        ],
      },
      {
        id: 'genetics',
        name: 'Genetics',
        description: 'Inheritance, meiosis and gene expression',
        questions: [
          question(
            'Two heterozygous parents Aa and Aa have offspring. What is the probability of an offspring with the recessive phenotype, assuming complete dominance?',
            ['0%', '25%', '50%', '75%'],
            1,
            'The expected genotypes are AA, Aa, Aa and aa in equal proportions. Only aa expresses the recessive phenotype, so the probability is one in four.',
          ),
          question(
            'Which event during meiosis creates new combinations of alleles on a chromosome?',
            ['DNA replication before meiosis', 'Separation of sister chromatids during meiosis II', 'Cytokinesis', 'Crossing over between homologous chromosomes'],
            3,
            'During prophase I, non-sister chromatids of homologous chromosomes can exchange corresponding DNA segments. This creates chromatids with new combinations of alleles.',
          ),
          question(
            'Which molecule is produced directly by transcription of a protein-coding gene?',
            ['An RNA transcript', 'A polypeptide', 'A new DNA strand', 'A phospholipid'],
            0,
            'During transcription, RNA polymerase uses one strand of DNA as a template to assemble RNA. A ribosome later uses the messenger RNA to make a polypeptide.',
          ),
          question(
            'A single base substitution changes an mRNA codon but leaves the amino acid unchanged. Which property of the genetic code explains this?',
            ['Its codons overlap', 'Most codons are stop codons', 'More than one codon can specify the same amino acid', 'Each codon contains only one base'],
            2,
            'The genetic code is degenerate, meaning several codons can encode the same amino acid. A substitution that creates a synonymous codon leaves the protein sequence unchanged.',
          ),
        ],
      },
    ],
  },
];

const originalBanks = {
  mechanics: ['physics-3', 'physics-2', 'physics-3', 'physics-5'],
  waves: ['physics-7', 'physics-8', 'physics-8', 'physics-8'],
  electricity: ['physics-9', 'physics-10', 'physics-9', 'physics-10'],
  'amount-of-substance': ['chemistry-2', 'chemistry-2', 'chemistry-2', 'chemistry-2'],
  bonding: ['chemistry-3', 'chemistry-3', 'chemistry-3', 'chemistry-3'],
  energetics: ['chemistry-5', 'chemistry-5', 'chemistry-5', 'chemistry-8'],
  'biological-molecules': ['biology-3', 'biology-2', 'biology-2', 'biology-3'],
  'cells-and-transport': ['biology-4', 'biology-4', 'biology-4', 'biology-4'],
  genetics: ['biology-16', 'biology-16', 'biology-6', 'biology-6'],
};

export const originalRoundNames = Object.fromEntries(originalSubjects.flatMap(subject =>
  subject.topics.map(topic => [topic.id, topic.name]),
));

const entries = [];
for (const subject of originalSubjects) {
  for (const topic of subject.topics) {
    topic.questions.forEach((item, index) => {
      const id = topic.id + '-' + (index + 1);
      entries.push([id, { ...item, id, subjectId: subject.id, bank: originalBanks[topic.id][index] }]);
    });
  }
}

const newBanks = { ...physicsQuestions, ...chemistryQuestions, ...biologyQuestions, ...archiveQuestions };
for (const [bank, items] of Object.entries(newBanks)) {
  const [subjectId] = bank.split('-');
  items.forEach((item, index) => {
    const id = bank + '-q' + (index + 1);
    entries.push([id, { ...question(...item), id, subjectId, bank }]);
  });
}

const challengeCounts = new Map();
for (const item of [...physicsChallenge, ...chemistryChallenge, ...biologyChallenge, ...archiveChallenge, ...structuredChallenge]) {
  const index = (challengeCounts.get(item.bank) ?? 0) + 1;
  challengeCounts.set(item.bank, index);
  const id = item.id ?? item.bank + '-challenge-' + index;
  entries.push([id, { ...item, id, subjectId: item.bank.split('-')[0], level: 'challenge' }]);
}

const practiceBanks = [
  mechanicsPractice, wavePractice, circuitPractice, thermalPractice, modernPractice,
  mathematicsPaper1, mathematicsPaper2, mathematicsPaper3, mathematicsPaper4, mathematicsPaper5, mathematicsPaper6,
  chemistryExtraSimple, chemistryExtraChallenge, chemistryPracticeAsCore, chemistryPracticeAsOrganic,
  chemistryPracticeAPhysicalAndArchive, chemistryPracticeAOrganic,
  biologyExtra, biologyPracticeAsCore, biologyPracticeAAndArchive, scienceExtraArchive,
  economicsPractice, businessPractice,
];
for (const bank of practiceBanks) {
  for (const item of bank) {
    entries.push([item.id, { ...item, subjectId: item.bank.split('-')[0] }]);
  }
}

export const questions = Object.fromEntries(entries.map(([id, item]) => [id, { level: 'simple', ...item }]));
const questionsByBank = Object.groupBy(Object.values(questions), item => item.bank);

function questionsForBanks(banks) {
  return banks.flatMap(bank => questionsByBank[bank].map(item => item.id));
}

function indexSyllabus(source, sections) {
  const topics = sections.flatMap(section => section.groups.flatMap(group => group.topics));
  const questionIds = [...new Set(topics.flatMap(topic => topic.questionIds))];
  return { source, sections, topics, questionIds };
}

function buildSyllabus(subjectId, kindPrefix, syllabus) {
  const sections = syllabus.sections.map(section => ({
    ...section,
    groups: section.groups.map(group => ({
      ...group,
      topics: group.topics.map(topic => ({
        ...topic,
        id: `${kindPrefix}-${topic.number}`,
        subjectId,
        questionIds: questionsForBanks(topic.banks),
      })),
    })),
  }));
  return indexSyllabus(syllabus.source, sections);
}

const relatedArchiveBanks = {
  'physics-4': ['physics-forces'],
  'physics-21': ['physics-transformers'],
  'biology-9': ['biology-smoking'],
};

// Only the current syllabus is practised. Topics that exist only in older editions
// stay in the data (and in `topics`, so old saved rounds still have a name) but are not shown.
function mergeEditions(editions) {
  const current = editions[currentEdition];
  const sections = current.sections.map(section => ({
    ...section,
    groups: section.groups.map(group => ({
      ...group,
      topics: group.topics.map(topic => {
        const banks = topic.banks.flatMap(bank => [bank, ...(relatedArchiveBanks[bank] ?? [])]);
        return { ...topic, banks, questionIds: questionsForBanks(banks) };
      }),
    })),
  }));
  return indexSyllabus(current.source, sections);
}

export const subjects = syllabusSubjects.map(subject => {
  if (subject.syllabus) {
    return { ...subject, syllabus: buildSyllabus(subject.id, subject.id, subject.syllabus) };
  }
  const editions = Object.fromEntries(Object.entries(subject.editions).map(([id, syllabus]) => [
    id, buildSyllabus(subject.id, `${subject.id}-${id}`, syllabus),
  ]));
  return { ...subject, editions, syllabus: mergeEditions(editions) };
});

export const topics = subjects.flatMap(subject => [
  ...Object.values(subject.editions ?? {}).flatMap(edition => edition.topics),
  ...subject.syllabus.topics,
]);
