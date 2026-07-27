"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GoldLink } from "@/components/ui/GoldButton";
import { accentAt } from "@/lib/palette";
import { TechnicalCylinder } from "./TechnicalCylinder";

/** Home hero: the technical-drawing thesis + headline + dual CTAs. */
export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-14 sm:pt-20 md:pb-24">
      {/* blueprint backdrop */}
      <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-[380px] w-[560px] rounded-full bg-gold/10 blur-[130px]"
      />

      <div className="mx-auto grid max-w-content items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: thesis */}
        <div className="flex flex-col items-start text-left">
          <motion.span
            {...rise(0)}
            className="mb-6 flex items-center gap-2.5 rounded-full border border-gold-border px-3.5 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-light" aria-hidden="true" />
            <span className="label-track">Fabricant marocain · Est. 2013</span>
          </motion.span>

          <motion.h1
            {...rise(0.06)}
            className="text-balance text-4xl font-bold leading-[1.06] text-cream sm:text-5xl md:text-[3.4rem]"
          >
            La boîte cylindrique,<br />
            <em>mesurée</em> au millimètre.
          </motion.h1>

          <motion.p
            {...rise(0.13)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70"
          >
            ProPack conçoit et fabrique des écrins cylindriques haut de gamme —
            imprimés, gaufrés, dorés à votre image. Du gabarit au dernier vernis,
            chaque cote est pensée pour votre produit.
          </motion.p>

          <motion.div {...rise(0.2)} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <GoldLink href="/contact" size="lg">
              Demander un devis
            </GoldLink>
            <GoldLink href="/calcule" size="lg" variant="ghost">
              Calculer mon prix
            </GoldLink>
          </motion.div>

          {/* spec strip */}
          <motion.dl
            {...rise(0.28)}
            className="mt-12 grid w-full max-w-lg grid-cols-3 gap-px overflow-hidden rounded-lg border border-gold-border bg-gold-border"
          >
            {[
              { k: "Ø", v: "40–350", u: "mm", c: accentAt(0).hex },
              { k: "MOQ", v: "100", u: "pièces", c: accentAt(2).hex },
              { k: "Proto", v: "48", u: "heures", c: accentAt(1).hex },
            ].map((s) => (
              <div key={s.k} className="bg-white/60 px-4 py-3">
                <dt
                  className="font-mono text-[0.65rem] uppercase tracking-tech"
                  style={{ color: s.c }}
                >
                  {s.k}
                </dt>
                <dd className="mt-1 font-display text-2xl text-cream">
                  {s.v}
                  <span className="ml-1 font-mono text-[0.6rem] uppercase tracking-tech text-cream/40">
                    {s.u}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right: signature technical drawing */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center"
        >
          <div className="absolute inset-6 rounded-full border border-gold-border" aria-hidden="true" />
          <TechnicalCylinder />
        </motion.div>
      </div>
    </section>
  );
}
