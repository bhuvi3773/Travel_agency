"use client";

import { useMemo, useState } from "react";
import { packages, packageCategories, durationOptions } from "@/data/packages";
import { destinations } from "@/data/destinations";
import { PackageCard } from "@/components/travel/PackageCard";
import { EmptyState } from "@/components/ui/EmptyState";

interface InitialFilters {
  q?: string;
  destination?: string;
  category?: string;
  duration?: string;
}

export function PackagesExplorer({ initialFilters }: { initialFilters: InitialFilters }) {
  const [query, setQuery] = useState(initialFilters.q || "");
  const [destination, setDestination] = useState(initialFilters.destination || "");
  const [category, setCategory] = useState(initialFilters.category || "");
  const [duration, setDuration] = useState(initialFilters.duration || "");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = packages.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.highlights.some((h) => h.toLowerCase().includes(q)),
      );
    }
    if (destination) {
      list = list.filter((p) => p.destinationSlug === destination);
    }
    if (category) {
      list = list.filter((p) => p.category === category);
    }
    if (duration) {
      list = list.filter((p) => {
        if (duration === "short") return p.durationDays < 5;
        if (duration === "medium") return p.durationDays >= 5 && p.durationDays <= 7;
        if (duration === "long") return p.durationDays >= 8 && p.durationDays <= 10;
        if (duration === "extended") return p.durationDays > 10;
        return true;
      });
    }
    if (sort === "price-asc") list = list.slice().sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = list.slice().sort((a, b) => b.price - a.price);
    if (sort === "duration-asc") list = list.slice().sort((a, b) => a.durationDays - b.durationDays);
    if (sort === "duration-desc") list = list.slice().sort((a, b) => b.durationDays - a.durationDays);
    if (sort === "featured") list = list.slice().sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [query, destination, category, duration, sort]);

  const activeFilters = [
    query && { key: "q", label: `Search: ${query}`, clear: () => setQuery("") },
    destination && {
      key: "d",
      label: `Destination: ${destinations.find((d) => d.slug === destination)?.name || destination}`,
      clear: () => setDestination(""),
    },
    category && { key: "c", label: `Category: ${category}`, clear: () => setCategory("") },
    duration && {
      key: "dur",
      label: `Duration: ${durationOptions.find((d) => d.value === duration)?.label}`,
      clear: () => setDuration(""),
    },
  ].filter(Boolean) as Array<{ key: string; label: string; clear: () => void }>;

  const clearAll = () => {
    setQuery("");
    setDestination("");
    setCategory("");
    setDuration("");
    setSort("featured");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-4 shadow-soft sm:p-6">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, destination or highlight"
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-label="Search packages"
          />
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            {packageCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-label="Filter by duration"
          >
            <option value="">Any duration</option>
            {durationOptions.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-label="Sort packages"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="duration-asc">Duration: Short to long</option>
            <option value="duration-desc">Duration: Long to short</option>
          </select>
        </div>
        {activeFilters.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={f.clear}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-border)] px-3 py-1 text-xs text-[var(--brand-muted)] transition-colors hover:text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
              >
                {f.label}
                <span aria-hidden="true">×</span>
              </button>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]"
            >
              Clear all
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[var(--brand-muted)]">
          Showing <span className="text-[var(--brand-ink)]">{filtered.length}</span> of {packages.length} sample packages
        </p>
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="No packages match your filters" description="Try adjusting your search or clearing filters to see more itineraries." ctaLabel="Clear filters" ctaHref="/packages" />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}
