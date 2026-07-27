"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/content";
import { dcBtn } from "@/lib/dcTheme";
import { Logo } from "./Logo";

/**
 * Desktop header: sticky full-width bar with a flat text nav — the
 * Propack.dc.html treatment, minus the rule line. Mobile is handled
 * entirely by StaggeredMenu, so there's no toggle here.
 */
export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 hidden bg-noir/90 backdrop-blur-md md:block">
      <div className="mx-auto flex h-20 w-full max-w-content items-center gap-8 px-5">
        <Logo />

        <nav
          aria-label="Navigation principale"
          className="ml-auto flex items-center gap-7 font-sans"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13.5px] tracking-[0.02em] transition-colors ${
                isActive(link.href) ? "text-gold" : "text-cream hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/calcule" className={dcBtn.primary}>
            Calculer mon prix
          </Link>
        </nav>
      </div>
    </header>
  );
}
