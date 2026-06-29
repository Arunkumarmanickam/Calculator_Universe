import type { CalculatorDefinition } from '@/types/calculator'

const sipCalculator: CalculatorDefinition = {
  meta: {
    id: 'sip',
    category: 'finance',
    title: 'SIP Calculator',
    description: 'Calculate the future value of your systematic investment plan.',
    keywords: ['SIP', 'mutual fund', 'investment', 'systematic investment plan', 'wealth'],
    featured: true,
  },
  schema: {
    inputs: [
      { id: 'monthly', label: 'Monthly Investment', type: 'number', default: 5000, placeholder: '5000', min: 100, step: 100, required: true },
      { id: 'rate', label: 'Expected Return (%)', type: 'number', default: 12, placeholder: '12', min: 0, step: 0.5, required: true },
      { id: 'years', label: 'Investment Period (years)', type: 'number', default: 10, placeholder: '10', min: 1, max: 50, step: 1, required: true },
    ],
    formula: 'FV = P × [((1 + r)^n - 1) / r] × (1 + r)',
    latex: 'FV = P \\times \\frac{(1 + r)^n - 1}{r} \\times (1 + r)',
    explanation: 'SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly in mutual funds. The future value is calculated using the compound interest formula with monthly compounding.',
    examples: [
      { label: '₹5,000/month at 12% for 10 years', inputs: { monthly: 5000, rate: 12, years: 10 } },
      { label: '₹10,000/month at 15% for 20 years', inputs: { monthly: 10000, rate: 15, years: 20 } },
    ],
    faq: [
      { q: 'What is SIP?', a: 'SIP stands for Systematic Investment Plan. It is a method of investing a fixed amount in mutual funds at regular intervals (usually monthly).' },
      { q: 'Are SIP returns guaranteed?', a: 'No, SIP returns depend on market performance. The calculator uses an expected return rate for estimation purposes only.' },
    ],
    related: ['emi', 'fd'],
  },
  calculate: (inputs) => {
    const p = inputs.monthly
    const annualRate = inputs.rate
    const years = inputs.years
    const r = annualRate / 12 / 100
    const n = years * 12
    if (p <= 0 || annualRate <= 0 || years <= 0) return { totalInvestment: 0, estimatedReturns: 0, totalValue: 0 }
    const fv = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    const invested = p * n
    return { totalInvestment: Math.round(invested), estimatedReturns: Math.round(fv - invested), totalValue: Math.round(fv) }
  },
  format: (r) => ({
    'Total Investment': `₹${(r.totalInvestment as number).toLocaleString('en-IN')}`,
    'Estimated Returns': `₹${(r.estimatedReturns as number).toLocaleString('en-IN')}`,
    'Total Value': `₹${(r.totalValue as number).toLocaleString('en-IN')}`,
  }),
}

export default sipCalculator
