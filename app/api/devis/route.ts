import { NextResponse } from "next/server";
import { createDevis, listDevis } from "@/lib/store";
import { validateDevisPayload } from "@/lib/calculator/payload";

/** GET /api/devis — list all saved quotes (newest first). */
export async function GET() {
  return NextResponse.json({ devis: listDevis() });
}

/** POST /api/devis — persist a new quote. */
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
    return NextResponse.json({ error: "Validation échouée.", errors }, { status: 422 });
  }

  const devis = createDevis(value);
  return NextResponse.json({ devis }, { status: 201 });
}
