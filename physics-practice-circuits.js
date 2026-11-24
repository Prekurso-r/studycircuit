import { calc, drill, plotFigure, practice, scenario } from './physics-practice-tools.js';
import { capacitorFigure, dividerFigure, sensorFigure, transformerFigure } from './physics-circuit-figures.js';

const electricity = practice('9', [
  ['metal-current', 'Which way do conduction electrons drift in a metal wire, relative to conventional current?', ['Same direction', 'Opposite direction', 'At right angles', 'They have no net drift'], 1, 'Electrons have negative charge, so their drift direction is opposite the conventional-current direction.'],
  ['resistivity', 'Two wires have the same length and resistance. Wire A has twice the cross-sectional area of wire B. What follows?', ['A has twice the resistivity', 'A has half the resistivity', 'Their resistivities are equal', 'Their resistivities cannot be compared'], 0, 'From R = ρL/A, at fixed R and L the required resistivity is proportional to area.'],
], [
  drill('current-pulse', [[4, 3, 6, 24], [6, 2, 4, 18], [3, 4, 8, 12], [5, 2, 5, 15]], (peak, rise, fall, volts) => {
    const duration = rise + fall;
    const charge = peak * duration / 2;
    return scenario(
      `A pulsed load maintains potential difference ${volts} V during the time shown. Its current first rises linearly then falls linearly back to zero.`,
      calc('Find the rate of increase of current before the peak.', 'A s⁻¹', peak / rise, 'Divide the peak current by the time taken to reach it.'),
      calc('Find the total charge that passes through the load.', 'C', charge, 'Charge equals the area under the current–time graph, here a triangle.'),
      calc('Calculate the energy transferred to the load during the pulse.', 'J', volts * charge, 'At constant potential difference, energy is potential difference multiplied by total charge.'),
      plotFigure({ caption: 'Current through the pulsed load', alt: `The current starts at zero, reaches ${peak} A at ${rise} s, then returns to zero at ${duration} s. The segments are straight.`, xLabel: 'time / s', yLabel: 'current / A', xTicks: [0, rise, duration], yTicks: [0, peak / 2, peak], traces: [{ points: [[0, 0], [rise, peak], [duration, 0]] }] }),
    );
  }),
  drill('wire-drift', [[2, 8, 3, 0.6], [3.5, 6, 2, 0.45], [1.2, 8.5, 0.8, 0.8], [5, 7.5, 1.5, 1.2]], (current, density, area, length) => {
    const drift = current / (density * 1e28 * area * 1e-6 * 1.6e-19);
    return scenario(
      `A ${length} m conducting wire carries ${current} A. Its cross-sectional area is ${area} mm² and it has ${density} × 10²⁸ mobile electrons per cubic metre. Take the elementary charge as 1.60 × 10⁻¹⁹ C.`,
      calc('Find the charge that passes a cross-section in 5.0 s.', 'C', current * 5, 'Multiply the current by the elapsed time.'),
      calc('Find the mean electron drift speed.', 'mm s⁻¹', drift * 1000, 'Rearrange I = nAev for v, using the area in square metres. Convert the result to mm/s.'),
      calc('Find how long an electron drifting at that speed would take to cover the wire length.', 's', length / drift, 'Divide the length in metres by the drift speed in metres per second.'),
    );
  }),
  drill('stretch-resistance', [[8, 1.5, 12], [6, 2, 10], [10, 1.25, 8], [12, 1.2, 16]], (resistance, factor, voltage) => {
    const stretched = resistance * factor ** 2;
    return scenario(
      `A wire’s resistance is initially ${resistance} Ω. It stretches uniformly until its length is ${factor} times its original length. Its volume and resistivity stay constant. The same ${voltage} V is applied before and after stretching.`,
      calc('Find the initial current.', 'A', voltage / resistance, 'Use I = V/R with the original resistance.'),
      calc('Find the resistance after stretching.', 'Ω', stretched, 'Area decreases by the same factor that length increases, so L/A grows by the square of the stretch factor.'),
      calc('Find the electrical power after stretching.', 'W', voltage ** 2 / stretched, 'The potential difference is unchanged. Use P = V²/R with the new resistance.'),
    );
  }),
  drill('heater-energy', [[12, 4, 80, 75], [18, 6, 45, 80], [24, 8, 60, 82], [10, 5, 120, 70]], (voltage, resistance, time, efficiency) => {
    const power = voltage ** 2 / resistance;
    return scenario(
      `A heater of resistance ${resistance} Ω operates at ${voltage} V for ${time} s. The heater transfers ${efficiency}% of its electrical energy to a liquid and the rest to the surroundings.`,
      calc('Find the current through the heater.', 'A', voltage / resistance, 'Use Ohm’s law for the given resistance.'),
      calc('Find the energy delivered to the liquid.', 'J', power * time * efficiency / 100, 'Compute electrical power as V²/R, multiply by time, then apply the useful percentage.'),
      calc('Find the mean power lost to the surroundings.', 'W', power * (1 - efficiency / 100), 'Multiply the electrical input power by the fraction that does not reach the liquid.'),
    );
  }),
  drill('temperature-resistance', [[10, 0.004, 50, 12], [8, 0.003, 75, 9], [12, 0.005, 40, 16], [15, 0.0035, 120, 18]], (cold, coefficient, rise, voltage) => {
    const hot = cold * (1 + coefficient * rise);
    return scenario(
      `A metal wire has resistance ${cold} Ω at room temperature. Its fractional resistance increase per kelvin, relative to the room-temperature value, is ${coefficient} K⁻¹. It is warmed by ${rise} K and held at that temperature. Potential difference is ${voltage} V for both readings.`,
      calc('Find the percentage increase in resistance.', '%', 100 * coefficient * rise, 'Multiply the coefficient by temperature rise and then by 100.'),
      calc('Calculate the current after warming.', 'A', voltage / hot, 'First find R = R₀(1 + αΔT), then use the same potential difference in I = V/R.'),
      calc('Find the ratio of hot electrical power to cold electrical power.', '', cold / hot, 'Power is V²/R at the stated constant voltage, so the power ratio is the inverse resistance ratio.'),
    );
  }),
]);

