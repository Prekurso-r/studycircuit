import { calc, drill, plotFigure, practice, scenario } from './physics-practice-tools.js';
import { beamFigure, loopFigure, pulleyFigure } from './physics-mechanics-figures.js';

const quantities = practice('units', [
  ['calibration', 'All readings from a balance are 0.03 g too high. What will averaging repeated readings do?', ['Leave the offset in the mean', 'Remove the offset', 'Double the offset', 'Make the mean exact'], 0, 'A zero offset is systematic. Subtract it from the mean or recalibrate the balance.'],
  ['specific-heat-unit', 'Which SI base units give the specific heat capacity in Q = mcΔT?', ['kg m² s⁻²', 'm² s⁻² K⁻¹', 'kg m² s⁻² K⁻¹', 'm s⁻¹ K⁻¹'], 1, 'Divide energy (kg m² s⁻²) by mass and temperature change.'],
], [
  drill('foil-stack', [[40, 2.40, 0.04, 25], [50, 3.75, 0.05, 40], [25, 1.20, 0.02, 60], [80, 5.60, 0.08, 30]], (sheets, mm, uncertainty, area) => scenario(
    `A stack of ${sheets} identical foil sheets has thickness (${mm} ± ${uncertainty}) mm. A sheet has area ${area} cm². Treat the area and sheet count as exact.`,
    calc('Find the thickness of one sheet.', 'mm', mm / sheets, 'Divide the stack thickness by the sheet count.'),
    calc('Find the percentage uncertainty in the thickness of one sheet.', '%', uncertainty / mm * 100, 'Both thickness and absolute uncertainty are divided by the same sheet count, leaving their ratio unchanged.'),
    calc('Find the volume of one sheet.', 'cm³', area * mm / (10 * sheets), 'Convert the thickness per sheet to centimetres and multiply by the area.'),
  ), 'measurement'),
  drill('pendulum-gradient', [[0.25, 4], [0.3, 5], [0.4, 3.8], [0.5, 4.4]], (step, gradient) => {
    const last = 3 * step;
    return scenario(
      'A student plots squared pendulum period T² against length L. For a small swing, T² = 4π²L/g. Use the best-fit line shown.',
      calc('Find the gradient of the line.', 's² m⁻¹', gradient, 'The gradient is the vertical rise divided by the horizontal run.'),
      calc('Use the gradient to calculate g.', 'm s⁻²', 4 * Math.PI ** 2 / gradient, 'The gradient is 4π²/g, so divide 4π² by the gradient.'),
      calc(`Predict T for a pendulum of length ${2 * step} m.`, 's', Math.sqrt(2 * step * gradient), 'Read T² at the given length and take its square root.'),
      plotFigure({ caption: 'Pendulum period squared against length', alt: `Straight line from the origin to T squared ${(last * gradient).toFixed(3)} seconds squared at length ${last.toFixed(2)} metres.`, xLabel: 'L / m', yLabel: 'T² / s²', xTicks: [0, step, 2 * step, last], yTicks: [0, step * gradient, 2 * step * gradient, last * gradient], traces: [{ points: [[0, 0], [last, last * gradient]] }] }),
    );
  }, 'measurement'),
  drill('cylinder-density', [[15, 20, 4, 0.1, 0.2], [25, 18, 7, 0.2, 0.1], [30, 15, 12, 0.1, 0.3], [12, 30, 3, 0.1, 0.2]], (d, length, mass, dd, dl) => {
    const volume = Math.PI * (d / 2) ** 2 * length;
    return scenario(
      `A cylinder has diameter (${d} ± ${dd}) mm, length (${length} ± ${dl}) mm and mass ${mass} g. Take the mass uncertainty as negligible and add fractional uncertainties for products.`,
      calc('Find its cross-sectional area.', 'mm²', Math.PI * (d / 2) ** 2, 'The radius is half the diameter and area equals πr².'),
      calc('Find its density in SI units.', 'kg m⁻³', mass * 1e6 / volume, 'Use πd²L/4 for the volume, convert mm³ to m³ and g to kg, then divide mass by volume.'),
      calc('Find the maximum percentage uncertainty in the density.', '%', 100 * (2 * dd / d + dl / length), 'Density varies as d⁻²L⁻¹, so add twice the fractional diameter uncertainty to the fractional length uncertainty.'),
    );
  }, 'measurement'),
  drill('meter-energy', [[2.4, 3, 26], [1.2, 0.5, 31], [4.5, 6, 24], [0.75, 2, 28]], (energy, hours, cost) => scenario(
    `An electricity meter records ${energy} kWh over ${hours} h. The energy price is ${cost} cents per kWh.`,
    calc('Convert the recorded energy to megajoules.', 'MJ', energy * 3.6, 'One kWh is 1000 J s⁻¹ × 3600 s = 3.6 MJ.'),
    calc('Find the mean power during the interval.', 'W', 1000 * energy / hours, 'Dividing kWh by hours gives kW. Multiply by 1000 to get watts.'),
    calc('Find the energy charge for the interval.', 'cents', energy * cost, 'Multiply the meter reading in kWh by the cost per kWh.'),
  )),
  drill('timing-readings', [[120, 5, 30], [160, 4, 40], [210, 3, 45], [240, 6, 50]], (mean, spread, cm) => scenario(
    `An object covers ${cm} cm at constant speed. Three independent timing readings are ${mean - spread}, ${mean} and ${mean + spread} ms. Use half the range as the absolute timing uncertainty.`,
    calc('Find the mean time in seconds.', 's', mean / 1000, 'Average the readings and divide by 1000 to convert milliseconds to seconds.'),
    calc('Find the percentage timing uncertainty.', '%', 100 * spread / mean, 'Divide half the range of readings by the mean, then multiply by 100.'),
    calc('Use the mean time to estimate the speed.', 'm s⁻¹', (cm / 100) / (mean / 1000), 'Convert centimetres to metres and milliseconds to seconds, then divide distance by time.'),
  ), 'measurement'),
]);

