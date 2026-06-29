import type { CalculatorDefinition } from '@/types/calculator'

const ageCalculator: CalculatorDefinition = {
  meta: {
    id: 'age',
    category: 'datetime',
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    keywords: ['age', 'birthday', 'years', 'months', 'days', 'date of birth'],
    featured: true,
  },
  schema: {
    inputs: [
      { id: 'birthYear', label: 'Birth Year', type: 'number', default: 2000, placeholder: '2000', min: 1900, max: 2026, step: 1, required: true },
      { id: 'birthMonth', label: 'Birth Month (1-12)', type: 'number', default: 6, placeholder: '6', min: 1, max: 12, step: 1, required: true },
      { id: 'birthDay', label: 'Birth Day (1-31)', type: 'number', default: 15, placeholder: '15', min: 1, max: 31, step: 1, required: true },
    ],
    formula: 'Age = Current Date - Birth Date',
    latex: '',
    explanation: 'Calculate your exact age by subtracting your birth date from the current date. The calculator accounts for leap years and varying month lengths.',
    examples: [
      { label: 'Born June 15, 2000', inputs: { birthYear: 2000, birthMonth: 6, birthDay: 15 } },
      { label: 'Born January 1, 1990', inputs: { birthYear: 1990, birthMonth: 1, birthDay: 1 } },
    ],
    faq: [
      { q: 'How is age calculated legally?', a: 'Legally, a person attains a specific age on the day before their birthday. For example, if born on June 15, you turn 18 on June 14 at midnight.' },
      { q: 'Does this account for leap years?', a: 'Yes, the calculation accounts for leap years (February 29) in the date difference.' },
    ],
    related: ['date-diff'],
  },
  calculate: (inputs) => {
    const today = new Date()
    const by = inputs.birthYear; const bm = inputs.birthMonth; const bd = inputs.birthDay
    const birth = new Date(by, bm - 1, bd)
    if (isNaN(birth.getTime()) || birth > today) return { years: 0, months: 0, days: 0, totalDays: 0 }
    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()
    if (days < 0) { months--; const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0); days += prevMonth.getDate() }
    if (months < 0) { years--; months += 12 }
    const diffMs = today.getTime() - birth.getTime()
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    return { years, months, days, totalDays }
  },
  format: (r) => ({
    'Age': `${r.years} years, ${r.months} months, ${r.days} days`,
    'Total Days': String(r.totalDays),
  }),
}

export default ageCalculator
