/**
 * Dark/gold theme for the calculator wizard — a deliberate departure from
 * the site's global light "Dieline" design system, scoped to /calcule only.
 * Do not import outside components/calculator/**.
 */

export const calcColor = {
  bg: "#0A0A0A",
  bg2: "#1A1208",
  gold: "#C9A227",
  goldLight: "#E8C547",
  text: "#E8D5A3",
  text2: "#C9A22799",
  border: "#C9A22733",
  green: "#25D366",
  red: "#E05252",
};

export const calcLabel =
  "font-mono text-[0.7rem] font-medium uppercase tracking-tech text-[#C9A227]";

export const calcCard =
  "rounded-2xl border border-[#C9A22733] bg-[linear-gradient(135deg,#0A0A0A_0%,#1A1208_50%,#0A0A0A_100%)]";

const btnBase =
  "inline-flex items-center justify-center gap-2 font-mono text-xs font-medium uppercase tracking-tech transition-[transform,filter,border-color,color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 px-6 py-3";

/** clip-angled reuses the site's colorless clip-path utility (globals.css).
 *  Buttons carry the logo coral (#F0806A) so CTAs match site-wide; the rest
 *  of the dark/gold theme is untouched. */
export const calcBtn = {
  gold: `clip-angled ${btnBase} bg-[#F0806A] text-[#241F1A] shadow-[0_14px_36px_-16px_rgba(240,128,106,0.45)] hover:bg-[#E56D55] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#D65C44]`,
  ghost: `clip-angled ${btnBase} border border-[#F0806A66] text-[#F0806A] hover:border-[#F0806A] hover:-translate-y-0.5`,
  wa: `clip-angled ${btnBase} bg-[#25D366] text-white hover:bg-[#1ebe58] hover:-translate-y-0.5`,
};

/** Option-card classes for the type / diameter / quantity picker grids. */
export function calcOption(selected: boolean) {
  return `rounded-xl border transition-[transform,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] ${
    selected
      ? "border-[#C9A227] bg-[#C9A22718] shadow-[0_14px_36px_-18px_rgba(201,162,39,0.45)]"
      : "border-[#C9A22733] hover:border-[#C9A22799]"
  }`;
}
