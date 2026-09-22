import { expect, test } from "@playwright/test";

test.describe("visual", () => {
  test("home hero light", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page.evaluate(() => document.documentElement.classList.remove("dark"));
    await expect(page.locator("main")).toHaveScreenshot("home-hero-light.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("home hero dark", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await expect(page.locator("main")).toHaveScreenshot("home-hero-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
  });
});
