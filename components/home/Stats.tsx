import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { STATS } from "@/lib/content";
import { accentAt } from "@/lib/palette";

/**
 * Animated stats — a chromeless figures band (no card chrome) so it breaks
 * the card-grid rhythm of the surrounding sections. Hairline rules above and
 * below frame it like a spec-sheet footer.
 */
export function Stats() {
  return (
    <section className="px-5 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-content border-y border-gold-border py-12 md:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {STATS.map((stat, i) => {
            const accent = accentAt(i);
            return (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-left">
                  <div
                    className="font-display text-5xl font-bold md:text-6xl"
                    style={{ color: accent.hex }}
                  >
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-3 font-mono text-[0.7rem] uppercase tracking-tech text-cream/70">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
