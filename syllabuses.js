import { archivedEditions } from './syllabus-archives.js';
import { mathematicsSubject } from './mathematics-syllabus.js';

const cambridge = 'https://www.cambridgeinternational.org/Images/';

export const currentEdition = '2025';

const physicsBanks = {
  'physics-1': ['physics-units', 'physics-measurement'],
  'physics-14': ['physics-temperature', 'physics-thermal'],
  'physics-20': ['physics-magnetic-fields', 'physics-20', 'physics-induction', 'physics-charged-particles'],
};

function numberedGroup(subject, firstNumber, names, name = '') {
  const topics = names.map((name, index) => {
    const number = String(firstNumber + index);
    const bank = subject + '-' + number;
    return { number, name, banks: physicsBanks[bank] ?? [bank] };
  });
  return { name, topics };
}

const physicsSections = [
  {
    name: 'AS Level subject content',
    groups: [numberedGroup('physics', 1, [
      'Physical quantities and units',
      'Kinematics',
      'Dynamics',
      'Forces, density and pressure',
      'Work, energy and power',
      'Deformation of solids',
      'Waves',
      'Superposition',
      'Electricity',
      'D.C. circuits',
      'Particle physics',
    ])],
  },
  {
    name: 'A Level subject content',
    groups: [numberedGroup('physics', 12, [
      'Motion in a circle',
      'Gravitational fields',
      'Temperature',
      'Ideal gases',
      'Thermodynamics',
      'Oscillations',
      'Electric fields',
      'Capacitance',
      'Magnetic fields',
      'Alternating currents',
      'Quantum physics',
      'Nuclear physics',
      'Medical physics',
      'Astronomy and cosmology',
    ])],
  },
];

const chemistrySections = [
  {
    name: 'AS Level subject content',
    groups: [
      numberedGroup('chemistry', 1, [
        'Atomic structure',
        'Atoms, molecules and stoichiometry',
        'Chemical bonding',
        'States of matter',
        'Chemical energetics',
        'Electrochemistry',
        'Equilibria',
        'Reaction kinetics',
      ], 'Physical chemistry'),
      numberedGroup('chemistry', 9, [
        'The Periodic Table: chemical periodicity',
        'Group 2',
        'Group 17',
        'Nitrogen and sulfur',
      ], 'Inorganic chemistry'),
      numberedGroup('chemistry', 13, [
        'An introduction to AS Level organic chemistry',
        'Hydrocarbons',
        'Halogen compounds',
        'Hydroxy compounds',
        'Carbonyl compounds',
        'Carboxylic acids and derivatives',
        'Nitrogen compounds',
        'Polymerisation',
        'Organic synthesis',
      ], 'Organic chemistry'),
      numberedGroup('chemistry', 22, ['Analytical techniques'], 'Analysis'),
    ],
  },
  {
    name: 'A Level subject content',
    groups: [
      numberedGroup('chemistry', 23, [
        'Chemical energetics',
        'Electrochemistry',
        'Equilibria',
        'Reaction kinetics',
      ], 'Physical chemistry'),
      numberedGroup('chemistry', 27, [
        'Group 2',
        'Chemistry of transition elements',
      ], 'Inorganic chemistry'),
      numberedGroup('chemistry', 29, [
        'An introduction to A Level organic chemistry',
        'Hydrocarbons',
        'Halogen compounds',
        'Hydroxy compounds',
        'Carboxylic acids and derivatives',
        'Nitrogen compounds',
        'Polymerisation',
        'Organic synthesis',
      ], 'Organic chemistry'),
      numberedGroup('chemistry', 37, ['Analytical techniques'], 'Analysis'),
    ],
  },
];

