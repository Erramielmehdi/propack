import type { Metadata } from "next";
import { Suspense } from "react";
import { Calculator } from "@/components/calculator/Calculator";

export const metadata: Metadata = {
  title: "Calculateur de prix",
  description:
    "Estimez le prix de votre boîte cadeau cylindrique sur mesure en quelques clics : type, diamètre, hauteur, quantité et finitions.",
};

export default function CalculePage() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[linear-gradient(135deg,#0A0A0A_0%,#1A1208_50%,#0A0A0A_100%)] px-5 pb-16 pt-28 sm:pb-20 sm:pt-28 md:pb-24 md:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#C9A22722]"
      />
      <div className="mx-auto w-full max-w-content">
        <div className="mb-10 max-w-3xl border-l-2 border-[#C9A227] pl-5 text-left md:mb-12 md:pl-7">
          <span className="mb-4 block font-mono text-[0.68rem] font-semibold uppercase tracking-tech text-[#C9A227]">
            Devis instantané
          </span>
          <h1 className="text-balance font-display text-3xl font-bold leading-[1.12] text-[#E8D5A3] sm:text-4xl md:text-[2.7rem]">
            Calculez le prix de{" "}
            <em className="not-italic text-[#E8C547]">votre boîte</em>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#C9A22799]">
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
      <div className="min-h-[360px] animate-pulse rounded-lg border border-[#C9A22733] bg-[#0A0A0A] p-8 shadow-card">
        <div className="mb-4 h-6 w-40 rounded bg-[#C9A2271A]" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-[#C9A22712]" />
          ))}
        </div>
      </div>
    </div>
  );
}
