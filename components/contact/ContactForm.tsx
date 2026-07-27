"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BOX_TYPES, QTY_OPT } from "@/lib/calculator/constants";
import { fmtInt } from "@/lib/format";
import { CONTACT_HANDOFF_KEY } from "@/components/calculator/Calculator";
import { GoldButton } from "@/components/ui/GoldButton";
import { Input, Select, Textarea } from "@/components/ui/Input";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  boxType: string;
  quantity: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  boxType: "",
  quantity: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [prefilled, setPrefilled] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  // The form unmounts on success — move focus to the confirmation panel so
  // keyboard focus isn't dropped and screen readers announce it (role=status).
  useEffect(() => {
    if (status.kind === "success") successRef.current?.focus();
  }, [status.kind]);

  // Prefill from the calculator handoff (sessionStorage).
  useEffect(() => {
    if (searchParams.get("from") !== "calculateur") return;
    try {
      const raw = sessionStorage.getItem(CONTACT_HANDOFF_KEY);
      if (!raw) return;
      const p = JSON.parse(raw);
      setForm((f) => ({
        ...f,
        name: p.client_name || f.name,
        email: p.client_email || f.email,
        phone: p.client_phone || f.phone,
        boxType: p.product_type || f.boxType,
        quantity: p.quantity ? String(p.quantity) : f.quantity,
        message: buildMessageFromQuote(p),
      }));
      setPrefilled(true);
    } catch {
      /* ignore malformed handoff */
    }
  }, [searchParams]);

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
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Échec de l'envoi.");
      }
      setStatus({ kind: "success" });
      setForm(EMPTY);
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          "Une erreur est survenue. Réessayez ou contactez-nous par téléphone.",
      });
    }
  };

  if (status.kind === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="surface rounded-2xl p-8 text-center shadow-card"
      >
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-2xl text-gold-light">
          ✓
        </div>
        <h3 className="font-display text-2xl text-cream">Message envoyé !</h3>
        <p className="mt-2 text-sm text-cream/65">
          Merci pour votre demande. Notre équipe vous répondra sous 24 h ouvrées.
        </p>
        <div className="mt-6">
          <GoldButton onClick={() => setStatus({ kind: "idle" })} variant="ghost">
            Envoyer un autre message
          </GoldButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="surface rounded-2xl p-6 shadow-card sm:p-8">
      {prefilled && (
        <p className="mb-6 rounded-lg border border-gold-border bg-gold/5 px-4 py-3 text-sm text-gold">
          Votre estimation a été reportée ci-dessous. Complétez et envoyez !
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="name"
          label="Nom"
          required
          value={form.name}
          error={errors.name}
          onChange={(e) => set("name")(e.target.value)}
        />
        <Input
          id="company"
          label="Société"
          value={form.company}
          onChange={(e) => set("company")(e.target.value)}
        />
        <Input
          id="email"
          label="E-mail"
          type="email"
          required
          value={form.email}
          error={errors.email}
          onChange={(e) => set("email")(e.target.value)}
        />
        <Input
          id="phone"
          label="Téléphone"
          type="tel"
          value={form.phone}
          onChange={(e) => set("phone")(e.target.value)}
        />
        <Select
          id="boxType"
          label="Type de boîte"
          value={form.boxType}
          onChange={(e) => set("boxType")(e.target.value)}
        >
          <option value="">— Sélectionner —</option>
          {BOX_TYPES.map((b) => (
            <option key={b.id} value={b.label}>
              {b.label}
            </option>
          ))}
        </Select>
        <Input
          id="quantity"
          label="Quantité estimée"
          type="number"
          min={1}
          inputMode="numeric"
          list="qty-suggestions"
          value={form.quantity}
          onChange={(e) => set("quantity")(e.target.value)}
        />
        <datalist id="qty-suggestions">
          {QTY_OPT.map((q) => (
            <option key={q} value={q}>
              {fmtInt(q)}
            </option>
          ))}
        </datalist>
      </div>

      <div className="mt-5">
        <Textarea
          id="message"
          label="Message"
          required
          rows={6}
          value={form.message}
          error={errors.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="Décrivez votre projet : produit, dimensions, finitions, délais…"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="attachment" className="label-track mb-1.5 block text-cream/80">
          Pièce jointe (optionnel)
        </label>
        <input
          id="attachment"
          type="file"
          accept="image/*,.pdf,.ai,.eps"
          className="block w-full text-sm text-cream/60 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-gold/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gold hover:file:bg-gold/25"
        />
        <p className="mt-1 text-xs text-cream/65">
          Logo, maquette ou cahier des charges (PDF, image, AI, EPS).
        </p>
      </div>

      {status.kind === "error" && (
        <p className="mt-5 text-sm text-error" role="alert">
          {status.message}
        </p>
      )}

      <div className="mt-7">
        <GoldButton type="submit" size="lg" block disabled={status.kind === "submitting"}>
          {status.kind === "submitting" ? "Envoi…" : "Envoyer ma demande"}
        </GoldButton>
      </div>
    </form>
  );
}

/** Compose a readable message body from a saved quote payload. */
function buildMessageFromQuote(p: Record<string, unknown>): string {
  const parts: string[] = [];
  parts.push("Bonjour, je souhaite un devis pour la configuration suivante :");
  parts.push("");
  parts.push(`- Type : ${p.product_type ?? "—"}`);
  parts.push(`- Diamètre : ${p.diameter_mm ?? "—"} mm`);
  parts.push(`- Hauteur : ${p.height_mm ?? "—"} mm`);
  parts.push(`- Quantité : ${p.quantity ?? "—"} pièces`);
  if (typeof p.total_price === "number") {
    parts.push(`- Estimation : ${p.total_price.toFixed(2)} DH`);
  }
  if (p.notes) {
    parts.push("");
    parts.push(`Notes : ${p.notes}`);
  }
  return parts.join("\n");
}
