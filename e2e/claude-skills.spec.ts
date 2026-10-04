// /claude has two tabs: the system (default) and ?tab=skills (catalogue of skills and reviewer agents).
// The tab is a shareable link, so switching must keep ?lang= and mark exactly one tab as current.
import { test, expect } from "@playwright/test";

test("skills tab: cards, one current tab, links to GitHub", async ({ page }) => {
  await page.goto("/claude?tab=skills&lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".hm-tab[aria-current='page']")).toHaveText("Skille i agenci");
  expect(await page.locator(".hm-card").count()).toBeGreaterThan(10);
  const link = page.locator(".hm-card a.hm-link").first();
  await expect(link).toHaveAttribute(
    "href",
    /github\.com\/kamiljan11\/coding-higher-mind\/tree\/main\//,
  );
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

test("switching tabs keeps the language in the URL", async ({ page }) => {
  await page.goto("/claude?tab=skills&lang=pl");
  await page.waitForLoadState("networkidle");
  await page.locator(".hm-tab", { hasText: "System" }).click();
  await expect(page).toHaveURL(/lang=pl/);
  await expect(page).not.toHaveURL(/tab=skills/);
  await expect(page.locator(".hm-tab[aria-current='page']")).toHaveText("System");
  await page.locator(".hm-tab", { hasText: "Skille i agenci" }).click();
  await expect(page).toHaveURL(/tab=skills/);
  await expect(page).toHaveURL(/lang=pl/);
});

test("no horizontal scroll on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/claude?tab=skills&lang=en");
  await page.waitForLoadState("networkidle");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
});
