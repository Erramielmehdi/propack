"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

interface CtaLink {
  text: string;
  href: string;
}

interface ResponsiveHeroBannerProps {
  /** Single background image (fallback when `backgroundImages` is empty). */
  backgroundImageUrl?: string;
  /** Rotating background images — crossfade through them on a timer. */
  backgroundImages?: string[];
  /** Small pill above the title, e.g. "Nouveau". */
  badgeLabel?: string;
  badgeText?: string;
  title: ReactNode;
  titleLine2?: ReactNode;
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  /** Overlay classes for the background image (light scrim, not black). */
  overlayClassName?: string;
  className?: string;
}

const ROTATE_MS = 4000;

/**
 * Full-bleed photo hero with a light scrim, badge, two-line title and dual CTA.
 * Backgrounds can rotate: pass `backgroundImages` and they crossfade on a
 * timer (disabled under prefers-reduced-motion). No embedded nav/logo — the
 * site's global Header (desktop) and StaggeredMenu (mobile) already cover
 * navigation, so duplicating it here would show two menus at once.
 */
export function ResponsiveHeroBanner({
  backgroundImageUrl = "/gallery/blanc-trio.jpg",
  backgroundImages,
  badgeLabel,
  badgeText,
  title,
  titleLine2,
  description,
  primaryCta,
  secondaryCta,
  overlayClassName = "bg-gradient-to-r from-white/92 via-white/70 to-white/30",
  className = "",
}: ResponsiveHeroBannerProps) {
  const reduce = useReducedMotion();
  const images =
    backgroundImages && backgroundImages.length > 0
      ? backgroundImages
      : [backgroundImageUrl];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (reduce || paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [reduce, paused, count]);

  return (
    <section
      className={`relative flex h-[100svh] min-h-[560px] w-full flex-col items-start justify-center overflow-hidden bg-noir md:h-[calc(100svh-5rem)] ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Rotating background layer */}
      {images.map((src, i) => (
        <div
          key={src}
          aria-hidden="true"
          className={`absolute inset-0 z-0 ${
            reduce
              ? ""
              : "transition-opacity duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          } ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            quality={95}
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      <div className={`absolute inset-0 z-0 ${overlayClassName}`} />

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-start justify-center px-6 text-left md:px-12">
        {badgeLabel && badgeText && (
          <div className="animate-fade-slide-in-1 mb-6 inline-flex items-center gap-2.5 rounded-md border border-gold-border bg-white/70 px-3.5 py-2 backdrop-blur-sm">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream">
              {badgeLabel}
            </span>
            <span className="font-sans text-xs uppercase tracking-[0.18em] text-kraft">
              {badgeText}
            </span>
          </div>
        )}

        <h1 className="animate-fade-slide-in-2 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.06] tracking-tight text-cream sm:text-5xl md:text-6xl lg:text-[4.2rem]">
          {title}
          {titleLine2 && (
            <>
              <br />
              {titleLine2}
            </>
          )}
        </h1>

        <p className="animate-fade-slide-in-3 mt-6 max-w-2xl text-pretty text-lg leading-8 text-cream/70">
          {description}
        </p>

        {/* Both CTAs share identical dimensions: same padding, both carry a
            2px border (transparent-look on the solid one), full width when
            stacked on mobile, equal min-width side by side on desktop. */}
        <div className="animate-fade-slide-in-4 mt-10 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-coral bg-coral px-8 py-4 font-sans text-[15px] font-semibold text-cream shadow-[0_4px_16px_-4px_rgba(214,92,68,0.6)] transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-coral-dark hover:bg-coral-dark active:translate-y-0 active:bg-coral-deep sm:min-w-[220px]"
          >
            {primaryCta.text}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-coral bg-white/60 px-8 py-4 font-sans text-[15px] font-semibold text-coral-deep backdrop-blur-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0 sm:min-w-[220px]"
            >
              {secondaryCta.text}
            </Link>
          )}
        </div>
      </div>

      {/* Slide controls — arrows + dots to switch backgrounds manually. */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Visuel précédent"
            className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-coral text-cream shadow-md transition-[transform,background-color] duration-150 hover:bg-coral-dark active:scale-95 sm:left-5 sm:h-12 sm:w-12"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ←
            </span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Visuel suivant"
            className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-coral text-cream shadow-md transition-[transform,background-color] duration-150 hover:bg-coral-dark active:scale-95 sm:right-5 sm:h-12 sm:w-12"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              →
            </span>
          </button>

          <div className="absolute inset-x-0 bottom-6 z-20 flex flex-wrap items-center justify-center gap-2 px-4">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Aller au visuel ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-coral"
                    : "w-2 bg-cream/30 hover:bg-cream/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
