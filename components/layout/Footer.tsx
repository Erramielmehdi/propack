import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/content";
import { Logo } from "./Logo";

const CURRENT_YEAR = 2026; // static build stamp — no Date at render.

const colHeading = "mb-3.5 font-sans text-[11px] uppercase tracking-[0.14em] text-kraft";

/** Site footer: contact, links, socials, legal. */
export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-cream/[18%]">
      <div className="mx-auto grid w-full max-w-content gap-8 px-5 py-14 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-3.5 max-w-[28ch] text-[13.5px] leading-relaxed text-cream/65">
            {SITE.tagline}. Fabricant marocain de boîtes cadeaux cylindriques
            sur mesure.
          </p>
        </div>

        {/* Nav */}
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

        {/* Contact */}
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
            <li className="text-cream/60">{SITE.address}</li>
            <li className="text-cream/60">{SITE.hours}</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className={colHeading}>Réseaux</h2>
          <ul className="flex gap-3">
            {[
              {
                href: SITE.socials.instagram,
                label: "Instagram",
                path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 1.8c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.8.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.3-.3.8-.3 1.8-.1 1.3-.1 1.6-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.8.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.1.8.3 1.8.3 1.3.1 1.6.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.8-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.3.3-.8.3-1.8.1-1.3.1-1.6.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.8-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.3-.1-.8-.3-1.8-.3-1.3-.1-1.6-.1-4.8-.1M12 7.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8m0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2m5.1-3.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3",
              },
              {
                href: SITE.socials.facebook,
                label: "Facebook",
                path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07",
              },
              {
                href: SITE.socials.linkedin,
                label: "LinkedIn",
                path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13M7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0",
              },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center border border-gold-border text-gold transition-colors hover:border-gold hover:bg-gold/10"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-cream/65 transition-colors hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="#25D366" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp direct
          </a>
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
