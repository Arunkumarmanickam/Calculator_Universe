import type { CalculatorDefinition } from '@/types/calculator'

const base64Calculator: CalculatorDefinition = {
  meta: {
    id: 'base64',
    category: 'devtools',
    title: 'Base64 Encoder / Decoder',
    description: 'Encode or decode text to and from Base64 format.',
    keywords: ['base64', 'encode', 'decode', 'base64 encoder', 'base64 decoder', 'developer tools'],
    featured: false,
  },
  schema: {
    inputs: [
      { id: 'mode', label: 'Mode', type: 'select', default: 'encode', options: [
        { label: 'Encode', value: 'encode' },
        { label: 'Decode', value: 'decode' },
      ]},
      { id: 'text', label: 'Text', type: 'text', default: 'Hello, World!', placeholder: 'Enter text...' },
    ],
    formula: 'Base64 encoding uses 64 characters (A-Z, a-z, 0-9, +, /) to represent binary data as text.',
    latex: '',
    explanation: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is commonly used for embedding images in HTML, email attachments, and data URLs.',
    examples: [
      { label: 'Encode "Hello, World!"', inputs: { mode: 0 as unknown as number, text: 0 as unknown as number } },
    ],
    faq: [
      { q: 'What is Base64 used for?', a: 'Base64 is commonly used for embedding images in HTML/CSS (data URLs), email attachments (MIME), and storing binary data in JSON.' },
      { q: 'Is Base64 encryption?', a: 'No, Base64 is encoding, not encryption. It can be easily reversed. Do not use it for security purposes.' },
    ],
    related: [],
  },
  calculate: (inputs) => {
    const mode = (inputs as any).mode as string || 'encode'
    const text = (inputs as any).text as string || ''
    if (!text) return { output: '' }
    try {
      if (mode === 'encode') {
        const encoded = typeof Buffer !== 'undefined'
          ? Buffer.from(text).toString('base64')
          : btoa(unescape(encodeURIComponent(text)))
        return { output: encoded }
      } else {
        const decoded = typeof Buffer !== 'undefined'
          ? Buffer.from(text, 'base64').toString('utf-8')
          : decodeURIComponent(escape(atob(text)))
        return { output: decoded }
      }
    } catch {
      return { output: 'Error: Invalid input for selected mode' }
    }
  },
  format: (r) => ({
    'Output': r.output as string,
  }),
}

export default base64Calculator
