function group(name, rows) {
  return {
    name,
    topics: rows.map(([number, name, banks, level]) => ({
      number: String(number), name, banks: banks.split(' '), level,
    })),
  };
}

function sections(...groups) {
  return [{ name: 'Syllabus content', groups }];
}

const physics2016 = sections(group('', [
  [1, 'Physical quantities and units', 'physics-units', 'AS and A2'],
  [2, 'Measurement techniques', 'physics-measurement', 'AS and A2'],
  [3, 'Kinematics', 'physics-2', 'AS'],
  [4, 'Dynamics', 'physics-3', 'AS'],
  [5, 'Forces, density and pressure', 'physics-4', 'AS'],
  [6, 'Work, energy and power', 'physics-5', 'AS'],
  [7, 'Motion in a circle', 'physics-12', 'A2'],
  [8, 'Gravitational fields', 'physics-13', 'A2'],
  [9, 'Deformation of solids', 'physics-6', 'AS'],
  [10, 'Ideal gases', 'physics-15', 'A2'],
  [11, 'Temperature', 'physics-temperature', 'A2'],
  [12, 'Thermal properties of materials', 'physics-thermal physics-16', 'A2'],
  [13, 'Oscillations', 'physics-17', 'A2'],
  [14, 'Waves', 'physics-7', 'AS and A2'],
  [15, 'Superposition', 'physics-8', 'AS'],
  [16, 'Communication', 'physics-communication', 'A2'],
  [17, 'Electric fields', 'physics-18', 'AS and A2'],
  [18, 'Capacitance', 'physics-19', 'A2'],
  [19, 'Current of electricity', 'physics-9', 'AS and A2'],
  [20, 'D.C. circuits', 'physics-10', 'AS and A2'],
  [21, 'Electronics', 'physics-electronics', 'A2'],
  [22, 'Magnetic fields', 'physics-magnetic-fields physics-20 physics-charged-particles', 'A2'],
  [23, 'Electromagnetic induction', 'physics-induction', 'A2'],
  [24, 'Alternating currents', 'physics-21 physics-transformers', 'A2'],
  [25, 'Quantum physics', 'physics-22', 'A2'],
  [26, 'Particle and nuclear physics', 'physics-11 physics-23', 'AS and A2'],
]));

const physicsEarlier = [
  ['I General Physics', 'I General Physics', [
    [1, 'Physical quantities and units', 'Physical Quantities and Units', 'physics-units', 'AS and A2'],
    [2, 'Measurement techniques', 'Measurement Techniques', 'physics-measurement', 'AS and A2'],
  ]],
  ['II Newtonian mechanics', 'II Newtonian Mechanics', [
    [3, 'Kinematics', 'Kinematics', 'physics-2', 'AS'],
    [4, 'Dynamics', 'Dynamics', 'physics-3', 'AS'],
    [5, 'Forces', 'Forces', 'physics-forces', 'AS'],
    [6, 'Work, energy, power', 'Work, Energy, Power', 'physics-5', 'AS'],
    [7, 'Motion in a circle', 'Motion in a Circle', 'physics-12', 'A2'],
    [8, 'Gravitational field', 'Gravitational Field', 'physics-13', 'A2'],
  ]],
  ['III Matter', 'III Matter', [
    [9, 'Phases of matter', 'Phases of Matter', 'physics-phases', 'AS'],
    [10, 'Deformation of solids', 'Deformation of Solids', 'physics-6', 'AS'],
    [11, 'Ideal gases', 'Ideal Gases', 'physics-15', 'A2'],
    [12, 'Temperature', 'Temperature', 'physics-temperature', 'A2'],
    [13, 'Thermal properties of materials', 'Thermal Properties of Materials', 'physics-thermal physics-16', 'A2'],
  ]],
  ['IV Oscillations and waves', 'IV Oscillations and Waves', [
    [14, 'Oscillations', 'Oscillations', 'physics-17', 'A2'],
    [15, 'Waves', 'Waves', 'physics-7', 'AS'],
    [16, 'Superposition', 'Superposition', 'physics-8', 'AS'],
  ]],
  ['V Electricity and magnetism', 'V Electricity and Magnetism', [
    [17, 'Electric fields', 'Electric Fields', 'physics-18', 'AS and A2'],
    [18, 'Capacitance', 'Capacitance', 'physics-19', 'A2'],
    [19, 'Current of electricity', 'Current of Electricity', 'physics-9', 'AS'],
    [20, 'D.C. circuits', 'D.C. Circuits', 'physics-10', 'AS'],
    [21, 'Magnetic fields', 'Magnetic Fields', 'physics-magnetic-fields', 'A2'],
    [22, 'Electromagnetism', 'Electromagnetism', 'physics-20', 'A2'],
    [23, 'Electromagnetic induction', 'Electromagnetic Induction', 'physics-induction', 'A2'],
    [24, 'Alternating currents', 'Alternating Currents', 'physics-21 physics-transformers', 'A2'],
  ]],
  ['VI Modern Physics', 'VI Modern Physics', [
    [25, 'Charged particles', 'Charged Particles', 'physics-charged-particles', 'A2'],
    [26, 'Quantum physics', 'Quantum Physics', 'physics-22', 'A2'],
    [27, 'Nuclear physics', 'Nuclear Physics', 'physics-23', 'AS and A2'],
  ]],
  ['VII Gathering and communicating information', 'VII Gathering and Communicating Information', [
    [28, 'Direct sensing', 'Direct Sensing', 'physics-electronics physics-direct-sensing', 'A2'],
    [29, 'Remote sensing', 'Remote Sensing', 'physics-24', 'A2'],
    [30, 'Communicating information', 'Communicating Information', 'physics-communication', 'A2'],
  ]],
];

