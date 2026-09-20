/** Shared calculator styles, aligned with the site's paper-and-coral system. */

export const calcColor = {
  bg: "#F5F6F4",
  bg2: "#FFFFFF",
  gold: "#D65C44",
  goldLight: "#F0806A",
  text: "#241F1A",
  text2: "#726861",
  border: "#241F1A24",
  green: "#1E7A55",
  red: "#C23B3B",
};

export const calcLabel =
  "font-mono text-[0.66rem] font-semibold uppercase tracking-tech text-[#756A63]";

export const calcCard =
  "rounded-lg border border-[#241F1A24] bg-white shadow-[0_24px_70px_-40px_rgba(36,31,26,0.45)]";

const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 font-sans text-sm font-semibold transition-[transform,border-color,color,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D65C44]/35 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

/** Buttons use the logo coral and the same restrained geometry as the site. */
export const calcBtn = {
  gold: `${btnBase} bg-[#F0806A] text-[#241F1A] shadow-[0_10px_24px_-14px_rgba(214,92,68,0.65)] hover:-translate-y-0.5 hover:bg-[#E56D55] hover:shadow-[0_14px_28px_-14px_rgba(214,92,68,0.7)] active:translate-y-0 active:bg-[#D65C44]`,
  ghost: `${btnBase} border border-[#241F1A33] bg-white text-[#241F1A] hover:-translate-y-0.5 hover:border-[#D65C44] hover:text-[#D65C44] active:translate-y-0`,
  wa: `${btnBase} bg-[#1E9E59] text-white shadow-[0_10px_24px_-14px_rgba(30,158,89,0.65)] hover:-translate-y-0.5 hover:bg-[#17864A] active:translate-y-0`,
};

/** Option-card classes for the type / diameter / quantity picker grids. */
export function calcOption(selected: boolean) {
  return `rounded-lg border bg-white transition-[transform,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D65C44]/35 focus-visible:ring-offset-2 active:scale-[0.98] ${
    selected
      ? "border-[#D65C44] bg-[#FFF5F2] shadow-[0_10px_26px_-18px_rgba(214,92,68,0.8)]"
      : "border-[#241F1A24] hover:-translate-y-0.5 hover:border-[#241F1A55] hover:shadow-[0_12px_24px_-20px_rgba(36,31,26,0.55)]"
  }`;
}
