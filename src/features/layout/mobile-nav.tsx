'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES } from '@/types/calculator'
import type { CalculatorCategory } from '@/types/calculator'

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

const categoryIcons: Record<string, string> = {
  finance: '📊',
  health: '❤️',
  education: '📚',
  math: '∑',
  construction: '🔨',
  datetime: '🕐',
  conversion: '📏',
  devtools: '💻',
}

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const categories = Object.entries(CATEGORIES) as [CalculatorCategory, { label: string; icon: string; description: string }][]

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-background shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b bg-background">
              <span className="font-bold text-lg bg-gradient-to-r from-orange-600 to-rose-600 dark:from-orange-400 dark:to-rose-400 bg-clip-text text-transparent">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium hover:bg-muted/50 transition-colors mb-2"
              >
                <span className="text-lg">🏠</span>
                Home
              </Link>

              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                Categories
              </div>

              <div className="space-y-1.5">
                {categories.map(([key, cat]) => (
                  <Link
                    key={key}
                    href={`/calculator/${key}`}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium bg-gradient-to-r ${categoryGradients[key]} text-white hover:opacity-90 transition-all`}
                  >
                    <span className="text-lg">{categoryIcons[key]}</span>
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
