"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { CardModal } from "./CardModal";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * Make the card pressable: tapping/clicking opens an enlarged pop-up of the
   * card in front of the page (dimmed backdrop + close button), so low-vision
   * users can read it comfortably. Mouse users also get a subtle hover lift.
   */
  interactive?: boolean;
}

/**
 * Gold-bordered translucent surface card.
 */
export function Card({
  children,
  interactive = false,
  className = "",
  ...rest
}: CardProps) {
  const [open, setOpen] = useState(false);

  // Static card — just a surface, no interaction.
  if (!interactive) {
    return (
      <div
        className={["surface p-6 shadow-card", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label="Agrandir la carte pour mieux la voir"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={[
          "surface relative cursor-pointer p-6 shadow-card outline-none",
          "transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "focus-visible:ring-2 focus-visible:ring-gold/70",
          "[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-gold/50 [@media(hover:hover)]:hover:shadow-gold",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>

      <CardModal open={open} onClose={() => setOpen(false)}>
        {children}
      </CardModal>
    </>
  );
}
