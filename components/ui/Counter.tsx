"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fmtInt } from "@/lib/format";

interface CounterProps {
  value: number;
  suffix?: string;
  durationMs?: number;
}

/**
 * Count-up statistic that animates once when scrolled into view.
 */
export function Counter({ value, suffix = "", durationMs = 1600 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, durationMs, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {fmtInt(display)}
      {suffix}
    </span>
  );
}
