"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MenuIcon, XIcon } from "@/components/ui/Icons";
import { cx } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Defer to avoid cascading renders
    const t = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(230,223,210,0.8)] bg-[rgba(248,245,239,0.9)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-10 lg:flex">
          {siteConfig.navigation.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "text-sm uppercase tracking-[0.24em]",
                  active ? "text-[var(--brand-primary)]" : "text-[var(--brand-ink)] transition-colors hover:text-[var(--brand-primary)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/enquire" variant="primary" className="px-6 py-2 text-xs">
            Plan my trip
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[rgba(231,223,207,0.9)] bg-white/80 p-2.5 text-[var(--brand-ink)] transition-all duration-300 hover:text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)] lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>
      <div
        id="mobile-menu"
        className={cx(
          "lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cx(
            "fixed inset-0 bg-[rgba(6,25,35,0.4)] transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cx(
            "fixed right-0 top-0 flex h-full w-full max-w-sm flex-col gap-6 bg-[var(--brand-bg)] px-6 pb-10 pt-6 shadow-lift transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-[var(--brand-border)] p-2 text-[var(--brand-ink)]"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            >
              <XIcon />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            {siteConfig.navigation.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "text-lg",
                    active ? "text-[var(--brand-primary)]" : "text-[var(--brand-ink)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Button href="/enquire" className="mt-auto">
            Plan my trip
          </Button>
          <p className="text-xs text-[var(--brand-muted)]">Demo template — all content and contact details are sample.</p>
        </div>
      </div>
    </header>
  );
}
