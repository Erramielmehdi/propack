import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createDevis, listDevis } from "@/lib/store";
import { validateDevisPayload } from "@/lib/calculator/payload";

export const dynamic = "force-dynamic";

/** GET /api/devis - list all saved quotes for authenticated admins. */
export async function GET() {
  if (!(await getAdminUser())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    return NextResponse.json({ devis: await listDevis() });
  } catch {
    return NextResponse.json(
      { error: "Impossible de charger les devis." },
      { status: 503 },
    );
  }
}

/** POST /api/devis - persist a validated customer quote. */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 },
    );
  }

  const { ok, errors, value } = validateDevisPayload(body);
  if (!ok || !value) {
    return NextResponse.json(
      { error: "Validation échouée.", errors },
      { status: 422 },
    );
  }

  try {
    const devis = await createDevis(value);
    return NextResponse.json({ devis }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Impossible d'enregistrer le devis." },
      { status: 503 },
    );
  }
}
