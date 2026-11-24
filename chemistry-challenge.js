// Original questions. Topic numbers follow the Cambridge 9701 subject-content outline.
function item(number, prompt, options, answer, explanation, figure) {
  return { bank: 'chemistry-' + number, prompt, options, answer, explanation, ...(figure && { figure }) };
}

function table(caption, headers, rows) {
  return { caption, headers, rows };
}

function diagram(caption, alt, drawing) {
  return {
    caption, alt,
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 202" width="100%" role="img">' +
      '<title>' + alt + '</title><g fill="currentColor" font-family="system-ui, sans-serif" font-size="15">' +
      drawing + '</g></svg>',
  };
}

const energyProfile = diagram('Energy profile for A ⇌ B', 'A starts at 40 kJ per mole, the peak is at 115 and B is at 15.',
  '<path d="M60 18V164H449" fill="none" stroke="currentColor" stroke-width="2"/>' +
  '<path d="M65 117H151C179 117 185 35 222 35S277 144 323 144H428" fill="none" stroke="currentColor" stroke-width="3"/>' +
  '<path d="M61 35H221M61 144H323" fill="none" stroke="currentColor" stroke-dasharray="3 5" opacity=".42"/>' +
  '<text x="21" y="40">115</text><text x="30" y="122">40</text><text x="30" y="149">15</text>' +
  '<text x="76" y="106">A</text><text x="390" y="133">B</text><text x="65" y="16">Energy / kJ mol⁻¹</text><text x="234" y="190">Reaction progress</text>');

const massSpectrum = diagram('Molecular-ion region of a mass spectrum', 'Peaks at mass-to-charge 84, 86 and 88 have relative heights 9, 6 and 1.',
  '<path d="M64 31V155H441" fill="none" stroke="currentColor" stroke-width="2"/>' +
  '<path d="M135 155V47M244 155V83M353 155V143" fill="none" stroke="currentColor" stroke-width="5"/>' +
  '<text x="65" y="20">Relative intensity</text><text x="124" y="41">9</text><text x="234" y="77">6</text><text x="343" y="137">1</text>' +
  '<text x="124" y="175">84</text><text x="233" y="175">86</text><text x="342" y="175">88</text><text x="412" y="176">m/z</text>');

const cell = diagram('Two half-cells joined by a salt bridge', 'A zinc electrode and a copper electrode are joined through a voltmeter. Each is in its own metal ion solution.',
  '<g fill="none" stroke="currentColor" stroke-width="2.5"><path d="M38 94v67h159V94M281 94v67h160V94M91 128V44h129m38 0h115v84"/>' +
  '<circle cx="239" cy="44" r="18"/><path d="M160 125V89q0-16 16-16h129q16 0 16 16v36M38 114h159m84 0h160" opacity=".7"/></g>' +
  '<text x="233" y="49">V</text><text x="46" y="83">Zn(s)</text><text x="385" y="83">Cu(s)</text>' +
  '<text x="56" y="150">Zn²⁺(aq)</text><text x="341" y="150">Cu²⁺(aq)</text><text x="196" y="103">salt bridge</text>');

const polymer = diagram('A section of an addition polymer', 'Backbone fragment: CH2, CH bonded to CH3, CH2, CH bonded to CH3, connected in that order.',
  '<g fill="none" stroke="currentColor" stroke-width="2.5"><path d="M28 110h41m37 0h43m30 0h55m37 0h43m30 0h65M164 90V64m165 26V64"/></g>' +
  '<text x="69" y="116">CH₂</text><text x="148" y="116">CH</text><text x="234" y="116">CH₂</text><text x="313" y="116">CH</text>' +
  '<text x="149" y="54">CH₃</text><text x="314" y="54">CH₃</text>');

