'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RotateCcw, Plus, Trash2, Equal } from 'lucide-react'

interface SystemEquationsFormProps {
  numEquations: number
  onNumChange: (n: number) => void
  onEquationsChange: (eqs: string) => void
}

export function SystemEquationsForm({ numEquations, onNumChange, onEquationsChange }: SystemEquationsFormProps) {
  const [eqs, setEqs] = useState<string[]>(['', ''])

  useEffect(() => {
    setEqs((prev) => {
      const next = [...prev]
      while (next.length < numEquations) next.push('')
      while (next.length > numEquations) next.pop()
      return next
    })
  }, [numEquations])

  useEffect(() => {
    onEquationsChange(eqs.join('\n'))
  }, [eqs, onEquationsChange])

  const updateEq = (i: number, val: string) => {
    setEqs((prev) => {
      const next = [...prev]
      next[i] = val
      return next
    })
  }

  const addEquation = () => {
    onNumChange(numEquations + 1)
  }

  const removeEquation = (i: number) => {
    if (eqs.length <= 2) return
    setEqs((prev) => prev.filter((_, idx) => idx !== i))
    onNumChange(numEquations - 1)
  }

  const reset = () => {
    setEqs(eqs.map(() => ''))
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium mb-2 flex items-center justify-between">
        <span>Equations <span className="text-muted-foreground font-normal">({eqs.length} entered)</span></span>
        <span className="text-xs text-muted-foreground">Format: 2x + 3y = 10</span>
      </div>

      {eqs.map((eq, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-sm font-mono text-muted-foreground w-6 shrink-0">({i + 1})</span>
          <div className="relative flex-1">
            <Input
              value={eq}
              onChange={(e) => updateEq(i, e.target.value)}
              placeholder={`e.g. ${i === 0 ? '2x + 3y = 10' : i === 1 ? 'x - y = 5' : 'x + y + z = 15'}`}
              className="rounded-xl border-2 pl-9 pr-4 font-mono text-sm focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:focus-visible:ring-orange-800 transition-all"
            />
            <Equal className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeEquation(i)}
            disabled={eqs.length <= 2}
            className="h-9 w-9 rounded-xl shrink-0 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
            aria-label="Remove equation"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={addEquation}
          disabled={eqs.length >= 6}
          className="rounded-xl border-2 border-dashed w-full group"
        >
          <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
          Add Equation
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          className="rounded-xl border-2 group shrink-0"
        >
          <RotateCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  )
}
