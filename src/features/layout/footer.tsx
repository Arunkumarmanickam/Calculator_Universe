import Link from 'next/link'
import { Calculator } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-background to-orange-50/30 dark:to-orange-950/10 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 text-white">
              <Calculator className="h-4 w-4" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-orange-600 to-rose-600 dark:from-orange-400 dark:to-rose-400 bg-clip-text text-transparent">
              Calculator Universe
            </span>
            <span className="mx-2">&middot;</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
