"use client";

import { QUICK_H } from "@/lib/calculator/constants";
import { CalcInput } from "../CalcField";
import { calcLabel } from "../theme";

interface Props {
  height: number | null;
  onSelect: (h: number) => void;
}

/** Step 3 — height quick-pick chips + custom mm input. */
export function StepHeight({ height, onSelect }: Props) {
  const isQuick = height != null && (QUICK_H as readonly number[]).includes(height);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className={`${calcLabel} mb-4 block`}>Hauteurs courantes (mm)</span>
        <div className="flex flex-wrap gap-3">
          {QUICK_H.map((h) => {
            const selected = height === h;
            return (
              <button
                key={h}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(h)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
                  selected
                    ? "border-[#C9A227] bg-[#C9A22718] text-[#C9A227] shadow-[0_14px_36px_-18px_rgba(201,162,39,0.45)]"
                    : "border-[#C9A22733] text-[#E8D5A3cc] hover:border-[#C9A22799]"
                }`}
              >
                {h} mm
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-xs">
        <CalcInput
          id="custom-height"
          label="Hauteur personnalisée (mm)"
          type="number"
          min={1}
          inputMode="numeric"
          placeholder="Ex : 145"
          value={height != null && !isQuick ? String(height) : ""}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onSelect(Number.isFinite(v) ? v : 0);
          }}
          hint="Saisissez une valeur précise si aucune hauteur ci-dessus ne convient."
        />
      </div>
    </div>
  );
}
