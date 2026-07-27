/**
 * Shared calculator types.
 */

/** Diameter tier key. */
export type DiamTier = "s" | "m" | "l";

/** A finishing add-on the client can toggle. */
export interface Extra {
  /** Stable key stored in extras_json. */
  key: "ribbon" | "marquage" | "gaufrage" | "uvSpot";
  /** French label shown in the UI. */
  label: string;
  /** Price added per unit, in DH. */
  price: number;
}

/** A selectable box type. */
export interface BoxType {
  id: string;
  label: string;
  /** Emoji glyph kept as a lightweight fallback icon. */
  icon: string;
  /** Material tint used by the rendered mini-box illustration. */
  tint: string;
  description: string;
}

/** Client information captured in step 1. */
export interface ClientInfo {
  date: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

/** Full input required to price a quote. */
export interface CalcInput {
  /** Diameter in millimetres. */
  diameter: number;
  /** Height in millimetres. */
  height: number;
  /** Quantity of units. */
  quantity: number;
  /** Selected finishing add-ons. */
  selectedExtras: Extra[];
}

/** Priced breakdown returned by `calc`. */
export interface CalcResult {
  /** Diameter converted to cm. */
  D: number;
  /** Height converted to cm. */
  H: number;
  /** Per-mm diameter rate (DH / cm²). */
  dRate: number;
  /** Tier key derived from the diameter. */
  tier: DiamTier;
  /** Lateral body surface: π·D·H (cm²). */
  bodyArea: number;
  /** Lid + base surface: 2·π·r² (cm²). */
  lidArea: number;
  /** Total surface (cm²). */
  totalArea: number;
  /** Sum of selected add-on prices (DH). */
  extraCost: number;
  /** Raw unit price before discount (DH). */
  unitPrice: number;
  /** Discount fraction applied (0–0.20). */
  disc: number;
  /** Net unit price after discount (DH). */
  unitDisc: number;
  /** Grand total (DH). */
  total: number;
}

/** Full devis payload — mirrors the calculator's DB shape. */
export interface DevisPayload {
  product_type: string;
  diameter_mm: number;
  height_mm: number;
  quantity: number;
  diameter_rate: number;
  body_area: number;
  lid_area: number;
  total_area: number;
  extras_json: string;
  extras_cost: number;
  unit_price: number;
  discount_pct: number;
  unit_discounted: number;
  total_price: number;
  client_date: string;
  client_code: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  client_address: string;
  notes: string;
  status: string;
}

/** Stored devis record (payload + server fields). */
export interface DevisRecord extends DevisPayload {
  id: string;
  created_at: string;
}