const circuits = practice('10', [
  ['across-branches', 'In a steady DC circuit, which quantity must be the same across two resistors connected in parallel?', ['Current', 'Resistance', 'Power', 'Potential difference'], 3, 'Both resistors connect to the same pair of nodes, so they share a potential difference.'],
  ['ideal-voltmeter', 'Why is a voltmeter designed to have high resistance?', ['To produce a large load current', 'To draw as little current as possible', 'To leave the ammeter inactive', 'To make the source resistance zero'], 1, 'A high meter resistance minimises the additional current branch and changes the circuit voltage by less.'],
], [
  drill('loaded-divider', [[12, 2, 6, 3], [9, 3, 4, 8], [15, 4, 8, 4], [18, 6, 9, 18]], (supply, top, bottom, meter) => {
    const lower = bottom * meter / (bottom + meter);
    const output = supply * lower / (top + lower);
    return scenario(
      'The diagram shows a loaded potential divider. The ideal supply has negligible internal resistance. Include the finite resistance of the voltmeter.',
      calc('Find the equivalent resistance of the two lower paths.', 'kΩ', lower, 'The lower resistor and voltmeter are in parallel. Divide their product by their sum.'),
      calc('Find the potential difference indicated by the voltmeter.', 'V', output, 'The loaded lower section and the upper resistor form a divider. Multiply the supply voltage by the loaded lower resistance divided by total resistance.'),
      calc('Find the current through the voltmeter.', 'mA', output / meter, 'Divide the voltmeter potential difference by its resistance in kΩ. Volts divided by kilohms gives milliamps.'),
      dividerFigure({ supply, top, bottom, meter }),
    );
  }),
  drill('terminal-curve', [[12, 1, 3, 5], [9, 0.75, 4, 3], [15, 2, 3, 8], [6, 0.5, 4, 2.5]], (emf, internal, high, load) => {
    const current = emf / (internal + load);
    return scenario(
      `A source with internal resistance gives the terminal characteristic shown. A ${load} Ω load is now connected directly to it.`,
      calc('Read the open-circuit emf from the graph.', 'V', emf, 'The terminal potential difference at zero current is the emf.'),
      calc('Calculate the source’s internal resistance.', 'Ω', internal, 'From Vterminal = emf − Ir, the magnitude of the graph’s gradient is r.'),
      calc('Find the power delivered to the load.', 'W', current ** 2 * load, 'Use the total series resistance to obtain I, then calculate I²R using the load resistance only.'),
      plotFigure({ caption: 'Terminal potential difference as the current varies', alt: `Straight line from ${emf} V at zero current to ${emf - internal * high} V at ${high} A.`, xLabel: 'I / A', yLabel: 'terminal p.d. / V', xTicks: [0, high / 2, high], yTicks: [0, emf - internal * high, emf], traces: [{ points: [[0, emf], [high, emf - internal * high]] }] }),
    );
  }),
  drill('branch-network', [[12, 2, 6, 3], [18, 4, 12, 6], [9, 1.5, 3, 6], [24, 5, 20, 10]], (voltage, feed, left, right) => {
    const parallel = left * right / (left + right);
    const branchV = voltage * parallel / (feed + parallel);
    return scenario(
      `An ideal ${voltage} V source feeds one ${feed} Ω resistor in series with a parallel pair of ${left} Ω and ${right} Ω resistors.`,
      calc('Find the equivalent resistance of the parallel pair.', 'Ω', parallel, 'Use the product divided by the sum for two parallel resistors.'),
      calc(`Find the current through the ${right} Ω branch.`, 'A', branchV / right, 'Find the common p.d. across the parallel pair using potential division, then apply Ohm’s law to the named branch.'),
      calc('Find the power dissipated by the series resistor.', 'W', (voltage / (feed + parallel)) ** 2 * feed, 'Use the total circuit resistance to find supply current. The series resistor carries all of it, so apply I²R to that resistor.'),
    );
  }),
  drill('opposing-cells', [[12, 4, 0.5, 1, 8], [9, 3, 0.75, 0.25, 5], [15, 6, 1, 0.5, 7.5], [18, 8, 1.5, 0.5, 6]], (first, second, r1, r2, load) => {
    const i = (first - second) / (r1 + r2 + load);
    return scenario(
      `Two sources of ${first} V and ${second} V emf are in series opposition with a ${load} Ω resistor. Their internal resistances are ${r1} Ω and ${r2} Ω respectively.`,
      calc('Find the magnitude of the net emf around the loop.', 'V', first - second, 'The two emfs oppose, so subtract the smaller from the larger.'),
      calc('Find the loop current.', 'A', i, 'Divide the net emf by the sum of both internal resistances and the load resistance.'),
      calc('Find the terminal voltage of the smaller source.', 'V', second + i * r2, 'Current enters the positive terminal of the smaller source. Its terminal p.d. is its emf plus the internal resistor drop.'),
    );
  }),
  drill('bridge-null', [[3, 6, 4, 12], [2, 5, 6, 15], [4, 10, 8, 18], [5, 15, 10, 16]], (top, bottom, otherTop, volts) => {
    const otherBottom = otherTop * bottom / top;
    return scenario(
      `A resistance bridge has two branches in parallel across an ideal ${volts} V supply. The left branch has ${top} kΩ above ${bottom} kΩ; the right branch has ${otherTop} kΩ above an unknown resistor. A null detector is connected between the two junctions and reads zero.`,
      calc('Find the potential of the left junction relative to the lower supply terminal.', 'V', volts * bottom / (top + bottom), 'Use the potential-divider ratio for the lower left resistor.'),
      calc('Find the unknown resistance.', 'kΩ', otherBottom, 'At balance the two junction potentials are equal, so the two sides have the same upper-to-lower resistance ratio.'),
      calc('Find the total current from the supply while the bridge is balanced.', 'mA', volts / (top + bottom) + volts / (otherTop + otherBottom), 'Find each branch current from its full series resistance and add them. There is no detector current at balance.'),
    );
  }),
]);

