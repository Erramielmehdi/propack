"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { GoldLink } from "@/components/ui/GoldButton";
import { QTY_OPT, QTY_DISC, TIER_COLORS, TIER_LABELS } from "@/lib/calculator/constants";
import { calc, getDiamTier } from "@/lib/calculator/price";
import { fmt2, fmtDH, fmtInt, fmtPct } from "@/lib/format";
import { accentAt } from "@/lib/palette";

/**
 * Live price teaser: two sliders + quantity chips driving the real pricing
 * formula. Funnels into /calcule with the chosen values prefilled.
 */
export function LiveEstimator() {
  const [diameter, setDiameter] = useState(100);
  const [height, setHeight] = useState(130);
  const [quantity, setQuantity] = useState(250);

  const result = useMemo(
    () => calc({ diameter, height, quantity, selectedExtras: [] }),
    [diameter, height, quantity],
  );
  const tier = getDiamTier(diameter);

  return (
    <Section
      eyebrow="Estimation en direct"
      accentColor={accentAt(2).hex}
      title={<>Votre prix, <em>en temps réel</em></>}
      intro="Faites glisser les curseurs : la formule exacte de notre calculateur s'applique instantanément, remise volume comprise."
    >
      <div className="surface mx-auto grid max-w-4xl gap-0 overflow-hidden shadow-card lg:grid-cols-[1.1fr_0.9fr]">
        {/* Controls */}
        <div className="flex flex-col gap-8 p-6 sm:p-8">
          {/* Diameter */}
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <label htmlFor="est-d" className="label-track">
                Diamètre
              </label>
              <span className="tech flex items-center gap-2 text-lg text-cream">
                <span
                  className="h-2 w-2"
                  style={{ background: TIER_COLORS[tier] }}
                  title={TIER_LABELS[tier]}
                  aria-hidden="true"
                />
                Ø {diameter} mm
              </span>
            </div>
            <input
              id="est-d"
              type="range"
              min={40}
              max={350}
              step={5}
              value={diameter}
              onChange={(e) => setDiameter(Number(e.target.value))}
              className="w-full accent-gold"
              aria-valuetext={`${diameter} millimètres`}
            />
            <div className="mt-1 flex justify-between font-mono text-[0.6rem] text-cream/70">
              <span>40</span>
              <span>350 mm</span>
            </div>
          </div>

          {/* Height */}
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <label htmlFor="est-h" className="label-track">
                Hauteur
              </label>
              <span className="tech text-lg text-cream">H {height} mm</span>
            </div>
            <input
              id="est-h"
              type="range"
              min={30}
              max={200}
              step={5}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-gold"
              aria-valuetext={`${height} millimètres`}
            />
            <div className="mt-1 flex justify-between font-mono text-[0.6rem] text-cream/70">
              <span>30</span>
              <span>200 mm</span>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <span className="label-track mb-3 block">Quantité</span>
            <div className="flex flex-wrap gap-2.5">
              {QTY_OPT.map((q) => {
                const selected = quantity === q;
                const disc = QTY_DISC[q] ?? 0;
                return (
                  <button
                    key={q}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setQuantity(q)}
                    className={`min-h-[44px] border px-4 py-2 font-mono text-xs transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
                      selected
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-gold-border text-cream/70 hover:border-gold/50"
                    }`}
                  >
                    {q === 5000 ? "5 000+" : fmtInt(q)}
                    {disc > 0 && (
                      <span className="ml-1.5 text-[0.65rem] text-gold/70">
                        −{fmtPct(disc)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price panel */}
        <div className="flex flex-col justify-between gap-6 border-t border-gold-border bg-gold/[0.04] p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div>
            <p className="label-track mb-1">Prix unitaire net</p>
            <p className="font-display text-5xl font-bold text-gold-light">
              {fmtDH(result.unitDisc)}
            </p>
            <dl className="mt-6 space-y-2.5 border-t border-gold-border pt-5">
              <div className="flex justify-between text-sm">
                <dt className="text-cream/60">Surface totale</dt>
                <dd className="tech text-cream/85">{fmt2(result.totalArea)} cm²</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-cream/60">Remise volume</dt>
                <dd className="tech text-cream/85">
                  {result.disc > 0 ? `− ${fmtPct(result.disc)}` : "0 %"}
                </dd>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <dt className="text-cream">Total ({fmtInt(quantity)} pcs)</dt>
                <dd className="tech text-gold-light">{fmtDH(result.total)}</dd>
              </div>
            </dl>
          </div>
          <div>
            <GoldLink
              href={`/calcule?d=${diameter}&h=${height}&q=${quantity}`}
              block
            >
              Affiner dans le calculateur
            </GoldLink>
            <p className="mt-3 text-center text-xs text-cream/65">
              Ajoutez type de boîte, finitions et notes à l'étape suivante.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
