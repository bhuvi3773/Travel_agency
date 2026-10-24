"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(form.email.trim())) next.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return;
    if (!validate()) {
      const first = document.querySelector(".field-error");
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 250);
  };

  const handleChange = (key: keyof typeof form, value: string) => {
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
      <div className="flex flex-col gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-8 shadow-soft">
        <h2 className="font-serif text-2xl text-[var(--brand-ink)]">Message received (demo)</h2>
        <p className="text-[var(--brand-muted)]">
          This is a demo contact form — nothing was sent or stored. For a real enquiry, please use WhatsApp, phone or email with the details provided.
        </p>
        <p className="text-sm text-[var(--brand-muted)]">{siteConfig.contact.demoNote}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft sm:p-8" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="c-name" className="text-sm text-[var(--brand-ink)]">
            Name *
          </label>
          <input
            id="c-name"
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "c-name-error" : undefined}
          />
          {errors.name ? (
            <p id="c-name-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-email" className="text-sm text-[var(--brand-ink)]">
            Email *
          </label>
          <input
            id="c-email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "c-email-error" : undefined}
          />
          {errors.email ? (
            <p id="c-email-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="c-phone" className="text-sm text-[var(--brand-ink)]">
            Phone *
          </label>
          <input
            id="c-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="rounded-full border border-[var(--brand-border)] px-4 py-2.5 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "c-phone-error" : undefined}
          />
          {errors.phone ? (
            <p id="c-phone-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.phone}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="c-message" className="text-sm text-[var(--brand-ink)]">
            Message *
          </label>
          <textarea
            id="c-message"
            rows={5}
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="rounded-3xl border border-[var(--brand-border)] px-4 py-3 text-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "c-message-error" : undefined}
          />
          {errors.message ? (
            <p id="c-message-error" className="field-error text-sm text-[var(--brand-accentWarm)]">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send message (demo)"}
        </Button>
        <p className="text-xs text-[var(--brand-muted)]">Demo form — no data is sent.</p>
      </div>
    </form>
  );
}
