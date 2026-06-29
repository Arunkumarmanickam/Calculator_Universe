import type { CalculatorDefinition } from '@/types/calculator'

const fdCalculator: CalculatorDefinition = {
  meta: {
    id: 'fd',
    category: 'finance',
    title: 'Fixed Deposit Calculator',
    description: 'Calculate the maturity amount and interest earned on fixed deposits.',
    keywords: ['FD', 'fixed deposit', 'term deposit', 'interest', 'maturity', 'banking'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'principal', label: 'Deposit Amount', type: 'number', default: 100000, placeholder: '100000', min: 0, step: 1000, required: true },
      { id: 'rate', label: 'Interest Rate (%)', type: 'number', default: 7, placeholder: '7', min: 0, step: 0.1, required: true },
      { id: 'years', label: 'Tenure (years)', type: 'number', default: 3, placeholder: '3', min: 0.5, max: 10, step: 0.5, required: true },
    ],
    formula: 'A = P × (1 + r/n)^(n×t)',
    latex: 'A = P \\times (1 + \\frac{r}{n})^{n \\times t}',
    explanation: 'Fixed Deposits are term investments offered by banks with higher interest rates than savings accounts. Interest is compounded quarterly (n=4) for most banks.',
    examples: [
      { label: '₹1L at 7% for 3 years', inputs: { principal: 100000, rate: 7, years: 3 } },
      { label: '₹5L at 8.5% for 5 years', inputs: { principal: 500000, rate: 8.5, years: 5 } },
    ],
    faq: [
      { q: 'Is FD interest taxable?', a: 'Yes, interest earned on FDs is taxable as per your income tax slab. TDS is deducted if interest exceeds ₹40,000 (₹50,000 for senior citizens).' },
      { q: 'Can I break an FD early?', a: 'Yes, but most banks charge a penalty of 0.5-1% on the applicable interest rate for premature withdrawal.' },
    ],
    related: ['emi', 'sip'],
  },
  calculate: (inputs) => {
    const p = inputs.principal
    const r = inputs.rate / 100
    const t = inputs.years
    const n = 4
    if (p <= 0 || r <= 0 || t <= 0) return { maturityAmount: 0, totalInterest: 0 }
    const amount = p * Math.pow(1 + r / n, n * t)
    return { maturityAmount: Math.round(amount), totalInterest: Math.round(amount - p) }
  },
  format: (r) => ({
    'Maturity Amount': `₹${(r.maturityAmount as number).toLocaleString('en-IN')}`,
    'Total Interest': `₹${(r.totalInterest as number).toLocaleString('en-IN')}`,
  }),
}

export default fdCalculator
