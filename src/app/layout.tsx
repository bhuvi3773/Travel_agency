import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  openGraph: {
    type: "website",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} h-full`}>
      <body
        className="min-h-full flex flex-col bg-[var(--brand-bg)] text-[var(--brand-ink)] antialiased"
        style={
          {
            "--brand-primary": siteConfig.colors.primary,
            "--brand-primary-dark": siteConfig.colors.primaryDark,
            "--brand-secondary": siteConfig.colors.secondary,
            "--brand-secondary-soft": siteConfig.colors.secondarySoft,
            "--brand-accent": siteConfig.colors.accent,
            "--brand-accent-warm": siteConfig.colors.accentWarm,
            "--brand-bg": siteConfig.colors.background,
            "--brand-surface": siteConfig.colors.surface,
            "--brand-ink": siteConfig.colors.ink,
            "--brand-muted": siteConfig.colors.muted,
            "--brand-border": siteConfig.colors.border,
          } as React.CSSProperties
        }
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
