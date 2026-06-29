'use client'

import { useEffect, useState } from 'react'
import type { CalculatorDefinition, CalculatorMeta, CalculatorSchema } from '@/types/calculator'
import { loadCalculator } from '@/lib/calculator-registry'
import { CalculatorShell } from './calculator-shell'
import { Skeleton } from '@/components/ui/skeleton'

interface CalculatorClientProps {
  slug: string
  meta: CalculatorMeta
  schema: CalculatorSchema
}

export function CalculatorClient({ slug, meta, schema }: CalculatorClientProps) {
  const [calc, setCalc] = useState<CalculatorDefinition | null>(null)

  useEffect(() => {
    loadCalculator(slug).then((c) => {
      if (c) setCalc(c)
    })
  }, [slug])

  if (!calc) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96 mt-2" />
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    )
  }

  return <CalculatorShell calc={calc} />
}
