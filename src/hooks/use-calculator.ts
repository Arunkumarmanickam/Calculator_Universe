'use client'

import { useState, useCallback, useMemo } from 'react'
import type { CalculatorDefinition, CalculatorInput } from '@/types/calculator'

function defaultValues(inputs: CalculatorInput[]): Record<string, any> {
  const values: Record<string, any> = {}
  for (const input of inputs) {
    if (input.type === 'number') {
      values[input.id] = (input.default as number) ?? 0
    } else if (input.type === 'select') {
      values[input.id] = input.default ?? input.options?.[0]?.value ?? ''
    } else if (input.type === 'text') {
      values[input.id] = input.default ?? ''
    }
  }
  return values
}

export function useCalculator(calc: CalculatorDefinition) {
  const [inputs, setInputs] = useState(() => defaultValues(calc.schema.inputs))

  const setInput = useCallback((id: string, value: any) => {
    setInputs((prev) => ({ ...prev, [id]: value }))
  }, [])

  const result = useMemo(() => {
    try { return calc.calculate(inputs) } catch { return null }
  }, [inputs, calc])

  const formatted = useMemo(() => {
    if (!result) return null
    return calc.format ? calc.format(result) : result
  }, [result, calc])

  const reset = useCallback(() => {
    setInputs(defaultValues(calc.schema.inputs))
  }, [calc])

  return { inputs, setInput, result, formatted, reset }
}
