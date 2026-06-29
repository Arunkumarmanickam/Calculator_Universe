import type { CalculatorDefinition } from '@/types/calculator'

const pythagoreanCalculator: CalculatorDefinition = {
  meta: {
    id: 'pythagorean',
    category: 'math',
    title: 'Pythagorean Theorem Calculator',
    description: 'Calculate the sides of a right triangle using the Pythagorean theorem.',
    keywords: ['pythagorean', 'theorem', 'triangle', 'hypotenuse', 'geometry', 'math'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'sideA', label: 'Side A', type: 'number', default: 3, placeholder: '3', min: 0, step: 0.1, required: true },
      { id: 'sideB', label: 'Side B', type: 'number', default: 4, placeholder: '4', min: 0, step: 0.1, required: true },
    ],
    formula: 'a^2 + b^2 = c^2',
    latex: 'a^2 + b^2 = c^2',
    explanation: 'The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (c) equals the sum of squares of the other two sides (a and b). Enter any two sides to find the third.',
    examples: [
      { label: '3, 4, 5 triangle', inputs: { sideA: 3, sideB: 4 } },
      { label: '5, 12, 13 triangle', inputs: { sideA: 5, sideB: 12 } },
    ],
    faq: [
      { q: 'What is the Pythagorean theorem?', a: 'It states that a^2 + b^2 = c^2 for any right triangle, where c is the hypotenuse (longest side).' },
      { q: 'Who discovered the Pythagorean theorem?', a: 'Named after Greek mathematician Pythagoras, but it was known to Babylonians and Indians centuries earlier.' },
    ],
    related: ['area'],
  },
  calculate: (inputs) => {
    const a = inputs.sideA; const b = inputs.sideB
    if (a <= 0 || b <= 0) return { hypotenuse: 0, area: 0, perimeter: 0 }
    const c = Math.sqrt(a * a + b * b)
    const area = (a * b) / 2
    const perimeter = a + b + c
    return { hypotenuse: parseFloat(c.toFixed(2)), area: parseFloat(area.toFixed(2)), perimeter: parseFloat(perimeter.toFixed(2)) }
  },
  format: (r) => ({
    'Hypotenuse (c)': String(r.hypotenuse),
    'Area': String(r.area),
    'Perimeter': String(r.perimeter),
  }),
}

export default pythagoreanCalculator
