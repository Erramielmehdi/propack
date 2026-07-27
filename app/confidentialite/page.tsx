import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et gestion des données de ProPack.",
};

export default function ConfidentialitePage() {
  return (
    <Section eyebrow="Données personnelles" headingLevel="h1" title={<>Politique de <em>confidentialité</em></>} center={false}>
      <div className="max-w-3xl space-y-6 text-base leading-relaxed text-cream/75">
        <p>
          {SITE.name} accorde une grande importance à la protection de vos données
          personnelles. Cette page décrit les informations que nous collectons et
          l'usage que nous en faisons.
        </p>
        <div>
          <h2 className="font-display text-xl text-cream">Données collectées</h2>
          <p>
            Via nos formulaires (contact, calculateur), nous collectons les
            données que vous nous transmettez : nom, société, e-mail, téléphone,
            et les caractéristiques de votre projet.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-cream">Finalité</h2>
          <p>
            Ces données servent exclusivement à traiter vos demandes de devis et à
            vous recontacter. Elles ne sont ni vendues ni cédées à des tiers.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-cream">Vos droits</h2>
          <p>
            Vous disposez d'un droit d'accès, de rectification et de suppression de
            vos données. Pour l'exercer, écrivez-nous à {SITE.email}.
          </p>
        </div>
        <p className="text-xs text-cream/65">
          Contenu de démonstration — à adapter selon la loi 09-08 (Maroc) et/ou le
          RGPD selon votre marché.
        </p>
      </div>
    </Section>
  );
}
