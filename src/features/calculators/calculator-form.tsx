'use client'

import type { CalculatorInput } from '@/types/calculator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RotateCcw } from 'lucide-react'

interface CalculatorFormProps {
  inputs: CalculatorInput[]
  values: Record<string, any>
  onChange: (id: string, value: any) => void
  onReset: () => void
}

export function CalculatorForm({ inputs, values, onChange, onReset }: CalculatorFormProps) {
  return (
    <div className="space-y-4">
      {inputs.map((input) => (
        <div key={input.id}>
          <label htmlFor={input.id} className={`block text-sm font-medium mb-1.5 ${input.type === 'text' ? 'sr-only' : ''}`}>
            {input.label}
            {input.required && <span className="text-destructive ml-0.5">*</span>}
          </label>

          {input.type === 'number' && (
            <Input
              id={input.id}
              type="number"
              value={values[input.id] ?? ''}
              onChange={(e) => onChange(input.id, parseFloat(e.target.value) || 0)}
              placeholder={input.placeholder}
              min={input.min}
              max={input.max}
              step={input.step ?? 'any'}
              className="rounded-xl border-2 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:focus-visible:ring-orange-800 transition-all"
            />
          )}

          {input.type === 'select' && input.options && (
            <Select
              value={values[input.id] ?? ''}
              onValueChange={(v) => onChange(input.id, v)}
            >
              <SelectTrigger className="rounded-xl border-2 focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:focus-visible:ring-orange-800 transition-all">
                <SelectValue placeholder={input.placeholder} />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2">
                {input.options.map((opt) => (
                  <SelectItem key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {input.type === 'text' && (
            <textarea
              id={input.id}
              value={values[input.id] ?? ''}
              onChange={(e) => onChange(input.id, e.target.value)}
              placeholder={input.placeholder}
              rows={3}
              className="flex w-full rounded-xl border-2 border-input bg-background px-3 py-2 text-sm shadow-xs transition-all outline-none focus-visible:border-orange-400 focus-visible:ring-3 focus-visible:ring-orange-200 dark:focus-visible:ring-orange-800 placeholder:text-muted-foreground resize-none"
            />
          )}
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="w-full rounded-xl border-2 group"
      >
        <RotateCcw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
        Reset
      </Button>
    </div>
  )
}
