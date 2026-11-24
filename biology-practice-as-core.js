import { calculations, choices, part, table } from './science-practice-tools.js';

const simple = (bank, rows) => choices('biology-' + bank, 'simple', rows);
const challenge = (bank, rows) => choices('biology-' + bank, 'challenge', rows);
const numeric = (bank, rows) => calculations('biology-' + bank, rows);

function diagram(caption, alt, drawing) {
  return {
    caption, alt,
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 210" aria-hidden="true">' +
      '<g font-family="system-ui, sans-serif" font-size="15" fill="#26374d">' + drawing + '</g></svg>',
  };
}

const epithelialSketch = diagram(
  'Apical edge of a cell from the small intestine',
  'A cell border has many short, closely packed projections of equal length facing the lumen. The label X points to one projection.',
  '<path d="M70 156V109H110V75h10v34h9V75h10v34h9V75h10v34h9V75h10v34h9V75h10v34h9V75h10v34h9V75h10v34h9V75h10v34h9V75h10v34h9V75h10v34h40v47Z" fill="#d9f2e6" stroke="#22694e" stroke-width="2.5"/>' +
  '<ellipse cx="195" cy="135" rx="22" ry="12" fill="#acd8c5" stroke="#22694e"/>' +
  '<path d="M185 36L170 74m-2-9 2 9 7-4" fill="none" stroke="#26374d" stroke-width="2"/>' +
  '<text x="185" y="31">X</text><text x="305" y="66">Lumen</text><text x="315" y="188">Cell interior</text>',
);

const cellStructure = [
  ...simple(1, [
    ['surface-electron-image', 'Which microscope is best suited to showing the three-dimensional appearance of pollen grain surfaces?', 'Scanning electron microscope',
      ['Transmission electron microscope', 'Light microscope with an eyepiece graticule', 'Hand lens'],
      'A scanning electron microscope scans the specimen surface. Differences in the detected signal reveal external features and give the image a three-dimensional appearance.'],
    ['nucleolus-ribosome-assembly', 'Which part of a eukaryotic nucleus is involved in making ribosomal RNA and assembling ribosomal subunits?', 'Nucleolus',
      ['Nuclear envelope', 'Chromosome centromere', 'Smooth endoplasmic reticulum'],
      'Ribosomal RNA is made and combined with proteins in the nucleolus. Ribosomal subunits then pass out through nuclear pores.'],
    ['lysosome-digestion', 'Which organelle contains enzymes that digest worn-out organelles inside an animal cell?', 'Lysosome',
      ['Centriole', 'Nucleolus', 'Smooth endoplasmic reticulum'],
      'Lysosomes enclose hydrolytic enzymes in a membrane. These enzymes break down cellular materials so their components can be reused.'],
    ['tonoplast-location', 'The tonoplast separates which two regions of a typical plant cell?', 'Vacuole contents and cytoplasm',
      ['Cytoplasm and cell wall', 'Nucleoplasm and cytoplasm', 'Chloroplast stroma and thylakoid interior'],
      'The tonoplast is the membrane surrounding the large permanent vacuole. It separates cell sap inside the vacuole from the surrounding cytoplasm.'],
    ['prokaryote-wall-constituent', 'What is the main structural material of a typical bacterial cell wall?', 'Peptidoglycan',
      ['Cellulose', 'Starch', 'Cholesterol'],
      'Peptidoglycan forms a strong mesh outside the cell surface membrane of a typical bacterium.'],
    ['organelle-ribosome-type', 'Which organelle contains 70S ribosomes as well as its own small circular DNA?', 'Mitochondrion',
      ['Golgi apparatus', 'Lysosome', 'Nucleolus'],
      'Mitochondria contain small circular DNA and 70S ribosomes. The ribosomes in the eukaryotic cytoplasm are 80S.'],
  ]),
  ...challenge(1, [
    ['apical-packing-sketch', 'What is X, and how does the pattern in the drawing support the function of this cell?', 'A microvillus. Many projections increase the surface area available for absorption.',
      ['A cilium. Many projections generate a current that moves absorption products.', 'A plasmodesma. Many projections connect the cell to the intestinal lumen.', 'A centriole. Many projections anchor the nucleus during absorption.'],
      'Microvilli are short projections of the cell surface. Packing many into the apical border increases the area for exchange with the contents of the intestine.', epithelialSketch],
    ['three-cell-profiles', 'Three teaching specimens have the features shown. Which assignments best fit the evidence?', 'P is a bacterium, Q is a plant cell and R is an animal cell.',
      ['P is a plant cell, Q is a bacterium and R is an animal cell.', 'P is an animal cell, Q is a plant cell and R is a bacterium.', 'P is a bacterium, Q is an animal cell and R is a plant cell.'],
      'P has a peptidoglycan wall and 70S ribosomes with no nucleus. Q has a nucleus and a cellulose wall. R has a nucleus and a boundary formed by its cell surface membrane.',
      table('Structures identified in each specimen', ['Specimen', 'Nucleus', 'Outer structure', 'Ribosomes in cytoplasm'], [
        ['P', 'Absent', 'Peptidoglycan wall', '70S'], ['Q', 'Present', 'Cellulose wall', '80S'], ['R', 'Present', 'Cell surface membrane', '80S'],
      ])],
    ['sectioned-lipid-cell', 'An electron micrograph of a cell specialised for lipid synthesis shows many membrane tubules without attached ribosomes. Which structure best matches both observations?', 'Smooth endoplasmic reticulum',
      ['Rough endoplasmic reticulum', 'Golgi transport vesicles', 'Nuclear pores'],
      'Smooth endoplasmic reticulum is a network of membranes with no ribosomes attached. Its enzymes take part in lipid synthesis.'],
    ['drawing-graticule-purpose', 'A student wants a low-power plan of the tissues across a thin plant stem. Which record best shows tissue arrangement and allows a reader to judge size?', 'Draw clear boundaries between the tissue regions at their observed proportions, and include a calibrated scale bar.',
      ['Draw every cell nucleus at a standard size regardless of its location, with the objective number in the margin.', 'Shade each tissue according to how dark it looked, with the diameter of the eyepiece written below.', 'Draw each tissue region at the same width, with a label for each cell organelle.'],
      'A low-power plan records tissue boundaries in proportion. Calibrating the scale bar lets a reader relate the drawing to the size of the specimen.'],
  ]),
  ...numeric(1, [
    ['printed-scale-resize', 'A printed image of a leaf cell shows a 16 mm scale bar representing 8 µm. The cell spans 52 mm on the image. The whole page is then printed at 75% of its original linear size.',
      [part('Find the actual width of the cell.', 26, 'µm'), part('Find the magnification on the smaller print.', 1500, '×')],
      'The bar-to-cell scale comparison gives 52 ÷ 16 × 8 = 26 µm. The width on the smaller print is 39 mm or 39 000 µm. Dividing 39 000 by 26 gives ×1500.'],
  ]),
];

