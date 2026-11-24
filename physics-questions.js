export const physicsQuestions = {
  'physics-units': [
    [
      'Which combination of SI base units is equivalent to a pascal?',
      ['kg m s⁻²', 'kg m⁻¹ s⁻²', 'kg m⁻² s⁻¹', 'kg m² s⁻²'],
      1,
      'Pressure is force per unit area. Dividing the newton, kg m s⁻², by m² gives kg m⁻¹ s⁻².',
    ],
    [
      'A student multiplies a force by a time. What are the SI base units of the result?',
      ['kg m s⁻³', 'kg m² s⁻²', 'kg m s⁻¹', 'kg m⁻¹ s⁻²'],
      2,
      'A newton is kg m s⁻². Multiplying by seconds gives kg m s⁻¹, the unit of impulse.',
    ],
  ],
  'physics-measurement': [
    [
      'A length is measured as (12.0 ± 0.2) cm. What is its percentage uncertainty to two significant figures?',
      ['0.17%', '2.4%', '6.0%', '1.7%'],
      3,
      'Divide the absolute uncertainty by the measured length and multiply by 100. This gives (0.2 ÷ 12.0) × 100 = 1.7%.',
    ],
    [
      'Why might measuring the total thickness of 20 sheets together and dividing by 20 give a better estimate than measuring one sheet?',
      ['It removes all systematic errors', 'It makes the sheets individually thicker', 'It has the same percentage uncertainty', 'The instrument uncertainty is smaller relative to the total thickness'],
      3,
      'The total thickness is much larger than that of a single sheet, so a similar absolute reading uncertainty forms a smaller percentage of the measurement.',
    ],
  ],
  'physics-2': [
    [
      'A cyclist travelling at 5.0 m s⁻¹ accelerates uniformly at 2.0 m s⁻² for 3.0 s. How far does the cyclist travel in this time?',
      ['6.0 m', '15 m', '24 m', '33 m'],
      2,
      'Use s = ut + ½at². Substituting the values gives 5.0 × 3.0 + ½ × 2.0 × 3.0² = 24 m.',
    ],
  ],
  'physics-4': [
    [
      'A liquid of density 800 kg m⁻³ is 0.50 m deep. What pressure difference does the liquid produce from its surface to its base? Use g = 9.8 m s⁻².',
      ['3.9 kPa', '0.39 kPa', '7.8 kPa', '16 kPa'],
      0,
      'The pressure difference is ρgh = 800 × 9.8 × 0.50 Pa, or about 3.9 kPa.',
    ],
    [
      'Two parallel forces of 6.0 N act in opposite directions. Their lines of action are 0.30 m apart. What is the torque of the couple?',
      ['0.90 N m', '1.8 N m', '3.6 N m', '20 N m'],
      1,
      'Multiply either force by the perpendicular separation of their lines of action. The torque is 6.0 × 0.30 = 1.8 N m.',
    ],
  ],
  'physics-5': [
    [
      'A machine transfers 600 J of input energy and delivers 450 J as useful output. What is its efficiency?',
      ['25%', '33%', '60%', '75%'],
      3,
      'Efficiency is useful output divided by total input. Here 450 ÷ 600 = 0.75, or 75%.',
    ],
  ],
  'physics-6': [
    [
      'A wire of length 2.00 m extends by 1.00 mm under tension. What is its tensile strain?',
      ['5.00 × 10⁻⁴', '2.00 × 10⁻³', '0.500', '2.00'],
      0,
      'Strain is extension divided by original length. In metres this is 0.00100 ÷ 2.00 = 5.00 × 10⁻⁴.',
    ],
    [
      'A spring has a spring constant of 240 N m⁻¹ and is stretched by 0.050 m within its elastic limit. How much elastic potential energy does it store?',
      ['0.60 J', '6.0 J', '0.30 J', '12 J'],
      2,
      'The force increases from zero to kx. The area under the force–extension graph is ½kx² = 0.30 J.',
    ],
  ],
  'physics-7': [
    [
      'If the amplitude of a wave doubles in the same medium, by what factor does its intensity change?',
      ['½', '2', '√2', '4'],
      3,
      'The intensity of a wave is proportional to the square of its amplitude. Doubling the amplitude multiplies intensity by 2².',
    ],
  ],
  'physics-11': [
    [
      'A down quark has a charge of −⅓e and an up quark has a charge of +⅔e. What is the total charge of a particle made of one up quark and two down quarks?',
      ['−e', '0', '+e', '+2e'],
      1,
      'Add the three charges. The sum +⅔e − ⅓e − ⅓e is zero, as for a neutron.',
    ],
    [
      'Which particle is a lepton?',
      ['Proton', 'Neutron', 'Electron', 'Pion'],
      2,
      'The electron is a fundamental lepton. Protons, neutrons and pions are hadrons made of quarks.',
    ],
  ],
  'physics-12': [
    [
      'A 0.40 kg object moves in a circle of radius 0.50 m at a constant speed of 3.0 m s⁻¹. What resultant force is needed?',
      ['7.2 N towards the centre', '2.4 N towards the centre', '7.2 N along the tangent', 'Zero'],
      0,
      'Circular motion requires a centripetal force mv²/r. Substitution gives 0.40 × 3.0² ÷ 0.50 = 7.2 N towards the centre.',
    ],
    [
      'An object takes 0.50 s to make one complete revolution. What is its angular speed?',
      ['π rad s⁻¹', '2π rad s⁻¹', '4π rad s⁻¹', '8π rad s⁻¹'],
      2,
      'One revolution is 2π radians. Dividing by the period of 0.50 s gives 4π rad s⁻¹.',
    ],
  ],
  'physics-13': [
    [
      'At what multiple of a planet’s radius from its centre is the gravitational field strength one quarter of its surface value?',
      ['½', '2', '4', '16'],
      1,
      'Outside the planet, g = GM/r². Doubling the distance from its centre reduces field strength to one quarter.',
    ],
    [
      'Taking gravitational potential to be zero at infinity, what happens to the gravitational potential as you move away from an isolated planet?',
      ['It decreases to zero from positive values', 'It stays constant', 'It becomes more negative', 'It increases towards zero from negative values'],
      3,
      'Gravitational potential is −GM/r. Increasing r makes the value less negative and brings it closer to zero.',
    ],
  ],
  'physics-temperature': [
    [
      'When two bodies are in thermal equilibrium, which quantity must be the same for both?',
      ['Internal energy', 'Mass', 'Temperature', 'Specific heat capacity'],
      2,
      'Bodies in thermal equilibrium have the same temperature. A temperature difference would cause a net transfer of thermal energy.',
    ],
    [
      'Convert −23.0 °C to kelvin, to the nearest kelvin.',
      ['227 K', '250 K', '273 K', '296 K'],
      1,
      'Add 273.15 to the temperature in degrees Celsius. The result is 250.15 K, which rounds to 250 K.',
    ],
  ],
  'physics-thermal': [
    [
      'Why does the temperature of a pure substance stay constant while it melts at a fixed pressure?',
      ['The particles stop moving', 'Heat transfer stops', 'Energy increases intermolecular potential energy', 'The solid releases energy to its surroundings'],
      2,
      'Energy supplied during melting changes the arrangement and separation of particles. Their mean kinetic energy, which sets the temperature, stays constant.',
    ],
    [
      'A 0.50 kg block with specific heat capacity 900 J kg⁻¹ K⁻¹ warms by 8.0 K. How much thermal energy does it gain?',
      ['0.45 kJ', '3.6 kJ', '7.2 kJ', '56 kJ'],
      1,
      'Use Q = mcΔT. The energy gained is 0.50 × 900 × 8.0 = 3600 J, or 3.6 kJ.',
    ],
  ],
  'physics-15': [
    [
      'An ideal gas is heated from 300 K to 450 K at constant volume. How does its pressure change?',
      ['It falls to two thirds', 'It stays constant', 'It doubles', 'It rises by a factor of 1.5'],
      3,
      'For a fixed amount of gas at constant volume, p is proportional to absolute temperature. The ratio is 450 ÷ 300 = 1.5.',
    ],
    [
      'Which change doubles the mean translational kinetic energy of molecules in an ideal gas?',
      ['Doubling the temperature in kelvin', 'Doubling the volume at constant temperature', 'Halving the molecular mass at constant temperature', 'Doubling the amount of gas at constant temperature'],
      0,
      'The mean translational kinetic energy per molecule is 3kT/2. It depends on absolute temperature, so doubling T doubles the energy.',
    ],
  ],
  'physics-16': [
    [
      'A gas takes in 500 J of thermal energy and does 180 J of work on its surroundings. What is the change in its internal energy?',
      ['−680 J', '+320 J', '+500 J', '+680 J'],
      1,
      'The energy entering as heat is +500 J. The work done by the gas transfers 180 J out, giving an increase of 320 J.',
    ],
    [
      'An ideal gas expands isothermally and does work on a piston. What happens to its internal energy?',
      ['It increases', 'It decreases', 'It remains constant', 'It falls to zero'],
      2,
      'The internal energy of an ideal gas depends on temperature. At constant temperature, heat entering the gas balances the work it does.',
    ],
  ],
  'physics-17': [
    [
      'Where is the speed of an object undergoing simple harmonic motion greatest?',
      ['At equilibrium', 'At maximum positive displacement', 'At maximum negative displacement', 'Where acceleration is greatest'],
      0,
      'The object moves fastest through equilibrium, where its potential energy is lowest. It is momentarily at rest at either end of the oscillation.',
    ],
    [
      'An oscillator has displacement x and angular frequency ω. Which equation describes its acceleration in simple harmonic motion?',
      ['a = ωx', 'a = −ωx', 'a = ω²x', 'a = −ω²x'],
      3,
      'Acceleration is proportional to displacement and points towards equilibrium. The negative sign gives the restoring direction and the coefficient is ω².',
    ],
  ],
  'physics-18': [
    [
      'Two parallel plates separated by 4.0 mm have a potential difference of 120 V. What is the electric field strength between them, away from the edges?',
      ['480 V m⁻¹', '30 V m⁻¹', '3.0 × 10⁴ V m⁻¹', '3.3 × 10⁻⁵ V m⁻¹'],
      2,
      'For a uniform field, E = V/d. The separation is 0.0040 m, so 120 ÷ 0.0040 = 3.0 × 10⁴ V m⁻¹.',
    ],
    [
      'In which direction does an electron accelerate when released in a uniform electric field?',
      ['Along the field', 'Opposite to the field', 'Perpendicular to the field', 'It remains stationary'],
      1,
      'Electric field direction is defined for a positive test charge. The force on the negatively charged electron points in the opposite direction.',
    ],
  ],
  'physics-19': [
    [
      'A 20 μF capacitor is charged to 12 V. What energy does it store?',
      ['1.44 × 10⁻³ J', '2.40 × 10⁻⁴ J', '2.88 × 10⁻³ J', '1.44 J'],
      0,
      'The energy is ½CV². Substituting C = 20 × 10⁻⁶ F and V = 12 V gives 1.44 × 10⁻³ J.',
    ],
    [
      'A capacitor discharges through a resistor of resistance R. What is its time constant if the capacitor has capacitance C?',
      ['R/C', 'C/R', '1/RC', 'RC'],
      3,
      'The time constant is RC. After this time the capacitor’s charge has fallen to e⁻¹, about 37%, of its initial value.',
    ],
  ],
  'physics-20': [
    [
      'A 0.20 m straight wire carries a current of 4.0 A at right angles to a uniform 0.30 T magnetic field. What magnetic force acts on the wire?',
      ['0.015 N', '0.24 N', '0.60 N', '2.4 N'],
      1,
      'When the current is perpendicular to the field, F = BIL. The force is 0.30 × 4.0 × 0.20 = 0.24 N.',
    ],
  ],
  'physics-induction': [
    [
      'The magnetic flux through each of 50 turns of a coil changes by 0.0040 Wb in 0.20 s. What is the magnitude of the mean induced emf?',
      ['0.020 V', '0.040 V', '1.0 V', '10 V'],
      2,
      'Faraday’s law gives the magnitude as the rate of change of flux linkage. This is 50 × 0.0040 ÷ 0.20 = 1.0 V.',
    ],
    [
      'What does Lenz’s law say about the effect of an induced current?',
      ['It opposes the change in magnetic flux that causes it', 'It always flows clockwise', 'It always increases the flux through the circuit', 'It has no magnetic effect'],
      0,
      'An induced current produces a magnetic field that opposes the change in flux responsible for the emf.',
    ],
  ],
  'physics-21': [
    [
      'What is the purpose of the capacitor in a basic smoothing circuit following a rectifier?',
      ['It discharges between peaks and reduces variation in the output voltage', 'It makes the input alternate faster', 'It reverses the polarity every half-cycle', 'It stops the diode conducting permanently'],
      0,
      'The capacitor charges near voltage peaks and supplies current to the load as the rectified voltage falls. This reduces ripple.',
    ],
    [
      'A sinusoidal alternating voltage has a peak value of 34 V. What is its rms value to two significant figures?',
      ['17 V', '34 V', '48 V', '24 V'],
      3,
      'For a sinusoid, the rms voltage is the peak voltage divided by √2. This gives 34 ÷ √2 ≈ 24 V.',
    ],
  ],
  'physics-transformers': [
    [
      'An ideal transformer has 200 turns on its primary coil and 50 on its secondary. A 12 V rms supply is connected to the primary. What is the secondary rms voltage?',
      ['3.0 V', '6.0 V', '24 V', '48 V'],
      0,
      'The voltage ratio equals the turns ratio. The secondary voltage is 12 × 50/200 = 3.0 V rms.',
    ],
  ],
  'physics-22': [
    [
      'Light of frequency above the threshold causes photoemission from a metal. What happens to the maximum kinetic energy of the electrons if only the light intensity increases?',
      ['It increases in direct proportion', 'It stays the same', 'It decreases', 'It becomes zero'],
      1,
      'The maximum kinetic energy is hf − φ. Raising intensity increases the photon arrival rate, while frequency and photon energy stay the same.',
    ],
    [
      'An electron’s momentum doubles. How does its de Broglie wavelength change?',
      ['It doubles', 'It quadruples', 'It halves', 'It remains constant'],
      2,
      'The de Broglie relation is λ = h/p, so the wavelength is inversely proportional to momentum.',
    ],
  ],
  'physics-23': [
    [
      'A sample’s activity drops from 800 Bq to 100 Bq in 18 h. What is its half-life?',
      ['2.25 h', '3.0 h', '9.0 h', '6.0 h'],
      3,
      'The activity halves three times, from 800 to 400 to 200 to 100 Bq. Each half-life is 18 ÷ 3 = 6.0 h.',
    ],
    [
      'What does the binding energy of a nucleus represent?',
      ['The energy needed to separate the nucleus into its individual nucleons', 'The kinetic energy of the nucleus at rest', 'The energy needed to remove all the atom’s electrons', 'The total rest energy of the separated nucleons'],
      0,
      'Binding energy is the energy required to separate the bound nucleus into its constituent protons and neutrons. It corresponds to the mass defect through E = Δmc².',
    ],
  ],
  'physics-24': [
    [
      'Why is a coupling gel used between an ultrasound probe and the skin?',
      ['To increase the speed of light in the skin', 'To reduce reflection at air gaps between the probe and skin', 'To increase the frequency emitted by the probe', 'To make soft tissue absorb all the ultrasound'],
      1,
      'The gel removes air gaps, where a large acoustic impedance difference would reflect most of the sound. More ultrasound reaches the tissue.',
    ],
    [
      'An ultrasound pulse returns to a probe 4.0 × 10⁻⁵ s after emission. If sound travels at 1500 m s⁻¹ in tissue, how deep is the reflecting boundary?',
      ['0.0030 m', '0.015 m', '0.030 m', '0.060 m'],
      2,
      'The pulse travels to the boundary and back. Its one-way distance is 1500 × 4.0 × 10⁻⁵ ÷ 2 = 0.030 m.',
    ],
  ],
  'physics-25': [
    [
      'Two stars have the same luminosity. Star B is twice as far away as star A. What is the ratio of B’s observed radiant flux to A’s?',
      ['2', '½', '1', '¼'],
      3,
      'Observed radiant flux is luminosity divided by 4πd². Doubling the distance reduces the flux to one quarter.',
    ],
    [
      'What does a shift of spectral lines towards longer wavelengths usually indicate for a distant galaxy?',
      ['It is receding from the observer', 'It is approaching the observer', 'Its composition is changing during measurement', 'Its light has a higher frequency than at emission'],
      0,
      'A redshift means received wavelengths are longer than the corresponding emitted wavelengths. In this context it indicates recession.',
    ],
  ],
};
