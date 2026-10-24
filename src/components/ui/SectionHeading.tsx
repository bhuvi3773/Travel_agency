import { cx } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div
      className={cx(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-xs uppercase tracking-[0.4em] text-[var(--brand-accent)]">{eyebrow}</span>
      ) : null}
      <h2 className="max-w-3xl font-serif text-3xl leading-tight text-[var(--brand-ink)] sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-[var(--brand-muted)] sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
