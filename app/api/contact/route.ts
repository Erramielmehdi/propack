import { NextResponse } from "next/server";

/**
 * POST /api/contact — receive a contact/quote request.
 *
 * Stub: validates and echoes back. In production, wire this to an email
 * service (e.g. Resend/SMTP) and/or persist the lead.
 */

interface ContactBody {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  boxType?: string;
  quantity?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  if (!body.name?.trim()) errors.name = "Le nom est requis.";
  if (!body.email?.trim()) errors.email = "L'e-mail est requis.";
  else if (!EMAIL_RE.test(body.email)) errors.email = "E-mail invalide.";
  if (!body.message?.trim()) errors.message = "Le message est requis.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation échouée.", errors }, { status: 422 });
  }

  // TODO: integrate email delivery / CRM here.
  return NextResponse.json(
    { ok: true, message: "Votre demande a bien été reçue." },
    { status: 200 },
  );
}
