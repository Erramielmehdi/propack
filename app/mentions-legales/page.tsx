import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site ProPack.",
};

export default function MentionsLegalesPage() {
  return (
    <Section eyebrow="Informations" headingLevel="h1" title={<>Mentions <em>légales</em></>} center={false}>
      <div className="max-w-3xl space-y-6 text-base leading-relaxed text-cream/75">
        <div>
          <h2 className="font-display text-xl text-cream">Éditeur</h2>
          <p>
            {SITE.name} — Fabricant d'emballages cylindriques sur mesure.
            <br />
            {SITE.address}
            <br />
            Téléphone : {SITE.phone} — E-mail : {SITE.email}
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-cream">Hébergement</h2>
          <p>
            Ce site est hébergé par un prestataire d'hébergement web. Les
            informations d'hébergement sont disponibles sur simple demande.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-cream">Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus (textes, visuels, logo) présents sur ce site
            est la propriété de {SITE.name}, sauf mention contraire. Toute
            reproduction est interdite sans autorisation préalable.
          </p>
        </div>
        <p className="text-xs text-cream/65">
          Contenu de démonstration — à compléter avec vos informations légales
          réelles (RC, ICE, IF, capital social).
        </p>
      </div>
    </Section>
  );
}
