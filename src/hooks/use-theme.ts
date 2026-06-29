'use client'

import { useCallback, useSyncExternalStore } from 'react'

function getSnapshot(): string {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(() => callback())
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'light')

  const setTheme = useCallback((next: 'light' | 'dark') => {
    const root = document.documentElement
    root.classList.toggle('dark', next === 'dark')
    try { localStorage.setItem('theme', next) } catch {}
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return { theme, setTheme, toggleTheme }
}
