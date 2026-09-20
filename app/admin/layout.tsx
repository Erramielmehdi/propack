import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-content px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
      {children}
    </div>
  );
}
