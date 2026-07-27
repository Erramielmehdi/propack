import type { BoxType, Extra, DiamTier } from "./types";

/**
 * Calculator constants — ported verbatim from the original calculator.
 * Do not change these values without updating the pricing tests.
 */

/** Available diameters (mm). */
export const DIAMS = [40, 55, 70, 85, 100, 120, 150, 200, 250, 300, 350] as const;

/** Quick-pick heights (mm). */
export const QUICK_H = [50, 60, 70, 80, 90, 100, 110, 120, 130] as const;

/** Preset quantity options. */
export const QTY_OPT = [100, 250, 500, 1000, 5000] as const;

/** Volume discount by quantity threshold. */
export const QTY_DISC: Record<number, number> = {
  100: 0,
  250: 0.05,
  500: 0.1,
  1000: 0.15,
  5000: 0.2,
};

/** Finishing add-ons. */
export const EXTRAS: Extra[] = [
  { key: "ribbon", label: "Ruban", price: 1.5 },
  { key: "marquage", label: "Marquage à Chaud", price: 1.5 },
  { key: "gaufrage", label: "Gaufrage", price: 1.0 },
  { key: "uvSpot", label: "Vernis UV", price: 1.2 },
];

/** Diameter tier colors (hex). */
export const TIER_COLORS: Record<DiamTier, string> = {
  s: "#E8C547",
  m: "#A0C870",
  l: "#70B8C8",
};

/** Human labels for tiers. */
export const TIER_LABELS: Record<DiamTier, string> = {
  s: "Petit diamètre",
  m: "Diamètre moyen",
  l: "Grand diamètre",
};

/** The 16 box types offered. */
export const BOX_TYPES: BoxType[] = [
  { id: "parfum", label: "Parfum", icon: "🧴", tint: "#B08BC9", description: "Écrins raffinés pour flacons et coffrets parfum." },
  { id: "chocolat", label: "Chocolat", icon: "🍫", tint: "#8A5A33", description: "Boîtes gourmandes pour chocolats et pralines." },
  { id: "the", label: "Thé", icon: "🍵", tint: "#7FA36B", description: "Contenants hermétiques pour thés et infusions." },
  { id: "bijoux", label: "Bijoux", icon: "💍", tint: "#C9A227", description: "Écrins précieux pour bagues, colliers et montres." },
  { id: "cosmetique", label: "Cosmétique", icon: "💄", tint: "#D98BA3", description: "Packaging premium pour soins et cosmétiques." },
  { id: "cadeau", label: "Cadeau", icon: "🎁", tint: "#B33C4E", description: "Boîtes cadeaux polyvalentes toutes occasions." },
  { id: "bougie", label: "Bougie", icon: "🕯️", tint: "#D9A05B", description: "Boîtiers élégants pour bougies parfumées." },
  { id: "montre", label: "Montre", icon: "⌚", tint: "#6E7B8B", description: "Coffrets structurés pour montres et horlogerie." },
  { id: "fleurs", label: "Fleurs", icon: "💐", tint: "#C97FA1", description: "Boîtes à fleurs cylindriques (flower box)." },
  { id: "publicity", label: "Publicity", icon: "📢", tint: "#70B8C8", description: "Objets publicitaires et goodies personnalisés." },
  { id: "patisserie", label: "Pâtisserie", icon: "🧁", tint: "#E3B587", description: "Boîtes alimentaires pour pâtisseries fines." },
  { id: "sushi", label: "Sushi", icon: "🍣", tint: "#4E6E58", description: "Contenants food-grade pour sushis et traiteurs." },
  { id: "fruits-secs", label: "Fruits Secs", icon: "🥜", tint: "#A98253", description: "Boîtes pour fruits secs, amandes et noix." },
  { id: "dates", label: "Dates", icon: "🌴", tint: "#8F5B2E", description: "Coffrets premium pour dattes et produits du terroir." },
  { id: "8-mars", label: "8 Mars", icon: "🌸", tint: "#C86B85", description: "Éditions spéciales Journée de la Femme." },
  { id: "mariage", label: "Mariage", icon: "💒", tint: "#D8CBB3", description: "Boîtes à dragées et cadeaux d'invités mariage." },
];
