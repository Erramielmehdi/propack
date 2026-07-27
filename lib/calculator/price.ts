import { QTY_DISC } from "./constants";
import type { CalcInput, CalcResult, DiamTier } from "./types";

/**
 * Pure pricing functions — unit-testable, no side effects.
 * Ported verbatim from the original calculator; math must not drift.
 */

/**
 * Per-cm² diameter rate (DH), keyed off the diameter in **millimetres**.
 */
export function getDiamRate(d: number): number {
  return d <= 120 ? 0.06 : d <= 240 ? 0.04 : 0.037;
}

/**
 * Tier key for a diameter in **millimetres**.
 */
export function getDiamTier(d: number): DiamTier {
  return d <= 120 ? "s" : d <= 240 ? "m" : "l";
}

/**
 * Resolve the discount fraction for a given quantity.
 * Uses the preset table, falling back to 20% for anything >= 5000.
 */
export function getDiscount(q: number): number {
  return QTY_DISC[q] ?? (q >= 5000 ? 0.2 : 0);
}

/**
 * Price a cylindrical box quote.
 *
 * Diameter and height arrive in millimetres and are converted to cm (÷10).
 * The diameter *rate* uses the raw millimetre value.
 */
export function calc(input: CalcInput): CalcResult {
  const { diameter, height, quantity, selectedExtras } = input;

  const D = diameter / 10; // mm -> cm
  const H = height / 10; // mm -> cm

  const dRate = getDiamRate(diameter); // uses mm value
  const tier = getDiamTier(diameter);

  const bodyArea = Math.PI * D * H; // surface latérale
  const lidArea = 2 * Math.PI * (D / 2) ** 2; // couvercle + fond
  const totalArea = bodyArea + lidArea; // cm²

  const extraCost = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = totalArea * dRate + extraCost;

  const disc = getDiscount(quantity);
  const unitDisc = unitPrice * (1 - disc);
  const total = unitDisc * quantity;

  return {
    D,
    H,
    dRate,
    tier,
    bodyArea,
    lidArea,
    totalArea,
    extraCost,
    unitPrice,
    disc,
    unitDisc,
    total,
  };
}
