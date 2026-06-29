import type { CalculatorDefinition } from '@/types/calculator'

const concreteCalculator: CalculatorDefinition = {
  meta: {
    id: 'concrete',
    category: 'construction',
    title: 'Concrete Calculator',
    description: 'Estimate the volume of concrete needed for slabs, columns, and footings.',
    keywords: ['concrete', 'volume', 'slab', 'construction', 'building', 'materials'],
    featured: true,
  },
  schema: {
    inputs: [
      { id: 'length', label: 'Length (m)', type: 'number', default: 5, placeholder: '5', min: 0, step: 0.1, required: true },
      { id: 'width', label: 'Width (m)', type: 'number', default: 4, placeholder: '4', min: 0, step: 0.1, required: true },
      { id: 'depth', label: 'Depth (m)', type: 'number', default: 0.15, placeholder: '0.15', min: 0, step: 0.01, required: true },
    ],
    formula: 'Volume = Length × Width × Depth',
    latex: 'V = L \\times W \\times D',
    explanation: 'Calculate the volume of concrete needed for a slab by multiplying length, width, and depth. The result is in cubic meters. Add 5-10% for waste and spillage.',
    examples: [
      { label: '5m x 4m slab, 15cm thick', inputs: { length: 5, width: 4, depth: 0.15 } },
      { label: '10m x 6m slab, 20cm thick', inputs: { length: 10, width: 6, depth: 0.2 } },
    ],
    faq: [
      { q: 'How much extra concrete should I order?', a: 'Order 5-10% extra to account for spillage, uneven subgrade, and slight depth variations.' },
      { q: 'What is the concrete mix ratio?', a: 'Common mix ratios: 1:2:3 (cement:sand:aggregate) for general use, 1:1.5:3 for reinforced concrete.' },
    ],
    related: ['paint'],
  },
  calculate: (inputs) => {
    const l = inputs.length; const w = inputs.width; const d = inputs.depth
    if (l <= 0 || w <= 0 || d <= 0) return { volume: 0, volumeWithWaste: 0 }
    const vol = l * w * d
    return { volume: parseFloat(vol.toFixed(3)), volumeWithWaste: parseFloat((vol * 1.1).toFixed(3)) }
  },
  format: (r) => ({
    'Concrete Volume': `${r.volume} m\u00B3`,
    'With 10% Waste': `${r.volumeWithWaste} m\u00B3`,
  }),
}

export default concreteCalculator
