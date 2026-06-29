import type { CalculatorDefinition } from '@/types/calculator'

const percentageCalculator: CalculatorDefinition = {
  meta: {
    id: 'percentage',
    category: 'education',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, marks, and grade conversions easily.',
    keywords: ['percentage', 'marks', 'grade', 'exam', 'result', 'academic'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'obtained', label: 'Marks Obtained', type: 'number', default: 85, placeholder: '85', min: 0, step: 0.5, required: true },
      { id: 'total', label: 'Total Marks', type: 'number', default: 100, placeholder: '100', min: 1, step: 0.5, required: true },
    ],
    formula: 'Percentage = (Obtained / Total) × 100',
    latex: '\\% = \\frac{Obtained}{Total} \\times 100',
    explanation: 'Percentage is a simple way to express a proportion. Divide the obtained marks by the total marks and multiply by 100 to get the percentage.',
    examples: [
      { label: '85 out of 100', inputs: { obtained: 85, total: 100 } },
      { label: '450 out of 500', inputs: { obtained: 450, total: 500 } },
    ],
    faq: [
      { q: 'How do I calculate percentage increase?', a: 'Percentage increase = ((New - Original) / Original) × 100. For example, if a price goes from 100 to 120, the increase is 20%.' },
      { q: 'What is a passing percentage?', a: 'This varies by institution. Typically 33-40% is the minimum passing percentage in most education systems.' },
    ],
    related: ['gpa'],
  },
  calculate: (inputs) => {
    const o = inputs.obtained; const t = inputs.total
    if (t <= 0) return { percentage: 0 }
    const pct = (o / t) * 100
    return { percentage: parseFloat(pct.toFixed(2)) }
  },
  format: (r) => ({
    'Percentage': `${r.percentage}%`,
  }),
}

export default percentageCalculator