function earlierPhysics(use2008Headings) {
  return sections(...physicsEarlier.map(([name, name2008, topics]) => group(
    use2008Headings ? name2008 : name,
    topics.map(([number, title, title2008, banks, level]) => [
      number, use2008Headings ? title2008 : title, banks, level,
    ]),
  )));
}

const physicalChemistry = [
  [1, 'Atoms, molecules and stoichiometry', 'chemistry-2', 'AS'],
  [2, 'Atomic structure', 'chemistry-1', 'AS and A2'],
  [3, 'Chemical bonding', 'chemistry-3', 'AS'],
  [4, 'States of matter', 'chemistry-4', 'AS'],
  [5, 'Chemical energetics', 'chemistry-5 chemistry-23', 'AS and A2'],
  [6, 'Electrochemistry', 'chemistry-6 chemistry-24', 'AS and A2'],
  [7, 'Equilibria', 'chemistry-7 chemistry-25', 'AS and A2'],
  [8, 'Reaction kinetics', 'chemistry-8 chemistry-26', 'AS and A2'],
];

const chemistry2016 = sections(
  group('Physical chemistry', physicalChemistry),
  group('Inorganic chemistry', [
    [9, 'The Periodic Table: chemical periodicity', 'chemistry-9', 'AS'],
    [10, 'Group 2', 'chemistry-10 chemistry-27', 'AS and A2'],
    [11, 'Group 17', 'chemistry-11', 'AS'],
    [12, 'An introduction to the chemistry of transition elements', 'chemistry-28', 'A2'],
    [13, 'Nitrogen and sulfur', 'chemistry-12', 'AS'],
  ]),
  group('Organic chemistry and analysis', [
    [14, 'An introduction to organic chemistry', 'chemistry-13 chemistry-29', 'AS and A2'],
    [15, 'Hydrocarbons', 'chemistry-14 chemistry-30', 'AS and A2'],
    [16, 'Halogen derivatives', 'chemistry-15', 'AS'],
    [17, 'Hydroxy compounds', 'chemistry-16 chemistry-32', 'AS and A2'],
    [18, 'Carbonyl compounds', 'chemistry-17', 'AS'],
    [19, 'Carboxylic acids and derivatives', 'chemistry-18 chemistry-33', 'AS and A2'],
    [20, 'Nitrogen compounds', 'chemistry-19 chemistry-34', 'A2'],
    [21, 'Polymerisation', 'chemistry-35', 'A2'],
    [22, 'Analytical techniques', 'chemistry-22 chemistry-37', 'AS and A2'],
    [23, 'Organic synthesis', 'chemistry-21 chemistry-36', 'A2'],
  ]),
);

