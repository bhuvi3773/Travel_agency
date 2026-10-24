"use client";

import type { Faq } from "@/lib/types";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const items: AccordionItem[] = faqs.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: <p>{faq.answer}</p>,
  }));
  return <Accordion items={items} defaultOpen={faqs[0]?.id ?? null} />;
}
