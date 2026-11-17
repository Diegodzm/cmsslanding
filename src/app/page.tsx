import { client } from "@/sanity/client";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import AppearanceCustomizer from "@/components/site/appearance-customizer";

async function getHeroData() {
  const query = `*[_type == "hero"][0]{
    title,
    subtitle,
    ctaText
  }`;

  return client.fetch(query, {}, { cache: "no-store" });
}

async function HeroContent() {
  await connection();
  const hero = await getHeroData();

  return (
    <section className="site-surface max-w-3xl mx-auto space-y-6 rounded-[2rem] border px-8 py-16 shadow-[0_20px_60px_rgba(115,86,145,0.12)]">
      <h1 className="site-heading text-4xl md:text-6xl font-extrabold tracking-tight">
        {hero?.title || "Título por defecto (Crea uno en /studio)"}
      </h1>

      <p className="site-copy text-lg md:text-xl max-w-2xl mx-auto">
        {hero?.subtitle || "Subtítulo por defecto para tu landing page."}
      </p>

      <div className="pt-4 flex justify-center gap-4">
        <Link
          href="/contacto"
          className="site-button rounded-full px-7 py-3 font-semibold shadow-lg shadow-violet-600/20 transition-all"
        >
          {hero?.ctaText || "Empezar"}
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="px-4 py-12">
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <Suspense
          fallback={
            <section className="max-w-3xl mx-auto space-y-6 py-20">
              <div className="h-12 w-72 animate-pulse rounded-2xl bg-violet-100 mx-auto" />
              <div className="h-6 w-96 animate-pulse rounded-2xl bg-rose-100 mx-auto" />
              <div className="h-12 w-40 animate-pulse rounded-full bg-violet-200 mx-auto" />
            </section>
          }
        >
          <HeroContent />
        </Suspense>
      </div>
      <AppearanceCustomizer />
    </div>
  );
}