const chemistryEarlier = sections(
  group('Physical chemistry', physicalChemistry.map(([number, name, banks]) => [number, name, banks])),
  group('Inorganic chemistry', [
    ['9.1', 'The Periodic Table: chemical periodicity', 'chemistry-9'],
    ['9.2', 'Group II', 'chemistry-10 chemistry-27'],
    ['9.3', 'Group IV', 'chemistry-group-iv'],
    ['9.4', 'Group VII', 'chemistry-11'],
    ['9.5', 'An introduction to the chemistry of transition elements', 'chemistry-28'],
    ['9.6', 'Nitrogen and sulfur', 'chemistry-12'],
  ]),
  group('Organic chemistry', [
    ['10.1', 'Introductory topics', 'chemistry-13 chemistry-29'],
    ['10.2', 'Hydrocarbons', 'chemistry-14 chemistry-30'],
    ['10.3', 'Halogen derivatives', 'chemistry-15 chemistry-31'],
    ['10.4', 'Hydroxy compounds', 'chemistry-16 chemistry-32'],
    ['10.5', 'Carbonyl compounds', 'chemistry-17'],
    ['10.6', 'Carboxylic acids and derivatives', 'chemistry-18 chemistry-33'],
    ['10.7', 'Nitrogen compounds', 'chemistry-19 chemistry-34'],
    ['10.8', 'Polymerisation', 'chemistry-20 chemistry-35'],
  ]),
  group('Application of chemistry', [
    ['11.1', 'The chemistry of life', 'chemistry-life', 'A2'],
    ['11.2', 'Applications of analytical chemistry', 'chemistry-22 chemistry-37', 'A2'],
    ['11.3', 'Design and materials', 'chemistry-materials', 'A2'],
  ]),
);

const chemistry2008 = sections(...chemistryEarlier[0].groups.map(earlier => ({
  name: earlier.name === 'Application of chemistry' ? 'APPLICATIONS OF CHEMISTRY' : earlier.name.toUpperCase(),
  topics: earlier.topics.map(topic => ({
    ...topic,
    name: (topic.number === '9.6' ? 'Nitrogen and sulphur' : topic.name).toUpperCase(),
  })),
})));

const chemistry2013To2014 = sections(...chemistryEarlier[0].groups.map(earlier => ({
  name: earlier.name === 'Application of chemistry' ? 'Applications of chemistry' : earlier.name,
  topics: earlier.topics.map(topic => topic.number === '9.1'
    ? { ...topic, name: 'The periodic table: chemical periodicity' }
    : topic),
})));

function biology2016(currentSections) {
  const titles = {
    '9': 'Gas exchange and smoking',
    '10': 'Infectious disease',
    '15': 'Control and co-ordination',
    '16': 'Inherited change',
    '18': 'Biodiversity, classification and conservation',
  };
  return currentSections.map((section, index) => ({
    name: index === 0 ? 'AS Level Syllabus content' : 'A Level Syllabus content',
    groups: section.groups.map(group => ({
      ...group,
      topics: group.topics.map(topic => ({
        ...topic,
        name: titles[topic.number] ?? topic.name,
        banks: topic.number === '9' ? [...topic.banks, 'biology-smoking'] : topic.banks,
      })),
    })),
  }));
}

