import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import WhatsAppButton from "@/components/ui/wsp";
import {
  AppearanceProvider,
} from "@/components/site/appearance-provider";
import BrandLogo from "@/components/site/brand-logo";

export const metadata: Metadata = {
  title: "Template Landing Page | Next.js + Sanity",
  description: "Plantilla base con Next.js, Tailwind CSS y componentes para Sanity CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = 2026;

  return (
    <html lang="es">
      <body className="min-h-screen">
        <AppearanceProvider>
          <header className="site-header sticky top-0 z-50 w-full backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <BrandLogo />
              <nav className="flex items-center gap-6 text-sm font-medium">
                <Link href="/" className="site-nav-link">
                  Inicio
                </Link>
                <Link href="/servicios" className="site-nav-link">
                  Servicios
                </Link>
                <Link href="/contacto" className="site-nav-link">
                  Contacto
                </Link>
                <Link href="/acerca" className="site-nav-link">
                  Acerca de
                </Link>
                <Link
                  href="/studio"
                  className="site-navbar-button rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors hover:brightness-95"
                >
                  CMS Studio
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="site-footer py-8 text-center text-xs">
            <div className="max-w-6xl mx-auto px-4">
              <p>© {currentYear} BrandLogo. Todos los derechos reservados.</p>
            </div>
            <WhatsAppButton />
          </footer>
        </AppearanceProvider>
      </body>
    </html>
  );
}