const electricFields = practice('18', [
  ['electric-potential', 'What does the electric potential at a point equal?', ['Electric force per unit charge', 'Work done per unit positive charge in bringing it from infinity', 'Charge divided by stored energy', 'Energy transferred per second'], 1, 'Potential is potential energy per unit positive charge, with the usual reference zero at infinity. Electric field strength is force per unit charge.'],
  ['equipotential-work', 'A charge moves between two points on the same equipotential surface. What is the work done by the electric field?', ['Always zero', 'Maximum when the charge is positive', 'Equal to q times the field strength', 'Proportional to distance travelled on the surface'], 0, 'The field’s work depends on the potential difference between the endpoints. That difference is zero.'],
], [
  drill('potential-gradient', [[80, 20, 4, 5, 2], [120, 40, 5, 10, 3], [100, 30, 2, 8, 4], [150, 50, 6, 10, 1.5]], (start, end, first, second, charge) => {
    const slope = (start - end) / (first / 100);
    return scenario(
      `The electric potential along a line is shown. A particle of positive charge ${charge} nC can move along +x from 0 to ${second} cm.`,
      calc('Find the potential drop between the ends of the plotted line.', 'V', start - end, 'Subtract the final potential from the initial potential.'),
      calc(`Find the magnitude of the electric field in the interval 0 to ${first} cm.`, 'V m⁻¹', slope, 'Electric field is the negative potential gradient. Convert the horizontal interval to metres before dividing.'),
      calc('Find the work done by the electric field as the charge crosses the plotted region.', 'nJ', charge * (start - end), 'For a positive charge the field does q times the potential drop. A nanocoulomb-volt is a nanojoule.'),
      plotFigure({ caption: 'Potential along the line of travel', alt: `Potential falls linearly from ${start} V at x = 0 to ${end} V at ${first} cm and remains at ${end} V until ${second} cm.`, xLabel: 'x / cm', yLabel: 'potential / V', xTicks: [0, first, second], yTicks: [0, end, start], traces: [{ points: [[0, start], [first, end], [second, end]] }] }),
    );
  }),
  drill('charged-drop', [[450, 10, 2.20], [600, 15, 1.30], [480, 12, 3.26], [800, 16, 2.45]], (voltage, gap, mass) => {
    const field = voltage / (gap * 1e-3);
    const charge = mass * 1e-15 * 9.81 / field;
    return scenario(
      `A tiny sprayed droplet of mass ${mass} × 10⁻¹⁵ kg is stationary between wide horizontal plates with a ${gap} mm separation and ${voltage} V p.d. The field points down. Ignore buoyancy. Use g = 9.81 m s⁻².`,
      calc('Find the magnitude of the electric field between the plates.', 'V m⁻¹', field, 'For a uniform field, divide the potential difference by the plate separation in metres.'),
      calc('Find the signed charge on the droplet.', 'C', -charge, 'The electric force balances weight and points upward, opposite the field. The charge is negative, with magnitude mg/E.'),
      calc('If the field strength is doubled without changing its direction, find the initial upward acceleration.', 'm s⁻²', 9.81, 'The original electric force exactly balanced weight. Doubling it leaves net upward force equal to one weight.'),
    );
  }),
  drill('electric-balance', [[4, 1, 0.6], [9, 4, 0.5], [16, 1, 0.4], [25, 4, 0.7]], (a, b, separation) => {
    const x = separation * Math.sqrt(a) / (Math.sqrt(a) + Math.sqrt(b));
    return scenario(
      `Fixed positive charges A and B have magnitudes ${a} nC and ${b} nC and are separated by ${separation} m. Use k = 9.00 × 10⁹ N m² C⁻² and ignore other charges.`,
      calc('Find the magnitude of the electric force between the charges.', 'N', 9e9 * a * b * 1e-18 / separation ** 2, 'Use Coulomb’s law with each charge expressed in coulombs.'),
      calc('Find the distance from A to the point of zero field between A and B.', 'm', x, 'For cancellation set A/x² equal to B/(d − x)² and solve with both distances positive.'),
      calc('Find the electric potential at the zero-field point.', 'V', 9 * (a / x + b / (separation - x)), 'Potential is scalar. Add kq/r from both positive charges even where the vector fields cancel.'),
    );
  }),
  drill('electron-across-plates', [[180, 18, 5], [250, 20, 8], [150, 12, 6], [400, 25, 10]], (volts, separation, travelled) => {
    const field = volts / (separation * 1e-3);
    const energyEV = volts * travelled / separation;
    return scenario(
      `An electron starts from rest near the negative plate of a uniform field. The plates are ${separation} mm apart with ${volts} V across them. It moves ${travelled} mm directly towards the positive plate. Use e = 1.60 × 10⁻¹⁹ C and electron mass 9.11 × 10⁻³¹ kg. Neglect gravity and relativistic effects.`,
      calc('Find the magnitude of the field.', 'V m⁻¹', field, 'Divide the p.d. by plate separation in metres.'),
      calc('Calculate the gain in kinetic energy.', 'eV', energyEV, 'The electron gains one electronvolt per volt moved through. The p.d. along the given part of the path is proportional to distance.'),
      calc('Calculate the electron’s final speed.', 'm s⁻¹', Math.sqrt(2 * energyEV * 1.6e-19 / 9.11e-31), 'Convert the energy gain to joules and set it equal to ½mv², then solve for v.'),
    );
  }),
  drill('charged-sphere', [[5, 0.15, 0.45, 1.2], [8, 0.20, 0.60, 2], [12, 0.25, 0.75, 4], [10, 0.30, 0.90, 3.5]], (nC, first, second, test) => scenario(
    `A small conducting sphere of charge +${nC} nC can be treated as a point charge at both distances. Move a test charge +${test} nC outward from ${first} m to ${second} m from its centre. Use k = 9.00 × 10⁹ N m² C⁻² and take zero potential at infinity.`,
    calc('Find the initial electric potential at the test charge.', 'V', 9 * nC / first, 'The sphere’s exterior potential is kQ/r.'),
    calc('Find the magnitude of the initial electric force on the test charge.', 'N', 9 * nC * test * 1e-9 / first ** 2, 'Calculate the field kQ/r² and multiply by the test charge in coulombs.'),
    calc('Find the work done by the field on the test charge during this motion.', 'nJ', test * 9 * nC * (1 / first - 1 / second), 'Calculate the potential drop as kQ(1/rinitial − 1/rfinal), then multiply by the test charge in nC.'),
  )),
]);

