"use client";

import { useState } from "react";
import { EXTRAS, QTY_OPT, QTY_DISC } from "@/lib/calculator/constants";
import { getDiscount } from "@/lib/calculator/price";
import { fmtInt, fmtPct, fmtDH } from "@/lib/format";
import { CalcInput, CalcTextarea } from "../CalcField";
import { calcLabel, calcOption } from "../theme";

interface Props {
  quantity: number | null;
  onQuantity: (q: number) => void;
  extraKeys: string[];
  onToggleExtra: (key: string) => void;
  notes: string;
  onNotes: (v: string) => void;
}

/** Step 4 — quantity presets/custom + finishing options + notes. */
export function StepQuantity({
  quantity,
  onQuantity,
  extraKeys,
  onToggleExtra,
  notes,
  onNotes,
}: Props) {
  const isPreset =
    quantity != null && (QTY_OPT as readonly number[]).includes(quantity);
  const [custom, setCustom] = useState(quantity != null && !isPreset);

  return (
    <div className="flex flex-col gap-10">
      {/* Quantity */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className={calcLabel}>Quantité</span>
          <button
            type="button"
            onClick={() => setCustom((v) => !v)}
            className="font-mono text-[0.68rem] font-semibold uppercase tracking-tech text-[#D65C44] transition-colors hover:text-[#B5432E]"
          >
            {custom ? "Choisir un palier" : "Quantité personnalisée"}
          </button>
        </div>

        {!custom ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {QTY_OPT.map((q) => {
              const selected = quantity === q;
              const disc = QTY_DISC[q] ?? 0;
              return (
                <button
                  key={q}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onQuantity(q)}
                  className={`flex flex-col items-center gap-1 px-4 py-5 ${calcOption(selected)}`}
                >
                  <span className="font-display text-2xl font-semibold text-[#241F1A]">
                    {q === 5000 ? "5 000+" : fmtInt(q)}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      disc > 0 ? "text-[#D65C44]" : "text-[#756A63]"
                    }`}
                  >
                    {disc > 0 ? `−${fmtPct(disc)}` : "Prix plein"}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="max-w-xs">
            <CalcInput
              id="custom-qty"
              label="Quantité personnalisée"
              type="number"
              min={1}
              inputMode="numeric"
              placeholder="Ex : 750"
              value={quantity != null && !isPreset ? String(quantity) : ""}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                onQuantity(Number.isFinite(v) ? v : 0);
              }}
              hint={
                quantity && quantity > 0
                  ? `Remise appliquée : ${fmtPct(getDiscount(quantity))}`
                  : "La remise volume s'applique automatiquement."
              }
            />
          </div>
        )}
      </div>

      {/* Extras */}
      <fieldset>
        <legend className={`${calcLabel} mb-4`}>Options supplémentaires</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {EXTRAS.map((extra) => {
            const checked = extraKeys.includes(extra.key);
            return (
              <label
                key={extra.key}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#D65C44]/30 focus-within:ring-offset-2 ${calcOption(checked)}`}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`grid h-5 w-5 place-items-center rounded border text-xs ${
                      checked
                        ? "border-[#D65C44] bg-[#D65C44] text-white"
                        : "border-[#241F1A3D] bg-white text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span className="text-sm font-medium text-[#241F1A]">{extra.label}</span>
                </span>
                <span className="text-sm font-semibold text-[#D65C44]">
                  +{fmtDH(extra.price)}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => onToggleExtra(extra.key)}
                />
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Notes */}
      <div className="max-w-2xl">
        <CalcTextarea
          id="notes"
          label="Notes / précisions (optionnel)"
          placeholder="Couleurs, logo, contraintes particulières…"
          value={notes}
          onChange={(e) => onNotes(e.target.value)}
        />
      </div>
    </div>
  );
}
