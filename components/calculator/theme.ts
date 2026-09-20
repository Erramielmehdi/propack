/** Shared calculator styles, aligned with the site's paper-and-coral system. */

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
  "font-mono text-[0.66rem] font-semibold uppercase tracking-tech text-[#C9A227]";

export const calcCard =
  "rounded-lg border border-[#C9A22733] bg-[linear-gradient(135deg,#0A0A0A_0%,#151008_52%,#0A0A0A_100%)] shadow-[0_24px_70px_-34px_rgba(0,0,0,0.9)]";

const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 font-sans text-sm font-semibold transition-[transform,border-color,color,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C547]/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

/** Buttons use the logo coral and the same restrained geometry as the site. */
export const calcBtn = {
  gold: `${btnBase} bg-[#F0806A] text-[#241F1A] shadow-[0_10px_24px_-14px_rgba(214,92,68,0.65)] hover:-translate-y-0.5 hover:bg-[#E56D55] hover:shadow-[0_14px_28px_-14px_rgba(214,92,68,0.7)] active:translate-y-0 active:bg-[#D65C44]`,
  ghost: `${btnBase} border border-[#F0806A66] bg-transparent text-[#F0806A] hover:-translate-y-0.5 hover:border-[#F0806A] hover:bg-[#F0806A0D] active:translate-y-0`,
  wa: `${btnBase} bg-[#1E9E59] text-white shadow-[0_10px_24px_-14px_rgba(30,158,89,0.65)] hover:-translate-y-0.5 hover:bg-[#17864A] active:translate-y-0`,
};

/** Option-card classes for the type / diameter / quantity picker grids. */
export function calcOption(selected: boolean) {
  return `rounded-lg border bg-white/[0.02] transition-[transform,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C547]/35 active:scale-[0.98] ${
    selected
      ? "border-[#C9A227] bg-[#C9A22718] shadow-[0_10px_26px_-18px_rgba(201,162,39,0.8)]"
      : "border-[#C9A22733] hover:-translate-y-0.5 hover:border-[#C9A22799] hover:bg-white/[0.035] hover:shadow-[0_12px_24px_-20px_rgba(201,162,39,0.6)]"
  }`;
}
