import type { BoxType } from "./calculator/types";

/** Catalogue products that require a custom quote instead of cylindrical pricing. */
export const CUSTOM_QUOTE_TYPES: BoxType[] = [
  {
    id: "sac-de-luxe",
    label: "Sac de luxe",
    icon: "🛍️",
    tint: "#C9A227",
    description:
      "Sacs papier haut de gamme, personnalisés avec poignées et finitions brillantes ou mates.",
  },
  {
    id: "boite-cylindrique-choix",
    label: "Boîte cylindrique de choix",
    icon: "🎁",
    tint: "#70B8C8",
    description:
      "Notre sélection de boîtes cylindriques premium, prêtes à personnaliser.",
  },
];

export function isCustomQuoteType(id: string): boolean {
  return CUSTOM_QUOTE_TYPES.some((item) => item.id === id);
}