const capacitance = practice('19', [
  ['charge-storage', 'Why is the net charge of an ideal two-plate capacitor still zero after charging from a battery?', ['Both plates gain positive charge', 'Charge has been transferred from one plate to the other', 'The battery turns charge into heat', 'Only the dielectric can store charge'], 1, 'For an initially neutral capacitor, the battery transfers charge between the plates, leaving equal and opposite plate charges.'],
  ['dielectric-isolated', 'A charged, isolated capacitor is filled with a dielectric that increases its capacitance. What happens to plate potential difference?', ['It rises', 'It increases only if the plates are touched', 'It falls', 'It is fixed by the original supply'], 2, 'The capacitor is isolated so its charge is fixed. Increasing C reduces V = Q/C.'],
], [
  drill('series-capacitors', [[12, 3, 6], [18, 4, 8], [15, 2, 3], [24, 5, 10]], (supply, first, second) => {
    const c = first * second / (first + second);
    const q = c * supply;
    return scenario(
      'The two initially uncharged capacitors shown are connected in series across an ideal DC supply. Wait until the current has fallen to zero.',
      calc('Find the equivalent capacitance.', 'µF', c, 'For two capacitors in series, divide their product by their sum.'),
      calc('Find the potential difference across the first capacitor in the diagram.', 'V', q / first, 'The series capacitors carry charge of equal magnitude. Calculate Q = Cequivalent V and divide this charge by the first capacitance.'),
      calc('Calculate the total stored electrostatic energy.', 'µJ', c * supply ** 2 / 2, 'Use ½CequivalentV² with the supply voltage. A microfarad times voltage squared gives microjoules.'),
      capacitorFigure({ supply, first, second }),
    );
  }),
  drill('discharge-curve', [[12, 100, 5, 3], [9, 220, 4, 2], [16, 150, 6, 4], [10, 330, 3, 2.5]], (v0, cap, time, factor) => {
    const tau = time / 1000;
    return scenario(
      `A ${cap} µF capacitor begins discharging from ${v0} V through a fixed resistor. Its time constant is ${time} ms. Consider the state after ${factor} time constants.`,
      calc('Calculate its initial charge.', 'µC', v0 * cap, 'Multiply the initial voltage by capacitance in µF.'),
      calc('Find the discharge resistance.', 'Ω', tau / (cap * 1e-6), 'Use the time constant τ = RC with time in seconds and capacitance in farads.'),
      calc('Find the energy remaining at the stated time.', 'µJ', cap * (v0 * Math.exp(-factor)) ** 2 / 2, 'After n time constants the voltage is V₀e⁻ⁿ. Use that reduced voltage in ½CV².'),
    );
  }),
  drill('connected-capacitors', [[4, 2, 9], [6, 4, 12], [8, 3, 10], [5, 7, 15]], (charged, uncharged, voltage) => {
    const final = charged * voltage / (charged + uncharged);
    return scenario(
      `A ${charged} µF capacitor is charged to ${voltage} V and disconnected from the source. It is connected in parallel with an initially uncharged ${uncharged} µF capacitor. Assume negligible charge leakage.`,
      calc('Find the charge on the initially charged capacitor before connection.', 'µC', charged * voltage, 'Use Q = CV with capacitance in µF.'),
      calc('Find the common final voltage.', 'V', final, 'Total charge is conserved after disconnection. Divide it by the sum of the parallel capacitances.'),
      calc('Find the electrostatic energy lost in the connection.', 'µJ', (charged * voltage ** 2 - (charged + uncharged) * final ** 2) / 2, 'Subtract the combined final energy from the initial energy, using ½CV² for each state.'),
    );
  }),
  drill('isolated-plates', [[6, 10, 2], [8, 15, 1.5], [12, 9, 2.5], [10, 12, 3]], (cap, voltage, factor) => scenario(
    `An air-filled parallel-plate capacitor of capacitance ${cap} pF is charged to ${voltage} V and disconnected. The plate spacing is then increased by a factor of ${factor}. Ignore edge effects, leakage and breakdown.`,
    calc('Find the magnitude of charge on either plate.', 'pC', cap * voltage, 'At the initial voltage use Q = CV with C in picofarads.'),
    calc('Find the final potential difference.', 'V', voltage * factor, 'Capacitance decreases inversely with spacing. With charge fixed, Q/C increases by the same factor.'),
    calc('Find the net work done on the capacitor to separate the plates.', 'pJ', cap * voltage ** 2 * (factor - 1) / 2, 'At fixed Q the energy is QV/2. Its increase equals the work done on the capacitor when losses are negligible.'),
  )),
  drill('constant-current-charge', [[18, 4, 9], [25, 3, 12], [30, 5, 8], [12, 6, 10]], (cap, current, time) => {
    const charge = current * time;
    return scenario(
      `A constant current of ${current} mA charges an initially uncharged ${cap} µF capacitor for ${time} ms. The supply can maintain that current as the capacitor voltage rises.`,
      calc('Find the final capacitor charge.', 'µC', charge, 'Charge is current multiplied by elapsed time. One mA ms equals one µC.'),
      calc('Find the final terminal p.d. of the capacitor.', 'V', charge / cap, 'Use Q = CV with charge in µC and capacitance in µF.'),
      calc('Find the energy stored by the capacitor at that time.', 'µJ', charge ** 2 / (2 * cap), 'Use Q²/(2C), or equivalently half the final charge times the final voltage.'),
    );
  }),
]);

