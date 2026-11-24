import { calc, drill, exact, plotFigure, practice, scenario } from './physics-practice-tools.js';
import { echoFigure, interferenceFigure, parallaxFigure } from './physics-wave-figures.js';

const waves = practice('7', [
  ['through-boundary', 'A water wave passes into shallower water and slows. Which quantity stays fixed across the boundary?', ['Speed', 'Wavelength', 'Frequency', 'Amplitude'], 2, 'The source determines frequency. The wavelength decreases when the speed falls, because v = fλ.'],
  ['longitudinal-motion', 'In a sound wave, what happens to the particles of the medium as a compression moves past?', ['They travel away with the compression', 'They oscillate perpendicular to the propagation direction', 'They do not move', 'They oscillate parallel to the propagation direction'], 3, 'A sound wave in air is longitudinal. The particles oscillate about their equilibrium positions while the disturbance propagates.'],
], [
  drill('wave-snapshot', [[2, 8, 5], [3, 12, 8], [1.5, 7, 4], [4, 10, 7]], (waveLength, amplitude, frequency) => {
    const points = Array.from({ length: 49 }, (_, i) => [waveLength * i / 24, amplitude * Math.sin(i * Math.PI / 12)]);
    return scenario(
      `The graph shows a snapshot of a sinusoidal transverse wave travelling in the +x direction. Its frequency is ${frequency} Hz.`,
      calc('Read the amplitude of the wave.', 'mm', amplitude, 'Amplitude is the largest displacement from the central line, not the peak-to-trough distance.'),
      calc('Find the wave speed.', 'm s⁻¹', waveLength * frequency, 'Read the distance between consecutive crests and multiply by the frequency.'),
      calc(`Find the smaller phase difference between points separated by ${waveLength / 8} m.`, '°', 45, 'The separation is one eighth of the wavelength, so the phase difference is one eighth of 360°.'),
      plotFigure({ caption: 'Displacement at one instant', alt: `Displacement varies sinusoidally between minus ${amplitude} and plus ${amplitude} mm. Adjacent crests occur at ${waveLength / 4} and ${waveLength * 1.25} m.`, xLabel: 'x / m', yLabel: 'displacement / mm', xTicks: [0, waveLength / 4, waveLength * 1.25, 2 * waveLength], yTicks: [-amplitude, 0, amplitude], traces: [{ points, markers: false }] }),
    );
  }),
  drill('moving-source', [[340, 20, 480], [330, 15, 600], [350, 25, 720], [343, 12, 520]], (sound, speed, frequency) => scenario(
    `A moving source emits sound of frequency ${frequency} Hz in still air. Sound travels at ${sound} m s⁻¹ and the source moves at ${speed} m s⁻¹. A stationary detector lies directly along its line of motion.`,
    calc('Find the wavelength the source would produce at rest.', 'm', sound / frequency, 'Wave speed divided by frequency gives wavelength in still air.'),
    calc('Find the frequency detected as the source approaches.', 'Hz', frequency * sound / (sound - speed), 'During each source period an approaching source advances towards the receiver, shortening the wavelength to (c − u)/f.'),
    calc('Find the frequency detected after it passes and recedes.', 'Hz', frequency * sound / (sound + speed), 'For a receding source the wavelength is lengthened to (c + u)/f. The sound speed relative to the detector remains c.'),
  )),
  drill('spreading-waves', [[24, 3, 9], [10, 2, 6], [45, 4, 8], [60, 5, 15]], (watts, near, far) => {
    const intensity = watts / (4 * Math.PI * far ** 2);
    return scenario(
      `A point source emits ${watts} W of wave power equally in all directions without absorption. Detectors are placed at distances ${near} m and ${far} m.`,
      calc('Find the area of the wavefront at the nearer detector.', 'm²', 4 * Math.PI * near ** 2, 'The wave front at a fixed radius is a sphere with area 4πr².'),
      calc('Find the intensity at the farther detector.', 'W m⁻²', intensity, 'Divide source power by the area of a sphere at the farther radius.'),
      calc('Find the wave amplitude at the farther detector as a fraction of the amplitude at the nearer detector.', '', near / far, 'Intensity scales as 1/r² and is proportional to amplitude squared, so amplitude scales as 1/r.'),
    );
  }),
  drill('two-media', [[500, 330, 1500], [750, 340, 1425], [600, 345, 1560], [900, 350, 1480]], (f, air, liquid) => scenario(
    `A ${f} Hz sound wave crosses from air into a liquid. Its speeds in air and liquid are ${air} and ${liquid} m s⁻¹ respectively.`,
    calc('Find the wavelength in the air.', 'm', air / f, 'Divide air wave speed by the source frequency.'),
    calc('Find the wavelength in the liquid as a multiple of that in air.', '', liquid / air, 'Frequency is unchanged, so the wavelength ratio equals the wave speed ratio.'),
    calc('Find the number of wavelengths spanning 10 m in the liquid, allowing a fractional result.', 'wavelengths', 10 * f / liquid, 'The liquid wavelength is its wave speed divided by f. Divide 10 m by that wavelength.'),
  )),
  drill('electromagnetic-pulse', [[2.4, 20, 15], [5, 8, 12], [3, 15, 10], [6, 12, 9]], (GHz, cycles, distance) => scenario(
    `A short radio burst contains ${cycles} complete cycles of a ${GHz} GHz carrier. The burst travels ${distance} m in air. Take wave speed as 3.00 × 10⁸ m s⁻¹.`,
    calc('Calculate the carrier wavelength.', 'cm', 30 / GHz, 'Convert GHz to Hz and divide the wave speed by frequency, then convert metres to centimetres.'),
    calc('Calculate the physical length of the burst as it travels.', 'm', cycles * 0.3 / GHz, 'Multiply the wavelength in metres by the number of complete cycles.'),
    calc('Find the time from the start of transmission to the arrival of the final edge of the burst.', 'ns', distance / 0.3 + cycles / GHz, 'Add the propagation time across the path to the transmission time for all cycles. One GHz is one cycle per nanosecond.'),
  )),
]);

