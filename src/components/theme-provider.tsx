"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import {
  COLOR_THEME_STORAGE_KEY,
  DEFAULT_COLOR_THEME,
  isColorTheme,
  type ColorTheme,
} from "@/lib/theme";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

function readStoredColorTheme(): ColorTheme {
  if (typeof window === "undefined") {
    return DEFAULT_COLOR_THEME;
  }

  const stored = localStorage.getItem(COLOR_THEME_STORAGE_KEY);
  if (stored === "teal") {
    return "grayscale";
  }
  return stored && isColorTheme(stored) ? stored : DEFAULT_COLOR_THEME;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ColorThemeProvider>{children}</ColorThemeProvider>
    </NextThemesProvider>
  );
}

const ColorThemeContext = React.createContext<{
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
} | null>(null);

function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorThemeState] =
    React.useState<ColorTheme>(readStoredColorTheme);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorTheme);
    localStorage.setItem(COLOR_THEME_STORAGE_KEY, colorTheme);
  }, [colorTheme]);

  const setColorTheme = React.useCallback((theme: ColorTheme) => {
    setColorThemeState(theme);
  }, []);

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = React.useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within ThemeProvider");
  }
  return context;
}
