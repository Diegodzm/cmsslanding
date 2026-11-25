import { client } from "@/sanity/client";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import AppearanceCustomizer from "@/components/site/appearance-customizer";

interface HeroData {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

async function getHeroData(): Promise<HeroData | null> {
  const query = `*[_type == "hero" && !(_id in path("drafts.**"))][0]{
    title,
    subtitle,
    ctaText
  }`;

  return client.fetch(query, {}, { cache: "no-store" });
}

async function HeroContent() {
  await connection();
  const hero = await getHeroData();

  const title = hero?.title?.trim() || "Tu marca lista para destacar";
  const subtitle =
    hero?.subtitle?.trim() ||
    "Personaliza colores, textos y secciones en tiempo real para mostrar cómo se verá tu landing page.";
  const ctaText = hero?.ctaText?.trim() || "Solicitar propuesta";

  return (
    <section className="site-surface w-full max-w-4xl mx-auto rounded-[2rem] border px-6 py-12 sm:px-12 sm:py-16 shadow-[0_24px_70px_rgba(115,86,145,0.14)]">
      <div className="max-w-3xl mx-auto space-y-6">
        <span className="site-copy inline-block rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
          Demo editable con Sanity
        </span>

        <h1 className="site-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] break-words">
          {title}
        </h1>

        <p className="site-copy text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed whitespace-pre-line opacity-90">
          {subtitle}
        </p>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contacto"
            className="site-button inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold whitespace-nowrap shadow-lg shadow-violet-600/20 transition-transform duration-200 hover:-translate-y-0.5"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}

function HeroSkeleton() {
  return (
    <section className="site-surface w-full max-w-4xl mx-auto rounded-[2rem] border px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-6 w-40 animate-pulse rounded-full bg-violet-100 mx-auto" />
        <div className="h-12 sm:h-14 w-full max-w-xl animate-pulse rounded-2xl bg-violet-100 mx-auto" />
        <div className="space-y-2 max-w-lg mx-auto">
          <div className="h-5 w-full animate-pulse rounded-xl bg-rose-100" />
          <div className="h-5 w-4/5 animate-pulse rounded-xl bg-rose-100 mx-auto" />
        </div>
        <div className="pt-3">
          <div className="h-12 w-40 animate-pulse rounded-full bg-violet-200 mx-auto" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10">
      <div className="flex flex-col items-center justify-center text-center">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroContent />
        </Suspense>
      </div>
      <AppearanceCustomizer />
    </div>
  );
}