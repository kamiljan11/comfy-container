// /ksiazki: both books readable as a flipbook (ADR 0005). Checks it turns
// pages by button and keyboard, switches books, only downloads the pages
// near the one being read, and logs no errors.
import { test, expect } from "@playwright/test";

test("the reader turns pages, switches books and loads only nearby pages", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/ksiazki?lang=pl");
  await page.waitForLoadState("networkidle");

  const count = page.locator(".bf-count");
  await expect(count).toHaveText("Strona 1 / 99");
  // a 99-page book should not ask for 99 images up front
  const withSrc = await page.locator(".bf-page img").count();
  expect(withSrc).toBeGreaterThan(0);
  expect(withSrc).toBeLessThanOrEqual(12);

  await page.getByRole("button", { name: "Następna strona" }).click();
  await expect(count).not.toHaveText("Strona 1 / 99");
  // desktop keeps the soft page curl; phones get hard pages (e2e/mobile.spec.ts)
  expect(await page.locator('.bf-page[data-density="hard"]').count()).toBe(0);

  await page.locator(".bf-stage").focus();
  const before = await count.textContent();
  await page.keyboard.press("ArrowRight");
  await expect(count).not.toHaveText(before ?? "");
  // go far enough that the cover leaves the loaded window (WINDOW = 4)
  for (let i = 0; i < 3; i++) {
    const at = await count.textContent();
    await page.keyboard.press("ArrowRight");
    await expect(count).not.toHaveText(at ?? "");
  }
  await expect(page.locator('.bf-page img[src$="/short/p-001.webp"]')).toHaveCount(0);

  await page.getByRole("button", { name: /Pełny/ }).click();
  await expect(count).toHaveText("Strona 1 / 199");
  // and the new book really opens on its cover, not on the old book's page
  await expect(page.locator('.bf-page img[src$="/full/p-001.webp"]')).toHaveCount(1);

  expect(errors).toEqual([]);
});

test("a card's read button brings the reader into view", async ({ page }) => {
  await page.goto("/ksiazki?lang=pl");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Czytaj na stronie" }).first().click();
  await expect(page.locator("#books-reader")).toBeInViewport();
});

test("a crash inside the flipbook shows the fallback and keeps the PDFs", async ({ page }) => {
  // make the flipbook throw while rendering: its first call to matchMedia
  // (the reduced-motion check) fails, and only when called from BookFlip
  await page.addInitScript(() => {
    const real = window.matchMedia.bind(window);
    window.matchMedia = (q: string) => {
      if (q.includes("reduced-motion") && /BookFlip/.test(new Error().stack ?? "")) {
        throw new Error("test crash");
      }
      return real(q);
    };
  });
  const logged: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") logged.push(m.text());
  });
  await page.goto("/ksiazki?lang=pl");
  await expect(page.locator(".books-reader-error")).toContainText("Czytnik nie wczytał się");
  await expect(page.getByRole("link", { name: "Pobierz PDF" }).first()).toBeVisible();
  expect(logged.some((t) => t.includes("[books] flipbook crashed"))).toBe(true);
});

test("narrowing the window switches to hard pages and keeps the page", async ({ page }) => {
  await page.goto("/ksiazki?lang=pl");
  const count = page.locator(".bf-count");
  await expect(count).toHaveText("Strona 1 / 99", { timeout: 20000 });
  await page.getByRole("button", { name: "Następna strona" }).click();
  await expect(count).toHaveText("Strona 2 / 99");
  expect(await page.locator('.bf-page[data-density="hard"]').count()).toBe(0);
  // a phone rotated to portrait, or a split screen
  await page.setViewportSize({ width: 412, height: 900 });
  await expect(page.locator('.bf-page[data-density="hard"]')).toHaveCount(99);
  await expect(count).toHaveText("Strona 2 / 99");
  await page.getByRole("button", { name: "Następna strona" }).click();
  await expect(count).toHaveText("Strona 3 / 99");
});