const kinematics = practice('2', [
  ['slope-area', 'What does the signed area under a velocity–time graph represent?', ['Change in speed', 'Displacement', 'Acceleration', 'Distance travelled in every case'], 1, 'Each area is velocity multiplied by time. Negative velocity contributes negative displacement.'],
  ['turning-point', 'At the highest point of a ball’s vertical flight, with drag negligible, which statement is correct?', ['The velocity and acceleration are both zero', 'The acceleration points upward', 'Its velocity is zero and its acceleration points downward', 'The acceleration is zero and velocity points upward'], 2, 'Gravity continues to accelerate the ball downward even at the instant its vertical velocity is zero.'],
], [
  drill('reversing-trolley', [[4, 2, 4], [6, 3, 6], [5, 2, 6], [8, 4, 4]], (speed, rise, fall) => scenario(
    'A trolley travels along a straight track. Use the signed velocity graph for its complete journey.',
    calc('Find its acceleration on the first segment.', 'm s⁻²', speed / rise, 'The initial acceleration is the slope of the first rising line.'),
    calc('Find the total distance travelled.', 'm', 0.5 * speed * (rise + fall), 'Add the absolute areas of the first triangle and both triangles on the descending line.'),
    calc('Find the average velocity over the complete journey.', 'm s⁻¹', 0.5 * speed * rise / (rise + fall), 'Positive and negative areas along the descending line cancel. Divide the first triangle’s area by the elapsed time.'),
    plotFigure({ caption: 'Signed velocity of the trolley', alt: `Velocity starts at zero, rises linearly to ${speed} m/s at ${rise} s, then falls linearly to minus ${speed} m/s at ${rise + fall} s.`, xLabel: 't / s', yLabel: 'v / m s⁻¹', xTicks: [0, rise, rise + fall / 2, rise + fall], yTicks: [-speed, 0, speed], traces: [{ points: [[0, 0], [rise, speed], [rise + fall, -speed]] }] }),
  )),
  drill('stopping-distance', [[20, 0.7, 5], [24, 0.75, 6], [18, 0.8, 4], [30, 0.6, 7.5]], (speed, reaction, deceleration) => scenario(
    `A driver initially moves at ${speed} m s⁻¹. The car continues at this speed for a reaction time of ${reaction} s, then brakes at a constant deceleration of ${deceleration} m s⁻² until it stops.`,
    calc('Find the distance covered during the reaction time.', 'm', speed * reaction, 'Speed is constant until the brakes act, so use speed × reaction time.'),
    calc('Find the complete stopping distance.', 'm', speed * reaction + speed ** 2 / (2 * deceleration), 'Add the reaction distance to v²/(2a), where a is the magnitude of the braking acceleration.'),
    calc('Find the complete stopping time.', 's', reaction + speed / deceleration, 'Add the reaction time to the time needed for braking, v/a.'),
  )),
  drill('horizontal-launch', [[20, 12], [45, 8], [80, 18], [5, 7]], (height, speed) => {
    const time = Math.sqrt(height / 5);
    return scenario(
      `A ball is projected horizontally at ${speed} m s⁻¹ from a ledge ${height} m above level ground. Take g = 10 m s⁻² and neglect air resistance.`,
      calc('Find the time until the ball reaches the ground.', 's', time, 'Vertical motion starts from rest. Use height = ½gt².'),
      calc('Find the horizontal range measured from the foot of the ledge.', 'm', speed * time, 'Vertical fall fixes the flight time. Multiply it by the constant horizontal speed.'),
      calc('Find the impact angle below the horizontal.', '°', Math.atan2(10 * time, speed) * 180 / Math.PI, 'The downward velocity at impact is gt. Take arctan of downward velocity divided by horizontal velocity.'),
    );
  }),
  drill('return-journey', [[120, 10, 40, 5], [150, 15, 75, 5], [160, 8, 100, 10], [84, 7, 36, 6]], (out, fast, back, slow) => {
    const time = out / fast + back / slow;
    return scenario(
      `A runner moves ${out} m east at ${fast} m s⁻¹ and immediately returns ${back} m west at ${slow} m s⁻¹.`,
      calc('Find the total time.', 's', time, 'Add the time for each leg, calculated separately as distance divided by speed.'),
      calc('Find the magnitude of the average velocity.', 'm s⁻¹', (out - back) / time, 'Divide the net eastward displacement by the total time.'),
      calc('Find the average speed.', 'm s⁻¹', (out + back) / time, 'Divide the sum of both distances by the total time.'),
    );
  }),
  drill('catch-up', [[4, 3, 2], [6, 2, 3], [5, 4, 2.5], [8, 3, 4]], (speed, delay, acceleration) => {
    const time = (speed + Math.sqrt(speed ** 2 + 2 * acceleration * speed * delay)) / acceleration;
    return scenario(
      `A cyclist passes a mark at ${speed} m s⁻¹ and maintains this speed. A second rider starts from rest at the mark ${delay} s later and accelerates at ${acceleration} m s⁻² along the same line.`,
      calc('Find the cyclist’s head start when the second rider moves off.', 'm', speed * delay, 'The cyclist travels at constant speed during the delay.'),
      calc('Find the catch-up time measured from when the second rider starts.', 's', time, 'Set the distance ½at² equal to v(t + delay). Use the positive root of the quadratic.'),
      calc('Find the second rider’s speed when they meet.', 'm s⁻¹', acceleration * time, 'Multiply acceleration by the catch-up time since the second rider started from rest.'),
    );
  }),
]);

