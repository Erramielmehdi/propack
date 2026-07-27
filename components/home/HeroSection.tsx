/**
 * Home landing hero — a plain text block (no background image) that sits right
 * under the <SlideShow /> carousel: the ProPack Solution badge above the brand
 * title, on the page's cream background. The showcase slides above carry the
 * imagery, so the hero stays clean and legible.
 */
export function HeroSection() {
  return (
    <section className="px-5 pb-8 pt-2 sm:pb-10 sm:pt-4">
      <div className="mx-auto flex w-full max-w-content flex-col items-center">
        <div className="mb-6 inline-flex items-center rounded-md border border-gold-border bg-noir-800 px-5 py-3 backdrop-blur-sm">
          <span className="whitespace-nowrap font-sans text-lg font-semibold uppercase tracking-[0.14em] text-kraft sm:text-xl">
            Pro Pack Solution
          </span>
        </div>

        {/* A non-breaking space between "fabrication" and "de" keeps that
            pair from ever splitting across a line wrap. French headline
            copy uses sentence case, not Title Case. */}
        <h1 className="max-w-xl text-balance text-center font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl">
          {"Première usine au Maroc de fabrication de coffrets ronds "}
          <em>de luxe</em>
        </h1>
      </div>
    </section>
  );
}