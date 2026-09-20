"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { SiteMenu } from "./SiteMenu";

export function SiteNavigation() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <Header />
      <SiteMenu />
    </>
  );
}
