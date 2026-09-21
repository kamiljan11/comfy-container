// Added with the letsautomate comparison: area pages list concrete uses, every
// page has a mid-page way to the form and answers "is it secure".
import { test, expect } from "@playwright/test";

test("an area page lists its uses and a mid-page link to the form", async ({ page }) => {
  await page.goto("/obszary/obsluga-klienta?lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("#sl-uses .sl-use")).toHaveCount(10);
  const mid = page.locator(".sl-mid a");
  await expect(mid).toHaveAttribute("href", "#sl-cta");
  await mid.click();
  await expect(page.locator("#sl-cta")).toBeInViewport();
});

test("a service page has the mid-page link but no use catalogue", async ({ page }) => {
  await page.goto("/uslugi/integracje?lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("#sl-uses")).toHaveCount(0);
  await expect(page.locator(".sl-mid a")).toHaveCount(1);
});

test("every page answers the security question, also in its FAQ schema", async ({ page }) => {
  await page.goto("/uslugi/systemy-dla-firm?lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".sl-faq-q-text", { hasText: "Czy to jest bezpieczne?" })).toHaveCount(
    1,
  );
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ld.join("")).toContain("Czy to jest bezpieczne?");
});