const dynamics = practice('3', [
  ['reaction-pair', 'A rope pulls a crate forward. Which force pairs with the rope’s pull in Newton’s third law?', ['The weight of the crate', 'The crate’s pull on the rope', 'Friction on the crate', 'The normal force under the crate'], 1, 'The two forces in a third-law pair are the same interaction on different objects.'],
  ['impulse-graph', 'What does the area under a graph of resultant force against time represent?', ['Kinetic energy', 'Power', 'Impulse', 'Rate of change of momentum'], 2, 'Impulse is the time integral of resultant force and equals the change in momentum.'],
], [
  drill('pulley-cart', [[4, 2, 2], [3, 1, 1.5], [6, 3, 3], [5, 2, 6]], (cartMass, hangingMass, friction) => {
    const a = (10 * hangingMass - friction) / (cartMass + hangingMass);
    return scenario(
      'The cord and pulley shown are light, and the pulley is frictionless. The cart and suspended mass accelerate together. Take g = 10 m s⁻².',
      calc('Find the weight of the suspended mass.', 'N', 10 * hangingMass, 'Multiply the suspended mass by g.'),
      calc('Find the acceleration of the cart.', 'm s⁻²', a, 'For the system, the driving force is the hanging weight minus friction. Divide it by the total moving mass.'),
      calc('Find the tension in the cord.', 'N', cartMass * a + friction, 'For the cart alone, tension minus friction equals cart mass × acceleration.'),
      pulleyFigure({ cartMass, hangingMass, friction }),
    );
  }),
  drill('coupled-carts', [[2, 1, 5, 2], [3, 2, 4, 3], [1.5, 0.5, 6, 3], [4, 3, 5, 1]], (a, b, u, v) => {
    const momentum = a * u - b * v;
    const speed = momentum / (a + b);
    return scenario(
      `A ${a} kg cart moving right at ${u} m s⁻¹ meets a ${b} kg cart moving left at ${v} m s⁻¹. They stick together on a smooth track. Take right as positive.`,
      calc('Find the signed total momentum just before impact.', 'kg m s⁻¹', momentum, 'Add the momentum of the first cart and the negative momentum of the second.'),
      calc('Find the signed common velocity immediately after impact.', 'm s⁻¹', speed, 'Divide the conserved total momentum by the combined mass.'),
      calc('Calculate the kinetic energy dissipated.', 'J', 0.5 * (a * u ** 2 + b * v ** 2 - (a + b) * speed ** 2), 'Subtract the kinetic energy of the coupled carts from the sum of their separate kinetic energies before impact.'),
    );
  }),
  drill('frictional-ramp', [[2, 30, 3], [4, 25, 6], [5, 20, 4], [3, 40, 8]], (mass, angle, friction) => {
    const g = 9.81;
    const along = mass * g * Math.sin(angle * Math.PI / 180);
    return scenario(
      `A ${mass} kg block slides down a ramp inclined at ${angle}° to the horizontal. The friction force has magnitude ${friction} N. Use g = 9.81 m s⁻².`,
      calc('Find the component of weight parallel to the ramp.', 'N', along, 'Resolve weight along the plane using mg sin θ.'),
      calc('Find the normal force from the ramp.', 'N', mass * g * Math.cos(angle * Math.PI / 180), 'There is no acceleration normal to the plane, so normal force balances mg cos θ.'),
      calc('Find the acceleration down the ramp.', 'm s⁻²', (along - friction) / mass, 'Subtract uphill friction from the downhill weight component and divide by mass.'),
    );
  }),
  drill('bouncing-ball', [[0.5, 6, 4, 20], [0.2, 9, 5, 15], [0.35, 8, 6, 25], [0.6, 5, 3, 40]], (mass, approach, rebound, time) => {
    const impulse = mass * (approach + rebound);
    return scenario(
      `A ${mass} kg ball hits the floor vertically at ${approach} m s⁻¹ and rebounds at ${rebound} m s⁻¹. Contact lasts ${time} ms. Take upward as positive and g = 10 m s⁻².`,
      calc('Find the signed momentum immediately after the rebound.', 'kg m s⁻¹', mass * rebound, 'Multiply mass by the upward velocity.'),
      calc('Find the net impulse on the ball during contact.', 'N s', impulse, 'Subtract the initial downward momentum from the final upward momentum.'),
      calc('Find the mean upward contact force from the floor.', 'N', impulse / (time / 1000) + 10 * mass, 'Divide impulse by contact time in seconds for the net upward force, then add weight to get the floor force.'),
    );
  }),
  drill('lift-scales', [[60, 1.5, 2], [75, 0.8, 1.6], [50, 2, 1.2], [80, 1, 2.5]], (mass, first, second) => scenario(
    `A passenger of mass ${mass} kg stands on a scale in a rising lift. The lift first accelerates upward at ${first} m s⁻², then slows with downward acceleration of magnitude ${second} m s⁻². Use g = 10 m s⁻².`,
    calc('Find the passenger’s weight.', 'N', 10 * mass, 'Weight depends on mass and g, regardless of lift movement.'),
    calc('Find the scale reading during upward acceleration.', 'N', mass * (10 + first), 'The upward normal force must exceed weight by ma.'),
    calc('Find the reduction in reading from the first stage to the slowing stage.', 'N', mass * (first + second), 'The readings are m(g + first acceleration) and m(g − slowing acceleration). Subtract the second from the first.'),
  )),
]);

