import { NextResponse } from "next/server";
import { getDevis, removeDevis, updateDevis } from "@/lib/store";

interface Ctx {
  params: { id: string };
}

/** GET /api/devis/:id — fetch one quote. */
export async function GET(_req: Request, { params }: Ctx) {
  const devis = getDevis(params.id);
  if (!devis) {
    return NextResponse.json({ error: "Devis introuvable." }, { status: 404 });
  }
  return NextResponse.json({ devis });
}

/** PUT /api/devis/:id — update fields (e.g. status). */
export async function PUT(req: Request, { params }: Ctx) {
  let patch: Record<string, unknown>;
  try {
    patch = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const devis = updateDevis(params.id, patch);
  if (!devis) {
    return NextResponse.json({ error: "Devis introuvable." }, { status: 404 });
  }
  return NextResponse.json({ devis });
}

/** DELETE /api/devis/:id — remove a quote. */
export async function DELETE(_req: Request, { params }: Ctx) {
  const removed = removeDevis(params.id);
  if (!removed) {
    return NextResponse.json({ error: "Devis introuvable." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