const superposition = practice('8', [
  ['dark-fringe', 'Two coherent, in-phase sources give equal amplitudes at a point. Which path difference produces a minimum there?', ['λ', '2λ', '3λ/2', '0'], 2, 'A half-integer number of wavelengths gives an odd multiple of π phase difference and the waves cancel.'],
  ['standing-energy', 'What is the net transfer of energy along an ideal standing wave formed by identical counterpropagating waves?', ['Zero', 'Maximum at each node', 'Always towards one end', 'It equals twice that of one wave'], 0, 'Each constituent wave carries the same energy in opposite directions, so the net transfer is zero.'],
], [
  drill('young-slits', [[0.3, 1.5, 3, 2.0], [0.25, 2, 4, 3.0], [0.4, 1.6, 2.4, 2.4], [0.5, 2.5, 3.5, 1.5]], (separation, distance, spacing, newDistance) => {
    const wavelength = spacing * separation * 1000 / distance;
    return scenario(
      `Monochromatic light illuminates the two narrow slits shown. Use the small-angle double-slit approximation. The screen can be repositioned at ${newDistance} m from the slits.`,
      calc('At the original position, find the distance from the central bright fringe to the third bright fringe on one side.', 'mm', 3 * spacing, 'Multiply the adjacent-fringe spacing by three.'),
      calc('Calculate the wavelength of the light.', 'nm', wavelength, 'Use λ = fringe spacing × slit separation / screen distance. Convert both millimetre measurements to metres, then convert λ to nm.'),
      calc('Find the adjacent-fringe spacing at the new screen position.', 'mm', spacing * newDistance / distance, 'With wavelength and slit separation fixed, fringe spacing is directly proportional to screen distance.'),
      interferenceFigure({ separation, distance, spacing }),
    );
  }),
  drill('grating-orders', [[500, 540], [400, 620], [600, 480], [300, 720]], (lines, wavelength) => {
    const spacing = 1e6 / lines;
    const order = Math.floor(spacing / wavelength);
    return scenario(
      `Light of wavelength ${wavelength} nm falls normally on a transmission grating of ${lines} lines per mm.`,
      calc('Calculate the grating spacing.', 'µm', spacing / 1000, 'Take the reciprocal of the line density to find spacing in mm, then convert to µm.'),
      exact('Find the highest observable diffraction order.', '(order)', order, 'Use d sin θ = nλ. The highest order is the greatest whole n for which nλ/d is at most 1.'),
      calc('Find the angle between the two maxima of that highest order on opposite sides of centre.', '°', 2 * Math.asin(order * wavelength / spacing) * 180 / Math.PI, 'Find θ from sin θ = nλ/d. The two maxima are symmetric, so their separation is 2θ.'),
    );
  }),
  drill('string-harmonics', [[1.2, 90, 3], [0.9, 120, 4], [1.4, 75, 5], [0.8, 150, 3]], (length, speed, harmonic) => {
    const fundamental = speed / (2 * length);
    return scenario(
      `A string of length ${length} m is fixed at both ends. Its transverse wave speed is ${speed} m s⁻¹. Consider its ${harmonic === 3 ? 'third' : harmonic === 4 ? 'fourth' : 'fifth'} harmonic.`,
      calc('Find the fundamental frequency.', 'Hz', fundamental, 'The fundamental has a single half-wavelength between the ends, so λ = 2L and f = v/λ.'),
      calc('Find the spacing between consecutive nodes in the named harmonic.', 'm', length / harmonic, 'The named harmonic fits that many half-wavelengths between the ends. Nodes are separated by one half-wavelength.'),
      calc('Find the frequency of the named harmonic.', 'Hz', harmonic * fundamental, 'Multiply the fundamental frequency by the harmonic number.'),
    );
  }),
  drill('closed-pipe', [[0.5, 340], [0.6, 330], [0.75, 345], [0.4, 352]], (length, speed) => {
    const base = speed / (4 * length);
    return scenario(
      `An air column of length ${length} m is closed at one end and open at the other. Sound travels at ${speed} m s⁻¹. Ignore the open-end correction.`,
      calc('Find the longest wavelength that resonates.', 'm', 4 * length, 'The tube fits a displacement node at the closed end and an adjacent antinode at the open end, separated by a quarter wavelength.'),
      calc('Find the second-lowest resonant frequency.', 'Hz', 3 * base, 'The resonances correspond to an odd number of quarter wavelengths. The next after the fundamental has three quarter wavelengths.'),
      calc('If the closed end is opened, find the change in fundamental frequency.', 'Hz', base, 'The open-open tube fits half a wavelength in the fundamental, giving twice the original fundamental frequency.'),
    );
  }),
  drill('speaker-paths', [[320, 400, 5, 2, 0], [336, 560, 6, 3, 1], [340, 680, 4, 3, 0], [350, 700, 7, 2, 1]], (speed, hz, length, halfWaves, opposite) => {
    const lambda = speed / hz;
    const other = length + halfWaves * lambda / 2;
    const constructive = (halfWaves + opposite) % 2 === 0;
    return scenario(
      `Two coherent speakers have the same frequency, ${hz} Hz, and start ${opposite ? '180° out of phase' : 'in phase'}. A microphone is ${length} m from speaker A and ${other} m from speaker B. Assume equal amplitudes at the microphone and sound speed ${speed} m s⁻¹.`,
      calc('Find the wavelength.', 'm', lambda, 'The wavelength is the speed divided by the common frequency.'),
      calc('Find the path difference in wavelengths, allowing a fractional answer.', 'wavelengths', halfWaves / 2, 'Subtract the shorter path from the longer and divide by the wavelength.'),
      exact('What fraction of the maximum possible intensity is detected? Enter 0 or 1.', '', Number(constructive), 'Each half-wavelength adds a 180° phase difference. Include the phase difference of the sources, then check if the two equal waves arrive in phase or opposite in phase.'),
    );
  }),
]);