const forces = practice('4', [
  ['equilibrium', 'A rigid body is stationary under several nonparallel forces. What must be true?', ['The resultant force is zero', 'Only the total clockwise moment is zero', 'All forces have identical magnitudes', 'All forces pass through its centre of mass'], 0, 'Static equilibrium requires zero resultant force and zero resultant moment about any point.'],
  ['floating-change', 'A floating block is placed in a liquid that is denser than water. What happens to the volume submerged?', ['It increases', 'It decreases', 'It remains the same', 'It must equal the whole block'], 1, 'The block still displaces its own weight of liquid. A denser liquid supplies that buoyant force with less displaced volume.'],
], [
  drill('hinged-beam', [[4, 3, 40, 60, 30], [6, 4, 80, 90, 45], [5, 3.5, 70, 50, 40], [3, 2, 36, 54, 35]], (span, loadPosition, beamWeight, loadWeight, angle) => {
    const moment = beamWeight * span / 2 + loadWeight * loadPosition;
    const vertical = moment / span;
    const radians = angle * Math.PI / 180;
    const tension = vertical / Math.sin(radians);
    return scenario(
      'The uniform beam in the diagram is horizontal and in equilibrium. The pin at the wall can exert a force in any direction.',
      calc('Find the total clockwise moment of the two weights about the pin.', 'N m', moment, 'Multiply each weight by its horizontal moment arm and add the products. The beam’s own weight acts at midspan.'),
      calc('Calculate the tension in the supporting cable.', 'N', tension, 'Balance moments about the pin. Only the vertical component T sin θ contributes to the cable moment.'),
      calc('Calculate the magnitude of the force exerted by the pin on the beam.', 'N', Math.hypot(tension * Math.cos(radians), beamWeight + loadWeight - vertical), 'The pin balances the horizontal cable component. Its vertical component makes up the difference between the total downward weight and the upward cable component. Combine the components in quadrature.'),
      beamFigure({ span, loadPosition, beamWeight, loadWeight, angle }),
    );
  }, 'forces'),
  drill('floating-block', [[0.30, 500], [0.45, 600], [0.56, 800], [0.25, 400]], (mass, cm3) => scenario(
    `A block of mass ${mass} kg and volume ${cm3} cm³ floats in fresh water of density 1000 kg m⁻³. A small dense load can be placed on top without displacing water itself.`,
    calc('Calculate the density of the block.', 'kg m⁻³', mass / (cm3 * 1e-6), 'Convert cubic centimetres to cubic metres and divide the mass by the volume.'),
    calc('Find the percentage of the block volume initially submerged.', '%', 100 * mass / (cm3 * 1e-3), 'The volume fraction submerged equals the ratio of block density to water density.'),
    calc('Find the maximum load mass before the top of the block sinks below the surface.', 'kg', cm3 * 1e-3 - mass, 'At the limit the block displaces its whole volume. Subtract its own mass from the maximum displaced water mass.'),
  )),
  drill('layered-liquids', [[0.4, 0.8, 850, 0.02], [0.6, 0.5, 780, 0.03], [0.3, 1.2, 900, 0.025], [0.5, 0.9, 820, 0.04]], (oil, water, density, area) => {
    const gauge = 10 * (oil * density + 1000 * water);
    return scenario(
      `An open vessel contains ${oil} m of oil of density ${density} kg m⁻³ above ${water} m of water of density 1000 kg m⁻³. Take g = 10 m s⁻² and atmospheric pressure as 100 kPa. A horizontal plug of area ${area} m² covers a hole at the bottom, with air outside.`,
      calc('Find the pressure increase across the oil layer alone.', 'Pa', density * 10 * oil, 'The pressure gain in one layer is ρgh using that layer’s density and depth.'),
      calc('Find the absolute pressure immediately inside the bottom plug.', 'kPa', 100 + gauge / 1000, 'Add atmospheric pressure to the hydrostatic contributions of both liquids.'),
      calc('Find the magnitude of the net pressure force on the plug.', 'N', gauge * area, 'Outside air pressure cancels the atmospheric part of the liquid pressure. Multiply the remaining pressure difference by the plug area.'),
    );
  }),
  drill('hydraulic-lift', [[4, 80, 60, 12], [5, 90, 75, 18], [3, 60, 48, 20], [8, 100, 120, 25]], (small, large, force, cm) => scenario(
    `An ideal hydraulic lift has piston areas ${small} cm² and ${large} cm². The smaller piston moves down ${cm} cm under a force of ${force} N. Ignore height-related pressure differences and friction.`,
    calc('Find the pressure increase transmitted by the liquid.', 'kPa', force / (small * 1e-4) / 1000, 'Pressure is the input force divided by the small piston area in m².'),
    calc('Find the upward force on the larger piston.', 'N', force * large / small, 'The pressure is transmitted to the large piston. It produces a force scaled by the area ratio.'),
    calc('Find the upward travel of the larger piston.', 'cm', small * cm / large, 'Conservation of liquid volume requires the two piston areas times their respective displacements to be equal.'),
  )),
  drill('angled-couple', [[0.2, 15, 60, 90], [0.3, 20, 45, 60], [0.15, 18, 30, 120], [0.25, 12, 70, 45]], (radius, force, angle, turn) => {
    const torque = 2 * radius * force * Math.sin(angle * Math.PI / 180);
    return scenario(
      `Two equal, opposite ${force} N forces act at diametrically opposite points of a wheel of radius ${radius} m. Each line of action makes ${angle}° with its local radius line. They maintain their orientation relative to the wheel through a ${turn}° turn in the direction of the couple.`,
      calc('Find the magnitude of the moment about the wheel centre due to one force.', 'N m', torque / 2, 'The perpendicular component of the force is F sin θ, acting at radius r.'),
      calc('Find the torque of the couple.', 'N m', torque, 'Add the two equal moments because both turn the wheel in the same direction.'),
      calc('Calculate the work done by the couple during the turn.', 'J', torque * turn * Math.PI / 180, 'For a constant torque, the work done is torque × angular displacement in radians.'),
    );
  }, 'forces'),
]);

