"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CardModal } from "@/components/ui/CardModal";
import { VALUE_PROPS } from "@/lib/content";
import { accentAt } from "@/lib/palette";

/** Four brand value propositions, each carrying its own accent hue. Pressing
 *  a card opens an enlarged pop-up so its content is easy to read. */
export function ValueProps() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx === null ? null : VALUE_PROPS[openIdx];
  const activeAccent = openIdx === null ? null : accentAt(openIdx);

  return (
    <Section
      eyebrow="Pourquoi ProPack"
      accentColor={accentAt(1).hex}
      title={<>Un savoir-faire au service de <em>votre marque</em></>}
      intro="L'exigence artisanale et la rigueur industrielle, réunies pour des emballages qui font la différence."
    >
      <div className="grid gap-px overflow-hidden border border-gold-border bg-gold-border sm:grid-cols-2 lg:grid-cols-4">
        {VALUE_PROPS.map((prop, i) => {
          const accent = accentAt(i);
          return (
            <Reveal key={prop.title} delay={i * 0.08} className="h-full">
              <div
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`Agrandir : ${prop.title}`}
                onClick={() => setOpenIdx(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIdx(i);
                  }
                }}
                className="group relative flex h-full cursor-pointer flex-col bg-noir-800 p-6 outline-none transition-colors duration-300 hover:bg-noir-700 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/70"
                style={{ ["--accent" as string]: accent.hex }}
              >
                {/* top accent bar, revealed on hover */}
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
                  style={{ backgroundColor: accent.hex }}
                  aria-hidden="true"
                />
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center text-lg"
                    style={{
                      color: accent.hex,
                      backgroundColor: accent.soft,
                      border: `1px solid ${accent.hex}44`,
                    }}
                  >
                    {prop.icon}
                  </span>
                  <span
                    className="font-mono text-[0.7rem] tracking-tech"
                    style={{ color: accent.hex }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-xl text-cream">{prop.title}</h3>
                <p className="text-sm leading-relaxed text-cream/70">{prop.text}</p>
                <span
                  className="mt-4 font-mono text-[0.62rem] uppercase tracking-tech opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ color: accent.hex }}
                  aria-hidden="true"
                >
                  Agrandir →
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Enlarged pop-up for the selected value prop. */}
      <CardModal
        open={openIdx !== null}
        onClose={() => setOpenIdx(null)}
        label={active?.title}
      >
        {active && activeAccent && (
          <div className="text-center">
            <span
              className="mx-auto mb-5 grid h-16 w-16 place-items-center text-3xl"
              style={{
                color: activeAccent.hex,
                backgroundColor: activeAccent.soft,
                border: `1px solid ${activeAccent.hex}44`,
              }}
              aria-hidden="true"
            >
              {active.icon}
            </span>
            <h3 className="font-display text-cream">{active.title}</h3>
            <p className="mt-3 text-cream/75">{active.text}</p>
          </div>
        )}
      </CardModal>
    </Section>
  );
}
