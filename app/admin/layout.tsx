import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  // pt-28 on mobile clears the floating StaggeredMenu bar (which overlays
  // rather than pushing content down); tighter symmetric padding from md up.
  return (
    <div className="mx-auto w-full max-w-content px-5 pb-12 pt-28 md:py-12">
      {children}
    </div>
  );
}
