import Link from "next/link";
import { cx } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cx("flex flex-wrap items-center gap-2 text-sm text-[var(--brand-muted)]", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition-colors hover:text-[var(--brand-primary)]">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-[var(--brand-ink)]" : ""} aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {!isLast ? <span aria-hidden="true">/</span> : null}
          </div>
        );
      })}
    </nav>
  );
}
