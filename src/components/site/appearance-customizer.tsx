"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { useSiteAppearance } from "@/components/site/appearance-provider";

const colorSettings = [
  { key: "pageBackground", label: "Fondo de la página" },
  { key: "navbarBackground", label: "Fondo del navbar" },
  { key: "navbarText", label: "Texto del navbar" },
  { key: "headingText", label: "Títulos" },
  { key: "bodyText", label: "Texto normal" },
  { key: "surfaceBackground", label: "Fondo de tarjetas y formulario" },
  { key: "accentBackground", label: "Fondo de botones principales" },
  { key: "accentText", label: "Texto de botones principales" },
  { key: "footerBackground", label: "Fondo del footer" },
  { key: "footerText", label: "Texto del footer" },
] as const;

const MAX_LOGO_SIZE_BYTES = 1024 * 1024;

export default function AppearanceCustomizer() {
  const { appearance, updateColor, updateLogo, resetAppearance, storageError } =
    useSiteAppearance();
  const [uploadError, setUploadError] = useState("");

  function handleLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("El archivo seleccionado no es una imagen.");
      return;
    }

    if (file.size > MAX_LOGO_SIZE_BYTES) {
      setUploadError("El logo debe pesar menos de 1 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      console.error("No se pudo leer el archivo del logo.", reader.error);
      setUploadError("No se pudo leer la imagen. Inténtalo nuevamente.");
    };
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setUploadError("No se pudo procesar la imagen seleccionada.");
        return;
      }
      updateLogo(reader.result);
      setUploadError("");
    };
    reader.readAsDataURL(file);
  }

  return (
    <section className="site-surface mx-auto my-12 w-full max-w-3xl rounded-3xl border p-6 text-left shadow-[0_16px_50px_rgba(115,86,145,0.1)] sm:p-8">
      <div className="mb-6">
        <p className="site-copy mb-2 text-sm font-semibold uppercase tracking-[0.16em]">
          Vista previa de marca
        </p>
        <h2 className="site-heading text-2xl font-bold">
          Personaliza los colores
        </h2>
        <p className="site-copy mt-2 text-sm">
          Prueba una combinación y se guardará en este navegador.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {colorSettings.map(({ key, label }) => (
          <label
            key={key}
            htmlFor={`appearance-${key}`}
            className="site-control flex min-h-16 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-medium"
          >
            <span className="min-w-0">{label}</span>
            <span className="flex shrink-0 items-center gap-2">
              <code
                title="Código CSS del color"
                className="rounded-md bg-[var(--site-page-background)] px-2 py-1 font-mono text-xs"
              >
                {appearance[key].toUpperCase()}
              </code>
              <input
                id={`appearance-${key}`}
                type="color"
                value={appearance[key]}
                onChange={(event) => updateColor(key, event.currentTarget.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border-0 bg-transparent p-0"
              />
            </span>
          </label>
        ))}
      </div>

      <div className="site-control mt-6 flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label
            htmlFor="business-logo"
            className="text-sm font-semibold"
          >
            Logo del negocio
          </label>
          <p className="mt-1 text-xs opacity-80">
            PNG, JPG, WebP o SVG, hasta 1 MB.
          </p>
        </div>
        <input
          id="business-logo"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="site-copy max-w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-violet-200 file:px-4 file:py-2 file:font-semibold file:text-violet-950 hover:file:bg-violet-300"
        />
      </div>

      {appearance.brandLogo && (
        <div className="site-copy mt-4 flex items-center gap-3 text-sm">
          <Image
            src={appearance.brandLogo}
            alt="Vista previa del logo del negocio"
            width={96}
            height={48}
            unoptimized
            className="h-12 w-24 rounded-lg border border-violet-100 bg-white object-contain p-1"
          />
          <span>El logo se muestra en el navbar.</span>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={resetAppearance}
          className="site-button rounded-full border border-transparent px-5 py-2 text-sm font-semibold"
        >
          Restaurar colores
        </button>
        <span className="site-copy text-xs">
          Los cambios se aplican de inmediato.
        </span>
      </div>

      {(uploadError || storageError) && (
        <p role="alert" className="mt-4 text-sm font-medium text-rose-700">
          {uploadError || storageError}
        </p>
      )}
    </section>
  );
}
