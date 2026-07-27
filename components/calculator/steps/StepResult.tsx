"use client";

import type { CalcResult, Extra } from "@/lib/calculator/types";
import { fmt2, fmtDH, fmtInt, fmtPct } from "@/lib/format";
import { calcLabel } from "../theme";

interface Props {
  result: CalcResult;
  diameter: number;
  height: number;
  quantity: number;
  extras: Extra[];
}

interface Row {
  label: string;
  value: string;
  strong?: boolean;
  accent?: boolean;
}

/** Step 5 — unit price hero + breakdown + grand total. */
export function StepResult({ result, diameter, height, quantity, extras }: Props) {
  const rows: Row[] = [
    { label: `Surface latérale (π × D × H)`, value: `${fmt2(result.bodyArea)} cm²` },
    { label: `Couvercle + fond (2 × π × r²)`, value: `${fmt2(result.lidArea)} cm²` },
    { label: "Surface totale", value: `${fmt2(result.totalArea)} cm²`, strong: true },
    { label: `Taux diamètre (${diameter} mm)`, value: `${fmt2(result.dRate)} DH/cm²` },
    { label: "Coût des options", value: fmtDH(result.extraCost) },
    { label: "Prix unitaire brut", value: fmtDH(result.unitPrice), strong: true },
    {
      label: "Remise volume",
      value: result.disc > 0 ? `− ${fmtPct(result.disc)}` : "—",
      accent: result.disc > 0,
    },
    { label: "Prix unitaire net", value: fmtDH(result.unitDisc), strong: true, accent: true },
    { label: "Quantité", value: `× ${fmtInt(quantity)}` },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Unit price hero */}
      <div className="rounded-2xl border border-[#C9A22733] bg-white/[0.02] p-8 text-center">
        <p className={`${calcLabel} mb-2`}>Prix unitaire net</p>
        <p className="font-display text-5xl font-bold text-[#E8C547] sm:text-6xl">
          {fmtDH(result.unitDisc)}
        </p>
        <p className="mt-3 text-sm text-[#C9A22799]">
          Boîte Ø {diameter} mm × {height} mm
          {extras.length > 0 && <> · {extras.map((e) => e.label).join(", ")}</>}
        </p>
      </div>

      {/* Breakdown */}
      <div className="overflow-hidden rounded-2xl border border-[#C9A22733] bg-white/[0.02]">
        <h3 className={`${calcLabel} border-b border-[#C9A22733] px-6 py-4`}>
          Détail du calcul
        </h3>
        <dl>
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 border-b border-[#C9A22722] px-6 py-3.5 last:border-0"
            >
              <dt
                className={`text-sm ${
                  row.strong ? "font-semibold text-[#E8D5A3]" : "text-[#C9A22799]"
                }`}
              >
                {row.label}
              </dt>
              <dd
                className={`font-mono tabular-nums text-sm ${
                  row.accent
                    ? "font-semibold text-[#E8C547]"
                    : row.strong
                      ? "font-semibold text-[#E8D5A3]"
                      : "text-[#E8D5A3cc]"
                }`}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Grand total */}
      <div className="clip-angled bg-[linear-gradient(135deg,#C9A227_0%,#E8C547_50%,#C9A227_100%)] px-8 py-7 text-[#0A0A0A] shadow-[0_14px_36px_-16px_rgba(201,162,39,0.55)]">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <span className="font-mono text-sm font-medium uppercase tracking-tech">
            Total estimé
          </span>
          <span className="font-display text-4xl font-bold sm:text-5xl">
            {fmtDH(result.total)}
          </span>
        </div>
      </div>

      <p className="text-center text-xs text-[#C9A22799]">
        Estimation indicative hors taxes. Un devis ferme vous sera confirmé après
        étude de votre projet.
      </p>
    </div>
  );
}
