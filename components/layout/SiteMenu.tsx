"use client";

import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { NAV_LINKS, SITE } from "@/lib/content";

/**
 * Site navigation — the React Bits StaggeredMenu configured for ProPack.
 * Fixed overlay: logo top-left, "Menu" toggle top-right, staggered white
 * panel sliding from the right with blue underlay layers.
 */
export function SiteMenu() {
  const items = [
    ...NAV_LINKS.map((l) => ({
      label: l.label,
      ariaLabel: `Aller à la page ${l.label}`,
      link: l.href,
    })),
    {
      label: "Calculer mon prix",
      ariaLabel: "Calculer le prix de votre boîte",
      link: "/calcule",
    },
  ];

  const socialItems = [
    { label: "Instagram", link: SITE.socials.instagram },
    { label: "Facebook", link: SITE.socials.facebook },
    { label: "LinkedIn", link: SITE.socials.linkedin },
    { label: "WhatsApp", link: `https://wa.me/${SITE.whatsapp}` },
  ];

  return (
    <StaggeredMenu
      className="md:hidden"
      position="right"
      isFixed
      items={items}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      logoUrl="/propack-logo.png"
      menuButtonColor="#241F1A"
      openMenuButtonColor="#241F1A"
      changeMenuColorOnOpen={false}
      colors={["#F0806A", "#D65C44"]}
      accentColor="#D65C44"
    />
  );
}
