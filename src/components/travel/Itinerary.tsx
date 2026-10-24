"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { cx } from "@/lib/utils";
import type { ItineraryDay } from "@/lib/types";

export function Itinerary({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-white shadow-soft">
      {days.map((day, index) => {
        const isOpen = open === index;
        return (
          <div key={day.day} className="border-b border-[var(--brand-border)] last:border-b-0">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[rgba(200,161,90,0.05)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(11,42,58,0.08)] text-sm font-medium text-[var(--brand-primary)]">
                  Day {day.day}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-lg text-[var(--brand-ink)]">{day.title}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-[var(--brand-muted)]">Sample itinerary</span>
                </div>
              </div>
              <span className={cx("mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-border)] transition-transform duration-300", isOpen ? "rotate-180" : "")}>
                <ChevronDownIcon />
              </span>
            </button>
            <div className={cx("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <div className="px-6 pb-6 pl-20 text-[var(--brand-muted)] leading-relaxed">{day.description}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