const work = practice('5', [
  ['negative-work', 'A hand provides an upward force while slowly lowering a book. What is the sign of the work done by the hand on the book?', ['Negative', 'Positive', 'Zero always', 'It depends on the book mass'], 0, 'The displacement is downward and the hand force is upward, so their scalar product is negative.'],
  ['power-slope', 'Which slope represents instantaneous power?', ['Momentum against time', 'Work done against time', 'Force against position', 'Energy against position'], 1, 'Power measures the rate of energy transfer or the rate at which work is done.'],
], [
  drill('variable-force', [[3, 2, 12, 2, 4], [2, 4, 10, 3, 5], [4, 2, 16, 4, 6], [2, 6, 14, 5, 7]], (ramp, plateau, force, friction, mass) => {
    const distance = ramp + plateau;
    const work = force * (ramp / 2 + plateau);
    return scenario(
      `A horizontal force moves a ${mass} kg crate from rest. A steady ${friction} N friction force opposes its motion. The graph shows the applied force as a function of displacement.`,
      calc('Find the work done by the applied force.', 'J', work, 'Add the triangular and rectangular areas under the applied force graph.'),
      calc('Find the net work done on the crate.', 'J', work - friction * distance, 'Subtract the work dissipated by friction, which is friction × total distance.'),
      calc('Find the speed at the final point of the graph.', 'm s⁻¹', Math.sqrt(2 * (work - friction * distance) / mass), 'The net work increases the crate’s kinetic energy from zero, so v = √(2Wnet/m).'),
      plotFigure({ caption: 'Applied force on the moving crate', alt: `Force rises linearly from zero to ${force} N over ${ramp} m and stays at ${force} N until ${distance} m.`, xLabel: 'displacement / m', yLabel: 'applied force / N', xTicks: [0, ramp, distance], yTicks: [0, force / 2, force], traces: [{ points: [[0, 0], [ramp, force], [distance, force]] }] }),
    );
  }),
  drill('pump-power', [[4, 8, 5, 600], [6, 10, 4, 900], [3, 12, 6, 700], [5, 9, 3, 800]], (rate, height, speed, input) => {
    const output = rate * (10 * height + 0.5 * speed ** 2);
    return scenario(
      `A pump receives ${input} W. It raises ${rate} kg of water per second by ${height} m. The inlet speed is negligible and the outlet speed is ${speed} m s⁻¹. Take g = 10 m s⁻².`,
      calc('Find the gravitational energy gained by each kilogram of water.', 'J', 10 * height, 'For one kilogram, the gravitational energy gain is gh.'),
      calc('Find the total useful output power delivered to the water.', 'W', output, 'Multiply the mass flow rate by the sum of the gravitational and kinetic energy gains per kilogram.'),
      calc('Find the pump efficiency as a percentage.', '%', 100 * output / input, 'Divide useful power by input power and multiply by 100.'),
    );
  }),
  drill('regenerative-braking', [[600, 20, 8, 60, 6], [750, 18, 6, 55, 5], [1000, 16, 10, 70, 4], [900, 22, 12, 64, 8]], (mass, start, end, efficiency, time) => {
    const loss = 0.5 * mass * (start ** 2 - end ** 2);
    return scenario(
      `A ${mass} kg electric vehicle slows from ${start} to ${end} m s⁻¹ in ${time} s. Its regenerative system transfers ${efficiency}% of the lost kinetic energy to its battery.`,
      calc('Find the vehicle’s initial kinetic energy.', 'kJ', 0.5 * mass * start ** 2 / 1000, 'Use ½mv² and divide by 1000 to convert joules to kilojoules.'),
      calc('Find the energy delivered to the battery.', 'kJ', loss * efficiency / 100 / 1000, 'Subtract the final kinetic energy from the initial kinetic energy. Apply the percentage recovered.'),
      calc('Find the mean charging power during braking.', 'kW', loss * efficiency / 100 / (1000 * time), 'Divide the energy recovered in kilojoules by the braking time in seconds.'),
    );
  }),
  drill('powered-ascent', [[12, 10, 3, 9, 54], [8, 12, 4, 6, 43], [15, 10, 2, 8, 45], [10, 8, 3, 7, 55]], (mass, distance, height, drag, pull) => {
    const rise = mass * 10 * height;
    const loss = drag * distance;
    return scenario(
      `A ${mass} kg trolley is pulled from rest up a ramp by a constant ${pull} N force parallel to the ramp. It travels ${distance} m and climbs ${height} m vertically. Friction is ${drag} N. Take g = 10 m s⁻².`,
      calc('Find the gain in gravitational potential energy.', 'J', rise, 'Use mgh with the vertical rise.'),
      calc('Find the energy transferred to the surroundings by friction.', 'J', loss, 'Multiply friction by distance travelled along the ramp.'),
      calc('Find the trolley’s final speed.', 'm s⁻¹', Math.sqrt(2 * (pull * distance - rise - loss) / mass), 'Subtract the gravitational energy gain and frictional loss from the work done by the pull. The remainder is kinetic energy.'),
    );
  }),
  drill('hoist-power', [[100, 2, 0.8, 70], [80, 1.5, 1.2, 75], [120, 1.2, 0.5, 80], [50, 3, 1.5, 65]], (mass, speed, acceleration, efficiency) => {
    const tension = mass * (10 + acceleration);
    return scenario(
      `At one instant a motor hoists a ${mass} kg load vertically at ${speed} m s⁻¹ while accelerating it upward at ${acceleration} m s⁻². The motor’s efficiency at that instant is ${efficiency}%. Take g = 10 m s⁻².`,
      calc('Find the tension in the cable.', 'N', tension, 'Tension must exceed weight by ma.'),
      calc('Find the useful mechanical power delivered to the moving load.', 'W', tension * speed, 'Multiply the force on the load by its speed in the direction of that force.'),
      calc('Find the electrical input power.', 'W', tension * speed * 100 / efficiency, 'Divide the mechanical output power by the fractional efficiency.'),
    );
  }),
]);

