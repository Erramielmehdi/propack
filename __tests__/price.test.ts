import { describe, expect, it } from "vitest";
import { calc, getDiamRate, getDiamTier, getDiscount } from "@/lib/calculator/price";
import { EXTRAS } from "@/lib/calculator/constants";

describe("getDiamRate", () => {
  it("uses 0.06 up to 120mm", () => {
    expect(getDiamRate(40)).toBe(0.06);
    expect(getDiamRate(120)).toBe(0.06);
  });
  it("uses 0.04 for 121–240mm", () => {
    expect(getDiamRate(121)).toBe(0.04);
    expect(getDiamRate(240)).toBe(0.04);
  });
  it("uses 0.037 above 240mm", () => {
    expect(getDiamRate(241)).toBe(0.037);
    expect(getDiamRate(350)).toBe(0.037);
  });
});

describe("getDiamTier", () => {
  it("maps diameters to tiers", () => {
    expect(getDiamTier(120)).toBe("s");
    expect(getDiamTier(200)).toBe("m");
    expect(getDiamTier(300)).toBe("l");
  });
});

describe("getDiscount", () => {
  it("resolves preset thresholds", () => {
    expect(getDiscount(100)).toBe(0);
    expect(getDiscount(250)).toBe(0.05);
    expect(getDiscount(500)).toBe(0.1);
    expect(getDiscount(1000)).toBe(0.15);
    expect(getDiscount(5000)).toBe(0.2);
  });
  it("falls back to 20% for large custom quantities", () => {
    expect(getDiscount(8000)).toBe(0.2);
  });
  it("returns 0 for non-preset small quantities", () => {
    expect(getDiscount(300)).toBe(0);
  });
});

describe("calc", () => {
  it("computes areas, unit price and total without extras", () => {
    const r = calc({ diameter: 100, height: 100, quantity: 100, selectedExtras: [] });
    // D = 10cm, H = 10cm
    expect(r.D).toBe(10);
    expect(r.H).toBe(10);
    expect(r.dRate).toBe(0.06);
    expect(r.tier).toBe("s");
    expect(r.bodyArea).toBeCloseTo(Math.PI * 10 * 10, 6); // ~314.159
    expect(r.lidArea).toBeCloseTo(2 * Math.PI * 25, 6); // ~157.079
    expect(r.totalArea).toBeCloseTo(r.bodyArea + r.lidArea, 6);
    expect(r.extraCost).toBe(0);
    expect(r.unitPrice).toBeCloseTo(r.totalArea * 0.06, 6);
    expect(r.disc).toBe(0);
    expect(r.unitDisc).toBeCloseTo(r.unitPrice, 6);
    expect(r.total).toBeCloseTo(r.unitPrice * 100, 6);
  });

  it("adds extras cost and applies the quantity discount", () => {
    const r = calc({
      diameter: 250,
      height: 120,
      quantity: 1000,
      selectedExtras: EXTRAS, // 1.5 + 1.5 + 1.0 + 1.2 = 5.2
    });
    expect(r.dRate).toBe(0.037);
    expect(r.tier).toBe("l");
    expect(r.extraCost).toBeCloseTo(5.2, 6);
    expect(r.unitPrice).toBeCloseTo(r.totalArea * 0.037 + 5.2, 6);
    expect(r.disc).toBe(0.15);
    expect(r.unitDisc).toBeCloseTo(r.unitPrice * 0.85, 6);
    expect(r.total).toBeCloseTo(r.unitDisc * 1000, 6);
  });
});
