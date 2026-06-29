import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '@/types/calculator'
import { getCalculatorIds } from '@/lib/calculator-registry'
import type { CalculatorCategory } from '@/types/calculator'

interface Props {
  params: Promise<{ category: string }>
}

const categoryGradients: Record<string, string> = {
  finance: 'from-orange-400 to-rose-500',
  health: 'from-pink-400 to-purple-500',
  education: 'from-violet-400 to-indigo-500',
  math: 'from-blue-400 to-cyan-500',
  construction: 'from-amber-400 to-orange-500',
  datetime: 'from-teal-400 to-emerald-500',
  conversion: 'from-cyan-400 to-blue-500',
  devtools: 'from-purple-400 to-pink-500',
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORIES[category as CalculatorCategory]
  if (!cat) return {}
  return { title: `${cat.label} Calculators`, description: cat.description }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = CATEGORIES[category as CalculatorCategory]
  if (!cat) notFound()

  const calculators = getCalculatorIds(category as CalculatorCategory)

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          &larr; Back to all categories
        </Link>

        <div className="mb-10">
          <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${categoryGradients[category]} text-white shadow-lg mb-4`}>
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{cat.label} Calculators</h1>
          <p className="text-muted-foreground mt-2 text-lg">{cat.description}</p>
        </div>

        {calculators.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No calculators in this category yet.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map(({ id }, i) => (
              <Link
                key={id}
                href={`/calculator/${category}/${id}`}
                className="group relative block rounded-2xl border-2 bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[category]} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`} />
                <h3 className="text-lg font-bold capitalize mb-2">{id.replace(/-/g, ' ')}</h3>
                <p className="text-sm text-muted-foreground">Click to use this calculator</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Open Calculator
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