const biologicalMolecules = [
  ...simple(2, [
    ['starch-iodine-colour', 'What indicates a positive result when iodine solution is added to a sample of starch?', 'A blue-black colour',
      ['A lilac colour', 'A cloudy white emulsion', 'A brick-red precipitate'],
      'Iodine associates with the coiled amylose in starch to give a blue-black colour.'],
    ['glucose-anomer-position', 'Which ring carbon has an –OH group in a different orientation in α-glucose and β-glucose?', 'Carbon 1',
      ['Carbon 2', 'Carbon 4', 'Carbon 6'],
      'The anomers differ in the orientation of the hydroxyl group at carbon 1. In conventional ring drawings it is below the ring in α-glucose and above it in β-glucose.'],
    ['triglyceride-link-count', 'How many ester bonds connect fatty acid residues to the glycerol in one triglyceride molecule?', 'Three',
      ['One', 'Two', 'Four'],
      'Each of glycerol’s three hydroxyl groups forms an ester bond with one fatty acid.'],
    ['lipid-drop-water', 'Which molecular property allows triglycerides to form energy-storing droplets in watery cytoplasm?', 'The molecules are non-polar and largely insoluble in water.',
      ['The molecules have a large charged phosphate head.', 'The molecules dissociate into soluble monomers.', 'The molecules form long hydrogen-bonded chains in water.'],
      'The hydrocarbon chains are hydrophobic. Triglycerides collect in droplets in an aqueous environment.'],
    ['folding-structure-level', 'Which level of protein structure describes the overall three-dimensional shape of a single polypeptide?', 'Tertiary structure',
      ['Primary structure', 'Secondary structure', 'Quaternary structure'],
      'Tertiary structure is the overall folding of one chain, arising from interactions between groups in that chain.'],
    ['high-latent-heat-sweat', 'Which property of water allows evaporation of sweat to remove a large amount of thermal energy?', 'High latent heat of vaporisation',
      ['High transparency to visible light', 'High density in the solid state', 'Low surface tension'],
      'Energy is needed to overcome hydrogen bonding as water evaporates. Each gram of water that leaves as vapour carries away a substantial amount of energy.'],
  ]),
  ...challenge(2, [
    ['starch-and-lipid-screen', 'Each food extract contains a single main storage molecule. Which assignment fits all three tests?', 'P contains starch, Q contains triglyceride and R contains a reducing sugar.',
      ['P contains triglyceride, Q contains starch and R contains a reducing sugar.', 'P contains starch, Q contains a reducing sugar and R contains triglyceride.', 'P contains a reducing sugar, Q contains triglyceride and R contains starch.'],
      'Blue-black iodine identifies starch. The white emulsion identifies lipid. A coloured precipitate in the heated Benedict’s test identifies reducing sugar.',
      table('Food test observations', ['Extract', 'Iodine', 'Emulsion test', 'Benedict’s test'], [
        ['P', 'Blue-black', 'Clear', 'Blue'], ['Q', 'Yellow-brown', 'White emulsion', 'Blue'], ['R', 'Yellow-brown', 'Clear', 'Orange precipitate'],
      ])],
    ['amino-acid-charge-contact', 'Two side chains in a protein carry opposite charges at neutral pH. On acidification, the negatively charged side chain becomes neutral and folding changes. Which interaction was most directly lost?', 'An ionic attraction between the two side chains',
      ['A peptide bond linking the two amino acids', 'A disulfide bond between the two side chains', 'A hydrogen bond joining two water molecules'],
      'Ionic attraction depends on both groups carrying a charge. Neutralising one side chain removes the electrostatic attraction that helped stabilise the fold.'],
    ['straight-versus-kinked-fat', 'Two triglycerides have fatty acid tails of equal length. One contains several cis carbon–carbon double bonds, and the other has only single bonds in its tails. Which tends to have the lower melting point, and why?', 'The one with several cis double bonds. Bends in its tails impede close packing.',
      ['The one with only single bonds. Straight tails impede close packing.', 'The one with cis double bonds. It forms more ester bonds with glycerol.', 'The one with single bonds. Its tails carry charges that repel.'],
      'Cis double bonds introduce kinks in fatty acid tails. The kinked tails pack less closely, so less thermal energy is needed to separate neighbouring molecules.'],
    ['carbohydrate-compartment-roles', 'Microscopy shows aligned fibres in one plant fraction and compact coils of unbranched glucose chains in a second fraction. Which interpretation best links the shapes to their functions?', 'Cellulose chains pack in wall fibres for strength. Amylose coils provide compact storage.',
      ['Cellulose chains coil to store glucose. Amylose forms load-bearing fibres in the wall.', 'Glycogen lines the wall in aligned fibres. Cellulose coils inside storage granules.', 'Amylopectin forms unbranched coils to store glucose. Cellulose fibres make the cell surface membrane.'],
      'Cellulose consists of straight β-glucose chains that hydrogen-bond into microfibrils. Amylose is an unbranched α-glucose polymer that coils, allowing compact storage in starch.'],
  ]),
  ...numeric(2, [
    ['benedict-in-range-estimates', 'A calibrated colour measurement increases linearly over the range shown. Two diluted samples give readings of 0.26 and 0.42 respectively. Each diluted sample contains one volume of its original solution in four volumes of mixture.',
      [part('Estimate the concentration in the first original solution.', 12, 'mmol dm⁻³'), part('Estimate the concentration in the second original solution.', 20, 'mmol dm⁻³')],
      'The first reading is halfway between the readings for 2 and 4 mmol dm⁻³, giving 3 mmol dm⁻³ after dilution. The second is halfway between 4 and 6 mmol dm⁻³, giving 5 mmol dm⁻³. Multiplying both by four recovers 12 and 20 mmol dm⁻³.',
      table('Reducing sugar calibration under matched conditions', ['Concentration / mmol dm⁻³', 'Colour reading'], [
        ['2.0', '0.18'], ['4.0', '0.34'], ['6.0', '0.50'],
      ])],
    ['triglyceride-stoichiometry', 'A model esterification starts with 2.5 mmol of glycerol and 6.0 mmol of fatty acids. Assume every available fatty acid forms an ester bond, and only complete triglycerides are made.',
      [part('Find the amount of triglyceride formed.', 2, 'mmol'), part('Find the amount of glycerol left.', 0.5, 'mmol')],
      'A triglyceride requires three fatty acids and one glycerol. The 6.0 mmol of fatty acids therefore form 2.0 mmol of triglyceride, using 2.0 mmol of glycerol and leaving 0.5 mmol.'],
  ]),
];

