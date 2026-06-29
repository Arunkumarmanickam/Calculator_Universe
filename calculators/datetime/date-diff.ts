import type { CalculatorDefinition } from '@/types/calculator'

const dateDiffCalculator: CalculatorDefinition = {
  meta: {
    id: 'date-diff',
    category: 'datetime',
    title: 'Date Difference Calculator',
    description: 'Calculate the exact difference between two dates.',
    keywords: ['date difference', 'days between', 'date calculator', 'time between'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'startYear', label: 'Start Year', type: 'number', default: 2025, placeholder: '2025', min: 1900, max: 2100, step: 1, required: true },
      { id: 'startMonth', label: 'Start Month', type: 'number', default: 1, placeholder: '1', min: 1, max: 12, step: 1, required: true },
      { id: 'startDay', label: 'Start Day', type: 'number', default: 1, placeholder: '1', min: 1, max: 31, step: 1, required: true },
      { id: 'endYear', label: 'End Year', type: 'number', default: 2025, placeholder: '2025', min: 1900, max: 2100, step: 1, required: true },
      { id: 'endMonth', label: 'End Month', type: 'number', default: 12, placeholder: '12', min: 1, max: 12, step: 1, required: true },
      { id: 'endDay', label: 'End Day', type: 'number', default: 31, placeholder: '31', min: 1, max: 31, step: 1, required: true },
    ],
    formula: 'Duration = End Date - Start Date',
    latex: '',
    explanation: 'Calculate the exact duration between any two dates. Useful for project planning, countdowns, and tenure calculations.',
    examples: [
      { label: 'Jan 1 to Dec 31, 2025', inputs: { startYear: 2025, startMonth: 1, startDay: 1, endYear: 2025, endMonth: 12, endDay: 31 } },
      { label: 'Jan 1, 2020 to Jan 1, 2030', inputs: { startYear: 2020, startMonth: 1, startDay: 1, endYear: 2030, endMonth: 1, endDay: 1 } },
    ],
    faq: [
      { q: 'Does this include both start and end dates?', a: 'The calculation is exclusive of the start date and inclusive of the end date, counting full 24-hour periods between them.' },
      { q: 'Can I calculate business days?', a: 'This calculator gives calendar days. For business days (excluding weekends), you would need a separate tool.' },
    ],
    related: ['age'],
  },
  calculate: (inputs) => {
    const start = new Date(inputs.startYear, inputs.startMonth - 1, inputs.startDay)
    const end = new Date(inputs.endYear, inputs.endMonth - 1, inputs.endDay)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return { years: 0, months: 0, days: 0, totalDays: 0 }
    if (end < start) return { years: 0, months: 0, days: 0, totalDays: 0 }
    const diffMs = end.getTime() - start.getTime()
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()
    let days = end.getDate() - start.getDate()
    if (days < 0) { months--; const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0); days += prevMonth.getDate() }
    if (months < 0) { years--; months += 12 }
    return { years, months, days, totalDays }
  },
  format: (r) => ({
    'Duration': `${r.years} years, ${r.months} months, ${r.days} days`,
    'Total Days': String(r.totalDays),
  }),
}

export default dateDiffCalculator
