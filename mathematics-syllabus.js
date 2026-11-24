function paper(number, name, names) {
  return {
    name: `Paper ${number} · ${name}`,
    groups: [{
      name: '',
      topics: names.map((name, index) => {
        const topicNumber = `${number}.${index + 1}`;
        return { number: topicNumber, name, banks: [`mathematics-${topicNumber}`] };
      }),
    }],
  };
}

export const mathematicsSubject = {
  id: 'mathematics',
  name: 'Mathematics',
  icon: 'calculator',
  code: '9709',
  description: 'Pure mathematics, mechanics, probability and statistics.',
  syllabus: {
    // The 2026–2027 and 2028–2030 syllabuses use the same 38 topic headings.
    source: 'https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf',
    sections: [
      paper(1, 'Pure Mathematics 1', [
        'Quadratics',
        'Functions',
        'Coordinate geometry',
        'Circular measure',
        'Trigonometry',
        'Series',
        'Differentiation',
        'Integration',
      ]),
      paper(2, 'Pure Mathematics 2', [
        'Algebra',
        'Logarithmic and exponential functions',
        'Trigonometry',
        'Differentiation',
        'Integration',
        'Numerical solution of equations',
      ]),
      paper(3, 'Pure Mathematics 3', [
        'Algebra',
        'Logarithmic and exponential functions',
        'Trigonometry',
        'Differentiation',
        'Integration',
        'Numerical solution of equations',
        'Vectors',
        'Differential equations',
        'Complex numbers',
      ]),
      paper(4, 'Mechanics', [
        'Forces and equilibrium',
        'Kinematics of motion in a straight line',
        'Momentum',
        'Newton’s laws of motion',
        'Energy, work and power',
      ]),
      paper(5, 'Probability & Statistics 1', [
        'Representation of data',
        'Permutations and combinations',
        'Probability',
        'Discrete random variables',
        'The normal distribution',
      ]),
      paper(6, 'Probability & Statistics 2', [
        'The Poisson distribution',
        'Linear combinations of random variables',
        'Continuous random variables',
        'Sampling and estimation',
        'Hypothesis tests',
      ]),
    ],
  },
};
