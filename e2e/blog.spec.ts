// The blog: a list at /blog and one page per post from src/data/posts.ts.
import { test, expect } from "@playwright/test";

test("/blog lists the first post and links to it", async ({ page }) => {
  await page.goto("/blog?lang=pl");
  await page.waitForLoadState("networkidle");
  const link = page.locator(".blog-item h2 a").first();
  await expect(link).toHaveAttribute("href", "/blog/claude-autoshutdown");
  // it was noindex while empty; with a post it must be indexable
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
  await link.click();
  await expect(page).toHaveURL(/\/blog\/claude-autoshutdown/);
  await expect(page.locator("h1.post-h1")).toContainText("Claude Code");
});

test("a post renders headings, screenshot, code and the repo link", async ({ page }) => {
  await page.goto("/blog/claude-autoshutdown?lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".post-h2")).not.toHaveCount(0);
  const img = page.locator(".post-fig img");
  await expect(img).toBeVisible();
  expect(await img.evaluate((i: HTMLImageElement) => i.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".post-code")).toContainText("git clone");
  await expect(page.locator(".post-repo")).toHaveAttribute(
    "href",
    "https://github.com/kamiljan11/claude-autoshutdown",
  );
  const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(ld).toContain("BlogPosting");
  // the body never runs wider than the phone or the reading column
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("an unknown post is a 404, not an empty page", async ({ page }) => {
  const res = await page.goto("/blog/nie-ma-takiego-wpisu");
  expect(res?.status()).toBe(404);
});
