import { siteConfig } from "@/config/site";
import { formatPriceINR } from "@/lib/utils";
import type { TourPackage } from "@/lib/types";

export function normaliseWhatsAppNumber(number: string) {
  if (!number) return "";
  return number.replace(/\D/g, "");
}

export function getWhatsAppNumber() {
  return normaliseWhatsAppNumber(siteConfig.contact.whatsapp);
}

export function buildWhatsAppUrl(message: string) {
  const digits = getWhatsAppNumber();
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export interface EnquiryWhatsAppInput {
  fullName: string;
  phoneCountryCode: string;
  phoneNumber: string;
  email?: string;
  packageSlug?: string;
  package?: TourPackage | null;
  destination?: string;
  departureDate: string;
  returnDate: string;
  adults: string;
  children: string;
  requirements?: string;
  source?: string;
}

export function buildEnquiryWhatsAppMessage(input: EnquiryWhatsAppInput) {
  const digits = input.phoneCountryCode.replace(/\D/g, "");
  const phone = `${digits}${input.phoneNumber.replace(/\D/g, "")}`;
  const travellers = `${input.adults} adult(s), ${input.children} child(ren)`;
  const packageLine = input.package
    ? `Package: ${input.package.title} (${input.package.destination}, ${input.package.durationDays}D/${input.package.durationNights}N) — Starting from ${formatPriceINR(input.package.price)} (sample)`
    : input.packageSlug
      ? `Package: ${input.packageSlug} (see website)`
      : "Package/Destination: Not specified";
  const destinationLine = input.destination && !input.package ? `Destination: ${input.destination}` : "";

  const lines = [
    "New travel enquiry — Meridian Journeys (Demo)",
    "",
    `Name: ${input.fullName}`,
    `Phone: +${phone}`,
    input.email ? `Email: ${input.email}` : "Email: Not provided",
    packageLine,
    destinationLine,
    "",
    `Preferred departure: ${input.departureDate}`,
    `Return date: ${input.returnDate}`,
    `Travellers: ${travellers}`,
    "",
    "Special requirements:",
    input.requirements?.trim() ? input.requirements.trim() : "None",
    "",
    "Source: " + (input.source || "Website enquiry form"),
    "",
    "Please confirm availability and next steps. (This is a demo enquiry from the template site.)",
  ].filter((l) => l !== "");

  return lines.join("\n");
}

export function buildContactWhatsAppUrl() {
  const message = [
    "Hello Meridian Journeys, I'd like to know more about your travel packages.",
    "(This message is from the Meridian Journeys demo template.)",
  ].join("\n");
  return buildWhatsAppUrl(message);
}
