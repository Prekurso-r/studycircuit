// Why each wrong option is wrong, for the chemistry questions that have notes so far (see why.js for the format).
export const why = {
  // ---- 1 Atomic structure ----
  'chemistry-1-q1': [
    'The ion has too few electrons. A negative ion has gained an electron, so it has more electrons than protons, not fewer.',
    null,
    'This swaps the protons and the electrons. The atomic number fixes 17 protons, and the extra electron of the ion makes 18 electrons.',
    '37 is the mass number, which counts protons plus neutrons together. The neutrons are the mass number minus the protons.',
  ],
  'chemistry-1-q2': [
    'This is the mass of the lighter isotope on its own. A relative atomic mass is a weighted mean of both isotopes.',
    'This is the simple mean of 63 and 65, which ignores the abundances. The more abundant isotope must count for more.',
    null,
    'The weights are the wrong way round: 65 × 0.69 + 63 × 0.31 = 64.38. This treats the heavier isotope as the more abundant one.',
  ],
  'chemistry-1-challenge-1': [
    'Aluminium is right, but its 3p electron is the first to be removed. The second and third electrons come from the 3s subshell.',
    'A sharp rise after the third electron means three outer electrons, which is aluminium. Magnesium has only two outer electrons.',
    'Silicon has four outer electrons, so its sharp rise would come after the fourth removal, not the third.',
    null,
  ],
  'chemistry-extra-simple-isoelectronic-ions': [
    'O²⁻ has only 8 protons holding its ten electrons, the weakest attraction in the set, so it is the largest of these ions.',
    'F⁻ has 9 protons holding ten electrons. That is a weaker pull than the 11 protons of Na⁺ or the 12 of Mg²⁺, so F⁻ is larger.',
    'Na⁺ has 11 protons, fewer than Mg²⁺ with 12. It attracts the same ten electrons less strongly, so it is a little larger.',
    null,
  ],
  'chemistry-extra-simple-oxygen-orbitals': [
    'Four 2p electrons fill the three orbitals singly first, and only the fourth pairs up. That leaves two unpaired electrons, not one.',
    null,
    'Three unpaired electrons would be nitrogen, with 2p³. Oxygen has a fourth 2p electron, which must pair with one of them.',
    'Four unpaired electrons would need four orbitals. There are only three 2p orbitals, so one electron has to pair.',
  ],
  'chemistry-extra-challenge-isoelectronic-calcium': [
    null,
    'The neutron count is wrong. X has 20 protons, so 44 − 20 = 24. The 26 comes from wrongly using 18 as the atomic number.',
    'The 24 neutrons are right, but a positive ion is smaller than its atom. The outer 4s electrons are lost, and the rest are pulled in more tightly.',
    'Both parts are wrong. X has 20 protons, so 24 neutrons, and X²⁺ is smaller than X because its outer electrons have been lost.',
  ],
  'chemistry-extra-challenge-isoelectronic-d-shell': [
    'Fe³⁺ has 23 electrons, which is [Ar]3d⁵. The configuration [Ar]3d⁶ belongs to Fe²⁺, which has lost only two electrons.',
    null,
    'Five electrons in five orbitals go in one at a time, so none are paired. Pairing starts only with the sixth electron.',
    'Mn²⁺ loses its 4s electrons first, so it is [Ar]3d⁵, not [Ar]3d³4s². The 4s electrons leave before the 3d electrons.',
  ],
  'chemistry-1-practice-charge-distribution': [
    'An electron has about one eighteen-hundredth of the mass of a proton, so the electrons add almost nothing to the mass.',
    'The nucleus holds protons and neutrons, so it has a net positive charge. It is the whole atom that is neutral.',
    'That is the old plum pudding model. The positive charge is packed into a tiny nucleus at the centre of the atom.',
    null,
  ],
  'chemistry-1-practice-undeflected-neutrons': [
    'Protons are positively charged, so the electric field exerts a force on them and deflects them.',
    'Electrons are negatively charged, so the field deflects them too, in the opposite direction to the protons.',
    null,
    'Only the uncharged particle goes straight on. The protons and the electrons both carry charge and are deflected.',
  ],
  'chemistry-1-practice-isotope-chemistry': [
    null,
    'Isotopes differ in their number of neutrons. ¹³C has one more neutron than ¹²C.',
    'Their relative isotopic masses are different, about 12 and 13. It is their identical electron configuration that matters here.',
    'Both are carbon atoms with the same four outer electrons. That shared electron configuration is what gives them the same chemistry.',
  ],
  'chemistry-1-practice-orbital-capacity': [
    null,
    'This describes a p subshell, which has three orbitals. A d subshell has five.',
    'The number of orbitals is right, but each orbital holds two electrons, so the subshell holds ten, not five.',
    'This doubles the orbitals as well as the electrons. A d subshell has five orbitals, with two electrons in each.',
  ],
  'chemistry-1-practice-shapes-sp': [
    null,
    'The shapes are the wrong way round. An s orbital is spherical, and a p orbital has two lobes.',
    'A p orbital is not spherical. It is two-lobed, with one lobe either side of the nucleus.',
    'Neither shape has that many lobes. Four-lobed shapes belong to most of the d orbitals.',
  ],
  'chemistry-1-practice-first-ionisation-process': [
    'This starts from solid magnesium. Ionisation energy is defined for gaseous atoms, so the equation must begin with Mg(g).',
    'This removes an electron from Mg⁺, so it is the second ionisation, not the first.',
    null,
    'This adds an electron to the atom. It is the opposite of ionisation, closer to an electron affinity.',
  ],
  'chemistry-1-practice-deflection-same-velocity': [
    null,
    'The forces are equal in size, but an electron has far less mass than a proton, so it accelerates and deflects much more.',
    'Opposite charges are pushed in opposite directions by the same field, and the lighter electron is the one deflected more.',
    'The directions are right, but a proton is about 1800 times heavier than an electron. The same force deflects it much less.',
  ],
  'chemistry-1-practice-nitrogen-orbitals-from-boxes': [
    'Pairing electrons in one orbital raises the repulsion between them. The lowest energy has one electron in each of the three p orbitals.',
    'Orbitals of equal energy fill singly before any pairing. A single electron in an orbital is allowed, and pairing early costs energy.',
    null,
    'Electrons in separate orbitals of equal energy keep parallel spins in the ground state, not alternating ones. This is Hund’s rule.',
  ],
  'chemistry-1-practice-paired-electron-ie': [
    'Both atoms lose a 3p electron, as the question says. A 3s electron is held more tightly and would not explain a lower value.',
    null,
    'Sulfur has more protons than phosphorus, 16 against 15, so its nuclear attraction is greater, not smaller.',
    'Both electrons come from the third shell, because sulfur and phosphorus are both in Period 3.',
  ],
  'chemistry-1-practice-copper-first-ionisations': [
    'The 4s electron is removed first, so Cu⁺ is [Ar] 3d¹⁰ and Cu²⁺ is [Ar] 3d⁹. Both of these configurations keep a 4s electron.',
    'Cu²⁺ is right, but Cu⁺ is not. The single 4s electron leaves first, giving [Ar] 3d¹⁰, not [Ar] 3d⁹ 4s¹.',
    'Cu⁺ is right, but Cu²⁺ must lose a 3d electron, because the 4s subshell is already empty. It cannot keep 4s¹.',
    null,
  ],
  'chemistry-1-practice-outer-shell-after-jump': [
    null,
    'Carbon has four electrons in its second shell, so its fourth electron is still an outer one. Its big jump comes at the fifth.',
    'Nitrogen’s 1s subshell holds only two electrons, so the first three removed all come from the second shell.',
    'Boron has only three outer electrons, 2s² 2p¹, so the 2s subshell is already empty by the fourth. That electron comes from 1s.',
  ],
  'chemistry-1-practice-isotope-density-ratio': [
    null,
    'The ratio is upside down. ¹³C atoms are heavier and take up the same volume, so ¹³C is the denser, in the ratio 13 : 12.',
    'Equal proton numbers give equal electron numbers, but density depends on the mass of the atoms, and ¹³C has an extra neutron.',
    'The ratio is right, but neutral atoms of both isotopes have six electrons. The extra particle in ¹³C is a neutron.',
  ],
};
