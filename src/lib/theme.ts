export const COLOR_THEMES = ["blue", "grayscale"] as const;

export type ColorTheme = (typeof COLOR_THEMES)[number];

export const DEFAULT_COLOR_THEME: ColorTheme = "blue";

export function isColorTheme(value: string): value is ColorTheme {
  return COLOR_THEMES.includes(value as ColorTheme);
}

export const COLOR_THEME_STORAGE_KEY = "next-js-ai-starter-color-theme";
