import Link from "next/link";
import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "outline" | "subtle";

interface ButtonBaseProps {
  className?: string;
  variant?: ButtonVariant;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand-primary)] text-white shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[var(--brand-primary-dark)] hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)] active:translate-y-0",
  outline:
    "border border-[rgba(231,223,207,0.9)] bg-white/90 text-[var(--brand-ink)] shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--brand-accent)] hover:text-[var(--brand-primary)] hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)] active:translate-y-0",
  ghost:
    "text-[var(--brand-ink)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]",
  subtle:
    "bg-[rgba(6,29,44,0.06)] text-[var(--brand-primary)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[rgba(6,29,44,0.1)] hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)] active:translate-y-0",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-2.5 text-sm font-medium tracking-[0.12em] uppercase transition-transform duration-300 ease-out";

export function Button(props: ButtonProps) {
  const { className, variant = "primary", children, ...rest } = props;

  if ("href" in props && props.href) {
    const href = props.href;
    const { href: _h, ...linkRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string };
    const isExternal = typeof href === "string" && href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          className={cx(base, variants[variant], className)}
          target="_blank"
          rel="noopener noreferrer"
          {...linkRest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cx(base, variants[variant], className)} {...(linkRest as any)}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cx(base, variants[variant], className)} {...buttonRest}>
      {children}
    </button>
  );
}
