import { calc, drill, plotFigure, practice, scenario } from './physics-practice-tools.js';

const temperature = practice('temperature', [
  ['kelvin-scale', 'A sample warms from 20 °C to 50 °C. What is its temperature rise on the kelvin scale?', ['30 K', '50 K', '273 K', '303 K'], 0, 'The Celsius and kelvin scales have equal-sized intervals. The 273.15 offset cancels when subtracting temperatures.'],
  ['thermal-equilibrium', 'Two bodies are in thermal equilibrium with one another. Which quantity must be equal?', ['Their masses', 'Their total internal energies', 'Their temperatures', 'Their heat capacities'], 2, 'Thermal equilibrium means there is no net energy transfer by heating between the bodies. That occurs at equal temperature.'],
], [
  drill('heating-gradient', [[0.5, 22, 15, 120, 90], [0.4, 25, 20, 100, 95], [0.7, 18, 12, 140, 80], [0.6, 20, 24, 180, 112]], (mass, start, rise, time, power) => scenario(
    `A heater delivers net power ${power} W to a ${mass} kg sample, already corrected for heat losses. No phase change occurs. The graph shows the temperature during the heater test.`,
    calc('Find the temperature rise during the test.', 'K', rise, 'Subtract the starting temperature from the final temperature. A degree Celsius interval equals a kelvin interval.'),
    calc('Find the sample’s specific heat capacity.', 'J kg⁻¹ K⁻¹', power * time / (mass * rise), 'From Q = Pt = mcΔT, divide the energy delivered by mass and temperature rise.'),
    calc('Estimate how many additional seconds the same heater would take to raise the temperature by another 10 K.', 's', time * 10 / rise, 'At constant net power and heat capacity the heating time is proportional to the temperature rise.'),
    plotFigure({ caption: 'Temperature during the constant-power heating test', alt: `A straight line rises from ${start} degrees Celsius at zero seconds to ${start + rise} degrees Celsius at ${time} seconds.`, xLabel: 'time / s', yLabel: 'temperature / °C', xTicks: [0, time / 2, time], yTicks: [start, start + rise / 2, start + rise], traces: [{ points: [[0, start], [time, start + rise]] }] }),
  ), 'thermal'),
  drill('thermometer-resistance', [[100, 140, 0, 100, 125], [50, 66, 10, 90, 59], [200, 240, 0, 80, 230], [150, 194, 20, 100, 183]], (low, high, t0, t1, measured) => {
    const step = (high - low) / (t1 - t0);
    const celsius = t0 + (measured - low) / step;
    return scenario(
      `A resistance thermometer gives ${low} Ω at ${t0} °C and ${high} Ω at ${t1} °C. Assume a linear calibration. The current resistance reading is ${measured} Ω.`,
      calc('Find the resistance change between the two calibration points.', 'Ω', high - low, 'Subtract the low-temperature resistance from the high-temperature resistance.'),
      calc('Find the sensitivity of the thermometer.', 'Ω K⁻¹', step, 'Divide the change in resistance by the temperature difference between the calibration points.'),
      calc('Find the measured temperature in kelvins.', 'K', celsius + 273.15, 'Use the slope and low-temperature calibration point to interpolate the Celsius reading, then add 273.15.'),
    );
  }),
  drill('mixing-water', [[0.20, 80, 0.30, 20], [0.40, 60, 0.20, 15], [0.25, 72, 0.35, 18], [0.30, 65, 0.50, 25]], (hot, high, cold, low) => {
    const temp = (hot * high + cold * low) / (hot + cold);
    return scenario(
      `Mix ${hot} kg of water at ${high} °C with ${cold} kg of water at ${low} °C in a container of negligible heat capacity. Use the specific heat capacity 4200 J kg⁻¹ K⁻¹ and assume no heat loss outside the mixture.`,
      calc('Find the combined mass of water.', 'kg', hot + cold, 'Add the two masses.'),
      calc('Find the final equilibrium temperature.', '°C', temp, 'Equate the energy lost by the hot water to the energy gained by the cold water. The identical specific heat capacities cancel, leaving a mass-weighted mean.'),
      calc('Calculate how much energy the cold water gains.', 'kJ', cold * 4200 * (temp - low) / 1000, 'Use the cold water mass and its temperature rise in mcΔT. Divide joules by 1000.'),
    );
  }, 'thermal'),
  drill('melting-calorimeter', [[0.08, 60, 8, 450], [0.10, 80, 10, 420], [0.06, 75, 12, 300], [0.12, 100, 20, 480]], (mass, input, loss, time) => {
    const net = input - loss;
    return scenario(
      `A ${mass} kg sample is at its melting point. A heater supplies ${input} W while the apparatus loses ${loss} W to the room. Complete melting takes ${time} s at constant temperature.`,
      calc('Find the net heating power available to the sample.', 'W', net, 'Subtract the rate of heat loss from the input power.'),
      calc('Find the specific latent heat of fusion for the sample.', 'kJ kg⁻¹', net * time / (1000 * mass), 'Multiply net power by the duration of melting and divide by mass. Convert J/kg to kJ/kg.'),
      calc('Estimate the new melting time if the same heater operated with no heat loss.', 's', net * time / input, 'The energy to melt the sample is unchanged. Divide the original net energy by the full input power.'),
    );
  }, 'thermal'),
  drill('solid-calorimetry', [[12, 2, 180, 0.35, 600, 16], [18, 2.5, 200, 0.50, 900, 18], [9, 3, 240, 0.45, 720, 15], [15, 2, 300, 0.60, 1800, 20]], (volts, current, time, mass, loss, rise) => {
    const energy = volts * current * time;
    return scenario(
      `An electrical heater runs at ${volts} V and ${current} A for ${time} s, warming a ${mass} kg solid by ${rise} K. The solid absorbs all the electrical energy except ${loss} J lost to the surroundings.`,
      calc('Find the electrical power delivered to the heater.', 'W', volts * current, 'Electrical power is current times potential difference.'),
      calc('Find the specific heat capacity of the solid.', 'J kg⁻¹ K⁻¹', (energy - loss) / (mass * rise), 'Subtract the energy loss from VIt and divide by mass and temperature rise.'),
      calc('Find the percentage by which ignoring the loss would overestimate the specific heat capacity.', '%', 100 * loss / (energy - loss), 'The fractional overestimate is the extra energy incorrectly assigned to the solid divided by its true energy gain.'),
    );
  }, 'thermal'),
]);