const enzymes = [
  ...simple(3, [
    ['induced-fit-shape-change', 'What does the induced-fit model predict when a suitable substrate binds to an enzyme?', 'The active site changes shape as the substrate binds.',
      ['An active site is formed by cleavage of one of the substrate bonds.', 'The enzyme’s primary structure is replaced by the substrate sequence.', 'The substrate forms a permanent peptide bond to every amino acid in the active site.'],
      'Binding changes the shape of the enzyme slightly. This improves the fit and can help place bonds in the substrate under strain.'],
    ['buffer-fixed-ph', 'Why is a buffer included in a mixture used to investigate the effect of temperature on an enzyme?', 'It keeps the pH approximately constant.',
      ['It keeps the temperature constant.', 'It holds the product concentration at zero.', 'It allows the substrate concentration to increase as the reaction proceeds.'],
      'The buffer limits changes in pH. This controls a second factor that could change enzyme activity.'],
    ['colorimeter-measures-absorbance', 'What quantity can a colorimeter report directly when following the intensity of a coloured product?', 'Absorbance of light at the chosen wavelength',
      ['Number of active sites in the mixture', 'Enzyme concentration in all cases', 'Rate of collisions between substrate molecules'],
      'A colorimeter measures how much light of a selected wavelength passes through the sample and can report the corresponding absorbance.'],
    ['half-max-km', 'The maximum initial rate of an enzyme is 18 µmol min⁻¹. At which rate should the substrate concentration be read to estimate Kₘ?', '9 µmol min⁻¹',
      ['4.5 µmol min⁻¹', '18 µmol min⁻¹', '36 µmol min⁻¹'],
      'Kₘ is the substrate concentration at half the maximum rate. Half of 18 is 9 µmol min⁻¹.'],
    ['enzyme-at-low-temperature', 'An enzyme is cooled below its optimum temperature while its structure is preserved. Why does its initial reaction rate typically fall?', 'Molecules have less kinetic energy and successful collisions occur less often.',
      ['The number of substrate molecules immediately doubles.', 'The product becomes an enzyme that reverses all reactions.', 'Every active site remains occupied for a longer period because substrate concentration rises.'],
      'At a lower temperature, molecules move more slowly and fewer collisions have enough energy for reaction. The rate falls while the active site retains its shape.'],
    ['catalase-product-marker', 'Which product can be monitored to follow the breakdown of hydrogen peroxide by catalase?', 'Oxygen',
      ['Carbon dioxide', 'Starch', 'Glucose'],
      'Catalase breaks down hydrogen peroxide into water and oxygen. The volume of oxygen produced over time can indicate reaction rate.'],
  ]),
  ...challenge(3, [
    ['different-maxima-and-affinities', 'Two enzymes catalyse the same reaction. Which conclusion follows from comparing their maximum rates and their rates at 2.0 mmol dm⁻³ substrate?', 'Enzyme Q has the lower Kₘ even though enzyme P has the greater maximum rate.',
      ['Enzyme P has the lower Kₘ because it has the greater maximum rate.', 'Both enzymes have Kₘ below 2.0 mmol dm⁻³.', 'The two enzymes must have the same Kₘ because they catalyse the same reaction.'],
      'At 2.0 mmol dm⁻³, P is below half its maximum rate, so its Kₘ is above 2.0. Q is above half its own maximum, putting its Kₘ below 2.0. A smaller Kₘ indicates greater apparent affinity under these conditions.',
      table('Initial rates with the same substrate', ['Enzyme', 'Maximum rate / µmol min⁻¹', 'Rate at 2.0 mmol dm⁻³ / µmol min⁻¹'], [
        ['P', 80, 32], ['Q', 48, 30],
      ])],
    ['amylase-clock-endpoint', 'The tubes start with the same amount of starch. Each time is the first point at which a test sample shows no blue-black colour. Which comparison is justified?', 'R has approximately three times P’s average rate of starch disappearance up to the endpoint.',
      ['P has approximately three times R’s average rate of starch disappearance.', 'R has removed three times as much starch by the endpoint as P.', 'All three tubes have identical average rates because their final test colours match.'],
      'An equal amount of starch is removed up to the same test endpoint. Under that assumption the average disappearance rate is proportional to 1 ÷ time. The ratio for R to P is 120 ÷ 40 = 3.',
      table('Times to a shared iodine test endpoint', ['Tube', 'Time / s'], [['P', 120], ['Q', 80], ['R', 40]])],
    ['ph-recovery-inference', 'Separate samples of the same enzyme are held at two pH values, then returned to pH 7. Each sample receives fresh substrate for the pH 7 measurement. Which inference is best supported?', 'The reduction caused by the pH 5 treatment is largely reversible. The reduction caused by the pH 2 treatment persists.',
      ['Both treatments permanently destroy almost all active sites.', 'The pH 2 treatment is fully reversible. The pH 5 treatment has a persistent effect.', 'The results show that pH 2 is the enzyme’s optimum.'],
      'After return to pH 7, activity recovers to near the control after pH 5 treatment. It remains very low after pH 2 treatment, indicating a persistent impairment on this timescale.',
      table('Initial rate relative to the enzyme held at pH 7', ['Holding pH', 'Measured at holding pH / %', 'Measured after return to pH 7 / %'], [
        ['7', 100, 100], ['5', 44, 96], ['2', 3, 9],
      ])],
    ['colour-blank-correction', 'Two products are thought to form at different rates. The mixtures have different starting colours and the calibration is linear. Which comparison isolates the change due to coloured product formation over the first 30 s?', 'Compare the increases in absorbance from the starting values over the same 30 s.',
      ['Compare the absorbances at 30 s directly.', 'Divide each starting absorbance by its final absorbance.', 'Compare the starting colours and assume they reflect only new product.'],
      'Subtracting the starting absorbance corrects for the differing baseline colour. With a linear calibration and identical time intervals, the increases can be compared as product formation rates.',
      table('Absorbance readings', ['Mixture', 'At 0 s', 'At 30 s'], [['P', '0.18', '0.28'], ['Q', '0.30', '0.36']])],
  ]),
  ...numeric(3, [
    ['immobilised-cumulative-yield', 'One portion of free enzyme produces 14 mmol of product in a reaction and is discarded. One portion of immobilised enzyme produces 9, 8, 7 and 6 mmol in four consecutive uses. Product yields can be added across runs.',
      [part('Find the total product from the immobilised portion.', 30, 'mmol'), part('How much more product does it make than the free portion?', 16, 'mmol')],
      'The immobilised portion makes 9 + 8 + 7 + 6 = 30 mmol in total. This exceeds the single free-enzyme yield of 14 mmol by 16 mmol.'],
    ['enzyme-doubling-with-excess-substrate', 'Two tubes contain identical substrates at a concentration that initially saturates the enzyme. The rate doubles when the second tube receives twice as much enzyme. The first tube initially forms 0.24 mmol of product in 20 s.',
      [part('Find the initial rate in the first tube.', 0.012, 'mmol s⁻¹', 0.00001), part('Estimate the amount formed in the second tube over the same 20 s while the rate stays constant.', 0.48, 'mmol', 0.0005)],
      'The first rate is 0.24 ÷ 20 = 0.012 mmol s⁻¹. Doubling the amount of enzyme doubles the number of available active sites under saturating conditions, so the second tube forms 2 × 0.24 = 0.48 mmol.'],
  ]),
];

const membraneTransport = [
  ...simple(4, [
    ['bilayer-tails-away-from-water', 'Which property accounts for phospholipid tails lying inside the cell surface membrane bilayer?', 'The fatty acid tails are hydrophobic.',
      ['The fatty acid tails carry two phosphate groups.', 'The fatty acid tails form hydrogen bonds readily with water.', 'The fatty acid tails are soluble ions.'],
      'The non-polar tails associate with other tails, away from water. The hydrophilic heads contact the water on both surfaces.'],
    ['glycolipid-surface-position', 'Which part of a membrane glycolipid projects into the fluid on the outside of the cell?', 'Its carbohydrate chain',
      ['Its fatty acid tails', 'Its phospholipid bilayer', 'Its transmembrane channel'],
      'A glycolipid has carbohydrate attached to a lipid. The carbohydrate projects into the extracellular fluid, where it can contribute to recognition.'],
    ['endocytic-vesicle', 'What happens to the cell surface membrane during endocytosis?', 'It encloses external material and forms a vesicle in the cytoplasm.',
      ['It secretes material by fusing with a cytoplasmic vesicle.', 'It provides a channel that lets the entire vesicle diffuse in.', 'It becomes a cellulose wall around the material.'],
      'The membrane folds around external material. The invagination pinches off, leaving a membrane-bound vesicle inside the cell.'],
    ['plasmolysis-visible-change', 'Which observation identifies plasmolysis in a plant cell?', 'The cell surface membrane and its contents pull away from the cell wall.',
      ['The cell wall dissolves while the membrane remains in contact with it.', 'The vacuole expands and presses the cytoplasm tightly against the cell wall.', 'The nucleus divides to form two daughter nuclei.'],
      'Water leaves by osmosis into a solution of lower water potential. As the protoplast shrinks, the cell surface membrane draws away from the rigid cell wall.'],
  ]),
  ...challenge(4, [
    ['dialysis-iodine-benedicts', 'Dialysis tubing initially contains starch and glucose. It is surrounded by water. The outside liquid later gives a positive Benedict’s test and a negative starch test. The starch is still present inside. What best explains these results?', 'Glucose molecules crossed the tubing, while the much larger starch molecules stayed inside.',
      ['Starch molecules crossed the tubing and glucose stayed inside.', 'Starch passed through the tubing exactly as quickly as glucose.', 'The tubing actively pumped starch out of the surrounding water.'],
      'A positive Benedict’s test outside indicates that reducing sugar entered the water from the tubing. The starch test and retained starch are consistent with pores that allow small glucose molecules to diffuse through.'],
    ['animal-plant-osmosis-compared', 'An animal cell and a turgid plant cell with identical starting water potentials are transferred to a dilute solution of higher water potential. Which outcome is most likely?', 'Water enters both. It may cause an animal cell to burst, while the plant cell wall resists further expansion.',
      ['Water leaves both. It makes the animal cell burst and the plant cell more turgid.', 'Water enters only the animal cell because the plant cell wall prevents entry of water.', 'Water enters both until the plant cell wall disappears and the animal cell becomes turgid.'],
      'The higher external water potential drives water into both cells. The plant cell wall limits swelling. An animal cell lacks a rigid wall and may lyse if it swells too far.'],
    ['vesicle-label-under-membrane', 'A labelled protein is initially inside vesicles near a cell’s surface. Later the label is detected in the surrounding fluid and the vesicle membrane has become part of the cell surface membrane. Which process explains both findings?', 'Exocytosis',
      ['Endocytosis', 'Facilitated diffusion through a carrier', 'Active transport through an ion pump'],
      'During exocytosis a vesicle membrane fuses with the cell surface membrane. Its membrane contributes to the cell surface and its contents are released outside the cell.'],
    ['ligand-response-and-binding', 'A signalling cell releases ligand L into a solution containing two target cell types. Both types get the same dose and remain viable. The observations are shown. Which interpretation best fits the observations?', 'Only cell type P has a detectable receptor that binds L and can initiate the measured response.',
      ['Cell type Q must absorb more L because it shows no labelled binding.', 'The two cell types necessarily have the same receptors and the same responses.', 'The shape of L makes cell-surface recognition independent of receptors.'],
      'Ligand binding to P and its subsequent response are consistent with a cell-surface receptor specific to L. The matched dose rules out the simplest explanation that Q received less ligand.',
      table('Results after exposure to ligand L', ['Cell type', 'Labelled L binds to surface', 'Measured response'], [
        ['P', 'Yes', 'Present'], ['Q', 'Below detection', 'Absent'],
      ])],
    ['temperature-and-membrane-leakage', 'Identical membrane models contain different proportions of cholesterol. Equal amounts of a small dye are trapped inside each model. At 42 °C, 18% of the dye escapes from the model with more cholesterol and 46% escapes from the model with less. Which conclusion follows?', 'More cholesterol is associated with lower permeability to the dye at this temperature.',
      ['More cholesterol makes the dye twice as permeable to water.', 'More cholesterol increases dye movement through the membrane at this temperature.', 'Cholesterol caused active pumping of the dye into the warmer model.'],
      'Less dye escapes when more cholesterol is present. This is consistent with cholesterol restricting phospholipid movement and reducing leakage under the tested warm conditions.'],
  ]),
  ...numeric(4, [
    ['agar-core-fraction', 'Two agar cubes have sides of 2.0 cm and 4.0 cm. A dye diffuses exactly 0.50 cm inwards from every face in the same time. Any agar within that distance of a surface is stained.',
      [part('Find the percentage of the smaller cube that is stained.', 87.5, '%', 0.05), part('Find the percentage of the larger cube that is stained, to one decimal place.', 57.8, '%', 0.05)],
      'Subtract 1.0 cm from the side of each cube to find its unstained core. The smaller cube has 1 cm³ of unstained agar out of 8 cm³, and the larger cube has 27 cm³ out of 64 cm³. The stained fractions are 7/8 and 37/64.'],
  ]),
];

