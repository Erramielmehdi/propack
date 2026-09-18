import type { CSSProperties, ReactNode } from "react";

interface PageBackgroundProps {
  children: ReactNode;
  src: string;
  position?: CSSProperties["backgroundPosition"];
}

/** Fixed photographic background with page content scrolling above it. */
export function PageBackground({
  children,
  src,
  position = "center",
}: PageBackgroundProps) {
  return (
    <div
      className="relative isolate overflow-hidden border-b border-gold-border bg-cover bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: position,
      }}
    >
      <div
        className="absolute inset-0 -z-10 bg-white/75"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
