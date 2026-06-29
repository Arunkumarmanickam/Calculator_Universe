'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

function calc(a: number, b: number, op: string): number {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '×': return a * b
    case '÷': return b !== 0 ? a / b : NaN
    default: return b
  }
}

export function BasicCalculator() {
  const [current, setCurrent] = useState('0')
  const [first, setFirst] = useState<number | null>(null)
  const [op, setOp] = useState<string | null>(null)
  const [waiting, setWaiting] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [justEq, setJustEq] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const pendingLabel = op && first !== null
    ? `${first} ${op}${waiting ? '' : ` ${current}`}`
    : ''

  const inputDigit = useCallback((n: string) => {
    if (justEq) {
      setCurrent(n)
      setFirst(null)
      setOp(null)
      setResult(null)
      setWaiting(false)
      setJustEq(false)
      return
    }
    if (waiting) {
      setCurrent(n)
      setWaiting(false)
      return
    }
    setCurrent((prev) => prev === '0' ? n : prev + n)
    setResult(null)
  }, [waiting, justEq])

  const inputDecimal = useCallback(() => {
    if (justEq) {
      setCurrent('0.')
      setFirst(null)
      setOp(null)
      setResult(null)
      setWaiting(false)
      setJustEq(false)
      return
    }
    if (waiting) {
      setCurrent('0.')
      setWaiting(false)
      return
    }
    setCurrent((prev) => prev.includes('.') ? prev : prev + '.')
  }, [waiting, justEq])

  const inputOp = useCallback((nextOp: string) => {
    const cur = parseFloat(current)
    if (justEq) {
      setFirst(result ?? cur)
      setOp(nextOp)
      setWaiting(true)
      setResult(null)
      setJustEq(false)
      return
    }
    if (first !== null && op && !waiting) {
      const val = calc(first, cur, op)
      setFirst(isFinite(val) ? val : 0)
      setResult(isFinite(val) ? val : null)
      setCurrent(String(isFinite(val) ? val : 'Error'))
    } else {
      setFirst(cur)
    }
    setOp(nextOp)
    setWaiting(true)
  }, [current, first, op, waiting, justEq, result])

  const equals = useCallback(() => {
    if (justEq) return
    const cur = parseFloat(current)
    if (first !== null && op) {
      const val = calc(first, cur, op)
      if (!isFinite(val)) {
        setCurrent('Error')
        setResult(null)
      } else {
        setCurrent(String(val))
        setResult(val)
        setJustEq(true)
      }
    } else {
      setResult(cur)
      setJustEq(true)
    }
  }, [current, first, op, justEq])

  const percent = useCallback(() => {
    const val = parseFloat(current)
    if (isNaN(val)) return
    setCurrent(String(val / 100))
    setResult(null)
  }, [current])

  const clear = useCallback(() => {
    setCurrent('0')
    setFirst(null)
    setOp(null)
    setWaiting(false)
    setResult(null)
    setJustEq(false)
    inputRef.current?.focus()
  }, [])

  const backspace = useCallback(() => {
    if (justEq) { clear(); return }
    if (waiting) return
    setCurrent((prev) => prev.length > 1 ? prev.slice(0, -1) : '0')
  }, [justEq, waiting, clear])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { equals(); return }
    if (e.key === 'Escape') { clear(); return }
    if (e.key === 'Backspace') { backspace(); return }
    if (/^[\d]$/.test(e.key)) { inputDigit(e.key); return }
    if (e.key === '.') { inputDecimal(); return }
    if (e.key === '+') { inputOp('+'); return }
    if (e.key === '-') { inputOp('-'); return }
    if (e.key === '*') { inputOp('×'); return }
    if (e.key === '/') { inputOp('÷'); return }
  }, [equals, clear, backspace, inputDigit, inputDecimal, inputOp])

  const displayValue = current

  return (
    <div
      className="relative rounded-2xl border-2 bg-card p-5 shadow-xl w-full max-w-xs mx-auto"
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-200/50 via-rose-200/50 to-purple-200/50 dark:from-orange-800/20 dark:via-rose-800/20 dark:to-purple-800/20 rounded-2xl blur-md -z-10" />

      {pendingLabel && (
        <div className="text-right text-xs text-muted-foreground tabular-nums h-4 mb-1 overflow-hidden">
          {pendingLabel}
        </div>
      )}

      <input
        ref={inputRef}
        type={justEq && result !== null ? 'text' : 'text'}
        value={displayValue}
        onChange={() => {}}
        className="w-full text-right text-3xl font-bold tabular-nums bg-muted/50 rounded-xl px-4 py-3 mb-3 border focus:outline-none focus:ring-2 focus:ring-orange-400/50 cursor-default"
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
        <button onClick={() => inputOp('÷')} className="py-3 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
          ÷
        </button>

        {[7, 8, 9].map((n) => (
          <button key={n} onClick={() => inputDigit(String(n))} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
            {n}
          </button>
        ))}
        <button onClick={() => inputOp('×')} className="py-3 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
          ×
        </button>

        {[4, 5, 6].map((n) => (
          <button key={n} onClick={() => inputDigit(String(n))} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
            {n}
          </button>
        ))}
        <button onClick={() => inputOp('-')} className="py-3 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
          -
        </button>

        {[1, 2, 3].map((n) => (
          <button key={n} onClick={() => inputDigit(String(n))} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
            {n}
          </button>
        ))}
        <button onClick={() => inputOp('+')} className="py-3 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
          +
        </button>

        <button onClick={() => inputDigit('00')} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
          00
        </button>
        <button onClick={() => inputDigit('0')} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
          0
        </button>
        <button onClick={inputDecimal} className="py-3 rounded-xl bg-muted hover:bg-muted/70 font-bold text-lg transition-colors active:scale-95">
          .
        </button>
        <button onClick={equals} className="py-3 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
          =
        </button>
      </div>
    </div>
  )
}
