import type { CalculatorDefinition } from '@/types/calculator'

const bmrCalculator: CalculatorDefinition = {
  meta: {
    id: 'bmr',
    category: 'health',
    title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate and daily calorie needs.',
    keywords: ['BMR', 'basal metabolic rate', 'calories', 'metabolism', 'weight loss', 'fitness'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'weight', label: 'Weight (kg)', type: 'number', default: 70, placeholder: '70', min: 1, max: 500, step: 0.1, required: true },
      { id: 'height', label: 'Height (cm)', type: 'number', default: 175, placeholder: '175', min: 50, max: 300, step: 0.5, required: true },
      { id: 'age', label: 'Age (years)', type: 'number', default: 30, placeholder: '30', min: 1, max: 120, step: 1, required: true },
      { id: 'gender', label: 'Gender', type: 'select', default: 'male', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
    ],
    formula: 'BMR (Male) = 88.362 + 13.397×W + 4.799×H - 5.677×A | BMR (Female) = 447.593 + 9.247×W + 3.098×H - 4.330×A',
    latex: 'BMR = \\begin{cases} 88.362 + 13.397W + 4.799H - 5.677A & \\text{male} \\\\ 447.593 + 9.247W + 3.098H - 4.330A & \\text{female} \\end{cases}',
    explanation: 'Basal Metabolic Rate (BMR) is the number of calories your body needs at rest to maintain basic functions like breathing and circulation. Use the Mifflin-St Jeor equation to estimate daily calorie needs by multiplying BMR by an activity factor (1.2 for sedentary, 1.55 for moderate, 1.9 for very active).',
    examples: [
      { label: 'Male, 70kg, 175cm, 30yr', inputs: { weight: 70, height: 175, age: 30, gender: 'male' as unknown as number } },
      { label: 'Female, 60kg, 165cm, 25yr', inputs: { weight: 60, height: 165, age: 25, gender: 'female' as unknown as number } },
    ],
    faq: [
      { q: 'What is BMR?', a: 'BMR is the number of calories your body burns at complete rest. It accounts for about 60-75% of total daily calorie expenditure.' },
      { q: 'How do I use BMR for weight loss?', a: 'To lose weight, consume fewer calories than your total daily energy expenditure (TDEE = BMR × activity factor). A deficit of 500 calories per day leads to about 0.5 kg weight loss per week.' },
    ],
    related: ['bmi', 'calorie'],
  },
  calculate: (inputs) => {
    const w = inputs.weight; const h = inputs.height; const a = inputs.age
    const gender = (inputs as any).gender as string || 'male'
    if (w <= 0 || h <= 0 || a <= 0) return { bmr: 0, maintainWeight: 0, mildWeightLoss: 0 }
    const bmr = gender === 'male'
      ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
      : 447.593 + 9.247 * w + 3.098 * h - 4.330 * a
    return { bmr: Math.round(bmr), maintainWeight: Math.round(bmr * 1.55), mildWeightLoss: Math.round(bmr * 1.55 - 500) }
  },
  format: (r) => ({
    'Basal Metabolic Rate': `${r.bmr} cal/day`,
    'Maintain Weight (moderate activity)': `${r.maintainWeight} cal/day`,
    'Mild Weight Loss (moderate activity)': `${r.mildWeightLoss} cal/day`,
  }),
}

export default bmrCalculator
