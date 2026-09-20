import type { User } from "@supabase/supabase-js";
import { isAdminEmail, hasSupabasePublicConfig } from "./supabase/config";
import { createSupabaseServerClient } from "./supabase/server";

export async function getAdminUser(): Promise<User | null> {
  if (!hasSupabasePublicConfig()) return null;

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !isAdminEmail(user.email)) return null;
  return user;
}
