import { Suspense } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackagesExplorer } from "@/components/packages/PackagesExplorer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Tour Packages",
  description: "Browse curated domestic and international tour packages with filters and enquiry support.",
};

interface PackagesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getSingle(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function PackagesPage({ searchParams }: PackagesPageProps) {
  const sp = await searchParams;
  const initialFilters = {
    q: getSingle(sp.q) || "",
    destination: getSingle(sp.destination) || "",
    category: getSingle(sp.category) || "",
    duration: getSingle(sp.duration) || "",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tour Packages" }]} />
        <SectionHeading
          eyebrow="Our packages"
          title="Curated itineraries to explore"
          description="Search, filter and sort sample itineraries. Every package includes highlights, a day-by-day outline, inclusions and exclusions with an easy path to enquiry."
        />
        <p className="text-sm text-[var(--brand-muted)]">All packages and prices shown are sample/demo content.</p>
        <Suspense fallback={<div className="rounded-3xl border border-[var(--brand-border)] bg-white p-8 text-[var(--brand-muted)]">Loading packages...</div>}>
          <PackagesExplorer initialFilters={initialFilters} />
        </Suspense>
      </div>
    </div>
  );
}