const biologyEarlier = sections(
  group('Core syllabus', [
    ['A', 'Cell Structure', 'biology-1', 'AS'],
    ['B', 'Biological Molecules', 'biology-2', 'AS'],
    ['C', 'Enzymes', 'biology-3', 'AS'],
    ['D', 'Cell Membranes and Transport', 'biology-4', 'AS'],
    ['E', 'Cell and Nuclear Division', 'biology-5', 'AS'],
    ['F', 'Genetic Control', 'biology-6', 'AS'],
    ['G', 'Transport', 'biology-7 biology-8', 'AS'],
    ['H', 'Gas Exchange', 'biology-9 biology-smoking', 'AS'],
    ['I', 'Infectious Disease', 'biology-10', 'AS'],
    ['J', 'Immunity', 'biology-11', 'AS'],
    ['K', 'Ecology', 'biology-ecology', 'AS'],
    ['L', 'Energy and Respiration', 'biology-12', 'A2'],
    ['M', 'Photosynthesis', 'biology-13', 'A2'],
    ['N', 'Regulation and Control', 'biology-14 biology-15', 'A2'],
    ['O', 'Inherited Change', 'biology-16', 'A2'],
    ['P', 'Selection and Evolution', 'biology-17', 'A2'],
  ]),
  group('Applications of Biology', [
    ['Q', 'Biodiversity and Conservation', 'biology-18', 'A2'],
    ['R', 'Gene Technology', 'biology-19', 'A2'],
    ['S', 'Biotechnology', 'biology-biotechnology', 'A2'],
    ['T', 'Crop Plants', 'biology-crops', 'A2'],
    ['U', 'Aspects of Human Reproduction', 'biology-reproduction', 'A2'],
  ]),
);

const xtreme = 'https://papers.xtremepape.rs/CAIE/AS%20and%20A%20Level/';
const justPastPapers = 'https://justpastpapers.com/wp-content/uploads/2014/10/';

export function archivedEditions(subject, currentSections) {
  switch (subject) {
    case 'physics': return {
      '2008': { source: xtreme + 'Physics%20%289702%29/9702_y08_sy.pdf', sections: earlierPhysics(true) },
      '2013': { source: 'https://theallpapers.com/papers/CIE/AS_and_ALevel/Physics%20%289702%29/9702_y13_sy_revised.pdf', sections: earlierPhysics(false) },
      '2014': { source: 'https://studylib.net/doc/12801588/syllabus-9702-cambridge-international-as-and-a-level-physics', sections: earlierPhysics(false) },
      '2015': { source: xtreme + 'Physics%20%289702%29/9702_y15_sy.pdf', sections: earlierPhysics(false) },
      '2016': { source: xtreme + 'Physics%20%289702%29/9702_y16_sy.pdf', sections: physics2016 },
      '2019': { source: 'https://www.globalcourse.in/courses/syllabus/cambridge/329533-2019-2021-syllabus.pdf', sections: physics2016 },
    };
    case 'chemistry': return {
      '2008': { source: xtreme + 'Chemistry%20%289701%29/9701_y08_sy.pdf', sections: chemistry2008 },
      '2013': { source: 'https://studylib.net/doc/12775381/syllabus-cambridge-international-a-andamp%3B-as-level-chemist...', sections: chemistry2013To2014 },
      '2014': { source: justPastPapers + '9701_y14_sy.pdf', sections: chemistry2013To2014 },
      '2015': { source: justPastPapers + '9701_y15_sy.pdf', sections: chemistryEarlier },
      '2016': { source: justPastPapers + '9701_y16-18_sy.pdf', sections: chemistry2016 },
      '2019': { source: 'https://bestexamhelp.com/exam/cambridge-international-a-level/chemistry-9701/others/9701_y21_sy.pdf', sections: chemistry2016 },
    };
    case 'biology': {
      const earlier = biology2016(currentSections);
      return {
        '2008': { source: xtreme + 'Biology%20%289700%29/9700_y08_sy.pdf', sections: biologyEarlier },
        '2013': { source: 'https://studylib.net/doc/12774227/syllabus-cambridge-international-a-andamp%3B-as-level-biology...', sections: biologyEarlier },
        '2014': { source: 'https://studylib.net/doc/12774230/syllabus-9700-cambridge-international-as-and-a-level-biology', sections: biologyEarlier },
        '2015': { source: xtreme + 'Biology%20%289700%29/9700_y15_sy.pdf', sections: biologyEarlier },
        '2016': { source: xtreme + 'Biology%20%289700%29/9700_y16_sy.pdf', sections: earlier },
        '2019': { source: 'https://www.cambridgeinternational.org/Images/329527-2019-2021-syllabus.pdf', sections: earlier },
      };
    }
  }
}
