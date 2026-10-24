import type { HomeCategory, Offer, ProcessStep, WhyItem } from "@/lib/types";

export const homeContent = {
  hero: {
    eyebrow: "Curated travel · Sample template",
    title: "Journeys that feel",
    titleAccent: "personal, not packaged.",
    description:
      "Thoughtful itineraries, honest details and a simple enquiry flow — built for agencies who care about the way travel feels.",
    image: "/images/hero.jpg",
    alt: "Sunlit mountain lake and forest landscape at dawn.",
  },
  introduction: {
    eyebrow: "Travel with intention",
    title: "A calmer way to plan the trip you have been imagining.",
    description:
      "Meridian is a demonstration travel agency template designed around clarity. Every itinerary is presented with useful detail, every page has a purpose, and every enquiry starts a real conversation.",
  },
  categories: [
    {
      key: "honeymoon",
      label: "Honeymoon",
      description: "Private, unhurried stays with a sense of occasion.",
      image: "/images/honeymoon.jpg",
      alt: "Quiet resort pool framed by palm trees.",
      packageCategory: "Honeymoon",
    },
    {
      key: "family",
      label: "Family",
      description: "Balanced days that work for every generation.",
      image: "/images/family.jpg",
      alt: "Traveller planning a journey with a map and camera.",
      packageCategory: "Family",
    },
    {
      key: "adventure",
      label: "Adventure",
      description: "Big landscapes with sensible pacing and local guides.",
      image: "/images/adventure.jpg",
      alt: "Hikers walking through a dramatic mountain landscape.",
      packageCategory: "Adventure",
    },
    {
      key: "culture",
      label: "Culture",
      description: "Craft, food, architecture and stories worth slowing down for.",
      image: "/images/culture.jpg",
      alt: "Historic European canal and architecture.",
      packageCategory: "Culture",
    },
    {
      key: "pilgrimage",
      label: "Pilgrimage",
      description: "Respectful, well-organised journeys with quiet time built in.",
      image: "/images/pilgrimage.jpg",
      alt: "Historic temple architecture in India.",
      packageCategory: "Pilgrimage",
    },
    {
      key: "weekend",
      label: "Weekend",
      description: "Short escapes that feel longer than two nights away.",
      image: "/images/weekend.jpg",
      alt: "Open road through a mountain landscape.",
      packageCategory: "Weekend",
    },
  ] satisfies HomeCategory[],
  offers: [
    {
      id: "aegean",
      eyebrow: "Sample offer",
      title: "Aegean shoulder-season escape",
      description:
        "An example seasonal saving on selected Santorini departures. Replace this offer with your own live promotion.",
      badge: "Save 10% — sample",
      image: "/images/santorini.jpg",
      alt: "Whitewashed Santorini buildings above the blue Aegean Sea.",
      ctaLabel: "View Santorini journey",
      ctaHref: "/packages/santorini-aegean-escape",
      demo: true,
    },
    {
      id: "backwaters",
      eyebrow: "Sample offer",
      title: "Kerala, at an unhurried pace",
      description:
        "An example family offer with private houseboat time and a slower route through the backwaters.",
      badge: "Complimentary upgrade — sample",
      image: "/images/kerala.jpg",
      alt: "Kerala houseboat on calm backwaters.",
      ctaLabel: "View Kerala journey",
      ctaHref: "/packages/kerala-backwater-journey",
      demo: true,
    },
  ] satisfies Offer[],
  whyUs: [
    {
      title: "Details you can trust",
      description:
        "Clear inclusions, realistic pacing and honest notes — so you know what a journey really looks like before you enquire.",
    },
    {
      title: "Built around people",
      description:
        "Every template page is a starting point for a conversation, with space for preferences, questions and the unexpected.",
    },
    {
      title: "A local point of contact",
      description:
        "A simple, human enquiry flow with WhatsApp, email and phone alternatives. No account creation required.",
    },
  ] satisfies WhyItem[],
  process: [
    {
      step: 1,
      title: "Choose a starting point",
      description: "Browse destinations or packages and shortlist the ones that feel right.",
    },
    {
      step: 2,
      title: "Share your preferences",
      description: "Send an enquiry with dates, travellers and any special requirements.",
    },
    {
      step: 3,
      title: "We confirm availability",
      description: "The agency reviews the request and comes back with availability and next steps.",
    },
    {
      step: 4,
      title: "Refine the details",
      description: "Discuss inclusions, timings and any changes before confirming your journey.",
    },
  ] satisfies ProcessStep[],
  about: {
    eyebrow: "Our approach",
    intro:
      "We believe a good trip starts long before departure — with careful listening, clear information and an itinerary that leaves room to breathe.",
    paragraphs: [
      "This template is written for independent travel agencies, family-run tour operators and specialists who want a polished digital presence without a heavy booking system. The design prioritises destination photography, legible itineraries and an enquiry experience that feels personal.",
      "The content, packages and contact details here are demonstration material. Customise the central config and data files to make the site your own, then connect the enquiry workflow to the tools your team already uses.",
    ],
    mission:
      "To make travel planning feel clear, considered and genuinely helpful — at every step.",
    values: [
      {
        title: "Clarity over clutter",
        description:
          "Useful facts, readable itineraries and no invented claims. What you see is what you can ask about.",
      },
      {
        title: "Room to be flexible",
        description:
          "Every itinerary is a framework. Dates, pacing and inclusions can be refined together before booking.",
      },
      {
        title: "Respect for place",
        description:
          "Thoughtful routing, local partners and guidance on travelling with care are central to the approach.",
      },
    ] satisfies WhyItem[],
    serviceHighlights: [
      {
        title: "Domestic & international itineraries",
        description: "From short weekend breaks to longer multi-city journeys.",
      },
      {
        title: "Honeymoon & family travel",
        description: "Comfortable pacing, considered stays and age-appropriate activities.",
      },
      {
        title: "Pilgrimage & cultural journeys",
        description: "Respectful planning with time for reflection and local context.",
      },
      {
        title: "Adventure & small-group travel",
        description: "Experienced planning for high-altitude and active itineraries.",
      },
    ] satisfies WhyItem[],
  },
  contact: {
    eyebrow: "Start a conversation",
    title: "Tell us what you have in mind.",
    description:
      "Share a few details and the agency will come back with availability and sensible next steps. Prefer to talk? Use the direct contact options alongside the form.",
  },
  enquiry: {
    eyebrow: "Booking enquiry",
    title: "Let's shape your journey.",
    description:
      "This demo form generates a WhatsApp message addressed to the configured agency number. Nothing is stored or sent automatically.",
  },
};

export const categoryLabels = [
  "Honeymoon",
  "Family",
  "Adventure",
  "Culture",
  "Pilgrimage",
  "Weekend",
] as const;
