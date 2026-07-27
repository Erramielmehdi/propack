import { GoldLink } from "@/components/ui/GoldButton";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-content flex-col items-center justify-center px-5 text-center">
      <p className="label-track mb-4">Erreur 404</p>
      <h1 className="font-display text-5xl font-bold text-cream">
        Page <em className="not-italic text-gold-light">introuvable</em>
      </h1>
      <p className="mt-4 max-w-md text-cream/65">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <GoldLink href="/">Retour à l'accueil</GoldLink>
        <GoldLink href="/calcule" variant="ghost">
          Calculer mon prix
        </GoldLink>
      </div>
    </section>
  );
}
