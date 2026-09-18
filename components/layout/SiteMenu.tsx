"use client";

import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { NAV_LINKS } from "@/lib/content";

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

  return (
    <StaggeredMenu
      className="md:hidden"
      position="right"
      isFixed
      items={items}
      displaySocials={false}
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
