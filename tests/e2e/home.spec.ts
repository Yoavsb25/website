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

  test("csp meta is present and precedes the first script tag", async ({ page }) => {
    // Checked against the raw response, not the hydrated DOM: React's head
    // management removes this meta tag on hydration, but a meta CSP is
    // applied by the browser as soon as it's parsed and stays in effect for
    // the page, so the raw HTML order is what actually matters here.
    const response = await page.goto("/");
    const html = await response!.text();
    const cspIndex = html.indexOf('http-equiv="Content-Security-Policy"');
    const firstScriptIndex = html.indexOf("<script");
    expect(cspIndex).toBeGreaterThan(-1);
    expect(cspIndex).toBeLessThan(firstScriptIndex);
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

async function expectNoSeriousAxeViolations(page: import("@playwright/test").Page) {
  // Web font loading can shift paint timing enough for axe's color-contrast
  // check to sample mid-render pixels; wait for fonts to settle first.
  await page.evaluate(() => document.fonts.ready);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const serious = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? ""),
  );
  expect(serious).toEqual([]);
}

test.describe("accessibility", () => {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`home has no serious axe violations (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto("/");
      await expectNoSeriousAxeViolations(page);
    });
  }

  test("project case study has no serious axe violations", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /open case study/i })
      .first()
      .click();
    await expectNoSeriousAxeViolations(page);
  });

  test("404 page has no serious axe violations", async ({ page }) => {
    await page.goto("/does-not-exist/");
    await expectNoSeriousAxeViolations(page);
  });
});
