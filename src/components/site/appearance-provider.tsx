"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

const STORAGE_KEY = "cmslandingpage:site-appearance";
const MAX_LOGO_DATA_URL_LENGTH = 1_500_000;

export const defaultAppearance = {
  pageBackground: "#fff9f2",
  navbarBackground: "#f2eafa",
  navbarText: "#514263",
  headingText: "#4b3766",
  bodyText: "#62566f",
  surfaceBackground: "#fffefa",
  accentBackground: "#8060b4",
  accentText: "#fffefa",
  footerBackground: "#f9e9ee",
  footerText: "#674f61",
  brandLogo: null as string | null,
};

type ColorSetting = Exclude<keyof typeof defaultAppearance, "brandLogo">;
type SiteAppearance = typeof defaultAppearance;

type AppearanceContextValue = {
  appearance: SiteAppearance;
  updateColor: (setting: ColorSetting, value: string) => void;
  updateLogo: (value: string | null) => void;
  resetAppearance: () => void;
  storageError: string;
};

const AppearanceContext = createContext<AppearanceContextValue | null>(null);
const appearanceListeners = new Set<() => void>();
let cachedSerialized: string | null | undefined;
let cachedAppearance: SiteAppearance = defaultAppearance;

function isColor(value: unknown): value is string {
  return typeof value === "string" && /^#[\da-f]{6}$/i.test(value);
}

function parseAppearance(value: string): SiteAppearance {
  const parsed: unknown = JSON.parse(value);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Los ajustes guardados no tienen un formato válido.");
  }

  const saved = parsed as Record<string, unknown>;
  const brandLogo =
    typeof saved.brandLogo === "string" &&
    saved.brandLogo.startsWith("data:image/") &&
    saved.brandLogo.length <= MAX_LOGO_DATA_URL_LENGTH
      ? saved.brandLogo
      : null;

  return {
    pageBackground: isColor(saved.pageBackground)
      ? saved.pageBackground
      : defaultAppearance.pageBackground,
    navbarBackground: isColor(saved.navbarBackground)
      ? saved.navbarBackground
      : defaultAppearance.navbarBackground,
    navbarText: isColor(saved.navbarText)
      ? saved.navbarText
      : defaultAppearance.navbarText,
    headingText: isColor(saved.headingText)
      ? saved.headingText
      : defaultAppearance.headingText,
    bodyText: isColor(saved.bodyText)
      ? saved.bodyText
      : defaultAppearance.bodyText,
    surfaceBackground: isColor(saved.surfaceBackground)
      ? saved.surfaceBackground
      : defaultAppearance.surfaceBackground,
    accentBackground: isColor(saved.accentBackground)
      ? saved.accentBackground
      : defaultAppearance.accentBackground,
    accentText: isColor(saved.accentText)
      ? saved.accentText
      : defaultAppearance.accentText,
    footerBackground: isColor(saved.footerBackground)
      ? saved.footerBackground
      : defaultAppearance.footerBackground,
    footerText: isColor(saved.footerText)
      ? saved.footerText
      : defaultAppearance.footerText,
    brandLogo,
  };
}

function getAppearanceSnapshot(): SiteAppearance {
  let serialized: string | null;
  try {
    serialized = window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error("No se pudieron leer los ajustes de apariencia.", error);
    return cachedAppearance;
  }

  if (serialized === cachedSerialized) {
    return cachedAppearance;
  }

  cachedSerialized = serialized;
  if (!serialized) {
    cachedAppearance = defaultAppearance;
    return cachedAppearance;
  }

  try {
    cachedAppearance = parseAppearance(serialized);
  } catch (error) {
    console.error("Los ajustes de apariencia guardados no son válidos.", error);
    cachedAppearance = defaultAppearance;
  }
  return cachedAppearance;
}

function subscribeToAppearance(listener: () => void) {
  appearanceListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    appearanceListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function saveAppearance(appearance: SiteAppearance) {
  const serialized = JSON.stringify(appearance);
  let errorMessage = "";
  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
    cachedSerialized = serialized;
  } catch (error) {
    console.error("No se pudieron guardar los ajustes de apariencia.", error);
    errorMessage =
      "No se pudieron guardar los cambios en este navegador. Prueba con un logo más pequeño.";
  }

  cachedAppearance = appearance;
  appearanceListeners.forEach((listener) => listener());
  return errorMessage;
}

export function AppearanceProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const appearance = useSyncExternalStore(
    subscribeToAppearance,
    getAppearanceSnapshot,
    () => defaultAppearance,
  );
  const [storageError, setStorageError] = useState("");
  const themeStyle = {
    "--site-page-background": appearance.pageBackground,
    "--site-navbar-background": appearance.navbarBackground,
    "--site-navbar-text": appearance.navbarText,
    "--site-heading-text": appearance.headingText,
    "--site-body-text": appearance.bodyText,
    "--site-surface-background": appearance.surfaceBackground,
    "--site-accent-background": appearance.accentBackground,
    "--site-accent-text": appearance.accentText,
    "--site-footer-background": appearance.footerBackground,
    "--site-footer-text": appearance.footerText,
  } as CSSProperties;

  const updateColor = useCallback((setting: ColorSetting, value: string) => {
    if (!isColor(value)) {
      return;
    }
    setStorageError(
      saveAppearance({ ...getAppearanceSnapshot(), [setting]: value }),
    );
  }, []);

  const updateLogo = useCallback((value: string | null) => {
    setStorageError(saveAppearance({ ...getAppearanceSnapshot(), brandLogo: value }));
  }, []);

  const resetAppearance = useCallback(() => {
    setStorageError(saveAppearance(defaultAppearance));
  }, []);

  return (
    <AppearanceContext.Provider
      value={{
        appearance,
        updateColor,
        updateLogo,
        resetAppearance,
        storageError,
      }}
    >
      <div
        className="min-h-screen flex flex-col font-sans antialiased"
        style={{
          ...themeStyle,
          backgroundColor: "var(--site-page-background)",
          color: "var(--site-body-text)",
        }}
      >
        {children}
      </div>
    </AppearanceContext.Provider>
  );
}

export function useSiteAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useSiteAppearance debe usarse dentro de AppearanceProvider.");
  }
  return context;
}