const magnetism = practice('magnetic-fields', [
  ['magnetic-work', 'A free ion enters a uniform magnetic field and moves perpendicular to it. Which quantity is unchanged by the magnetic force?', ['The direction of its velocity', 'Its kinetic energy', 'The direction of its acceleration', 'The direction of its momentum'], 1, 'Magnetic force is perpendicular to the velocity, so it changes direction without doing work.'],
  ['lenz-law', 'Why does the direction of an induced current oppose the change responsible for it?', ['Because a coil has no electrical resistance', 'Because the new magnetic field eliminates all flux', 'Because a current that reinforces the change would violate energy conservation', 'Because the induced current is always anticlockwise'], 2, 'If the induced effect reinforced its own cause, the system could continually increase energy without corresponding external work.'],
], [
  drill('flux-time', [[80, 3, 2, 6], [120, 5, 4, 7], [90, 4, 2.5, 6], [150, 6, 3, 9]], (turns, peak, rise, fall) => scenario(
    `A coil has ${turns} turns. The graph gives the magnetic flux through each turn as it rises and then falls back to zero. Ignore any back-reaction on the source of the flux.`,
    calc('Find the maximum flux linkage.', 'mWb turns', turns * peak, 'Multiply the peak flux through one turn by the number of turns.'),
    calc('Find the magnitude of the emf during the rise.', 'V', turns * peak / rise / 1000, 'Faraday’s law gives the number of turns multiplied by the change in flux per second. Convert mWb to Wb.'),
    calc('Find the magnitude of the emf during the fall.', 'V', turns * peak / fall / 1000, 'The same total change in linkage takes the longer fall time. Divide its magnitude by that time.'),
    plotFigure({ caption: 'Flux through one turn of the coil', alt: `Flux rises linearly from zero to ${peak} mWb at ${rise} s and returns linearly to zero at ${rise + fall} s.`, xLabel: 'time / s', yLabel: 'flux / mWb', xTicks: [0, rise, rise + fall], yTicks: [0, peak / 2, peak], traces: [{ points: [[0, 0], [rise, peak], [rise + fall, 0]] }] }),
  ), 'induction'),
  drill('ion-orbit', [[20, 1, 0.30, 4], [24, 2, 0.45, 3], [28, 1, 0.25, 5], [40, 2, 0.50, 6]], (a, z, field, speed) => {
    const mass = a * 1.66e-27;
    const charge = z * 1.60e-19;
    const v = speed * 1e4;
    return scenario(
      `An ion of mass ${a} u and charge +${z}e enters a ${field} T field at right angles to the field. Its speed is ${speed} × 10⁴ m s⁻¹. Use 1 u = 1.66 × 10⁻²⁷ kg and e = 1.60 × 10⁻¹⁹ C.`,
      calc('Find the magnitude of the magnetic force.', 'N', charge * v * field, 'At right angles the magnetic force magnitude is qvB.'),
      calc('Find the radius of its circular path.', 'mm', 1000 * mass * v / (charge * field), 'Equate magnetic and centripetal force: qvB = mv²/r. Solve for r and convert to mm.'),
      calc('Find the time to traverse a semicircle.', 'µs', 1e6 * Math.PI * mass / (charge * field), 'The semicircle length is πr. Divide by v and convert seconds to microseconds.'),
    );
  }, 'charged-particles'),
  drill('wire-balance', [[0.35, 0.06, 3, 0.7], [0.25, 0.08, 4, 0.6], [0.42, 0.05, 2, 0.8], [0.50, 0.04, 3.5, 0.5]], (field, length, current, newRatio) => {
    const f = field * current * length;
    return scenario(
      `A wire has ${length} m in a uniform ${field} T field at right angles. It carries ${current} A. The wire experiences an upward force. The magnet assembly sits on a balance; it receives the opposite downward force. Use g = 9.81 m s⁻².`,
      calc('Find the force magnitude on the wire.', 'N', f, 'Use BIL, with the length that is inside the field.'),
      calc('Find the increase in the magnet’s balance reading expressed as a mass.', 'g', 1000 * f / 9.81, 'The balance measures a downward force F. Divide it by g and convert kg to g.'),
      calc(`If the wire current reverses and its magnitude becomes ${100 * newRatio}% of the initial value, find the signed change relative to the zero-current reading.`, 'g', -1000 * f * newRatio / 9.81, 'Reversal makes the magnet force upward. Its magnitude is proportional to the current.'),
    );
  }),
  drill('current-loop', [[25, 0.22, 20, 0.8, 30], [40, 0.18, 16, 0.6, 45], [30, 0.30, 12, 1.1, 60], [50, 0.12, 25, 0.7, 50]], (turns, field, cm2, current, angle) => {
    const area = cm2 * 1e-4;
    const phi = angle * Math.PI / 180;
    return scenario(
      `A flat motor coil of ${turns} turns and area ${cm2} cm² carries ${current} A in a uniform ${field} T field. The angle between its normal and the magnetic field is ${angle}°.`,
      calc('Find the magnetic flux through one turn.', 'Wb', field * area * Math.cos(phi), 'Flux is BA cos θ, with θ measured from the normal. Convert the loop area to m².'),
      calc('Find the torque on the coil at the stated angle.', 'N m', turns * field * current * area * Math.sin(phi), 'Equivalently, add the torques of paired magnetic forces on the coil sides, giving NBIA sin θ for the angle from the normal.'),
      calc('Find the maximum torque available by reorienting the same coil.', 'N m', turns * field * current * area, 'The maximum occurs when the coil normal is perpendicular to the field so sin θ is one.'),
    );
  }, '20'),
  drill('moving-rod', [[0.4, 0.3, 8, 0.8], [0.3, 0.5, 5, 1.2], [0.6, 0.4, 6, 1.5], [0.25, 0.8, 8, 0.9]], (field, length, v, resistance) => {
    const emf = field * length * v;
    return scenario(
      `A ${length} m conducting rod slides at ${v} m s⁻¹ along conducting rails in a ${field} T uniform magnetic field. The rod, velocity and field directions are mutually perpendicular. The loop is completed through a resistor of ${resistance} Ω, with other resistance negligible.`,
      calc('Find the magnitude of the motional emf.', 'V', emf, 'The moving rod sweeps area L per metre travelled, giving a flux-change rate BLv.'),
      calc('Find the induced current.', 'A', emf / resistance, 'Divide the motional emf by the closed-loop resistance.'),
      calc('Find the minimum external mechanical power to maintain the speed.', 'W', emf ** 2 / resistance, 'Without other losses, supply mechanical power equal to the rate of electrical heating I²R.'),
    );
  }, 'induction'),
]);