const dividingCell = diagram(
  'A cell in one phase of mitosis',
  'Spindle fibres extend inwards from opposite poles. Two separate groups of V-shaped chromatids are moving away from the centre towards the poles. There is one undivided cell.',
  '<ellipse cx="209" cy="106" rx="154" ry="70" fill="#eef4ff" stroke="#235b97" stroke-width="2.5"/>' +
  '<g stroke="#6586aa" stroke-width="1.6"><path d="M80 106L154 68M80 106L147 105M80 106L157 143M340 106L267 68M340 106L274 105M340 106L265 143"/></g>' +
  '<g stroke="#4338a8" stroke-width="5" stroke-linecap="round" fill="none"><path d="M172 59L154 68l18 10M167 96L147 105l20 10M175 134L157 143l18 10M250 59L267 68l-17 10M255 96L274 105l-19 10M247 134L265 143l-18 10"/></g>' +
  '<circle cx="80" cy="106" r="5" fill="#235b97"/><circle cx="340" cy="106" r="5" fill="#235b97"/>' +
  '<text x="54" y="195">Pole</text><text x="328" y="195">Pole</text>',
);

const mitoticCellCycle = [
  ...simple(5, [
    ['centromere-role', 'What is the name of the constricted region that holds the sister chromatids of a duplicated chromosome together?', 'Centromere',
      ['Telomere', 'Nucleolus', 'Plasmodesma'],
      'The centromere is the region at which sister chromatids remain joined before they separate in mitosis.'],
    ['histones-pack-dna', 'Which proteins are associated with packaging DNA in a eukaryotic chromosome?', 'Histones',
      ['Collagens', 'Amylases', 'Haemoglobins'],
      'DNA is wound around histone proteins. This helps organise the DNA and makes it possible to compact chromosomes.'],
    ['sequence-after-s-phase', 'Which stage follows S phase and precedes mitosis in a typical cell cycle?', 'G2',
      ['G1', 'Cytokinesis', 'Telophase'],
      'A typical cycle progresses from G1 to S to G2, then mitosis and cytokinesis. G2 is a period of preparation for division after DNA replication.'],
    ['growth-by-mitosis', 'How does mitosis contribute to an increase in the size of a growing root?', 'It increases the number of genetically similar cells.',
      ['It halves the chromosome number in each new root cell.', 'It reduces the number of root cells as individual cells expand.', 'It makes root cells use no DNA.'],
      'Mitosis distributes replicated chromosomes to two daughter nuclei. Cytokinesis then allows the divisions to increase the number of cells in the growing root.'],
    ['stem-cell-role-repair', 'Which property allows tissue stem cells to help replace cells lost through damage?', 'They can divide and give rise to cells that specialise.',
      ['They each contain half the normal number of chromosomes.', 'They have already lost their nuclei.', 'They are unable to progress through the cell cycle.'],
      'Tissue stem cells can divide by mitosis. Some of their descendants differentiate into the specialised cells needed to replenish the tissue.'],
    ['tumour-formation', 'Which change can directly lead to the formation of a tumour?', 'Cell division continues despite signals that normally stop it.',
      ['Every daughter cell receives the same chromosome number as its parent.', 'Cells pause in G1 when there are insufficient resources.', 'Spindle fibres separate sister chromatids in an orderly way.'],
      'If growth regulation fails, continued division can build up an abnormal mass of cells.'],
  ]),
  ...challenge(5, [
    ['separating-chromatids-figure', 'Which mitotic phase is shown, and what has happened to the duplicated chromosomes?', 'Anaphase. Sister chromatids have separated and move towards opposite poles.',
      ['Prophase. Duplicated chromosomes are first starting to condense.', 'Metaphase. Duplicated chromosomes are attached at the equator.', 'Telophase. Chromosomes are enclosed within newly formed nuclei.'],
      'The separate V-shaped chromatids are on either side of the equator and move centromere first towards the poles. This is characteristic of anaphase.', dividingCell],
    ['nuclear-envelope-timing', 'A set of three mitotic drawings was mixed up. A shows duplicated chromosomes individually aligned across the centre. B shows chromosomes beginning to condense in a nucleus with its envelope still visible. C shows two groups enclosed by newly forming nuclear envelopes. In what order did these observations occur?', 'B, A, C',
      ['A, B, C', 'C, B, A', 'B, C, A'],
      'B shows early prophase, before the chromosomes align. A shows metaphase. Nuclear envelopes form again around the two groups of chromosomes in telophase, shown by C.'],
    ['plant-and-animal-cytokinesis', 'Tissues P and Q both undergo mitosis. The dividing cells have the features shown. Which interpretation is supported?', 'P is consistent with a plant cell. Q is consistent with an animal cell.',
      ['P is consistent with an animal cell. Q is consistent with a plant cell.', 'Both must be animal cells because both formed two daughter nuclei.', 'Both must be plant cells because both separate their cytoplasm.'],
      'A rigid cell wall prevents the entire plant cell from pinching in, so a cell plate grows between the daughter nuclei. In an animal cell the surface membrane is drawn inwards to form a cleavage furrow.',
      table('End of division in two tissues', ['Tissue', 'Cell boundary before division', 'Visible change during division'], [
        ['P', 'Rigid wall outside membrane', 'Partition grows outwards from the centre'], ['Q', 'Cell surface membrane', 'Outer surface pinches inwards'],
      ])],
    ['dividing-root-region-interpretation', 'Two regions of a root are sampled at the same instant. P contains 28 cells in mitosis out of 140. Q contains 16 cells in mitosis out of 48. Which statement follows from these observations alone?', 'Q has the larger observed proportion in mitosis. Stage durations and the long-term division rate are still unknown.',
      ['P has the larger proportion in mitosis because it contains more dividing cells.', 'The two regions have identical proportions in mitosis.', 'Q necessarily completes a full cell cycle every 48 minutes.'],
      'The mitotic fractions are 28/140 = 20% and 16/48 ≈ 33%. A single snapshot compares these fractions. The durations of individual stages would require additional evidence.'],
  ]),
  ...numeric(5, [
    ['mitotic-index-combined-samples', 'A student counts cells in two microscope fields of the same plant tissue. Estimate the whole-sample mitotic index using the counts from both fields.',
      [part('Find the total number of cells scored as undergoing mitosis.', 26, 'cells'), part('Find the combined mitotic index as a percentage.', 20, '%', 0.05)],
      'There are 18 + 8 = 26 mitotic cells among 40 + 90 = 130 cells. The combined index is 100 × 26 ÷ 130 = 20%. This weights each field by the number of cells it contains.',
      table('Cell counts in two fields', ['Field', 'All cells counted', 'Cells in mitosis'], [
        ['A', 40, 18], ['B', 90, 8],
      ])],
    ['synchronous-growth-counts', 'Eight identical plant cells enter a model of synchronous growth. In each round every cell finishes mitosis and cytokinesis. Assume all new cells then divide at the next round and none are lost.',
      [part('Find the number of cells after four rounds.', 128, 'cells'), part('How many additional cells are formed during the fifth round?', 128, 'cells')],
      'The population doubles in each round, so after four rounds it is 8 × 2⁴ = 128. In the fifth round each of those divisions adds one cell to the total, increasing it by another 128.'],
  ]),
];