const gases = practice('15', [
  ['ideal-collisions', 'Which property is assumed for collisions of ideal gas particles with the walls of their container?', ['They are perfectly elastic', 'The particles stick on impact', 'Only massive particles collide', 'Total kinetic energy constantly decreases'], 0, 'In the ideal-gas model molecules collide elastically with one another and with the container walls.'],
  ['molecular-energy', 'Two ideal gases of different molar masses are in thermal equilibrium. Which microscopic quantity is the same?', ['The average translational kinetic energy per particle', 'The root-mean-square speed', 'The number of molecules per kilogram', 'The mass of each molecule'], 0, 'The mean translational kinetic energy is ³⁄₂kT, set only by absolute temperature. A lighter particle has a greater rms speed at that temperature.'],
], [
  drill('isotherm-graph', [[160, 2, 300, 360], [200, 3, 310, 372], [120, 4, 280, 336], [180, 2.5, 350, 420]], (p, litres, originalT, newT) => {
    const points = Array.from({ length: 31 }, (_, i) => {
      const ratio = 1 + i / 10;
      return [ratio * litres, p / ratio];
    });
    return scenario(
      `The graph shows a slow expansion of a fixed amount of ideal gas at ${originalT} K. After the expansion to the largest plotted volume, the gas is heated at that fixed volume to ${newT} K. Use R = 8.31 J mol⁻¹ K⁻¹.`,
      calc('Read the gas pressure at the smallest plotted volume.', 'kPa', p, 'Use the leftmost data point of the isotherm.'),
      calc('Calculate the amount of gas.', 'mol', p * litres / (8.31 * originalT), 'Use n = pV/(RT) at a point on the plotted isotherm. A kilopascal times a litre equals a joule.'),
      calc('Find the final pressure after the heating stage.', 'kPa', p * newT / (4 * originalT), 'At four times the initial volume the isothermal pressure is one quarter of the initial pressure. At the fixed final volume the pressure then scales with absolute temperature.'),
      plotFigure({ caption: 'Pressure–volume isotherm of the trapped gas', alt: `Pressure starts at ${p} kPa at ${litres} litres. The inverse curve passes through ${p / 2} kPa at ${2 * litres} litres and ends at ${p / 4} kPa at ${4 * litres} litres.`, xLabel: 'volume / litres', yLabel: 'pressure / kPa', xTicks: [litres, 2 * litres, 3 * litres, 4 * litres], yTicks: [0, p / 4, p / 2, p], traces: [{ points, markers: false }] }),
    );
  }),
  drill('venting-vessel', [[250, 4, 300, 360, 25], [320, 5, 320, 400, 40], [180, 3, 280, 350, 20], [300, 6, 350, 420, 30]], (p, v, start, end, loss) => scenario(
    `A rigid ${v} litre vessel contains an ideal gas initially at ${p} kPa and ${start} K. It is vented until ${loss}% of the molecules escape. It is then closed and its temperature is changed to ${end} K. Use R = 8.31 J mol⁻¹ K⁻¹.`,
    calc('Find the initial amount of gas.', 'mol', p * v / (8.31 * start), 'Divide pV by RT. The product of kPa and litres equals joules.'),
    calc('Find the final pressure.', 'kPa', p * (1 - loss / 100) * end / start, 'At fixed volume pressure is proportional to the product nT. Include both the retained amount and the temperature change.'),
    calc('Find the number of moles released through the valve.', 'mol', p * v / (8.31 * start) * loss / 100, 'Multiply the original amount by the fraction that escaped.'),
  )),
  drill('molecular-speed', [[1.2, 100, 20], [1.5, 125, 30], [0.9, 95, 25], [1.8, 150, 40]], (density, p, rise) => scenario(
    `An ideal gas has density ${density} kg m⁻³ and pressure ${p} kPa. Its density stays constant as it is heated in a rigid vessel until its pressure has risen by ${rise}%. Use p = ⅓ρcᵣₘₛ².`,
    calc('Convert the initial pressure to pascals.', 'Pa', p * 1000, 'One kilopascal is 1000 Pa.'),
    calc('Find the initial rms molecular speed.', 'm s⁻¹', Math.sqrt(3 * p * 1000 / density), 'Rearrange the kinetic theory equation to cᵣₘₛ = √(3p/ρ).'),
    calc('Find the final rms speed.', 'm s⁻¹', Math.sqrt(3 * p * 1000 * (1 + rise / 100) / density), 'Use the new pressure and the unchanged mass density in the same equation.'),
  )),
  drill('molar-mass', [[100, 295, 1.15, 24], [120, 310, 1.32, 12], [95, 280, 1.15, 18], [140, 330, 1.6, 16]], (p, kelvin, density, litres) => {
    const mass = density * litres * 1e-3;
    const n = p * litres / (8.31 * kelvin);
    return scenario(
      `An ideal gas in a ${litres} litre vessel has density ${density} kg m⁻³ at ${p} kPa and ${kelvin} K. Use R = 8.31 J mol⁻¹ K⁻¹ and Nₐ = 6.02 × 10²³ mol⁻¹.`,
      calc('Find the mass of the gas in the vessel.', 'g', 1000 * mass, 'Convert volume to m³ and multiply by density, then convert kg to g.'),
      calc('Find the molar mass of the gas.', 'g mol⁻¹', mass * 1000 / n, 'Use pV = nRT to find the amount. Divide the mass in grams by that amount.'),
      calc('Find the number of molecules in the vessel.', 'molecules', n * 6.02e23, 'Multiply the amount in moles by the Avogadro constant.'),
    );
  }),
  drill('two-gases', [[0.4, 0.6, 10, 300], [0.5, 0.2, 8, 320], [0.3, 0.9, 12, 290], [0.7, 0.4, 15, 340]], (a, b, v, t) => scenario(
    `Mix ${a} mol of helium with ${b} mol of neon in a fixed ${v} litre vessel at equilibrium temperature ${t} K. Both behave ideally, and each contributes the pressure it would exert alone in the same vessel. Use R = 8.31 J mol⁻¹ K⁻¹ and k = 1.38 × 10⁻²³ J K⁻¹.`,
    calc('Find the helium mole fraction.', '', a / (a + b), 'Divide the amount of helium by the total amount of both gases.'),
    calc('Calculate the total pressure.', 'kPa', (a + b) * 8.31 * t / v, 'Add the two partial pressures, equivalent to using the total molar amount in pV = nRT. R is numerically compatible with kPa and litres.'),
    calc('Find the mean translational kinetic energy of a neon atom.', 'J', 1.5 * 1.38e-23 * t, 'For an ideal gas the mean translational energy is ³⁄₂kT, independent of molecular mass.'),
  )),
]);

