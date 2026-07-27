import type { Config } from "tailwindcss";

/**
 * ProPack design tokens — white + logo-coral direction.
 * Clean white base, the logo's coral as the single accent hue, near-black
 * ink for text. Token names are historical ("noir"/"gold"/"cream") but map
 * to this palette.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  // Hover states only apply on hover-capable pointers, so tap-triggered
  // hovers don't stick on touch devices.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // Light base: clean white, with a faint warm-white tier for panels
        // laid on top of it. Token keeps its historical name ("noir") so
        // the whole component tree restyles from here.
        noir: {
          DEFAULT: "#FFFFFF",
          800: "#F7F1EA",
          700: "#EFE2D3",
        },
        // Accent: the logo's coral, deepened for AA contrast on white.
        // "border" is the editorial hairline — ink at ~18%, not a tinted rule.
        gold: {
          DEFAULT: "#D65C44",
          light: "#F0806A",
          muted: "#D65C4499",
          border: "#241F1A2E",
        },
        kraft: "#B5432E",
        // Logo coral — the button fill across the site. Ramp darkens for
        // hover/active so the pressed state reads without a color change.
        coral: {
          DEFAULT: "#F0806A",
          dark: "#E56D55",
          deep: "#D65C44",
        },
        // Error red, tuned to the same chroma/lightness family as the
        // accent palette (lib/palette.ts) instead of stock Tailwind red.
        error: {
          DEFAULT: "#C23B3B",
          light: "#D6605C",
        },
        // Success green — AA on white (~4.8:1), harmonized with the coral.
        success: {
          DEFAULT: "#1E7A55",
          light: "#2E9E74",
        },
        // Body text: encre quasi-noire, readable on white.
        cream: {
          DEFAULT: "#241F1A",
          soft: "#241F1ACC",
        },
        // Diameter tier colors (calculator)
        tier: {
          s: "#E8C547",
          m: "#A0C870",
          l: "#70B8C8",
        },
        // shadcn semantic tokens (see :root in globals.css)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-lato)", "Archivo", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #F0806A 0%, #D65C44 55%, #B5432E 100%)",
      },
      boxShadow: {
        gold: "0 12px 32px -14px rgba(36, 31, 26, 0.30)",
        card: "0 10px 34px -18px rgba(36, 31, 26, 0.25)",
      },
      letterSpacing: {
        tech: "0.2em",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
