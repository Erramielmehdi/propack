import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/contact/ContactForm";
import { GoldAnchor } from "@/components/ui/GoldButton";
import { PageBackground } from "@/components/ui/PageBackground";
import { SITE, FAQ } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact & devis",
  description:
    "Contactez ProPack pour votre projet de boîte cadeau cylindrique. Formulaire, WhatsApp, téléphone et FAQ.",
};

/** Small stroke icon for the contact sidebar, matching the header's SVG style. */
function ContactIcon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-4 w-4 shrink-0 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageBackground src="/images/contact-background-v1.png" position="58% center">
        <Section
          eyebrow="Contact"
          headingLevel="h1"
          title={<>Parlons de <em>votre projet</em></>}
          intro="Une question, un besoin sur mesure ? Écrivez-nous, nous répondons sous 24 h ouvrées."
          center={false}
        >
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <Suspense fallback={<div className="surface min-h-[400px] animate-pulse rounded-2xl" />}>
            <ContactForm />
          </Suspense>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5">
            <div className="surface rounded-2xl p-6">
              <h2 className="label-track mb-4">Coordonnées</h2>
              <ul className="flex flex-col gap-3 text-sm">
                <li className="flex items-start gap-3">
                  <ContactIcon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  <a href={`tel:${SITE.phoneHref}`} className="text-cream/80 hover:text-gold-light">
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <ContactIcon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm18 2-10 7L2 6" />
                  <a href={`mailto:${SITE.email}`} className="text-cream/80 hover:text-gold-light">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <ContactIcon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zm-6 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <span className="text-cream/70">{SITE.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <ContactIcon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-16v6l4 2" />
                  <span className="text-cream/70">{SITE.hours}</span>
                </li>
              </ul>
              <div className="mt-5">
                <GoldAnchor
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  block
                >
                  WhatsApp direct
                </GoldAnchor>
              </div>
            </div>

            {/* Map */}
            <div className="surface overflow-hidden rounded-2xl">
              <iframe
                title="Localisation ProPack — Casablanca"
                src="https://maps.google.com/maps?q=Zone%20Industrielle%20A%C3%AFn%20Seba%C3%A2%2C%20Casablanca%2C%20Maroc&z=13&output=embed"
                className="h-56 w-full border-0 grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Zone+Industrielle+A%C3%AFn+Seba%C3%A2%2C+Casablanca%2C+Maroc"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-center text-xs text-gold hover:text-gold-light"
              >
                Ouvrir dans Google Maps →
              </a>
            </div>
          </aside>
          </div>
        </Section>
      </PageBackground>

      {/* FAQ */}
      <Section eyebrow="FAQ" title={<>Questions <em>fréquentes</em></>}>
        <Accordion items={FAQ} />
      </Section>
    </>
  );
}
