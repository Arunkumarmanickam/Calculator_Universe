import type { CalculatorDefinition } from '@/types/calculator'

const calorieCalculator: CalculatorDefinition = {
  meta: {
    id: 'calorie',
    category: 'health',
    title: 'Calorie Intake Calculator',
    description: 'Estimate your daily calorie needs based on activity level and goals.',
    keywords: ['calories', 'TDEE', 'diet', 'weight loss', 'fitness', 'nutrition'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'weight', label: 'Weight (kg)', type: 'number', default: 70, placeholder: '70', min: 1, max: 500, step: 0.1, required: true },
      { id: 'height', label: 'Height (cm)', type: 'number', default: 175, placeholder: '175', min: 50, max: 300, step: 0.5, required: true },
      { id: 'age', label: 'Age (years)', type: 'number', default: 30, placeholder: '30', min: 1, max: 120, step: 1, required: true },
      { id: 'gender', label: 'Gender', type: 'select', default: 'male', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'activity', label: 'Activity Level', type: 'select', default: 'moderate', options: [
        { label: 'Sedentary (office job)', value: '1.2' },
        { label: 'Light (1-3 days/week)', value: '1.375' },
        { label: 'Moderate (3-5 days/week)', value: '1.55' },
        { label: 'Very Active (6-7 days/week)', value: '1.725' },
        { label: 'Extreme (athlete)', value: '1.9' },
      ]},
    ],
    formula: 'TDEE = BMR × Activity Factor',
    latex: '',
    explanation: 'Total Daily Energy Expenditure (TDEE) is the total calories you burn per day. It is calculated by multiplying your BMR by an activity factor. Use this to plan your calorie intake for weight maintenance, loss, or gain.',
    examples: [
      { label: 'Male, 70kg, 175cm, 30yr, moderate', inputs: { weight: 70, height: 175, age: 30, gender: 0 as unknown as number, activity: 0 as unknown as number } },
    ],
    faq: [
      { q: 'How many calories should I eat to lose weight?', a: 'Subtract 300-500 calories from your TDEE for slow, sustainable weight loss. Never go below 1200 (women) or 1500 (men) without medical supervision.' },
      { q: 'What is a calorie deficit?', a: 'A calorie deficit means consuming fewer calories than you burn. One pound of fat equals approximately 3,500 calories.' },
    ],
    related: ['bmi', 'bmr'],
  },
  calculate: (inputs) => {
    const w = inputs.weight; const h = inputs.height; const a = inputs.age
    const gender = (inputs as any).gender as string || 'male'
    const activity = parseFloat((inputs as any).activity as string || '1.55')
    if (w <= 0 || h <= 0 || a <= 0) return { bmr: 0, tdee: 0, weightLoss: 0, weightGain: 0 }
    const bmr = gender === 'male'
      ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
      : 447.593 + 9.247 * w + 3.098 * h - 4.330 * a
    const tdee = bmr * activity
    return { bmr: Math.round(bmr), tdee: Math.round(tdee), weightLoss: Math.round(tdee - 500), weightGain: Math.round(tdee + 300) }
  },
  format: (r) => ({
    'Basal Metabolic Rate': `${r.bmr} cal/day`,
    'Maintain Weight (TDEE)': `${r.tdee} cal/day`,
    'Mild Weight Loss': `${r.weightLoss} cal/day`,
    'Mild Weight Gain': `${r.weightGain} cal/day`,
  }),
}

export default calorieCalculator
