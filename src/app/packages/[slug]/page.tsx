import { notFound } from "next/navigation";
import Link from "next/link";
import { getPackageBySlug, getRelatedPackages } from "@/data/packages";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Gallery } from "@/components/travel/Gallery";
import { Itinerary } from "@/components/travel/Itinerary";
import { PackageCard } from "@/components/travel/PackageCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, CalendarIcon, MapPinIcon } from "@/components/ui/Icons";
import { formatPriceINR } from "@/lib/utils";

interface PackageDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { packages } = await import("@/data/packages");
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: PackageDetailProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: "Package not found" };
  return {
    title: `${pkg.title}`,
    description: pkg.summary,
  };
}

export default async function PackageDetailPage({ params }: PackageDetailProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const related = getRelatedPackages(pkg.slug, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tour Packages", href: "/packages" },
            { label: pkg.title },
          ]}
        />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--brand-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  {pkg.destination}, {pkg.country}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {pkg.durationDays} Days / {pkg.durationNights} Nights
                </span>
                <span className="rounded-full border border-[var(--brand-border)] px-3 py-1">{pkg.category}</span>
                {pkg.demoNote ? <span className="rounded-full bg-[var(--brand-accent)]/80 px-3 py-1 text-[var(--brand-primary-dark)]">Sample itinerary</span> : null}
              </div>
              <h1 className="font-serif text-4xl text-[var(--brand-ink)] sm:text-5xl">{pkg.title}</h1>
              <p className="text-lg text-[var(--brand-muted)]">{pkg.summary}</p>
            </div>
            <Gallery images={pkg.images} altBase={pkg.title} />
            <Reveal>
              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl text-[var(--brand-ink)]">Overview</h2>
                <p className="text-[var(--brand-muted)] leading-relaxed">{pkg.description}</p>
              </section>
            </Reveal>
            <Reveal>
              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl text-[var(--brand-ink)]">Highlights</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {pkg.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 rounded-2xl border border-[var(--brand-border)] bg-white p-4 shadow-soft">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
                      <span className="text-[var(--brand-ink)]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
            <Reveal>
              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl text-[var(--brand-ink)]">Day by day itinerary</h2>
                <p className="text-[var(--brand-muted)]">A sample day-by-day outline. Pacing can be adjusted to suit preferences.</p>
                <Itinerary days={pkg.itinerary} />
              </section>
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              <Reveal>
                <section className="flex h-full flex-col gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft">
                  <h2 className="font-serif text-2xl text-[var(--brand-ink)]">Inclusions</h2>
                  <ul className="flex flex-col gap-2">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[var(--brand-muted)]">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand-secondary)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
              <Reveal>
                <section className="flex h-full flex-col gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft">
                  <h2 className="font-serif text-2xl text-[var(--brand-ink)]">Exclusions</h2>
                  <ul className="flex flex-col gap-2">
                    {pkg.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[var(--brand-muted)]">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand-accentWarm)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            </div>
            {pkg.notes && pkg.notes.length > 0 ? (
              <Reveal>
                <section className="flex flex-col gap-3 rounded-3xl border border-[var(--brand-border)] bg-[rgba(200,161,90,0.08)] p-6">
                  <h2 className="font-serif text-xl text-[var(--brand-ink)]">Important notes (sample)</h2>
                  <ul className="flex flex-col gap-2 text-[var(--brand-muted)]">
                    {pkg.notes.map((note) => (
                      <li key={note}>• {note}</li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ) : null}
          </div>
          <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
            <div className="flex flex-col gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-muted)]">Starting from</p>
                  <p className="font-serif text-3xl text-[var(--brand-ink)]">{formatPriceINR(pkg.price)}</p>
                </div>
                {pkg.demoNote ? <span className="rounded-full bg-[rgba(200,161,90,0.2)] px-3 py-1 text-xs text-[var(--brand-primary-dark)]">Sample price</span> : null}
              </div>
              <div className="grid gap-3 text-sm text-[var(--brand-muted)]">
                <div className="flex items-center justify-between">
                  <span>Duration</span>
                  <span className="text-[var(--brand-ink)]">{pkg.durationDays}D / {pkg.durationNights}N</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Destination</span>
                  <span className="text-[var(--brand-ink)]">{pkg.destination}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Category</span>
                  <span className="text-[var(--brand-ink)]">{pkg.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Best season</span>
                  <span className="text-[var(--brand-ink)]">{pkg.bestSeason || "On enquiry"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Group size</span>
                  <span className="text-[var(--brand-ink)]">{pkg.groupSize || "Private / Flexible"}</span>
                </div>
              </div>
              <Button href={`/enquire?package=${pkg.slug}`} className="w-full">
                Enquire now
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="outline" className="w-full">
                Ask a question
              </Button>
              <p className="text-xs text-[var(--brand-muted)]">
                Enquiry generates a WhatsApp message to the demo agency number. Availability and final pricing will be confirmed.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft">
              <h3 className="font-serif text-xl text-[var(--brand-ink)]">Looking for something else?</h3>
              <p className="text-[var(--brand-muted)]">Browse destinations or tell us your preferred dates and style.</p>
              <div className="flex flex-wrap gap-2">
                <Button href="/destinations" variant="outline">
                  Destinations
                </Button>
                <Button href="/packages" variant="ghost">
                  All packages
                </Button>
              </div>
            </div>
          </aside>
        </div>
        {related.length > 0 ? (
          <section className="mt-16 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[var(--brand-ink)] sm:text-3xl">Related packages</h2>
              <Link href="/packages" className="text-sm text-[var(--brand-primary)]">
                View all
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((rp) => (
                <PackageCard key={rp.slug} pkg={rp} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
