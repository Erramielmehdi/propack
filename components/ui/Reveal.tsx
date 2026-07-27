"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds before the fade-in-up starts. */
  delay?: number;
  className?: string;
  /** Render element tag. */
  as?: "div" | "section" | "li" | "article";
}

/**
 * Fade-in-up on scroll into view. Respects prefers-reduced-motion.
 *
 * The reveal target is ALWAYS declared (never `undefined` under reduced
 * motion): the server renders the hidden initial state inline, so a
 * reduced-motion client that skips the animation entirely would leave the
 * content stuck invisible. Instead we keep the same in-view trigger and
 * collapse the transition to zero duration.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay }
      }
    >
      {children}
    </MotionTag>
  );
}