const solids = practice('6', [
  ['gradient-modulus', 'Which graph has a gradient equal to the Young modulus in the linear region?', ['Force against extension', 'Stress against strain', 'Strain against stress', 'Extension against time'], 1, 'Young modulus is tensile stress divided by tensile strain in the proportional region.'],
  ['yielding', 'A wire has a permanent extension after the force is removed. What can be concluded?', ['Its elastic limit was exceeded', 'Its stress never increased', 'No work was done', 'Its Young modulus was zero'], 0, 'Permanent extension means the wire deformed plastically.'],
], [
  drill('loading-cycle', [[8, 4, 1], [12, 6, 2], [10, 5, 1], [15, 8, 2]], (f, x, residual) => scenario(
    'A sample is taken from zero force up the solid loading line and back down the dashed unloading line. The two straight paths meet at the maximum force.',
    calc('Find the work done in loading the sample.', 'mJ', f * x / 2, 'Find the triangular area under the loading line. A newton-millimetre equals a millijoule.'),
    calc('Find the energy returned on unloading.', 'mJ', f * (x - residual) / 2, 'The unloading triangle spans from the residual extension to the maximum extension.'),
    calc('Find the energy dissipated during the loading cycle.', 'mJ', f * residual / 2, 'Subtract the unloading area from the loading area.'),
    plotFigure({ caption: 'Force versus extension during loading and unloading', alt: `Loading rises from zero to ${f} newtons at ${x} millimetres. Unloading goes directly back to zero force at ${residual} millimetres.`, xLabel: 'extension / mm', yLabel: 'force / N', xTicks: [0, residual, x], yTicks: [0, f / 2, f], traces: [{ points: [[0, 0], [x, f]] }, { points: [[residual, 0], [x, f]] }] }),
  )),
  drill('wire-test', [[15, 0.4, 2, 1], [24, 0.6, 1.8, 0.9], [16, 0.5, 1.5, 1.2], [36, 0.8, 2.4, 1.6]], (force, mm, length, extension) => {
    const stress = force / (Math.PI * (mm / 2) ** 2);
    const strain = extension / (1000 * length);
    return scenario(
      `A cylindrical wire of diameter ${mm} mm and unstretched length ${length} m extends by ${extension} mm when a ${force} N load acts. The extension is in the linear elastic region.`,
      calc('Find the tensile strain.', '', strain, 'Convert extension to metres and divide by original length.'),
      calc('Calculate the tensile stress.', 'MPa', stress, 'Divide force by the circular cross-sectional area. A newton per square millimetre is a megapascal.'),
      calc('Calculate the Young modulus.', 'GPa', stress / strain / 1000, 'Divide stress by strain and divide the result in megapascals by 1000 to get gigapascals.'),
    );
  }),
  drill('parallel-springs', [[160, 240, 16], [100, 300, 20], [180, 270, 27], [120, 200, 24]], (a, b, force) => {
    const x = force / (a + b);
    return scenario(
      `Two light springs of constants ${a} and ${b} N m⁻¹ are mounted side by side. A rigid plate gives them the same extension. A total force of ${force} N is applied in the Hooke’s-law range.`,
      calc('Find the effective spring constant.', 'N m⁻¹', a + b, 'Parallel springs give the same extension and their forces add, so their constants add.'),
      calc('Find the extension of the plate.', 'mm', 1000 * x, 'Divide the total force by the combined spring constant and convert to millimetres.'),
      calc('Find the strain energy stored in the stiffer spring.', 'J', 0.5 * b * x ** 2, 'Use ½kx² for the second spring with its own spring constant and the shared extension.'),
    );
  }),
  drill('series-sections', [[0.8, 1.2, 50, 1, 200, 100], [1, 0.5, 30, 0.5, 180, 120], [1.2, 1.5, 40, 0.8, 200, 80], [0.5, 0.9, 60, 1.2, 150, 100]], (a, b, force, area, eA, eB) => {
    const stress = force / area;
    const extension = stress * (a / eA + b / eB);
    return scenario(
      `Two wire sections of lengths ${a} and ${b} m are joined end to end. Both have cross-sectional area ${area} mm². Their Young moduli are ${eA} and ${eB} GPa respectively. A ${force} N tensile force stretches them in their linear ranges.`,
      calc('Find the tensile stress in each section.', 'MPa', stress, 'The same tension acts through each section. Divide force by cross-sectional area in mm² for MPa.'),
      calc('Find the total extension.', 'mm', extension, 'For each section, strain is stress divided by its Young modulus. Multiply each strain by its length and add the extensions, keeping units consistent.'),
      calc('Find the total elastic energy stored.', 'mJ', 0.5 * force * extension, 'Use half the final force multiplied by the total extension for this linear system. N mm is mJ.'),
    );
  }),
  drill('energy-density', [[70, 35, 8], [100, 120, 12], [180, 90, 16], [200, 140, 10]], (modulus, mp, cm3) => {
    const strain = mp / (1000 * modulus);
    const density = 0.5 * mp * 1e6 * strain;
    return scenario(
      `A specimen of volume ${cm3} cm³ and Young modulus ${modulus} GPa is under a uniform tensile stress of ${mp} MPa in its linear region.`,
      calc('Find the tensile strain.', '', strain, 'Convert stress and modulus to consistent units and divide stress by modulus.'),
      calc('Find the elastic energy per unit volume.', 'J m⁻³', density, 'Energy density is the area under the stress–strain graph. For a straight line from the origin, use half the product of stress in Pa and strain.'),
      calc('Find the elastic energy stored in the specimen.', 'J', density * cm3 * 1e-6, 'Multiply energy density by the volume in cubic metres.'),
    );
  }),
]);

