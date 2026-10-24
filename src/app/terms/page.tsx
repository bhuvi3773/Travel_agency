import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { termsAndConditions } from "@/data/legal";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions template for Meridian Journeys demo website.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms & conditions" }]} />
        <Reveal>
          <SectionHeading
            eyebrow="Legal"
            title="Terms & Conditions"
            description="This is a structured template for demonstration purposes. Replace with your agency's actual terms and conditions."
          />
        </Reveal>
        <div className="flex flex-col gap-6">
          {termsAndConditions.map((section, index) => (
            <Reveal key={section.title} delay={index * 40}>
              <section className="rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft sm:p-8">
                <h2 className="font-serif text-2xl text-[var(--brand-ink)]">{section.title}</h2>
                <div className="mt-4 flex flex-col gap-3 text-[var(--brand-muted)]">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-[var(--brand-muted)]">Last updated: Template (demo) — update when replacing with real terms.</p>
      </div>
    </div>
  );
}