const biologySections = [
  {
    name: 'AS Level subject content',
    groups: [numberedGroup('biology', 1, [
      'Cell structure',
      'Biological molecules',
      'Enzymes',
      'Cell membranes and transport',
      'The mitotic cell cycle',
      'Nucleic acids and protein synthesis',
      'Transport in plants',
      'Transport in mammals',
      'Gas exchange',
      'Infectious diseases',
      'Immunity',
    ])],
  },
  {
    name: 'A Level subject content',
    groups: [numberedGroup('biology', 12, [
      'Energy and respiration',
      'Photosynthesis',
      'Homeostasis',
      'Control and coordination',
      'Inheritance',
      'Selection and evolution',
      'Classification, biodiversity and conservation',
      'Genetic technology',
    ])],
  },
];

// Each station contains a starter set rather than every syllabus subtopic.
function courseSections(subject, asNames, aNames) {
  return [
    { name: 'AS Level subject content', groups: [numberedGroup(subject, 1, asNames)] },
    { name: 'A Level subject content', groups: [numberedGroup(subject, asNames.length + 1, aNames)] },
  ];
}

const economicsSections = courseSections('economics', [
  'Basic economic ideas and resource allocation', 'The price system and the microeconomy',
  'Government microeconomic intervention', 'The macroeconomy',
  'Government macroeconomic intervention', 'International economic issues',
], [
  'The price system and the microeconomy', 'Government microeconomic intervention',
  'The macroeconomy', 'Government macroeconomic intervention', 'International economic issues',
]);

const businessSections = courseSections('business', [
  'Business and its environment', 'Human resource management', 'Marketing', 'Operations management', 'Finance and accounting',
], [
  'Business and its environment', 'Human resource management', 'Marketing', 'Operations management', 'Finance and accounting',
]);

function publishedEditions(sections, files) {
  return Object.fromEntries(Object.entries(files).map(([edition, file]) => [
    edition, { source: cambridge + file, sections },
  ]));
}

export const syllabusSubjects = [
  {
    id: 'physics',
    name: 'Physics',
    icon: 'atom',
    code: '9702',
    description: 'Motion, matter, fields and the universe.',
    editions: {
      ...archivedEditions('physics', physicsSections),
      ...publishedEditions(physicsSections, {
        '2022': '554625-2022-2024-syllabus.pdf',
        '2025': '664565-2025-2027-syllabus.pdf',
        '2028': '744626-2028-2030-syllabus.pdf',
      }),
    },
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: 'flask',
    code: '9701',
    description: 'Physical, inorganic and organic chemistry, plus analysis.',
    editions: {
      ...archivedEditions('chemistry', chemistrySections),
      ...publishedEditions(chemistrySections, {
        '2022': '554616-2022-2024-syllabus.pdf',
        '2025': '664563-2025-2027-syllabus.pdf',
        '2028': '744624-2028-2030-syllabus.pdf',
      }),
    },
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: 'leaf',
    code: '9700',
    description: 'Cells, organisms, inheritance and biodiversity.',
    editions: {
      ...archivedEditions('biology', biologySections),
      ...publishedEditions(biologySections, {
        '2022': '554607-2022-2024-syllabus.pdf',
        '2025': '664560-2025-2027-syllabus.pdf',
        '2028': '744622-2028-2030-syllabus.pdf',
      }),
    },
  },
  mathematicsSubject,
  {
    id: 'economics', name: 'Economics', icon: 'chart', code: '9708',
    description: 'Markets, policy and the global economy.',
    syllabus: { source: cambridge + '697423-2026-2028-syllabus.pdf', sections: economicsSections },
    practiceNote: 'Starter questions across the main 2026–2028 syllabus topics. Economics exams also include data response and essays.',
  },
  {
    id: 'business', name: 'Business', icon: 'books', code: '9609',
    description: 'Enterprise, people, markets, operations and finance.',
    syllabus: { source: cambridge + '697371-2026-2028-syllabus.pdf', sections: businessSections },
    practiceNote: 'Starter quizzes across the main 2026–2028 syllabus topics. Business exams use written answers and case studies, so practise those separately too.',
  },
];
