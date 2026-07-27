import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/content";

/** ProPack Solution brand block — the official coral square logotype (PNG). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} Solution — accueil`}
      className={`inline-block shrink-0 ${className}`}
    >
      <Image
        src="/propack-logo.png"
        alt=""
        width={112}
        height={112}
        className="h-14 w-14"
        priority
      />
    </Link>
  );
}