const medical = practice('24', [
  ['xray-contrast', 'Why can bone appear lighter than surrounding tissue on a conventional X-ray image?', ['Bone increases the X-ray frequency', 'Bone transmits more X-rays', 'Bone attenuates more of the incident X-rays', 'Bone emits white light onto the detector'], 2, 'Bone absorbs or scatters a larger fraction of the beam, so fewer X-rays reach the corresponding detector area.'],
  ['echo-gel', 'What is the main role of gel between an ultrasound probe and skin?', ['Allow a stronger acoustic coupling by removing air gaps', 'Make sound travel at light speed', 'Increase the tissue impedance to infinity', 'Convert the sound into X-rays'], 0, 'Air gaps cause strong reflection because air impedance is far below tissue impedance. Gel replaces the air and improves transmission.'],
], [
  drill('pulse-echo', [[1540, 20, 34, 5], [1500, 24, 44, 4], [1580, 30, 46, 6], [1480, 26, 48, 3]], (speed, front, rear, frequency) => {
    const thickness = speed * (rear - front) / 2000;
    return scenario(
      `A pulse-echo scanner sends ultrasound of centre frequency ${frequency} MHz normally into a tissue layer. The diagram shows the travel times and the speed of sound within that layer.`,
      calc('Find the arrival-time difference of the echoes.', 'µs', rear - front, 'Subtract the earlier arrival time from the later one.'),
      calc('Find the thickness of the tissue layer.', 'mm', thickness, 'The later reflection travels across the tissue layer and back. Halve the additional echo time in seconds, multiply by sound speed, then convert to mm.'),
      calc('Find the thickness in wavelengths, allowing a fractional answer.', 'wavelengths', (rear - front) * frequency / 2, 'Divide the one-way travel time by the period. The factor of two accounts for the round trip.'),
      echoFigure({ speed, front, rear }),
    );
  }),
  drill('xray-attenuation', [[1200, 0.08, 5, 8], [1800, 0.12, 3, 6], [900, 0.06, 6, 10], [1600, 0.10, 4, 7]], (initial, mu, first, second) => scenario(
    `A detector would receive ${initial} counts per second with no absorber. Soft tissue of attenuation coefficient ${mu} cm⁻¹ can be placed in the beam. Ignore scatter into the detector and background. Assume exponential attenuation.`,
    calc(`Find the fraction transmitted through ${first} cm of tissue.`, '', Math.exp(-mu * first), 'Use the transmission fraction e raised to the power −μx.'),
    calc(`Find the count rate through ${second} cm of the tissue.`, 'counts s⁻¹', initial * Math.exp(-mu * second), 'Multiply the initial count rate by e to the power −μx for the second thickness.'),
    calc('Find the half-value thickness of this tissue.', 'cm', Math.LN2 / mu, 'Set e to the power −μx equal to 0.5 and solve x = ln 2/μ.'),
  )),
  drill('acoustic-impedance', [[1000, 1500, 1500, 2200], [1050, 1580, 1850, 3100], [1020, 1520, 1350, 1950], [980, 1470, 1600, 2500]], (rho1, v1, rho2, v2) => {
    const z1 = rho1 * v1;
    const z2 = rho2 * v2;
    const reflection = ((z2 - z1) / (z2 + z1)) ** 2;
    return scenario(
      `An ultrasound pulse hits a boundary normally. The first medium has density ${rho1} kg m⁻³ and speed of sound ${v1} m s⁻¹. The second medium has density ${rho2} kg m⁻³ and speed of sound ${v2} m s⁻¹. Ignore losses at the boundary.`,
      calc('Find the acoustic impedance of the first medium.', 'kg m⁻² s⁻¹', z1, 'Acoustic impedance is density multiplied by the speed of sound in the medium.'),
      calc('Find the percentage of incident intensity reflected.', '%', 100 * reflection, 'Calculate both impedances. The intensity reflection coefficient is the square of their difference divided by their sum, with the ratio squared.'),
      calc('Find the percentage of incident intensity transmitted.', '%', 100 * (1 - reflection), 'With no absorption at the interface, the reflected and transmitted fractions add to one.'),
    );
  }),
  drill('pet-timing', [[420, 0.30], [560, 0.50], [600, 0.70], [720, 1.10]], (separation, delay) => scenario(
    `Two PET detectors sit ${separation} mm apart. An annihilation on the line between them produces two 511 keV photons in opposite directions. Detector A receives its photon ${delay} ns before detector B. Take c = 300 mm ns⁻¹.`,
    calc('Find the difference in the two photon path lengths.', 'mm', 300 * delay, 'Multiply the arrival-time difference by the speed of light.'),
    calc('Find the distance from the annihilation to detector A.', 'mm', (separation - 300 * delay) / 2, 'The path lengths add to the detector separation. The path to A is shorter. Subtract the difference from the sum and halve.'),
    calc('Find the combined photon energy.', 'MeV', 1.022, 'Add the energies of the two 511 keV photons and divide by 1000 to convert keV to MeV.'),
  )),
  drill('ultrasound-resolution', [[4, 1540, 3], [6, 1500, 4], [5, 1560, 2], [7.5, 1480, 5]], (f, speed, cycles) => scenario(
    `A scanner transmits ${cycles} cycles of ${f} MHz ultrasound. The speed of sound is ${speed} m s⁻¹. Assume two echoes can be separated only when their arrival times differ by at least one pulse duration.`,
    calc('Calculate the pulse duration.', 'µs', cycles / f, 'MHz gives cycles per microsecond. Divide the number of cycles by the frequency in MHz.'),
    calc('Find the minimum resolvable separation of two flat reflectors on the same beam axis.', 'mm', speed * cycles / (2000 * f), 'The difference in round-trip times is twice the reflector separation divided by sound speed. Equate that time difference to the pulse duration.'),
    calc('Find the new minimum separation if the frequency is doubled with the same number of cycles.', 'mm', speed * cycles / (4000 * f), 'Doubling f halves the pulse duration and therefore halves the minimum resolvable separation.'),
  )),
]);

