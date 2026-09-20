import { calc } from "./price";
import { BOX_TYPES, EXTRAS } from "./constants";
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
    client_date: client.date || new Date().toISOString().slice(0, 10),
    client_code: client.code,
    client_name: client.name,
    client_phone: client.phone,
    client_email: client.email,
    client_address: client.address,
    notes,
    status: "nouveau",
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate customer input and rebuild every price on the server. */
export function validateDevisPayload(body: unknown): {
  ok: boolean;
  errors: string[];
  value?: DevisPayload;
} {
  const errors: string[] = [];
  const b = (body ?? {}) as Record<string, unknown>;

  const positiveInt = (k: string, label: string) => {
    const v = Number(b[k]);
    if (!Number.isInteger(v) || v <= 0) {
      errors.push(`${label} doit être un nombre entier positif.`);
      return 0;
    }
    return v;
  };
  const str = (k: string) =>
    typeof b[k] === "string" ? (b[k] as string).trim() : "";

  const productType = str("product_type");
  if (!BOX_TYPES.some((box) => box.label === productType)) {
    errors.push("Le type de produit est invalide.");
  }

  const diameter = positiveInt("diameter_mm", "Le diamètre");
  const height = positiveInt("height_mm", "La hauteur");
  const quantity = positiveInt("quantity", "La quantité");
  const clientName = str("client_name");
  const clientPhone = str("client_phone");
  const clientEmail = str("client_email");

  if (!clientName) errors.push("Le nom ou la société est requis.");
  if (!clientPhone && !clientEmail) {
    errors.push("Un téléphone ou un e-mail est requis.");
  }
  if (clientEmail && !EMAIL_RE.test(clientEmail)) {
    errors.push("L'adresse e-mail est invalide.");
  }

  let requestedExtraKeys: string[] = [];
  try {
    const parsed = JSON.parse(str("extras_json") || "[]");
    if (!Array.isArray(parsed)) throw new Error();
    requestedExtraKeys = parsed.map((item) =>
      typeof item === "object" && item !== null && typeof item.key === "string"
        ? item.key
        : "",
    );
    if (requestedExtraKeys.some((key) => !EXTRAS.some((extra) => extra.key === key))) {
      throw new Error();
    }
  } catch {
    errors.push("Les options sélectionnées sont invalides.");
  }

  const selectedExtras = EXTRAS.filter((extra) => requestedExtraKeys.includes(extra.key));
  const priced = calc({
    diameter: diameter || 1,
    height: height || 1,
    quantity: quantity || 1,
    selectedExtras,
  });

  const value: DevisPayload = {
    product_type: productType,
    diameter_mm: diameter,
    height_mm: height,
    quantity,
    diameter_rate: priced.dRate,
    body_area: priced.bodyArea,
    lid_area: priced.lidArea,
    total_area: priced.totalArea,
    extras_json: JSON.stringify(
      selectedExtras.map(({ key, label, price }) => ({ key, label, price })),
    ),
    extras_cost: priced.extraCost,
    unit_price: priced.unitPrice,
    discount_pct: priced.disc,
    unit_discounted: priced.unitDisc,
    total_price: priced.total,
    client_date: str("client_date") || new Date().toISOString().slice(0, 10),
    client_code: str("client_code"),
    client_name: clientName,
    client_phone: clientPhone,
    client_email: clientEmail,
    client_address: str("client_address"),
    notes: str("notes"),
    status: "nouveau",
  };

  return { ok: errors.length === 0, errors, value };
}
