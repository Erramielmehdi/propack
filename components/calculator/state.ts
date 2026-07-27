import type { BoxType, ClientInfo, Extra } from "@/lib/calculator/types";
import { EXTRAS } from "@/lib/calculator/constants";

/** Wizard step labels (used by StepDots and headers). */
export const STEP_LABELS = [
  "Type de boîte",
  "Diamètre",
  "Hauteur",
  "Quantité & options",
  "Résultat",
] as const;

/** Full wizard state held by the Calculator component. */
export interface WizardState {
  step: number;
  boxType: BoxType | null;
  client: ClientInfo;
  diameter: number | null;
  height: number | null;
  quantity: number | null;
  /** Selected extra keys. */
  extraKeys: string[];
  notes: string;
}

export const EMPTY_CLIENT: ClientInfo = {
  date: "",
  code: "",
  name: "",
  phone: "",
  email: "",
  address: "",
};

export function initialState(): WizardState {
  return {
    step: 0,
    boxType: null,
    client: { ...EMPTY_CLIENT },
    diameter: null,
    height: null,
    quantity: null,
    extraKeys: [],
    notes: "",
  };
}

/** Resolve selected Extra objects from stored keys, preserving catalog order. */
export function resolveExtras(keys: string[]): Extra[] {
  return EXTRAS.filter((e) => keys.includes(e.key));
}

/**
 * Whether the wizard can advance from a given step.
 * Mirrors the original calculator's canGo() validation.
 */
export function canGo(state: WizardState, step: number): boolean {
  switch (step) {
    case 0:
      return state.boxType !== null;
    case 1:
      return typeof state.diameter === "number" && state.diameter > 0;
    case 2:
      return typeof state.height === "number" && state.height > 0;
    case 3:
      return typeof state.quantity === "number" && state.quantity > 0;
    case 4:
      return true;
    default:
      return false;
  }
}

/** True when every earlier step up to and including `target` is satisfied. */
export function canReach(state: WizardState, target: number): boolean {
  for (let s = 0; s < target; s++) {
    if (!canGo(state, s)) return false;
  }
  return true;
}