const astronomy = practice('25', [
  ['standard-candle', 'A star of known luminosity appears four times fainter than an identical, unobscured star. How do their distances compare?', ['It is four times as distant', 'It is twice as distant', 'It is half as distant', 'They are the same distance away'], 1, 'At fixed luminosity flux scales as 1/d², so a factor of four in flux means a factor of two in distance.'],
  ['expanding-space', 'Why do spectra from distant galaxies often show absorption lines displaced toward longer wavelengths?', ['The atoms in those galaxies are necessarily cooler', 'The lines always originate in Earth’s atmosphere', 'The light is redshifted as the universe expands', 'Each photon exchanges charge with dark matter'], 2, 'Cosmological expansion stretches light during its journey, increasing the observed wavelengths.'],
], [
  drill('stellar-parallax', [[0.25, 2], [0.16, 3], [0.08, 4], [0.32, 5]], (angle, baselineMultiplier) => scenario(
    `A nearby star is observed from opposite sides of Earth’s orbit. Use the parallax geometry shown. If light blocking is negligible, the same star can also be observed from a hypothetical orbit with a baseline ${baselineMultiplier} times as long, using the small-angle approximation.`,
    calc('Find the total apparent angular shift between the two Earth observations.', 'arcsec', 2 * angle, 'The parallax angle labels half the full shift between opposite orbital positions.'),
    calc('Calculate the distance to the star.', 'pc', 1 / angle, 'For the standard baseline of 2 AU the parallax distance in parsecs equals the reciprocal of the half-angle in arcseconds.'),
    calc('For the longer baseline, find the new total apparent shift.', 'arcsec', 2 * angle * baselineMultiplier, 'At the same distance the small angular shift is proportional to the baseline. The total is twice the half-angle.'),
    parallaxFigure({ baseline: 2, angle }),
  )),
  drill('luminosity-flux', [[3, 4, 3], [8, 6, 2], [2, 3, 4], [5, 8, 2.5]], (luminosity, distance, brighter) => {
    const flux = luminosity * 1e27 / (4 * Math.PI * (distance * 1e16) ** 2);
    return scenario(
      `Star A emits ${luminosity} × 10²⁷ W uniformly in all directions and is ${distance} × 10¹⁶ m away. Star B is ${brighter} times as luminous. Ignore absorption.`,
      calc('Find the surface area of a sphere centred on star A with the observer at its radius.', 'm²', 4 * Math.PI * (distance * 1e16) ** 2, 'Use 4πr² with the distance expressed in metres.'),
      calc('Calculate the irradiance from star A at the observer.', 'W m⁻²', flux, 'Divide star A’s luminosity by the area of the sphere at the observer’s distance.'),
      calc('If both stars have equal observed irradiance, find the distance of star B as a multiple of the distance of star A.', '', Math.sqrt(brighter), 'Equal irradiance implies the luminosity ratio equals the square of the distance ratio.'),
    );
  }),
  drill('galaxy-redshift', [[500, 510, 70], [600, 615, 72], [400, 408, 68], [650, 663, 75]], (rest, observed, hubble) => {
    const z = (observed - rest) / rest;
    const v = z * 3e5;
    return scenario(
      `A line of rest wavelength ${rest} nm appears at ${observed} nm in a galaxy spectrum. Use v ≈ cz for this small redshift, c = 3.00 × 10⁵ km s⁻¹, and H₀ = ${hubble} km s⁻¹ Mpc⁻¹.`,
      calc('Find the redshift z.', '', z, 'Divide the wavelength increase by the rest wavelength.'),
      calc('Estimate the galaxy’s recession speed.', 'km s⁻¹', v, 'Multiply the dimensionless redshift by the speed of light in km/s.'),
      calc('Estimate the galaxy’s distance.', 'Mpc', v / hubble, 'Use the Hubble law v = H₀d and divide the speed by H₀.'),
    );
  }),
  drill('stellar-temperature', [[480, 720, 1.5], [400, 800, 2], [510, 680, 1.2], [420, 630, 1.7]], (first, second, radiusRatio) => {
    const temperature = 2.90e6 / first;
    return scenario(
      `Two stars can be modelled as black bodies. Their peak wavelengths are ${first} nm for star A and ${second} nm for star B. Star B’s radius is ${radiusRatio} times star A’s radius. Use b = 2.90 × 10⁻³ m K for Wien’s law.`,
      calc('Estimate the surface temperature of star A.', 'K', temperature, 'Convert the wavelength to metres and divide Wien’s constant by it.'),
      calc('Find the surface temperature of star B as a fraction of star A’s temperature.', '', first / second, 'Wien’s law makes temperature inversely proportional to peak wavelength.'),
      calc('Find star B’s luminosity as a fraction or multiple of star A’s luminosity.', '', radiusRatio ** 2 * (first / second) ** 4, 'Luminosity is proportional to surface area times temperature to the fourth power. Multiply the squared radius ratio by the fourth power of the temperature ratio.'),
    );
  }),
  drill('binary-orbit', [[2, 12, 8], [3, 18, 18], [4, 20, 20], [5, 16, 9]], (massRatio, sep, period) => {
    const primaryOrbit = sep / (1 + massRatio);
    return scenario(
      `Two stars orbit their common centre of mass in circles. Their centres stay ${sep} × 10⁹ m apart and their period is ${period} days. The primary has ${massRatio} times the mass of the secondary. Use G = 6.67 × 10⁻¹¹ m³ kg⁻¹ s⁻².`,
      calc('Find the radius of the primary star’s orbit about the centre of mass.', 'billion m', primaryOrbit, 'The distances to the centre of mass are inversely proportional to the masses and sum to their separation.'),
      calc('Calculate the orbital speed of the secondary star.', 'km s⁻¹', 2 * Math.PI * (sep - primaryOrbit) * 1e6 / (86400 * period), 'Subtract the primary’s orbital radius from the separation. Divide the circumference of the secondary’s orbit by the period in seconds and convert to km/s.'),
      calc('Calculate the combined mass of the stars.', 'kg', 4 * Math.PI ** 2 * (sep * 1e9) ** 3 / (6.67e-11 * (86400 * period) ** 2), 'For a circular binary, the relative motion follows GMtotal = 4π²a³/T², where a is the full separation. Use G = 6.67 × 10⁻¹¹ m³ kg⁻¹ s⁻².'),
    );
  }),
]);

