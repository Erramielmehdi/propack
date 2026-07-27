# ProPack — Site vitrine & calculateur

Site web production-ready pour **ProPack**, fabricant marocain de boîtes cadeaux
cylindriques sur mesure.

> _L'emballage cylindrique sur mesure._

Stack : **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion**.
Interface 100 % en français, mobile-first, accessible (WCAG AA), SEO + OpenGraph.

---

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
```

Autres scripts :

```bash
npm run build    # build de production
npm run start    # serveur de production (après build)
npm run lint     # ESLint (next/core-web-vitals)
npm run test     # tests unitaires du moteur de prix (Vitest)
```

Node.js 18.18+ recommandé.

---

## Pages

| Route              | Description                                                        |
| ------------------ | ----------------------------------------------------------------- |
| `/`                | Accueil — hero, valeurs, 16 types de boîtes, process, stats, avis |
| `/services`        | Services, finitions (Ruban, Marquage, Gaufrage, Vernis UV), remises volume, secteurs |
| `/calcule`         | **Calculateur** — assistant 5 étapes, prix instantané             |
| `/a-propos`        | Histoire, mission, valeurs, timeline, équipe, certifications, galerie |
| `/contact`         | Formulaire validé (pré-remplissable depuis le calculateur), carte, WhatsApp, FAQ |
| `/admin`           | Panneau d'administration (stretch goal, accès protégé)            |
| `/mentions-legales`, `/confidentialite` | Pages légales                                |

---

## Le calculateur (`/calcule`)

Assistant en 5 étapes avec points de progression :

1. **Type de boîte** (grille de 16) + infos client
2. **Diamètre** (bordures colorées par palier : petit / moyen / grand)
3. **Hauteur** (paliers rapides + saisie mm personnalisée)
4. **Quantité** (paliers avec % de remise + quantité libre) + **options de finition** + notes
5. **Résultat** — prix unitaire, détail du calcul, total en encart doré

Actions : **Enregistrer** (`POST /api/devis`), **Envoyer par e-mail** (transfert
vers `/contact`), **Partager sur WhatsApp**, **Réinitialiser**, navigation
Précédent / Suivant avec validation `canGo()`.

### Moteur de prix — pur & testé

Toute la logique de calcul est isolée et testable :

- **`lib/calculator/constants.ts`** — `DIAMS`, `QUICK_H`, `QTY_OPT`, `QTY_DISC`,
  `EXTRAS`, `BOX_TYPES`, couleurs de paliers.
- **`lib/calculator/price.ts`** — fonctions pures `getDiamRate`, `getDiamTier`,
  `getDiscount`, `calc`.
- **`__tests__/price.test.ts`** — vérifie la math (aires, taux, remises, total).

Formules (diamètre `D` et hauteur `H` convertis mm → cm) :

```ts
D = diameter / 10;  H = height / 10;
dRate     = diameter <= 120 ? 0.06 : diameter <= 240 ? 0.04 : 0.037;  // sur la valeur en mm
bodyArea  = Math.PI * D * H;              // surface latérale
lidArea   = 2 * Math.PI * (D / 2) ** 2;   // couvercle + fond
totalArea = bodyArea + lidArea;           // cm²
unitPrice = totalArea * dRate + extraCost;
disc      = QTY_DISC[q] ?? (q >= 5000 ? 0.20 : 0);
unitDisc  = unitPrice * (1 - disc);
total     = unitDisc * q;
```

Finitions : Ruban +1,50 DH · Marquage à Chaud +1,50 DH · Gaufrage +1,00 DH ·
Vernis UV +1,20 DH. Remises : 100 → 0 %, 250 → 5 %, 500 → 10 %, 1000 → 15 %,
5000+ → 20 %.

---

## API

| Méthode & route          | Rôle                                    |
| ------------------------ | --------------------------------------- |
| `POST /api/devis`        | Enregistrer un devis                    |
| `GET /api/devis`         | Lister les devis (plus récents d'abord) |
| `GET /api/devis/:id`     | Récupérer un devis                      |
| `PUT /api/devis/:id`     | Mettre à jour (ex : statut)             |
| `DELETE /api/devis/:id`  | Supprimer un devis                      |
| `POST /api/contact`      | Recevoir une demande de contact         |

Le stockage est un **stub en mémoire** (`lib/store.ts`) persistant sur
`globalThis` pour survivre au hot-reload. Remplacez ce module par un adaptateur
SQLite/Postgres — l'API publique (`list/get/create/update/remove`) reste
identique. La forme du payload `devis` (`product_type`, `diameter_mm`,
`height_mm`, `quantity`, `diameter_rate`, `body_area`, `lid_area`, `total_area`,
`extras_json`, `extras_cost`, `unit_price`, `discount_pct`, `unit_discounted`,
`total_price`, `client_*`, `notes`, `status`) est conservée à l'identique.

---

## Design system

Défini dans `tailwind.config.ts` + `app/globals.css`.

- **Thème** : blanc cassé (`#F7F3EB`, dégradé `#FAF7F0 → #EFE9DC`), clair et papier.
- **Bleu ciel** : `#34789F` (accent), `#4E9BC8` (clair), texte encre `#253745`.
- **Cartes** : `rgba(255,255,255,0.55)` + bordure `1px rgba(52,120,159,0.16)` (`.surface`).
- **Typo** : Playfair Display (titres, `<em>` en or) + Lato (corps, labels
  capitales espacées `.label-track`).
- **Boutons** : dégradé or avec clip angulaire
  `polygon(7px 0%, 100% 0%, calc(100% - 7px) 100%, 0% 100%)` (`.clip-angled`) +
  variante ghost.
- **Divers** : divider or fin sous les titres (`.gold-divider`), transitions
  fade-in-up (`components/ui/Reveal`), `prefers-reduced-motion` respecté.

### Composants réutilisables

`Header`, `Footer`, `Logo`, `Section`, `GoldButton`/`GoldLink`/`GoldAnchor`,
`Card`, `Input`/`Textarea`/`Select`, `Accordion`, `StepDots`, `Counter`,
`Reveal`, `GoldDivider`, `Calculator` (+ étapes).

---

## Arborescence

```
propack/
├─ app/
│  ├─ layout.tsx  globals.css  sitemap.ts  robots.ts  not-found.tsx
│  ├─ page.tsx  services/  calcule/  a-propos/  contact/
│  ├─ mentions-legales/  confidentialite/  admin/
│  └─ api/{devis, devis/[id], contact}/route.ts
├─ components/
│  ├─ layout/{Header,Footer,Logo}.tsx
│  ├─ ui/*  home/*  contact/*
│  └─ calculator/{Calculator,state,waMessage}.ts(x) + steps/*
├─ lib/
│  ├─ calculator/{constants,price,payload,types}.ts
│  └─ format.ts  content.ts  store.ts
├─ __tests__/price.test.ts
└─ config: tailwind.config.ts, tsconfig.json, next.config.mjs, vitest.config.ts …
```

---

## Personnalisation rapide

- **Coordonnées, réseaux, copie** : `lib/content.ts` (objet `SITE` + sections).
- **Types de boîtes / tarifs** : `lib/calculator/constants.ts`.
- **Couleurs & typographie** : `tailwind.config.ts`.
- **Envoi d'e-mails** : brancher un service dans `app/api/contact/route.ts`.
- **Auth admin** : `/admin` utilise un simple gate de démo — remplacer par une
  vraie authentification serveur avant mise en production.

---

© 2026 ProPack. Contenu et visuels de démonstration à remplacer par vos éléments réels.
