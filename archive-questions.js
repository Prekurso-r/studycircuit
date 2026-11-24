export const archiveQuestions = {
  'physics-forces': [
    [
      'Which conditions are required for a rigid body to be in static equilibrium?',
      ['Zero resultant force only', 'Zero resultant moment only', 'Zero velocity and non-zero resultant force', 'Zero resultant force and zero resultant moment'],
      3,
      'Zero resultant force prevents translational acceleration. Zero resultant moment prevents angular acceleration.',
    ],
    [
      'A force of 20 N acts perpendicular to a beam, 0.30 m from a pivot. What is its moment about the pivot?',
      ['6.0 N m', '20.3 N m', '67 N m', '0.015 N m'],
      0,
      'The moment is the force multiplied by the perpendicular distance from the pivot to its line of action, 20 × 0.30 = 6.0 N m.',
    ],
  ],
  'physics-phases': [
    [
      'A sample has a fixed volume but takes the shape of its container. Which state of matter does this describe?',
      ['Solid', 'Liquid', 'Gas', 'Both solids and gases'],
      1,
      'Liquid particles stay close together but can move past each other. The liquid keeps its volume while taking the container’s shape.',
    ],
    [
      'A 54 g solid has a volume of 20 cm³. What is its density?',
      ['0.37 g cm⁻³', '1.08 g cm⁻³', '2.7 g cm⁻³', '34 g cm⁻³'],
      2,
      'Density is mass divided by volume. The ratio 54 ÷ 20 gives 2.7 g cm⁻³.',
    ],
  ],
  'physics-magnetic-fields': [
    [
      'What does a magnetic field line indicate at a point?',
      ['The direction of an isolated north pole’s force', 'The direction of an electron’s velocity', 'The direction that maximises electric force', 'The direction towards the nearest magnet'],
      0,
      'The tangent to the line gives the magnetic field direction, defined as the direction of force on an ideal north pole.',
    ],
    [
      'What is the shape of magnetic field lines around a long straight current-carrying wire?',
      ['Straight lines parallel to the wire', 'Radial lines pointing away from the wire', 'Straight lines pointing towards the wire', 'Circles centred on the wire'],
      3,
      'The field forms concentric circles around the wire in planes perpendicular to it. The right-hand grip rule gives the direction.',
    ],
  ],
  'physics-charged-particles': [
    [
      'An electron enters a uniform magnetic field at right angles to the field. What happens to its speed and direction?',
      ['Both stay constant', 'Its speed stays constant and its direction changes', 'Its speed increases and its direction stays constant', 'Its speed decreases and its direction changes'],
      1,
      'The magnetic force is perpendicular to the electron’s velocity. It changes the direction of motion and does no work, so the speed is constant.',
    ],
    [
      'A charged particle travels in a circle in a uniform magnetic field. What happens to the radius if its speed doubles while its mass, charge and field strength are fixed?',
      ['It halves', 'It quadruples', 'It doubles', 'It stays constant'],
      2,
      'Equating qvB with mv²/r gives r = mv/(qB). The radius is proportional to speed.',
    ],
  ],
  'physics-electronics': [
    [
      'An ideal operational amplifier is used as a comparator. What happens when its non-inverting input is above its inverting input?',
      ['The output saturates towards the positive supply', 'The output is always zero', 'The output saturates towards the negative supply', 'Both input voltages become zero'],
      0,
      'With no negative feedback, the large open-loop gain drives the output towards the positive supply for a positive difference between the inputs.',
    ],
    [
      'An ideal inverting amplifier has an input resistor of 10 kΩ and a feedback resistor of 40 kΩ. What is its voltage gain?',
      ['+4', '−0.25', '+0.25', '−4'],
      3,
      'The gain is −Rf/Rin = −40/10 = −4. The minus sign indicates inversion.',
    ],
  ],
  'physics-direct-sensing': [
    [
      'In a light sensor, why can a light-dependent resistor and a fixed resistor form a useful potential divider?',
      ['Light changes both resistor values in exactly the same way', 'The changing resistance of the sensor changes the output voltage', 'The current must be zero in both resistors', 'The light-dependent resistor provides its own supply voltage'],
      1,
      'The sensor’s resistance changes with light level. The proportion of supply voltage across it changes, providing a measurable electrical signal.',
    ],
  ],
  'physics-communication': [
    [
      'In frequency modulation, which property of the carrier changes in response to the signal?',
      ['Mean amplitude', 'Direction of propagation', 'Frequency', 'Speed in a vacuum'],
      2,
      'Frequency modulation encodes information by varying the carrier frequency around its unmodulated value.',
    ],
    [
      'How is light kept inside the core of a simple optical fibre?',
      ['By total internal reflection at the core–cladding boundary', 'By diffraction across the cladding', 'By repeated absorption and emission in the core', 'By reflection from an electric field'],
      0,
      'The core has a higher refractive index than the cladding. A ray incident above the critical angle undergoes total internal reflection.',
    ],
  ],
  'chemistry-group-iv': [
    [
      'Which oxidation state becomes more stable relative to +4 down Group IV (Group 14), especially for lead?',
      ['−4', '+1', '+3', '+2'],
      3,
      'The outer s-electron pair is increasingly reluctant to take part in bonding down the group. This favours the +2 state for lead.',
    ],
    [
      'Why does silicon dioxide have a much higher melting point than carbon dioxide?',
      ['Silicon dioxide is a simple molecular solid', 'Silicon dioxide forms a giant covalent structure', 'Carbon dioxide is a metallic solid', 'Carbon dioxide has stronger intermolecular forces than covalent bonds'],
      1,
      'Melting silica requires disrupting a covalent network. Solid carbon dioxide consists of separate molecules held by much weaker intermolecular forces.',
    ],
  ],
  'chemistry-life': [
    [
      'Which attraction between complementary bases stabilises the pairing of the two strands of DNA?',
      ['Metallic bonding', 'Ionic bonding between the bases', 'Hydrogen bonding', 'Peptide bonding'],
      2,
      'Complementary bases form hydrogen bonds across the two strands. Covalent phosphodiester bonds link nucleotides along each strand.',
    ],
    [
      'What type of bond links adjacent amino acids in protein primary structure?',
      ['Peptide bond', 'Hydrogen bond', 'Glycosidic bond', 'Disulfide bond'],
      0,
      'A peptide bond is a covalent amide linkage formed between the carboxyl group of one amino acid and the amino group of the next.',
    ],
  ],
  'chemistry-materials': [
    [
      'Which feature of a polyester backbone can allow the chain to break down by hydrolysis?',
      ['It consists entirely of C–C bonds', 'It has no polar bonds', 'It has no functional groups in the backbone', 'It contains hydrolysable ester linkages'],
      3,
      'Breaking an ester linkage by hydrolysis splits the chain. A backbone containing only C–C bonds lacks those hydrolysable groups.',
    ],
    [
      'Why can cross-linked polymer chains be less flexible than otherwise similar chains without cross-links?',
      ['Cross-links reduce the length of all covalent bonds', 'Links between the chains restrict their movement', 'Cross-links turn the polymer into separated monomers', 'Cross-links remove all bonding between chains'],
      1,
      'Cross-links connect neighbouring chains and limit how freely they can slide past one another when the material is deformed.',
    ],
  ],
  'biology-smoking': [
    [
      'Why can carbon monoxide in cigarette smoke reduce the amount of oxygen carried by blood?',
      ['It reduces the number of capillaries immediately', 'It replaces oxygen in alveolar gas with water', 'It binds strongly to haemoglobin', 'It breaks every haemoglobin molecule apart'],
      2,
      'Carbon monoxide forms carboxyhaemoglobin. This occupies haemoglobin binding sites and reduces the blood’s capacity to carry oxygen.',
    ],
  ],
  'biology-ecology': [
    [
      'What name is given to the population size of a species that a habitat can sustain over time?',
      ['Carrying capacity', 'Species richness', 'Trophic level', 'Ecological succession'],
      0,
      'The carrying capacity reflects the resources and conditions available. Limiting factors slow population growth as this size is approached.',
    ],
    [
      'Why is less energy available at the next trophic level in a food chain?',
      ['Predators use all available energy for growth', 'Energy disappears from the ecosystem without transfer', 'Every part of every organism is digested', 'Organisms respire and some biomass is left uneaten or undigested'],
      3,
      'Energy is transferred to the surroundings during respiration. Uneaten or undigested biomass also diverts energy from the next trophic level.',
    ],
  ],
  'biology-biotechnology': [
    [
      'Why can immobilising an enzyme make it easier to use repeatedly in an industrial process?',
      ['It replaces the enzyme with substrate', 'The enzyme can be separated from the product and reused', 'It stops the enzyme binding its substrate', 'It removes the enzyme’s need for an active site'],
      1,
      'An immobilised enzyme is attached to or trapped in an insoluble support. The product can be collected while the enzyme stays in the system.',
    ],
  ],
  'biology-crops': [
    [
      'Which feature of maize leaves reduces photorespiration under hot, bright conditions?',
      ['Water moves only by diffusion through xylem', 'Stomata remain closed permanently', 'The C₄ pathway concentrates carbon dioxide around Rubisco', 'The light-dependent reactions take place in roots'],
      2,
      'In C₄ plants carbon dioxide is first fixed into a four-carbon compound. Carbon dioxide is released in bundle-sheath cells, increasing its concentration near Rubisco.',
    ],
  ],
  'biology-reproduction': [
    [
      'Which hormonal change normally triggers ovulation in the human menstrual cycle?',
      ['A surge in luteinising hormone', 'A fall in luteinising hormone', 'A surge in insulin', 'A fall in ADH'],
      0,
      'The mid-cycle LH surge stimulates the mature follicle to release an oocyte.',
    ],
    [
      'What is the main role of progesterone from the corpus luteum in the second half of the menstrual cycle?',
      ['It stimulates release of a second oocyte immediately', 'It prevents the uterus receiving any blood', 'It causes immediate breakdown of the endometrium', 'It helps maintain the endometrium'],
      3,
      'Progesterone keeps the uterine lining suitable for implantation. A fall in progesterone contributes to menstruation when pregnancy has not begun.',
    ],
  ],
};
