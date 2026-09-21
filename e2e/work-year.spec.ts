// "Wybrane projekty": the year speaks the page's language, and the hover arrow
// never lands on it (Kamil's screenshot showed the arrow over "2021–now").
import { test, expect } from "@playwright/test";

test("the Polish page says 'obecnie', and the hover arrow clears the year", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?lang=pl");
  await page.waitForLoadState("networkidle");
  const row = page.locator(".work-row-link").first();
  await row.scrollIntoViewIfNeeded();
  await expect(row.locator(".work-year")).toContainText("obecnie");
  await row.hover();
  await page.waitForTimeout(400);
  const year = await row.locator(".work-year").boundingBox();
  const arrow = await row.locator(".work-arrow").boundingBox();
  expect(year && arrow).toBeTruthy();
  if (year && arrow) expect(arrow.x).toBeGreaterThanOrEqual(year.x + year.width);
});
