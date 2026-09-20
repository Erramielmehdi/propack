"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { MiniBox } from "@/components/ui/MiniBox";
import { GoldLink, GoldButton } from "@/components/ui/GoldButton";
import { BOX_TYPES } from "@/lib/calculator/constants";
import type { BoxType } from "@/lib/calculator/types";
import { CUSTOM_QUOTE_TYPES, isCustomQuoteType } from "@/lib/catalog";
import { styleImageSrc, stylesFor, type BoxStyle } from "@/lib/gallery";

/** Product photo per box id — each already has its title and description set
 *  into the artwork, so the card renders the photo alone.
 *
 *  These point at pre-sized webp copies under /boxes/card and are rendered
 *  `unoptimized`: Next's image optimizer mixes up responses when this many
 *  uncached images are requested at once, and persists the wrong bytes to
 *  .next/cache/images, so cards render other cards' photos. */
const HERO_PHOTOS: Record<string, string> = {
  parfum: "parfum.webp",
  chocolat: "chocolat.webp",
  the: "the.webp",
  bijoux: "bijoux.webp",
  cosmetique: "cosmetique.webp",
  cadeau: "cadeau.webp",
  bougie: "bougie.webp",
  montre: "montre.webp",
  fleurs: "fleurs.webp",
  publicity: "publicity.webp",
  patisserie: "patisserie.webp",
  sushi: "sushi.webp",
  "fruits-secs": "fruits-secs.webp",
  dates: "dates.webp",
  "8-mars": "8-mars.webp",
  mariage: "mariage.webp",
  "sac-de-luxe": "sac-de-luxe.png",
  "boite-cylindrique-choix": "boite-cylindrique-choix.png",
};

/**
 * Catalogue — full-bleed grid of the 16 box types (illustrated MiniBox cards).
 *
 * Pressing a card opens a two-step lightbox:
 *  1. Gallery — the client browses photos of real cylindrical box styles.
 *  2. Detail — the style they liked, enlarged, with the "Configurer" CTA.
 */
