import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/content";
import { accentAt } from "@/lib/palette";

/**
 * Four-step process — presented as a numbered sequence because the order
 * genuinely carries meaning (Consultation → Design → Production → Livraison).
 * Each step is keyed to its own accent hue.
 */
export function Process() {
  return (
    <Section
      eyebrow="Méthode"
      accentColor={accentAt(3).hex}
      title={<>De l'idée à la <em>livraison</em></>}
      intro="Un parcours en quatre temps, avec un interlocuteur unique du premier croquis au dernier carton."
    >
      {/* Connected stepper — chromeless columns linked by a hairline through
          the numbered badges, so the sequence reads as one path rather than
          four separate cards (breaks the card-grid monotony). */}
      <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((step, i) => {
          const accent = accentAt(i);
          const isLast = i === PROCESS_STEPS.length - 1;
          return (
            <Reveal key={step.n} delay={i * 0.08} as="li">
              <div className="relative flex h-full flex-col">
                <div className="relative mb-5 flex items-center">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center font-display text-xl font-bold"
                    style={{
                      color: accent.hex,
                      backgroundColor: accent.soft,
                      border: `1px solid ${accent.hex}44`,
                    }}
                  >
                    {step.n}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="ml-4 hidden h-px flex-1 lg:block"
                      style={{
                        background: `linear-gradient(90deg, ${accent.hex}66, ${accentAt(i + 1).hex}66)`,
                      }}
                    />
                  )}
                </div>
                <h3 className="mb-2 font-display text-xl text-cream">{step.title}</h3>
                <p className="text-sm leading-relaxed text-cream/70">{step.text}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
