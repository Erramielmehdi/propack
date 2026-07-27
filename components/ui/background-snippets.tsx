/**
 * Tiled hairline grid + a soft coral glow in the corner, tuned to the
 * white palette (globals.css already paints the base radial wash on
 * <body> — this only adds the grid texture and an accent glow on top).
 */
export const Component = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#d65c4414_1px,transparent_1px),linear-gradient(to_bottom,#d65c4414_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#f0806a26,transparent)]"></div>
    </div>
  );
};
