import type { CalculatorDefinition } from '@/types/calculator'

const cgpaCalculator: CalculatorDefinition = {
  meta: {
    id: 'cgpa',
    category: 'education',
    title: 'CGPA Calculator',
    description: 'Calculate your Cumulative Grade Point Average across semesters.',
    keywords: ['CGPA', 'cumulative GPA', 'semester', 'grades', 'academic', 'university'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'totalPoints', label: 'Total Grade Points (all semesters)', type: 'number', default: 120, placeholder: '120', min: 0, step: 1, required: true },
      { id: 'totalCredits', label: 'Total Credits Attempted', type: 'number', default: 40, placeholder: '40', min: 1, step: 1, required: true },
      { id: 'currentSemGpa', label: 'Current Semester GPA', type: 'number', default: 3.5, placeholder: '3.5', min: 0, max: 4, step: 0.1, required: true },
      { id: 'currentSemCredits', label: 'Current Semester Credits', type: 'number', default: 15, placeholder: '15', min: 1, step: 1, required: true },
    ],
    formula: 'CGPA = Total Grade Points / Total Credits | New CGPA = (Total Points + Current Points) / (Total Credits + Current Credits)',
    latex: '',
    explanation: 'CGPA (Cumulative Grade Point Average) represents your overall academic performance across all semesters. Enter your previous total grade points and credits, along with your current semester GPA and credits, to see how your CGPA changes.',
    examples: [
      { label: 'Previous 120 pts in 40 credits, now 3.5 in 15 credits', inputs: { totalPoints: 120, totalCredits: 40, currentSemGpa: 3.5, currentSemCredits: 15 } },
    ],
    faq: [
      { q: 'What is the difference between GPA and CGPA?', a: 'GPA is for a single semester, while CGPA averages across all completed semesters.' },
      { q: 'Can CGPA decrease?', a: 'Yes, if your current semester GPA is lower than your existing CGPA, the cumulative average will decrease.' },
    ],
    related: ['gpa', 'percentage'],
  },
  calculate: (inputs) => {
    const tp = inputs.totalPoints; const tc = inputs.totalCredits
    const sg = inputs.currentSemGpa; const sc = inputs.currentSemCredits
    if (tc <= 0 || sc <= 0) return { previousCgpa: 0, newCgpa: 0, change: '0' }
    const prevCgpa = parseFloat((tp / tc).toFixed(2))
    const newPoints = tp + sg * sc
    const newCredits = tc + sc
    const newCgpa = parseFloat((newPoints / newCredits).toFixed(2))
    const change = parseFloat((newCgpa - prevCgpa).toFixed(2))
    return { previousCgpa: prevCgpa, newCgpa, change: change >= 0 ? `+${change}` : String(change) }
  },
  format: (r) => ({
    'Previous CGPA': String(r.previousCgpa),
    'New CGPA': String(r.newCgpa),
    'Change': r.change as string,
  }),
}

export default cgpaCalculator
