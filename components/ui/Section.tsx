import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  children: ReactNode;
  id?: string;
  /** Eyebrow label, shown as a soft accent-tinted pill. */
  eyebrow?: string;
  /** Section title (supports <em> accent emphasis). */
  title?: ReactNode;
  /** Optional intro paragraph. */
  intro?: ReactNode;
  /** Accent hue for the eyebrow pill (defaults to brand blue). */
  accentColor?: string;
  className?: string;
  /** Center the header block. */
  center?: boolean;
  /**
   * Heading element for the title. Pass "h1" on the FIRST Section of a page
   * so every page owns exactly one h1 (screen-reader outline).
   */
  headingLevel?: "h1" | "h2";
}

/**
 * Page section wrapper. The eyebrow is a plain uppercase Archivo label in
 * the accent hue — no marker glyph.
 */
export function Section({
  children,
  id,
  eyebrow,
  title,
  intro,
  accentColor = "#D65C44",
  className = "",
  // Left-aligned by default across the site; the landing hero stays centered
  // via its own component, not this flag.
  center = false,
  headingLevel = "h2",
}: SectionProps) {
  const hasHeader = eyebrow || title || intro;
  const Heading = headingLevel;

  // Extra top padding below md only for the FIRST section of a page
  // (headingLevel="h1"): the fixed mobile menu bar (StaggeredMenu, md:hidden)
  // floats over the page instead of pushing it down like the desktop sticky
  // header does. Follow-up sections don't sit under the bar, so they keep a
  // normal rhythm — pt-28 on every section made mobile pages feel empty.
  const padding =
    headingLevel === "h1"
      ? "pb-16 pt-28 sm:pb-20 sm:pt-28 md:pb-24 md:pt-24"
      : "py-16 sm:py-20 md:py-24";

  return (
    <section id={id} className={`px-5 ${padding} ${className}`}>
      <div className="mx-auto w-full max-w-content">
        {hasHeader && (
          <Reveal
            className={`mb-10 md:mb-14 flex flex-col ${
              center ? "items-center text-center" : "items-start text-left"
            }`}
          >
            {eyebrow && (
              <span
                className="mb-5 inline-block font-sans text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                {eyebrow}
              </span>
            )}
            {title && (
              <Heading className="text-balance text-3xl font-bold leading-[1.12] text-cream sm:text-4xl md:text-[2.7rem]">
                {title}
              </Heading>
            )}
            {intro && (
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-cream/70">
                {intro}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
