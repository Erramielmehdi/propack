"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface AccordionItem {
  q: string;
  a: string;
}

/**
 * FAQ-style accordion. Single-open, keyboard accessible.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="surface overflow-hidden rounded-xl">
            <h3>
              <button
                type="button"
                id={`faq-trigger-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-lg text-cream">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold-border text-gold transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-cream/70">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
