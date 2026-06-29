import type { CalculatorDefinition } from '@/types/calculator'

const tempConverter: CalculatorDefinition = {
  meta: {
    id: 'temperature',
    category: 'conversion',
    title: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin.',
    keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'converter', 'units'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'value', label: 'Temperature', type: 'number', default: 100, placeholder: '100', min: -273.15, step: 0.1, required: true },
      { id: 'from', label: 'From', type: 'select', default: 'celsius', options: [
        { label: 'Celsius (°C)', value: 'celsius' },
        { label: 'Fahrenheit (°F)', value: 'fahrenheit' },
        { label: 'Kelvin (K)', value: 'kelvin' },
      ]},
    ],
    formula: '°F = (°C × 9/5) + 32 | K = °C + 273.15',
    latex: '\\degree F = \\degree C \\times \\frac{9}{5} + 32 \\quad K = \\degree C + 273.15',
    explanation: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin scales. Absolute zero is -273.15°C, -459.67°F, or 0K.',
    examples: [
      { label: '100°C', inputs: { value: 100, from: 0 as unknown as number } },
      { label: '98.6°F (body temperature)', inputs: { value: 98.6, from: 0 as unknown as number } },
    ],
    faq: [
      { q: 'What is absolute zero?', a: 'Absolute zero (0K = -273.15°C) is the lowest possible temperature where all molecular motion stops.' },
      { q: 'Why does the US use Fahrenheit?', a: 'The Fahrenheit scale was developed by Daniel Gabriel Fahrenheit in 1724 and remains the standard in the US for everyday use.' },
    ],
    related: ['length'],
  },
  calculate: (inputs) => {
    const value = inputs.value
    const from = (inputs as any).from as string || 'celsius'
    let celsius: number
    if (from === 'celsius') celsius = value
    else if (from === 'fahrenheit') celsius = (value - 32) * 5 / 9
    else celsius = value - 273.15
    const fahrenheit = celsius * 9 / 5 + 32
    const kelvin = celsius + 273.15
    return { celsius: parseFloat(celsius.toFixed(2)), fahrenheit: parseFloat(fahrenheit.toFixed(2)), kelvin: parseFloat(kelvin.toFixed(2)) }
  },
  format: (r) => ({
    'Celsius': `${r.celsius} \u00B0C`,
    'Fahrenheit': `${r.fahrenheit} \u00B0F`,
    'Kelvin': `${r.kelvin} K`,
  }),
}

export default tempConverter
