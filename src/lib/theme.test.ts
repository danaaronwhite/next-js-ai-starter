import { describe, expect, it } from "vitest";

import { COLOR_THEMES, DEFAULT_COLOR_THEME, isColorTheme } from "@/lib/theme";

describe("theme helpers", () => {
  it("defaults to blue", () => {
    expect(DEFAULT_COLOR_THEME).toBe("blue");
  });

  it("validates color themes", () => {
    expect(isColorTheme("blue")).toBe(true);
    expect(isColorTheme("grayscale")).toBe(true);
    expect(isColorTheme("purple")).toBe(false);
    expect(COLOR_THEMES).toEqual(["blue", "grayscale"]);
  });
});
