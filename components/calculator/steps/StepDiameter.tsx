"use client";

import { DIAMS, TIER_COLORS, TIER_LABELS } from "@/lib/calculator/constants";
import { getDiamRate, getDiamTier } from "@/lib/calculator/price";
import { fmt2 } from "@/lib/format";
import { calcLabel, calcOption } from "../theme";

interface Props {
  diameter: number | null;
  onSelect: (d: number) => void;
}

/** Step 2 — diameter picker with tier-colored borders. */
export function StepDiameter({ diameter, onSelect }: Props) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-4">
        <span className={calcLabel}>Sélectionnez un diamètre (mm)</span>
        <div className="flex flex-wrap gap-3 text-xs text-[#756A63]">
          {(["s", "m", "l"] as const).map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: TIER_COLORS[t] }}
              />
              {TIER_LABELS[t]}
            </span>
          ))}
        </div>
      </div>

      {diameter != null && !(DIAMS as readonly number[]).includes(diameter) && (
        <p className="mb-4 rounded-md border border-[#D65C4433] bg-[#FFF5F2] px-4 py-2.5 font-mono text-xs text-[#B5432E]">
          Sélection actuelle : Ø {diameter} mm (personnalisé) — choisissez un
          diamètre standard ci-dessous pour la remplacer.
        </p>
      )}

      <div className="scroll-slim grid max-h-[420px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
        {DIAMS.map((d) => {
          const tier = getDiamTier(d);
          const selected = diameter === d;
          return (
            <button
              key={d}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(d)}
              style={{ borderLeftColor: TIER_COLORS[tier] }}
              className={`flex items-center justify-between border-l-4 px-4 py-4 text-left ${calcOption(selected)}`}
            >
              <span>
                <span className="block font-display text-xl font-semibold text-[#241F1A]">
                  {d} <span className="font-sans text-xs font-normal text-[#756A63]">mm</span>
                </span>
                <span className="text-xs text-[#756A63]">
                  Taux {fmt2(getDiamRate(d))} DH/cm²
                </span>
              </span>
              {selected && <span className="font-semibold text-[#D65C44]">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