const nucleicAcids = [
  ...simple(6, [
    ['purine-pair', 'Which two bases are purines?', 'Adenine and guanine',
      ['Adenine and thymine', 'Cytosine and uracil', 'Guanine and cytosine'],
      'Adenine and guanine each have a double-ring structure. Cytosine, thymine and uracil have a single ring and are pyrimidines.'],
    ['rna-specific-components', 'Which combination is characteristic of an mRNA nucleotide when compared with DNA nucleotides?', 'Ribose and, in one type of nucleotide, uracil',
      ['Deoxyribose and thymine', 'Ribose and thymine in every nucleotide', 'Glycerol and uracil'],
      'RNA contains ribose. Uracil is one of its four bases, occupying the role of thymine in complementary base pairing with adenine.'],
    ['atp-phosphate-count', 'How many phosphate groups are present in one molecule of ATP?', 'Three',
      ['One', 'Two', 'Four'],
      'ATP is adenosine triphosphate. Its adenosine component consists of adenine and ribose linked to a chain of three phosphates.'],
    ['transcription-enzyme-role', 'Which enzyme joins RNA nucleotides together during transcription?', 'RNA polymerase',
      ['DNA polymerase', 'DNA ligase', 'Pepsin'],
      'RNA polymerase forms an RNA strand complementary to the DNA template by linking RNA nucleotides.'],
    ['ligase-replication-role', 'What is the role of DNA ligase in natural DNA replication?', 'It seals the joins between newly synthesised DNA fragments.',
      ['It carries amino acids to the ribosome.', 'It translates RNA codons into a sequence of amino acids.', 'It forms hydrogen bonds between the two parental DNA strands.'],
      'Ligase joins adjacent ends in a newly made strand by forming covalent bonds in its sugar–phosphate backbone.'],
    ['primary-transcript-introns', 'What happens to introns during processing of a typical eukaryotic primary RNA transcript?', 'They are removed before the mature mRNA is translated.',
      ['They become the amino acids at the beginning of the new protein.', 'They are copied back into the original chromosome by the ribosome.', 'They form the sugar–phosphate backbone of tRNA.'],
      'Splicing removes the introns and joins the remaining exons before the mature mRNA is used in translation.'],
  ]),
  ...challenge(6, [
    ['two-abstract-mutation-patterns', 'In a paper model, a ribosome reads consecutive groups of three bases from a fixed start. In model P a single base is replaced. In model Q a single base is removed near the start. Which comparison is correct?', 'P may change one codon. Q shifts the reading frame for codons after the deletion.',
      ['P shifts the reading frame after the replacement. Q leaves all groups after the deletion unchanged.', 'Both changes shift the reading frame in the same way.', 'Q removes one whole codon and leaves the grouping of all remaining bases unchanged.'],
      'Replacing one base preserves the number and positions of groups of three. Deleting one base brings subsequent bases into new groups of three.'],
    ['three-base-deletion-in-frame', 'Two model mRNAs are translated from the same start position. One is three nucleotides shorter because one complete codon was removed from the middle of the coding region. Assume no stop or start codon was removed. What follows?', 'One amino acid is omitted, and the downstream codons keep their original grouping.',
      ['Three amino acids are omitted, and the downstream codons shift by one position.', 'A replacement amino acid is added at every subsequent position.', 'Translation must stop immediately before the removed codon.'],
      'A codon occupies three nucleotides. Removing a complete internal codon reduces polypeptide length by one amino acid and preserves the original downstream groups.'],
    ['ribosome-codon-and-anticodon', 'A model ribosome is positioned at a sense codon in a benign plant-cell mRNA. Two tRNAs carry amino acids, but only tRNA P has a matching anticodon. What is the expected next event?', 'The anticodon on P pairs with the codon, allowing its amino acid to be added to the growing chain.',
      ['The codon on P joins the DNA template in the nucleus.', 'The ribosome selects the other tRNA because mismatched base pairing is required.', 'P catalyses the addition of a nucleotide to DNA instead of contributing an amino acid.'],
      'Complementarity between the codon and anticodon places the attached amino acid in the ribosome for peptide bond formation.'],
    ['labelled-exons-and-introns', 'A diagram represents a primary transcript with the order exon A, intron P, exon B, intron Q, exon C. The corresponding mature mRNA from this model contains each exon once in its original order. What change accounts for the observed arrangement?', 'P and Q were removed by RNA splicing and A, B and C were joined.',
      ['A, B and C were removed so that P and Q could be joined.', 'P and Q were translated separately and joined by peptide bonds to A, B and C.', 'A, B and C were copied into the coding strand by DNA ligase.'],
      'In the stated model, splicing removes the two introns and keeps the three exon regions in their original order.'],
    ['replication-product-evidence', 'In a model of natural DNA replication, complementary bases have paired correctly throughout a newly copied region. The copies on one strand contain several gaps in their sugar–phosphate backbone between adjacent fragments. Which feature explains why this occurs on one strand?', 'The lagging strand is synthesised in separate fragments because DNA polymerase can extend a strand only in the 5′ to 3′ direction.',
      ['New DNA bases cannot pair with a lagging-strand template.', 'DNA polymerase adds nucleotides in the 3′ to 5′ direction only on the lagging strand.', 'The two strands of a DNA double helix run in the same direction.'],
      'The templates are antiparallel. Both new strands are made 5′ to 3′, so the lagging strand is copied in shorter regions that need to be joined.'],
  ]),
  ...numeric(6, [
    ['transcript-length-and-protein', 'In a simplified eukaryotic gene model, a 447-nucleotide primary transcript contains two introns of 144 and 75 nucleotides. After their removal, all retained nucleotides form the coding sequence including the terminal stop codon.',
      [part('Find the number of nucleotides in the retained sequence.', 228, 'nucleotides'), part('Find the number of amino acids encoded, counting the start codon as one amino acid.', 75, 'amino acids')],
      'The retained length is 447 − 144 − 75 = 228. This gives 228 ÷ 3 = 76 codons. The stop codon contributes no amino acid, leaving 75 amino acids in the model polypeptide.'],
  ]),
];

const vascularPlans = diagram(
  'Plan diagrams of two transverse sections. Green marks xylem and purple marks phloem.',
  'In P, a green cross lies at the centre, with four purple patches in the spaces between its arms. In Q, four separate bundles form a ring around the centre, with green inside and purple outside in each bundle.',
  '<text x="102" y="30">P</text><text x="308" y="30">Q</text>' +
  '<circle cx="108" cy="105" r="65" fill="#f2f8f5" stroke="#6a877c" stroke-width="2"/>' +
  '<circle cx="108" cy="105" r="42" fill="none" stroke="#a9bbb4" stroke-width="2"/>' +
  '<path d="M101 74h14v24h24v14h-24v24h-14v-24H77V98h24z" fill="#38836a"/>' +
  '<g fill="#81529b"><circle cx="91" cy="88" r="5"/><circle cx="125" cy="88" r="5"/>' +
  '<circle cx="91" cy="122" r="5"/><circle cx="125" cy="122" r="5"/></g>' +
  '<circle cx="314" cy="105" r="65" fill="#f2f8f5" stroke="#6a877c" stroke-width="2"/>' +
  '<path d="M306 63h16v9h-16z M306 138h16v9h-16z M272 97h9v16h-9z M347 97h9v16h-9z" fill="#38836a"/>' +
  '<path d="M306 53h16v10h-16z M306 147h16v10h-16z M262 97h10v16h-10z M356 97h10v16h-10z" fill="#81529b"/>' +
  '<rect x="107" y="187" width="12" height="12" rx="2" fill="#38836a"/><text x="125" y="198">Xylem</text>' +
  '<rect x="220" y="187" width="12" height="12" rx="2" fill="#81529b"/><text x="238" y="198">Phloem</text>',
);

