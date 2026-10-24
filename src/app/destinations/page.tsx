import { SectionHeading } from "@/components/ui/SectionHeading";
import { DestinationsExplorer } from "@/components/destinations/DestinationsExplorer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Destinations",
  description: "Explore destinations across India, Asia, Europe, the Middle East and more, with links to curated packages.",
};

export default function DestinationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Destinations" }]} />
        <SectionHeading
          eyebrow="Destinations"
          title="Where the story begins"
          description="Browse destinations and jump straight to packages that include them. All content is sample/demo material."
        />
        <DestinationsExplorer />
      </div>
    </div>
  );
}
