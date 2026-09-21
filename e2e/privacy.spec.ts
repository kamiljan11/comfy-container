// GDPR notice: every form links the policy, the footer links it, the page exists.
import { test, expect } from "@playwright/test";

test("the policy page names the controller", async ({ page }) => {
  const res = await page.goto("/polityka-prywatnosci?lang=pl");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("Polityka prywatności");
  await expect(page.locator(".post-body")).toContainText("Kamil Jan Włodarczyk");
});

test("a consultation form links the policy", async ({ page }) => {
  await page.goto("/uslugi/integracje?lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(
    page.locator('#sl-cta .kontakt-privacy a[href="/polityka-prywatnosci"]'),
  ).toHaveCount(1);
});

test("the footer links the policy", async ({ page }) => {
  await page.goto("/blog?lang=pl");
  await expect(page.locator('footer.sf a[href="/polityka-prywatnosci"]')).toHaveCount(1);
});
