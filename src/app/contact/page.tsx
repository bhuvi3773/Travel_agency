import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { buildContactWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Meridian Journeys. Sample contact details and a demo contact form.",
};

const contactContent = {
  eyebrow: "Get in touch",
  title: "Start a conversation",
  description: "Share your travel ideas or ask about a specific package. All contact details and form submissions are sample/demo in this template.",
};

export default function ContactPage() {
  const whatsappUrl = buildContactWhatsAppUrl();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact us" }]} />
        <Reveal>
          <SectionHeading eyebrow={contactContent.eyebrow} title={contactContent.title} description={contactContent.description} />
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="flex flex-col gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft">
                <h2 className="font-serif text-xl text-[var(--brand-ink)]">Direct contact (sample)</h2>
                <ul className="flex flex-col gap-3 text-[var(--brand-muted)]">
                  <li className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(11,42,58,0.08)] text-[var(--brand-primary)]">
                      <PhoneIcon />
                    </span>
                    <div>
                      <p className="text-[var(--brand-ink)]">Phone</p>
                      <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-[var(--brand-primary)]">{siteConfig.contact.phone}</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(11,42,58,0.08)] text-[var(--brand-primary)]">
                      <MailIcon />
                    </span>
                    <div>
                      <p className="text-[var(--brand-ink)]">Email</p>
                      <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[var(--brand-primary)]">{siteConfig.contact.email}</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(11,42,58,0.08)] text-[var(--brand-primary)]">
                      <WhatsAppIcon />
                    </span>
                    <div>
                      <p className="text-[var(--brand-ink)]">WhatsApp</p>
                      {whatsappUrl ? (
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-primary)]">Message on WhatsApp (demo number)</a>
                      ) : (
                        <span>Not configured</span>
                      )}
                    </div>
                  </li>
                </ul>
                <div className="rounded-2xl bg-[rgba(11,42,58,0.04)] p-4">
                  <p className="text-sm text-[var(--brand-muted)]">{siteConfig.contact.address}</p>
                  <p className="text-sm text-[var(--brand-muted)]">{siteConfig.contact.hours}</p>
                </div>
                <p className="text-xs text-[var(--brand-muted)]">{siteConfig.contact.demoNote}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="flex flex-col gap-3 rounded-3xl border border-[var(--brand-border)] bg-white p-6 shadow-soft">
                <h2 className="font-serif text-xl text-[var(--brand-ink)]">Prefer the enquiry form?</h2>
                <p className="text-[var(--brand-muted)]">The dedicated enquiry page pre-fills packages and generates a WhatsApp message with full validation.</p>
                <Button href="/enquire" className="w-fit">Go to booking enquiry</Button>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="flex flex-col gap-4">
              <ContactForm />
              <p className="text-xs text-[var(--brand-muted)]">This is a demo form. No data is transmitted. For real enquiries, use WhatsApp or the enquiry page.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
