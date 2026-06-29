import type { CalculatorDefinition } from '@/types/calculator'

const paintCalculator: CalculatorDefinition = {
  meta: {
    id: 'paint',
    category: 'construction',
    title: 'Paint Calculator',
    description: 'Estimate the amount of paint needed for walls and ceilings.',
    keywords: ['paint', 'painting', 'walls', 'home improvement', 'renovation', 'construction'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'length', label: 'Room Length (m)', type: 'number', default: 5, placeholder: '5', min: 0, step: 0.1, required: true },
      { id: 'width', label: 'Room Width (m)', type: 'number', default: 4, placeholder: '4', min: 0, step: 0.1, required: true },
      { id: 'height', label: 'Room Height (m)', type: 'number', default: 2.7, placeholder: '2.7', min: 0, step: 0.1, required: true },
      { id: 'coats', label: 'Number of Coats', type: 'number', default: 2, placeholder: '2', min: 1, max: 5, step: 1, required: true },
      { id: 'coverage', label: 'Paint Coverage (m/L)', type: 'number', default: 11, placeholder: '11', min: 1, step: 0.5, required: true },
    ],
    formula: 'Total Area = 2(L+W) × H + L×W (ceiling) | Paint Needed = Area × Coats / Coverage',
    latex: '',
    explanation: 'Calculate how much paint you need for a room. The formula calculates the total wall area (perimeter × height) plus the ceiling area, then divides by the paint coverage rate.',
    examples: [
      { label: '5x4m room, 2.7m height, 2 coats', inputs: { length: 5, width: 4, height: 2.7, coats: 2, coverage: 11 } },
      { label: '6x5m room, 3m height, 1 coat', inputs: { length: 6, width: 5, height: 3, coats: 1, coverage: 12 } },
    ],
    faq: [
      { q: 'How much paint do I need for one wall?', a: 'Measure the wall width and height, multiply them, then divide by the paint coverage (usually 10-12 sq m per liter).' },
      { q: 'Should I buy extra paint?', a: 'Yes, buy 10% extra for touch-ups and uneven surfaces. Paint calculators provide estimates, not exact amounts.' },
    ],
    related: ['concrete'],
  },
  calculate: (inputs) => {
    const l = inputs.length; const w = inputs.width; const h = inputs.height
    const coats = inputs.coats; const coverage = inputs.coverage
    if (l <= 0 || w <= 0 || h <= 0 || coats <= 0 || coverage <= 0) return { wallArea: 0, ceilingArea: 0, totalArea: 0, litersNeeded: 0 }
    const wallArea = 2 * (l + w) * h
    const ceilingArea = l * w
    const totalArea = wallArea + ceilingArea
    const liters = (totalArea * coats) / coverage
    return { wallArea: parseFloat(wallArea.toFixed(2)), ceilingArea: parseFloat(ceilingArea.toFixed(2)), totalArea: parseFloat(totalArea.toFixed(2)), litersNeeded: Math.ceil(liters * 2) / 2 }
  },
  format: (r) => ({
    'Wall Area': `${r.wallArea} m\u00B2`,
    'Ceiling Area': `${r.ceilingArea} m\u00B2`,
    'Total Area': `${r.totalArea} m\u00B2`,
    'Paint Needed': `${r.litersNeeded} litres`,
  }),
}

export default paintCalculator
