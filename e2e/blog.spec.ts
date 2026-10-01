// The blog: a list at /blog and one page per post from src/data/posts.ts.
import { test, expect } from "@playwright/test";

const EXTERNAL = "https://torzeszow.pl/news/oszusci-moga-podrobic-glos-wnuczka";

test("/blog lists the posts newest first and links to them", async ({ page }) => {
  await page.goto("/blog?lang=pl");
  await page.waitForLoadState("networkidle");
  const first = page.locator(".blog-item h2 a").first();
  await expect(first).toHaveAttribute("href", "/blog/oszusci-moga-podrobic-glos-wnuczka");
  // it was noindex while empty; with a post it must be indexable
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
  // every card opens with a thumbnail that actually loaded
  const cards = page.locator(".blog-item");
  const thumbs = page.locator(".blog-item .blog-thumb img");
  await expect(thumbs).toHaveCount(await cards.count());
  for (const img of await thumbs.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toBeVisible();
    await expect
      .poll(() => img.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth))
      .toBeGreaterThan(0);
  }
  const link = page.locator('.blog-item h2 a[href="/blog/claude-autoshutdown"]');
  await link.click();
  await expect(page).toHaveURL(/\/blog\/claude-autoshutdown/);
  await expect(page.locator("h1.post-h1")).toContainText("Claude Code");
});

test("a post published elsewhere is labelled on the list and opens out in a new tab", async ({
  page,
}) => {
  await page.goto("/blog?lang=pl");
  await page.waitForLoadState("networkidle");
  const card = page.locator(".blog-item", {
    has: page.locator('a[href="/blog/oszusci-moga-podrobic-glos-wnuczka"]'),
  });
  await expect(card.locator(".blog-source")).toContainText("toRzeszów.pl");
  // only the external post carries the label
  await expect(page.locator(".blog-source")).toHaveCount(1);

  await card.locator("h2 a").click();
  await expect(page).toHaveURL(/\/blog\/oszusci-moga-podrobic-glos-wnuczka/);
  const out = page.locator(".post-external a").first();
  await expect(out).toContainText("Czytaj cały artykuł na toRzeszów.pl");
  await expect(out).toHaveAttribute("href", EXTERNAL);
  await expect(out).toHaveAttribute("target", "_blank");
  await expect(out).toHaveAttribute("rel", /noopener/);
  await expect(page.locator(".post-body strong").first()).toBeVisible();
  const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(ld).toContain(EXTERNAL);
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
  await expect(page.locator(".post-external")).toHaveCount(0);
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
