"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, footerNavigation } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { buildContactWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const whatsappUrl = buildContactWhatsAppUrl();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-20 border-t border-[var(--brand-border)] bg-[rgba(6,25,35,0.98)] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div className="flex flex-col gap-6">
          <Logo className="text-white" />
          <p className="max-w-sm text-white/80">
            {siteConfig.tagline} A premium travel agency template with curated itineraries and a sample enquiry workflow.
          </p>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <span>{siteConfig.contact.address}</span>
            <span>{siteConfig.contact.hours}</span>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Demo template • Sample content</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-lg">Explore</h3>
          <ul className="flex flex-col gap-2 text-white/80">
            {footerNavigation.explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-lg">Company</h3>
          <ul className="flex flex-col gap-2 text-white/80">
            {footerNavigation.company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="font-serif text-lg">Support</h3>
          <ul className="flex flex-col gap-2 text-white/80">
            {footerNavigation.support.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-lg">Get in touch</h3>
          <ul className="flex flex-col gap-3 text-white/80">
            <li>
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <PhoneIcon />
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <MailIcon />
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <WhatsAppIcon />
                  WhatsApp (demo number)
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 opacity-70">
                  <WhatsAppIcon />
                  WhatsApp not configured
                </span>
              )}
            </li>
          </ul>
          <p className="text-xs text-white/60">{siteConfig.contact.demoNote}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {year ?? 2026} {siteConfig.name}. All rights reserved.</p>
          <p>Built as a reusable travel agency template. Replace sample content before launch.</p>
        </div>
      </div>
    </footer>
  );
}
