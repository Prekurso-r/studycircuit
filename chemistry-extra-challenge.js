import { plotFigure } from './physics-practice-tools.js';

// Original practice aligned to the Cambridge 9701 subject-content outline.
function item(topic, slug, prompt, options, answer, explanation, figure) {
  return {
    id: 'chemistry-extra-challenge-' + slug,
    bank: 'chemistry-' + topic,
    level: 'challenge',
    prompt,
    options,
    answer,
    explanation,
    ...(figure && { figure }),
  };
}

function numerical(topic, slug, prompt, parts, explanation, figure) {
  return {
    id: 'chemistry-extra-challenge-' + slug,
    bank: 'chemistry-' + topic,
    level: 'challenge',
    prompt,
    parts,
    explanation,
    ...(figure && { figure }),
  };
}

function part(label, unit, answer, tolerance = 0) {
  return { label, unit, answer, tolerance };
}

function table(caption, headers, rows) {
  return { caption, headers, rows };
}

function diagram(caption, alt, drawing) {
  return {
    caption,
    alt,
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 216" role="img"><title>' +
      alt + '</title><g fill="currentColor" font-family="system-ui, sans-serif" font-size="15">' +
      drawing + '</g></svg>',
  };
}

const gasCurve = plotFigure({
  caption: 'Gas volume against time. The dashed line is the initial tangent.',
  alt: 'The curve starts at zero, reaches about 48 cubic centimetres at 40 seconds and levels off near 60 cubic centimetres. The dashed initial tangent passes through the origin and the point at 20 seconds and 48 cubic centimetres.',
  xLabel: 'Time / s', yLabel: 'Volume / cm³',
  xTicks: [0, 20, 40, 60, 80, 100], yTicks: [0, 12, 24, 36, 48, 60],
  traces: [
    { points: Array.from({ length: 51 }, (_, index) => {
      const t = 2 * index;
      return [t, 60 * (1 - Math.exp(-t / 25))];
    }), markers: false },
    { points: [[0, 0], [20, 48]] },
  ],
});

const propaneHess = diagram('Standard enthalpies of combustion to a common set of products',
  'The top left box contains three carbon atoms and four hydrogen molecules. The top right box contains one propane molecule. Both have arrows to three carbon dioxide and four water molecules.',
  '<g fill="none" stroke="currentColor" stroke-width="2">' +
  '<rect x="32" y="25" width="159" height="44" rx="7"/><rect x="299" y="25" width="141" height="44" rx="7"/>' +
  '<rect x="141" y="147" width="188" height="44" rx="7"/><path d="M191 47H299m-8-5 8 5-8 5M109 69l79 78m-3-9 3 9-9-3M373 69l-85 78m9-3-9 3 3-9"/>' +
  '</g><text x="49" y="52">3C(s) + 4H₂(g)</text><text x="339" y="52">C₃H₈(g)</text>' +
  '<text x="152" y="175">3CO₂(g) + 4H₂O(l)</text><text x="224" y="36">ΔH°f</text>' +
  '<text x="37" y="118">−2326</text><text x="359" y="118">−2220</text><text x="344" y="202">kJ mol⁻¹</text>');

const additionFragment = diagram('Part of an addition polymer chain',
  'Four successive backbone CH units carry side groups in the order fluorine, methyl, fluorine, methyl. The pattern continues at each end.',
  '<path d="M22 111h39m28 0h62m28 0h62m28 0h62m28 0h75M75 94V65M165 94V65M255 94V65M345 94V65" fill="none" stroke="currentColor" stroke-width="2.5"/>' +
  '<text x="62" y="116">CH</text><text x="152" y="116">CH</text><text x="242" y="116">CH</text><text x="332" y="116">CH</text>' +
  '<text x="71" y="55">F</text><text x="148" y="55">CH₃</text><text x="251" y="55">F</text><text x="328" y="55">CH₃</text>');

const infrared = diagram('Selected region of an infrared spectrum',
  'There is a broad absorption from roughly 3300 to 2500 inverse centimetres, and a strong narrow absorption at 1710 inverse centimetres.',
  '<path d="M48 23V166H447" fill="none" stroke="currentColor" stroke-width="2"/>' +
  '<path d="M49 49H112C141 49 154 105 177 114C210 122 218 53 253 50L298 50Q307 51 313 139Q319 150 325 52L439 50" fill="none" stroke="currentColor" stroke-width="3"/>' +
  '<path d="M114 168v-10m133 10v-10m68 10v-10" fill="none" stroke="currentColor" stroke-width="2"/>' +
  '<text x="53" y="19">Transmittance</text><text x="97" y="186">3300</text><text x="228" y="186">2500</text><text x="297" y="186">1710</text>' +
  '<text x="243" y="208">Wavenumber / cm⁻¹</text>');

