import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { getDevis, removeDevis, updateDevis } from "@/lib/store";

interface Ctx {
  params: { id: string };
}

const STATUSES = ["nouveau", "en cours", "accepté", "refusé"] as const;

export const dynamic = "force-dynamic";

async function unauthorized() {
  return !(await getAdminUser());
}

/** GET /api/devis/:id - fetch one quote for an authenticated admin. */
export async function GET(_req: Request, { params }: Ctx) {
  if (await unauthorized()) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const devis = await getDevis(params.id);
    if (!devis) {
      return NextResponse.json({ error: "Devis introuvable." }, { status: 404 });
    }
    return NextResponse.json({ devis });
  } catch {
    return NextResponse.json({ error: "Erreur de base de données." }, { status: 503 });
  }
}

/** PUT /api/devis/:id - update the quote status as an authenticated admin. */
export async function PUT(req: Request, { params }: Ctx) {
  if (await unauthorized()) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const status = (body as { status?: unknown })?.status;
  if (typeof status !== "string" || !STATUSES.includes(status as (typeof STATUSES)[number])) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 422 });
  }

  try {
    const devis = await updateDevis(params.id, { status });
    if (!devis) {
      return NextResponse.json({ error: "Devis introuvable." }, { status: 404 });
    }
    return NextResponse.json({ devis });
  } catch {
    return NextResponse.json({ error: "Erreur de base de données." }, { status: 503 });
  }
}

/** DELETE /api/devis/:id - remove a quote as an authenticated admin. */
export async function DELETE(_req: Request, { params }: Ctx) {
  if (await unauthorized()) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    if (!(await removeDevis(params.id))) {
      return NextResponse.json({ error: "Devis introuvable." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur de base de données." }, { status: 503 });
  }
}
