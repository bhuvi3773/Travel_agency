import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function EmptyState({ title, description, ctaLabel = "View all packages", ctaHref = "/packages" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-[var(--brand-border)] bg-white/80 px-6 py-12 text-center shadow-soft">
      <h3 className="font-serif text-2xl text-[var(--brand-ink)]">{title}</h3>
      <p className="max-w-md text-[var(--brand-muted)]">{description}</p>
      <Button href={ctaHref}>{ctaLabel}</Button>
    </div>
  );
}
