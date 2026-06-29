import type { CalculatorDefinition, CalculatorCategory } from '@/types/calculator'

type CalculatorImport = () => Promise<CalculatorDefinition>

const registry: Record<string, CalculatorImport> = {
  // Finance
  emi: () => import('../../calculators/finance/emi').then((m) => m.default),
  sip: () => import('../../calculators/finance/sip').then((m) => m.default),
  fd: () => import('../../calculators/finance/fd').then((m) => m.default),
  'loan-comparison': () => import('../../calculators/finance/loan-comparison').then((m) => m.default),
  // Health
  bmi: () => import('../../calculators/health/bmi').then((m) => m.default),
  bmr: () => import('../../calculators/health/bmr').then((m) => m.default),
  calorie: () => import('../../calculators/health/calorie').then((m) => m.default),
  // Education
  gpa: () => import('../../calculators/education/gpa').then((m) => m.default),
  percentage: () => import('../../calculators/education/percentage').then((m) => m.default),
  cgpa: () => import('../../calculators/education/cgpa').then((m) => m.default),
  // Math
  pythagorean: () => import('../../calculators/math/pythagorean').then((m) => m.default),
  quadratic: () => import('../../calculators/math/quadratic').then((m) => m.default),
  area: () => import('../../calculators/math/area').then((m) => m.default),
  'system-of-equations': () => import('../../calculators/math/system-of-equations').then((m) => m.default),
  // Construction
  concrete: () => import('../../calculators/construction/concrete').then((m) => m.default),
  paint: () => import('../../calculators/construction/paint').then((m) => m.default),
  // DateTime
  age: () => import('../../calculators/datetime/age').then((m) => m.default),
  'date-diff': () => import('../../calculators/datetime/date-diff').then((m) => m.default),
  // Conversion
  length: () => import('../../calculators/conversion/length').then((m) => m.default),
  temperature: () => import('../../calculators/conversion/temperature').then((m) => m.default),
  // DevTools
  base64: () => import('../../calculators/devtools/base64').then((m) => m.default),
}

const categoryMap: Record<string, CalculatorCategory> = {
  emi: 'finance', sip: 'finance', fd: 'finance', 'loan-comparison': 'finance',
  bmi: 'health', bmr: 'health', calorie: 'health',
  gpa: 'education', percentage: 'education', cgpa: 'education',
  pythagorean: 'math', quadratic: 'math', area: 'math', 'system-of-equations': 'math',
  concrete: 'construction', paint: 'construction',
  age: 'datetime', 'date-diff': 'datetime',
  length: 'conversion', temperature: 'conversion',
  base64: 'devtools',
}

export function getCalculatorIds(category?: CalculatorCategory): { id: string; category: CalculatorCategory }[] {
  return Object.keys(registry)
    .filter((id) => !category || categoryMap[id] === category)
    .map((id) => ({ id, category: categoryMap[id] }))
}

export function getCalculatorImport(slug: string): CalculatorImport | undefined {
  return registry[slug]
}

export async function loadCalculator(slug: string): Promise<CalculatorDefinition | null> {
  const imp = getCalculatorImport(slug)
  if (!imp) return null
  try { return await imp() } catch { return null }
}

export interface CalculatorMetaEntry {
  id: string
  category: CalculatorCategory
  title: string
}

export const calculatorMetaMap: Record<string, CalculatorMetaEntry> = {
  // Finance
  emi:              { id: 'emi',              category: 'finance',      title: 'EMI Calculator' },
  sip:              { id: 'sip',              category: 'finance',      title: 'SIP Calculator' },
  fd:               { id: 'fd',               category: 'finance',      title: 'Fixed Deposit Calculator' },
  'loan-comparison': { id: 'loan-comparison', category: 'finance',      title: 'Loan Comparison Calculator' },
  // Health
  bmi:              { id: 'bmi',              category: 'health',       title: 'BMI Calculator' },
  bmr:              { id: 'bmr',              category: 'health',       title: 'BMR Calculator' },
  calorie:          { id: 'calorie',          category: 'health',       title: 'Calorie Intake Calculator' },
  // Education
  gpa:              { id: 'gpa',              category: 'education',    title: 'GPA Calculator' },
  percentage:       { id: 'percentage',       category: 'education',    title: 'Percentage Calculator' },
  cgpa:             { id: 'cgpa',             category: 'education',    title: 'CGPA Calculator' },
  // Math
  pythagorean:      { id: 'pythagorean',      category: 'math',         title: 'Pythagorean Theorem Calculator' },
  quadratic:        { id: 'quadratic',        category: 'math',         title: 'Quadratic Equation Solver' },
  area:             { id: 'area',             category: 'math',         title: 'Area Calculator' },
  'system-of-equations': { id: 'system-of-equations', category: 'math', title: 'System of Equations Solver' },
  // Construction
  concrete:         { id: 'concrete',         category: 'construction', title: 'Concrete Calculator' },
  paint:            { id: 'paint',            category: 'construction', title: 'Paint Calculator' },
  // DateTime
  age:              { id: 'age',              category: 'datetime',     title: 'Age Calculator' },
  'date-diff':      { id: 'date-diff',        category: 'datetime',     title: 'Date Difference Calculator' },
  // Conversion
  length:           { id: 'length',           category: 'conversion',   title: 'Length Converter' },
  temperature:      { id: 'temperature',      category: 'conversion',   title: 'Temperature Converter' },
  // DevTools
  base64:           { id: 'base64',           category: 'devtools',     title: 'Base64 Encoder / Decoder' },
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorMetaEntry[] {
  return Object.values(calculatorMetaMap).filter((e) => e.category === category)
}
