import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { PageBackground } from "@/components/ui/PageBackground";
import { VALUES, TIMELINE, TEAM, CERTIFICATIONS, SITE } from "@/lib/content";
import { BOX_STYLES, styleImageSrc } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "L'histoire, la mission et les valeurs de ProPack, fabricant casablancais de boîtes cadeaux cylindriques sur mesure depuis 2006.",
};

export default function AProposPage() {
  return (
    <>
      {/* Histoire + mission */}
      <PageBackground src="/images/about-background-v1.png" position="58% center">
        <Section
          eyebrow="Notre histoire"
          headingLevel="h1"
          title={<>L'artisanat de l'emballage, <em>à la marocaine</em></>}
          center={false}
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="space-y-4 text-cream/75">
                <p className="leading-relaxed">
                  Fondée à Casablanca en 2006, {SITE.name} cultive depuis près de
                  vingt ans une conviction simple : un produit d'exception mérite
                  un écrin à sa hauteur. Nous nous sommes spécialisés dans un
                  format exigeant et intemporel, la boîte cylindrique, pour en
                  faire notre signature.
                </p>
                <p className="leading-relaxed">
                  Depuis notre atelier d'Aïn Sebaâ, équipé de machines récentes,
                  nous accompagnons les jeunes marques comme les maisons établies,
                  du prototype unique à la série de plusieurs milliers de pièces,
                  avec la même exigence de qualité.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="h-full">
                <h2 className="mb-3 font-display text-xl text-cream">Notre mission</h2>
                <p className="leading-relaxed text-cream/75">
                  Offrir à chaque marque un emballage cylindrique qui raconte son
                  histoire, protège son produit et marque durablement ses clients,
                  en conjuguant savoir-faire local, matériaux responsables et
                  finitions de luxe.
                </p>
              </Card>
            </Reveal>
          </div>
        </Section>
      </PageBackground>

      {/* Valeurs */}
      <Section eyebrow="Nos valeurs" title={<>Ce qui nous <em>guide</em></>}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <Card interactive className="h-full">
                <h3 className="mb-2 font-display text-xl text-cream">{value.title}</h3>
                <p className="text-sm leading-relaxed text-cream/65">{value.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section eyebrow="Parcours" title={<>Les <em>étapes clés</em></>} center={false}>
        <div className="relative ml-2 border-l border-gold-border pl-8">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} as="div">
              <div className="relative pb-10 last:pb-0">
                <span className="absolute -left-[42px] top-1 grid h-6 w-6 place-items-center rounded-full border border-gold bg-noir text-[10px] font-bold text-gold-light">
                  ●
                </span>
                <div className="font-display text-lg text-gold-light">{item.year}</div>
                <h3 className="font-display text-xl text-cream">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-cream/65">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Équipe */}
      <Section eyebrow="L'équipe" title={<>Les <em>visages</em> de ProPack</>}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.07}>
              <Card className="flex h-full flex-col items-center text-center">
                <div className="mb-4 grid h-20 w-20 place-items-center rounded-full border border-gold-border bg-gold/10 font-display text-2xl text-gold-light">
                  {member.initials}
                </div>
                <h3 className="font-display text-lg text-cream">{member.name}</h3>
                <p className="text-sm text-cream/65">{member.role}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Engagements */}
      <Section eyebrow="Engagements" title={<>Nos <em>engagements</em></>}>
        <div className="grid gap-5 sm:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.code} delay={i * 0.08}>
              <Card className="flex h-full flex-col items-center text-center">
                <div className="mb-3 grid h-16 w-16 place-items-center rounded-full border-2 border-gold text-sm font-bold text-gold-light">
                  {cert.code.split(" ")[0]}
                </div>
                <h3 className="font-display text-lg text-cream">{cert.code}</h3>
                <p className="mt-1 text-sm text-cream/70">{cert.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Galerie réalisations — real photos from the shared style gallery. */}
      <Section eyebrow="Réalisations" title={<>Un aperçu de <em>nos créations</em></>}>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {REALISATIONS.map((key, i) => {
            const style = BOX_STYLES[key];
            return (
              <Reveal key={key} delay={(i % 3) * 0.06}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-gold-border">
                  <Image
                    src={styleImageSrc(style)}
                    alt={`Boîte cylindrique — ${style.label}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#12283a]/85 to-transparent px-4 pb-3 pt-10">
                    <span className="font-display text-sm text-white">
                      {style.label}
                    </span>
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}

/** Six representative styles from the shared photo gallery (lib/gallery.ts). */
const REALISATIONS = [
  "mariage1",
  "dates1",
  "sushi1",
  "publicity4",
  "sac-luxe3",
  "cylindre2",
] as const;
