import type { CalculatorDefinition } from '@/types/calculator'

const areaCalculator: CalculatorDefinition = {
  meta: {
    id: 'area',
    category: 'math',
    title: 'Area Calculator',
    description: 'Calculate the area of common shapes: circle, rectangle, triangle, and more.',
    keywords: ['area', 'geometry', 'circle', 'rectangle', 'triangle', 'square', 'math'],
    featured: true,
  },
  schema: {
    inputs: [
      { id: 'shape', label: 'Shape', type: 'select', default: 'circle', options: [
        { label: 'Circle', value: 'circle' },
        { label: 'Rectangle', value: 'rectangle' },
        { label: 'Triangle', value: 'triangle' },
        { label: 'Square', value: 'square' },
      ]},
      { id: 'param1', label: 'Radius / Width / Base', type: 'number', default: 5, placeholder: '5', min: 0, step: 0.1, required: true },
      { id: 'param2', label: 'Height (for rect/triangle)', type: 'number', default: 3, placeholder: '3', min: 0, step: 0.1 },
    ],
    formula: 'Circle: pr^2 | Rectangle: l×w | Triangle: 0.5×b×h | Square: s^2',
    latex: '',
    explanation: 'Calculate the area of common geometric shapes. Select a shape and enter the required dimensions. For circles, enter the radius. For rectangles and triangles, enter both dimensions.',
    examples: [
      { label: 'Circle radius 5', inputs: { shape: 0 as unknown as number, param1: 5, param2: 0 } },
      { label: 'Rectangle 4x3', inputs: { shape: 0 as unknown as number, param1: 4, param2: 3 } },
    ],
    faq: [
      { q: 'What is the difference between area and perimeter?', a: 'Area measures the space inside a shape (2D), while perimeter measures the distance around it.' },
      { q: 'What units does this use?', a: 'The calculator returns area in square units of whatever unit you input. For example, if you enter meters, the area will be in square meters.' },
    ],
    related: ['pythagorean'],
  },
  calculate: (inputs) => {
    const shape = (inputs as any).shape as string || 'circle'
    const p1 = inputs.param1; const p2 = inputs.param2
    let area = 0; let perimeter = 0
    if (p1 <= 0) return { area: 0, perimeter: 0 }
    if (shape === 'circle') { area = Math.PI * p1 * p1; perimeter = 2 * Math.PI * p1 }
    else if (shape === 'square') { area = p1 * p1; perimeter = 4 * p1 }
    else if (shape === 'rectangle') { if (p2 <= 0) return { area: 0, perimeter: 0 }; area = p1 * p2; perimeter = 2 * (p1 + p2) }
    else if (shape === 'triangle') { if (p2 <= 0) return { area: 0, perimeter: 0 }; area = 0.5 * p1 * p2 }
    return { area: parseFloat(area.toFixed(4)), perimeter: shape === 'triangle' ? 0 : parseFloat(perimeter.toFixed(4)) }
  },
  format: (r) => {
    const res: Record<string, string> = { 'Area': String(r.area) }
    if ((r.perimeter as number) > 0) res['Perimeter'] = String(r.perimeter)
    return res
  },
}

export default areaCalculator
