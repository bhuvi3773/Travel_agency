import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { privacyPolicy } from "@/data/legal";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy template for Meridian Journeys demo website.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]} />
        <Reveal>
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy"
            description="This is a structured template for demonstration purposes. Replace with your agency's actual privacy policy."
          />
        </Reveal>
        <div className="flex flex-col gap-6">
          {privacyPolicy.map((section, index) => (
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
        <p className="text-xs text-[var(--brand-muted)]">Last updated: Template (demo) — update when replacing with real policy.</p>
      </div>
    </div>
  );
}
