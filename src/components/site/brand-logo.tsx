"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteAppearance } from "@/components/site/appearance-provider";

export default function BrandLogo() {
  const { appearance } = useSiteAppearance();

  return (
    <Link
      href="/"
      aria-label="Ir al inicio"
      className="shrink-0 text-xl font-bold text-[color:var(--site-navbar-text)]"
    >
      {appearance.brandLogo ? (
        <Image
          src={appearance.brandLogo}
          alt="Logo del negocio"
          width={160}
          height={48}
          unoptimized
          className="h-10 w-32 object-contain object-left"
        />
      ) : (
        "BrandLogo"
      )}
    </Link>
  );
}
