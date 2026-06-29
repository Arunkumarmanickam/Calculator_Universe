import type { CalculatorDefinition } from '@/types/calculator'
import { solveLinearSystem } from '@/lib/linear-system'

const systemEquationsCalculator: CalculatorDefinition = {
  meta: {
    id: 'system-of-equations',
    category: 'math',
    title: 'System of Equations Solver',
    description: 'Solve systems of linear equations. Enter equations like "2x + 3y = 10" and get the values of all variables.',
    keywords: ['system of equations', 'linear equations', 'algebra', 'solver', 'simultaneous equations', 'x y z'],
    featured: true,
  },
  schema: {
    inputs: [
      { id: 'numEquations', label: 'Number of Equations', type: 'number', default: 2, placeholder: '2', min: 2, max: 6, step: 1, required: true },
    ],
    formula: 'A system of linear equations is solved using Gaussian elimination with partial pivoting.',
    latex: '',
    explanation: 'Enter each equation in the format "2x + 3y = 10" (one per line). Use any variable names (like a, b, c or x, y, z). The solver uses Gaussian elimination to find the values of all variables. Supports 2 to 6 equations.',
    examples: [
      { label: 'a + b = 10, b + c = 20, a + c = 30', inputs: { numEquations: 3 } },
      { label: 'x + y = 10, x - y = 2', inputs: { numEquations: 2 } },
    ],
    faq: [
      { q: 'What format should I use?', a: 'Write equations like "2x + 3y = 10" or "a - b + c = 5". Use + and - for addition/subtraction. The equal sign separates left and right sides. Spaces are optional.' },
      { q: 'How many equations can I solve?', a: 'You can solve 2 to 6 equations. The number of equations should match the number of variables for a unique solution.' },
      { q: 'What if there is no solution?', a: 'If the system has no solution (inconsistent) or infinitely many solutions (underdetermined), the calculator will show an error message.' },
    ],
    related: ['quadratic', 'pythagorean'],
  },
  calculate: (inputs) => {
    const raw = (inputs as any).equationStrings as string | undefined
    if (!raw) return { status: 'Enter your equations below' }

    const lines = raw.split('\n').map((l: string) => l.trim()).filter(Boolean)
    if (lines.length === 0) return { status: 'Enter your equations below' }

    try {
      const result = solveLinearSystem(lines)
      if (!result) return { status: 'No unique solution. Check that the number of equations matches the number of variables and the system is not dependent.' }

      const output: Record<string, any> = { status: 'Solved' }
      for (const [v, val] of Object.entries(result)) {
        output[v] = val
      }
      return output
    } catch (e: any) {
      return { status: `Error: ${e.message || 'Invalid equation format'}` }
    }
  },
  format: (result) => {
    const out: Record<string, string> = {}
    for (const [key, val] of Object.entries(result)) {
      if (key === 'status') {
        out['Status'] = String(val)
      } else {
        out[key] = String(val)
      }
    }
    return out
  },
}

export default systemEquationsCalculator