const alternating = practice('21', [
  ['transformer-dc', 'What happens to the ideal secondary emf immediately after a steady DC current has been established in the primary?', ['It is equal to the primary supply voltage', 'It is zero', 'It alternates at twice mains frequency', 'It rises until the core saturates'], 1, 'The steady current makes the flux steady. Induction requires a changing flux linkage.'],
  ['rms-meaning', 'A sinusoidal AC source and a DC source deliver the same mean power to identical resistors. What equals the DC voltage?', ['AC peak voltage', 'AC mean signed voltage', 'AC peak-to-peak voltage', 'AC rms voltage'], 3, 'Rms voltage is defined to give the same mean resistive heating as the equal DC voltage.'],
], [
  drill('loaded-transformer', [[120, 900, 150, 10], [240, 1200, 180, 24], [110, 550, 100, 8], [230, 1150, 100, 12]], (input, primary, secondary, load) => {
    const out = input * secondary / primary;
    return scenario(
      'An ideal transformer and its resistive load are shown. All voltages and currents requested here are rms values.',
      calc('Calculate the secondary voltage.', 'V', out, 'The secondary-to-primary voltage ratio equals the turns ratio.'),
      calc('Calculate the AC current through the load.', 'A', out / load, 'Divide the secondary rms voltage by load resistance.'),
      calc('Find the primary current.', 'A', out ** 2 / (load * input), 'The secondary power is Vsecondary²/R. It equals VprimaryIprimary for this ideal transformer with a resistive load.'),
      transformerFigure({ input, primary, secondary, load }),
    );
  }, 'transformers'),
  drill('sinusoidal-supply', [[20, 25, 40], [34, 50, 20], [48, 60, 30], [16, 40, 12]], (peak, frequency, resistance) => scenario(
    `A sinusoidal source of peak voltage ${peak} V and frequency ${frequency} Hz is connected to a ${resistance} Ω resistor. At t = 0 its voltage crosses zero in the positive direction.`,
    calc('Find the period of the output.', 'ms', 1000 / frequency, 'One over frequency gives the period in seconds. Convert to milliseconds.'),
    calc('Find the rms current in the resistor.', 'A', peak / (Math.SQRT2 * resistance), 'Divide the peak voltage by √2, then use Ohm’s law.'),
    calc('Find the mean power dissipated in the resistor.', 'W', peak ** 2 / (2 * resistance), 'Use Vrms²/R, so Pmean = Vpeak²/(2R).'),
  )),
  drill('full-wave-bridge', [[12, 50, 40], [18, 60, 60], [24, 50, 80], [16, 40, 50]], (peak, f, load) => scenario(
    `A ${f} Hz sinusoidal signal with peak magnitude ${peak} V feeds a full-wave bridge rectifier. The four diodes are ideal. A ${load} Ω resistor is directly connected to the output. No smoothing capacitor is installed.`,
    calc('Find the frequency of the rectified pulses.', 'Hz', 2 * f, 'Full-wave rectification turns each negative half-cycle positive, so there are two pulses per input period.'),
    calc('Find the maximum current in the resistor.', 'A', peak / load, 'The ideal bridge does not reduce the input magnitude. Divide peak output voltage by the resistor’s resistance.'),
    calc('Find the mean power dissipated by the load.', 'W', peak ** 2 / (2 * load), 'Squaring the voltage makes its sign irrelevant. The mean of the squared sinusoid remains Vpeak²/2 after rectification.'),
  )),
  drill('smoothing-ripple', [[50, 1000, 80, 12], [60, 1500, 120, 15], [50, 2200, 160, 20], [40, 1800, 90, 18]], (frequency, cap, mA, voltage) => {
    const ripple = 1000 * mA / (cap * 2 * frequency);
    return scenario(
      `A ${frequency} Hz ideal bridge rectifier rapidly recharges a ${cap} µF smoothing capacitor to ${voltage} V at each peak. A current-regulated load draws a constant ${mA} mA between peaks. Neglect the recharge duration.`,
      calc('Find the interval between recharge peaks.', 'ms', 1000 / (2 * frequency), 'A bridge rectifier recharges at both peaks of each input period.'),
      calc('Estimate the peak-to-peak output ripple.', 'V', ripple, 'The capacitor loses charge IΔt before each recharge. Use ΔV = IΔt/C, with time equal to half the AC period.'),
      calc('Estimate the lowest output voltage reached between peaks.', 'V', voltage - ripple, 'Subtract the calculated ripple from the peak voltage.'),
    );
  }),
  drill('grid-loss', [[3, 500, 2, 4], [5, 1000, 3, 5], [4, 800, 2.5, 8], [6, 1200, 4, 10]], (power, voltage, resistance, ratio) => {
    const current = 1000 * power / voltage;
    return scenario(
      `A resistive load receives ${power} kW at a voltage of ${voltage} V rms. The complete transmission line has resistance ${resistance} Ω. An ideal step-down transformer can instead let the line carry the same receiving-end power at ${ratio} times that voltage before stepping it down to the same load voltage.`,
      calc('Find the line current without the transformer.', 'A', current, 'Convert the power to watts and divide by the receiving-end rms voltage.'),
      calc('Find the line power loss at the higher voltage.', 'W', (current / ratio) ** 2 * resistance, 'The line current at the higher receiving-end voltage drops by the voltage ratio. Line power loss is I² times line resistance.'),
      calc('Find the reduction in line power loss compared with the lower voltage.', 'W', current ** 2 * resistance * (1 - ratio ** -2), 'Subtract the higher-voltage line loss from the original I²R.'),
    );
  }, 'transformers'),
]);

