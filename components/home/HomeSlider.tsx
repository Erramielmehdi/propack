"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GoldLink } from "@/components/ui/GoldButton";

/**
 * Fullscreen home hero slider: 3 visuals crossfading edge-to-edge under a
 * legibility scrim, with the headline and CTAs centered on top.
 *
 * Swap the images by replacing the files in `public/slides/` — same names,
 * no code change needed.
 */
const SLIDES = [
  {
    src: "/gallery/blanc-trio.jpg",
    alt: "Trio de boîtes cylindriques blanches ProPack sous une lumière d'atelier",
  },
  {
    src: "/gallery/blanc-duo.jpg",
    alt: "Duo de boîtes cylindriques blanches ProPack",
  },
];

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 40;

export function HomeSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const count = SLIDES.length;
  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance; paused on hover/focus and disabled for reduced motion.
  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduce, count]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) next();
    else prev();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };

  return (
    <section
      role="region"
      aria-roledescription="carrousel"
      aria-label="Présentation ProPack"
      className="relative h-[calc(100svh-4rem)] min-h-[540px] w-full overflow-hidden md:h-[calc(100svh-5rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      {/* Crossfading slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 ${
            reduce
              ? ""
              : "transition-opacity duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          } ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Legibility scrim (encre bleu nuit): vertical gradient + a radial
          focus behind the centered text so white type reads on bright photos. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#16303f]/60 via-[#16303f]/45 to-[#16303f]/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 50%, rgba(22,48,63,0.55), transparent 75%)",
        }}
      />

      {/* Centered headline + CTAs */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <motion.span
          {...rise(0)}
          className="mb-6 flex items-center gap-2.5 rounded-full border border-white/35 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
          <span className="font-mono text-[0.7rem] font-medium uppercase tracking-tech text-white/90">
            Fabricant marocain · Est. 2013
          </span>
        </motion.span>

        <motion.h1
          {...rise(0.06)}
          className="text-balance max-w-4xl text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl"
        >
          La boîte cylindrique,{" "}
          <em className="not-italic text-[#8CC4E4]">mesurée</em> au millimètre.
        </motion.h1>

        <motion.p
          {...rise(0.13)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85"
        >
          ProPack conçoit et fabrique des écrins cylindriques haut de gamme —
          imprimés, gaufrés, personnalisés à votre image.
        </motion.p>

        <motion.div {...rise(0.2)} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <GoldLink href="/contact" size="lg">
            Demander un devis
          </GoldLink>
          <GoldLink href="/calcule" size="lg" variant="ghostLight">
            Calculer mon prix
          </GoldLink>
        </motion.div>
      </div>

      {/* Prev / Next */}
      <button
        type="button"
        onClick={prev}
        aria-label="Visuel précédent"
        className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/30 active:scale-[0.95]"
      >
        ←
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Visuel suivant"
        className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/30 active:scale-[0.95]"
      >
        →
      </button>

      {/* Counter (dieline style) */}
      <span className="absolute right-5 top-5 z-10 rounded-full border border-white/30 bg-white/15 px-3 py-1 font-mono text-[0.65rem] tracking-tech text-white backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </span>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Aller au visuel ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              i === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