export const chemistryChallenge = [
  item(1, 'The table gives successive ionisation energies of a Period 3 atom X. Which pair identifies X and the subshell from which its third electron is removed?',
    ["Al, 3p", "Mg, 2p", "Si, 3s", "Al, 3s"], 3,
    'The sharp rise after the third removal puts X in Group 13. Aluminium is [Ne]3s²3p¹. The 3p electron leaves first, followed by the two 3s electrons.',
    table('Successive ionisation energies of X', ['Electron removed', '1st', '2nd', '3rd', '4th'], [['Energy / kJ mol⁻¹', '578', '1817', '2745', '11 577']])),
  item(2, 'A 2.50 g mixture of Na₂CO₃ and NaCl is treated with excess dilute acid. It gives 0.360 dm³ of dry CO₂ at a molar gas volume of 24.0 dm³ mol⁻¹. What is the percentage by mass of NaCl? Use Mᵣ(Na₂CO₃) = 106.',
    ["63.6%", "84.8%", "36.4%", "15.0%"], 2,
    'The 0.360/24.0 = 0.0150 mol of CO₂ came from 0.0150 mol of Na₂CO₃, mass 1.59 g. The remaining 0.910 g is NaCl, giving 36.4%.'),
  item(3, 'BF₃ and NH₃ form F₃B←NH₃. Considering only the three original bonds at each central atom, how do the F–B–F and H–N–H angles change on forming the adduct?',
    ["Both decrease", "F–B–F increases and H–N–H decreases", "Both increase", "F–B–F decreases and H–N–H increases"], 3,
    'Planar BF₃ starts at 120°. Ammonia is pyramidal at about 107°. Donating the nitrogen lone pair gives four bonding pairs around each central atom, bringing both angles towards 109.5°.'),
  item(4, 'A 0.240 g sample of a volatile liquid becomes gas in a 100 cm³ syringe at 350 K and 96.0 kPa. Which molar mass follows if the gas is ideal? R = 8.31 J mol⁻¹ K⁻¹.',
    ["7.27 g mol⁻¹", "72.7 g mol⁻¹", "83.1 g mol⁻¹", "0.0727 g mol⁻¹"], 1,
    'Using Pa and m³ gives n = 96 000 × 0.000100/(8.31 × 350) = 0.00330 mol. M = 0.240/0.00330 = 72.7 g mol⁻¹.'),
  item(5, 'A catalyst lowers the peak in the diagram by 30 kJ mol⁻¹. What are the catalysed activation energy for B → A and the enthalpy change for A → B?',
    ["100 and −55 kJ mol⁻¹", "70 and +25 kJ mol⁻¹", "70 and −25 kJ mol⁻¹", "45 and −25 kJ mol⁻¹"], 2,
    'The new peak is at 85. The reverse reaction starts at 15, so its barrier is 70 kJ mol⁻¹. The forward enthalpy change is 15 − 40 = −25 kJ mol⁻¹.', energyProfile),
  item(6, 'A 25.0 cm³ sample of Fe²⁺ solution requires 18.0 cm³ of 0.0200 mol dm⁻³ MnO₄⁻ in acid. Mn changes from +7 to +2 and Fe from +2 to +3. What was the Fe²⁺ concentration?',
    ["0.00288 mol dm⁻³", "0.0144 mol dm⁻³", "0.360 mol dm⁻³", "0.0720 mol dm⁻³"], 3,
    'Each permanganate ion accepts five electrons, oxidising five Fe²⁺ ions. There are 0.000360 mol MnO₄⁻ and 0.00180 mol Fe²⁺. Divide by 0.0250 dm³ to obtain 0.0720 mol dm⁻³.'),
  item(7, 'At equilibrium a vessel contains 0.20 mol N₂O₄ and 0.60 mol NO₂. The total pressure is 200 kPa. What is Kₚ for N₂O₄(g) ⇌ 2NO₂(g), with partial pressures expressed in kPa?',
    ["225 kPa", "450 kPa", "3.0 kPa", "75 kPa"], 1,
    'The mole fractions are 0.25 and 0.75. The partial pressures are 50 and 150 kPa. Kₚ = (150)²/50 = 450 kPa.'),
  item(8, 'Two equal masses of pure CaCO₃ of different particle sizes are added to separate, identical portions of excess acid at the same temperature. Which conclusion about surface area is supported by the measurements?',
    ["P has a higher theoretical CO₂ yield", "The catalyst in P changes the final equilibrium", "Q exposes more surface because it reacts for longer", "P exposes more surface and both samples give the same final amount of gas"], 3,
    'P releases more gas in the same early interval. Greater exposed area increases collision frequency. Equal carbonate amounts with excess acid give the same final CO₂ volume.',
    table('CO₂ collected / cm³', ['Time / s', '0', '20', '40', '120', '240'], [['P', '0', '32', '48', '60', '60'], ['Q', '0', '16', '28', '54', '60']])),
  item(9, 'Three successive Period 3 elements X, Y and Z have the melting points shown. Which statement accounts for the large drop between Y and Z?',
    ["Y is metallic and Z has a giant ionic lattice", "Y forms a giant covalent lattice and Z contains discrete P₄ molecules", "Y and Z both have metallic bonding, but Z supplies fewer electrons", "Y contains Si₄ molecules and Z is monatomic"], 1,
    'The values identify aluminium, silicon and phosphorus (white phosphorus). Melting silicon disrupts a giant covalent network, while melting phosphorus overcomes attractions between P₄ molecules.',
    table('Melting points', ['Element', 'X', 'Y', 'Z'], [['Melting point / °C', '660', '1414', '44']])),
  item(10, 'A 2.00 g sample of a pure Group 2 carbonate gives 1.12 g of oxide on complete thermal decomposition. Which metal does it contain? Use C = 12, O = 16.',
    ["Ba (137)", "Ca (40)", "Mg (24)", "Sr (88)"], 1,
    'The lost 0.88 g is 0.020 mol CO₂. The carbonate therefore has molar mass 2.00/0.020 = 100 g mol⁻¹. Subtracting 60 for CO₃ gives 40 for calcium.'),
  item(11, 'Excess chlorine water is added to 20.0 cm³ of 0.100 mol dm⁻³ potassium iodide. Assuming all I⁻ is oxidised only to I₂, what volume of 0.100 mol dm⁻³ thiosulfate reacts with the iodine? I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻. Excess chlorine is removed before titration.',
    ["20.0 cm³", "40.0 cm³", "5.0 cm³", "10.0 cm³"], 0,
    'Two iodide ions give one iodine molecule. The 2.00 mmol of iodide gives 1.00 mmol I₂ and consumes 2.00 mmol thiosulfate. At 0.100 mol dm⁻³ that is 20.0 cm³.'),
  item(12, 'Sulfur dioxide reacts with nitrogen dioxide in polluted air: SO₂ + NO₂ → SO₃ + NO. Oxygen then converts NO back into NO₂. Which description fits the first reaction and the overall cycle?',
    ["Sulfur gains two electrons and NO₂ is regenerated", "Sulfur loses two electrons and NO₂ is regenerated", "Nitrogen loses two electrons and SO₂ is regenerated", "Nitrogen gains one electron and O₂ is regenerated"], 1,
    'Sulfur rises from +4 to +6 and nitrogen falls from +4 to +2. The subsequent reaction restores NO₂. Adding the reactions leaves oxidation of SO₂ by oxygen.'),
  item(13, 'Which formula represents a molecule with both a chiral carbon and a C=C bond capable of geometrical isomerism?',
    ["CH₂=CHCH(OH)CH₃", "CH₃CH=CHCH₂OH", "CH₃CH=CHCH(OH)CH₃", "(CH₃)₂C=CHCH(OH)CH₃"], 2,
    'In CH₃CH=CHCH(OH)CH₃ each alkene carbon has two different groups. The carbon bearing OH has H, OH, CH₃ and an alkenyl group. The other formulas each fail one condition.'),
  item(14, 'A 20 cm³ mixture of methane and ethene uses exactly 52 cm³ of O₂ on complete combustion. All volumes refer to the same conditions. What volume of CO₂ forms?',
    ["32 cm³", "40 cm³", "24 cm³", "28 cm³"], 0,
    'CH₄ uses two volumes of O₂ and gives one volume of CO₂. C₂H₄ uses three and gives two. Replacing 12 of the 20 volumes of methane with ethene raises oxygen use from 40 to 52. CO₂ = 8 + 24 = 32 cm³.'),
  item(15, 'Equal molar amounts of the three halogenoalkanes are compared at the same temperature in the same aqueous ethanolic silver nitrate mixture. Which order of cloudiness appearing first to last is predicted, and why?',
    ["Iodoethane, bromoethane, chloroethane because C–I is the weakest bond", "Chloroethane, bromoethane, iodoethane because the C–Cl bond is the most polar", "Bromoethane, iodoethane, chloroethane because AgBr is cream", "Iodoethane, chloroethane, bromoethane because iodide is largest"], 0,
    'Hydrolysis releases halide, which precipitates with Ag⁺. With the same ethyl group, C–I breaks most readily and C–Cl least readily. Colour identifies the precipitate and does not set the hydrolysis rate.'),
  item(16, 'An alcohol C₄H₁₀O is oxidised to a compound that gives an orange precipitate with 2,4-DNPH and no silver mirror with Tollens’ reagent. Which pair gives the original alcohol and a property of that alcohol?',
    ["2-Methylpropan-2-ol, readily oxidised to a ketone", "2-Methylpropan-1-ol, a secondary alcohol", "Butan-2-ol, optically active as a single enantiomer", "Butan-1-ol, optically active as a single enantiomer"], 2,
    'The product is a ketone, identifying a secondary alcohol. Butan-2-ol has OH, H, ethyl and methyl attached to carbon 2, so its individual enantiomers are optically active.'),
  item(17, 'A carbonyl compound with formula C₄H₈O gives a silver mirror but no yellow precipitate in the iodoform test. Its reduction product has a branched carbon skeleton. Which compound was reduced?',
    ["2-Methylpropanal", "Butan-2-one", "Butanal", "2-Methylpropan-2-ol"], 0,
    'The silver mirror establishes an aldehyde. Butanal and 2-methylpropanal fit the formula, but only 2-methylpropanal has a branched skeleton, which reduction preserves.'),
  item(18, 'A saturated ester of molar mass 102 g mol⁻¹ gives ethanol and a single carboxylic acid on acid hydrolysis. Which acid forms, and how much ester is needed to produce 0.460 g ethanol at 80.0% yield? Mᵣ(ethanol) = 46.0.',
    ["Ethanoic acid, 1.28 g", "Butanoic acid, 1.02 g", "Propanoic acid, 1.28 g", "Propanoic acid, 0.816 g"], 2,
    'Ethyl propanoate has formula C₅H₁₀O₂ and Mᵣ 102. The 0.0100 mol of ethanol isolated corresponds to 0.0125 mol theoretical. The 1:1 ester requirement is 0.0125 × 102 = 1.275 g.'),
  item(19, 'Compound X has formula C₃H₅N. Complete acidic hydrolysis yields a straight-chain carboxylic acid with three carbons. Which pair identifies X and the organic product of reducing X?',
    ["CH₃CN and ethanamine", "CH₃CH₂NC and propan-1-amine", "CH₃CH₂CN and propan-1-amine", "CH₃CH₂CN and propan-2-amine"], 2,
    'The nitrile carbon becomes the carboxyl carbon on hydrolysis and a CH₂ attached to NH₂ on reduction. CH₃CH₂CN therefore gives propanoic acid or CH₃CH₂CH₂NH₂ respectively.'),
  item(20, 'The diagram shows part of an addition polymer. A chain contains 2100 backbone carbon atoms. Ignoring end groups, which pair gives the monomer and the approximate relative mass of the chain? Use C = 12, H = 1.',
    ["Propene and 88 200", "Ethene and 29 400", "Propene and 44 100", "But-2-ene and 58 800"], 2,
    'The repeating pair of backbone carbons carries one methyl side group, identifying propene. There are 2100/2 = 1050 repeat units of relative mass 42, giving 44 100.', polymer),
  item(21, 'A student plans to convert bromoethane into propan-1-ol. Which sequence gives a three-carbon primary alcohol while retaining both carbons of the starting material?',
    ["Substitution with OH⁻, then oxidation with excess oxidant", "Hydrolysis to ethanol, then dehydration", "Substitution with CN⁻, hydrolysis of the nitrile, then reduction of the acid with LiAlH₄", "Elimination to ethene, then hydration"], 2,
    'Cyanide adds one carbon, giving propanenitrile. Hydrolysis converts its nitrile group to COOH. Reduction converts that group to CH₂OH without altering the carbon skeleton.'),
  item(22, 'The molecular-ion cluster is shown. Assume that carbon is all ¹²C and hydrogen all ¹H. Chlorine occurs as ³⁵Cl and ³⁷Cl in a 3:1 ratio. Which molecular formula accounts for both the lowest mass and the three intensities?',
    ["CHCl₃", "CH₂Cl₂", "C₂H₅Cl", "C₂H₄Cl₂"], 1,
    'Two chlorine atoms give the binomial pattern 9:6:1. With two ³⁵Cl atoms the remaining mass is 84 − 70 = 14, matching CH₂.', massSpectrum),
  item(23, 'For a reaction, ΔH° = +48.0 kJ mol⁻¹ and ΔS° = +150 J K⁻¹ mol⁻¹. Assume both are constant with temperature. Which pair gives the threshold temperature for ΔG° = 0 and ΔG° at 400 K?',
    ["320 K and +12.0 kJ mol⁻¹", "320 K and −12.0 kJ mol⁻¹", "0.320 K and −12.0 kJ mol⁻¹", "312 K and −108 kJ mol⁻¹"], 1,
    'Use 0.150 kJ K⁻¹ mol⁻¹ for entropy. The threshold is 48.0/0.150 = 320 K. At 400 K, ΔG° = 48.0 − 400 × 0.150 = −12.0 kJ mol⁻¹.'),
  item(24, 'Under standard conditions E°(Zn²⁺/Zn) = −0.76 V and E°(Cu²⁺/Cu) = +0.34 V. When the voltmeter in the diagram is replaced with a resistor, which prediction fits the operating cell?',
    ["Initial standard emf 1.10 V and anions migrate towards the zinc half-cell", "Initial standard emf 0.42 V and zinc gains mass", "Initial standard emf 1.10 V and anions migrate towards the copper half-cell", "Initial standard emf 0.42 V and electrons flow from copper to zinc"], 0,
    'Copper is the positive electrode. E°cell = +0.34 − (−0.76) = 1.10 V. Zinc dissolves as Zn²⁺, so anions from the bridge move towards that half-cell to maintain electroneutrality.', cell),
  item(25, 'A buffer contains 20.0 mmol ethanoic acid and 30.0 mmol ethanoate. After adding 5.0 mmol HCl, what is its pH? Take pKₐ = 4.76 and neglect activity effects.',
    ["4.76", "4.94", "5.06", "4.46"], 0,
    'H⁺ converts 5.0 mmol ethanoate into acid, leaving 25.0 mmol of each. Their concentration ratio is one, giving pH = pKₐ + log₁₀(1) = 4.76.'),
  item(26, 'Use the initial-rate data to predict the rate when [A] = 0.30 and [B] = 0.20 mol dm⁻³ at the same temperature.',
    ["0.036 mol dm⁻³ s⁻¹", "0.108 mol dm⁻³ s⁻¹", "0.144 mol dm⁻³ s⁻¹", "0.216 mol dm⁻³ s⁻¹"], 1,
    'Doubling A quadruples the rate at constant B. Doubling B doubles it at constant A. Relative to run 1 the new rate is 3² × 2 = 18 times as large, or 0.108 mol dm⁻³ s⁻¹.',
    table('Initial-rate measurements', ['Run', '[A] / mol dm⁻³', '[B] / mol dm⁻³', 'Rate / mol dm⁻³ s⁻¹'], [['1', '0.10', '0.10', '0.0060'], ['2', '0.20', '0.10', '0.0240'], ['3', '0.20', '0.20', '0.0480']])),
  item(27, 'Equal amounts in moles of Mg(NO₃)₂ and Ba(NO₃)₂ are heated separately to complete decomposition. Which prediction correctly links the oxygen yields to the relative thermal stabilities?',
    ["Ba gives more O₂ and is more stable", "Both give equal O₂ and Ba nitrate is more stable", "Both give equal O₂ and Mg nitrate is more stable", "Mg gives more O₂ and is less stable"], 1,
    'Both follow 2M(NO₃)₂ → 2MO + 4NO₂ + O₂, giving half a mole of oxygen per mole. Ba²⁺ has the smaller charge density and distorts nitrate less, making barium nitrate more thermally stable.'),
  item(28, 'In [Co(en)₂Cl₂]⁺, en is a neutral bidentate ligand and each Cl⁻ is monodentate. Which row gives the cobalt oxidation state, coordination number and number of d electrons? Co is [Ar]3d⁷4s².',
    ["+3, 4, 6", "+3, 6, 6", "+2, 6, 7", "+1, 4, 8"], 1,
    'Two chlorides contribute −2, so cobalt is +3. Two en ligands provide four donor atoms and the chlorides provide two more. Removing two 4s and one 3d electron gives d⁶.'),
  item(29, 'One enantiomer of 2-bromobutane undergoes substitution through an idealised planar carbocation intermediate. Both faces are equally accessible. What follows for the proportion of products and the optical rotation of the mixture?',
    ["Two enantiomers in a 3:1 ratio and zero net rotation", "A single enantiomer and the original rotation", "Equal proportions of two structural isomers and zero net rotation", "Equal proportions of two enantiomers and zero net rotation"], 3,
    'Removal of bromide creates a planar intermediate at carbon 2. Attack from opposite faces forms opposite configurations with equal probability. Equal rotations in opposite directions cancel.'),
  item(30, 'One cyclohexene C=C bond releases about 120 kJ mol⁻¹ on hydrogenation. Benzene releases 208 kJ mol⁻¹ on hydrogenation to cyclohexane. Relative to a hypothetical ring with three isolated C=C bonds, what is the energy of benzene?',
    ["88 kJ mol⁻¹ lower", "568 kJ mol⁻¹ lower", "152 kJ mol⁻¹ lower", "152 kJ mol⁻¹ higher"], 2,
    'Three isolated double bonds predict −360 kJ mol⁻¹ for the same final saturated ring. Benzene releases only 208, so it starts 360 − 208 = 152 kJ mol⁻¹ lower in energy.'),
  item(31, 'C₆H₅Cl and C₆H₅CH₂Cl are compared under the same mild aqueous hydrolysis conditions. Which prediction and structural explanation fit the observations?',
    ["C₆H₅CH₂Cl reacts faster because the aryl C–Cl bond in C₆H₅Cl has partial double-bond character", "C₆H₅CH₂Cl reacts more slowly because its chlorine is directly bonded to the ring", "Both react equally quickly because both contain one C–Cl bond", "C₆H₅Cl reacts faster because its C–Cl bond is shorter"], 0,
    'In chlorobenzene a chlorine lone pair can overlap with the ring π system. The resulting C–Cl bond is relatively strong. The CH₂ group in benzyl chloride separates chlorine from the aromatic ring.'),
  item(32, 'A mixture contains phenol and ethanol. Aqueous sodium hydroxide is added, followed by just enough dilute acid to neutralise the solution. Which species forms selectively in the first step and is consumed in the second?',
    ["Phenoxide, because phenol is a stronger base than ethanol", "Phenoxide, whose charge is delocalised over the aromatic system", "Ethoxide, whose charge is delocalised over two carbon atoms", "Ethoxide, because ethanol ionises completely in water"], 1,
    'Phenol transfers a proton to hydroxide appreciably because its conjugate base is resonance stabilised. Dilute acid reprotonates phenoxide. Ethanol remains largely unreacted with aqueous hydroxide.'),
  item(33, 'A 0.0100 mol sample of ethanoyl chloride is completely hydrolysed in excess water. What volume of 0.200 mol dm⁻³ NaOH is required to neutralise all the acid formed?',
    ["50.0 cm³", "200 cm³", "25.0 cm³", "100 cm³"], 3,
    'Hydrolysis gives one mole each of HCl and ethanoic acid per mole of acyl chloride. Both are monoprotic, so the total is 0.0200 mol NaOH or 0.100 dm³.'),
  item(34, 'Glycine has pKₐ values 2.3 (COOH) and 9.6 (NH₃⁺). At pH 12, what is its predominant overall charge and towards which electrode will it migrate?',
    ["+1, negative electrode", "−1, positive electrode", "−2, positive electrode", "0, neither electrode"], 1,
    'Above both pKₐ values the carboxyl group is COO⁻ and the amino group is predominantly NH₂. The net charge of −1 drives migration towards the positive electrode.'),
  item(35, 'One unbranched polyester molecule is formed from 50 molecules of HO(CH₂)₂OH and 50 molecules of HOOC(CH₂)₄COOH, with no rings. What mass of water is released per mole of these polymer molecules? Mᵣ(H₂O) = 18.',
    ["1764 g", "1782 g", "1800 g", "900 g"], 1,
    'Connecting 100 monomer molecules into one linear chain forms 99 links. Each ester link eliminates one H₂O. For one mole of chains the mass is 99 × 18 = 1782 g.'),
  item(36, 'A synthesis begins with 10.0 g of benzoic acid (Mᵣ 122). Conversion to benzoyl chloride has a 75.0% yield, then reaction with ethanol to give ethyl benzoate (Mᵣ 150) has an 80.0% yield. What mass of ester is isolated?',
    ["6.00 g", "7.38 g", "12.3 g", "9.22 g"], 1,
    'Each step has 1:1 stoichiometry. The final amount is (10.0/122) × 0.75 × 0.80 = 0.0492 mol. Multiplying by 150 gives 7.38 g.'),
  item(37, 'An ester C₄H₈O₂ gives the proton NMR data shown. Which assignment identifies the ester and the group giving the quartet?',
    ["Methyl propanoate and OCH₃", "Ethyl ethanoate and COCH₃", "Ethyl ethanoate and OCH₂", "Methyl propanoate and CH₂ next to C=O"], 2,
    'The quartet and triplet reveal an ethyl group. The quartet lies near 4.1 ppm, consistent with OCH₂. The 2.1 ppm singlet is CH₃ adjacent to the ester carbonyl.',
    table('¹H NMR signals', ['δ / ppm', 'Splitting', 'Relative area'], [['1.2', 'triplet', '3'], ['2.1', 'singlet', '3'], ['4.1', 'quartet', '2']])),
];
