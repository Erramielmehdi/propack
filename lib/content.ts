/**
 * Static site content (French copy). Centralised so pages stay declarative.
 */

export const SITE = {
  name: "ProPack",
  tagline: "L'emballage cylindrique sur mesure",
  description:
    "ProPack, fabricant marocain de boîtes cadeaux cylindriques sur mesure. Impression, personnalisation et finitions premium pour parfum, chocolat, cosmétique et bien plus.",
  url: "https://www.propack.ma",
  phone: "+212 6 61 23 45 67",
  phoneHref: "+212661234567",
  whatsapp: "212661234567",
  email: "contact@propack.ma",
  address: "Zone Industrielle Aïn Sebaâ, Casablanca, Maroc",
  hours: "Lun – Sam : 8h30 – 18h30",
  socials: {
    instagram: "https://instagram.com/propack.ma",
    facebook: "https://facebook.com/propack.ma",
    linkedin: "https://linkedin.com/company/propack-ma",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;

export const VALUE_PROPS = [
  {
    icon: "✦",
    title: "Sur-mesure",
    text: "Chaque boîte coffrée est conçue selon vos dimensions, votre marque et votre produit, sans compromis.",
  },
  {
    icon: "◈",
    title: "Qualité premium",
    text: "Cartons rigides, finitions et impression haute définition pour un rendu luxe.",
  },
  {
    icon: "⬢",
    title: "Équipe à votre écoute",
    text: "Une équipe réactive et responsable, engagée à satisfaire chaque client du premier échange à la livraison.",
  },
  {
    icon: "✺",
    title: "Éco-responsable",
    text: "Matériaux recyclables et sourcing certifié pour un packaging durable.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Consultation",
    text: "Nous étudions votre produit, votre budget et vos contraintes pour définir le cahier des charges.",
  },
  {
    n: "02",
    title: "Design",
    text: "Nos designers créent la structure, le gabarit et le visuel, avec bon à tirer avant lancement.",
  },
  {
    n: "03",
    title: "Production",
    text: "Fabrication, impression et finitions dans notre atelier, sous contrôle qualité rigoureux.",
  },
  {
    n: "04",
    title: "Livraison",
    text: "Emballage sécurisé et livraison partout au Maroc, dans les délais convenus.",
  },
] as const;

export const STATS = [
  { value: 16, suffix: "", label: "Modèles au catalogue" },
  { value: 48, suffix: "h", label: "Prototype express" },
  { value: 100, suffix: " %", label: "Sur-mesure" },
  { value: 4, suffix: "", label: "Finitions premium" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "ProPack a transformé notre coffret parfum. La finition dorée fait toute la différence sur nos ventes.",
    author: "Salma B.",
    role: "Fondatrice, Maison de parfum",
  },
  {
    quote:
      "Réactifs, précis sur les délais et un rapport qualité-prix imbattable pour nos séries de chocolats.",
    author: "Youssef A.",
    role: "Directeur, Chocolaterie artisanale",
  },
  {
    quote:
      "Le calculateur de devis nous a fait gagner un temps fou. On chiffre nos boîtes en deux minutes.",
    author: "Nadia E.",
    role: "Responsable achats, Cosmétique bio",
  },
] as const;

export const SERVICES = [
  {
    title: "Fabrication sur-mesure",
    text: "Conception de boîtes cylindriques rigides adaptées à vos dimensions exactes : diamètre, hauteur, épaisseur et système d'ouverture.",
    icon: "◎",
  },
  {
    title: "Impression & personnalisation",
    text: "Impression quadrichromie, Pantone, dorure et pelliculage. Votre identité de marque reproduite fidèlement sur chaque boîte.",
    icon: "✎",
  },
  {
    title: "Petites & grandes séries",
    text: "De 100 pièces pour un lancement à plusieurs dizaines de milliers pour la distribution : nous nous adaptons à votre volume.",
    icon: "▦",
  },
  {
    title: "Prototypage",
    text: "Un prototype physique validé avant production. Testez la structure, les matières et le rendu avant de vous engager.",
    icon: "⬡",
  },
  {
    title: "Conseil packaging",
    text: "Nos experts vous orientent sur les matériaux, les finitions et l'optimisation des coûts pour un packaging performant.",
    icon: "✳",
  },
  {
    title: "Sac de luxe",
    text: "Un sac de luxe en papier est un emballage haut de gamme, solide et élégant, personnalisé avec des poignées et des finitions brillantes ou mates.",
    icon: "❖",
  },
] as const;

export const SECTORS = [
  "Parfumerie & cosmétique",
  "Chocolaterie & confiserie",
  "Bijouterie & horlogerie",
  "Épicerie fine & terroir",
  "Événementiel & mariage",
  "Objets publicitaires",
  "Pâtisserie & traiteur",
  "Fleuristes",
] as const;

export const VOLUME_TABLE = [
  { qty: 100, disc: 0 },
  { qty: 250, disc: 0.05 },
  { qty: 500, disc: 0.1 },
  { qty: 1000, disc: 0.15 },
  { qty: 5000, disc: 0.2 },
] as const;

export const VALUES = [
  {
    title: "Exigence",
    text: "Nous refusons l'à-peu-près. Chaque détail compte, du gabarit au dernier vernis.",
  },
  {
    title: "Proximité",
    text: "Un interlocuteur unique, à l'écoute, du premier devis à la livraison finale.",
  },
  {
    title: "Durabilité",
    text: "Des matériaux responsables et une production qui limite les pertes et le gaspillage.",
  },
  {
    title: "Innovation",
    text: "Nous investissons dans de nouvelles finitions et procédés pour vous démarquer.",
  },
] as const;

export const TIMELINE = [
  { year: "2006", title: "Naissance de ProPack", text: "Création de l'entreprise à Casablanca, avec une spécialité assumée : la boîte cylindrique sur mesure." },
  { year: "2006", title: "Un atelier moderne", text: "Installation de notre atelier à Aïn Sebaâ : impression, bobinage et finitions réunis sous un même toit." },
  { year: "2026", title: "Calculateur en ligne", text: "Lancement de notre outil de devis instantané pour chiffrer votre boîte en quelques clics." },
  { year: "Demain", title: "Cap sur l'export", text: "Certification FSC en cours et premières séries destinées au marché européen." },
];

export const TEAM = [
  { name: "Karim Benali", role: "Fondateur & Directeur", initials: "KB" },
  { name: "Imane Toumi", role: "Responsable Design", initials: "IT" },
  { name: "Rachid Amrani", role: "Chef d'atelier", initials: "RA" },
  { name: "Sara Lahlou", role: "Relation client", initials: "SL" },
];

export const CERTIFICATIONS = [
  { code: "FSC", label: "Sourcing de carton issu de forêts gérées durablement, certification en cours." },
  { code: "Qualité", label: "Contrôle qualité systématique, du gabarit au dernier vernis." },
  { code: "Éco", label: "Matériaux recyclables et réduction des chutes en atelier." },
];

export const FAQ = [
  {
    q: "Quelle est la quantité minimum de commande ?",
    a: "Nous produisons à partir de 100 pièces. Pour les prototypes, nous pouvons réaliser une pièce unique de validation.",
  },
  {
    q: "Quels sont les délais de production ?",
    a: "Comptez 48h pour un prototype et 10 à 20 jours ouvrés pour une série, selon la complexité et le volume.",
  },
  {
    q: "Puis-je imprimer mon logo et mes couleurs ?",
    a: "Absolument. Nous imprimons en quadrichromie et en Pantone, avec des finitions dorure, gaufrage et vernis UV.",
  },
  {
    q: "Livrez-vous partout au Maroc ?",
    a: "Oui, nous livrons dans toutes les villes du Royaume. La livraison à l'international est possible sur devis.",
  },
  {
    q: "Comment obtenir un devis ?",
    a: "Utilisez notre calculateur en ligne pour une estimation instantanée, ou contactez-nous pour un devis détaillé.",
  },
];
