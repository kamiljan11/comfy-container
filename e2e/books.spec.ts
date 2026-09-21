// The books live on /ksiazki only: the folded "Beyond work" aside was removed
// from /o-mnie (Kamil, 2026-09-21) and its flowing waves moved to the books page.
import { test, expect } from "@playwright/test";

test("/ksiazki has the flowing waves behind the books", async ({ page }) => {
  await page.goto("/ksiazki?lang=pl");
  await page.waitForLoadState("networkidle");
  const waves = page.locator(".books-page > .flow-waves .flow-wave");
  await expect(waves).toHaveCount(3);
  await expect(page.locator(".books-page > .flow-waves")).toHaveAttribute("aria-hidden", "true");
  // the waves sit behind the content: the download buttons stay clickable
  await expect(page.locator(".books-card a[download]").first()).toBeVisible();
  const z = await page.evaluate(
    () => getComputedStyle(document.querySelector(".books-page > .container")!).zIndex,
  );
  expect(z).toBe("1");
});

test("/o-mnie no longer carries the books aside", async ({ page }) => {
  await page.goto("/o-mnie?lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("#beyond, .flow-waves")).toHaveCount(0);
});
