import type { Faq } from "@/lib/types";

export const faqs: Faq[] = [
  {
    id: "demo-content",
    question: "Is this a live booking website?",
    answer:
      "No. This is a premium travel agency website template for demonstration and customisation. It has no backend, database, authentication, admin panel or payment gateway. All enquiries use the sample WhatsApp workflow.",
  },
  {
    id: "enquiry-flow",
    question: "How does the enquiry flow work?",
    answer:
      "Browse packages or destinations, click 'Enquire Now' to open the booking enquiry form (pre-filled when coming from a package). After validation, the form generates a clean, URL-encoded WhatsApp message and opens your configured WhatsApp number in a new tab. The template clearly states that the agency will confirm availability. If WhatsApp is not available or not configured, alternative contact details are shown.",
  },
  {
    id: "customise",
    question: "How do I customise this for my agency?",
    answer:
      "Edit the values in src/config/site.ts (agency name, logo details, contact, WhatsApp number, colours) and src/data/*.ts (destinations, packages, FAQs). Components read from these files, so most changes don't require rewriting UI code.",
  },
  {
    id: "data-marking",
    question: "Are the packages and prices real?",
    answer:
      "No. All packages, destinations, prices, itineraries, offers and contact details are sample/demo content included for illustration. Clearly marked throughout the template. Replace them with your own data before going live.",
  },
  {
    id: "responsive",
    question: "Is the website mobile friendly?",
    answer:
      "Yes. The layout is mobile-first, tested across common breakpoints, with a working mobile menu, accessible forms, adequate touch targets and responsive grids. Animations respect prefers-reduced-motion.",
  },
  {
    id: "validation",
    question: "What validations are applied to the enquiry form?",
    answer:
      "Required fields are enforced, phone/country code details are requested, email is optional but validated if entered, departure date cannot be in the past, return date cannot be before departure, traveller counts are validated, consent is required, and double submission is prevented.",
  },
  {
    id: "images",
    question: "Where do the images come from?",
    answer:
      "Images are local assets stored in public/images for performance and reliability. They are used for demonstration only.",
  },
  {
    id: "legal",
    question: "Do I need to update Privacy Policy and Terms?",
    answer:
      "Yes. The Privacy Policy and Terms & Conditions pages are structured templates with sample text. Review and replace them with your agency's actual policies and consult legal advice as appropriate for your jurisdiction.",
  },
];
