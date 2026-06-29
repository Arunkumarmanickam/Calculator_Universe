'use client'

import { useState, useMemo } from 'react'
import type { CalculatorDefinition } from '@/types/calculator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CalculatorForm } from './calculator-form'
import { CalculatorResult } from './calculator-result'
import { CalculatorFAQ } from './calculator-faq'
import { SystemEquationsForm } from './system-equations-form'
import { useCalculator } from '@/hooks/use-calculator'
import { solveLinearSystem } from '@/lib/linear-system'

interface CalculatorShellProps {
  calc: CalculatorDefinition
}

export function CalculatorShell({ calc }: CalculatorShellProps) {
  const { inputs, setInput, formatted, reset } = useCalculator(calc)
  const [eqStrings, setEqStrings] = useState('')

  const isSystemEquations = calc.meta.id === 'system-of-equations'

  const filteredInputs = useMemo(
    () => isSystemEquations ? calc.schema.inputs.filter((i) => i.id !== 'numEquations') : calc.schema.inputs,
    [calc.schema.inputs, isSystemEquations]
  )

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-orange-100/50 via-rose-100/50 to-purple-100/50 dark:from-orange-900/10 dark:via-rose-900/10 dark:to-purple-900/10 rounded-3xl -z-10 blur-xl" />
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-rose-600 dark:from-orange-400 dark:to-rose-400 bg-clip-text text-transparent">
          {calc.meta.title}
        </h1>
        <p className="text-muted-foreground mt-2 leading-relaxed">{calc.meta.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-orange-200/50 via-rose-200/50 to-purple-200/50 dark:from-orange-800/20 dark:via-rose-800/20 dark:to-purple-800/20 rounded-2xl blur-sm" />
          <Card className="relative rounded-2xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="inline-flex p-1.5 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 text-white text-xs">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7"/><path d="M16 21v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                </span>
                Input
              </CardTitle>
              <CardDescription>{isSystemEquations ? 'Set the number of equations and enter each one' : 'Enter your values to calculate'}</CardDescription>
            </CardHeader>
            <CardContent>
              <CalculatorForm inputs={filteredInputs} values={inputs} onChange={setInput} onReset={reset} />
              {isSystemEquations && (
                <div className="mt-4 pt-4 border-t">
                  <SystemEquationsForm
                    numEquations={(inputs as any).numEquations || 2}
                    onNumChange={(n) => setInput('numEquations', n)}
                    onEquationsChange={setEqStrings}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-purple-200/50 via-pink-200/50 to-orange-200/50 dark:from-purple-800/20 dark:via-pink-800/20 dark:to-orange-800/20 rounded-2xl blur-sm" />
          <Card className="relative rounded-2xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="inline-flex p-1.5 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xs">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </span>
                Result
              </CardTitle>
              <CardDescription>Calculated output</CardDescription>
            </CardHeader>
            <CardContent>
              {isSystemEquations ? (
                <SystemEquationsResult eqStrings={eqStrings} />
              ) : (
                <CalculatorResult result={formatted} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="inline-flex p-1.5 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 text-white text-xs">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </span>
            About this calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          <p>{calc.schema.explanation}</p>
        </CardContent>
      </Card>

      {calc.schema.faq.length > 0 && (
        <>
          <Separator className="bg-gradient-to-r from-orange-200 via-rose-200 to-purple-200 dark:from-orange-800 dark:via-rose-800 dark:to-purple-800" />
          <CalculatorFAQ faq={calc.schema.faq} />
        </>
      )}
    </div>
  )
}

function SystemEquationsResult({ eqStrings }: { eqStrings: string }) {
  const eqs = eqStrings.split('\n').map((l) => l.trim()).filter(Boolean)
  const numVars = useMemo(() => new Set(eqs.flatMap((e) => e.match(/[a-zA-Z]/g) || [])).size, [eqs])
  const numEqs = eqs.length

  if (numEqs === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-100 to-rose-100 dark:from-orange-900/30 dark:to-rose-900/30 mb-4">
          <svg className="h-8 w-8 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
        </div>
        <p className="text-muted-foreground text-sm">Enter your equations above and the solution will appear here.</p>
      </div>
    )
  }

  if (numEqs < numVars) {
    return (
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm">
        Need at least {numVars} equation{numVars > 1 ? 's' : ''} for {numVars} variable{numVars > 1 ? 's' : ''}. You entered {numEqs}.
      </div>
    )
  }

  try {
    const result = solveLinearSystem(eqs)
    if (!result) {
      return (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-sm">
          No unique solution. The system may be inconsistent (no solution) or underdetermined (infinitely many solutions).
        </div>
      )
    }

    const colors = [
      'from-orange-100/50 to-rose-100/50 dark:from-orange-900/20 dark:to-rose-900/20',
      'from-purple-100/50 to-pink-100/50 dark:from-purple-900/20 dark:to-pink-900/20',
      'from-teal-100/50 to-emerald-100/50 dark:from-teal-900/20 dark:to-emerald-900/20',
      'from-blue-100/50 to-cyan-100/50 dark:from-blue-900/20 dark:to-cyan-900/20',
      'from-amber-100/50 to-orange-100/50 dark:from-amber-900/20 dark:to-orange-900/20',
      'from-violet-100/50 to-indigo-100/50 dark:from-violet-900/20 dark:to-indigo-900/20',
    ]

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 mb-3">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span className="font-medium">Solution found</span>
        </div>
        {Object.entries(result).map(([v, val], i) => (
          <div key={v} className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${colors[i % colors.length]}`}>
            <span className="font-mono font-bold text-lg">{v}</span>
            <span className="text-xl font-bold tabular-nums">{val}</span>
          </div>
        ))}
      </div>
    )
  } catch (e: any) {
    return (
      <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-sm">
        Error: {e.message || 'Invalid equation format'}
      </div>
    )
  }
}
