import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DestinationCard } from "@/components/travel/DestinationCard";
import { PackageCard } from "@/components/travel/PackageCard";
import { destinations } from "@/data/destinations";
import { getFeaturedPackages } from "@/data/packages";
import { homeContent } from "@/data/content";
import { faqs } from "@/data/faqs";
import { FaqAccordion } from "@/components/travel/FaqAccordion";
import { ArrowRightIcon } from "@/components/ui/Icons";

export const metadata = {
  title: "Home",
};

export default function HomePage() {
  const featuredDestinations = destinations.filter((d) => d.featured).slice(0, 6);
  const featuredPackages = getFeaturedPackages(3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={homeContent.hero.image}
            alt={homeContent.hero.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,25,35,0.92)] via-[rgba(6,25,35,0.7)] to-[rgba(6,25,35,0.4)]" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div className="flex max-w-3xl flex-col gap-7 text-white">
            <span className="text-xs uppercase tracking-[0.6em] text-white/70">{homeContent.hero.eyebrow}</span>
            <h1 className="font-serif text-4xl leading-[1.02] sm:text-5xl lg:text-6xl xl:text-7xl">
              {homeContent.hero.title} <span className="italic">{homeContent.hero.titleAccent}</span>
            </h1>
            <p className="max-w-2xl text-lg text-white/80 sm:text-xl">{homeContent.hero.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/packages">
                Explore packages
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href="/enquire" variant="outline" className="border-white/40 bg-white/5 text-white hover:border-white hover:text-white">
                Start an enquiry
              </Button>
            </div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">Demo template • {siteConfig.name}</p>
          </div>
          <div className="w-full max-w-xl rounded-[32px] border border-white/30 bg-[rgba(247,245,241,0.98)] p-6 text-[var(--brand-ink)] shadow-lift backdrop-blur lg:ml-auto sm:p-8">
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="font-serif text-3xl">Find your journey</h2>
                <p className="text-[var(--brand-muted)]">Search by destination, travel style or name.</p>
              </div>
              <form action="/packages" method="get" className="grid gap-3">
                <input
                  name="q"
                  type="search"
                  placeholder="e.g. Santorini, Kerala, honeymoon"
                  className="rounded-full border border-[rgba(231,223,207,0.9)] px-5 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
                  aria-label="Search packages"
                />
                <select
                  name="destination"
                  className="rounded-full border border-[rgba(231,223,207,0.9)] px-5 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
                  aria-label="Filter by destination"
                >
                  <option value="">All destinations</option>
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}, {d.country}
                    </option>
                  ))}
                </select>
                <select
                  name="category"
                  className="rounded-full border border-[rgba(231,223,207,0.9)] px-5 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
                  aria-label="Filter by travel style"
                >
                  <option value="">Any travel style</option>
                  {homeContent.categories.map((c) => (
                    <option key={c.key} value={c.packageCategory}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <Button type="submit" className="w-full">
                  Search packages
                </Button>
              </form>
              <p className="text-xs text-[var(--brand-muted)]">Filters work on the Packages page. This is a demo search.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Popular destinations"
            title="Places people return to"
            description="Handpicked destinations featured in the sample itineraries. Click any card to browse related packages."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredDestinations.map((destination, index) => (
            <Reveal key={destination.slug} delay={index * 80}>
              <DestinationCard destination={destination} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="/destinations" variant="outline">
            View all destinations
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Featured packages"
            title="Curated journeys, ready to shape"
            description="Sample itineraries with clear inclusions, realistic pacing and an easy path to an enquiry."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredPackages.map((pkg, index) => (
            <Reveal key={pkg.slug} delay={index * 80}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/packages">
            View all packages
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Travel styles"
            title="Journeys for every kind of trip"
            description="Browse by the way you like to travel. Each category filters the packages listing."
            align="center"
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeContent.categories.map((category, index) => (
            <Reveal key={category.key} delay={index * 60}>
              <Link
                href={`/packages?category=${encodeURIComponent(category.packageCategory)}`}
                className="group relative flex h-48 items-end overflow-hidden rounded-3xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
              >
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,25,35,0.9)] via-[rgba(6,25,35,0.25)] to-transparent" />
                <div className="relative flex w-full items-end justify-between p-6 text-white">
                  <div>
                    <h3 className="font-serif text-xl">{category.label}</h3>
                    <p className="text-sm text-white/80">{category.description}</p>
                  </div>
                  <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Special offers"
            title="Sample promotions, clearly marked"
            description="These offers are demonstration material only. Replace with your own live promotions when customising the template."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {homeContent.offers.map((offer, index) => (
            <Reveal key={offer.id} delay={index * 80}>
              <article className="group relative overflow-hidden rounded-3xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={offer.image}
                    alt={offer.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,25,35,0.92)] via-[rgba(6,25,35,0.6)] to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.4em] text-white/70">{offer.eyebrow}</span>
                    {offer.badge ? (
                      <span className="rounded-full bg-[var(--brand-accent)] px-3 py-1 text-xs uppercase tracking-[0.25em] text-[var(--brand-primary-dark)]">
                        {offer.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-serif text-3xl sm:text-4xl">{offer.title}</h3>
                    <p className="max-w-md text-white/80">{offer.description}</p>
                    <Button href={offer.ctaHref} variant="outline" className="w-fit border-white/40 text-white hover:border-white hover:text-white">
                      {offer.ctaLabel}
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why choose us"
            title={homeContent.introduction.title}
            description={homeContent.introduction.description}
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {homeContent.whyUs.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <article className="flex h-full flex-col gap-3 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft">
                <h3 className="font-serif text-xl text-[var(--brand-ink)]">{item.title}</h3>
                <p className="text-[var(--brand-muted)]">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="A simple path from idea to enquiry"
            description="No account needed. Share preferences and the agency confirms availability with next steps."
            align="center"
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {homeContent.process.map((step, index) => (
            <Reveal key={step.step} delay={index * 80}>
              <article className="flex h-full flex-col gap-3 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(11,42,58,0.08)] text-sm font-medium text-[var(--brand-primary)]">
                  {step.step}
                </span>
                <h3 className="font-serif text-xl text-[var(--brand-ink)]">{step.title}</h3>
                <p className="text-[var(--brand-muted)]">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Quick answers"
            description="Common questions about this template and the enquiry flow."
          />
        </Reveal>
        <div className="mt-10">
          <FaqAccordion faqs={faqs.slice(0, 5)} />
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/faq" variant="outline">
            View all FAQs
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0">
              <Image
                src="/images/andaman.jpg"
                alt="Coastal landscape and clear water."
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,25,35,0.92)] via-[rgba(6,25,35,0.75)] to-[rgba(6,25,35,0.5)]" />
            </div>
            <div className="relative flex flex-col gap-6 px-6 py-12 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14">
              <div className="flex max-w-2xl flex-col gap-3">
                <span className="text-xs uppercase tracking-[0.5em] text-white/70">Ready to start?</span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">Tell us where you&apos;d like to go.</h2>
                <p className="text-white/80">
                  Share your dates, travellers and preferences. We&apos;ll prepare a WhatsApp message for the demo agency and you&apos;ll connect directly.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="/enquire">
                  Start an enquiry
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <Button href="/packages" variant="outline" className="border-white/40 text-white hover:border-white hover:text-white">
                  Browse packages
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
