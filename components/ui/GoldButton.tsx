import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "ghost" | "ghostLight";
type Size = "md" | "lg";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Full-width block button. */
  block?: boolean;
}

// Flat editorial buttons — square corners, Archivo, sentence case — matching
// the header/footer's dcBtn language. Keyboard focus uses an inset ring so it
// reads on both the terracotta solid and the hairline ghost.
const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-sans text-sm font-semibold leading-tight transition-[transform,border-color,color,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cream/70";

const sizes: Record<Size, string> = {
  md: "px-6 py-3",
  lg: "px-8 py-4 text-[15px]",
};

const variants: Record<Variant, string> = {
  solid:
    "bg-coral text-cream shadow-[0_3px_12px_-3px_rgba(214,92,68,0.55)] hover:bg-coral-dark hover:shadow-[0_6px_18px_-4px_rgba(214,92,68,0.6)] active:bg-coral-deep",
  ghost:
    "border-2 border-coral text-coral-deep hover:bg-coral/10 active:bg-coral/20",
  // For dark photo/scrim backgrounds (e.g. the fullscreen hero slider).
  ghostLight:
    "border-2 border-white/70 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-white/20",
};

function classes(v: Variant, s: Size, block?: boolean, extra = "") {
  return [base, sizes[s], variants[v], block ? "w-full" : "", extra]
    .filter(Boolean)
    .join(" ");
}

/** Anchor-style gold button (Next.js Link). */
export function GoldLink({
  href,
  children,
  variant = "solid",
  size = "md",
  block,
  className = "",
  ...rest
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={classes(variant, size, block, className)} {...rest}>
      {children}
    </Link>
  );
}

/** External anchor gold button (e.g. WhatsApp / tel). */
export function GoldAnchor({
  href,
  children,
  variant = "solid",
  size = "md",
  block,
  className = "",
  ...rest
}: CommonProps & { href: string; target?: string; rel?: string }) {
  return (
    <a href={href} className={classes(variant, size, block, className)} {...rest}>
      {children}
    </a>
  );
}

/** <button> gold button. */
export function GoldButton({
  children,
  variant = "solid",
  size = "md",
  block,
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, block, className)} {...rest}>
      {children}
    </button>
  );
}