const electronics = practice('electronics', [
  ['feedback-gain', 'What is the usual effect of negative feedback on an amplifier with a very large open-loop gain?', ['The closed-loop gain is set mainly by the feedback network', 'The output is always at the positive supply rail', 'The amplifier draws infinite current', 'Both input terminals must be disconnected'], 0, 'Negative feedback drives the difference between the input voltages close to zero, so external component ratios set the gain.'],
  ['comparator', 'For an ideal open-loop comparator with split rails, which condition drives the output towards the positive rail?', ['V₊ < V₋', 'V₊ > V₋', 'The output current must be zero', 'The supply voltages must both be positive'], 1, 'The open-loop output has the sign of V₊ − V₋ and saturates near the corresponding rail.'],
], [
  drill('transfer-curve', [[8, 4, 1, 0.5], [9, 3, 1.5, 2], [10, 5, 0.8, 1.6], [12, 6, 1.2, 0.6]], (rail, gain, small, offset) => {
    const knee = rail / gain;
    return scenario(
      `The graph shows the voltage transfer function of a DC amplifier. It is linear around the origin and clips symmetrically at finite output voltages. The amplifier receives a sinusoidal signal of ${knee + offset} V peak centred on zero.`,
      calc('Read the positive clipping voltage of the output.', 'V', rail, 'Read the upper plateau on the output-axis scale.'),
      calc('Find the output voltage for a positive DC input of ' + small + ' V.', 'V', small * gain, 'This input is in the straight-line region. The output is the input multiplied by the slope of that region.'),
      calc('Find the minimum instantaneous input voltage above which the positive half-cycle is clipped.', 'V', knee, 'The positive knee in the transfer curve marks the input value at which the upper plateau begins.'),
      plotFigure({ caption: 'Amplifier output versus input', alt: `From a lower plateau of minus ${rail} V, the output rises along a straight line through the origin between inputs minus ${knee} V and plus ${knee} V. It is then flat at plus ${rail} V.`, xLabel: 'input / V', yLabel: 'output / V', xTicks: [-2 * knee, -knee, 0, knee, 2 * knee], yTicks: [-rail, 0, rail], traces: [{ points: [[-2 * knee, -rail], [-knee, -rail], [knee, rail], [2 * knee, rail]] }] }),
    );
  }),
  drill('inverting-op-amp', [[10, 47, 0.2, 12], [22, 100, 0.8, 10], [15, 75, 0.7, 9], [30, 120, 1.4, 12]], (input, feedback, vin, max) => scenario(
    `An ideal inverting amplifier has an input resistor of ${input} kΩ and a feedback resistor of ${feedback} kΩ. Its non-inverting input is grounded. Its output clips at ±${max} V. The input voltage is currently +${vin} V.`,
    calc('Find the magnitude of the linear voltage gain.', '', feedback / input, 'With the inverting input at virtual earth, input-resistor current equals feedback-resistor current. The gain magnitude is Rf/Rin.'),
    calc('Find the signed output voltage at the stated input.', 'V', -vin * feedback / input, 'The feedback resistor develops a voltage drop of opposite polarity to the input, so apply the negative gain.'),
    calc('Find the maximum input amplitude that keeps the output unclipped.', 'V', max * input / feedback, 'The magnitude of the output cannot exceed the rail. Divide it by the gain magnitude.'),
  )),
  drill('noninverting-op-amp', [[10, 40, 0.9, 10], [12, 60, 0.8, 15], [15, 60, 1.2, 9], [25, 75, 1.8, 12]], (ground, feedback, input, clipping) => {
    const gain = 1 + feedback / ground;
    return scenario(
      `An ideal non-inverting amplifier has feedback resistance ${feedback} kΩ from output to the inverting terminal and ${ground} kΩ from that terminal to ground. The positive supply permits output up to +${clipping} V. The non-inverting terminal is currently at +${input} V.`,
      calc('Calculate the closed-loop voltage gain.', '', gain, 'The inverting terminal is fed by a voltage divider. Setting its voltage equal to the input gives 1 + Rf/Rg.'),
      calc('Calculate the output voltage.', 'V', gain * input, 'Multiply the input by the gain. For these values the result is below the rail.'),
      calc('Find the current from the output through the feedback resistor.', 'mA', input / ground, 'No current enters the ideal input, so feedback current equals the current through the resistor to ground. Divide the inverting voltage by Rg.'),
    );
  }),
  drill('comparator-threshold', [[5, 10, 15, 7], [8, 12, 18, 11], [10, 15, 10, 9], [12, 20, 30, 13]], (supply, top, bottom, output) => {
    const threshold = supply * bottom / (top + bottom);
    return scenario(
      `A comparator’s inverting input is held at the junction of a ${top} kΩ resistor to a ${supply} V reference and a ${bottom} kΩ resistor to ground. Its non-inverting input is a ramp that begins at 0 V and rises at ${supply} V s⁻¹. The output is limited to ±${output} V.`,
      calc('Calculate the total resistance of the reference divider.', 'kΩ', top + bottom, 'The divider resistors are in series. An ideal input takes no current.'),
      calc('Calculate the ramp voltage at the switching threshold.', 'V', threshold, 'The output switches when the ramp matches the inverting reference voltage, found with the lower-arm divider ratio.'),
      calc('Find the time from the start of the ramp until switching.', 's', threshold / supply, 'Divide the threshold voltage by the ramp’s constant rate of change.'),
    );
  }),
  drill('diode-resistor', [[5, 220, 0.65, 10], [9, 330, 0.70, 20], [12, 470, 0.72, 15], [6, 180, 0.68, 25]], (supply, resistance, drop, desired) => {
    const current = (supply - drop) / resistance;
    return scenario(
      `A silicon diode is forward biased in series with a ${resistance} Ω resistor across ${supply} V. Model the diode as a constant ${drop} V drop for this range of currents.`,
      calc('Find the p.d. across the resistor.', 'V', supply - drop, 'Subtract the diode drop from the supply voltage.'),
      calc('Calculate the diode power dissipation.', 'mW', 1000 * current * drop, 'Find the series current using the resistor drop. Multiply by the diode voltage and convert watts to milliwatts.'),
      calc(`Find the series resistance needed to make the current ${desired} mA at the same supply voltage.`, 'Ω', 1000 * (supply - drop) / desired, 'The resistor still has voltage Vsource − Vdiode. Divide that drop by the desired current in amps.'),
    );
  }),
]);

