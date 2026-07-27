import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/content";
import { accentAt } from "@/lib/palette";

/** Client testimonials, each with its own accent hue. */
export function Testimonials() {
  return (
    <Section
      eyebrow="Références"
      accentColor={accentAt(4).hex}
      title={<>La parole à <em>nos clients</em></>}
      intro="Des marques marocaines qui nous confient leurs écrins, du premier prototype aux grandes séries."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => {
          const accent = accentAt(i + 2);
          return (
            <Reveal key={t.author} delay={i * 0.08}>
              <Card className="flex h-full flex-col" style={{ borderTop: `3px solid ${accent.hex}` }}>
                <span
                  className="mb-4 font-mono text-[0.65rem] tracking-tech"
                  style={{ color: accent.hex }}
                >
                  {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
                </span>
                <blockquote className="flex-1 font-display text-lg italic leading-relaxed text-cream/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 flex items-center gap-3 border-t border-gold-border pt-4">
                  <span
                    className="grid h-10 w-10 place-items-center font-mono text-xs"
                    style={{
                      color: accent.hex,
                      backgroundColor: accent.soft,
                      border: `1px solid ${accent.hex}44`,
                    }}
                  >
                    {t.author.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span>
                    <span className="block text-sm text-cream">{t.author}</span>
                    <span className="block text-xs text-cream/65">{t.role}</span>
                  </span>
                </footer>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
