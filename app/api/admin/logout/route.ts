import { NextResponse } from "next/server";
import { hasSupabasePublicConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST() {
  if (hasSupabasePublicConfig()) {
    await createSupabaseServerClient().auth.signOut();
  }
  return NextResponse.json({ ok: true });
}
