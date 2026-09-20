"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { GoldButton, GoldLink } from "@/components/ui/GoldButton";
import { Input, Textarea } from "@/components/ui/Input";
import { BOX_TYPES, QTY_OPT } from "@/lib/calculator/constants";
import { CUSTOM_QUOTE_TYPES } from "@/lib/catalog";
import { styleImageSrc, stylesFor } from "@/lib/gallery";
import { fmtInt } from "@/lib/format";
import { accentAt } from "@/lib/palette";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error" };

/**
 * /configurer — landing step after the catalogue lightbox. Shows the exact
 * style the client picked (photo left) next to a short quote-request form
 * (right). The calculator flow at /calcule is untouched.
 */
export function ConfigurerClient() {
  const sp = useSearchParams();
  const box = [...BOX_TYPES, ...CUSTOM_QUOTE_TYPES].find(
    (item) => item.id === sp.get("type"),
  );
  const styleParam = sp.get("style");
  const availableStyles = box ? stylesFor(box.id) : [];
  const style =
    availableStyles.find((item) => item.key === styleParam) ?? availableStyles[0];

  const [form, setForm] = useState<FormState>(() => ({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    message:
      box && style
        ? [
            "Bonjour, ce style me plaît :",
            "",
            `- Boîte : ${box.label}`,
            `- Style : ${style.label}`,
            "",
            "Merci de me recontacter pour finaliser dimensions, quantité et devis.",
          ].join("\n")
        : "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const successRef = useRef<HTMLDivElement>(null);

  // The form unmounts on success — move focus to the confirmation panel so
  // keyboard focus isn't dropped and screen readers announce it (role=status).
  useEffect(() => {
    if (status.kind === "success") successRef.current?.focus();
  }, [status.kind]);

  // Direct visit without a valid selection: send back to the catalogue.
  if (!box || !style) {
    return (
      <Section
        eyebrow="Configurer"
        headingLevel="h1"
        accentColor={accentAt(0).hex}
        title={<>Choisissez d&apos;abord <em>votre style</em></>}
        intro="Parcourez le catalogue, ouvrez une boîte et sélectionnez le style qui vous plaît — vous arriverez ici avec votre sélection."
      >
        <GoldLink href="/#catalogue">Voir le catalogue</GoldLink>
      </Section>
    );
  }

  const set = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Le nom est requis.";
    if (!form.email.trim()) next.email = "L'e-mail est requis.";
    else if (!EMAIL_RE.test(form.email)) next.email = "Format d'e-mail invalide.";
    if (!form.message.trim()) next.message = "Le message est requis.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, boxType: box.label }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus({ kind: "success" });
    } catch {
      setStatus({ kind: "error" });
    }
  };

  return (
    <Section
      eyebrow="Votre sélection"
      headingLevel="h1"
      accentColor={box.tint}
      title={<>Finalisons <em>votre boîte</em></>}
      intro="Votre style est retenu — laissez-nous vos coordonnées et nous revenons vers vous avec un devis sous 24 h ouvrées."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Chosen product */}
        <div className="lg:sticky lg:top-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
            <Image
              src={styleImageSrc(style)}
              alt={style.label}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            <span
              className="absolute inset-x-0 top-0 h-1"
              style={{ backgroundColor: box.tint }}
              aria-hidden="true"
            />
          </div>
          <div className="mt-5">
            <p className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-tech text-cream/60">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: box.tint }}
                aria-hidden="true"
              />
              Boîte {box.label}
            </p>
            <p className="mt-2 font-display text-2xl text-cream">{style.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-cream/65">
              {box.description}
            </p>
            <Link
              href="/#catalogue"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-tech text-gold transition-colors hover:text-gold-light"
            >
              <span aria-hidden="true">←</span> Changer de style
            </Link>
          </div>
        </div>

        {/* Quote-request form */}
        {status.kind === "success" ? (
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            className="surface rounded-2xl p-8 text-center shadow-card"
          >
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-2xl text-gold-light">
              ✓
            </div>
            <h2 className="font-display text-2xl text-cream">Demande envoyée !</h2>
            <p className="mt-2 text-sm text-cream/65">
              Merci — notre équipe vous répondra sous 24 h ouvrées avec un devis
              pour votre boîte {box.label}.
            </p>
            <div className="mt-6">
              <GoldLink href="/" variant="ghost">
                Retour à l&apos;accueil
              </GoldLink>
            </div>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="surface rounded-2xl p-6 shadow-card sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="cfg-name"
                label="Nom"
                required
                autoComplete="name"
                value={form.name}
                error={errors.name}
                onChange={(e) => set("name")(e.target.value)}
              />
              <Input
                id="cfg-company"
                label="Société"
                autoComplete="organization"
                value={form.company}
                onChange={(e) => set("company")(e.target.value)}
              />
              <Input
                id="cfg-email"
                label="E-mail"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                error={errors.email}
                onChange={(e) => set("email")(e.target.value)}
              />
              <Input
                id="cfg-phone"
                label="Téléphone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone")(e.target.value)}
              />
              <Input
                id="cfg-quantity"
                label="Quantité estimée"
                type="number"
                min={1}
                inputMode="numeric"
                list="cfg-qty-suggestions"
                value={form.quantity}
                onChange={(e) => set("quantity")(e.target.value)}
              />
              <datalist id="cfg-qty-suggestions">
                {QTY_OPT.map((q) => (
                  <option key={q} value={q}>
                    {fmtInt(q)}
                  </option>
                ))}
              </datalist>
            </div>

            <div className="mt-5">
              <Textarea
                id="cfg-message"
                label="Message"
                required
                rows={7}
                value={form.message}
                error={errors.message}
                onChange={(e) => set("message")(e.target.value)}
                hint="Votre sélection est déjà renseignée — ajoutez dimensions, finitions ou délais si vous les connaissez."
              />
            </div>

            {status.kind === "error" && (
              <p className="mt-5 text-sm text-error" role="alert">
                Une erreur est survenue. Réessayez ou contactez-nous par téléphone.
              </p>
            )}

            <div className="mt-7">
              <GoldButton
                type="submit"
                size="lg"
                block
                disabled={status.kind === "submitting"}
              >
                {status.kind === "submitting" ? "Envoi…" : "Envoyer ma demande"}
              </GoldButton>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
