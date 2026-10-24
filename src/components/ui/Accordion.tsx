"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { cx } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  meta?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | null;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, defaultOpen = null, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen ? [defaultOpen] : []);
  const baseId = useId();

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cx("flex flex-col divide-y divide-[var(--brand-border)] rounded-3xl border border-[var(--brand-border)] bg-white shadow-soft", className)}>
      {items.map((item) => {
        const open = openIds.includes(item.id);
        const panelId = `${baseId}-panel-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;
        return (
          <div key={item.id} className="group">
            <button
              id={buttonId}
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[rgba(200,161,90,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <div className="flex flex-col gap-1">
                <span className="font-serif text-lg text-[var(--brand-ink)]">{item.title}</span>
                {item.meta ? <span className="text-xs uppercase tracking-[0.3em] text-[var(--brand-muted)]">{item.meta}</span> : null}
              </div>
              <span className={cx("flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-border)] transition-transform duration-300", open ? "rotate-180" : "")}>
                <ChevronDownIcon />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cx("grid transition-[grid-template-rows] duration-300 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-[var(--brand-muted)] leading-relaxed">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
