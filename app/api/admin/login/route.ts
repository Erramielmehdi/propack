import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminConfigured, isAdminEmail } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "L'administration Supabase n'est pas encore configurée." },
      { status: 503 },
    );
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) {
    return NextResponse.json(
      { error: "E-mail et mot de passe requis." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return NextResponse.json(
      { error: "Identifiants incorrects." },
      { status: 401 },
    );
  }

  if (!isAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    return NextResponse.json(
      { error: "Ce compte n'est pas autorisé à administrer le site." },
      { status: 403 },
    );
  }

  return NextResponse.json({ ok: true });
}
