import type { Metadata } from "next";
import { Suspense } from "react";
import { Calculator } from "@/components/calculator/Calculator";

export const metadata: Metadata = {
  title: "Calculateur de prix",
  description:
    "Estimez le prix de votre boîte cadeau cylindrique sur mesure en quelques clics : type, diamètre, hauteur, quantité et finitions.",
};

/**
 * Full-black page background — a deliberate departure from the site's light
 * "Dieline" theme, scoped to this page only (the shared <Section> stays
 * untouched so every other route keeps its white background).
 */
export default function CalculePage() {
  return (
    <section
      className="w-full px-5 pb-16 pt-28 sm:pb-20 sm:pt-28 md:pb-24 md:pt-24"
      style={{
        background:
          "linear-gradient(135deg, #0A0A0A 0%, #1A1208 50%, #0A0A0A 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-content">
        <div className="mb-10 flex flex-col items-start text-left md:mb-14">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A22733] bg-[#C9A22718] px-4 py-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-tech text-[#C9A227]">
            Devis instantané
          </span>
          <h1 className="text-balance font-display text-3xl font-bold leading-[1.12] text-[#E8D5A3] sm:text-4xl md:text-[2.7rem]">
            Calculez le prix de{" "}
            <em className="not-italic text-[#E8C547]">votre boîte</em>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#C9A22799]">
            Renseignez les caractéristiques de votre boîte cylindrique et
            obtenez une estimation immédiate, options de finition et remises
            volume comprises.
          </p>
        </div>

        <Suspense fallback={<CalculatorFallback />}>
          <Calculator />
        </Suspense>
      </div>
    </section>
  );
}

function CalculatorFallback() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="min-h-[360px] animate-pulse rounded-2xl border border-[#C9A22733] bg-[#ffffff08] p-8">
        <div className="mb-4 h-6 w-40 rounded bg-[#ffffff12]" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-[#ffffff12]" />
          ))}
        </div>
      </div>
    </div>
  );
}