const plantTransport = [
  ...simple(7, [
    ['lignified-vessel-wall', 'How does lignin in xylem vessel walls help a vessel transport water?', 'It strengthens the wall against collapse when the water column is under tension.',
      ['It pumps water through the vessel using ATP.', 'It forms the membrane around the vessel contents.', 'It converts dissolved minerals to sucrose.'],
      'Lignin stiffens the vessel wall and resists inward deformation under the tension produced by transpiration.'],
    ['xylem-pit-lateral', 'What do pits in the side walls of xylem vessels allow?', 'Movement of water between neighbouring vessels',
      ['Active transport of sucrose along a vessel', 'Division of mature vessel elements to replace water', 'Evaporation of water directly into the atmosphere from the root'],
      'Pits are regions where the thick secondary wall has not been deposited. Water can pass laterally through the remaining thin walls.'],
    ['sieve-plate-pores', 'What feature of a sieve plate allows sap to pass between adjacent sieve tube elements?', 'Pores in the end wall',
      ['A waterproof lignin layer', 'A store of starch granules', 'An end wall without any openings'],
      'The pores in the end wall connect the interiors of consecutive sieve tube elements. Sap passes through them during mass flow.'],
    ['apoplast-route', 'Water is moving through cellulose walls between the outside of a root and its endodermis. Which pathway is it following?', 'The apoplast pathway',
      ['The symplast pathway', 'The transpiration pathway through stomata', 'The mass-flow pathway in phloem'],
      'The apoplast includes cell walls and spaces outside cell membranes. The symplast consists of cytoplasm connected through plasmodesmata.'],
    ['mesophyll-evaporation-site', 'During transpiration, where does much of the liquid water become water vapour inside a leaf?', 'At the moist cell walls of the mesophyll',
      ['At the inner surface of the root endodermis', 'Inside the sieve plates of the phloem', 'In the waxy outer layer of the cuticle'],
      'Water evaporates from moist mesophyll walls into the leaf air spaces. Water vapour then diffuses out through the stomata.'],
    ['amino-acid-in-sap', 'Which organic solute can be carried with sucrose in phloem sap?', 'An amino acid',
      ['A cellulose microfibril', 'A starch granule', 'A sodium ion'],
      'Phloem carries dissolved organic assimilates, including sucrose and amino acids. Sodium is inorganic, while cellulose fibres and starch granules are insoluble.'],
  ]),
  ...challenge(7, [
    ['root-stem-plan-comparison', 'Which organs do the two plan diagrams most closely represent in a herbaceous dicotyledonous plant?', 'P is a root. Q is a stem.',
      ['P is a stem. Q is a root.', 'P is a leaf. Q is a root.', 'P and Q are both leaves.'],
      'A root has central xylem with phloem between the arms. In a stem, vascular bundles are arranged in a ring, with xylem nearer the centre than phloem within each bundle.', vascularPlans],
    ['endodermal-tracer-barrier', 'Two tracers move with water through a root. Tracer P remains in cell walls. Tracer Q can move through living root cells. P stops outside the stele, while Q reaches the xylem. Which feature explains the difference?', 'Suberin in the endodermal walls blocks the apoplast route into the stele. Q can cross the endodermis through living cells.',
      ['Lignin in sieve plates blocks Q but allows P to enter the xylem.', 'Plasmodesmata confine P to the apoplast and seal the walls outside the root.', 'The cell walls surrounding the root have no apoplast pathway.'],
      'The Casparian strip contains suberin that interrupts passage along the endodermal walls. Water and solutes that enter the symplast can pass the barrier before reaching the xylem.'],
    ['sunken-stomata-air-layer', 'A xerophytic leaf has stomata in pits lined with hairs. In still air, how can this arrangement reduce transpiration for the same number of open stomata?', 'The pits retain humid air near pores, reducing the water vapour concentration gradient out of the leaf.',
      ['The hairs reduce the humidity near the pores so less water evaporates inside the leaf.', 'The pits raise the water vapour gradient and direct vapour back into the xylem.', 'The hairs make guard cells impermeable to water so no water reaches the mesophyll.'],
      'Hairs reduce air movement through the pits. Water vapour accumulates near the pores, leaving a smaller concentration gradient between the leaf air spaces and the air next to the stomata.'],
    ['proton-gradient-loading', 'A teaching model shows a companion cell exporting H⁺. Sucrose enters with H⁺ as the ions move back into the cell. What happens if the outward proton pump stops and the existing H⁺ gradient dissipates?', 'Less sucrose is taken up by the cotransporter, reducing phloem loading at this source.',
      ['Sucrose uptake increases because the cotransporter normally carries H⁺ out.', 'Loading continues at the same rate because the proton gradient powers xylem movement only.', 'Sucrose concentration in the surrounding tissues falls immediately because sucrose is converted to H⁺.'],
      'The cotransporter uses the energy stored in the proton gradient. When the gradient dissipates, it provides less drive for taking up sucrose against its concentration gradient.'],
  ]),
  ...numeric(7, [
    ['shoot-water-balance', 'During a 20-minute observation a shoot absorbs 1.80 g of water. It retains 0.30 g as an increase in its water content. Assume evaporation from the leaves accounts for all the remaining water.',
      [part('Find the mass of water lost from the leaves.', 1.50, 'g', 0.01), part('Find the mean water loss per minute.', 75, 'mg min⁻¹', 0.1)],
      'Of the 1.80 g absorbed, 0.30 g stays in the shoot, so 1.50 g leaves as water vapour. This is 1500 mg over 20 minutes, giving 75 mg min⁻¹.'],
    ['source-sink-pressure-difference', 'Two plants have equivalent sieve tubes between the source leaf and root sink. Assume the concentration and viscosity of each sap sample are fixed. Use the pressure readings.',
      [part('Find the source-to-sink pressure difference in plant P.', 0.65, 'MPa', 0.01), part('Find how much greater this difference is in plant Q than in plant P.', 0.15, 'MPa', 0.01)],
      'Mass flow is driven by the hydrostatic pressure difference. For P it is 1.20 − 0.55 = 0.65 MPa. For Q it is 1.35 − 0.55 = 0.80 MPa, giving a difference of 0.15 MPa between plants.',
      table('Pressure inside the sieve tubes', ['Plant', 'Source / MPa', 'Sink / MPa'], [
        ['P', '1.20', '0.55'], ['Q', '1.35', '0.55'],
      ])],
  ]),
];

const saturationGraph = diagram(
  'Adult haemoglobin at a fixed carbon dioxide partial pressure',
  'Three labelled points lie on a sigmoid oxygen dissociation curve. Saturation rises from 20 percent at 2 kPa to 70 percent at 5 kPa, then to 95 percent at 11 kPa.',
  '<path d="M53 36v127h332M53 57h332M53 123h332" fill="none" stroke="#bdd0cc"/>' +
  '<path d="M53 163C81 163 100 152 112 138S167 83 200 74S268 49 376 42" fill="none" stroke="#27785e" stroke-width="3"/>' +
  '<g fill="#27785e"><circle cx="112" cy="138" r="4"/><circle cx="200" cy="74" r="4"/><circle cx="376" cy="42" r="4"/></g>' +
  '<text x="61" y="23">Haemoglobin saturation</text><text x="61" y="156">2 kPa, 20%</text>' +
  '<text x="210" y="93">5 kPa, 70%</text><text x="275" y="32">11 kPa, 95%</text>' +
  '<text x="128" y="189">Oxygen partial pressure</text>',
);

