export type TravelCategory =
  | "Honeymoon"
  | "Family"
  | "Adventure"
  | "Culture"
  | "Pilgrimage"
  | "Weekend";

export type DestinationRegion = "India" | "Asia" | "Europe" | "Middle East" | "Islands" | "Africa";

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: DestinationRegion;
  image: string;
  alt: string;
  shortDescription: string;
  bestTime?: string;
  idealDuration?: string;
  tags: TravelCategory[];
  featured?: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPackage {
  slug: string;
  title: string;
  destinationSlug: string;
  destination: string;
  country: string;
  durationDays: number;
  durationNights: number;
  price: number;
  currency: string;
  category: TravelCategory;
  summary: string;
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  notes?: string[];
  images: string[];
  featured?: boolean;
  bestSeason?: string;
  groupSize?: string;
  demoNote?: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface HomeCategory {
  key: "honeymoon" | "family" | "adventure" | "culture" | "pilgrimage" | "weekend";
  label: string;
  description: string;
  image: string;
  alt: string;
  packageCategory: TravelCategory;
}

export interface Offer {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  image: string;
  alt: string;
  ctaLabel: string;
  ctaHref: string;
  demo?: boolean;
}

export interface WhyItem {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}
