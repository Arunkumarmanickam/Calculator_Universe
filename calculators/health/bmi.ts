import type { CalculatorDefinition } from '@/types/calculator'

const bmiCalculator: CalculatorDefinition = {
  meta: {
    id: 'bmi',
    category: 'health',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and understand your weight category.',
    keywords: ['BMI', 'body mass index', 'weight', 'health', 'obesity', 'fitness'],
    featured: true,
  },
  schema: {
    inputs: [
      { id: 'weight', label: 'Weight (kg)', type: 'number', default: 70, placeholder: '70', min: 1, max: 500, step: 0.1, required: true },
      { id: 'height', label: 'Height (cm)', type: 'number', default: 175, placeholder: '175', min: 50, max: 300, step: 0.5, required: true },
    ],
    formula: 'BMI = weight(kg) / height(m)^2',
    latex: 'BMI = \\frac{weight}{height^2}',
    explanation: 'Body Mass Index (BMI) is a simple measure of body fat based on height and weight. It applies to adult men and women. BMI categories: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (>=30).',
    examples: [
      { label: '70 kg at 175 cm', inputs: { weight: 70, height: 175 } },
      { label: '85 kg at 170 cm', inputs: { weight: 85, height: 170 } },
    ],
    faq: [
      { q: 'What is a healthy BMI?', a: 'A BMI between 18.5 and 24.9 is considered healthy. Below 18.5 is underweight, and above 25 is overweight.' },
      { q: 'Does BMI work for athletes?', a: 'BMI may overestimate body fat in athletes and muscular individuals since it does not distinguish between muscle and fat.' },
    ],
    related: ['bmr', 'calorie'],
  },
  calculate: (inputs) => {
    const w = inputs.weight
    const hCm = inputs.height
    if (w <= 0 || hCm <= 0) return { bmi: 0, category: '--' }
    const hM = hCm / 100
    const bmi = w / (hM * hM)
    let category: string
    if (bmi < 18.5) category = 'Underweight'
    else if (bmi < 25) category = 'Normal'
    else if (bmi < 30) category = 'Overweight'
    else category = 'Obese'
    return { bmi: parseFloat(bmi.toFixed(1)), category }
  },
  format: (r) => ({
    'BMI': String(r.bmi),
    'Category': r.category as string,
  }),
}

export default bmiCalculator