const circular = practice('12', [
  ['centripetal-work', 'Why does a purely centripetal force do no work on a body moving in a circle?', ['It has no component along the instantaneous motion', 'It is zero at every point', 'It always cancels gravity', 'It is constant in direction'], 0, 'The line to the centre is perpendicular to the instantaneous tangential displacement.'],
  ['sharp-turn', 'A car takes a bend at constant speed. Which change doubles the required inward force?', ['Halve its speed', 'Double the radius', 'Halve the radius', 'Double the speed'], 2, 'At fixed speed, mv²/r doubles when the radius halves. Doubling speed would quadruple the force.'],
], [
  drill('vertical-track', [[1.5, 0.5, 5], [2, 0.8, 6], [3, 1.2, 7], [1, 0.4, 4]], (radius, mass, topSpeed) => {
    const bottomSpeedSquared = topSpeed ** 2 + 40 * radius;
    return scenario(
      'A bead moves on the inside of a smooth vertical loop. Use the mass, radius and top speed shown. Take g = 10 m s⁻².',
      calc('Find the minimum speed at the top for the bead to maintain contact.', 'm s⁻¹', Math.sqrt(10 * radius), 'At the minimum, weight alone provides mv²/r. Set v²/r = g.'),
      calc('Find the normal force at the top at the speed shown.', 'N', mass * (topSpeed ** 2 / radius - 10), 'At the top, both weight and the normal force point towards the centre. Subtract weight from the required centripetal force.'),
      calc('Find the normal force at the bottom.', 'N', mass * (bottomSpeedSquared / radius + 10), 'The descent of 2r gives v² = vtop² + 4gr. At the bottom, upward normal force minus weight must provide the inward force.'),
      loopFigure({ radius, mass, topSpeed }),
    );
  }),
  drill('turntable', [[0.24, 120, 0.18, 0.50], [0.18, 90, 0.25, 0.45], [0.32, 80, 0.20, 0.6], [0.21, 150, 0.30, 0.55]], (radius, rpm, mass, coefficient) => {
    const angular = rpm / 60 * 2 * Math.PI;
    return scenario(
      `A ${mass} kg object is placed ${radius} m from the centre of a horizontal turntable rotating at ${rpm} revolutions per minute. The coefficient of static friction is ${coefficient}. Take g = 10 m s⁻² and assume the turntable is at constant angular speed.`,
      calc('Convert the rotation rate to angular speed.', 'rad s⁻¹', angular, 'Divide revolutions per minute by 60 and multiply by 2π radians per revolution.'),
      calc('Find the friction required for the object to rotate with the turntable.', 'N', mass * radius * angular ** 2, 'The inward acceleration is rω². Static friction must provide ma if there is no slipping.'),
      calc('Find the greatest radius where the object could co-rotate without slipping at this rate.', 'm', coefficient * 10 / angular ** 2, 'The largest static friction is μmg. At the limiting radius this equals mrω².'),
    );
  }),
  drill('banked-turn', [[60, 12, 900], [80, 15, 1000], [100, 18, 1200], [45, 10, 800]], (radius, speed, mass) => {
    const a = speed ** 2 / radius;
    return scenario(
      `A ${mass} kg car travels at ${speed} m s⁻¹ on a banked curve of radius ${radius} m. The banking is chosen so no sideways friction is required at that speed. Take g = 10 m s⁻².`,
      calc('Find its centripetal acceleration.', 'm s⁻²', a, 'Divide the speed squared by the horizontal radius.'),
      calc('Find the angle of banking to the horizontal.', '°', Math.atan(a / 10) * 180 / Math.PI, 'The normal force components supply vertical balance and inward acceleration, so tan θ = a/g.'),
      calc('Find the normal force on the car.', 'N', mass * Math.hypot(10, a), 'Combine the normal force components, mg vertically and ma horizontally.'),
    );
  }),
  drill('conical-pendulum', [[0.8, 25, 0.24], [1.2, 35, 0.36], [1, 40, 0.3], [0.6, 30, 0.18]], (length, angle, mass) => {
    const rad = angle * Math.PI / 180;
    const radius = length * Math.sin(rad);
    return scenario(
      `A ${mass} kg mass on a light ${length} m string travels in a horizontal circle. The string makes a constant ${angle}° angle to the vertical. Take g = 10 m s⁻².`,
      calc('Find the radius of the circle.', 'm', radius, 'The radius is the horizontal component of the string length, L sin θ.'),
      calc('Find the tension in the string.', 'N', mass * 10 / Math.cos(rad), 'The vertical component of tension must balance weight.'),
      calc('Find the time for one revolution.', 's', 2 * Math.PI * Math.sqrt(length * Math.cos(rad) / 10), 'The tension’s horizontal component gives a = g tan θ = rω². With r = L sin θ, use T = 2π/ω.'),
    );
  }),
  drill('rotating-tool', [[0.10, 6, 0.04], [0.18, 12, 0.03], [0.12, 9, 0.05], [0.22, 16, 0.025]], (radius, f, mass) => {
    const speed = 2 * Math.PI * f * radius;
    return scenario(
      `A point of mass ${mass} kg rotates with a balanced tool at radius ${radius} m and rotation frequency ${f} Hz. Consider only its radial acceleration.`,
      calc('Find the period of rotation.', 's', 1 / f, 'The period is one divided by the rotation frequency.'),
      calc('Find the tangential speed of the point.', 'm s⁻¹', speed, 'The point travels one circumference, 2πr, per revolution.'),
      calc('Find the inward resultant force required at this point.', 'N', mass * speed ** 2 / radius, 'Use the tangential speed in F = mv²/r.'),
    );
  }),
]);

