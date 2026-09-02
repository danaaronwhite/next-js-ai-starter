import { test, expect } from "@playwright/test";

test.describe("Design system gallery", () => {
  test("loads gallery landmarks and component sections", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Component gallery" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Button" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Input" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Card" })).toBeVisible();
  });

  test("switches color theme via data-theme", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "blue");

    await page.getByRole("banner").getByLabel("Color palette").click();
    await page.getByRole("option", { name: "Grayscale" }).click();

    await expect(html).toHaveAttribute("data-theme", "grayscale");
  });

  test("toggles dark appearance", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("banner").getByRole("button", { name: "Dark mode" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
