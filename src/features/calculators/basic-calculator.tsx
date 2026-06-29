'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

export function BasicCalculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [justEvaluated, setJustEvaluated] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const append = useCallback((val: string) => {
    if (justEvaluated) {
      setDisplay(val)
      setExpression(val)
      setResult(null)
      setJustEvaluated(false)
      return
    }
    const next = display === '0' && val !== '.' ? val : display + val
    setDisplay(next)
    setExpression(next)
    setResult(null)
  }, [display, justEvaluated])

  const appendOp = useCallback((op: '+' | '-' | '×' | '÷') => {
    setJustEvaluated(false)
    const opSymbol = op === '×' ? '*' : op === '÷' ? '/' : op
    const last = display.trim().slice(-1)
    if (['+', '-', '*', '/'].includes(last)) {
      setDisplay(display.slice(0, -1) + op + ' ')
      setExpression(expression.slice(0, -1) + opSymbol)
    } else {
      setDisplay(display + ' ' + op + ' ')
      setExpression(expression + opSymbol)
    }
  }, [display, expression])

  const calculate = useCallback(() => {
    try {
      const sanitized = expression.replace(/[^\d+\-*/.()]/g, '')
      if (!sanitized) return
      const val = Function('"use strict"; return (' + sanitized + ')')()
      if (typeof val === 'number' && isFinite(val)) {
        setResult(val)
        setDisplay(String(val))
        setJustEvaluated(true)
      } else {
        setDisplay('Error')
        setResult(null)
      }
    } catch {
      setDisplay('Error')
      setResult(null)
    }
  }, [expression])

  const percent = useCallback(() => {
    const val = parseFloat(display)
    if (isNaN(val)) return
    const pct = val / 100
    setDisplay(String(pct))
    setExpression(String(pct))
    setResult(null)
    setJustEvaluated(false)
  }, [display])

  const clear = useCallback(() => {
    setDisplay('0')
    setExpression('')
    setResult(null)
    setJustEvaluated(false)
    inputRef.current?.focus()
  }, [])

  const backspace = useCallback(() => {
    if (justEvaluated) { clear(); return }
    const next = display.length > 1 ? display.slice(0, -1).trim() : '0'
    setDisplay(next)
    setExpression(expression.slice(0, -1))
  }, [display, expression, justEvaluated, clear])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { calculate(); return }
    if (e.key === 'Escape') { clear(); return }
    if (e.key === 'Backspace') { backspace(); return }
    if (/^[\d.]$/.test(e.key)) { append(e.key); return }
    if (e.key === '+' || e.key === '-') { appendOp(e.key); return }
    if (e.key === '*') { appendOp('×'); return }
    if (e.key === '/') { appendOp('÷'); return }
  }, [calculate, clear, backspace, append, appendOp])

  const inputValue = display + (result !== null ? ` = ${result}` : '')

  return (
    <div
      className="relative rounded-2xl border-2 bg-card p-5 shadow-xl w-full max-w-xs mx-auto"
      onKeyDown={handleKeyDown}
    >
      <div className="absolute -inset-1 bg-gradient-to-br from-orange-200/50 via-rose-200/50 to-purple-200/50 dark:from-orange-800/20 dark:via-rose-800/20 dark:to-purple-800/20 rounded-2xl blur-sm -z-10" />
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={() => {}}
        className="w-full text-right text-2xl font-bold tabular-nums bg-muted/50 rounded-xl px-4 py-3 mb-3 border focus:outline-none focus:ring-2 focus:ring-orange-400/50 cursor-default"
        aria-label="Calculator display"
        autoComplete="off"
      />
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="py-3 rounded-xl bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-200 dark:hover:bg-red-950/50 transition-colors active:scale-95">
          AC
        </button>
        <button onClick={percent} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-sm transition-colors active:scale-95">
          %
        </button>
        <button onClick={backspace} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-sm transition-colors active:scale-95">
          ⌫
        </button>
        <button onClick={() => appendOp('÷')} className="py-3 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
          ÷
        </button>

        {[7, 8, 9].map((n) => (
          <button key={n} onClick={() => append(String(n))} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
            {n}
          </button>
        ))}
        <button onClick={() => appendOp('×')} className="py-3 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
          ×
        </button>

        {[4, 5, 6].map((n) => (
          <button key={n} onClick={() => append(String(n))} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
            {n}
          </button>
        ))}
        <button onClick={() => appendOp('-')} className="py-3 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
          -
        </button>

        {[1, 2, 3].map((n) => (
          <button key={n} onClick={() => append(String(n))} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
            {n}
          </button>
        ))}
        <button onClick={() => appendOp('+')} className="py-3 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
          +
        </button>

        <button onClick={() => append('00')} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
          00
        </button>
        <button onClick={() => append('0')} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
          0
        </button>
        <button onClick={() => append('.')} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
          .
        </button>
        <button onClick={calculate} className="py-3 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
          =
        </button>
      </div>
    </div>
  )
}
