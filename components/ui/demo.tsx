/**
 * Fixed, viewport-pinned hairline grid that fades out toward the edges via
 * a top-centered radial mask — stays put while the page scrolls, so every
 * route gets the same subtle coral vignette instead of a busy tiled grid.
 */
export default function Component() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div
        className={[
          "pointer-events-none absolute inset-0",
          // grid
          "bg-[linear-gradient(to_right,#d65c4420_1px,transparent_1px),linear-gradient(to_bottom,#d65c4420_1px,transparent_1px)]",
          "bg-[size:14px_24px]",
          // fade the grid with a top-centered radial mask
          "[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_75%,transparent_110%)]",
          "[-webkit-mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_75%,transparent_110%)]",
          "[mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]",
        ].join(" ")}
      />
    </div>
  );
}
