'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { CATEGORIES } from '@/types/calculator'
import type { CalculatorCategory } from '@/types/calculator'
import { getCalculatorsByCategory } from '@/lib/calculator-registry'
import type { CalculatorMetaEntry } from '@/lib/calculator-registry'

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

function CategoryDropdown({ category, label, gradient }: { category: CalculatorCategory; label: string; gradient: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const calculators = getCalculatorsByCategory(category)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        href={`/calculator/${category}`}
        className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </Link>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-56 rounded-2xl border-2 bg-card shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
          <div className="p-1.5">
            {calculators.map((calc) => (
              <Link
                key={calc.id}
                href={`/calculator/${category}/${calc.id}`}
                className="block px-3 py-2 rounded-xl text-sm hover:bg-gradient-to-r hover:from-muted/80 hover:to-muted/50 transition-all"
                onClick={() => setOpen(false)}
              >
                {calc.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function CategoryNav() {
  const categories = Object.entries(CATEGORIES) as [CalculatorCategory, { label: string }][]

  return (
    <nav className="hidden md:flex items-center gap-0.5">
      <Link href="/" className="px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
        Home
      </Link>
      {categories.map(([key, cat]) => (
        <CategoryDropdown
          key={key}
          category={key}
          label={cat.label}
          gradient={categoryGradients[key]}
        />
      ))}
    </nav>
  )
}
