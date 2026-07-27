import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfigurerClient } from "@/components/configurer/ConfigurerClient";

export const metadata: Metadata = {
  title: "Configurer votre boîte",
  description:
    "Votre style de boîte cylindrique est sélectionné — laissez-nous vos coordonnées pour recevoir un devis personnalisé sous 24 h ouvrées.",
};

export default function ConfigurerPage() {
  return (
    <Suspense
      fallback={
        <div className="px-5 pb-16 pt-28 md:pt-24">
          <div className="surface mx-auto min-h-[420px] w-full max-w-content animate-pulse rounded-2xl" />
        </div>
      }
    >
      <ConfigurerClient />
    </Suspense>
  );
}
