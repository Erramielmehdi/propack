import type { BoxType, CalcResult, ClientInfo, Extra } from "@/lib/calculator/types";
import { fmt2, fmtDH, fmtInt, fmtPct } from "@/lib/format";

/**
 * Build the formatted WhatsApp message string for a quote.
 * Newlines are encoded by the caller via encodeURIComponent.
 */
export function buildWaMessage(args: {
  boxType: BoxType | null;
  client: ClientInfo;
  diameter: number;
  height: number;
  quantity: number;
  extras: Extra[];
  notes: string;
  result: CalcResult;
}): string {
  const { boxType, client, diameter, height, quantity, extras, notes, result } =
    args;

  const lines: string[] = [];
  lines.push("*ProPack — Demande de devis*");
  lines.push("");
  lines.push(`📦 Type : ${boxType?.label ?? "—"}`);
  lines.push(`📐 Diamètre : ${diameter} mm`);
  lines.push(`📏 Hauteur : ${height} mm`);
  lines.push(`🔢 Quantité : ${fmtInt(quantity)} pièces`);

  if (extras.length) {
    lines.push(
      `✨ Options : ${extras.map((e) => e.label).join(", ")}`,
    );
  }

  lines.push("");
  lines.push(`Surface totale : ${fmt2(result.totalArea)} cm²`);
  lines.push(`Prix unitaire brut : ${fmtDH(result.unitPrice)}`);
  if (result.disc > 0) {
    lines.push(`Remise : ${fmtPct(result.disc)}`);
  }
  lines.push(`Prix unitaire net : ${fmtDH(result.unitDisc)}`);
  lines.push(`*Total : ${fmtDH(result.total)}*`);

  if (client.name) {
    lines.push("");
    lines.push(`Client : ${client.name}`);
    if (client.phone) lines.push(`Tél : ${client.phone}`);
    if (client.email) lines.push(`E-mail : ${client.email}`);
  }

  if (notes.trim()) {
    lines.push("");
    lines.push(`Notes : ${notes.trim()}`);
  }

  return lines.join("\n");
}
