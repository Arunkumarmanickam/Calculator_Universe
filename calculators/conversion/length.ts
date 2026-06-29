import type { CalculatorDefinition } from '@/types/calculator'

const lengthConverter: CalculatorDefinition = {
  meta: {
    id: 'length',
    category: 'conversion',
    title: 'Length Converter',
    description: 'Convert between meters, kilometers, miles, feet, inches, and more.',
    keywords: ['length', 'converter', 'meters', 'feet', 'inches', 'kilometers', 'miles', 'units'],
    featured: true,
  },
  schema: {
    inputs: [
      { id: 'value', label: 'Value', type: 'number', default: 100, placeholder: '100', min: 0, step: 1, required: true },
      { id: 'from', label: 'From', type: 'select', default: 'm', options: [
        { label: 'Millimeters (mm)', value: 'mm' },
        { label: 'Centimeters (cm)', value: 'cm' },
        { label: 'Meters (m)', value: 'm' },
        { label: 'Kilometers (km)', value: 'km' },
        { label: 'Inches (in)', value: 'in' },
        { label: 'Feet (ft)', value: 'ft' },
        { label: 'Yards (yd)', value: 'yd' },
        { label: 'Miles (mi)', value: 'mi' },
      ]},
      { id: 'to', label: 'To', type: 'select', default: 'ft', options: [
        { label: 'Millimeters (mm)', value: 'mm' },
        { label: 'Centimeters (cm)', value: 'cm' },
        { label: 'Meters (m)', value: 'm' },
        { label: 'Kilometers (km)', value: 'km' },
        { label: 'Inches (in)', value: 'in' },
        { label: 'Feet (ft)', value: 'ft' },
        { label: 'Yards (yd)', value: 'yd' },
        { label: 'Miles (mi)', value: 'mi' },
      ]},
    ],
    formula: 'Result = Value × (Conversion Factor)',
    latex: '',
    explanation: 'Convert between different units of length. The calculator uses standard conversion factors to convert from any unit to any other unit via a common base (meters).',
    examples: [
      { label: '100 meters to feet', inputs: { value: 100, from: 0 as unknown as number, to: 0 as unknown as number } },
      { label: '1 mile to kilometers', inputs: { value: 1, from: 0 as unknown as number, to: 0 as unknown as number } },
    ],
    faq: [
      { q: 'What is the base unit?', a: 'All conversions go through meters. Each unit is converted to meters first, then to the target unit.' },
      { q: 'Are these US or imperial units?', a: 'We use the international standard: 1 foot = 0.3048 meters (exactly). US survey feet differ slightly.' },
    ],
    related: ['temperature'],
  },
  calculate: (inputs) => {
    const value = inputs.value
    const from = (inputs as any).from as string || 'm'
    const to = (inputs as any).to as string || 'ft'
    const toMeters: Record<string, number> = { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 }
    const inMeters = value * (toMeters[from] || 1)
    const result = inMeters / (toMeters[to] || 1)
    return { result: parseFloat(result.toFixed(6)) }
  },
  format: (r) => ({
    'Result': String(r.result),
  }),
}

export default lengthConverter
