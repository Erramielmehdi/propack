import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { PageBackground } from "@/components/ui/PageBackground";
import { EXTRAS } from "@/lib/calculator/constants";
import { SERVICES, SECTORS } from "@/lib/content";
import { accentAt } from "@/lib/palette";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fabrication sur-mesure, impression, prototypage et conseil packaging. Découvrez les finitions premium ProPack.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Intro */}
      <PageBackground src="/images/services-background-v1.png" position="60% center">
        <Section
          eyebrow="Nos services"
          headingLevel="h1"
          title={<>Tout pour un packaging <em>d'exception</em></>}
          intro="De la conception à la production, ProPack couvre l'ensemble de la chaîne de valeur de votre emballage cylindrique."
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const accent = accentAt(i);
              return (
                <Reveal key={service.title} delay={(i % 3) * 0.08}>
                  <Card interactive className="h-full">
                    <span
                      aria-hidden="true"
                      className="mb-4 grid h-12 w-12 place-items-center rounded-full text-xl"
                      style={{
                        color: accent.hex,
                        backgroundColor: accent.soft,
                        border: `1px solid ${accent.hex}44`,
                      }}
                    >
                      {service.icon}
                    </span>
                    <h3 className="mb-2 font-display text-xl text-cream">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-cream/65">
                      {service.text}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Section>
      </PageBackground>

      {/* Finishing options */}
      <Section
        eyebrow="Finitions"
        title={<>Les <em>options de finition</em></>}
        intro="Ajoutez la touche finale qui distingue une boîte ordinaire d'un écrin mémorable."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXTRAS.map((extra, i) => (
            <Reveal key={extra.key} delay={i * 0.07}>
              <Card interactive className="group flex h-full flex-col text-center">
                <div className="sheen relative flex h-28 items-center justify-center overflow-hidden rounded-lg border border-gold-border/40 bg-noir-800 px-3">
                  <h3 className="font-display text-xl text-cream sm:text-2xl">
                    {extra.label}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-cream/60">
                  {EXTRA_COPY[extra.key]}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Sectors */}
      <Section
        eyebrow="Secteurs servis"
        title={<>Une expertise <em>multi-secteurs</em></>}
      >
        <div className="flex flex-wrap justify-center gap-3">
          {SECTORS.map((sector, i) => (
            <Reveal key={sector} delay={(i % 4) * 0.05}>
              <span className="surface inline-block rounded-full px-5 py-2.5 text-sm text-cream/75">
                {sector}
              </span>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/** Short marketing copy per finishing add-on. */
const EXTRA_COPY: Record<string, string> = {
  ribbon: "Ruban satiné noué à la main pour une ouverture cadeau élégante.",
  marquage: "Marquage à chaud doré ou argenté de votre logo, effet métallisé.",
  gaufrage: "Gaufrage en relief pour un rendu tactile et haut de gamme.",
  uvSpot: "Vernis UV sélectif brillant qui fait ressortir vos motifs.",
};
