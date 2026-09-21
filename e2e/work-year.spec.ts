// "Wybrane projekty": the year speaks the page's language, never wraps, and
// the hover arrow never lands on it (Kamil's screenshot showed the arrow over
// "2021–now"). Waits on the arrow's own end state, not on a timer.
import { test, expect, type Page } from "@playwright/test";

async function firstRow(page: Page, lang: "pl" | "en") {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`/?lang=${lang}`);
  await page.waitForLoadState("networkidle");
  const row = page.locator(".work-row-link").first();
  await row.scrollIntoViewIfNeeded();
  // the row slides in on reveal; hovering a moving row loses the pointer
  await expect(row).toHaveClass(/visible/);
  await expect
    .poll(() => row.evaluate((e) => new DOMMatrixReadOnly(getComputedStyle(e).transform).m42))
    .toBe(0);
  return row;
}

for (const [lang, label] of [
  ["pl", "obecnie"],
  ["en", "now"],
] as const) {
  test(`${lang}: the year reads '${label}', stays on one line, and the arrow clears it`, async ({
    page,
  }) => {
    const row = await firstRow(page, lang);
    const year = row.locator(".work-year");
    await expect(year).toContainText(label);
    await expect(year).toHaveCSS("white-space", "nowrap");
    await row.hover();
    const arrow = row.locator(".work-arrow");
    await expect(arrow).toHaveCSS("opacity", "1");
    // settled: the transform is back to no horizontal offset
    await expect
      .poll(() => arrow.evaluate((e) => new DOMMatrixReadOnly(getComputedStyle(e).transform).m41))
      .toBe(0);
    const y = await year.boundingBox();
    const a = await arrow.boundingBox();
    expect(y && a).toBeTruthy();
    if (y && a) expect(a.x).toBeGreaterThanOrEqual(y.x + y.width);
  });
}
