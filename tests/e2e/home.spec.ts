import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("home", () => {
  test("renders hero and primary sections @smoke", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /built from scratch\. shipped to production/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /email me/i })).toBeVisible();
  });

  test("toggles theme", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /switch to (dark|light) theme/i });
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("class", /dark|light/);
  });

  test("has no serious axe violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const serious = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    expect(serious).toEqual([]);
  });

  test("csp meta is present", async ({ page }) => {
    await page.goto("/");
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]');
    await expect(csp).toHaveCount(1);
  });
});

test.describe("projects", () => {
  test("opens a case study @smoke", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /open case study/i })
      .first()
      .click();
    await expect(page.getByText(/problem/i).first()).toBeVisible();
  });
});

test.describe("404", () => {
  test("shows not found page", async ({ page }) => {
    const response = await page.goto("/does-not-exist/");
    // Static hosts may still return 200 for custom 404.html fallbacks
    expect(response?.status()).toBeLessThan(500);
    await expect(page.getByRole("heading", { name: /not on the map/i })).toBeVisible();
  });
});
