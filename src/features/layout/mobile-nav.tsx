'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES } from '@/types/calculator'
import type { CalculatorCategory } from '@/types/calculator'
import { getCalculatorsByCategory } from '@/lib/calculator-registry'

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

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l-2 bg-background shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b bg-background/80 backdrop-blur-lg">
              <span className="font-bold text-lg bg-gradient-to-r from-orange-600 to-rose-600 dark:from-orange-400 dark:to-rose-400 bg-clip-text text-transparent">
                Categories
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <Link
                href="/"
                onClick={onClose}
                className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                Home
              </Link>

              {(Object.entries(CATEGORIES) as [CalculatorCategory, { label: string; icon: string; description: string }][]).map(([key, cat]) => {
                const calculators = getCalculatorsByCategory(key)
                return (
                  <div key={key} className="rounded-xl border overflow-hidden">
                    <Link
                      href={`/calculator/${key}`}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${categoryGradients[key]} text-white font-medium text-sm`}
                    >
                      {cat.label}
                    </Link>
                    <div className="divide-y">
                      {calculators.map((calc) => (
                        <Link
                          key={calc.id}
                          href={`/calculator/${key}/${calc.id}`}
                          onClick={onClose}
                          className="block px-4 py-2.5 text-sm hover:bg-muted/30 transition-colors pl-8"
                        >
                          {calc.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
