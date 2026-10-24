import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/travel/FaqAccordion";
import { faqs } from "@/data/faqs";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about this travel agency template and the enquiry process.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Answers about the demo template, customisation, the enquiry flow and WhatsApp integration."
          />
        </Reveal>
        <Reveal>
          <FaqAccordion faqs={faqs} />
        </Reveal>
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-8 text-center shadow-soft">
            <h2 className="font-serif text-2xl text-[var(--brand-ink)]">Still have questions?</h2>
            <p className="max-w-xl text-[var(--brand-muted)]">Use the enquiry form to start a conversation, or reach out via the contact page. All interactions are demo-only in this template.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href="/enquire">
                Start an enquiry
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="outline">
                Contact us
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
