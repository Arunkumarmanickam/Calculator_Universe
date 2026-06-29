import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeInit } from '@/components/theme-init'
import { Header } from '@/features/layout/header'
import { Footer } from '@/features/layout/footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: { default: 'Calculator Universe', template: '%s | Calculator Universe' },
  description: 'A universe of free online calculators for finance, health, math, and more.',
  metadataBase: new URL('https://calculatoruniverse.com'),
  openGraph: {
    title: 'Calculator Universe',
    description: 'A universe of free online calculators for finance, health, math, and more.',
    type: 'website',
    siteName: 'Calculator Universe',
  },
  twitter: { card: 'summary_large_image', title: 'Calculator Universe', description: 'A universe of free online calculators.' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeInit />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