const thermodynamics = practice('16', [
  ['cycle-energy', 'A system returns to precisely its initial state after a thermodynamic cycle. What is the net change in its internal energy?', ['Always zero', 'Equal to the total work done by the system', 'Equal to the total heat supplied', 'It cannot be determined without path details'], 0, 'Internal energy is a state function. Its change around a closed cycle is zero.'],
  ['constant-volume', 'An ideal gas is heated in a rigid vessel. Which statement is correct?', ['The gas does positive expansion work', 'The gas does no expansion work', 'The pressure must stay constant', 'The internal energy must fall'], 1, 'A rigid vessel has no volume change, so pressure–volume work is zero and heating increases internal energy.'],
], [
  drill('rectangular-cycle', [[1, 3, 100, 240], [2, 5, 110, 190], [1.5, 4, 80, 200], [2.5, 6, 120, 260]], (lo, hi, lower, upper) => {
    const cycleWork = (upper - lower) * (hi - lo);
    return scenario(
      'An ideal gas follows the plotted pressure–volume cycle clockwise, starting at the lower-left corner. It is first heated at constant volume, expands at the upper pressure, cools at constant volume, and is compressed at the lower pressure.',
      calc('Find the work done by the gas during the expansion leg.', 'J', upper * (hi - lo), 'At constant pressure the expansion work is pΔV. A kilopascal times a litre equals a joule.'),
      calc('Find the net work done by the gas over the full cycle.', 'J', cycleWork, 'The expansion work is partially cancelled by compression at the lower pressure. The difference is the enclosed area.'),
      calc('Find the net heat supplied to the gas over the full cycle.', 'J', cycleWork, 'The gas returns to the initial state, so its net internal energy change is zero. Net heat input therefore equals net work done by the gas.'),
      plotFigure({ caption: 'Clockwise gas cycle on a pressure–volume diagram', alt: `A rectangle with volumes ${lo} and ${hi} L and pressures ${lower} and ${upper} kPa. Traversal starts at low pressure and low volume, then goes up, right, down and left.`, xLabel: 'volume / L', yLabel: 'pressure / kPa', xTicks: [0, lo, hi], yTicks: [0, lower, upper], traces: [{ points: [[lo, lower], [lo, upper], [hi, upper], [hi, lower], [lo, lower]] }] }),
    );
  }),
  drill('isobaric-heating', [[100, 2, 5, 750], [120, 3, 7, 1200], [150, 2.5, 6, 1312.5], [180, 4, 8, 1800]], (p, initial, final, heat) => {
    const work = p * (final - initial);
    return scenario(
      `An ideal gas receives ${heat} J of heat and expands at constant pressure of ${p} kPa from ${initial} to ${final} litres.`,
      calc('Find the volume increase in litres.', 'L', final - initial, 'Subtract the initial volume from the final volume.'),
      calc('Calculate the increase in internal energy.', 'J', heat - work, 'Use the first law: heat supplied minus work done by the gas. At fixed pressure the work is pΔV.'),
      calc('Find the final absolute temperature as a multiple of the initial temperature.', '', final / initial, 'For a fixed amount of gas at constant pressure, volume is proportional to absolute temperature.'),
    );
  }),
  drill('rigid-vessel-heating', [[100, 300, 450, 250], [180, 280, 420, 360], [120, 310, 400, 190], [150, 320, 520, 450]], (p, start, end, q) => scenario(
    `A gas is sealed in a rigid vessel at ${p} kPa and ${start} K. It absorbs ${q} J of heat, reaching ${end} K. Treat it as an ideal gas.`,
    calc('Find the change in temperature.', 'K', end - start, 'Subtract the original absolute temperature from the final temperature.'),
    calc('Find the internal energy increase.', 'J', q, 'The gas performs no expansion work at constant volume, so all the heat absorbed increases its internal energy.'),
    calc('Calculate the final pressure.', 'kPa', p * end / start, 'At fixed amount and volume, pressure is proportional to absolute temperature.'),
  )),
  drill('piston-compression', [[0.01, 180, 0.2, 900], [0.02, 200, 0.15, 1500], [0.025, 160, 0.10, 1000], [0.015, 220, 0.12, 990]], (area, p, distance, heatLost) => {
    const work = p * 1000 * area * distance;
    return scenario(
      `A piston of area ${area} m² compresses a gas slowly at constant pressure ${p} kPa, moving in by ${distance} m. The gas loses ${heatLost} J of energy by heating its surroundings during the process.`,
      calc('Find the magnitude of the force exerted by the gas on the piston.', 'N', p * 1000 * area, 'Multiply pressure in Pa by piston area.'),
      calc('Calculate the work done on the gas.', 'J', work, 'Multiply pressure by the reduction in volume, which is piston area times displacement.'),
      calc('Find the change in the gas’s internal energy.', 'J', work - heatLost, 'The compression work increases internal energy. Subtract the thermal energy that leaves the gas.'),
    );
  }),
  drill('adiabatic-expansion', [[200, 3, 6, 300, 1.4], [300, 4, 10, 400, 1.4], [250, 3, 9, 450, 1.67], [180, 5, 8, 330, 1.67]], (p, initial, final, temperature, gamma) => {
    const ratio = final / initial;
    return scenario(
      `An ideal gas expands adiabatically from ${initial} to ${final} litres. It initially has pressure ${p} kPa and temperature ${temperature} K. For this process, use pVᵞ = constant with γ = ${gamma}.`,
      calc('Find the factor by which the volume increases.', '', ratio, 'Divide the final volume by the initial volume.'),
      calc('Calculate the final pressure.', 'kPa', p * ratio ** -gamma, 'To keep pVᵞ constant, multiply the initial pressure by the inverse volume ratio to the power γ.'),
      calc('Calculate the final absolute temperature.', 'K', temperature * ratio ** (1 - gamma), 'Since T is proportional to pV for a fixed amount of gas, combine the pressure factor with the volume factor.'),
    );
  }),
]);

