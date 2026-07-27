/**
 * Number/currency formatting helpers (fr-FR, DH / MAD).
 */

const nf2 = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const nf0 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

/** Format a number with exactly 2 decimals, fr-FR grouping. */
export function fmt2(n: number): string {
  if (!Number.isFinite(n)) return "0,00";
  return nf2.format(n);
}

/** Format an integer with fr-FR grouping. */
export function fmtInt(n: number): string {
  if (!Number.isFinite(n)) return "0";
  return nf0.format(n);
}

/** Format a value as a DH amount, e.g. "1 234,56 DH". */
export function fmtDH(n: number): string {
  return `${fmt2(n)} DH`;
}

/** Format a fraction (0.05) as a percentage label ("5 %"). */
export function fmtPct(fraction: number): string {
  return `${nf0.format(fraction * 100)} %`;
}
