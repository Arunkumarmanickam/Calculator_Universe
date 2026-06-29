import type { CalculatorDefinition } from '@/types/calculator'

const loanComparisonCalculator: CalculatorDefinition = {
  meta: {
    id: 'loan-comparison',
    category: 'finance',
    title: 'Loan Comparison Calculator',
    description: 'Compare two loan options side by side to find the best deal.',
    keywords: ['loan comparison', 'interest rate', 'EMI', 'loan', 'finance', 'compare'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'principal', label: 'Loan Amount', type: 'number', default: 100000, placeholder: '100000', min: 0, step: 1000, required: true },
      { id: 'rate1', label: 'Option 1 - Interest Rate (%)', type: 'number', default: 8.5, placeholder: '8.5', min: 0, step: 0.1, required: true },
      { id: 'tenure1', label: 'Option 1 - Tenure (years)', type: 'number', default: 5, placeholder: '5', min: 1, max: 30, step: 1, required: true },
      { id: 'rate2', label: 'Option 2 - Interest Rate (%)', type: 'number', default: 9, placeholder: '9', min: 0, step: 0.1, required: true },
      { id: 'tenure2', label: 'Option 2 - Tenure (years)', type: 'number', default: 4, placeholder: '4', min: 1, max: 30, step: 1, required: true },
    ],
    formula: 'Compare EMI, total interest, and total payment between two loan options.',
    latex: '',
    explanation: 'Compare two loan options side by side to see which one saves you money. Consider both the interest rate and tenure, as a lower rate with longer tenure may cost more in total interest.',
    examples: [
      { label: '8.5% for 5 years vs 9% for 4 years', inputs: { principal: 100000, rate1: 8.5, tenure1: 5, rate2: 9, tenure2: 4 } },
      { label: '7% for 20 years vs 8% for 15 years', inputs: { principal: 5000000, rate1: 7, tenure1: 20, rate2: 8, tenure2: 15 } },
    ],
    faq: [
      { q: 'Should I choose lower rate or shorter tenure?', a: 'A lower rate saves on interest, but a shorter tenure reduces the total payment period. Use this calculator to compare the total cost of both options.' },
      { q: 'What other factors should I consider?', a: 'Processing fees, prepayment charges, and hidden costs can affect the total loan cost. Always read the fine print.' },
    ],
    related: ['emi', 'sip'],
  },
  calculate: (inputs) => {
    const p = inputs.principal
    const r1 = inputs.rate1 / 12 / 100; const n1 = inputs.tenure1 * 12
    const r2 = inputs.rate2 / 12 / 100; const n2 = inputs.tenure2 * 12
    if (p <= 0 || r1 <= 0 || n1 <= 0 || r2 <= 0 || n2 <= 0) return { emi1: 0, total1: 0, interest1: 0, emi2: 0, total2: 0, interest2: 0, savings: 0 }
    const emi1 = p * r1 * Math.pow(1 + r1, n1) / (Math.pow(1 + r1, n1) - 1)
    const emi2 = p * r2 * Math.pow(1 + r2, n2) / (Math.pow(1 + r2, n2) - 1)
    const total1 = emi1 * n1; const total2 = emi2 * n2
    const interest1 = total1 - p; const interest2 = total2 - p
    return {
      emi1: Math.round(emi1), total1: Math.round(total1), interest1: Math.round(interest1),
      emi2: Math.round(emi2), total2: Math.round(total2), interest2: Math.round(interest2),
      savings: Math.round(Math.abs(interest1 - interest2)),
    }
  },
  format: (r) => ({
    'Option 1 - Monthly EMI': `\u20B9${(r.emi1 as number).toLocaleString('en-IN')}`,
    'Option 1 - Total Payment': `\u20B9${(r.total1 as number).toLocaleString('en-IN')}`,
    'Option 1 - Total Interest': `\u20B9${(r.interest1 as number).toLocaleString('en-IN')}`,
    'Option 2 - Monthly EMI': `\u20B9${(r.emi2 as number).toLocaleString('en-IN')}`,
    'Option 2 - Total Payment': `\u20B9${(r.total2 as number).toLocaleString('en-IN')}`,
    'Option 2 - Total Interest': `\u20B9${(r.interest2 as number).toLocaleString('en-IN')}`,
    'Interest Difference': `\u20B9${(r.savings as number).toLocaleString('en-IN')}`,
  }),
}

export default loanComparisonCalculator
