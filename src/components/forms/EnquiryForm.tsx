"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { packages } from "@/data/packages";
import { destinations } from "@/data/destinations";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { getTodayISO } from "@/lib/utils";
import { buildEnquiryWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";

interface EnquiryFormProps {
  initialPackageSlug?: string;
}

export function EnquiryForm({ initialPackageSlug }: EnquiryFormProps) {
  const searchParams = useSearchParams();
  const pkgFromUrl = searchParams.get("package") || initialPackageSlug || "";
  const destFromUrl = searchParams.get("destination") || "";

  const packageOptions = useMemo(
    () =>
      packages
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((pkg) => ({ value: pkg.slug, label: `${pkg.title} — ${pkg.destination}` })),
    [],
  );

  const destinationOptions = useMemo(
    () =>
      destinations
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((d) => ({ value: d.name, label: `${d.name}, ${d.country}` })),
    [],
  );

  const [form, setForm] = useState(() => ({
    fullName: "",
    phoneCountryCode: "+91",
    phoneNumber: "",
    email: "",
    packageSlug: pkgFromUrl,
    destination: destFromUrl,
    departureDate: "",
    returnDate: "",
    adults: "2",
    children: "0",
    requirements: "",
    consent: false,
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);
  const [today] = useState(() => getTodayISO());

  const selectedPackage = useMemo(() => packages.find((p) => p.slug === form.packageSlug) || null, [form.packageSlug]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.phoneNumber.trim()) next.phoneNumber = "Phone number is required.";
    else if (form.phoneNumber.replace(/\D/g, "").length < 7) next.phoneNumber = "Enter a valid phone number.";
    if (form.email.trim()) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(form.email.trim())) next.email = "Enter a valid email address.";
    }
    if (!form.packageSlug && !form.destination.trim()) next.packageSlug = "Select a package or destination of interest.";
    if (!form.departureDate) next.departureDate = "Preferred departure date is required.";
    else if (today && form.departureDate < today) next.departureDate = "Departure date cannot be in the past.";
    if (!form.returnDate) next.returnDate = "Return date is required.";
    else if (form.departureDate && form.returnDate < form.departureDate) next.returnDate = "Return date cannot be before departure date.";
    if (!form.adults.trim()) next.adults = "Number of adults is required.";
    else {
      const a = Number(form.adults);
      if (Number.isNaN(a) || a < 1 || a > 20) next.adults = "Adults must be between 1 and 20.";
    }
    if (!form.children.trim()) next.children = "Number of children is required.";
    else {
      const c = Number(form.children);
      if (Number.isNaN(c) || c < 0 || c > 10) next.children = "Children must be between 0 and 10.";
    }
    if (!form.consent) next.consent = "Please accept to be contacted about this enquiry.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return;
    if (!validate()) {
      const firstError = document.querySelector(".field-error");
      if (firstError instanceof HTMLElement) {
        firstError.focus();
      }
      return;
    }
    setSubmitting(true);
    const message = buildEnquiryWhatsAppMessage({
      fullName: form.fullName,
      phoneCountryCode: form.phoneCountryCode,
      phoneNumber: form.phoneNumber,
      email: form.email,
      packageSlug: form.packageSlug,
      package: selectedPackage,
      destination: form.destination,
      departureDate: form.departureDate,
      returnDate: form.returnDate,
      adults: form.adults,
      children: form.children,
      requirements: form.requirements,
      source: "Meridian Journeys website — Enquire page",
    });
    const url = buildWhatsAppUrl(message);
    setWhatsAppUrl(url);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-6 rounded-3xl border border-[var(--brand-border)] bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.4em] text-[var(--brand-accent)]">Enquiry ready</span>
          <h2 className="font-serif text-3xl text-[var(--brand-ink)]">Your WhatsApp message is prepared.</h2>
          <p className="text-[var(--brand-muted)]">
            A new tab should have opened with your pre-filled WhatsApp message. Please review and press send. The agency will confirm availability and next steps. Nothing was stored or sent by this demo site.
          </p>
        </div>
        {whatsAppUrl ? (
          <div className="flex flex-wrap items-center gap-3">
            <Button href={whatsAppUrl} variant="primary">
              <WhatsAppIcon className="h-4 w-4" />
              Open WhatsApp again
            </Button>
            <Button href="/packages" variant="outline">
              Browse more packages
            </Button>
            <Button href="/contact" variant="ghost">
              View contact alternatives
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 rounded-2xl bg-[rgba(11,42,58,0.04)] p-6">
            <h3 className="font-serif text-xl text-[var(--brand-ink)]">WhatsApp not configured</h3>
            <p className="text-[var(--brand-muted)]">
              No WhatsApp number is configured in the site settings. Please use one of the alternatives below to share your enquiry details.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={`tel:${siteConfig.contact.phoneHref}`}>Call {siteConfig.contact.phone}</Button>
              <Button href={`mailto:${siteConfig.contact.email}`} variant="outline">
                Email {siteConfig.contact.email}
              </Button>
            </div>
            <p className="text-xs text-[var(--brand-muted)]">{siteConfig.contact.demoNote}</p>
          </div>
        )}
        <div className="rounded-2xl border border-[var(--brand-border)] p-6">
          <h3 className="mb-3 font-serif text-xl text-[var(--brand-ink)]">What happens next</h3>
          <ul className="flex flex-col gap-2 text-[var(--brand-muted)]">
            <li>• The agency reviews your enquiry and checks availability for the requested dates.</li>
            <li>• You&apos;ll receive a response with a personalised quotation and next steps.</li>
            <li>• Final inclusions, pricing and terms are confirmed before any commitment.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft sm:p-8" noValidate>
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-2xl text-[var(--brand-ink)]">Traveller details</h2>
        <p className="text-sm text-[var(--brand-muted)]">Fields marked appropriately are required for validation in this demo.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm text-[var(--brand-ink)]">
            Full name *
          </label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName ? (
            <p id="fullName-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.fullName}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-[var(--brand-ink)]">
            Email (optional)
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-[var(--brand-ink)]">Phone number (with country code) *</label>
          <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
            <input
              type="text"
              value={form.phoneCountryCode}
              onChange={(e) => handleChange("phoneCountryCode", e.target.value)}
              className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
              aria-label="Country code"
            />
            <input
              id="phoneNumber"
              type="tel"
              value={form.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
              aria-invalid={Boolean(errors.phoneNumber)}
              aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
            />
          </div>
          {errors.phoneNumber ? (
            <p id="phoneNumber-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.phoneNumber}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-2xl text-[var(--brand-ink)]">Trip details</h2>
        <p className="text-sm text-[var(--brand-muted)]">Select a package if you have one in mind, or a destination.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="packageSlug" className="text-sm text-[var(--brand-ink)]">
            Package
          </label>
          <select
            id="packageSlug"
            value={form.packageSlug}
            onChange={(e) => handleChange("packageSlug", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.packageSlug)}
          >
            <option value="">No specific package</option>
            {packageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="destination" className="text-sm text-[var(--brand-ink)]">
            Destination of interest
          </label>
          <select
            id="destination"
            value={form.destination}
            onChange={(e) => handleChange("destination", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.packageSlug)}
          >
            <option value="">Not specified</option>
            {destinationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.packageSlug ? (
            <p className="field-error text-sm text-[var(--brand-accentWarm)]">{errors.packageSlug}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="departureDate" className="text-sm text-[var(--brand-ink)]">
            Preferred departure date *
          </label>
          <input
            id="departureDate"
            type="date"
            min={today}
            value={form.departureDate}
            onChange={(e) => handleChange("departureDate", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.departureDate)}
            aria-describedby={errors.departureDate ? "departureDate-error" : undefined}
          />
          {errors.departureDate ? (
            <p id="departureDate-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.departureDate}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="returnDate" className="text-sm text-[var(--brand-ink)]">
            Return date *
          </label>
          <input
            id="returnDate"
            type="date"
            min={form.departureDate || today}
            value={form.returnDate}
            onChange={(e) => handleChange("returnDate", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.returnDate)}
            aria-describedby={errors.returnDate ? "returnDate-error" : undefined}
          />
          {errors.returnDate ? (
            <p id="returnDate-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.returnDate}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="adults" className="text-sm text-[var(--brand-ink)]">
            Adults *
          </label>
          <input
            id="adults"
            type="number"
            min={1}
            max={20}
            value={form.adults}
            onChange={(e) => handleChange("adults", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.adults)}
            aria-describedby={errors.adults ? "adults-error" : undefined}
          />
          {errors.adults ? (
            <p id="adults-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.adults}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="children" className="text-sm text-[var(--brand-ink)]">
            Children *
          </label>
          <input
            id="children"
            type="number"
            min={0}
            max={10}
            value={form.children}
            onChange={(e) => handleChange("children", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.children)}
            aria-describedby={errors.children ? "children-error" : undefined}
          />
          {errors.children ? (
            <p id="children-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.children}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="requirements" className="text-sm text-[var(--brand-ink)]">
          Special requirements (optional)
        </label>
        <textarea
          id="requirements"
          rows={4}
          value={form.requirements}
          onChange={(e) => handleChange("requirements", e.target.value)}
          className="rounded-3xl border border-[var(--brand-border)] px-4 py-3 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
          placeholder="Hotel preferences, dietary needs, mobility requirements, etc."
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => handleChange("consent", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[var(--brand-border)] text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span className="text-sm text-[var(--brand-muted)]">
            I agree to be contacted by the agency about this enquiry. This demo site does not store form data. *
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={submitting}>
          <WhatsAppIcon className="h-4 w-4" />
          {submitting ? "Preparing message..." : "Generate WhatsApp enquiry"}
        </Button>
        <p className="text-xs text-[var(--brand-muted)]">Opens WhatsApp in a new tab with a pre-filled message.</p>
      </div>
      <p className="text-xs text-[var(--brand-muted)]">Sample/demo content. Replace with your agency&apos;s WhatsApp number in src/config/site.ts before going live.</p>
    </form>
  );
}
