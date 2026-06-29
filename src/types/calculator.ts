export type CalculatorCategory =
  | 'finance'
  | 'health'
  | 'education'
  | 'math'
  | 'construction'
  | 'datetime'
  | 'conversion'
  | 'devtools'

export const CATEGORIES: Record<CalculatorCategory, { label: string; icon: string; description: string }> = {
  finance:       { label: 'Finance',       icon: 'chart',  description: 'Loans, investments, and financial planning' },
  health:        { label: 'Health',        icon: 'heart',  description: 'BMI, calories, and wellness metrics' },
  education:     { label: 'Education',     icon: 'book',   description: 'Grades, GPA, and academic tools' },
  math:          { label: 'Mathematics',   icon: 'sigma',  description: 'Algebra, geometry, and general math' },
  construction:  { label: 'Construction',  icon: 'hammer', description: 'Materials, area, and building estimates' },
  datetime:      { label: 'Date & Time',   icon: 'clock',  description: 'Date differences, age, and time conversions' },
  conversion:    { label: 'Unit Converter', icon: 'ruler',  description: 'Length, weight, temperature, and more' },
  devtools:      { label: 'Dev Tools',     icon: 'code',   description: 'Code utilities for developers' },
}

export interface CalculatorInput {
  id: string
  label: string
  type: 'number' | 'select' | 'text'
  default?: number | string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  options?: { label: string; value: string | number }[]
  required?: boolean
}

export interface CalculatorResult {
  [key: string]: number | string
}

export interface CalculatorMeta {
  id: string
  category: CalculatorCategory
  title: string
  description: string
  keywords: string[]
  icon?: string
  featured?: boolean
}

export interface CalculatorSchema {
  inputs: CalculatorInput[]
  formula: string
  latex: string
  explanation: string
  examples: { label: string; inputs: Record<string, number> }[]
  faq: { q: string; a: string }[]
  related: string[]
}

export interface CalculatorDefinition {
  meta: CalculatorMeta
  schema: CalculatorSchema
  calculate: (inputs: Record<string, any>) => CalculatorResult
  format?: (result: CalculatorResult) => Record<string, string>
}
