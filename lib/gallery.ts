/**
 * Box style gallery.
 *
 * A shared pool of photos of real cylindrical boxes (all visually verified),
 * stored in /public/gallery. Each box type maps to 4+ relevant styles the
 * client can browse before configuring.
 */

export interface BoxStyle {
  /** File key: /gallery/{key}.jpg unless file is provided. */
  key: string;
  /** Optional filename for generated PNG assets. */
  file?: string;
  /** French label describing the style. */
  label: string;
}

export const BOX_STYLES: Record<string, BoxStyle> = {
  datesPaper1: { key: "datesPaper1", file: "dates-paper1.png", label: "Papier ivoire, gaufrage geometrique" },
  datesPaper2: { key: "datesPaper2", file: "dates-paper2.png", label: "Papier bleu nuit, motif imprime dore" },
  datesPaper3: { key: "datesPaper3", file: "dates-paper3.png", label: "Papier vert emeraude, arabesques imprimees" },
  datesPaper4: { key: "datesPaper4", file: "dates-paper4.png", label: "Papier terracotta, relief imprime" },
  datesPaper5: { key: "datesPaper5", file: "dates-paper5.png", label: "Papier bordeaux, ruban papier dore" },
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

  // Bijoux — real product photos.
  bijoux1: { key: "bijoux1", label: "Gris chiné, ruban satiné" },
  bijoux2: { key: "bijoux2", label: "Velours vert profond, gamme empilable" },
  bijoux3: { key: "bijoux3", label: "Ivoire minimaliste, finition mate" },
  bijoux4: { key: "bijoux4", label: "Blanc épuré, écrin boucles d'oreilles" },
  bijoux5: { key: "bijoux5", label: "Rose poudré, coffret bagues" },

  // Cadeau — real product photos.
  cadeau1: { key: "cadeau1", label: "Bleu nuit, découpe ajourée et poignée" },
  cadeau2: { key: "cadeau2", label: "Velours bleu marine, ruban satin doré" },
  cadeau3: { key: "cadeau3", label: "Velours gris, double ruban bicolore" },
  cadeau4: { key: "cadeau4", label: "Ivoire, grand nœud doré" },
  cadeau5: { key: "cadeau5", label: "Blanc épuré, ruban personnalisé" },

  // Chocolat — real product photos.
  chocolat1: { key: "chocolat1", label: "Violet ornemental, impression dorée" },
  chocolat2: { key: "chocolat2", label: "Rouge laqué, tube grande ouverture" },
  chocolat3: { key: "chocolat3", label: "Bordeaux empilable, sceau doré" },
  chocolat4: { key: "chocolat4", label: "Motif signature, tube brillant" },
  chocolat5: { key: "chocolat5", label: "Blanc liseré or, plateau compartimenté" },

  // Parfum — real product photos.
  parfum1: { key: "parfum1", label: "Taupe minimaliste, tube haut mat" },
  parfum2: { key: "parfum2", label: "Gris ornemental, motif floral" },
  parfum3: { key: "parfum3", label: "Blanc fleuri, tube compact" },
  parfum4: { key: "parfum4", label: "Noir floral, tube élégant" },
  parfum5: { key: "parfum5", label: "Noir mat minimaliste" },

  // Thé — real product photos (files are named tea1..5.jpg).
  tea1: { key: "tea1", label: "Noir mat, motif botanique doré" },
  tea2: { key: "tea2", label: "Vert royal, blason et fleurs dorées" },
  tea3: { key: "tea3", label: "Vert olive, série numérotée" },
  tea4: { key: "tea4", label: "Vert matcha, base kraft naturelle" },
  tea5: { key: "tea5", label: "Anthracite minimaliste, typographie dorée" },

  // Cosmétique — real product photos.
  cosmetique1: { key: "cosmetique1", label: "Blanc à fenêtre, tube haut" },
  cosmetique2: { key: "cosmetique2", label: "Duo marbré pastel, cerclage doré" },
  cosmetique3: { key: "cosmetique3", label: "Rose poudré, tube compact" },
  cosmetique4: { key: "cosmetique4", label: "Kraft naturel, capuchon métal" },
  cosmetique5: { key: "cosmetique5", label: "Rose blush, tube bicolore" },

  // Bougie — real product photos.
  candle1: { key: "candle1", label: "Blanc épuré, tube haut" },
  candle2: { key: "candle2", label: "Sauge et noir, duo tube et verre" },
  candle3: { key: "candle3", label: "Noir et kraft, gamme empilable" },
  candle4: { key: "candle4", label: "Noir mat, finition dorée" },
  candle5: { key: "candle5", label: "Noir mat, pot rechargeable" },

  // Montre — real product photos.
  montre1: { key: "montre1", label: "Noir mat, écrin oblique velours" },
  montre2: { key: "montre2", label: "Noir, intérieur velours et bracelet cuir" },
  montre3: { key: "montre3", label: "Marine graphique, gamme empilable" },
  montre4: { key: "montre4", label: "Blanc rond, ruban et fenêtre" },
  montre5: { key: "montre5", label: "Blanc compact, écrin rond" },

  // Fleurs — real product photos.
  fleurs1: { key: "fleurs1", label: "Noir, roses ivoire et gypsophile" },
  fleurs2: { key: "fleurs2", label: "Noir, roses poudrées et pompons" },
  fleurs3: { key: "fleurs3", label: "Noir, roses bordeaux et cœur doré" },
  fleurs4: { key: "fleurs4", label: "Noir, roses ivoire et liseré doré" },
  fleurs5: { key: "fleurs5", label: "Noir, roses rouges" },
  fleurs6: { key: "fleurs6", label: "Noir, roses blanches et ruban pêche" },
  fleurs7: { key: "fleurs7", label: "Noir, roses blanches classiques" },

  // Pâtisserie — real product photos.
  patisserie1: { key: "patisserie1", label: "Kraft et bordeaux, ruban rayé empilé" },
  patisserie2: { key: "patisserie2", label: "Rose poudré, écrin gâteau signature" },
  patisserie3: { key: "patisserie3", label: "Champagne satiné, grand format" },
  patisserie4: { key: "patisserie4", label: "Rayures dorées, intérieur turquoise" },
  patisserie5: { key: "patisserie5", label: "Velours bordeaux, intérieur doré" },
  patisserie6: { key: "patisserie6", label: "Lavande et plumes dorées" },

  // Fruits secs — real product photos.
  "fruit-sec1": { key: "fruit-sec1", label: "Vert sauge, compartiments variés" },
  "fruit-sec2": { key: "fruit-sec2", label: "Noir mat, sept compartiments" },
  "fruit-sec3": { key: "fruit-sec3", label: "Doré, fruits secs enrobés chocolat" },
  "fruit-sec4": { key: "fruit-sec4", label: "Métal rouge, assortiment de noix" },
  "fruit-sec5": { key: "fruit-sec5", label: "Kraft, bocaux individuels" },

  // Publicité — generated catalogue visuals.
  publicity1: { key: "publicity1", file: "publicity1.png", label: "Bleu cobalt, carnet et stylo" },
  publicity2: { key: "publicity2", file: "publicity2.png", label: "Corail, bouteille réutilisable" },
  publicity3: { key: "publicity3", file: "publicity3.png", label: "Kraft et vert, mug personnalisé" },
  publicity4: { key: "publicity4", file: "publicity4.png", label: "Noir et or, coffret corporate" },
  publicity5: { key: "publicity5", file: "publicity5.png", label: "Blanc graphique, accessoires tech" },

  // Sushi — generated catalogue visuals.
  sushi1: { key: "sushi1", file: "sushi1.png", label: "Noir et vermillon, plateau nigiri" },
  sushi2: { key: "sushi2", file: "sushi2.png", label: "Kraft recyclable, plateau compartimenté" },
  sushi3: { key: "sushi3", file: "sushi3.png", label: "Ivoire et or, assortiment premium" },
  sushi4: { key: "sushi4", file: "sushi4.png", label: "Vert émeraude, couvercle fenêtre" },
  sushi5: { key: "sushi5", file: "sushi5.png", label: "Bordeaux, coffret traiteur à étages" },

  // Dattes — generated catalogue visuals.
  dates1: { key: "dates1", file: "dates1.png", label: "Bleu nuit, détails zellige dorés" },
  dates2: { key: "dates2", file: "dates2.png", label: "Bois et laiton, présentation radiale" },
  dates3: { key: "dates3", file: "dates3.png", label: "Ivoire, intérieur velours émeraude" },
  dates4: { key: "dates4", file: "dates4.png", label: "Terracotta, fibre de palmier" },
  dates5: { key: "dates5", file: "dates5.png", label: "Bordeaux, dattes chocolatées" },

  // 8 Mars — generated catalogue visuals.
  mars1: { key: "mars1", file: "mars1.png", label: "Rose blush, fleur sculptée" },
  mars2: { key: "mars2", file: "mars2.png", label: "Prune et corail, ruban poignée" },
  mars3: { key: "mars3", file: "mars3.png", label: "Ivoire, composition graphique" },
  mars4: { key: "mars4", file: "mars4.png", label: "Émeraude, relief floral" },
  mars5: { key: "mars5", file: "mars5.png", label: "Rouge, ruban satin blush" },

  // Mariage — generated catalogue visuals.
  mariage1: { key: "mariage1", file: "mariage1.png", label: "Ivoire et champagne, dragées" },
  mariage2: { key: "mariage2", file: "mariage2.png", label: "Sauge botanique, fleurs séchées" },
  mariage3: { key: "mariage3", file: "mariage3.png", label: "Blanc perlé, intérieur vieux rose" },
  mariage4: { key: "mariage4", file: "mariage4.png", label: "Bleu nuit et or, chocolat invité" },
  mariage5: { key: "mariage5", file: "mariage5.png", label: "Terracotta, ruban tissé" },

  // Special catalogue cards — generated visuals.
  "sac-luxe1": { key: "sac-luxe1", file: "sac-luxe1.png", label: "Ivoire, anses corde et dorure" },
  "sac-luxe2": { key: "sac-luxe2", file: "sac-luxe2.png", label: "Noir mat, ruban satin et or" },
  "sac-luxe3": { key: "sac-luxe3", file: "sac-luxe3.png", label: "Vert forêt, gaufrage doré" },
  "sac-luxe4": { key: "sac-luxe4", file: "sac-luxe4.png", label: "Bordeaux, poignées ruban blush" },
  "sac-luxe5": { key: "sac-luxe5", file: "sac-luxe5.png", label: "Bleu cobalt et safran" },
  cylindre1: { key: "cylindre1", file: "cylindre1.png", label: "Ivoire embossé, cerclage doré" },
  cylindre2: { key: "cylindre2", file: "cylindre2.png", label: "Vert émeraude, bandes dorées" },
  cylindre3: { key: "cylindre3", file: "cylindre3.png", label: "Noir mat, finition cuivre" },
  cylindre4: { key: "cylindre4", file: "cylindre4.png", label: "Terracotta et kraft naturel" },
  cylindre5: { key: "cylindre5", file: "cylindre5.png", label: "Bleu cobalt, blanc et safran" },

  // Generated catalogue sets for the remaining product cards.
  parfumGen1: { key: "parfumGen1", file: "parfum-gen1.png", label: "Ivoire et champagne, relief botanique" },
  parfumGen2: { key: "parfumGen2", file: "parfum-gen2.png", label: "Charcoal mat, finition cuivre" },
  parfumGen3: { key: "parfumGen3", file: "parfum-gen3.png", label: "Vert émeraude, liseré doré" },
  parfumGen4: { key: "parfumGen4", file: "parfum-gen4.png", label: "Corail poudré, détail satin" },
  parfumGen5: { key: "parfumGen5", file: "parfum-gen5.png", label: "Kraft et vert forêt" },
  chocolatGen1: { key: "chocolatGen1", file: "chocolat-gen1.png", label: "Ivoire et champagne, écrin gourmand" },
  chocolatGen2: { key: "chocolatGen2", file: "chocolat-gen2.png", label: "Charcoal et cuivre, finition mate" },
  chocolatGen3: { key: "chocolatGen3", file: "chocolat-gen3.png", label: "Vert profond, coffret premium" },
  chocolatGen4: { key: "chocolatGen4", file: "chocolat-gen4.png", label: "Corail, présentation cadeau" },
  chocolatGen5: { key: "chocolatGen5", file: "chocolat-gen5.png", label: "Kraft et or, assortiment artisanal" },
  theGen1: { key: "theGen1", file: "the-gen1.png", label: "Ivoire et champagne, thé signature" },
  theGen2: { key: "theGen2", file: "the-gen2.png", label: "Charcoal et cuivre, infusion premium" },
  theGen3: { key: "theGen3", file: "the-gen3.png", label: "Vert émeraude, tube botanique" },
  theGen4: { key: "theGen4", file: "the-gen4.png", label: "Corail, édition contemporaine" },
  theGen5: { key: "theGen5", file: "the-gen5.png", label: "Kraft et vert, matière naturelle" },
  bijouxGen1: { key: "bijouxGen1", file: "bijoux-gen1.png", label: "Ivoire et champagne, écrin précieux" },
  bijouxGen2: { key: "bijouxGen2", file: "bijoux-gen2.png", label: "Charcoal mat, finition cuivre" },
  bijouxGen3: { key: "bijouxGen3", file: "bijoux-gen3.png", label: "Vert profond, liseré doré" },
  bijouxGen4: { key: "bijouxGen4", file: "bijoux-gen4.png", label: "Rose blush, ruban délicat" },
  bijouxGen5: { key: "bijouxGen5", file: "bijoux-gen5.png", label: "Kraft et or, écrin artisanal" },
  cosmetiqueGen1: { key: "cosmetiqueGen1", file: "cosmetique-gen1.png", label: "Ivoire, relief botanique" },
  cosmetiqueGen2: { key: "cosmetiqueGen2", file: "cosmetique-gen2.png", label: "Charcoal, détail cuivre" },
  cosmetiqueGen3: { key: "cosmetiqueGen3", file: "cosmetique-gen3.png", label: "Vert émeraude, soin premium" },
  cosmetiqueGen4: { key: "cosmetiqueGen4", file: "cosmetique-gen4.png", label: "Corail poudré, finition satin" },
  cosmetiqueGen5: { key: "cosmetiqueGen5", file: "cosmetique-gen5.png", label: "Kraft, papier texturé" },
  cadeauGen1: { key: "cadeauGen1", file: "cadeau-gen1.png", label: "Bleu nuit, ruban champagne" },
  cadeauGen2: { key: "cadeauGen2", file: "cadeau-gen2.png", label: "Sauge, finition mate" },
  cadeauGen3: { key: "cadeauGen3", file: "cadeau-gen3.png", label: "Ivoire, relief cadeau" },
  cadeauGen4: { key: "cadeauGen4", file: "cadeau-gen4.png", label: "Corail, ouverture satin" },
  cadeauGen5: { key: "cadeauGen5", file: "cadeau-gen5.png", label: "Kraft et or, coffret chaleureux" },
  bougieGen1: { key: "bougieGen1", file: "bougie-gen1.png", label: "Blanc chaud, relief végétal" },
  bougieGen2: { key: "bougieGen2", file: "bougie-gen2.png", label: "Sauge et noir, duo élégant" },
  bougieGen3: { key: "bougieGen3", file: "bougie-gen3.png", label: "Vert profond, finition dorée" },
  bougieGen4: { key: "bougieGen4", file: "bougie-gen4.png", label: "Corail, boîte parfumée" },
  bougieGen5: { key: "bougieGen5", file: "bougie-gen5.png", label: "Charcoal et cuivre, rechargeable" },
  montreGen1: { key: "montreGen1", file: "montre-gen1.png", label: "Noir mat, écrin classique" },
  montreGen2: { key: "montreGen2", file: "montre-gen2.png", label: "Noir et cuir, finition premium" },
  montreGen3: { key: "montreGen3", file: "montre-gen3.png", label: "Vert profond, détail doré" },
  montreGen4: { key: "montreGen4", file: "montre-gen4.png", label: "Ivoire, écrin ruban" },
  montreGen5: { key: "montreGen5", file: "montre-gen5.png", label: "Charcoal, cuivre brossé" },
  fleursGen1: { key: "fleursGen1", file: "fleurs-gen1.png", label: "Noir et ivoire, relief floral" },
  fleursGen2: { key: "fleursGen2", file: "fleurs-gen2.png", label: "Blush et champagne, ruban" },
  fleursGen3: { key: "fleursGen3", file: "fleurs-gen3.png", label: "Vert profond, roses premium" },
  fleursGen4: { key: "fleursGen4", file: "fleurs-gen4.png", label: "Kraft et terracotta, naturel" },
  fleursGen5: { key: "fleursGen5", file: "fleurs-gen5.png", label: "Noir et cuivre, finition mate" },
  patisserieGen1: { key: "patisserieGen1", file: "patisserie-gen1.png", label: "Lavande et champagne, pâtisserie" },
  patisserieGen2: { key: "patisserieGen2", file: "patisserie-gen2.png", label: "Blush, écrin ruban" },
  patisserieGen3: { key: "patisserieGen3", file: "patisserie-gen3.png", label: "Vert et or, dessert signature" },
  patisserieGen4: { key: "patisserieGen4", file: "patisserie-gen4.png", label: "Kraft et bordeaux, finition mate" },
  patisserieGen5: { key: "patisserieGen5", file: "patisserie-gen5.png", label: "Lavande dorée, relief gourmand" },
  fruitsSecsGen1: { key: "fruitsSecsGen1", file: "fruits-secs-gen1.png", label: "Sauge et or, assortiment premium" },
  fruitsSecsGen2: { key: "fruitsSecsGen2", file: "fruits-secs-gen2.png", label: "Kraft et terracotta, naturel" },
  fruitsSecsGen3: { key: "fruitsSecsGen3", file: "fruits-secs-gen3.png", label: "Charcoal et cuivre, compartiments" },
  fruitsSecsGen4: { key: "fruitsSecsGen4", file: "fruits-secs-gen4.png", label: "Ivoire et vert, fruits du terroir" },
  fruitsSecsGen5: { key: "fruitsSecsGen5", file: "fruits-secs-gen5.png", label: "Bordeaux et champagne, dattes premium" },
};

