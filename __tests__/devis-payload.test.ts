import { describe, expect, it } from "vitest";
import { BOX_TYPES, EXTRAS } from "@/lib/calculator/constants";
import { calc } from "@/lib/calculator/price";
import {
  buildDevisPayload,
  validateDevisPayload,
} from "@/lib/calculator/payload";

function validPayload() {
  return buildDevisPayload({
    boxType: BOX_TYPES[0],
    diameter: 100,
    height: 200,
    quantity: 500,
    extras: [EXTRAS[0]],
    client: {
      date: "",
      code: "",
      name: "Client Test",
      phone: "+212600000000",
      email: "",
      address: "Casablanca",
    },
    notes: "Test",
  });
}

describe("validateDevisPayload", () => {
  it("recalculates prices instead of trusting browser totals", () => {
    const payload = {
      ...validPayload(),
      unit_price: 0.01,
      unit_discounted: 0.01,
      total_price: 0.01,
      discount_pct: 0.99,
    };

    const result = validateDevisPayload(payload);
    const expected = calc({
      diameter: 100,
      height: 200,
      quantity: 500,
      selectedExtras: [EXTRAS[0]],
    });

    expect(result.ok).toBe(true);
    expect(result.value?.unit_price).toBeCloseTo(expected.unitPrice, 6);
    expect(result.value?.unit_discounted).toBeCloseTo(expected.unitDisc, 6);
    expect(result.value?.total_price).toBeCloseTo(expected.total, 6);
    expect(result.value?.discount_pct).toBe(expected.disc);
  });

  it("requires a customer name and a contact method", () => {
    const result = validateDevisPayload({
      ...validPayload(),
      client_name: "",
      client_phone: "",
      client_email: "",
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("Le nom ou la société est requis.");
    expect(result.errors).toContain("Un téléphone ou un e-mail est requis.");
  });

  it("rejects invalid dimensions and unknown options", () => {
    const result = validateDevisPayload({
      ...validPayload(),
      diameter_mm: -10,
      extras_json: JSON.stringify([{ key: "free-product", price: -999 }]),
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("Le diamètre doit être un nombre entier positif.");
    expect(result.errors).toContain("Les options sélectionnées sont invalides.");
  });
});
