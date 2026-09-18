import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/content";
import { Logo } from "./Logo";

const CURRENT_YEAR = 2026;

const colHeading =
  "mb-3.5 font-sans text-[11px] uppercase tracking-[0.14em] text-kraft";

/** Site footer: brand, navigation, contact, and legal links. */
export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-cream/[18%]">
      <div className="mx-auto grid w-full max-w-content gap-8 px-5 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3.5 max-w-[28ch] text-[13.5px] leading-relaxed text-cream/65">
            {SITE.tagline}. Fabricant marocain de boîtes cadeaux cylindriques
            sur mesure.
          </p>
        </div>

        <nav aria-label="Liens de pied de page">
          <h2 className={colHeading}>Navigation</h2>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={colHeading}>Contact</h2>
          <ul className="flex flex-col gap-2.5 text-sm text-cream/[78%]">
            <li>
              <a href={`tel:${SITE.phoneHref}`} className="hover:text-gold">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                WhatsApp direct
              </a>
            </li>
            <li className="text-cream/60">{SITE.address}</li>
            <li className="text-cream/60">{SITE.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-cream/[18%]">
        <div className="mx-auto flex w-full max-w-content flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cream/55 sm:flex-row">
          <p>
            © {CURRENT_YEAR} {SITE.name}. Tous droits réservés.
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/mentions-legales" className="hover:text-gold">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-gold">
                Confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
