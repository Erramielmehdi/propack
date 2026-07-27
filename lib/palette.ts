/**
 * Multi-color accent system.
 *
 * Earth-pigment hues drawn from the atelier's own materials — terracotta,
 * brass foil, verdigris, oxblood leather, madder dye, raw umber — rotating
 * through sections and cards over the cream canvas. Every value clears WCAG
 * AA large-text contrast (>= 3:1) on #F4EDE1, so they can carry display
 * numbers and icons, not just decoration.
 *
 * Colors are applied via inline styles / CSS variables (not Tailwind classes)
 * so the JIT compiler never purges dynamically-chosen hues.
 */
export interface Accent {
  name: string;
  /** Vivid hue for fills, borders, and large display text. */
  hex: string;
  /** Translucent wash for soft backgrounds. */
  soft: string;
}

export const ACCENTS: Accent[] = [
  { name: "terracotta", hex: "#B0502F", soft: "rgba(176,80,47,0.10)" },
  { name: "laiton", hex: "#8A6A38", soft: "rgba(138,106,56,0.12)" },
  { name: "verdigris", hex: "#46695B", soft: "rgba(70,105,91,0.11)" },
  { name: "sang-de-boeuf", hex: "#7F3820", soft: "rgba(127,56,32,0.10)" },
  { name: "garance", hex: "#9C4257", soft: "rgba(156,66,87,0.10)" },
  { name: "terre-ombre", hex: "#6E5A43", soft: "rgba(110,90,67,0.11)" },
];

/** Accent for a given index, wrapping around the palette. */
export function accentAt(index: number): Accent {
  return ACCENTS[((index % ACCENTS.length) + ACCENTS.length) % ACCENTS.length];
}
