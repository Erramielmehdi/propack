import type { DevisPayload, DevisRecord } from "./calculator/types";

/**
 * In-memory devis store (stub).
 *
 * Persisted on `globalThis` so it survives Next.js hot-reloads in dev.
 * Swap this module for a SQLite/Postgres adapter in production — the public
 * API (list/get/create/update/remove) stays the same.
 */

interface Store {
  devis: DevisRecord[];
  seq: number;
}

const g = globalThis as unknown as { __propackStore?: Store };

const store: Store =
  g.__propackStore ?? (g.__propackStore = { devis: [], seq: 0 });

function nextId(): string {
  store.seq += 1;
  return `DV-${String(store.seq).padStart(5, "0")}`;
}

export function listDevis(): DevisRecord[] {
  return [...store.devis].reverse(); // newest first
}

export function getDevis(id: string): DevisRecord | undefined {
  return store.devis.find((d) => d.id === id);
}

export function createDevis(payload: DevisPayload): DevisRecord {
  const record: DevisRecord = {
    ...payload,
    id: nextId(),
    // Timestamp is provided by the caller-agnostic Date at request time.
    created_at: new Date().toISOString(),
    status: payload.status || "nouveau",
  };
  store.devis.push(record);
  return record;
}

export function updateDevis(
  id: string,
  patch: Partial<DevisPayload>,
): DevisRecord | undefined {
  const record = store.devis.find((d) => d.id === id);
  if (!record) return undefined;
  Object.assign(record, patch);
  return record;
}

export function removeDevis(id: string): boolean {
  const i = store.devis.findIndex((d) => d.id === id);
  if (i === -1) return false;
  store.devis.splice(i, 1);
  return true;
}
