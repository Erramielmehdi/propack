/**
 * Shared style helpers for content pulled directly from the Propack.dc.html
 * design (Header, Footer, home page). Kept separate from GoldButton/Section
 * because this design uses a plain square-cornered button and flat dividers,
 * not the site's older clip-angled/mono-uppercase treatment.
 */

const btnBase =
  "inline-flex items-center justify-center gap-1.5 rounded-md font-sans text-sm font-extrabold leading-tight no-underline transition-[transform,background-color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0";

export const dcBtn = {
  primary: `${btnBase} bg-coral px-5 py-2.5 text-cream shadow-[0_3px_12px_-3px_rgba(214,92,68,0.55)] hover:bg-coral-dark active:bg-coral-deep`,
  secondary: `${btnBase} border-2 border-cream/25 px-5 py-2.5 text-cream hover:bg-cream/[7%] active:bg-cream/[14%]`,
  ghost: `${btnBase} px-1.5 py-2 text-gold hover:bg-gold/10 active:bg-gold/[18%]`,
  ghostOnAccent: `${btnBase} border border-noir px-[15px] py-[13px] text-noir hover:bg-noir/10`,
} as const;

/** Kicker label — apply your own margin-bottom at the call site (varies per section). */
export const dcKicker =
  "block font-sans text-xs uppercase tracking-[0.18em] text-kraft";

export const dcDivider = "border-cream/[18%]";

/** Hairline-grid card layout: 2px gap filled with divider color between cards. */
export const dcGrid = "gap-[2px] border-2 border-cream/[18%] bg-cream/[18%]";
