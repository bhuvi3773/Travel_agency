import Image from "next/image";
import Link from "next/link";
import type { TourPackage } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, CalendarIcon, MapPinIcon } from "@/components/ui/Icons";
import { formatPriceINR } from "@/lib/utils";

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[rgba(231,223,207,0.9)] bg-white shadow-card transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-lift">
      <Link href={`/packages/${pkg.slug}`} className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={pkg.images[0]}
          alt={`${pkg.title} in ${pkg.destination}`}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span className="rounded-full bg-white/95 px-4 py-1 text-[10px] uppercase tracking-[0.4em] text-[var(--brand-primary)] shadow-soft">
            {pkg.category}
          </span>
          {pkg.demoNote ? (
            <span className="rounded-full bg-[var(--brand-accent)]/95 px-4 py-1 text-[10px] uppercase tracking-[0.35em] text-[var(--brand-primary-dark)] shadow-soft">
              Sample
            </span>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.36em] text-[var(--brand-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="h-3.5 w-3.5" />
            {pkg.destination}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            {pkg.durationDays}D / {pkg.durationNights}N
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Link href={`/packages/${pkg.slug}`} className="font-serif text-2xl leading-tight text-[var(--brand-ink)] transition-colors hover:text-[var(--brand-primary)] sm:text-3xl">
            {pkg.title}
          </Link>
          <p className="text-[var(--brand-muted)]">{pkg.summary}</p>
        </div>
        <ul className="flex flex-col gap-2 text-sm text-[var(--brand-muted)]">
          {pkg.highlights.slice(0, 2).map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)]" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-4 border-t border-[rgba(231,223,207,0.9)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--brand-muted)]">Starting from</span>
            <span className="font-serif text-2xl text-[var(--brand-ink)]">{formatPriceINR(pkg.price)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button href={`/packages/${pkg.slug}`} variant="outline" className="px-6 py-2 text-xs">
              View details
            </Button>
            <Button href={`/enquire?package=${pkg.slug}`} className="px-6 py-2 text-xs">
              Enquire now
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