const sensing = practice('direct-sensing', [
  ['ntc-response', 'What happens to the resistance of an NTC thermistor when its temperature rises?', ['It rises', 'It falls', 'It stays constant', 'It changes only if illuminated'], 1, 'NTC means negative temperature coefficient. A rise in temperature lowers its resistance.'],
  ['calibration-offset', 'A displacement sensor displays 0.08 V when the true displacement is zero. How should this affect a linear calibration equation?', ['Force its slope to zero', 'Include a 0.08 V intercept', 'Set the intercept to infinity', 'Discard both calibration points'], 1, 'The output has a zero offset. A linear calibration includes this value as its voltage intercept.'],
], [
  drill('divider-sensor', [[5, 10, 15, 5, 'thermistor'], [6, 12, 20, 6, 'LDR'], [9, 22, 36, 12, 'LDR'], [8, 18, 24, 8, 'thermistor']], (supply, fixed, sensor, next, name) => scenario(
    `The diagram shows a resistive sensing circuit with an unloaded output. After ${name === 'LDR' ? 'illumination increases' : 'the thermistor warms'}, the sensor resistance decreases to ${next} kΩ.`,
    calc('Find the current from the supply at the initial reading.', 'mA', supply / (fixed + sensor), 'Add the two resistances in series and divide the supply voltage by the result in kilohms.'),
    calc('Calculate the initial output voltage.', 'V', supply * sensor / (fixed + sensor), 'The output is measured across the lower sensor. Use its fractional share of total series resistance.'),
    calc('Find the size of the fall in output voltage after the resistance decreases.', 'V', supply * (sensor / (fixed + sensor) - next / (fixed + next)), 'Recalculate the potential division with the lower sensor resistance and subtract the new output from the initial output.'),
    sensorFigure({ supply, fixed, sensor, name }),
  )),
  drill('strain-calibration', [[0.2, 1.4, 60, 0.8, 3], [0.3, 2.3, 100, 1.5, 4], [0.4, 1.9, 75, 1.2, 2], [0.1, 1.3, 80, 0.7, 5]], (zero, high, load, reading, gain) => {
    const sensitivity = (high - zero) / load;
    return scenario(
      `A strain-gauge force instrument has a linear voltage response. It reads ${zero} V at zero force and ${high} V at ${load} N. It now reads ${reading} V. A new amplifier can subtract the zero signal and multiply the remaining voltage by ${gain}.`,
      calc('Find the change in sensor output between the two calibration points.', 'V', high - zero, 'Subtract the zero-force reading from the reading at the known load.'),
      calc('Find the applied force for the measured output.', 'N', (reading - zero) / sensitivity, 'Determine sensitivity from the calibration slope. Subtract the zero offset and divide by sensitivity.'),
      calc('Find the new amplifier output at that same force.', 'V', gain * (reading - zero), 'Subtract the zero-force voltage before applying the gain.'),
    );
  }),
  drill('reed-relay', [[6, 120, 9, 1.5], [9, 180, 12, 1.8], [12, 240, 15, 2], [10, 200, 12, 2.5]], (supply, coil, loadSupply, load) => scenario(
    `A sensor output drives a relay using a separate transistor switch. When the transistor is on it places ${supply} V across a relay coil of ${coil} Ω. The relay contacts switch an independent ${loadSupply} V load of resistance ${load} Ω. Ignore switching losses and contact resistance.`,
    calc('Find the relay coil current when on.', 'mA', 1000 * supply / coil, 'Use Ohm’s law for the control-side coil and convert amperes to milliamps.'),
    calc('Calculate the power dissipated by the coil when on.', 'W', supply ** 2 / coil, 'Use P = V²/R at the coil voltage and resistance.'),
    calc('Calculate the power dissipated by the switched load.', 'W', loadSupply ** 2 / load, 'The load has its own supply. Use the load-side voltage and resistance.'),
  )),
  drill('light-response', [[8, 1.6, 2], [6, 1.25, 3], [10, 2.0, 4], [12, 2.4, 5]], (initial, change, multiplier) => {
    const next = initial / multiplier;
    return scenario(
      `Over a particular range an LDR model gives resistance inversely proportional to light intensity. It initially has resistance ${initial} kΩ. Intensity is increased by a factor of ${multiplier}. The LDR is tested with a constant voltage of ${change} V across it.`,
      calc('Find the new LDR resistance.', 'kΩ', next, 'Divide the original resistance by the intensity factor.'),
      calc('Find the increase in current drawn by the LDR.', 'mA', change / next - change / initial, 'Use I = V/R for each light level and subtract the original current.'),
      calc('Find the new electrical power dissipated by the LDR.', 'mW', change ** 2 / next, 'At the new resistance use P = V²/R. Dividing by kΩ gives milliwatts.'),
    );
  }),
  drill('step-response', [[2, 6.0, 1.5, 2], [4, 9.0, 2.2, 3], [3, 7.5, 1.8, 4], [5, 10.0, 2.5, 2.5]], (start, end, tau, units) => {
    const at = end + (start - end) * Math.exp(-units);
    return scenario(
      `A first-order temperature probe initially registers ${start} °C. It is moved into a well-stirred bath of constant temperature ${end} °C. The probe time constant is ${tau} s, so the difference from bath temperature is multiplied by e⁻¹ each time constant.`,
      calc('Find the initial temperature difference in magnitude.', 'K', end - start, 'Subtract the initial probe reading from the bath temperature. A temperature interval in Celsius has the same value in kelvins.'),
      calc(`Find the probe reading after ${units} time constants.`, '°C', at, 'Reduce the initial temperature deficit by e to the power minus the elapsed number of time constants. Subtract the remaining deficit from the bath temperature.'),
      calc('Find the time until the remaining difference is one tenth of its initial value.', 's', tau * Math.log(10), 'Set e to the power −t/τ equal to 0.1 and solve for t.'),
    );
  }),
]);

export const circuitPractice = [
  ...electricity, ...circuits, ...electricFields, ...capacitance, ...magnetism, ...alternating,
  ...electronics, ...sensing,
];
