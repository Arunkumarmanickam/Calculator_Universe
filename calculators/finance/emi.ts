import type { CalculatorDefinition } from '@/types/calculator'

const emiCalculator: CalculatorDefinition = {
  meta: {
    id: 'emi',
    category: 'finance',
    title: 'EMI Calculator',
    description: 'Calculate your monthly loan EMI, total interest, and total payment.',
    keywords: ['EMI', 'loan', 'equated monthly installment', 'home loan', 'car loan', 'finance'],
    featured: true,
  },
  schema: {
    inputs: [
      { id: 'principal', label: 'Loan Amount', type: 'number', default: 100000, placeholder: '100000', min: 0, step: 1000, required: true },
      { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 8.5, placeholder: '8.5', min: 0, step: 0.1, required: true },
      { id: 'tenure', label: 'Loan Tenure (years)', type: 'number', default: 5, placeholder: '5', min: 1, max: 30, step: 1, required: true },
    ],
    formula: 'EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)',
    latex: 'EMI = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}',
    explanation: 'EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay a loan. It consists of both principal and interest components. The formula uses the loan amount (P), monthly interest rate (r = annual rate / 12 / 100), and number of monthly installments (n = tenure × 12).',
    examples: [
      { label: 'Home loan of ₹50L at 8% for 20 years', inputs: { principal: 5000000, rate: 8, tenure: 20 } },
      { label: 'Car loan of ₹10L at 9% for 5 years', inputs: { principal: 1000000, rate: 9, tenure: 5 } },
    ],
    faq: [
      { q: 'What is EMI?', a: 'EMI stands for Equated Monthly Installment. It is the fixed amount you pay each month to repay a loan within a specified tenure.' },
      { q: 'How is EMI calculated?', a: 'EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the loan amount, r is the monthly interest rate, and n is the number of monthly installments.' },
      { q: 'Can I prepay my loan?', a: 'Most lenders allow partial or full prepayment. Some may charge a prepayment penalty. Check with your lender for their specific policy.' },
    ],
    related: ['sip-calculator', 'loan-comparison'],
  },
  calculate: (inputs) => {
    const p = inputs.principal
    const annualRate = inputs.rate
    const years = inputs.tenure

    const r = annualRate / 12 / 100
    const n = years * 12

    if (p <= 0 || annualRate <= 0 || years <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 }
    }

    const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const totalPayment = emi * n
    const totalInterest = totalPayment - p

    return { emi: Math.round(emi), totalInterest: Math.round(totalInterest), totalPayment: Math.round(totalPayment) }
  },
  format: (result) => ({
    'Monthly EMI': `₹${(result.emi as number).toLocaleString('en-IN')}`,
    'Total Interest': `₹${(result.totalInterest as number).toLocaleString('en-IN')}`,
    'Total Payment': `₹${(result.totalPayment as number).toLocaleString('en-IN')}`,
  }),
}

export default emiCalculator
