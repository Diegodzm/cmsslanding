import Link from "next/link";
import {
  ArrowRight,
  Check,
  Compass,
  Globe2,
  Megaphone,
  Palette,
  Sparkles,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Palette,
    title: "Identidad de marca",
    description:
      "Una marca con personalidad propia, lista para contar una historia coherente en cada punto de contacto.",
    includes: ["Estrategia y posicionamiento", "Logo y sistema visual", "Guía de marca"],
    label: "Para empezar con claridad",
  },
  {
    number: "02",
    icon: Globe2,
    title: "Experiencias web",
    description:
      "Sitios intuitivos y atractivos que presentan lo que haces y convierten visitas en nuevas conversaciones.",
    includes: ["Diseño de páginas", "Contenido y estructura", "Experiencia adaptable"],
    label: "Para crecer en digital",
    featured: true,
  },
  {
    number: "03",
    icon: Megaphone,
    title: "Campañas creativas",
    description:
      "Ideas y piezas de comunicación para lanzar algo nuevo, compartir una novedad o hacerte notar.",
    includes: ["Concepto y dirección de arte", "Piezas para redes", "Plan de lanzamiento"],
    label: "Para hacer ruido del bueno",
  },
];

const benefits = [
  "Un equipo cercano que escucha antes de proponer.",
  "Un proceso claro, con avances y decisiones compartidas.",
  "Soluciones pensadas para tu momento y tus objetivos.",
];

export default function ServiciosPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--site-navbar-background)] opacity-55"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:py-24">
          <div className="max-w-3xl">
            <p className="site-copy mb-5 inline-flex items-center gap-2 rounded-full border border-current/15 bg-white/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
              <Sparkles aria-hidden="true" className="size-3.5" />
              Servicios de muestra · Estudio Nube
            </p>
            <h1 className="site-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Tu próxima idea merece{" "}
              <span className="text-[var(--site-accent-background)]">
                verse increíble.
              </span>
            </h1>
            <p className="site-copy mt-6 max-w-2xl text-lg leading-8">
              Desde definir tu marca hasta llevarla al mundo digital, te
              acompañamos con estrategia, diseño y una buena dosis de
              curiosidad.
            </p>
            <Link
              href="/contacto"
              className="site-button mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold shadow-lg shadow-violet-600/15"
            >
              Cuéntanos tu idea
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="site-surface hidden w-56 rotate-3 rounded-[2rem] border p-5 shadow-xl shadow-violet-900/10 sm:block lg:w-60">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[var(--site-navbar-background)]">
              <Compass
                aria-hidden="true"
                className="site-heading size-5"
                strokeWidth={1.8}
              />
            </div>
            <p className="site-heading mt-6 text-lg font-semibold">
              Un buen comienzo
            </p>
            <p className="site-copy mt-2 text-sm leading-6">
              Una dirección clara para que cada detalle tenga sentido.
            </p>
            <div className="mt-5 flex gap-1.5" aria-hidden="true">
              <span className="h-1.5 w-10 rounded-full bg-[var(--site-accent-background)]" />
              <span className="h-1.5 w-5 rounded-full bg-[var(--site-accent-background)]/30" />
              <span className="h-1.5 w-5 rounded-full bg-[var(--site-accent-background)]/15" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="site-copy text-xs font-semibold uppercase tracking-[0.18em]">
              Lo que podemos crear juntos
            </p>
            <h2 className="site-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Servicios para dar el siguiente paso.
            </h2>
          </div>
          <p className="site-copy max-w-md text-sm leading-6">
            Cada proyecto es diferente. Combinamos estas disciplinas de acuerdo
            con lo que tu marca necesita.
          </p>
        </div>

        <div className="mt-9 grid items-stretch gap-5 lg:grid-cols-3">
          {services.map(
            ({
              number,
              icon: Icon,
              title,
              description,
              includes,
              label,
              featured,
            }) => (
              <article
                key={number}
                className={`site-surface relative flex flex-col rounded-[1.75rem] border p-6 sm:p-7 ${
                  featured
                    ? "shadow-[0_20px_55px_rgba(115,86,145,0.14)] lg:-translate-y-2"
                    : ""
                }`}
              >
                {featured && (
                  <span className="site-button absolute right-5 top-5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                    Favorito
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--site-navbar-background)]">
                    <Icon
                      aria-hidden="true"
                      className="site-heading size-5"
                      strokeWidth={1.8}
                    />
                  </div>
                  <span className="site-copy text-xs font-semibold tracking-widest">
                    {number}
                  </span>
                </div>
                <p className="site-copy mt-6 text-xs font-medium uppercase tracking-wide">
                  {label}
                </p>
                <h3 className="site-heading mt-2 text-2xl font-semibold">
                  {title}
                </h3>
                <p className="site-copy mt-3 min-h-20 text-sm leading-6">
                  {description}
                </p>
                <ul className="mt-5 space-y-3 border-t border-[color-mix(in_srgb,var(--site-heading-text)_14%,transparent)] pt-5">
                  {includes.map((item) => (
                    <li
                      key={item}
                      className="site-copy flex items-start gap-2.5 text-sm"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-[var(--site-accent-background)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contacto"
                  className="site-heading mt-7 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Hablemos de esto
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            ),
          )}
        </div>
        <p className="site-copy mt-6 text-center text-xs">
          Contenido ficticio de demostración. Servicios, equipo y marca son
          ejemplos para esta página de prueba.
        </p>
      </section>

      <section className="bg-[var(--site-navbar-background)]/55">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="site-copy text-xs font-semibold uppercase tracking-[0.18em]">
              Una buena colaboración
            </p>
            <h2 className="site-heading mt-3 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              Más que entregables: un equipo de tu lado.
            </h2>
            <p className="site-copy mt-4 max-w-lg leading-7">
              En Estudio Nube creemos que el mejor trabajo aparece cuando hay
              confianza, objetivos compartidos y espacio para explorar.
            </p>
          </div>
          <ul className="site-surface space-y-4 rounded-3xl border p-6 sm:p-8">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="site-copy flex items-start gap-3 text-sm leading-6"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--site-navbar-background)]">
                  <Check
                    aria-hidden="true"
                    className="site-heading size-3.5"
                    strokeWidth={2.5}
                  />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="site-surface mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-[2rem] border p-7 shadow-sm sm:p-10 md:flex-row md:items-center">
          <div>
            <p className="site-heading text-2xl font-semibold">
              ¿Tienes un proyecto en mente?
            </p>
            <p className="site-copy mt-2">
              Cuéntanos en qué estás trabajando y pensemos juntos el siguiente paso.
            </p>
          </div>
          <Link
            href="/contacto"
            className="site-button inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 font-semibold"
          >
            Contactar al estudio
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
