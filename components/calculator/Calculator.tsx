"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BOX_TYPES } from "@/lib/calculator/constants";
import { calc } from "@/lib/calculator/price";
import { buildDevisPayload } from "@/lib/calculator/payload";
import type { ClientInfo } from "@/lib/calculator/types";
import { SITE } from "@/lib/content";
import { StepDots } from "@/components/ui/StepDots";
import { calcBtn, calcCard, calcColor } from "./theme";
import { StepType, type ClientFieldErrors } from "./steps/StepType";
import { StepDiameter } from "./steps/StepDiameter";
import { StepHeight } from "./steps/StepHeight";
import { StepQuantity } from "./steps/StepQuantity";
import { StepResult } from "./steps/StepResult";
import { buildWaMessage } from "./waMessage";
import {
  STEP_LABELS,
  canGo,
  canReach,
  initialState,
  resolveExtras,
  type WizardState,
} from "./state";

/** sessionStorage key used to hand a quote off to /contact. */
export const CONTACT_HANDOFF_KEY = "propack:contact-prefill";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SaveState =
  | { status: "idle" }
  | { status: "saving" }
  | { status: "saved"; id: string }
  | { status: "error"; message: string };

export function Calculator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();

  const [state, setState] = useState<WizardState>(initialState);
  const [save, setSave] = useState<SaveState>({ status: "idle" });
  const [clientErrors, setClientErrors] = useState<ClientFieldErrors>({});
  const saveLocked = useRef(false);
  const catalogTypeId = searchParams.get("type");
  const catalogBox = useMemo(
    () => BOX_TYPES.find((box) => box.id === catalogTypeId) ?? null,
    [catalogTypeId],
  );
  const productLocked = catalogBox !== null;

  // Prefill from query params: ?type= (home grid) and ?d=&h=&q= (live estimator).
  // Never clobbers values the user has already chosen in this session.
  useEffect(() => {
    const typeId = searchParams.get("type");
    const d = parseInt(searchParams.get("d") ?? "", 10);
    const h = parseInt(searchParams.get("h") ?? "", 10);
    const q = parseInt(searchParams.get("q") ?? "", 10);
    if (!typeId && !(d > 0) && !(h > 0) && !(q > 0)) return;

    setState((s) => {
      return {
        ...s,
        boxType: s.boxType ?? catalogBox,
        diameter: s.diameter ?? (d > 0 ? d : null),
        height: s.height ?? (h > 0 ? h : null),
        quantity: s.quantity ?? (q > 0 ? q : null),
      };
    });
  }, [catalogBox, searchParams]);

  const extras = useMemo(() => resolveExtras(state.extraKeys), [state.extraKeys]);

  const result = useMemo(() => {
    if (state.diameter == null || state.height == null || state.quantity == null) {
      return null;
    }
    return calc({
      diameter: state.diameter,
      height: state.height,
      quantity: state.quantity,
      selectedExtras: extras,
    });
  }, [state.diameter, state.height, state.quantity, extras]);

  // ---- State mutators -------------------------------------------------------

  const patchClient = (patch: Partial<ClientInfo>) => {
    setState((s) => ({ ...s, client: { ...s.client, ...patch } }));
    setClientErrors((current) => ({
      ...current,
      ...(patch.name !== undefined ? { name: undefined } : {}),
      ...(patch.phone !== undefined ? { phone: undefined } : {}),
      ...(patch.email !== undefined ? { email: undefined, phone: undefined } : {}),
    }));
  };

  const toggleExtra = (key: string) =>
    setState((s) => ({
      ...s,
      extraKeys: s.extraKeys.includes(key)
        ? s.extraKeys.filter((k) => k !== key)
        : [...s.extraKeys, key],
    }));

  const goNext = () => {
    if (!canGo(state, state.step)) return;
    setState((s) => ({ ...s, step: Math.min(s.step + 1, STEP_LABELS.length - 1) }));
  };

  const goPrev = () => {
    if (save.status === "saved") return;
    setState((s) => ({ ...s, step: Math.max(s.step - 1, 0) }));
  };

  const jumpTo = (i: number) => {
    if (save.status === "saved") return;
    if (i <= state.step || canReach(state, i)) {
      setState((s) => ({ ...s, step: i }));
    }
  };

  const reset = () => {
    setState({ ...initialState(), boxType: catalogBox });
    setSave({ status: "idle" });
    setClientErrors({});
    saveLocked.current = false;
  };

  // ---- Result actions -------------------------------------------------------

  const saveDevis = async () => {
    if (!result || !state.boxType || saveLocked.current) return;

    const errors: ClientFieldErrors = {};
    if (!state.client.name.trim()) errors.name = "Indiquez votre nom ou votre société.";
    if (!state.client.phone.trim() && !state.client.email.trim()) {
      errors.phone = "Ajoutez un téléphone ou un e-mail pour être recontacté.";
    }
    if (state.client.email.trim() && !EMAIL_RE.test(state.client.email.trim())) {
      errors.email = "Saisissez une adresse e-mail valide.";
    }
    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      setState((current) => ({ ...current, step: 0 }));
      window.setTimeout(() => {
        const targetId = errors.name
          ? "client-name"
          : errors.email
            ? "client-email"
            : "client-phone";
        document.getElementById(targetId)?.focus();
      }, 350);
      return;
    }

    saveLocked.current = true;
    setSave({ status: "saving" });
    const payload = buildDevisPayload({
      boxType: state.boxType,
      diameter: state.diameter!,
      height: state.height!,
      quantity: state.quantity!,
      extras,
      client: state.client,
      notes: state.notes,
    });
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setSave({ status: "saved", id: data.devis?.id ?? "—" });
    } catch (err) {
      saveLocked.current = false;
      setSave({
        status: "error",
        message: err instanceof Error && !err.message.startsWith("HTTP")
          ? err.message
          : "Impossible de confirmer le devis pour le moment. Réessayez ou contactez-nous.",
      });
    }
  };

  const waHref = useMemo(() => {
    if (!result) return "#";
    const msg = buildWaMessage({
      boxType: state.boxType,
      client: state.client,
      diameter: state.diameter!,
      height: state.height!,
      quantity: state.quantity!,
      extras,
      notes: state.notes,
      result,
    });
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [result, state, extras]);

  const continueRequest = () => {
    if (!result || !state.boxType) return;
    const payload = buildDevisPayload({
      boxType: state.boxType,
      diameter: state.diameter!,
      height: state.height!,
      quantity: state.quantity!,
      extras,
      client: state.client,
      notes: state.notes,
    });
    try {
      sessionStorage.setItem(CONTACT_HANDOFF_KEY, JSON.stringify(payload));
    } catch {
      /* storage may be unavailable; contact form still works empty */
    }
    router.push("/contact?from=calculateur");
  };

  // ---- Render ---------------------------------------------------------------

  const canAdvance = canGo(state, state.step);
  const isLast = state.step === STEP_LABELS.length - 1;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div
        className={`${calcCard} p-5 sm:p-8 md:p-10`}
      >
      <div className="mb-8 border-b border-[#C9A22722] pb-7">
        <StepDots
          steps={STEP_LABELS as unknown as string[]}
          current={state.step}
          onJump={save.status === "saved" ? undefined : jumpTo}
        />
        <p
          className="mt-5 text-center font-display text-2xl font-semibold"
          style={{ color: calcColor.text }}
        >
          {STEP_LABELS[state.step]}
        </p>
      </div>

      <div className="min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 }}
            transition={reduce ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
          >
            {state.step === 0 && (
              <StepType
                boxType={state.boxType}
                onSelect={(box) => setState((s) => ({ ...s, boxType: box }))}
                client={state.client}
                onClient={patchClient}
                errors={clientErrors}
                locked={productLocked}
              />
            )}
            {state.step === 1 && (
              <StepDiameter
                diameter={state.diameter}
                onSelect={(d) => setState((s) => ({ ...s, diameter: d }))}
              />
            )}
            {state.step === 2 && (
              <StepHeight
                height={state.height}
                onSelect={(h) => setState((s) => ({ ...s, height: h }))}
              />
            )}
            {state.step === 3 && (
              <StepQuantity
                quantity={state.quantity}
                onQuantity={(q) => setState((s) => ({ ...s, quantity: q }))}
                extraKeys={state.extraKeys}
                onToggleExtra={toggleExtra}
                notes={state.notes}
                onNotes={(v) => setState((s) => ({ ...s, notes: v }))}
              />
            )}
            {state.step === 4 && result && (
              <StepResult
                result={result}
                diameter={state.diameter!}
                height={state.height!}
                quantity={state.quantity!}
                extras={extras}
                boxTypeLabel={state.boxType?.label ?? ""}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Result-only action bar */}
      {isLast && result && (
        <div className="mt-8 flex flex-col gap-3 border-t border-[#C9A22722] pt-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={saveDevis}
              disabled={save.status === "saving" || save.status === "saved"}
              className={`${calcBtn.gold} w-full sm:flex-1`}
            >
              {save.status === "saved" && <CheckCircle2 className="h-4 w-4" />}
              {save.status === "saving"
                ? "Enregistrement…"
                : save.status === "saved"
                  ? "Devis enregistré"
                  : "Confirmer le devis"}
            </button>
            <button
              type="button"
              onClick={continueRequest}
              className={`${calcBtn.ghost} w-full sm:flex-1`}
            >
              Compléter ma demande
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${calcBtn.wa} w-full sm:flex-1`}
            >
              Envoyer via WhatsApp
            </a>
          </div>
          {save.status === "saved" && (
            <div
              className="flex items-start gap-3 rounded-md border border-[#25D36666] bg-[#25D36612] p-4"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: calcColor.green }}
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold" style={{ color: calcColor.green }}>
                  Votre devis est enregistré et transmis à ProPack.
                </p>
                <p className="mt-1 text-xs" style={{ color: calcColor.text2 }}>
                  Référence : <span className="font-mono font-semibold text-[#E8D5A3]">{save.id}</span>
                </p>
              </div>
            </div>
          )}
          {save.status === "error" && (
            <p
              className="text-center text-sm"
              style={{ color: calcColor.red }}
              role="alert"
            >
              {save.message}
            </p>
          )}
        </div>
      )}

      {/* Wizard navigation — Précédent/Suivant share the row (flexing to fit
          narrow screens); Réinitialiser sits below as a quiet text action so
          the row never outgrows the card on mobile. */}
      <div className="mt-8 border-t border-[#C9A22722] pt-6">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={state.step === 0 || save.status === "saved"}
            className={`${calcBtn.ghost} flex-1 sm:flex-none`}
          >
            ← Précédent
          </button>

          {!isLast && (
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance}
              className={`${calcBtn.gold} flex-1 sm:flex-none`}
            >
              Suivant →
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={reset}
          className="mx-auto mt-4 block font-mono text-[0.68rem] font-semibold uppercase tracking-tech text-[#C9A22799] transition-colors hover:text-[#E8C547]"
        >
          {save.status === "saved" ? "Créer un nouveau devis" : "Réinitialiser"}
        </button>
      </div>
      </div>
    </div>
  );
}
