import type { CalculatorDefinition } from '@/types/calculator'

const quadraticCalculator: CalculatorDefinition = {
  meta: {
    id: 'quadratic',
    category: 'math',
    title: 'Quadratic Equation Solver',
    description: 'Solve quadratic equations of the form ax^2 + bx + c = 0.',
    keywords: ['quadratic', 'equation', 'solver', 'algebra', 'roots', 'math'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'a', label: 'Coefficient a', type: 'number', default: 1, placeholder: '1', min: -100, max: 100, step: 0.5, required: true },
      { id: 'b', label: 'Coefficient b', type: 'number', default: -3, placeholder: '-3', min: -100, max: 100, step: 0.5, required: true },
      { id: 'c', label: 'Coefficient c', type: 'number', default: 2, placeholder: '2', min: -100, max: 100, step: 0.5, required: true },
    ],
    formula: 'x = (-b ± sqrt(b^2 - 4ac)) / (2a)',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    explanation: 'Solve quadratic equations using the quadratic formula. The discriminant (b^2 - 4ac) determines the nature of roots: positive = two real roots, zero = one real root, negative = two complex roots.',
    examples: [
      { label: 'x^2 - 3x + 2 = 0', inputs: { a: 1, b: -3, c: 2 } },
      { label: 'x^2 - 4 = 0', inputs: { a: 1, b: 0, c: -4 } },
    ],
    faq: [
      { q: 'What is the discriminant?', a: 'The discriminant is b^2 - 4ac. If positive, there are two real roots. If zero, one real root. If negative, two complex roots.' },
      { q: 'Can a be zero?', a: 'No, if a = 0, the equation becomes linear (bx + c = 0), not quadratic.' },
    ],
    related: ['pythagorean'],
  },
  calculate: (inputs) => {
    const a = inputs.a; const b = inputs.b; const c = inputs.c
    if (a === 0) return { root1: 'N/A', root2: 'N/A', discriminant: 0, nature: 'Not quadratic' }
    const d = b * b - 4 * a * c
    if (d > 0) {
      const r1 = (-b + Math.sqrt(d)) / (2 * a)
      const r2 = (-b - Math.sqrt(d)) / (2 * a)
      return { root1: parseFloat(r1.toFixed(4)), root2: parseFloat(r2.toFixed(4)), discriminant: parseFloat(d.toFixed(4)), nature: 'Two real roots' }
    } else if (d === 0) {
      const r = -b / (2 * a)
      return { root1: parseFloat(r.toFixed(4)), root2: parseFloat(r.toFixed(4)), discriminant: 0, nature: 'One real root' }
    } else {
      return { root1: 'Complex', root2: 'Complex', discriminant: parseFloat(d.toFixed(4)), nature: 'Two complex roots' }
    }
  },
  format: (r) => ({
    'Discriminant': String(r.discriminant),
    'Nature': r.nature as string,
    'Root 1': String(r.root1),
    'Root 2': String(r.root2),
  }),
}

export default quadraticCalculator
