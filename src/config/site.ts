import type { NavLink } from "@/lib/types";

export const siteConfig = {
  name: "Meridian Journeys",
  shortName: "Meridian",
  tagline: "Travel, thoughtfully arranged.",
  description:
    "A premium travel agency template showcasing curated domestic and international itineraries, with a sample enquiry flow that connects to WhatsApp.",
  demo: true,
  url: "https://example.com",
  colors: {
    primary: "#061D2C",
    primaryDark: "#041520",
    secondary: "#0F7C81",
    secondarySoft: "#15989E",
    accent: "#B99A5D",
    accentWarm: "#D48A56",
    background: "#F7F5F1",
    surface: "#FFFFFF",
    ink: "#101820",
    muted: "#5F6B75",
    border: "#E7DFCF",
  },
  fonts: {
    serif: "var(--font-cormorant)",
    sans: "var(--font-manrope)",
  },
  contact: {
    phone: "+91 98765 43210",
    phoneHref: "+919876543210",
    whatsapp: "919876543210",
    email: "hello@meridianjourneys.example",
    address: "14 Marine Drive, Fort Kochi, Kochi 682001, India",
    hours: "Mon–Sat, 10:00–18:30 IST",
    demoNote:
      "All contact details above are sample/demo placeholders. Replace with your agency details before going live.",
    responseNote: "Our team typically responds with availability and next steps within one working day.",
  },
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: "Destinations", href: "/destinations" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ] satisfies NavLink[],
  seo: {
    titleTemplate: "%s | Meridian Journeys",
    defaultTitle: "Meridian Journeys | Premium Travel Agency Template",
    defaultDescription:
      "Explore curated tour packages, destinations and a ready-to-use enquiry workflow for modern travel agencies.",
  },
} as const;

export const footerNavigation = {
  explore: [
    { label: "Tour Packages", href: "/packages" },
    { label: "Destinations", href: "/destinations" },
    { label: "Plan your trip", href: "/enquire" },
    { label: "Special offers", href: "/#offers" },
  ],
  company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  support: [
    { label: "Booking enquiry", href: "/enquire" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms & conditions", href: "/terms" },
  ],
} as const;