export function BoxGrid() {
  const [selected, setSelected] = useState<BoxType | null>(null);
  const [style, setStyle] = useState<BoxStyle | null>(null);
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Hard reset of the modal state.
  const reset = useCallback(() => {
    setSelected(null);
    setStyle(null);
  }, []);

  // Close via history so the browser Back button and the ✕ stay in sync.
  const requestClose = useCallback(() => {
    if (typeof window !== "undefined" && window.history.state?.propackModal) {
      window.history.back(); // pops our entry → popstate → reset()
    } else {
      reset();
    }
  }, [reset]);

  // Back one level: step 2 (detail) → step 1 (gallery); step 1 → close.
  const goBack = useCallback(() => {
    if (style) setStyle(null);
    else requestClose();
  }, [style, requestClose]);

  // While the modal is open: register a history entry (so browser Back closes
  // it instead of leaving the page), handle Escape + Tab trapping, lock page
  // scroll, move focus into the dialog, and return it to the opener on close.
  useEffect(() => {
    if (!selected) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    window.history.pushState({ propackModal: true }, "");
    const onPop = () => reset();
    window.addEventListener("popstate", onPop);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      // Keep Tab inside the dialog — the page behind is covered but its
      // links/buttons would otherwise still receive focus.
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      openerRef.current?.focus();
    };
  }, [selected, reset, requestClose]);

  return (
    <section
      id="catalogue"
      className="w-full scroll-mt-24 px-5 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 md:pb-24 lg:px-10"
    >
      {/* Full-width card grid — each card is its product photo, which carries
          its own title and copy baked in. Uniform 3:2 to match the source art. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {[...BOX_TYPES, ...CUSTOM_QUOTE_TYPES].map((box, i) => (
          <Reveal key={box.id} delay={(i % 4) * 0.05}>
            <button
              type="button"
              onClick={() => setSelected(box)}
              className="surface group relative flex aspect-[3/2] w-full overflow-hidden text-left transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-gold active:scale-[0.99]"
            >
              <span
                className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
                style={{ backgroundColor: box.tint }}
                aria-hidden="true"
              />
              {HERO_PHOTOS[box.id] ? (
                <Image
                  src={`/boxes/card/${HERO_PHOTOS[box.id]}`}
                  alt={box.label}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                />
              ) : (
                /* No artwork yet — mirror the photos' layout (visual left,
                   title + copy right) so the card sits in the same rhythm. */
                <span className="flex w-full items-center gap-5 px-6 sm:px-8">
                  <MiniBox
                    tint={box.tint}
                    size={64}
                    className="shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:scale-105"
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-2">
                    <span className="font-display text-2xl font-bold leading-tight text-cream sm:text-3xl">
                      {box.label}
                    </span>
                    <span className="text-sm leading-snug text-cream/65">
                      {box.description}
                    </span>
                  </span>
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </div>

      {/* Two-step lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#241F1A]/60 backdrop-blur-sm"
            onClick={requestClose}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Boîte ${selected.label}`}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex h-full w-full flex-col overflow-hidden bg-noir-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header bar */}
              <div className="mx-auto flex w-full max-w-content items-center justify-between gap-3 border-b border-gold-border px-5 py-4 sm:px-6">
                <span className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5"
                    style={{ backgroundColor: selected.tint }}
                    aria-hidden="true"
                  />
                  <span className="font-display text-lg text-cream sm:text-2xl">
                    Boîte {selected.label}
                  </span>
                  <span className="hidden font-mono text-[0.65rem] uppercase tracking-tech text-cream/60 sm:inline">
                    {style ? "· votre sélection" : "· choisissez un style"}
                  </span>
                </span>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={requestClose}
                  aria-label="Fermer"
                  className="grid h-11 w-11 shrink-0 place-items-center bg-noir-800 text-cream transition-[transform,background-color] hover:bg-noir-700 active:scale-[0.97]"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="scroll-slim flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-content px-5 py-6 sm:px-6 sm:py-8">
                <AnimatePresence mode="wait">
                  {!style ? (
                    /* Step 1 — style gallery */
                    <motion.div
                      key="gallery"
                      initial={reduce ? undefined : { opacity: 0, x: -16 }}
                      animate={reduce ? undefined : { opacity: 1, x: 0 }}
                      exit={reduce ? undefined : { opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Back to the catalogue */}
                      <button
                        type="button"
                        onClick={goBack}
                        className="mb-6 inline-flex items-center gap-2 rounded-md bg-coral px-6 py-3 font-sans text-sm font-semibold text-cream shadow-[0_3px_12px_-3px_rgba(214,92,68,0.55)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-coral-dark active:translate-y-0 active:bg-coral-deep"
                      >
                        <span aria-hidden="true" className="text-base leading-none">←</span>
                        Retour au catalogue
                      </button>
                      <p className="mb-5 text-base text-cream/65">
                        Parcourez nos styles de boîtes cylindriques et cliquez
                        sur celui qui vous plaît.
                      </p>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {stylesFor(selected.id).map((s) => (
                          <button
                            key={s.key}
                            type="button"
                            onClick={() => setStyle(s)}
                            className="group/st relative aspect-[4/3] overflow-hidden border border-gold-border transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:border-gold hover:shadow-gold active:scale-[0.98]"
                          >
                            <Image
                              src={styleImageSrc(s)}
                              alt={s.label}
                              fill
                              unoptimized
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                              className="object-cover transition-transform duration-300 group-hover/st:scale-105"
                            />
                            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#241F1A]/85 to-transparent px-3 pb-2 pt-8 text-left">
                              <span className="text-xs font-medium leading-tight text-white">
                                {s.label}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    /* Step 2 — chosen model: buttons on one line, framed square photo */
                    <motion.div
                      key="detail"
                      initial={reduce ? undefined : { opacity: 0, x: 16 }}
                      animate={reduce ? undefined : { opacity: 1, x: 0 }}
                      exit={reduce ? undefined : { opacity: 0, x: 16 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Retour on the left, Calculer on the right, above the photo */}
                      <div className="mx-auto flex max-w-md items-center justify-between gap-4">
                        <GoldButton variant="ghost" onClick={() => setStyle(null)}>
                          ← Retour
                        </GoldButton>
                        <GoldLink
                          href={
                            isCustomQuoteType(selected.id)
                              ? `/configurer?type=${selected.id}&style=${style.key}`
                              : `/calcule?type=${selected.id}`
                          }
                        >
                          {isCustomQuoteType(selected.id)
                            ? "Demander un devis →"
                            : "Calculer mon prix →"}
                        </GoldLink>
                      </div>

                      {/* Title above the photo, enlarged */}
                      <div className="mx-auto mt-6 max-w-md text-center">
                        <h3 className="font-display text-2xl font-bold leading-tight text-cream sm:text-3xl">
                          Coffre rond de lux
                        </h3>
                      </div>

                      {/* Clean presentation frame for the selected product. */}
                      <figure className="relative mx-auto mt-6 w-full max-w-2xl overflow-hidden border border-gold-border bg-cream p-3 shadow-card sm:p-5">
                        <div
                          className="relative border border-gold-border bg-white p-2 shadow-card sm:p-3"
                        >
                          <div
                            className="border border-gold-border bg-cream p-2"
                          >
                            <div
                              className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white"
                            >
                              <Image
                                src={styleImageSrc(style)}
                                alt={style.label}
                                fill
                                unoptimized
                                sizes="(max-width: 640px) 90vw, 448px"
                                className="object-cover"
                                priority
                              />
                            </div>
                          </div>
                        </div>
                      </figure>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
