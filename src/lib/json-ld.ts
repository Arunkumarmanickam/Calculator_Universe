import type { CalculatorMeta } from '@/types/calculator'

export function softwareApplicationJsonLd(meta: CalculatorMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: meta.title,
    description: meta.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    keywords: meta.keywords.join(', '),
  }
}

export function howToJsonLd(title: string, explanation: string, formula: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use the ${title}`,
    description: explanation,
    step: [
      { '@type': 'HowToStep', text: 'Enter the required values in the input fields.' },
      { '@type': 'HowToStep', text: 'The result is calculated automatically in real-time.' },
    ],
  }
}

export function breadcrumbJsonLd(category: string, calcTitle?: string) {
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calculatoruniverse.com/' },
    { '@type': 'ListItem', position: 2, name: `${category.charAt(0).toUpperCase() + category.slice(1)}`, item: `https://calculatoruniverse.com/calculator/${category}` },
  ]
  if (calcTitle) {
    items.push({ '@type': 'ListItem', position: 3, name: calcTitle } as any)
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

export function renderJsonLd(data: Record<string, any>): string {
  return JSON.stringify(data)
}
