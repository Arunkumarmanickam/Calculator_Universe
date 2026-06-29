import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { loadCalculator, getCalculatorIds } from '@/lib/calculator-registry'
import { CalculatorClient } from '@/features/calculators/calculator-client'
import { softwareApplicationJsonLd, howToJsonLd, breadcrumbJsonLd } from '@/lib/json-ld'

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return getCalculatorIds().map(({ id, category }) => ({ category, slug: id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const calc = await loadCalculator(slug)
  if (!calc) return {}
  return {
    title: calc.meta.title,
    description: calc.meta.description,
    keywords: calc.meta.keywords,
  }
}

export default async function CalculatorPage({ params }: Props) {
  const { category, slug } = await params
  const calc = await loadCalculator(slug)

  if (!calc) notFound()

  const schemas = [
    softwareApplicationJsonLd(calc.meta),
    howToJsonLd(calc.meta.title, calc.schema.explanation, calc.schema.formula),
    breadcrumbJsonLd(category, calc.meta.title),
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <CalculatorClient slug={slug} meta={calc.meta} schema={calc.schema} />
    </div>
  )
}