const gravity = practice('13', [
  ['weightless-orbit', 'Why does an astronaut in a circular orbit appear weightless?', ['Gravity is zero at all orbital heights', 'The astronaut and spacecraft fall together under gravity', 'The astronaut’s mass is zero', 'There is no acceleration'], 1, 'Gravity supplies the orbital acceleration of both. As they fall together the astronaut need not press against a supporting surface.'],
  ['potential-infinity', 'What happens to gravitational potential as you move outward from an isolated planet toward infinity?', ['It becomes more negative', 'It remains constant', 'It increases toward zero from below', 'It increases from zero to a positive infinity'], 2, 'With zero potential at infinity, the potential near a planet is −GM/r.'],
], [
  drill('field-graph', [[12, 5], [16, 4], [8, 6], [20, 3]], (surface, radiusMillions) => {
    const plotted = Array.from({ length: 25 }, (_, index) => {
      const ratio = 1 + index / 8;
      return [ratio, surface / ratio ** 2];
    });
    return scenario(
      `A spherical planet has radius ${radiusMillions} × 10⁶ m. Outside the planet, field strength falls as the inverse square of the distance from the centre. Use the graph to read the surface field strength.`,
      calc('Find the field strength at twice the planet’s radius from its centre.', 'N kg⁻¹', surface / 4, 'At twice the distance the field is one quarter as strong, consistent with the plotted curve.'),
      calc('Find the acceleration of a probe at radius 3R.', 'm s⁻²', surface / 9, 'Gravitational acceleration equals field strength in magnitude, and the field at 3R is one ninth of the surface value.'),
      calc('Find the circular orbital speed at radius 2R.', 'm s⁻¹', Math.sqrt(surface / 4 * 2 * radiusMillions * 1e6), 'Use v²/r = g at the orbit, with r equal to twice the planet’s radius.'),
      plotFigure({ caption: 'Gravitational field outside the planet', alt: `At radius R the field strength is ${surface} N/kg. It decreases smoothly according to the inverse-square law to one sixteenth of the surface value at radius 4R.`, xLabel: 'r / R', yLabel: 'g / N kg⁻¹', xTicks: [1, 2, 3, 4], yTicks: [0, surface / 4, surface / 2, surface], traces: [{ points: plotted, markers: false }] }),
    );
  }),
  drill('planet-orbit', [[4.0, 7.0, 600], [3.2, 6.0, 450], [4.8, 8.5, 800], [2.5, 5.0, 350]], (gm, radius, mass) => {
    const r = radius * 1e6;
    const GM = gm * 1e14;
    const v = Math.sqrt(GM / r);
    return scenario(
      `A satellite of mass ${mass} kg is in a circular orbit of radius ${radius} × 10⁶ m around a planet with GM = ${gm} × 10¹⁴ m³ s⁻².`,
      calc('Find the gravitational field strength at the satellite.', 'N kg⁻¹', GM / r ** 2, 'Use the inverse-square law, g = GM/r².'),
      calc('Find its orbital period.', 'min', 2 * Math.PI * r / (60 * v), 'Use v = √(GM/r), then divide the circumference by v and convert seconds to minutes.'),
      calc('Find the satellite’s gravitational potential energy, taking zero at infinity.', 'MJ', -GM * mass / r / 1e6, 'Multiply the gravitational potential −GM/r by the satellite mass and convert joules to megajoules.'),
    );
  }),
  drill('escape-energy', [[6, 1.0, 200], [5, 0.8, 150], [7, 1.2, 300], [4, 0.55, 100]], (radius, gravity, mass) => {
    const r = radius * 1e6;
    return scenario(
      `A moon has radius ${r / 1000} km and surface gravity ${gravity} m s⁻². A probe of mass ${mass} kg starts at the surface. Ignore rotation, an atmosphere and other bodies.`,
      calc('Find the gravitational force on the stationary probe.', 'N', mass * gravity, 'Multiply mass by the local gravitational field strength.'),
      calc('Find the minimum kinetic energy at the surface for escape.', 'MJ', mass * gravity * r / 1e6, 'For marginal escape the total initial energy is zero. The surface potential energy is −GMm/R = −mgR.'),
      calc('Find the corresponding escape speed.', 'km s⁻¹', Math.sqrt(2 * gravity * r) / 1000, 'Set the initial kinetic energy ½mv² equal to mgR and convert the resulting speed to km/s.'),
    );
  }),
  drill('orbital-change', [[2, 4, 3], [3, 9, 2], [4, 16, 5], [5, 20, 6]], (initial, final, period) => {
    const ratio = final / initial;
    return scenario(
      `A small satellite moves from a circular orbit of radius ${initial}R to one of radius ${final}R around the same planet. Its original period was ${period} h.`,
      calc('Find the new field strength as a fraction of the original strength.', '', ratio ** -2, 'The field strength varies inversely with radius squared.'),
      calc('Find the new orbital speed as a fraction of the original speed.', '', ratio ** -0.5, 'Circular orbital speed varies as 1/√r.'),
      calc('Find the new orbital period.', 'h', period * ratio ** 1.5, 'Because circumference varies as r and speed as r⁻¹ᐟ², period scales as r³ᐟ².'),
    );
  }),
  drill('two-moons', [[4, 20, 1.2], [9, 30, 0.8], [16, 40, 1.4], [25, 54, 0.6]], (ratio, separation, smallG) => {
    const d = separation / (1 + Math.sqrt(ratio));
    return scenario(
      `Two spherical moons have centres separated by ${separation} × 10⁶ m. The larger moon has ${ratio} times the mass of the smaller one. At their midpoint the smaller moon alone produces a field of ${smallG} N kg⁻¹. Ignore other bodies.`,
      calc('Find the larger moon’s field strength at the midpoint.', 'N kg⁻¹', ratio * smallG, 'Both centres are equally far away, so the ratio of the fields is the mass ratio.'),
      calc('Find the magnitude of the net field at the midpoint.', 'N kg⁻¹', (ratio - 1) * smallG, 'The fields point toward opposite moons. Subtract the smaller field from the larger one.'),
      calc('Find the distance from the smaller moon’s centre to the zero-field point between them.', 'million m', d, 'Equal field magnitudes require the distances to be in the ratio of the square roots of the masses. Divide the separation by one plus the square root of the mass ratio.'),
    );
  }),
]);

export const mechanicsPractice = [
  ...quantities, ...kinematics, ...dynamics, ...forces, ...work, ...solids, ...circular, ...gravity,
];