const oscillations = practice('17', [
  ['restoring-definition', 'For simple harmonic motion, how is acceleration related to displacement from equilibrium?', ['Same sign and proportional to displacement', 'Opposite sign and proportional to displacement', 'Constant at all displacements', 'Zero except at the ends'], 1, 'The restoring acceleration is −ω²x. It vanishes at equilibrium and points back towards it elsewhere.'],
  ['resonance-damping', 'What happens to a driven oscillator’s resonance peak when damping is increased?', ['It becomes higher and narrower', 'It stays the same in height and width', 'It becomes lower and broader', 'It moves to infinitely high frequency'], 2, 'Damping reduces peak amplitude and makes the response less sharply concentrated around resonance.'],
], [
  drill('oscillator-graph', [[6, 0.8, 0.5], [8, 1.2, 0.6], [5, 0.6, 0.4], [10, 1.6, 0.8]], (cm, period, fraction) => {
    const omega = 2 * Math.PI / period;
    const x = cm * fraction / 100;
    const points = Array.from({ length: 41 }, (_, i) => [period * i / 40, cm * Math.cos(i * Math.PI / 20)]);
    return scenario(
      'A small object undergoes simple harmonic motion. Its displacement is plotted for one cycle. Use the scales on both axes.',
      calc('Read the angular frequency from the plotted period.', 'rad s⁻¹', omega, 'Read the interval between matching crests, then divide 2π by that period.'),
      calc(`Find the magnitude of acceleration at a displacement of +${cm * fraction} cm.`, 'm s⁻²', omega ** 2 * x, 'Use |a| = ω²|x| with displacement in metres.'),
      calc('Find the maximum speed.', 'm s⁻¹', omega * cm / 100, 'Maximum speed occurs at equilibrium and equals angular frequency times amplitude in metres.'),
      plotFigure({ caption: 'Displacement of the oscillator against time', alt: `The cosine curve starts at plus ${cm} cm, reaches minus ${cm} cm at ${period / 2} s and returns to plus ${cm} cm at ${period} s.`, xLabel: 'time / s', yLabel: 'displacement / cm', xTicks: [0, period / 4, period / 2, 3 * period / 4, period], yTicks: [-cm, 0, cm], traces: [{ points, markers: false }] }),
    );
  }),
  drill('mass-spring', [[0.4, 40, 8], [0.3, 54, 6], [0.5, 45, 10], [0.2, 32, 5]], (mass, stiffness, amplitude) => {
    const a = amplitude / 100;
    return scenario(
      `A ${mass} kg mass oscillates horizontally on a spring with constant ${stiffness} N m⁻¹. Its amplitude is ${amplitude} cm. Damping is negligible.`,
      calc('Calculate the maximum spring force magnitude.', 'N', stiffness * a, 'The force magnitude grows with displacement and peaks at amplitude A. Use kA.'),
      calc('Find the period of oscillation.', 's', 2 * Math.PI * Math.sqrt(mass / stiffness), 'Since ω² = k/m, T = 2π√(m/k).'),
      calc('Calculate the kinetic energy at a displacement of half the amplitude.', 'J', 3 * stiffness * a ** 2 / 8, 'Energy is conserved. Subtract ½k(A/2)² of potential energy from the total ½kA².'),
    );
  }),
  drill('changing-pendulum', [[0.8, 9.81, 1.25], [1.2, 9.81, 1.5], [0.5, 9.81, 1.8], [1.0, 9.81, 2]], (length, gravity, multiplier) => {
    const t = 2 * Math.PI * Math.sqrt(length / gravity);
    return scenario(
      `A pendulum of length ${length} m swings through a small angle where g = ${gravity} m s⁻². Its length is later increased by a factor of ${multiplier} without changing g.`,
      calc('Find the original period.', 's', t, 'Use T = 2π√(L/g) for a small-angle pendulum.'),
      calc('Find the new frequency.', 'Hz', 1 / (t * Math.sqrt(multiplier)), 'The new period scales with the square root of the length. Its reciprocal gives frequency.'),
      calc('Find how much longer the lengthened pendulum takes to make ten complete swings.', 's', 10 * t * (Math.sqrt(multiplier) - 1), 'Find the increase in the period and multiply it by ten.'),
    );
  }),
  drill('damping-per-cycle', [[12, 0.9, 3, 0.8], [10, 0.85, 4, 1.2], [15, 0.8, 2, 0.6], [8, 0.92, 5, 1]], (amplitude, retention, cycles, period) => scenario(
    `A weakly damped oscillator has amplitude ${amplitude} cm at a turning point. Each complete cycle multiplies its amplitude by ${Math.round(100 * retention)}%. The period is approximately constant at ${period} s.`,
    calc('Find the time elapsed after the next complete cycle.', 's', period, 'A complete oscillation takes one period.'),
    calc(`Find the amplitude after ${cycles} cycles.`, 'cm', amplitude * retention ** cycles, 'Multiply the initial amplitude by the retained fraction once for each cycle.'),
    calc(`Find the percentage of the initial oscillation energy remaining after ${cycles} cycles.`, '%', 100 * retention ** (2 * cycles), 'The mechanical energy at a turning point is proportional to amplitude squared. Square the amplitude ratio and convert to a percentage.'),
  )),
  drill('shm-from-acceleration', [[5, 0.8, 0.12], [4, 1.2, 0.08], [6, 1.5, 0.14], [8, 2.0, 0.16]], (cm, acceleration, amplitude) => {
    const omega = Math.sqrt(acceleration / (cm / 100));
    return scenario(
      `An oscillator’s restoring acceleration has magnitude ${acceleration} m s⁻² when it is ${cm} cm from equilibrium. Its amplitude is ${amplitude} m. It obeys simple harmonic motion.`,
      calc('Find its acceleration magnitude at twice the stated displacement.', 'm s⁻²', acceleration * 2, 'Restoring acceleration magnitude is directly proportional to displacement magnitude.'),
      calc('Calculate the period.', 's', 2 * Math.PI / omega, 'The ratio of acceleration magnitude to displacement in metres gives ω². Find ω and then use T = 2π/ω.'),
      calc('Calculate its speed when it is at the stated displacement.', 'm s⁻¹', omega * Math.sqrt(amplitude ** 2 - (cm / 100) ** 2), 'Use v = ω√(A² − x²), with amplitude and displacement both in metres.'),
    );
  }),
]);

