import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  HeartHandshake,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Pensamos con intención",
    description:
      "Cada decisión parte de entender qué hace única a tu marca y a las personas que quieres alcanzar.",
  },
  {
    icon: HeartHandshake,
    title: "Creamos en equipo",
    description:
      "Trabajamos contigo, con comunicación clara y un proceso cercano de principio a fin.",
  },
  {
    icon: Target,
    title: "Diseñamos para avanzar",
    description:
      "Unimos estrategia y creatividad para que las buenas ideas se conviertan en experiencias útiles.",
  },
];

const steps = [
  ["01", "Escuchamos", "Conocemos tu proyecto, tus retos y tus objetivos."],
  ["02", "Imaginamos", "Definimos una dirección creativa con sentido."],
  ["03", "Hacemos", "Diseñamos, construimos y refinamos contigo."],
];

export default function AcercaPage() {
  return (
    <div className="overflow-hidden">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
        <div>
          <p className="site-copy mb-5 inline-flex items-center gap-2 rounded-full border border-current/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Un estudio creativo, por descubrir
          </p>
          <h1 className="site-heading max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Hacemos que las buenas ideas{" "}
            <span className="text-[var(--site-accent-background)]">
              encuentren su forma.
            </span>
          </h1>
          <p className="site-copy mt-6 max-w-xl text-lg leading-8">
            Somos Estudio Nube, un equipo creativo ficticio que transforma
            desafíos en marcas, experiencias digitales e historias hechas para
            conectar.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/servicios"
              className="site-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold shadow-lg shadow-violet-600/15"
            >
              Explora lo que hacemos
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              href="#nuestro-enfoque"
              className="site-copy inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold"
            >
              Conoce nuestro enfoque
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 size-40 rounded-full bg-[var(--site-accent-background)] opacity-10 blur-3xl"
          />
          <div className="site-surface relative rounded-[2rem] border p-5 shadow-[0_24px_70px_rgba(115,86,145,0.14)] sm:p-7">
            <div className="flex items-center justify-between">
              <span className="site-copy text-xs font-semibold uppercase tracking-[0.16em]">
                Nuestro pequeño universo
              </span>
              <span className="size-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="relative mt-5 flex min-h-72 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[var(--site-navbar-background)] p-8">
              <div
                aria-hidden="true"
                className="absolute size-56 rounded-full border border-[var(--site-heading-text)]/10"
              />
              <div
                aria-hidden="true"
                className="absolute size-40 rounded-full border border-[var(--site-heading-text)]/15"
              />
              <div className="relative flex size-36 rotate-[-8deg] items-center justify-center rounded-[2rem] bg-[var(--site-accent-background)] text-[var(--site-accent-text)] shadow-xl shadow-violet-900/15">
                <Sparkles aria-hidden="true" className="size-14" strokeWidth={1.4} />
              </div>
              <div className="site-surface absolute left-4 top-6 rounded-2xl border px-4 py-3 shadow-lg sm:left-7">
                <p className="site-copy text-[10px] font-semibold uppercase tracking-wider">
                  Curiosidad
                </p>
                <p className="site-heading mt-1 text-sm font-bold">Siempre</p>
              </div>
              <div className="site-surface absolute bottom-5 right-4 rounded-2xl border px-4 py-3 shadow-lg sm:right-7">
                <p className="site-copy text-[10px] font-semibold uppercase tracking-wider">
                  Buenas ideas
                </p>
                <p className="site-heading mt-1 text-sm font-bold">En marcha ↗</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-5 text-center">
              {[
                ["01", "idea"],
                ["02", "miradas"],
                ["∞", "posibilidades"],
              ].map(([number, label]) => (
                <div key={label}>
                  <p className="site-heading text-xl font-bold">{number}</p>
                  <p className="site-copy mt-1 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="site-copy mt-4 text-center text-xs">
            Una presentación de muestra para Estudio Nube.
          </p>
        </div>
      </section>

      <section
        id="nuestro-enfoque"
        className="bg-[color-mix(in_srgb,var(--site-navbar-background)_48%,transparent)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="site-copy text-xs font-semibold uppercase tracking-[0.18em]">
              Lo que nos mueve
            </p>
            <h2 className="site-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Creatividad con los pies en la tierra.
            </h2>
            <p className="site-copy mt-4 leading-7">
              Nos gustan las ideas memorables, pero sobre todo las que resuelven
              algo real y hacen que cada marca se sienta auténtica.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="site-surface rounded-3xl border p-6 sm:p-7"
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-[var(--site-navbar-background)]">
                  <Icon
                    aria-hidden="true"
                    className="site-heading size-5"
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="site-heading text-lg font-semibold">{title}</h3>
                <p className="site-copy mt-2 text-sm leading-6">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="site-copy text-xs font-semibold uppercase tracking-[0.18em]">
              Así trabajamos
            </p>
            <h2 className="site-heading mt-3 max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
              Un camino claro, de la primera charla al resultado.
            </h2>
          </div>
          <div className="divide-y divide-[color-mix(in_srgb,var(--site-heading-text)_14%,transparent)]">
            {steps.map(([number, title, description]) => (
              <div
                key={number}
                className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr] sm:gap-5"
              >
                <span className="site-copy text-sm font-semibold">{number}</span>
                <div>
                  <h3 className="site-heading font-semibold">{title}</h3>
                  <p className="site-copy mt-1 text-sm leading-6">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:pb-20">
        <div className="site-surface mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-[2rem] border p-7 shadow-sm sm:p-10 md:flex-row md:items-center">
          <div>
            <p className="site-heading text-2xl font-semibold">
              ¿Tienes una idea dando vueltas?
            </p>
            <p className="site-copy mt-2">
              Nos encantará ayudarte a imaginar lo que puede llegar a ser.
            </p>
          </div>
          <Link
            href="/contacto"
            className="site-button inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 font-semibold"
          >
            Hablemos de tu proyecto
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
