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
        <div className="scroll-slim grid max-h-[220px] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-5">
          {QUICK_H.map((h) => {
            const selected = height === h;
            return (
              <button
                key={h}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(h)}
                className={`rounded-md border px-3 py-2.5 text-sm font-semibold transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D65C44]/30 focus-visible:ring-offset-2 active:scale-[0.97] ${
                  selected
                    ? "border-[#D65C44] bg-[#FFF1ED] text-[#B5432E] shadow-[0_10px_24px_-18px_rgba(214,92,68,0.7)]"
                    : "border-[#241F1A24] bg-white text-[#403832] hover:border-[#241F1A55]"
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