const phases = practice('phases', [
  ['melting-particles', 'An initially pure solid melts at constant pressure. Why can it absorb energy with no temperature increase?', ['The added energy only increases mean kinetic energy', 'Energy is used to change molecular arrangements and increase potential energy', 'The solid stops exchanging energy', 'The particles lose potential energy as temperature rises'], 1, 'During melting at equilibrium the added energy changes the arrangement of particles and their intermolecular potential energy rather than raising their mean thermal kinetic energy.'],
  ['evaporative-cooling', 'Why can evaporation from a liquid surface cool the remaining liquid?', ['The slowest molecules preferentially escape', 'The faster molecules are more likely to escape', 'Air pressure is always exactly zero', 'Evaporation produces heat in the remaining liquid'], 1, 'Escape favours molecules that have enough kinetic energy to overcome intermolecular attraction. Their loss lowers the mean energy of those remaining.'],
], [
  drill('melting-curve', [[0.20, 12, 80, 50, 160, 40, 140], [0.15, 15, 65, 60, 180, 30, 95], [0.30, 10, 70, 45, 240, 25, 115], [0.25, 20, 90, 50, 200, 50, 100]], (mass, start, melt, pre, hold, after, power) => {
    const end = melt + 15;
    return scenario(
      `A pure ${mass} kg sample is heated under constant pressure at net power ${power} W. Its heating curve begins in the solid phase and ends in the liquid phase.`,
      calc('Read the melting temperature of the substance.', '°C', melt, 'The temperature is constant during the solid-to-liquid plateau.'),
      calc('Find the specific latent heat of fusion.', 'kJ kg⁻¹', power * hold / (1000 * mass), 'Read the duration of the plateau. Multiply by the power and divide by mass, then convert to kJ/kg.'),
      calc('Find the specific heat capacity of the liquid over the final rising segment.', 'J kg⁻¹ K⁻¹', power * after / (mass * 15), 'Multiply the power by the liquid-heating time, then divide by sample mass and the rise in temperature on that segment.'),
      plotFigure({ caption: 'Heating curve passing through the melting stage', alt: `The curve starts at ${start} °C, reaches ${melt} °C at ${pre} s, stays level until ${pre + hold} s, then rises to ${end} °C at ${pre + hold + after} s.`, xLabel: 'time / s', yLabel: 'temperature / °C', xTicks: [0, pre, pre + hold, pre + hold + after], yTicks: [start, melt, end], traces: [{ points: [[0, start], [pre, melt], [pre + hold, melt], [pre + hold + after, end]] }] }),
    );
  }),
  drill('boiling-liquid', [[0.15, 200, 35, 850], [0.12, 180, 30, 720], [0.20, 300, 40, 900], [0.18, 250, 45, 800]], (mass, input, loss, latent) => {
    const power = input - loss;
    return scenario(
      `A ${mass} kg liquid is already at its boiling point. Its specific latent heat of vaporisation is ${latent} kJ kg⁻¹. A heater supplies ${input} W while ${loss} W is lost to the surroundings. The vapour escapes.`,
      calc('Find the net power available for vaporisation.', 'W', power, 'Subtract the constant heat loss from the heater power.'),
      calc('Find the mass evaporated per minute.', 'g min⁻¹', power * 60 / latent, 'Divide the net power by the latent heat in J/kg for kg/s, then convert to grams per minute.'),
      calc('Find the time needed to boil the liquid away.', 's', 1000 * mass * latent / power, 'The total energy for boiling is mL. Divide it by the net power.'),
    );
  }),
  drill('condensing-steam', [[0.012, 40, 0.30], [0.018, 45, 0.40], [0.010, 35, 0.22], [0.015, 50, 0.35]], (steam, final, water) => {
    const heat = steam * (2.26e6 + 4200 * (100 - final));
    return scenario(
      `In a calorimetry experiment, ${steam} kg of steam at 100 °C condenses in ${water} kg of cooler water. The resulting water from the steam cools to the final mixture temperature of ${final} °C. Use Lᵥ = 2.26 × 10⁶ J kg⁻¹ and c = 4200 J kg⁻¹ K⁻¹. Ignore heat losses and the container heat capacity.`,
      calc('Find the energy released by condensation alone.', 'kJ', steam * 2.26e6 / 1000, 'Multiply the steam mass by the latent heat of vaporisation. The energy is released on condensation.'),
      calc('Find the total energy transferred from the original steam to the cooler water.', 'kJ', heat / 1000, 'Add the latent energy released in condensation to the energy released while the condensate cools to the final temperature.'),
      calc('Find the initial temperature of the cooler water.', '°C', final - heat / (water * 4200), 'The energy lost by the steam equals the heat gained by the original cooler water. Calculate its temperature rise Q/(mc) and subtract this from the final temperature.'),
    );
  }),
  drill('freezing-volume', [[0.20, 1000, 920], [0.50, 780, 820], [0.35, 860, 900], [0.28, 1100, 1050]], (mass, liquid, solid) => {
    const start = 1e6 * mass / liquid;
    const end = 1e6 * mass / solid;
    return scenario(
      `A sealed flexible container holds ${mass} kg of a liquid with density ${liquid} kg m⁻³. It solidifies completely with no change in mass. The solid has density ${solid} kg m⁻³.`,
      calc('Find the volume in the liquid phase.', 'cm³', start, 'Divide the mass by the liquid density to find cubic metres. Multiply by 10⁶ to convert to cm³.'),
      calc('Find the solid volume.', 'cm³', end, 'Apply V = m/ρ again using the solid density and the same mass.'),
      calc('Find the signed percentage change in volume.', '%', 100 * (end - start) / start, 'Divide the final-minus-initial volume by the initial volume and multiply by 100. An expansion is positive.'),
    );
  }),
  drill('sublimation', [[0.12, 590, 2.2, 80], [0.15, 570, 2.0, 65], [0.08, 620, 2.4, 70], [0.18, 610, 2.1, 100]], (mass, latent, density, power) => scenario(
    `A ${mass} kg solid sublimes directly to a gas at fixed temperature and pressure. Its latent heat of sublimation is ${latent} kJ kg⁻¹. The released gas has density ${density} kg m⁻³ under these conditions. A constant net power of ${power} W reaches the solid.`,
    calc('Find the heat required to sublime the whole sample.', 'kJ', mass * latent, 'Multiply the solid mass by its specific latent heat of sublimation.'),
    calc('Find the gas volume after the whole sample has sublimed, assuming the stated conditions hold.', 'L', 1000 * mass / density, 'Divide the conserved mass by the gas density to obtain m³, then multiply by 1000 for litres.'),
    calc('Calculate the time for complete sublimation.', 's', 1000 * mass * latent / power, 'Convert the latent energy to joules and divide by the net power.'),
  )),
]);

export const thermalPractice = [
  ...temperature, ...gases, ...thermodynamics, ...oscillations, ...phases,
];
