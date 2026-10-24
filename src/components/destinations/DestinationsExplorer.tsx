"use client";

import { useMemo, useState } from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/travel/DestinationCard";
import { EmptyState } from "@/components/ui/EmptyState";

const regions = ["All", "India", "Asia", "Europe", "Middle East", "Islands", "Africa"] as const;

export function DestinationsExplorer() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<(typeof regions)[number]>("All");

  const filtered = useMemo(() => {
    let list = destinations.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.shortDescription.toLowerCase().includes(q),
      );
    }
    if (region !== "All") {
      list = list.filter((d) => d.region === region);
    }
    return list.sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [query, region]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:p-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations or countries"
          className="flex-1 rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
          aria-label="Search destinations"
        />
        <div className="flex flex-wrap items-center gap-2">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)] ${
                region === r
                  ? "bg-[var(--brand-primary)] text-white"
                  : "border border-[var(--brand-border)] text-[var(--brand-muted)] hover:text-[var(--brand-primary)]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[var(--brand-muted)]">
          Showing <span className="text-[var(--brand-ink)]">{filtered.length}</span> destinations
        </p>
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="No destinations match" description="Try a different region or search term." ctaLabel="View all packages" ctaHref="/packages" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      )}
      <div className="rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft sm:p-8">
        <h2 className="font-serif text-2xl text-[var(--brand-ink)]">Find packages by destination</h2>
        <p className="mt-2 text-[var(--brand-muted)]">
          Every destination card links to the packages listing filtered by that place. You can also search and filter directly on the Packages page.
        </p>
      </div>
    </div>
  );
}
