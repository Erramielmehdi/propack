"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface CardModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label?: string;
  /** Enlarged card content shown inside the pop-up. */
  children: ReactNode;
}

/**
 * Full-screen pop-up that enlarges a card in front of the page: the rest of
 * the page dims behind a blurred backdrop, the card content appears centered
 * and bigger, and a coral × button (top-right) closes it — as does tapping the
 * dark area outside or pressing Escape. Page scroll is locked while it's open,
 * and focus jumps to the close button (returning to the opener on close) so
 * keyboard and screen-reader users can operate it too.
 *
 * Rendered through a portal at <body> so it's never clipped or mis-positioned
 * by the section it lives in.
 */
export function CardModal({
  open,
  onClose,
  label = "Détail de la carte",
  children,
}: CardModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      {/* Dimmed backdrop — tap anywhere outside to close. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[#241F1A]/70 backdrop-blur-sm"
      />

      {/* Enlarged card panel */}
      <div className="surface relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-8 shadow-2xl sm:p-10">
        <button
          ref={closeRef}
          type="button"
          aria-label="Fermer"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center text-coral outline-none transition-[transform,color] duration-150 hover:text-coral-dark focus-visible:ring-2 focus-visible:ring-coral-deep active:scale-95"
        >
          <span aria-hidden="true" className="text-3xl leading-none">
            &times;
          </span>
        </button>

        {/* Bigger type inside the pop-up for readability. */}
        <div className="pr-10 [&_h3]:mb-3 [&_h3]:text-2xl sm:[&_h3]:text-3xl [&_p]:text-base sm:[&_p]:text-lg [&_p]:leading-relaxed">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
