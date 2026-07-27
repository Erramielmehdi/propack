/**
 * MiniBox — a small rendered cylindrical gift box (SVG), tinted per product.
 * Replaces emoji icons so the catalogue reads as crafted product, not clipart.
 *
 * Gradient/clip ids are derived from the tint; duplicate definitions across
 * instances are identical, so first-match resolution is visually harmless.
 */
interface MiniBoxProps {
  /** Base material color (hex). */
  tint: string;
  /** Rendered width in px (height follows the 42:92 viewBox ratio). */
  size?: number;
  className?: string;
}

const BODY_PATH = "M14 16 A16 7 0 0 0 46 16 L46 82 A16 7 0 0 1 14 82 Z";

export function MiniBox({ tint, size = 48, className = "" }: MiniBoxProps) {
  const uid = `mb-${tint.replace("#", "")}`;

  return (
    <svg
      width={size}
      height={(size * 92) / 42}
      viewBox="9 0 42 92"
      aria-hidden="true"
      className={className}
    >
      <defs>
        {/* Cylindrical shading: dark edge → highlight → dark edge. */}
        <linearGradient id={`${uid}-s`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.35" />
          <stop offset="0.38" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>
        <clipPath id={`${uid}-c`}>
          <path d={BODY_PATH} />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="30" cy="87" rx="18" ry="5" fill="#241F1A" opacity="0.16" />

      {/* Body: flat tint + cylindrical shading overlay */}
      <path d={BODY_PATH} fill={tint} opacity="0.7" />
      <path d={BODY_PATH} fill={`url(#${uid}-s)`} />

      {/* Brass-gold band (marquage) clipped to the body */}
      <g clipPath={`url(#${uid}-c)`}>
        <path
          d="M14 47 A16 7 0 0 0 46 47 L46 53 A16 7 0 0 1 14 53 Z"
          fill="#D65C44"
          opacity="0.85"
        />
      </g>

      {/* Lid: slightly raised, brighter material */}
      <path
        d="M14 12 L14 16 A16 7 0 0 0 46 16 L46 12"
        fill={tint}
        opacity="0.75"
      />
      <ellipse cx="30" cy="12" rx="16" ry="7" fill={tint} opacity="0.95" />
      <ellipse
        cx="30"
        cy="12"
        rx="16"
        ry="7"
        fill="url(#mb-lid-sheen)"
      />
      <ellipse
        cx="30"
        cy="12"
        rx="16"
        ry="7"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.18"
        strokeWidth="0.8"
      />

      {/* Shared lid sheen definition (same for all tints) */}
      <defs>
        <radialGradient id="mb-lid-sheen" cx="0.35" cy="0.3" r="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </radialGradient>
      </defs>
    </svg>
  );
}
