"use client";

import { BOX_TYPES } from "@/lib/calculator/constants";
import type { BoxType, ClientInfo } from "@/lib/calculator/types";
import { MiniBox } from "@/components/ui/MiniBox";
import { CalcInput } from "../CalcField";
import { calcLabel, calcOption } from "../theme";

interface Props {
  boxType: BoxType | null;
  onSelect: (box: BoxType) => void;
  client: ClientInfo;
  onClient: (patch: Partial<ClientInfo>) => void;
  errors?: ClientFieldErrors;
  locked?: boolean;
}

export interface ClientFieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

/** Step 1 — box type grid + client info. */
export function StepType({
  boxType,
  onSelect,
  client,
  onClient,
  errors = {},
  locked = false,
}: Props) {
  return (
    <div className="flex flex-col gap-10">
      <fieldset>
        <legend className={`${calcLabel} mb-4`}>Choisissez un type de boîte</legend>
        {locked && (
          <p className="mb-4 rounded-md border border-[#C9A22733] bg-[#C9A22712] px-4 py-3 text-sm text-[#C9A22799]">
            Le produit choisi depuis le catalogue est verrouillé pour ce devis.
          </p>
        )}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {BOX_TYPES.map((box) => {
            const selected = boxType?.id === box.id;
            return (
              <button
                key={box.id}
                type="button"
                aria-pressed={selected}
                disabled={locked}
                onClick={() => onSelect(box)}
                className={`${calcOption(selected)} flex flex-col items-center gap-1.5 p-4 text-center ${locked ? "cursor-not-allowed opacity-70" : ""}`}
              >
                <MiniBox tint={box.tint} size={36} />
                <span className="font-sans text-sm font-semibold text-[#E8D5A3]">
                  {box.label}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={`${calcLabel} mb-4`}>
          Vos coordonnées
        </legend>
        <p className="mb-4 text-sm leading-relaxed text-[#C9A22799]">
          Pour confirmer votre devis, indiquez votre nom et au moins un moyen
          de contact.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <CalcInput
            id="client-name"
            label="Nom / Société"
            required
            autoComplete="name"
            placeholder="Votre nom ou société"
            value={client.name}
            error={errors.name}
            onChange={(e) => onClient({ name: e.target.value })}
          />
          <CalcInput
            id="client-phone"
            label="Téléphone"
            type="tel"
            autoComplete="tel"
            placeholder="+212 6 00 00 00 00"
            value={client.phone}
            error={errors.phone}
            onChange={(e) => onClient({ phone: e.target.value })}
          />
          <CalcInput
            id="client-email"
            label="E-mail"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.com"
            value={client.email}
            error={errors.email}
            onChange={(e) => onClient({ email: e.target.value })}
          />
          <CalcInput
            id="client-address"
            label="Ville / Adresse (optionnel)"
            autoComplete="street-address"
            placeholder="Ville, Maroc"
            value={client.address}
            onChange={(e) => onClient({ address: e.target.value })}
          />
        </div>
      </fieldset>
    </div>
  );
}
