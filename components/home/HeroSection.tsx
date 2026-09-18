import { SlideShow } from "@/components/home/SlideShow";

/** Homepage showcase and brand statement over the technical grid backdrop. */
export function HeroSection() {
  return (
    <section className="blueprint relative isolate overflow-hidden">
      <SlideShow />

      <div className="mx-auto flex min-h-[320px] w-full max-w-content flex-col items-center justify-center px-5 pb-16 pt-4 sm:min-h-[360px] sm:px-8 sm:pb-20 lg:px-10">
        <div className="mb-6 inline-flex items-center rounded-md border border-gold-border bg-noir-800 px-5 py-3 backdrop-blur-sm">
          <span className="whitespace-nowrap font-sans text-lg font-semibold uppercase tracking-[0.14em] text-kraft sm:text-xl">
            Pro Pack Solution
          </span>
        </div>

        {/* A non-breaking space between "fabrication" and "de" keeps that
            pair from ever splitting across a line wrap. French headline
            copy uses sentence case, not Title Case. */}
        <h1 className="max-w-4xl text-balance text-center font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl lg:text-6xl">
          {"Première usine au Maroc de fabrication de coffrets ronds "}
          <em className="text-cream">de luxe</em>
        </h1>
      </div>
    </section>
  );
}
