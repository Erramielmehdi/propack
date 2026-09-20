import type { DevisPayload, DevisRecord } from "./calculator/types";
import { createSupabaseAdminClient } from "./supabase/admin";

const TABLE = "devis";

function fail(operation: string, message: string): never {
  throw new Error(`Supabase ${operation} failed: ${message}`);
}

export async function listDevis(): Promise<DevisRecord[]> {
  const { data, error } = await createSupabaseAdminClient()
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) fail("listDevis", error.message);
  return (data ?? []) as DevisRecord[];
}

export async function getDevis(id: string): Promise<DevisRecord | undefined> {
  const { data, error } = await createSupabaseAdminClient()
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) fail("getDevis", error.message);
  return (data as DevisRecord | null) ?? undefined;
}

export async function createDevis(
  payload: DevisPayload,
): Promise<DevisRecord> {
  const { data, error } = await createSupabaseAdminClient()
    .from(TABLE)
    .insert({
      ...payload,
      status: "nouveau",
    })
    .select("*")
    .single();

  if (error) fail("createDevis", error.message);
  return data as DevisRecord;
}

export async function updateDevis(
  id: string,
  patch: Partial<DevisPayload>,
): Promise<DevisRecord | undefined> {
  const { data, error } = await createSupabaseAdminClient()
    .from(TABLE)
    .update(patch)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) fail("updateDevis", error.message);
  return (data as DevisRecord | null) ?? undefined;
}

export async function removeDevis(id: string): Promise<boolean> {
  const { data, error } = await createSupabaseAdminClient()
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select("id");

  if (error) fail("removeDevis", error.message);
  return Boolean(data?.length);
}
