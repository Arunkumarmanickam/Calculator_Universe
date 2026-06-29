'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calculator, ArrowRight, TrendingUp, Heart, BookOpen, Sigma, Hammer, Clock, Ruler, Code, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CATEGORIES } from '@/types/calculator'
import { renderJsonLd } from '@/lib/json-ld'
import { BasicCalculator } from '@/features/calculators/basic-calculator'

const categoryIcons: Record<string, React.ReactNode> = {
  chart:  <TrendingUp className="h-6 w-6" />,
  heart:  <Heart className="h-6 w-6" />,
  book:   <BookOpen className="h-6 w-6" />,
  sigma:  <Sigma className="h-6 w-6" />,
  hammer: <Hammer className="h-6 w-6" />,
  clock:  <Clock className="h-6 w-6" />,
  ruler:  <Ruler className="h-6 w-6" />,
  code:   <Code className="h-6 w-6" />,
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

const websiteJsonLd = renderJsonLd({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Calculator Universe',
  url: 'https://calculatoruniverse.com',
  description: 'A universe of free online calculators for finance, health, math, and more.',
})

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteJsonLd }} />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-20 pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-rose-50 to-purple-50 dark:from-orange-950/20 dark:via-rose-950/20 dark:to-purple-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-200/40 via-transparent to-transparent dark:from-orange-800/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-200/40 via-transparent to-transparent dark:from-purple-800/20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 items-center"
        >
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-orange-400 to-rose-400 text-white border-0 px-4 py-1.5 text-sm shadow-lg">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                1,000+ Free Calculators
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-orange-600 via-rose-600 to-purple-600 dark:from-orange-400 dark:via-rose-400 dark:to-purple-400 bg-clip-text text-transparent"
            >
              Calculator Universe
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Free online calculators for finance, health, math, construction, and more.
              <br />Fast, accurate, and beautiful.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <BasicCalculator />
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
            <p className="mt-3 text-muted-foreground">Pick a category and find the calculator you need</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(CATEGORIES).map(([key, cat], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link href={`/calculator/${key}/`} className="block group h-full">
                  <div className="relative h-full rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-orange-200/20 dark:hover:shadow-orange-800/10 hover:-translate-y-1 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[key]} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`} />

                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${categoryGradients[key]} text-white shadow-md mb-4`}>
                      {categoryIcons[cat.icon] || <Calculator className="h-6 w-6" />}
                    </div>

                    <h3 className="text-lg font-bold mb-1.5">{cat.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>

                    <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Browse calculators
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
