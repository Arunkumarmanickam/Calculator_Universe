import type { CalculatorDefinition } from '@/types/calculator'

const gpaCalculator: CalculatorDefinition = {
  meta: {
    id: 'gpa',
    category: 'education',
    title: 'GPA Calculator',
    description: 'Calculate your Grade Point Average on a 4.0 scale.',
    keywords: ['GPA', 'grade point average', 'grades', 'college', 'university', 'academic'],
    featured: true,
  },
  schema: {
    inputs: [
      { id: 'subjects', label: 'Number of Subjects', type: 'number', default: 5, placeholder: '5', min: 1, max: 15, step: 1, required: true },
      { id: 'totalPoints', label: 'Total Grade Points', type: 'number', default: 17, placeholder: '17', min: 0, step: 0.5, required: true },
      { id: 'totalCredits', label: 'Total Credits', type: 'number', default: 5, placeholder: '5', min: 1, step: 1, required: true },
    ],
    formula: 'GPA = Total Grade Points / Total Credits',
    latex: 'GPA = \\frac{\\sum (Grade \\times Credit)}{\\sum Credits}',
    explanation: 'GPA (Grade Point Average) is calculated by dividing the total grade points earned by the total credits attempted. Grade points are typically: A=4.0, B=3.0, C=2.0, D=1.0, F=0.0.',
    examples: [
      { label: '17 points across 5 subjects (simple GPA)', inputs: { subjects: 5, totalPoints: 17, totalCredits: 5 } },
      { label: '45 points across 15 credits', inputs: { subjects: 6, totalPoints: 45, totalCredits: 15 } },
    ],
    faq: [
      { q: 'What is a good GPA?', a: 'In most US universities, a GPA above 3.0 is considered good, above 3.5 is excellent, and 4.0 is perfect.' },
      { q: 'How is GPA different from percentage?', a: 'GPA is a weighted average based on credit hours, while percentage is a simple average of marks. Different scales (4.0, 10.0, etc.) are used globally.' },
    ],
    related: ['percentage'],
  },
  calculate: (inputs) => {
    const tp = inputs.totalPoints; const tc = inputs.totalCredits
    if (tc <= 0) return { gpa: 0, grade: '--' }
    const gpa = tp / tc
    const rounded = parseFloat(gpa.toFixed(2))
    let grade: string
    if (rounded >= 3.7) grade = 'A'
    else if (rounded >= 3.0) grade = 'B'
    else if (rounded >= 2.0) grade = 'C'
    else if (rounded >= 1.0) grade = 'D'
    else grade = 'F'
    return { gpa: rounded, grade }
  },
  format: (r) => ({
    'GPA': String(r.gpa),
    'Letter Grade': r.grade as string,
  }),
}

export default gpaCalculator
