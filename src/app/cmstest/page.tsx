import { client } from "@/sanity/client";
import { cmsLabQuery, urlForLabImage, type CmsLabData } from "@/sanity/queries";
import Link from "next/link";
import { Suspense } from "react";
import AppearanceCustomizer from "@/components/site/appearance-customizer";

function sanitizeHref(href?: string): string {
  if (!href) return "/contacto";
  const trimmed = href.trim();
  if (trimmed.startsWith("/")) return trimmed;
  try {
    const parsed = new URL(trimmed);
    if (["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol)) {
      return trimmed;
    }
  } catch {
    return "/contacto";
  }
  return "/contacto";
}

function resolveImageUrl(featuredImage?: CmsLabData["featuredImage"]): string | null {
  if (!featuredImage?.asset) return null;
  if (featuredImage.asset.url) {
    return featuredImage.asset.url;
  }
  try {
    return urlForLabImage(featuredImage)
      .width(900)
      .height(500)
      .fit("crop")
      .url();
  } catch {
    return null;
  }
}

async function CmsLabContent() {
  let data: CmsLabData | null = null;
  try {
    data = await client.fetch<CmsLabData | null>(
      cmsLabQuery,
      {},
      { cache: "no-store" }
    );
  } catch {
    data = null;
  }

  const eyebrow = data?.eyebrow?.trim() || "Práctica Sanity";
  const headline =
    data?.headline?.trim() || "Componentes editables desde CMS";
  const summary =
    data?.summary?.trim() ||
    "Crea un documento de Laboratorio CMS en /studio para probar textos, imágenes, enlaces, estados y listas.";
  const ctaLabel = data?.cta?.label?.trim() || "Ir a contacto";
  const ctaHref = sanitizeHref(data?.cta?.href);
  const isExternal = /^https?:\/\//i.test(ctaHref);
  const showHighlights = data?.showHighlights ?? true;
  const highlights = Array.isArray(data?.highlights) ? data.highlights : [];

  const imageUrl = resolveImageUrl(data?.featuredImage);
  const imageAlt = data?.featuredImage?.alt?.trim() || headline;

  const containerTone =
    data?.layoutVariant === "highlighted"
      ? "ring-2 ring-violet-400/60"
      : "";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section
        className={`site-surface rounded-[2rem] border p-6 sm:p-10 space-y-6 shadow-[0_20px_60px_rgba(115,86,145,0.12)] ${containerTone}`}
      >
        <div className="space-y-3 text-center">
          <span className="site-copy inline-block rounded-full border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider opacity-80">
            {eyebrow}
          </span>
          <h1 className="site-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
            {headline}
          </h1>
          <p className="site-copy text-base sm:text-lg max-w-2xl mx-auto whitespace-pre-line opacity-90">
            {summary}
          </p>
        </div>

        {imageUrl && (
          <div className="overflow-hidden rounded-2xl border bg-black/5">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-60 sm:h-80 object-cover"
            />
          </div>
        )}

        <div className="flex justify-center pt-1">
          {isExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="site-button inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5"
            >
              {ctaLabel}
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="site-button inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </section>

      {showHighlights && (
        <section className="site-surface rounded-[2rem] border p-6 sm:p-8 space-y-4">
          <h2 className="site-heading text-xl sm:text-2xl font-bold">
            Elementos repetibles (array)
          </h2>

          {highlights.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item, idx) => (
                <article
                  key={item._key || `${idx}-${item.title || "item"}`}
                  className="rounded-2xl border p-4 space-y-1.5"
                >
                  <h3 className="site-heading font-semibold text-base">
                    {item.title || `Elemento ${idx + 1}`}
                  </h3>
                  {item.description && (
                    <p className="site-copy text-sm opacity-85">
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="site-copy text-sm opacity-75">
              Agrega ítems en el campo &quot;Lista de elementos repetibles&quot; dentro de /studio para verlos aquí.
            </p>
          )}
        </section>
      )}
    </div>
  );
}

export default function CmsTestPage() {
  return (
    <div className="px-4 py-10 sm:px-6">
      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="h-80 animate-pulse rounded-[2rem] bg-violet-100" />
            <div className="h-40 animate-pulse rounded-[2rem] bg-rose-100" />
          </div>
        }
      >
        <CmsLabContent />
      </Suspense>
      
    </div>
  );
}