import type { MetadataRoute } from 'next'
import { CATEGORIES } from '@/types/calculator'
import { getCalculatorIds } from '@/lib/calculator-registry'
import type { CalculatorCategory } from '@/types/calculator'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calculatoruniverse.com'

  const home: MetadataRoute.Sitemap = [{
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }]

  const categories = (Object.keys(CATEGORIES) as CalculatorCategory[]).map((cat) => ({
    url: `${baseUrl}/calculator/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const calculators = getCalculatorIds().map(({ id, category }) => ({
    url: `${baseUrl}/calculator/${category}/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...home, ...categories, ...calculators]
}