const mammalTransport = [
  ...simple(8, [
    ['vena-cava-route', 'Into which chamber does the vena cava deliver systemic venous blood?', 'Right atrium',
      ['Left atrium', 'Left ventricle', 'Right ventricle'],
      'The vena cava carries blood back from systemic tissues to the right atrium. Blood then passes to the right ventricle.'],
    ['capillary-wall-structure', 'Which tissue forms the wall immediately surrounding the lumen of a capillary?', 'A single layer of flattened endothelial cells',
      ['A thick coat of circular smooth muscle', 'Several layers of cartilage', 'A continuous layer of cardiac muscle'],
      'The capillary endothelium is one cell thick. This gives dissolved substances a short exchange distance.'],
    ['neutrophil-nucleus', 'Which blood cell usually has a nucleus divided into several lobes?', 'Neutrophil',
      ['Mature red blood cell', 'Lymphocyte', 'Monocyte'],
      'A neutrophil has a multilobed nucleus. Lymphocytes typically have large round nuclei, monocytes often have indented nuclei, and mature human red blood cells lack nuclei.'],
    ['carbonic-anhydrase-role', 'What is the role of carbonic anhydrase in red blood cells?', 'It speeds the reversible reaction between carbon dioxide and water.',
      ['It binds oxygen to the iron in haemoglobin.', 'It pumps chloride ions across the plasma membrane using ATP.', 'It hydrolyses ATP to make carbon dioxide.'],
      'Carbonic anhydrase speeds the formation of carbonic acid from carbon dioxide and water in the tissues. It also speeds the reverse reaction in the lungs.'],
    ['plasma-carbon-dioxide-form', 'In which ionic form is most carbon dioxide carried in blood plasma?', 'Hydrogencarbonate, HCO₃⁻',
      ['Chloride, Cl⁻', 'Hydroxide, OH⁻', 'Carbonate, CO₃²⁻'],
      'Much of the carbon dioxide entering red blood cells is converted to hydrogencarbonate. The hydrogencarbonate then moves into the plasma.'],
    ['sinoatrial-pacemaker', 'Which part of the heart normally initiates the electrical activity for each heartbeat?', 'Sinoatrial node',
      ['Atrioventricular valve', 'Aortic semilunar valve', 'Ventricular septum'],
      'The sinoatrial node generates the electrical excitation that spreads across the atria and starts the normal sequence of a heartbeat.'],
  ]),
  ...challenge(8, [
    ['delay-before-ventricles', 'In a heart model, atrial excitation starts normally. An altered pathway sends excitation to ventricular muscle almost immediately. Which function of the normal pathway is missing?', 'A delay at the atrioventricular node permits the atria to contract before the ventricles.',
      ['A delay within the semilunar valves lets the ventricles contract before the atria.', 'Purkyne tissue normally holds the atria inactive throughout ventricular filling.', 'The sinoatrial node normally initiates ventricular contraction and then atrial contraction.'],
      'The atrioventricular node briefly delays transmission. The delay allows atrial contraction to help complete ventricular filling before Purkyne tissue carries excitation through the ventricles.'],
    ['ventricle-pressure-function', 'A specimen shows that wall R of one ventricle is thicker than wall S of the other. When they contract, R produces the larger increase in blood pressure. Which assignment matches the two circulations?', 'R is the left ventricle. It pumps into the systemic circulation at higher pressure.',
      ['R is the right ventricle. It pumps through the lungs at higher pressure than the systemic circuit.', 'S is the left ventricle. It needs lower pressure to supply the systemic circuit than R needs for the lungs.', 'S is the right ventricle. It returns systemic blood directly to the left atrium.'],
      'The left ventricle pumps through the systemic circulation, which has greater resistance than the pulmonary circuit. Its thicker muscle wall can generate the higher pressure needed.'],
    ['dissociation-steep-region', 'In the model, tissue oxygen partial pressure falls from 5 to 2 kPa. In a separate model the pressure in lung capillaries falls from 11 to 5 kPa. Which change causes the larger drop in haemoglobin saturation?', 'The tissue change. It spans a steeper region of the dissociation curve.',
      ['The lung change. The larger pressure drop must give the larger drop in saturation.', 'The drops in saturation are the same because carbon dioxide was held constant.', 'Neither change affects saturation because the amount of haemoglobin stays constant.'],
      'The tissue transition releases 70 − 20 = 50 percentage points of saturation. The lung transition lowers saturation by 95 − 70 = 25 percentage points. The steeper part of the curve allows a relatively small change in tissue oxygen partial pressure to release a large share of bound oxygen.', saturationGraph],
    ['capillary-filtrate-solutes', 'An intact capillary network is supplied with blood containing glucose and albumin. Fluid that forms outside the vessels contains glucose, little albumin and no red blood cells. Which interpretation fits the composition?', 'The capillary wall allows small dissolved substances and water to pass much more readily than large proteins and blood cells.',
      ['Glucose in the fluid must come from ruptured red blood cells.', 'Albumin and red blood cells passed freely into the fluid but glucose could not cross.', 'Large molecules cross first, and glucose moves out only once albumin has been used.'],
      'Water and many small dissolved solutes are filtered from plasma. Large proteins and blood cells are largely retained by an intact capillary wall. Tissue fluid therefore provides a watery medium for exchange with surrounding cells.'],
  ]),
  ...numeric(8, [
    ['stroke-volume-and-flow', 'A heart model has a left ventricular volume of 128 cm³ just before contraction and 52 cm³ just after ejection. The heart rate is 75 beats per minute.',
      [part('Find the volume of blood ejected in one beat.', 76, 'cm³'), part('Find the total volume pumped in one minute.', 5.70, 'dm³', 0.01)],
      'Each beat ejects 128 − 52 = 76 cm³. At 75 beats per minute, the total is 76 × 75 = 5700 cm³, or 5.70 dm³ in one minute.'],
    ['blood-thermal-transfer', 'A simplified tissue model transfers 840 J of thermal energy to 100 g of blood. Take the specific heat capacity as 4.2 J g⁻¹ °C⁻¹. A second model gives the same energy to 200 g of blood at the same starting temperature. Assume no heat loss.',
      [part('Find the temperature rise in the first model.', 2, '°C', 0.01), part('Find the temperature rise in the second model.', 1, '°C', 0.01)],
      'Temperature rise is energy divided by mass and specific heat capacity. The rises are 840 ÷ (100 × 4.2) = 2.0 °C and 840 ÷ (200 × 4.2) = 1.0 °C. Blood’s high water content helps it carry thermal energy with a relatively small temperature change.'],
  ]),
];

const gasExchange = [
  ...simple(9, [
    ['airway-branching-order', 'Which order follows the branching airways from the trachea towards the gas exchange surfaces?', 'Trachea → bronchus → bronchiole → alveoli',
      ['Trachea → bronchiole → bronchus → alveoli', 'Trachea → alveoli → bronchus → bronchiole', 'Trachea → capillary → bronchiole → bronchus'],
      'The trachea divides into bronchi, which branch into smaller bronchioles. The smaller airways lead to alveoli.'],
    ['bronchiolar-muscle-action', 'What happens to the airway diameter when the smooth muscle around a bronchiole contracts?', 'The airway narrows.',
      ['The airway widens.', 'The airway diameter stays fixed because its cartilage ring lengthens.', 'The airway splits into two new bronchioles.'],
      'Smooth muscle runs around the bronchiole. Its contraction decreases the diameter of the lumen.'],
    ['elastic-fibres-exhalation', 'How do elastic fibres in alveolar walls help during quiet exhalation?', 'They recoil after stretching during inhalation.',
      ['They shorten by active muscle contraction.', 'They secrete mucus to move air out of the alveoli.', 'They prevent the walls from expanding during inhalation.'],
      'Elastic fibres stretch as the lungs expand. Recoil then helps reduce lung volume and move air out.'],
  ]),
  ...challenge(9, [
    ['compare-airway-sections', 'Three transverse sections from the same gas exchange system show the following features. Which assignment fits the observations?', 'P is the trachea, Q is a bronchus and R is a bronchiole.',
      ['P is a bronchus, Q is a bronchiole and R is the trachea.', 'P is a bronchiole, Q is the trachea and R is a bronchus.', 'P is the trachea, Q is a bronchiole and R is a bronchus.'],
      'The trachea is supported by C-shaped cartilage rings, whereas a bronchus within a lung has plates of cartilage. A bronchiole has smooth muscle but lacks cartilage.',
      table('Features visible in three sections', ['Section', 'Cartilage', 'Other features'], [
        ['P', 'One C-shaped band', 'Large lumen and ciliated lining'],
        ['Q', 'Several separate plates', 'Ciliated lining and smooth muscle'],
        ['R', 'Absent', 'Small lumen and a surrounding smooth muscle layer'],
      ])],
    ['inside-alveolar-barrier', 'In a microscopy image, structure X is a thin-walled air space next to structure Y, which contains red blood cells. Which path does oxygen follow as it first enters the plasma of Y?', 'It passes through the squamous epithelium of X and the capillary endothelium of Y.',
      ['It crosses cartilage in X and a thick layer of smooth muscle in Y.', 'It is transported from X into Y by cilia on the surface of red blood cells.', 'It crosses the capillary endothelium first and then passes through the squamous epithelium of X.'],
      'Air in an alveolus lies beside its thin squamous lining. Oxygen then crosses the short intervening distance and the capillary endothelium before entering the plasma.'],
  ]),
  ...numeric(9, [
    ['opposite-gas-gradients', 'A model compares two conditions at one alveolus. In both conditions blood arriving at the alveolus has an oxygen partial pressure of 5.0 kPa and a carbon dioxide partial pressure of 6.0 kPa. Use the measured values for alveolar air.',
      [part('Find the magnitude of the initial oxygen gradient in condition Q.', 9.5, 'kPa', 0.01), part('Find the percentage increase from P to Q in the magnitude of the initial carbon dioxide gradient.', 100, '%', 0.2)],
      'Oxygen diffuses towards blood. Its gradient in Q is 14.5 − 5.0 = 9.5 kPa. Carbon dioxide diffuses towards the air. The magnitude increases from 6.0 − 5.2 = 0.8 kPa to 6.0 − 4.4 = 1.6 kPa, an increase of 100%.',
      table('Alveolar partial pressures', ['Condition', 'Oxygen / kPa', 'Carbon dioxide / kPa'], [
        ['P', '13.0', '5.2'], ['Q', '14.5', '4.4'],
      ])],
  ]),
];

