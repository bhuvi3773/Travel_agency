import Link from "next/link";
import { CompassIcon } from "@/components/ui/Icons";
import { cx } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cx("flex items-center gap-2.5 group", className)} aria-label="Meridian Journeys home">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white shadow-soft transition-transform duration-300 group-hover:scale-105">
        <CompassIcon className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg tracking-[0.18em] uppercase">Meridian</span>
        <span className="text-[10px] uppercase tracking-[0.38em] text-[var(--brand-muted)]">Journeys</span>
      </span>
    </Link>
  );
}
