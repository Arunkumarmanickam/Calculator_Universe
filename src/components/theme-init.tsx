'use client'

import { useEffect } from 'react'

export function ThemeInit() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return null
}
