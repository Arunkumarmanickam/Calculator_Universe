'use client'

import { motion } from 'framer-motion'

interface CalculatorResultProps {
  result: Record<string, string | number> | null
}

const colorPairs = [
  { bg: 'from-orange-100/50 to-rose-100/50 dark:from-orange-900/20 dark:to-rose-900/20', text: 'text-orange-700 dark:text-orange-300', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300' },
  { bg: 'from-purple-100/50 to-pink-100/50 dark:from-purple-900/20 dark:to-pink-900/20', text: 'text-purple-700 dark:text-purple-300', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' },
  { bg: 'from-teal-100/50 to-emerald-100/50 dark:from-teal-900/20 dark:to-emerald-900/20', text: 'text-teal-700 dark:text-teal-300', badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300' },
  { bg: 'from-blue-100/50 to-cyan-100/50 dark:from-blue-900/20 dark:to-cyan-900/20', text: 'text-blue-700 dark:text-blue-300', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
  { bg: 'from-amber-100/50 to-orange-100/50 dark:from-amber-900/20 dark:to-orange-900/20', text: 'text-amber-700 dark:text-amber-300', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' },
]

export function CalculatorResult({ result }: CalculatorResultProps) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-100 to-rose-100 dark:from-orange-900/30 dark:to-rose-900/30 mb-4">
          <svg className="h-8 w-8 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <p className="text-muted-foreground text-sm">Adjust the inputs to see the calculated result.</p>
      </div>
    )
  }

  const entries = Object.entries(result)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {entries.map(([key, value], i) => {
        const colors = colorPairs[i % colorPairs.length]
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${colors.bg}`}
          >
            <span className={`text-xs font-semibold uppercase tracking-wider ${colors.badge} px-2.5 py-1 rounded-lg`}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className={`text-xl font-bold tabular-nums ${colors.text}`}>
              {String(value)}
            </span>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