export const chemistryExtraChallenge = [
  item(1, 'isoelectronic-calcium', 'An isotope of X forms X²⁺, which has the same number of electrons as argon (Z = 18). The isotope has mass number 44. How many neutrons does it contain and how does the radius of X²⁺ compare with the radius of X?',
    ['24 neutrons, X²⁺ is smaller', '26 neutrons, X²⁺ is smaller', '24 neutrons, X²⁺ is larger', '22 neutrons, X²⁺ is larger'], 0,
    'A 2+ ion has two fewer electrons than its neutral atom, so X has 20 protons. The isotope therefore has 44 − 20 = 24 neutrons. Forming this ion empties its outer 4s subshell, leaving a smaller ion.'),
  item(1, 'isoelectronic-d-shell', 'Fe has Z = 26 and Mn has Z = 25. Which statement describes Fe³⁺ and Mn²⁺ in their ground states?',
    ['Fe³⁺ is [Ar]3d⁶ and Mn²⁺ is [Ar]3d⁵.', 'Both are [Ar]3d⁵, with one electron in each 3d orbital.', 'Both are [Ar]3d⁵, with two doubly occupied 3d orbitals.', 'Fe³⁺ is [Ar]3d⁵ and Mn²⁺ is [Ar]3d³4s².'], 1,
    'Each ion has 23 electrons. The 4s electrons are removed before the 3d electrons. The five remaining 3d electrons occupy the five orbitals singly before pairing.'),

  numerical(2, 'two-endpoints', 'A 25.0 cm³ aliquot contains NaOH and Na₂CO₃. In a titration with 0.100 mol dm⁻³ HCl, the first endpoint occurs after 22.00 cm³, when all OH⁻ has reacted and all CO₃²⁻ has become HCO₃⁻. The total volume at the second endpoint is 36.00 cm³, when all HCO₃⁻ has reacted.',
    [part('Calculate the original concentration of Na₂CO₃.', 'mol dm⁻³', 0.056, 0.00025), part('Calculate the original concentration of NaOH.', 'mol dm⁻³', 0.032, 0.00025)],
    'The additional 14.00 cm³ supplies 1.400 mmol H⁺ to the bicarbonate. This equals the original amount of carbonate. At the first endpoint, 2.200 mmol H⁺ has reacted with 1.400 mmol carbonate and 0.800 mmol hydroxide. Dividing by 0.0250 dm³ gives 0.0560 mol dm⁻³ and 0.0320 mol dm⁻³ respectively.'),
  item(2, 'hydrate-stages', 'A 2.46 g sample of MgSO₄·xH₂O is heated. After some water is lost the mass is 1.56 g, and after complete dehydration it is 1.20 g. Use Mᵣ(MgSO₄) = 120 and Mᵣ(H₂O) = 18. What are the initial value of x and the value after the first heating stage?',
    ['5 and 2', '7 and 5', '7 and 2', '2 and 7'], 2,
    'The sample contains 0.0100 mol MgSO₄ throughout. Initially it contains (2.46 − 1.20)/18 = 0.0700 mol H₂O. After the first stage it contains (1.56 − 1.20)/18 = 0.0200 mol H₂O. The corresponding mole ratios are 7 and 2.'),

  item(3, 'xenon-sulfur-fluorides', 'XeF₄ and SF₄ both have four bonding pairs around the central atom. Xe contributes eight valence electrons and S contributes six. Which prediction follows from electron-pair repulsion?',
    ['Both molecules are tetrahedral and non-polar.', 'XeF₄ is square planar and non-polar. SF₄ is seesaw-shaped and polar.', 'XeF₄ is seesaw-shaped and polar. SF₄ is square planar and non-polar.', 'Both molecules are square planar and non-polar.'], 1,
    'XeF₄ has two lone pairs opposite each other in an octahedral arrangement of electron pairs. Its four bond dipoles cancel in the square plane. SF₄ has one equatorial lone pair in a trigonal bipyramidal arrangement, giving a seesaw in which the bond dipoles do not cancel.'),
  item(3, 'nitrogen-oxide-ions', 'Which row gives the shape of NO₂⁺ and the shape of NO₂⁻? Assume that nitrogen is the central atom in both and each obeys the octet rule.',
    ['Bent, bent', 'Bent, linear', 'Linear, linear', 'Linear, bent'], 3,
    'NO₂⁺ has 16 valence electrons and can be drawn O=N⁺=O. There are two regions of electron density around N and no lone pair. NO₂⁻ has 18 valence electrons and N has one lone pair in addition to two bonding regions, giving a bent ion.'),

  numerical(4, 'real-gas-compressibility', 'One mole of a gas is held at 300 K in each trial. For an ideal gas, pV/(nRT) = 1. Use R = 8.31 J mol⁻¹ K⁻¹.',
    [part('Calculate pV/(nRT) at 1000 kPa.', '(ratio)', 0.943, 0.003), part('Calculate pV/(nRT) at 8000 kPa.', '(ratio)', 1.13, 0.005)],
    'Multiplying the pressure in kPa by the volume in dm³ gives pV in joules. The ideal value of nRT is 2493 J. The ratios are 2350/2493 = 0.943 and 2816/2493 = 1.13. Attraction can reduce pV below the ideal value at intermediate pressure. At high pressure, repulsion and the volume occupied by the molecules can raise pV.',
    table('Measured gas volumes', ['Pressure / kPa', 'Volume / dm³'], [['100', '24.8'], ['1000', '2.35'], ['8000', '0.352']])),
  item(4, 'conductivity-structures', 'Four solids have the properties shown. Which samples are consistent with silicon dioxide and potassium bromide, respectively?',
    ['B and C', 'A and B', 'C and D', 'C and B'], 3,
    'Silicon dioxide is giant covalent, with a high melting point and no mobile charge carriers, matching C. Potassium bromide is ionic. Its ions are fixed in the solid and mobile in the liquid, matching B.',
    table('Properties of four samples', ['Sample', 'Melting point', 'Solid conducts', 'Liquid conducts'], [
      ['A', 'Low', 'No', 'No'], ['B', 'High', 'No', 'Yes'], ['C', 'High', 'No', 'No'], ['D', 'High', 'Yes', 'Yes'],
    ])),

  item(5, 'propane-hess', 'The diagram gives the enthalpy changes for complete combustion of three moles of carbon plus four moles of hydrogen and for combustion of one mole of propane. What is the standard enthalpy of formation of propane?',
    ['+106 kJ mol⁻¹', '−106 kJ mol⁻¹', '−4546 kJ mol⁻¹', '+4546 kJ mol⁻¹'], 1,
    'The indirect route from the elements to the combustion products goes through propane. Its total enthalpy change is ΔH°f − 2220, equal to −2326 kJ mol⁻¹. Thus ΔH°f = −106 kJ mol⁻¹.', propaneHess),
  numerical(5, 'heat-neutralisation', 'A student mixes 40.0 cm³ of 0.800 mol dm⁻³ HCl and 60.0 cm³ of 0.400 mol dm⁻³ NaOH. The temperature rises by 3.27 °C. Take the final volume as 100.0 cm³, density as 1.00 g cm⁻³ and specific heat capacity as 4.18 J g⁻¹ K⁻¹. Neglect heat loss.',
    [part('Calculate the heat gained by the solution.', 'kJ', 1.37, 0.007), part('Calculate the signed enthalpy change per mole of water formed.', 'kJ mol⁻¹', -57.0, 0.3)],
    'The solution gains 100.0 × 4.18 × 3.27 = 1367 J. HCl supplies 0.0320 mol and NaOH supplies 0.0240 mol, so 0.0240 mol of water forms. The chemical reaction loses heat. Its enthalpy change is −1.367/0.0240 = −57.0 kJ mol⁻¹.'),

  item(6, 'manganese-dioxide-balance', 'In the ionic reaction of MnO₂ with Fe²⁺ and H⁺, manganese ends as Mn²⁺ and iron as Fe³⁺. Which pair gives the Fe²⁺ and H⁺ coefficients when the coefficient of MnO₂ is 1?',
    ['Fe²⁺: 1, H⁺: 2', 'Fe²⁺: 2, H⁺: 2', 'Fe²⁺: 2, H⁺: 4', 'Fe²⁺: 4, H⁺: 2'], 2,
    'Mn(+4) gains two electrons to form Mn²⁺, so two Fe²⁺ ions each lose one. The oxygens form two water molecules, requiring four H⁺. The equation is MnO₂ + 2Fe²⁺ + 4H⁺ → Mn²⁺ + 2Fe³⁺ + 2H₂O.'),
  item(6, 'cerium-sulfite', 'Ce⁴⁺ is reduced to Ce³⁺ as SO₃²⁻ is oxidised to SO₄²⁻ in an aqueous redox reaction. Which statement gives the mole ratio Ce⁴⁺ : SO₃²⁻ and identifies the reducing agent?',
    ['1:2, sulfite', '2:1, Ce⁴⁺', '1:1, Ce⁴⁺', '2:1, sulfite'], 3,
    'Sulfur changes from +4 to +6, so one sulfite ion supplies two electrons. Each Ce⁴⁺ accepts one. Sulfite is oxidised and acts as the reducing agent.'),

  item(7, 'equilibrium-dilution', 'A(aq) + B(aq) ⇌ C(aq) is at equilibrium with concentrations 0.400, 0.600 and 0.120 mol dm⁻³ respectively. The volume is doubled by adding water at constant temperature. Which pair gives the value of [C]/([A][B]) immediately after dilution and the subsequent shift?',
    ['0.250 dm³ mol⁻¹, towards C', '0.500 dm³ mol⁻¹, no shift', '1.00 dm³ mol⁻¹, towards A and B', '1.00 dm³ mol⁻¹, towards C'], 2,
    'Initially Kc = 0.120/(0.400 × 0.600) = 0.500 dm³ mol⁻¹. Dilution halves each concentration, so the ratio doubles to 1.00 dm³ mol⁻¹. C is then consumed to restore the equilibrium ratio.'),
  item(7, 'inert-gas-equilibrium', 'Consider the equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g). Helium is added at fixed temperature, first in a rigid vessel in one trial and then at constant total pressure under a freely moving piston in a separate trial. Helium does not react. What happens?',
    ['The equilibrium shifts towards SO₃ in both trials.', 'There is no shift in the rigid vessel. In the piston trial, the equilibrium shifts towards SO₂ and O₂.', 'The equilibrium shifts towards SO₃ in the rigid vessel. There is no shift in the piston trial.', 'The equilibrium shifts towards SO₂ and O₂ in the rigid vessel and towards SO₃ in the piston trial.'], 1,
    'In the rigid vessel the partial pressures of the reacting gases stay the same. At constant total pressure the added helium expands the piston volume and reduces each of those partial pressures. The equilibrium then favours the side with more moles of gas.'),

  item(8, 'tangent-and-yield', 'Estimate the initial rate of gas production. What percentage of the final gas volume has been collected after 40 s, to the nearest 10%?',
    ['1.2 cm³ s⁻¹ and 80%', '2.4 cm³ s⁻¹ and 80%', '2.4 cm³ s⁻¹ and 60%', '3.0 cm³ s⁻¹ and 100%'], 1,
    'The dashed tangent gives an initial rate of 48/20 = 2.4 cm³ s⁻¹. At 40 s the volume is about 48 cm³, which is about 80% of the final 60 cm³.',
    gasCurve),
  item(8, 'heat-versus-catalyst', 'Three runs start with equal amounts of reactants. A is at 298 K, B is at 318 K with no catalyst, and C is at 298 K with a catalyst. B and C have the same initial rate. Which comparison is correct?',
    ['B and C lower the activation energy by the same amount.', 'B has a larger activation energy than A. C increases the energy of all molecules.', 'B and C increase the average kinetic energy by the same amount.', 'B increases average kinetic energy. C lowers the activation energy without changing the distribution of molecular kinetic energies at 298 K.'], 3,
    'Heating redistributes molecular kinetic energies, increasing the fraction above the existing activation energy. At a fixed temperature a catalyst provides a pathway with a lower activation energy, so more molecules can react even though the energy distribution is unchanged.'),

  item(9, 'chloride-hydrolysis', 'Two Period 3 chlorides are compared. P dissolves in water to give a nearly neutral solution. Q reacts with water to give silicon dioxide and an acidic solution. Which pair identifies P and Q and accounts for the acidity?',
    ['P = NaCl and Q = SiCl₄. Hydrolysis of Q gives HCl.', 'P = NaCl and Q = SiCl₄. Cl⁻ from P is a strong acid.', 'P = PCl₃ and Q = NaCl. Hydrolysis of Q gives NaOH.', 'P = SiCl₄ and Q = PCl₃. Silicon dioxide is the only product from Q.'], 0,
    'NaCl dissociates into Na⁺ and Cl⁻ without making much H₃O⁺. SiCl₄ hydrolyses according to SiCl₄ + 2H₂O → SiO₂ + 4HCl. The HCl dissolves to form the acidic solution.'),
  item(9, 'oxide-acid-capacity', 'A student compares the moles of HCl neutralised by 1.00 g of separate, pure samples of Na₂O, MgO and Al₂O₃. Assume each solid reacts completely. Use Mᵣ values 62.0, 40.3 and 102 respectively. Which order is correct, from least to most HCl?',
    ['MgO, Na₂O, Al₂O₃', 'Al₂O₃, Na₂O, MgO', 'Na₂O, MgO, Al₂O₃', 'Na₂O, Al₂O₃, MgO'], 2,
    'One mole of each of Na₂O and MgO consumes two moles of HCl. One mole of Al₂O₃ consumes six. Per gram these amounts are 2/62.0 = 0.0323, 2/40.3 = 0.0496 and 6/102 = 0.0588 mol respectively.'),

  numerical(10, 'calcium-hydroxide-titration', 'A 25.0 cm³ sample of a clear saturated Ca(OH)₂ solution requires 6.00 cm³ of 0.0500 mol dm⁻³ HCl for neutralisation. Assume no other solutes and Mᵣ(Ca(OH)₂) = 74.1.',
    [part('Calculate the hydroxide ion concentration.', 'mol dm⁻³', 0.0120, 0.00005), part('Calculate the mass of Ca(OH)₂ dissolved per dm³.', 'g dm⁻³', 0.445, 0.003)],
    'The acid supplies 0.300 mmol H⁺ and neutralises the same amount of OH⁻. The OH⁻ concentration is 0.000300/0.0250 = 0.0120 mol dm⁻³. There are two hydroxide ions per dissolved formula unit, so the mass per dm³ is 0.00600 × 74.1 = 0.445 g.'),
  item(10, 'group-two-solubilities', 'M and N are two Group 2 metals chosen from magnesium, calcium, strontium and barium. At the same temperature, M sulfate is much less soluble than N sulfate, while M hydroxide is much more soluble than N hydroxide. Which prediction about the metals is supported?',
    ['M is above N in the group and reacts faster with cold water.', 'M is below N in the group and reacts more slowly with cold water.', 'M and N have the same position in the group.', 'M is below N in the group and generally reacts faster with cold water.'], 3,
    'Down Group 2, sulfates become less soluble and hydroxides more soluble. Both observations put M below N. The metals lower in the group generally react more readily with water.'),

  item(11, 'silver-halide-mixture', 'A sample contains two different halide ions chosen from Cl⁻, Br⁻ and I⁻. Acidified silver nitrate precipitates both. Dilute ammonia dissolves one component and excess concentrated ammonia dissolves the remainder completely. Which two ions are present?',
    ['Cl⁻ and Br⁻', 'Br⁻ and I⁻', 'Cl⁻ and I⁻', 'The ions cannot be distinguished.'], 0,
    'AgCl dissolves in dilute ammonia. AgBr remains in dilute ammonia but dissolves in concentrated ammonia. AgI would remain in both, so the sample contains chloride and bromide.'),
  item(11, 'halogen-opposing-trends', 'Down the group from chlorine to iodine, the X–X bond enthalpy decreases while the boiling points of X₂ increase. Which explanation reconciles these trends?',
    ['Boiling breaks X–X bonds, and the bonds become more polar.', 'Boiling separates molecules. Larger electron clouds give stronger instantaneous dipole–induced dipole attractions even as X–X bonds weaken.', 'Iodine molecules form hydrogen bonds with one another.', 'The covalent bonds in solid iodine become stronger as the substance warms.'], 1,
    'Boiling overcomes attractions between X₂ molecules, while a bond enthalpy refers to breaking X–X within a molecule. The larger, more polarisable electron clouds of the heavier halogens strengthen the intermolecular attractions.'),

  item(12, 'exhaust-stoichiometry', 'A catalytic converter removes nitrogen monoxide from exhaust by reacting it with carbon monoxide, forming N₂ and CO₂. If 0.40 mol NO and 0.50 mol CO pass over the catalyst and the limiting gas is consumed completely, what amounts of N₂ and unreacted CO leave?',
    ['0.40 mol N₂ and 0.10 mol CO', '0.20 mol N₂ and 0.30 mol CO', '0.20 mol N₂ and 0.10 mol CO', '0.40 mol N₂ and 0.25 mol CO'], 2,
    'The balanced equation is 2NO + 2CO → N₂ + 2CO₂. The 0.40 mol NO consumes 0.40 mol CO and makes 0.20 mol N₂, leaving 0.10 mol CO.'),
  item(12, 'ammonium-bond-label', 'Ammonia reacts with an acid to make NH₄⁺. A diagram labels the electron pair used to bond to the incoming H⁺. Which describes the origin of that pair and the structure of the product?',
    ['H⁺ supplies both electrons. NH₄⁺ is square planar.', 'N and H⁺ each supply one electron. One N–H bond remains shorter than the other three.', 'N supplies both electrons. The product is trigonal pyramidal and N retains one lone pair.', 'N supplies both electrons. NH₄⁺ is tetrahedral and all four N–H bonds are equivalent.'], 3,
    'H⁺ has no electrons. The ammonia lone pair forms the new bond. The product has four bonding pairs and no nitrogen lone pair, so its tetrahedral N–H bonds are equivalent.'),

  numerical(13, 'c4-alcohol-isomers', 'Consider all acyclic, saturated alcohols of molecular formula C₄H₁₀O. Count different atom connectivities and exclude ethers.',
    [part('How many structural isomers meet these conditions?', 'isomers', 4), part('How many of these structural isomers contain a chiral centre?', 'isomers', 1)],
    'A straight carbon chain gives butan-1-ol and butan-2-ol. The branched chain gives 2-methylpropan-1-ol and 2-methylpropan-2-ol. Only the OH-bearing carbon of butan-2-ol has four different groups.'),
  item(13, 'diene-bond-count', 'Penta-1,3-diene has the structure CH₂=CHCH=CHCH₃. Count every single bond and the σ component of each double bond. How many σ bonds are present and how many geometrical isomers can the molecule have?',
    ['10 σ bonds and two geometrical isomers', '12 σ bonds and two geometrical isomers', '12 σ bonds and four geometrical isomers', '14 σ bonds and four geometrical isomers'], 1,
    'The four C–C connections each contribute a σ bond and eight C–H bonds contribute eight more. Only the internal C=C bond has two different substituents on each end. The terminal CH₂ group has two identical hydrogens.'),

  item(14, 'alkene-cleavage-carbonyls', 'Complete oxidative cleavage of one acyclic alkene gives propanone and ethanoic acid as its only organic products. Which alkene fits the data?',
    ['Pent-2-ene', '3-Methylbut-1-ene', '2-Methylbut-2-ene', '2-Methylbut-1-ene'], 2,
    'Cleavage gives a ketone when the alkene carbon has two carbon groups. Propanone requires two methyl groups at that carbon. Ethanoic acid comes from an alkene carbon attached to a hydrogen and a methyl group. Rejoining the alkene carbons gives (CH₃)₂C=CHCH₃.'),
  item(14, 'monochloro-connectivities', 'In free-radical substitution of 2-methylbutane, exactly one hydrogen is replaced by chlorine. Ignore stereoisomers. How many constitutional products are possible and which species can propagate the chain by removing H from the alkane?',
    ['Three, Cl⁻', 'Four, Cl⁻', 'Five, Cl•', 'Four, Cl•'], 3,
    '2-Methylbutane has four distinct hydrogen sites. There are equivalent methyl groups at the branch, a different terminal methyl group, the CH₂ group and the tertiary CH group. A chlorine radical abstracts H to form HCl and a carbon radical.'),

  item(15, 'elimination-beta-carbons', '2-Bromo-2-methylbutane undergoes elimination of HBr. Considering alkene connectivities and geometrical isomerism, which prediction is correct?',
    ['Two alkene connectivities, neither with geometrical isomers', 'One alkene connectivity, with two geometrical isomers', 'Two alkene connectivities, both with geometrical isomers', 'Three alkene connectivities, one with geometrical isomers'], 0,
    'The two methyl groups attached to the bromine-bearing carbon are equivalent. Removal of H from either gives 2-methylbut-1-ene. Removal from the neighbouring CH₂ gives 2-methylbut-2-ene. In each product, one alkene carbon has two identical groups.'),
  item(15, 'primary-tertiary-pathways', 'A primary halogenoalkane and a tertiary isomer each give an alcohol by substitution with hydroxide. For one substrate, bond breaking and bond formation occur in a single step. For the other, a carbocation forms first. Which identification is consistent with the usual mechanisms?',
    ['The primary isomer forms a carbocation first because it has fewer electron-donating alkyl groups.', 'The primary isomer reacts in one step and the tertiary isomer forms a carbocation first.', 'The tertiary isomer reacts in one step because neighbouring alkyl groups make its carbon more accessible.', 'Both react through a carbocation because they give the same functional group.'], 1,
    'Backside approach is accessible at a primary carbon and a primary carbocation is relatively unstable, favouring Sₙ2. At a tertiary carbon, bulky groups obstruct backside approach and their electron donation stabilises a carbocation, favouring Sₙ1.'),

  item(16, 'two-alcohol-sites', 'The diol CH₃CH(OH)CH₂CH₂CH₂OH is completely oxidised at both alcohol sites without breaking any carbon–carbon bonds. Which condensed structure represents the product?',
    ['CH₃CH(OH)CH₂CH₂COOH', 'CH₃COCH₂CH₂CHO', 'CH₃COCH₂CH₂COOH', 'HOOCCH₂CH₂CH₂COOH'], 2,
    'The OH group on the second carbon is secondary and oxidises to a ketone. The terminal CH₂OH group is primary and oxidises fully to COOH. The five-carbon chain stays intact.'),
  item(16, 'two-pentanols', 'P and Q are straight-chain alcohols with formula C₅H₁₂O. Both are oxidised to ketones. P gives a yellow precipitate in the iodoform test and Q does not. Which identifies the two alcohols and the carboxylate formed from P in the iodoform test?',
    ['P = pentan-1-ol, Q = pentan-3-ol, pentanoate', 'P = pentan-3-ol, Q = pentan-2-ol, ethanoate', 'P = pentan-2-ol, Q = pentan-3-ol, propanoate', 'P = pentan-2-ol, Q = pentan-3-ol, butanoate'], 3,
    'Oxidation to a ketone requires a secondary alcohol. Only pentan-2-ol contains CH₃CH(OH)–. The methyl group supplies the carbon of CHI₃. The other four carbons, including the original OH-bearing carbon, form butanoate.'),

  item(17, 'ketone-structures-and-reduction', 'Consider all acyclic, saturated ketones with formula C₅H₁₀O. How many give a yellow precipitate in the iodoform test, and do their carbonyl reduction products contain a chiral centre?',
    ['Two, both reduction products contain a chiral centre.', 'Two, neither reduction product contains a chiral centre.', 'One, its reduction product contains a chiral centre.', 'Three, only one reduction product contains a chiral centre.'], 0,
    'Pentan-2-one and 3-methylbutan-2-one have a methyl attached to the carbonyl, unlike pentan-3-one. Reducing either methyl ketone puts H and OH on the former carbonyl carbon, which already has two different alkyl groups.'),
  item(17, 'enone-reduction', 'Hex-4-en-2-one, CH₃COCH₂CH=CHCH₃, is treated with a reagent that reduces aldehyde and ketone groups without reducing an isolated C=C bond. Which structure fits the product and what would it do to bromine water?',
    ['CH₃COCH₂CH₂CH₂CH₃, decolourise', 'CH₃CH(OH)CH₂CH=CHCH₃, decolourise', 'CH₃CH(OH)CH₂CH₂CH₂CH₃, decolourise', 'CH₃CH(OH)CH₂CH=CHCH₃, no decolourisation'], 1,
    'Reduction turns the ketone into a secondary alcohol. The lone C=C bond remains, so bromine adds across it and the bromine water loses its colour.'),

  numerical(18, 'ester-back-titration', 'A 0.612 g sample of a pure ester is completely hydrolysed using 40.0 cm³ of 0.250 mol dm⁻³ NaOH. Each ester molecule contains one ester linkage. The residual NaOH requires 16.0 cm³ of 0.250 mol dm⁻³ HCl to neutralise.',
    [part('Calculate the amount of NaOH used to hydrolyse the ester.', 'mmol', 6.00, 0.05), part('Calculate the molar mass of the ester to three significant figures.', 'g mol⁻¹', 102, 0.2)],
    'The initial alkali is 10.0 mmol and titration accounts for 4.00 mmol in excess. Hydrolysis consumes 6.00 mmol in a 1:1 ratio with the ester. The molar mass is 0.612/0.00600 = 102 g mol⁻¹.'),
  item(18, 'ester-fragments', 'An ester has molecular formula C₅H₁₀O₂. Acid hydrolysis yields a carboxylic acid with two carbon atoms and an alcohol that can be oxidised to a ketone. Which ester meets all three observations?',
    ['Propyl ethanoate', 'Ethyl propanoate', 'Propan-2-yl ethanoate', 'Methyl butanoate'], 2,
    'The hydrolysis acid is ethanoic acid. The alcohol fragment must therefore have three carbons. Only propan-2-ol is a three-carbon secondary alcohol, yielding propanone on oxidation.'),

  item(19, 'propanamine-back-calculation', 'A 20.0 cm³ sample of propan-1-amine solution reacts with 30.0 cm³ of 0.200 mol dm⁻³ HCl. All the amine forms its salt and 0.00200 mol of acid remains. What are the original amine concentration and the formula of the cation?',
    ['0.100 mol dm⁻³ and CH₃CH₂CH₂NH₃⁺', '0.200 mol dm⁻³ and CH₃CH₂CH₂NH₃⁺', '0.300 mol dm⁻³ and CH₃CH₂CH₂NH₃⁺', '0.200 mol dm⁻³ and CH₃CH₂CH₂NH₂⁺'], 1,
    'The amount of acid consumed is 0.00600 − 0.00200 = 0.00400 mol. The nitrogen lone pair accepts one proton per amine molecule, forming CH₃CH₂CH₂NH₃⁺. The concentration was 0.00400/0.0200 = 0.200 mol dm⁻³.'),
  item(19, 'hydroxynitrile-carbon-trace', 'The carbon of a nitrile group is marked with an asterisk in CH₃CH(OH)C*≡N. The nitrile is fully hydrolysed in acid, with the carbon skeleton unchanged. Where is the label in the organic product, and how many chiral centres does that product contain?',
    ['On the carboxyl carbon, one chiral centre', 'On the hydroxyl-bearing carbon, one chiral centre', 'On the carboxyl carbon, no chiral centres', 'On the methyl carbon, no chiral centres'], 0,
    'The nitrile carbon becomes the carboxyl carbon in CH₃CH(OH)C*OOH. The middle carbon is still attached to H, OH, CH₃ and a carboxyl group, so it is the only chiral centre.'),

  item(20, 'fluoroalkene-repeat', 'The polymer fragment shown came from only one alkene monomer. Which monomer fits the fragment, and can that monomer have geometrical isomers?',
    ['CH₂=C(F)CH₃, yes', 'CHF=CHCH₃, yes', 'CHF=CHCH₃, no', 'CH₂=C(F)CH₃, no'], 1,
    'Each adjacent pair of repeat carbons contains one H and one F on the first carbon, and one H and one methyl group on the second. Restoring the double bond gives CHF=CHCH₃, which has two different substituents at each end.', additionFragment),
  item(20, 'polymer-repeat-composition', 'An addition polymer contains only carbon and hydrogen. The smallest repeat unit has formula C₄H₈ and is written –CH₂–C(CH₃)₂–. What fraction of the carbon atoms are in the backbone, and what is the mass of 0.0500 mol of repeat units? Use C = 12.0 and H = 1.00.',
    ['One quarter and 2.80 g', 'One half and 5.60 g', 'One half and 2.80 g', 'Three quarters and 2.80 g'], 2,
    'Two carbons are in the backbone and two are methyl carbons attached to it. The molar mass of the repeat unit is 4 × 12.0 + 8 × 1.00 = 56.0 g mol⁻¹, so 0.0500 mol of repeats has mass 2.80 g.'),

  item(21, 'isopropyl-ester-route', 'A synthesis of propan-2-yl ethanoate starts with propene and ethanoic acid. Which pair of transformations places the oxygen on the correct propene carbon and then makes the ester?',
    ['Hydrogenation of propene, then substitution with ethanoic acid', 'Oxidative cleavage of propene, then esterification', 'Esterification of propene, then oxidation of the ester', 'Addition of water to propene to give propan-2-ol, then esterification with ethanoic acid'], 3,
    'Hydration adds H and OH across C=C. Major formation of the secondary alcohol places OH on the middle carbon. Its oxygen bonds to the ethanoic acid carbonyl carbon during esterification.'),
  item(21, 'branched-aldehyde-route', 'The target is 2-methylpropanal, starting from 1-bromo-2-methylpropane. The carbon skeleton should stay unchanged. Which order of transformations gives the target?',
    ['Nucleophilic substitution giving 2-methylpropan-1-ol, then partial oxidation', 'Elimination giving 2-methylpropene, then hydration and oxidation', 'Nucleophilic substitution giving 2-methylpropan-2-ol, then partial oxidation', 'Nucleophilic substitution giving 2-methylpropan-1-ol, then full oxidation under reflux'], 0,
    'Replacing Br by OH at carbon 1 produces the primary alcohol. Partial oxidation with removal of the aldehyde gives the target. Full oxidation would give 2-methylpropanoic acid, while elimination and subsequent hydration favour the tertiary alcohol.'),

  item(22, 'ir-acid-identification', 'A liquid with formula C₃H₆O₂ gives the infrared absorptions shown. Which compound fits, and what produces the broad absorption?',
    ['Methyl ethanoate, O–H stretching', 'Propanoic acid, O–H stretching in a carboxyl group', 'Ethyl methanoate, C=O stretching', 'Propanoic acid, C=O stretching'], 1,
    'The strong absorption near 1710 cm⁻¹ is from C=O. The broad absorption extending through roughly 2500–3300 cm⁻¹ matches the hydrogen-bonded carboxylic O–H stretch. Only propanoic acid fits both and has formula C₃H₆O₂.', infrared),
  item(22, 'bromine-molecular-ions', 'A mass spectrum has two equally intense molecular-ion peaks at m/z 122 and 124 and a fragment peak at m/z 43. Assume all carbon is ¹²C, all hydrogen is ¹H, and bromine has isotopes ⁷⁹Br and ⁸¹Br of equal abundance. Which interpretation fits all three peaks?',
    ['C₂H₅Br with loss of an ethyl radical', 'C₃H₇Br₂ with loss of Br₂', 'C₃H₇Br with loss of a bromine radical', 'C₃H₇Cl with loss of a chlorine radical'], 2,
    'One bromine atom gives two equally probable molecular-ion masses separated by two units. Subtracting 79 from 122 gives 43, the mass of C₃H₇. Loss of a Br radical from the molecular ion can leave C₃H₇⁺.'),
];
