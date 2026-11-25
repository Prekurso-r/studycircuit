// Why each wrong option is wrong, for the biology questions that have notes so far (see why.js for the format).
export const why = {
  // ---- 1 Cell structure ----
  'biology-1-q1': [
    'This is ten times too small. 36 mm is 36 000 µm, and 36 000 ÷ 1200 = 30 µm.',
    null,
    'This is ten times too big. Dividing 36 000 µm by 1200 gives 30 µm, not 300 µm.',
    'This comes from multiplying 36 by 1200. The actual size is the image size divided by the magnification.',
  ],
  'biology-1-q2': [
    'Mitochondria have an inner membrane folded into cristae. They do not have thylakoids arranged into grana.',
    'The Golgi apparatus is a stack of flattened sacs that process proteins. It has no photosynthetic membranes.',
    null,
    'Rough endoplasmic reticulum is a network of membrane sacs studded with ribosomes. It has no grana.',
  ],
  'biology-1-challenge-1': [
    'The length is a quarter of the correct 2.8 µm, and glycolysis takes place in the cytoplasm, not on the folded inner membrane.',
    'The length is half the correct 2.8 µm, and the Krebs cycle takes place in the matrix, not on the folded inner membrane.',
    null,
    'The length is twice the correct 2.8 µm, and photophosphorylation happens on thylakoid membranes in chloroplasts, not on cristae.',
  ],
  'biology-1-challenge-2': [
    'Magnification does not improve resolution. P cannot resolve points 0.25 µm apart, because its limit is 0.30 µm, so a larger image does not help.',
    null,
    'P cannot separate the points, because 0.25 µm is smaller than its 0.30 µm limit. Only Q can, so not both can.',
    'Q does separate the points, but at ×1000 a gap of 0.25 µm appears as 250 µm, which is 0.25 mm, not 2.5 mm.',
  ],
  'biology-extra-golgi-vesicles': [
    null,
    'The centrosome organises the microtubules of the spindle. It does not modify proteins or package them into vesicles.',
    'The nucleolus makes ribosomal RNA and assembles ribosomal subunits inside the nucleus. It does not handle proteins for delivery.',
    'Smooth endoplasmic reticulum makes lipids and has no ribosomes attached. Modifying and sorting proteins into vesicles is done by the Golgi apparatus.',
  ],
  'biology-extra-plasmodesmata': [
    'The middle lamella is the pectin layer that glues neighbouring cell walls together. It is not a channel between cells.',
    'The tonoplast is the membrane around the vacuole inside one cell. It does not link two cells.',
    null,
    'Cellulose microfibrils strengthen the cell wall. No cytoplasm runs through them.',
  ],
  'biology-extra-secreted-protein-route': [
    'The label shows up first in the rough endoplasmic reticulum, where the protein is made, so the Golgi apparatus cannot come before it.',
    null,
    'A secreted protein leaves the cell at the end of its route. The label cannot start outside the cells and move in.',
    'The Golgi apparatus processes the protein before it leaves, so the label should reach the Golgi apparatus before the outside, not after.',
  ],
  'biology-extra-calibration-by-objective': [
    '40 µm is right, but the low-power calibration would give 160 µm. That is four times too big, so it is an overestimate, not an underestimate.',
    'Both parts are wrong. At high power one division is 2.5 µm, so the cell is 40 µm. The 160 µm is what the low-power calibration wrongly gives.',
    'The 160 µm is what the low-power calibration wrongly gives. At high power each division is 2.5 µm, so the cell is 40 µm.',
    null,
  ],
  'biology-1-practice-surface-electron-image': [
    'A transmission electron microscope sends electrons through a very thin slice. It shows flat internal structure, not a surface in three dimensions.',
    'A light microscope gives a flat view with little depth. A graticule only measures size and adds no three-dimensional detail.',
    null,
    'A hand lens magnifies only a few times, far too little to show the fine surface detail of a pollen grain.',
  ],
  'biology-1-practice-nucleolus-ribosome-assembly': [
    null,
    'The nuclear envelope is the double membrane around the nucleus, with pores. It controls what passes through but does not make ribosomal RNA.',
    'The centromere is where sister chromatids are joined and where spindle fibres attach. It has no part in building ribosomes.',
    'Smooth endoplasmic reticulum lies outside the nucleus and makes lipids. Ribosomal subunits are built in the nucleolus.',
  ],
  'biology-1-practice-lysosome-digestion': [
    'Centrioles help organise the microtubules of the spindle. They contain no digestive enzymes.',
    'The nucleolus makes ribosomal RNA inside the nucleus. It does not digest anything.',
    null,
    'Smooth endoplasmic reticulum makes lipids. It does not contain the hydrolytic enzymes that break down organelles.',
  ],
  'biology-1-practice-tonoplast-location': [
    'The cell surface membrane lies between the cytoplasm and the cell wall. The tonoplast is a membrane inside the cell.',
    'The nuclear envelope separates the nucleoplasm from the cytoplasm. It is not the tonoplast.',
    null,
    'The thylakoid membrane separates the stroma from the thylakoid interior. The tonoplast surrounds the vacuole.',
  ],
  'biology-1-practice-prokaryote-wall-constituent': [
    'Cellulose is the main material of plant cell walls, not of bacterial ones.',
    'Starch is a storage carbohydrate in plants. It is not a wall material.',
    null,
    'Cholesterol is a lipid found in animal cell surface membranes. It is not a component of a bacterial cell wall.',
  ],
  'biology-1-practice-organelle-ribosome-type': [
    'The Golgi apparatus is a stack of membrane sacs. It has no DNA or ribosomes of its own.',
    null,
    'A lysosome is a membrane-bound sac of enzymes. It has no DNA or ribosomes inside it.',
    'The nucleolus is a dense region inside the nucleus where ribosomal subunits are made. It has no 70S ribosomes or circular DNA of its own.',
  ],
  'biology-1-practice-apical-packing-sketch': [
    'Cilia are longer and beat to sweep fluid along. They are not the short packed projections that increase area for absorption.',
    'Plasmodesmata are channels between plant cells, and intestinal cells in animals have none.',
    'Centrioles are small cylinders of microtubules near the nucleus. They are not projections of the cell surface.',
    null,
  ],
  'biology-1-practice-three-cell-profiles': [
    'P has no nucleus, so it cannot be a plant cell, and Q has a nucleus, so it cannot be a bacterium. The cell walls point to P as the bacterium.',
    'R has a nucleus, so it cannot be a bacterium, and P has no nucleus, so it cannot be an animal cell.',
    null,
    'Q has a cellulose wall, which animal cells never have, and R has no wall, so R is not a plant cell.',
  ],
  'biology-1-practice-sectioned-lipid-cell': [
    'Rough endoplasmic reticulum has ribosomes attached to its membranes. The micrograph shows tubules without them.',
    'Transport vesicles are small round sacs, not a network of tubules, and they carry products rather than make lipids.',
    null,
    'Nuclear pores are gaps in the nuclear envelope that let molecules through. They are not membrane tubules and make no lipids.',
  ],
  'biology-1-practice-drawing-graticule-purpose': [
    null,
    'Drawing every nucleus the same size ignores their real size and position, and an objective number gives no scale to judge size by.',
    'Shading by darkness records how strongly tissue stained, not where the boundaries are, and the eyepiece diameter is not a calibrated scale.',
    'Drawing every region at the same width loses the real proportions, and labelling organelles is not possible at low power.',
  ],
};
