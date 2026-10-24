import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { homeContent } from "@/data/content";
import { ArrowRightIcon } from "@/components/ui/Icons";

export const metadata = {
  title: "About Us",
  description: "Learn about Meridian Journeys, our approach to thoughtful travel and our sample enquiry process.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About us" }]} />
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow={homeContent.about.eyebrow}
                title="Thoughtful travel, clearly planned."
                description={homeContent.about.intro}
              />
              <div className="flex flex-col gap-4 text-[var(--brand-muted)]">
                {homeContent.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="/packages">
                  View packages
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <Button href="/enquire" variant="outline">
                  Start an enquiry
                </Button>
              </div>
              <p className="text-xs text-[var(--brand-muted)]">All copy on this page is demonstration material.</p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="/images/himalaya.jpg"
                alt="Mountain landscape at dawn."
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <section className="rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <h2 className="font-serif text-3xl text-[var(--brand-ink)]">Our mission</h2>
                <p className="mt-3 text-lg text-[var(--brand-muted)]">{homeContent.about.mission}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {homeContent.about.values.map((value) => (
                  <article key={value.title} className="flex flex-col gap-2 rounded-2xl border border-[var(--brand-border)] p-4">
                    <h3 className="font-serif text-lg text-[var(--brand-ink)]">{value.title}</h3>
                    <p className="text-sm text-[var(--brand-muted)]">{value.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <SectionHeading
            eyebrow="What we help with"
            title="Services tailored to different journeys"
            description="These are sample service areas included in the template. Customise to match your agency."
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {homeContent.about.serviceHighlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <article className="flex h-full flex-col gap-2 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft">
                <h3 className="font-serif text-xl text-[var(--brand-ink)]">{item.title}</h3>
                <p className="text-[var(--brand-muted)]">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-[var(--brand-primary)] px-6 py-10 text-center text-white">
            <h2 className="font-serif text-3xl sm:text-4xl">Ready to shape your next journey?</h2>
            <p className="max-w-2xl text-white/80">Start an enquiry and we&apos;ll generate a WhatsApp message for this demo agency. Replace the number and content to make it your own.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href="/enquire">
                Plan my trip
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="outline" className="border-white/40 text-white hover:border-white hover:text-white">
                Contact us
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
