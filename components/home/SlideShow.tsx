"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Showcase carousel of the promotional slides in public/slides (1–15.jpg).
 * The banners already carry their own logo/copy, so this is a chromeless
 * image slider — crossfade, autoplay (paused on hover / disabled for reduced
 * motion), prev-next, swipe, and a dieline-style counter. Displayed at the
 * banners' native ~3:1 ratio so nothing is cropped.
 */
const SLIDE_COUNT = 15;
const SLIDES = Array.from({ length: SLIDE_COUNT }, (_, i) => `/slides/${i + 1}.jpg`);
const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 40;

export function SlideShow() {
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

  // pt-24 on phones clears the fixed StaggeredMenu bar (logo + burger), which
  // overlays the page; on md+ the header is in-flow so pt-8 is enough.
  return (
    <section className="px-5 pb-8 pt-24 sm:pb-10 md:pt-8">
      <div className="mx-auto w-full max-w-content">
        <div
          role="region"
          aria-roledescription="carrousel"
          aria-label="Réalisations ProPack"
          className="relative overflow-hidden rounded-md border border-gold-border bg-noir-800 shadow-card"
          style={{ aspectRatio: "740 / 244" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {SLIDES.map((src, i) => (
            <div
              key={src}
              aria-hidden={i !== index}
              className={`absolute inset-0 ${
                reduce
                  ? ""
                  : "transition-opacity duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              } ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={src}
                alt={`Réalisation ProPack ${i + 1}`}
                fill
                sizes="(min-width: 1240px) 1200px, 100vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Prev / Next */}
          <button
            type="button"
            onClick={prev}
            aria-label="Visuel précédent"
            className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-coral text-cream shadow-md transition-[transform,background-color] duration-150 hover:bg-coral-dark active:scale-95 sm:h-11 sm:w-11"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Visuel suivant"
            className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-coral text-cream shadow-md transition-[transform,background-color] duration-150 hover:bg-coral-dark active:scale-95 sm:h-11 sm:w-11"
          >
            <span aria-hidden="true">→</span>
          </button>

          {/* Counter */}
          <span className="absolute right-3 top-3 z-10 rounded-md bg-cream/85 px-2.5 py-1 font-mono text-[0.65rem] tracking-tech text-noir backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>

        {/* Dots */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {SLIDES.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Aller au visuel ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-coral" : "w-2 bg-cream/25 hover:bg-cream/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
