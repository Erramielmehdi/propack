import { calc } from "./price";
import type {
  BoxType,
  ClientInfo,
  DevisPayload,
  Extra,
} from "./types";

/**
 * Build the canonical devis payload from calculator state.
 * Keeps the DB shape identical to the original calculator.
 */
export function buildDevisPayload(args: {
  boxType: BoxType | null;
  diameter: number;
  height: number;
  quantity: number;
  extras: Extra[];
  client: ClientInfo;
  notes: string;
}): DevisPayload {
  const { boxType, diameter, height, quantity, extras, client, notes } = args;
  const r = calc({ diameter, height, quantity, selectedExtras: extras });

  return {
    product_type: boxType?.label ?? "",
    diameter_mm: diameter,
    height_mm: height,
    quantity,
    diameter_rate: r.dRate,
    body_area: r.bodyArea,
    lid_area: r.lidArea,
    total_area: r.totalArea,
    extras_json: JSON.stringify(extras.map((e) => ({ key: e.key, label: e.label, price: e.price }))),
    extras_cost: r.extraCost,
    unit_price: r.unitPrice,
    discount_pct: r.disc,
    unit_discounted: r.unitDisc,
    total_price: r.total,
    client_date: client.date,
    client_code: client.code,
    client_name: client.name,
    client_phone: client.phone,
    client_email: client.email,
    client_address: client.address,
    notes,
    status: "nouveau",
  };
}

/** Minimal server-side validation for an incoming devis payload. */
export function validateDevisPayload(body: unknown): {
  ok: boolean;
  errors: string[];
  value?: DevisPayload;
} {
  const errors: string[] = [];
  const b = (body ?? {}) as Record<string, unknown>;

  const num = (k: string) => {
    const v = Number(b[k]);
    if (!Number.isFinite(v)) errors.push(`Champ numérique invalide : ${k}`);
    return v;
  };
  const str = (k: string) => (typeof b[k] === "string" ? (b[k] as string) : "");

  if (!str("product_type")) errors.push("Le type de produit est requis.");

  const value: DevisPayload = {
    product_type: str("product_type"),
    diameter_mm: num("diameter_mm"),
    height_mm: num("height_mm"),
    quantity: num("quantity"),
    diameter_rate: num("diameter_rate"),
    body_area: num("body_area"),
    lid_area: num("lid_area"),
    total_area: num("total_area"),
    extras_json: str("extras_json") || "[]",
    extras_cost: num("extras_cost"),
    unit_price: num("unit_price"),
    discount_pct: num("discount_pct"),
    unit_discounted: num("unit_discounted"),
    total_price: num("total_price"),
    client_date: str("client_date"),
    client_code: str("client_code"),
    client_name: str("client_name"),
    client_phone: str("client_phone"),
    client_email: str("client_email"),
    client_address: str("client_address"),
    notes: str("notes"),
    status: str("status") || "nouveau",
  };

  return { ok: errors.length === 0, errors, value };
}
