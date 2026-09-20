"use client";

interface StepDotsProps {
  steps: string[];
  current: number; // 0-based
  onJump?: (index: number) => void;
}

/**
 * Progress dots for the calculator wizard.
 */
export function StepDots({ steps, current, onJump }: StepDotsProps) {
  return (
    <ol className="flex items-center justify-center gap-1.5 sm:gap-3" aria-label="Progression">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const reachable = i <= current;
        return (
          <li key={label} className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              disabled={!reachable || !onJump}
              onClick={() => reachable && onJump?.(i)}
              aria-current={active ? "step" : undefined}
              aria-label={`Étape ${i + 1} : ${label}`}
              title={label}
              className={[
                // before:-inset-1.5 grows the tap target to ~48px while the
                // visible circle stays 36px.
                "relative grid h-9 w-9 place-items-center rounded-full border font-mono text-xs font-semibold transition-[background-color,border-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] before:absolute before:-inset-1.5 before:content-['']",
                active
                  ? "border-[#D65C44] bg-[#F0806A] text-[#241F1A] shadow-[0_8px_20px_-10px_rgba(214,92,68,0.75)]"
                  : done
                    ? "border-[#D65C4480] bg-[#FFF1ED] text-[#D65C44]"
                    : "border-[#241F1A2E] bg-white text-[#8A7E76]",
                reachable && onJump ? "cursor-pointer" : "cursor-default",
              ].join(" ")}
            >
              <span aria-hidden="true">{done ? "✓" : i + 1}</span>
            </button>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={`h-px w-3 sm:w-8 ${done ? "bg-[#D65C4480]" : "bg-[#241F1A24]"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