const infectiousDiseases = [
  ...simple(10, [
    ['cholera-causal-agent', 'Which pathogen causes cholera?', 'Vibrio cholerae, a bacterium',
      ['Plasmodium vivax, a protoctist', 'Mycobacterium tuberculosis, a bacterium', 'Human immunodeficiency virus'],
      'Cholera is caused by the bacterium Vibrio cholerae. The other options are associated with malaria, tuberculosis and HIV infection respectively.'],
    ['malaria-causal-agent', 'What type of organism is Plasmodium falciparum, one of the causes of malaria?', 'Protoctist',
      ['Virus', 'Bacterium', 'Fungus'],
      'Plasmodium is a single-celled eukaryote classified as a protoctist in this syllabus.'],
    ['malaria-personal-protection', 'Which measure directly reduces exposure to the mosquito bites that can lead to malaria?', 'Sleeping under a mosquito net',
      ['Adding iodine to a starch sample', 'Providing more handwashing stations alone', 'Improving the refrigeration of food alone'],
      'A net forms a barrier between mosquitoes and a person while they sleep. It helps prevent bites from the malaria vector.'],
    ['hiv-screened-donations', 'Which health service measure reduces the risk of HIV transmission through blood transfusion?', 'Screening donated blood for HIV',
      ['Checking drinking water for dissolved minerals', 'Offering mosquito nets to blood recipients', 'Using oral rehydration fluids after a transfusion'],
      'Screening helps identify donations that could transmit HIV, protecting recipients.'],
    ['penicillin-target-cell-wall', 'Which bacterial structure is affected as penicillin interferes with peptidoglycan formation?', 'Cell wall',
      ['Ribosome', 'Cell surface membrane lipid bilayer', 'Circular chromosome'],
      'Peptidoglycan gives the bacterial cell wall strength. Penicillin reduces the formation of a strong wall, especially as cells grow.'],
    ['appropriate-antibiotic-use', 'Which policy helps reduce unnecessary antibiotic use in a health service?', 'Prescribing antibiotics only when clinical assessment indicates a bacterial infection that needs one.',
      ['Prescribing antibiotics routinely for uncomplicated viral colds.', 'Prescribing antibiotics for every patient who asks for them.', 'Using someone else’s remaining antibiotics without an assessment.'],
      'Evidence-based prescribing avoids unnecessary antibiotic exposure and reduces one driver of the prevalence of resistant infections.'],
  ]),
  ...challenge(10, [
    ['cholera-treatment-versus-prevention', 'After a clinic starts offering timely oral rehydration to people with cholera, severe dehydration becomes less common among patients. The number of new cases in the district is similar to the previous month. Which conclusion is supported?', 'The treatment helps manage fluid loss. The report gives no evidence that it reduced new infections.',
      ['The measure prevented new infections because severe dehydration fell.', 'Changes in severe dehydration establish that the source of infection was removed.', 'New infections must have risen because oral rehydration acts on the patient’s fluid balance.'],
      'Oral rehydration replaces lost water and salts. Preventing infection requires separate measures such as safe water and sanitation. The two observations concern different outcomes.'],
    ['barriers-to-tb-follow-up', 'Three clinics have comparable patients and access to the same TB care. One clinic offers travel support and appointments closer to patients’ homes. Follow-up attendance rises there. What is a reasonable public-health interpretation?', 'Travel cost and inconvenience can affect access to TB care.',
      ['Attendance increases only if the bacteria have become less transmissible.', 'Improved attendance proves that all patients have completed care.', 'The result shows that access is independent of practical barriers.'],
      'Removing barriers can help patients attend follow-up. Attendance alone gives limited evidence about treatment completion or changes in transmission.'],
    ['malaria-case-surveillance-comparison', 'A health report compares two villages after one distributes mosquito nets. Its malaria diagnoses decrease. At the same time, the village reduces the number of clinics that report diagnoses. Which additional evidence would help distinguish a decrease in infection from a decrease in reporting?', 'Infection estimates from comparable surveys before and after distribution, using similar sampling and testing in both villages.',
      ['A count of the remaining clinic buildings only.', 'A survey of the colour of the mosquito nets.', 'The number of households in the second village after distribution only.'],
      'With fewer clinics reporting, the diagnosed case count could decline even if infections do not. Comparable community surveys can reduce the effect of changes in who is seen and reported.'],
    ['resistance-trend-interpretation', 'The share of recorded bacterial infections classed as resistant to a commonly used antibiotic rises over several years. What consequence follows most directly for health services?', 'The usual antibiotic may be ineffective for a larger share of recorded cases, increasing the need for clinical assessment and suitable alternatives.',
      ['The usual antibiotic will become effective against viral infections.', 'Every recorded infection will become more severe regardless of treatment.', 'The number of new bacterial infections must rise by the same percentage.'],
      'An increase in the resistant share raises the chance that the usual drug will be unsuitable. It does not by itself show a change in the total number of infections.'],
  ]),
  ...numeric(10, [
    ['safe-water-access-coverage', 'A district with 2400 households tracks access to a protected drinking-water source as part of cholera prevention. At the start, 1320 households have access. The following year, 1980 do. Household numbers remain constant.',
      [part('Find the percentage of households with access in the following year.', 82.5, '%', 0.01), part('Find the increase in coverage in percentage points.', 27.5, 'percentage points', 0.01)],
      'Coverage rises from 100 × 1320/2400 = 55.0% to 100 × 1980/2400 = 82.5%. The increase is 27.5 percentage points. Coverage is a measure of access rather than a count of infections.'],
    ['antibiotic-audit-rates', 'A clinic audits antibiotic prescribing for visits classed as uncomplicated viral illness. Use the two periods to compare prescriptions per 100 eligible visits.',
      [part('Find the number of prescriptions per 100 eligible visits before the policy change.', 24, 'per 100 visits', 0.01), part('Find the reduction in the rate after the change, per 100 eligible visits.', 14, 'per 100 visits', 0.01)],
      'Before the change, 144/600 × 100 = 24 prescriptions were given per 100 eligible visits. After it, 80/800 × 100 = 10 per 100. Adjusting for the different visit totals shows a reduction of 14 per 100 visits.',
      table('Fictional prescribing audit', ['Period', 'Eligible visits', 'Antibiotic prescriptions'], [
        ['Before', 600, 144], ['After', 800, 80],
      ])],
  ]),
];

export const biologyPracticeAsCore = [
  ...cellStructure, ...biologicalMolecules, ...enzymes, ...membraneTransport, ...mitoticCellCycle,
  ...nucleicAcids, ...plantTransport, ...mammalTransport, ...gasExchange, ...infectiousDiseases,
];
