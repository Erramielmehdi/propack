"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Signature element: a real rendered gift box measured by its own technical
 * drawing. Light theme: an ivory paper box with a sky-blue marquage band,
 * annotated with blue drawing strokes — cotes (Ø, H) and the exact surface
 * formula the calculator prices.
 */
export function TechnicalCylinder() {
  const reduce = useReducedMotion();

  const draw = (delay: number) =>
    reduce
      ? { initial: {}, animate: {} }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1, ease: "easeInOut" as const, delay },
        };

  const fade = (delay: number) =>
    reduce
      ? { initial: {}, animate: {} }
      : {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        };

  const blue = "#34789F";
  const blueLight = "#4E9BC8";
  const ink = "#253745";

  return (
    <svg
      viewBox="0 0 440 480"
      className="h-full w-full max-w-[440px]"
      role="img"
      aria-label="Boîte cylindrique ProPack annotée en dessin technique, avec cotes diamètre et hauteur"
    >
      <defs>
        {/* Ivory paper body with a soft key light. */}
        <linearGradient id="tc-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ded5c0" />
          <stop offset="0.3" stopColor="#f4eee0" />
          <stop offset="0.48" stopColor="#fdfaf3" />
          <stop offset="0.7" stopColor="#efe8d7" />
          <stop offset="1" stopColor="#d5cbb4" />
        </linearGradient>
        {/* Sky-blue marquage band. */}
        <linearGradient id="tc-band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2f6e96" />
          <stop offset="0.42" stopColor="#6cb2dc" />
          <stop offset="0.6" stopColor="#4193c9" />
          <stop offset="1" stopColor="#2a638a" />
        </linearGradient>
        {/* Lid top material. */}
        <radialGradient id="tc-lid" cx="0.38" cy="0.32" r="1.1">
          <stop offset="0" stopColor="#fdfaf3" />
          <stop offset="0.65" stopColor="#efe8d7" />
          <stop offset="1" stopColor="#dcd2bc" />
        </radialGradient>
        {/* Vertical key-light sheen. */}
        <linearGradient id="tc-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* faint construction guide */}
      <line x1="230" y1="40" x2="230" y2="440" stroke={blue} strokeWidth="0.75" strokeDasharray="3 5" opacity="0.3" />

      {/* ---- Material body (fades in before the drawing) ---- */}
      <motion.g {...fade(0.15)}>
        {/* ground shadow */}
        <ellipse cx="230" cy="372" rx="112" ry="18" fill="#253745" opacity="0.14" />
        {/* body */}
        <path d="M135 120 A95 26 0 0 0 325 120 L325 360 A95 26 0 0 1 135 360 Z" fill="url(#tc-body)" />
        {/* marquage band, curved with the cylinder */}
        <path d="M135 176 A95 26 0 0 0 325 176 L325 190 A95 26 0 0 1 135 190 Z" fill="url(#tc-band)" opacity="0.92" />
        {/* key light */}
        <rect x="188" y="121" width="66" height="238" fill="url(#tc-sheen)" />
        {/* lid side band */}
        <path d="M135 112 L135 120 A95 26 0 0 0 325 120 L325 112 A95 26 0 0 1 135 112 Z" fill="#d8cfb8" />
        {/* lid top */}
        <ellipse cx="230" cy="112" rx="95" ry="26" fill="url(#tc-lid)" />
      </motion.g>

      {/* brand marquage on the body */}
      <motion.text
        x="230"
        y="262"
        textAnchor="middle"
        fontFamily="var(--font-playfair), 'Playfair Display', serif"
        fontStyle="italic"
        fontSize="23"
        letterSpacing="1.5"
        fill={blue}
        {...fade(1.3)}
      >
        ProPack
      </motion.text>

      {/* ---- Technical drawing overlay ---- */}
      <motion.line x1="135" y1="120" x2="135" y2="360" stroke={blue} strokeWidth="1.6" {...draw(0.5)} />
      <motion.line x1="325" y1="120" x2="325" y2="360" stroke={blue} strokeWidth="1.6" {...draw(0.6)} />
      <motion.path d="M135 360 A95 26 0 0 0 325 360" fill="none" stroke={blue} strokeWidth="1.6" {...draw(0.7)} />
      <motion.path d="M135 360 A95 26 0 0 1 325 360" fill="none" stroke={blue} strokeWidth="1" strokeDasharray="4 5" opacity="0.5" {...draw(0.8)} />
      <motion.ellipse cx="230" cy="112" rx="95" ry="26" fill="none" stroke={blueLight} strokeWidth="1.8" {...draw(0.9)} />

      {/* diameter cote (Ø) */}
      <motion.g {...fade(1.7)}>
        <line x1="135" y1="72" x2="325" y2="72" stroke={blue} strokeWidth="1" />
        <path d="M135 72 l7 -4 v8 z" fill={blue} />
        <path d="M325 72 l-7 -4 v8 z" fill={blue} />
        <line x1="135" y1="72" x2="135" y2="110" stroke={blue} strokeWidth="0.6" opacity="0.5" />
        <line x1="325" y1="72" x2="325" y2="110" stroke={blue} strokeWidth="0.6" opacity="0.5" />
      </motion.g>
      <motion.text x="230" y="64" textAnchor="middle" className="font-mono" fontSize="14" fill={ink} {...fade(1.9)}>
        Ø 100 mm
      </motion.text>

      {/* height cote (H) */}
      <motion.g {...fade(2.0)}>
        <line x1="88" y1="120" x2="88" y2="360" stroke={blue} strokeWidth="1" />
        <path d="M88 120 l-4 7 h8 z" fill={blue} />
        <path d="M88 360 l-4 -7 h8 z" fill={blue} />
        <line x1="88" y1="120" x2="133" y2="120" stroke={blue} strokeWidth="0.6" opacity="0.5" />
        <line x1="88" y1="360" x2="133" y2="360" stroke={blue} strokeWidth="0.6" opacity="0.5" />
      </motion.g>
      <motion.text x="70" y="245" textAnchor="middle" className="font-mono" fontSize="14" fill={ink} transform="rotate(-90 70 245)" {...fade(2.2)}>
        H 130 mm
      </motion.text>

      {/* surface annotation */}
      <motion.g {...fade(2.4)}>
        <line x1="325" y1="240" x2="392" y2="210" stroke={blue} strokeWidth="0.75" opacity="0.6" />
        <circle cx="325" cy="240" r="2.5" fill={blueLight} />
        <text x="396" y="200" className="font-mono" fontSize="12.5" fill={ink}>
          S = π·D·H
        </text>
        <text x="396" y="220" className="font-mono" fontSize="11" fill={blue}>
          + 2·π·r²
        </text>
      </motion.g>
    </svg>
  );
}