/** Style keys proposed per box type (most relevant first, 4+ each). */
export const BOX_GALLERY: Record<string, string[]> = {
  parfum: ["parfum1", "parfum2", "parfum3", "parfum4", "parfum5", "parfumGen1", "parfumGen2", "parfumGen3", "parfumGen4", "parfumGen5"],
  chocolat: ["chocolat1", "chocolat2", "chocolat3", "chocolat4", "chocolat5", "chocolatGen1", "chocolatGen2", "chocolatGen3", "chocolatGen4", "chocolatGen5"],
  the: ["tea1", "tea2", "tea3", "tea4", "tea5", "theGen1", "theGen2", "theGen3", "theGen4", "theGen5"],
  bijoux: ["bijoux1", "bijoux2", "bijoux3", "bijoux4", "bijoux5", "bijouxGen1", "bijouxGen2", "bijouxGen3", "bijouxGen4", "bijouxGen5"],
  cosmetique: ["cosmetique1", "cosmetique2", "cosmetique3", "cosmetique4", "cosmetique5", "cosmetiqueGen1", "cosmetiqueGen2", "cosmetiqueGen3", "cosmetiqueGen4", "cosmetiqueGen5"],
  cadeau: ["cadeau1", "cadeau2", "cadeau3", "cadeau4", "cadeau5", "cadeauGen1", "cadeauGen2", "cadeauGen3", "cadeauGen4", "cadeauGen5"],
  bougie: ["candle1", "candle2", "candle3", "candle4", "candle5", "bougieGen1", "bougieGen2", "bougieGen3", "bougieGen4", "bougieGen5"],
  montre: ["montre2", "montre4", "montre5", "montreGen1", "montreGen2", "montreGen3", "montreGen4", "montreGen5"],
  fleurs: ["fleurs1", "fleurs2", "fleurs3", "fleurs4", "fleurs5", "fleursGen1", "fleursGen2", "fleursGen3", "fleursGen4", "fleursGen5"],
  publicity: ["publicity1", "publicity2", "publicity3", "publicity4", "publicity5"],
  patisserie: ["patisserie1", "patisserie2", "patisserie3", "patisserie4", "patisserie5", "patisserieGen1", "patisserieGen2", "patisserieGen3", "patisserieGen4", "patisserieGen5"],
  sushi: ["sushi1", "sushi2", "sushi3", "sushi4", "sushi5"],
  "fruits-secs": ["fruitsSecsGen1", "fruitsSecsGen2", "fruitsSecsGen3", "fruitsSecsGen4", "fruitsSecsGen5"],
  dates: ["datesPaper1", "datesPaper2", "datesPaper3", "datesPaper4", "datesPaper5"],
  "8-mars": ["mars1", "mars2", "mars3", "mars4", "mars5"],
  mariage: ["mariage1", "mariage2", "mariage3", "mariage4", "mariage5"],
  "sac-de-luxe": ["sac-luxe1", "sac-luxe2", "sac-luxe3", "sac-luxe4", "sac-luxe5"],
  "boite-cylindrique-choix": ["blanc-trio", "blanc-duo", "magenta", "roses", "pastel", "cylindre1", "cylindre2", "cylindre3", "cylindre4", "cylindre5"],
};

/** Resolve the styles for a box type (falls back to a generic set). */
export function stylesFor(boxId: string): BoxStyle[] {
  const keys = BOX_GALLERY[boxId] ?? ["magenta", "blanc-trio", "roses", "tubes"];
  return keys.map((k) => BOX_STYLES[k]).filter(Boolean);
}

/** Resolve a public image path for either legacy JPGs or generated PNGs. */
export function styleImageSrc(style: BoxStyle): string {
  return `/gallery/${style.file ?? `${style.key}.jpg`}`;
}
