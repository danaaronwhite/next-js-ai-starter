import { test, expect } from "@playwright/test";

import { GALLERY_CATALOG } from "@/components/gallery/catalog";

/**
 * Isolated visual snapshots for each public gallery section.
 * When you add a component: register it in GALLERY_CATALOG + gallery stories,
 * then run `pnpm test:e2e:update-snapshots` to create its baseline PNG.
 */
test.describe("Gallery component screenshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "blue");
    await expect(
      page.getByRole("heading", { name: "Component gallery" }),
    ).toBeVisible();
  });

  for (const entry of GALLERY_CATALOG) {
    test(`captures ${entry.id} section`, async ({ page }) => {
      const section = page.locator(`#${entry.id}`);
      await section.scrollIntoViewIfNeeded();
      await expect(section.getByRole("heading", { level: 2 })).toHaveText(
        entry.title,
      );
      await expect(section).toHaveScreenshot(`${entry.id}.png`, {
        animations: "disabled",
        caret: "hide",
      });
    });
  }
});