const communication = practice('communication', [
  ['amplitude-modulation', 'What is varied by the message signal in ideal amplitude modulation?', ['The centre frequency of the carrier', 'The propagation speed of the carrier', 'The carrier amplitude', 'The carrier frequency and propagation speed together'], 2, 'The envelope of the carrier follows the message. The carrier frequency is fixed.'],
  ['optical-carrier', 'How is a digital bit stream commonly represented in a simple optical-fibre link?', ['Positive and negative electric charge pulses in glass', 'Light pulses with controlled on/off states', 'Slow changes in the total length of the fibre', 'Pressure pulses in the cladding'], 1, 'The transmitter switches optical pulses according to the line code. The receiver detects them and reconstructs the data.'],
], [
  drill('am-envelope', [[8, 2, 1, 160], [10, 4, 2, 200], [12, 3, 1.5, 180], [9, 3, 2.5, 250]], (maximum, minimum, period, carrier) => {
    const center = (maximum + minimum) / 2;
    const depth = (maximum - minimum) / 2;
    const envelope = Array.from({ length: 49 }, (_, i) => [2 * period * i / 48, center + depth * Math.cos(i * Math.PI / 12)]);
    return scenario(
      `An amplitude-modulated radio wave has a carrier at ${carrier} kHz. The graph shows the upper envelope only. The underlying rapid carrier oscillations have been omitted.`,
      calc('Read the period of the envelope oscillation.', 'ms', period, 'The envelope period is the time from one envelope maximum to the next.'),
      calc('Find the modulation frequency.', 'Hz', 1000 / period, 'Take the reciprocal of the envelope period in seconds.'),
      calc('Find the amplitude modulation depth as a percentage.', '%', 100 * depth / center, 'The modulation depth is (maximum − minimum)/(maximum + minimum). Multiply the ratio by 100.'),
      plotFigure({ caption: 'Upper envelope of the AM signal', alt: `The envelope has successive ${maximum} V peaks at zero and ${period} milliseconds. Halfway between the peaks the minimum is ${minimum} V.`, xLabel: 'time / ms', yLabel: 'envelope / V', xTicks: [0, period / 2, period, 1.5 * period, 2 * period], yTicks: [0, minimum, maximum], traces: [{ points: envelope, markers: false }] }),
    );
  }),
  drill('fibre-link', [[12, 1.5, 0.3, 4], [20, 1.48, 0.2, 8], [35, 1.46, 0.25, 12], [42, 1.52, 0.24, 16]], (length, index, lossPerKm, mw) => {
    const loss = lossPerKm * length;
    return scenario(
      `An optical fibre is ${length} km long with refractive index ${index} and power loss ${lossPerKm} dB per km. The transmitter couples ${mw} mW into the fibre. Use light speed in vacuum 3.00 × 10⁸ m s⁻¹.`,
      calc('Find the total fibre attenuation.', 'dB', loss, 'Multiply the attenuation per kilometre by the link length.'),
      calc('Find the one-way propagation time.', 'µs', length * index / 0.3, 'In the fibre v = c/n. Divide length by speed, converting kilometres to metres and seconds to microseconds.'),
      calc('Calculate the power reaching the far end.', 'mW', mw * 10 ** (-loss / 10), 'For a loss of L decibels the power ratio is 10 to the power −L/10. Multiply input power by this ratio.'),
    );
  }),
  drill('digital-sampling', [[4, 10, 8, 30], [6, 16, 12, 20], [12, 30, 10, 15], [18, 48, 16, 10]], (band, rate, bits, seconds) => scenario(
    `An analogue signal contains frequencies up to ${band} kHz. It is sampled at ${rate} ksample s⁻¹ and each sample is represented by ${bits} bits. Ignore file headers and any compression.`,
    calc('Find the theoretical Nyquist minimum sample rate.', 'ksample s⁻¹', 2 * band, 'The Nyquist limit is twice the highest analogue frequency. Practical systems use a margin above it.'),
    exact('Find the number of available digital codes per sample.', 'codes', 2 ** bits, 'A word of b bits can represent 2 to the power b different codes.'),
    calc(`Find the data volume for a ${seconds} s recording.`, 'kB', rate * bits * seconds / 8, 'Multiply samples per second by bits per sample and duration. Divide by eight bits per byte, then by 1000 for decimal kilobytes.'),
  )),
  drill('amplifier-link', [[4, 9, 12.2], [10, 8, 15], [2, 6, 10], [5, 11, 14]], (power, loss, gain) => scenario(
    `A ${power} mW signal passes through a link with power attenuation of ${loss} dB followed by an amplifier of ${gain} dB gain. Ignore noise for this calculation.`,
    calc('Find the net gain of the system.', 'dB', gain - loss, 'Cascaded logarithmic power gains add. Treat the attenuation as a negative gain.'),
    calc('Find the signal power entering the amplifier.', 'mW', power * 10 ** (-loss / 10), 'Multiply the input power by 10 to the power −loss/10.'),
    calc('Find the final output power.', 'mW', power * 10 ** ((gain - loss) / 10), 'Convert the net decibel gain to a power ratio and multiply by the original signal power.'),
  )),
  drill('sidebands', [[800, 3, 12], [1000, 4.5, 16], [650, 2.5, 8], [1200, 5, 20]], (carrier, signal, available) => scenario(
    `An AM transmitter uses a ${carrier} kHz carrier and a single message tone of ${signal} kHz. It has an allocated ${available} kHz band centred on the carrier. Both sidebands are transmitted.`,
    calc('Find the lower sideband frequency.', 'kHz', carrier - signal, 'Subtract the message frequency from the carrier frequency.'),
    calc('Find the upper sideband frequency.', 'kHz', carrier + signal, 'Add the message frequency to the carrier frequency.'),
    calc('Find the total unused bandwidth within the allocation for this signal.', 'kHz', available - 2 * signal, 'The occupied width extends between the lower and upper sidebands and equals twice the message frequency. Subtract that width from the allocation.'),
  )),
]);

export const wavePractice = [...waves, ...superposition, ...medical, ...astronomy, ...communication];
