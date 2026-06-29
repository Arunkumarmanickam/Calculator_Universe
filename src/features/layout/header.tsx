'use client'

import Link from 'next/link'
import { Calculator, Moon, Sun, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { useState } from 'react'
import { CategoryNav } from './category-nav'
import { MobileNav } from './mobile-nav'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white shadow-md group-hover:shadow-lg group-hover:shadow-orange-200/50 dark:group-hover:shadow-orange-800/30 transition-shadow">
            <Calculator className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-orange-600 to-rose-600 dark:from-orange-400 dark:to-rose-400 bg-clip-text text-transparent">
            Calculator Universe
          </span>
        </Link>

        <CategoryNav />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/30"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl md:hidden hover:bg-orange-50 dark:hover:bg-orange-950/30"
            aria-label="Menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
