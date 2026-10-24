import { Suspense } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { homeContent } from "@/data/content";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Booking Enquiry",
  description: "Submit a booking enquiry for a curated itinerary. Generates a WhatsApp message to the demo agency with validation.",
};

interface EnquirePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getSingle(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function EnquirePage({ searchParams }: EnquirePageProps) {
  const sp = await searchParams;
  const pkg = getSingle(sp.package);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Booking enquiry" }]} />
        <Reveal>
          <SectionHeading
            eyebrow={homeContent.enquiry.eyebrow}
            title={homeContent.enquiry.title}
            description={homeContent.enquiry.description}
          />
        </Reveal>
        <Reveal>
          <div className="rounded-3xl border border-[var(--brand-border)] bg-[rgba(200,161,90,0.08)] p-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-xl text-[var(--brand-ink)]">How this works (demo)</h2>
              <ul className="flex flex-col gap-1 text-[var(--brand-muted)]">
                <li>• Fill the form below and submit to validate your details.</li>
                <li>• A WhatsApp message addressed to the configured demo number will be generated and opened in a new tab.</li>
                <li>• Please review and press send in WhatsApp. The agency will confirm availability and next steps.</li>
                <li>• Nothing is stored or delivered by this template site.</li>
              </ul>
              <p className="text-xs text-[var(--brand-muted)]">{siteConfig.contact.demoNote}</p>
            </div>
          </div>
        </Reveal>
        <Suspense fallback={<div className="rounded-3xl border border-[var(--brand-border)] bg-white p-8 text-[var(--brand-muted)]">Loading enquiry form...</div>}>
          <EnquiryForm initialPackageSlug={pkg} />
        </Suspense>
      </div>
    </div>
  );
}
