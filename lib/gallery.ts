/**
 * Box style gallery.
 *
 * A shared pool of photos of real cylindrical boxes (all visually verified),
 * stored in /public/gallery. Each box type maps to 4+ relevant styles the
 * client can browse before configuring.
 */

export interface BoxStyle {
  /** File key: /gallery/{key}.jpg */
  key: string;
  /** French label describing the style. */
  label: string;
}

export const BOX_STYLES: Record<string, BoxStyle> = {
  magenta: { key: "magenta", label: "Rond luxe, marquage à chaud" },
  roses: { key: "roses", label: "Nacré orné de roses" },
  "blanc-trio": { key: "blanc-trio", label: "Blanc minimaliste" },
  "blanc-duo": { key: "blanc-duo", label: "Blanc classique" },
  tubes: { key: "tubes", label: "Tube coloré imprimé" },
  matcha: { key: "matcha", label: "Tube kraft imprimé" },
  bambou: { key: "bambou", label: "Bambou naturel" },
  liege: { key: "liege", label: "Liège naturel" },
  tartan: { key: "tartan", label: "Rond festif avec ruban" },
  pastel: { key: "pastel", label: "Pastel empilable" },
};

/** Style keys proposed per box type (most relevant first, 4+ each). */
export const BOX_GALLERY: Record<string, string[]> = {
  parfum: ["magenta", "blanc-trio", "tubes", "roses", "matcha"],
  chocolat: ["blanc-duo", "magenta", "roses", "tartan", "liege"],
  the: ["bambou", "matcha", "liege", "tubes", "blanc-trio"],
  bijoux: ["magenta", "roses", "blanc-trio", "tartan"],
  cosmetique: ["tubes", "matcha", "blanc-trio", "magenta", "bambou"],
  cadeau: ["pastel", "tartan", "magenta", "roses", "blanc-duo"],
  bougie: ["liege", "bambou", "blanc-trio", "magenta", "matcha"],
  montre: ["blanc-trio", "magenta", "liege", "tartan"],
  fleurs: ["roses", "magenta", "pastel", "blanc-trio"],
  publicity: ["tubes", "matcha", "pastel", "blanc-duo"],
  patisserie: ["roses", "blanc-duo", "pastel", "tartan"],
  sushi: ["blanc-trio", "bambou", "matcha", "liege"],
  "fruits-secs": ["liege", "bambou", "blanc-duo", "matcha"],
  dates: ["magenta", "liege", "roses", "bambou"],
  "8-mars": ["roses", "magenta", "pastel", "tartan"],
  mariage: ["blanc-trio", "roses", "magenta", "pastel"],
};

/** Resolve the styles for a box type (falls back to a generic set). */
export function stylesFor(boxId: string): BoxStyle[] {
  const keys = BOX_GALLERY[boxId] ?? ["magenta", "blanc-trio", "roses", "tubes"];
  return keys.map((k) => BOX_STYLES[k]).filter(Boolean);
}
