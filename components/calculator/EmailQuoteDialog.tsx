"use client";

import { CheckCircle2, Mail, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fmtDH } from "@/lib/format";
import { CalcInput } from "./CalcField";
import { calcBtn } from "./theme";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type DialogStatus =
  | { status: "idle" }
  | { status: "saving" }
  | { status: "saved"; id: string }
  | { status: "error"; message: string };

interface Props {
  open: boolean;
  initialName: string;
  initialEmail: string;
  productLabel: string;
  dimensions: string;
  total: number;
  status: DialogStatus;
  onClose: () => void;
  onSubmit: (contact: { name: string; email: string }) => Promise<void>;
}

export function EmailQuoteDialog({
  open,
  initialName,
  initialEmail,
  productLabel,
  dimensions,
  total,
  status,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const savingRef = useRef(false);

  savingRef.current = status.status === "saving";

  useEffect(() => {
    if (!open) return;
    setName(initialName);
    setEmail(initialEmail);
    setErrors({});
  }, [initialEmail, initialName, open]);

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !savingRef.current) onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      document.getElementById("email-quote-name")?.focus();
    }, 0);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      openerRef.current?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = "Indiquez votre nom ou votre société.";
    if (!email.trim()) next.email = "Indiquez l'adresse e-mail de réception.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Saisissez une adresse e-mail valide.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    await onSubmit({ name: name.trim(), email: email.trim() });
  };

  const closeAllowed = status.status !== "saving";

  return (
    <div
      className="fixed inset-0 z-[120] grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (closeAllowed && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-quote-title"
        tabIndex={-1}
        className="max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-lg border border-[#C9A22755] bg-[#0A0A0A] shadow-[0_28px_80px_-24px_rgba(0,0,0,0.95)] outline-none"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#C9A22722] px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#C9A22718] text-[#E8C547]">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 id="email-quote-title" className="font-display text-2xl font-semibold text-[#E8D5A3]">
                Recevoir mon devis par e-mail
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#C9A22799]">
                Notre équipe vérifiera l'estimation avant de vous répondre.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={!closeAllowed}
            aria-label="Fermer"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#C9A22733] text-[#C9A227] transition-colors hover:border-[#C9A22799] hover:text-[#E8C547] disabled:opacity-40"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {status.status === "saved" ? (
          <div className="px-5 py-8 text-center sm:px-8">
            <CheckCircle2 className="mx-auto h-11 w-11 text-[#25D366]" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl text-[#E8D5A3]">
              Demande enregistrée
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#C9A22799]">
              ProPack vous répondra à <strong className="text-[#E8D5A3]">{email}</strong>
              {" "}avec le devis vérifié.
            </p>
            <p className="mt-3 font-mono text-xs text-[#C9A227]">
              Référence : {status.id}
            </p>
            <button type="button" onClick={onClose} className={`${calcBtn.gold} mt-6 w-full`}>
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-5 px-5 py-6 sm:px-8">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-md border border-[#C9A22722] bg-white/[0.025] p-4 text-sm">
              <dt className="text-[#C9A22799]">Produit</dt>
              <dd className="text-right font-semibold text-[#E8D5A3]">{productLabel}</dd>
              <dt className="text-[#C9A22799]">Dimensions</dt>
              <dd className="text-right font-mono text-xs text-[#E8D5A3]">{dimensions}</dd>
              <dt className="text-[#C9A22799]">Total estimé</dt>
              <dd className="text-right font-semibold text-[#E8C547]">{fmtDH(total)}</dd>
            </dl>

            <CalcInput
              id="email-quote-name"
              label="Nom / Société"
              required
              autoComplete="name"
              value={name}
              error={errors.name}
              onChange={(event) => {
                setName(event.target.value);
                setErrors((current) => ({ ...current, name: undefined }));
              }}
            />
            <CalcInput
              id="email-quote-address"
              label="E-mail de réception"
              type="email"
              required
              autoComplete="email"
              placeholder="vous@exemple.com"
              value={email}
              error={errors.email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((current) => ({ ...current, email: undefined }));
              }}
            />

            {status.status === "error" && (
              <p className="text-sm text-[#E05252]" role="alert">
                {status.message}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                disabled={!closeAllowed}
                className={`${calcBtn.ghost} w-full sm:flex-1`}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={status.status === "saving"}
                className={`${calcBtn.gold} w-full sm:flex-1`}
              >
                {status.status === "saving" ? "Enregistrement…" : "Confirmer l'adresse"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
