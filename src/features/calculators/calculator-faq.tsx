'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface CalculatorFAQProps {
  faq: { q: string; a: string }[]
}

export function CalculatorFAQ({ faq }: CalculatorFAQProps) {
  if (faq.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion className="w-full space-y-2">
        {faq.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5 data-open:border-orange-200 dark:data-open:border-orange-800 transition-colors">
            <AccordionTrigger className="font-semibold text-base">{item.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
