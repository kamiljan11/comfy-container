// Kamil: "Wybrane projekty" rows slide in from alternating sides on scroll.
// Desktop only; the phone carousel keeps its rows still.
import { test, expect } from "@playwright/test";

test("project rows start offset left, right, left, then settle at 0", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/?lang=pl");
  await page.waitForLoadState("networkidle");
  const rows = page.locator(".work-table .work-row");
  expect(await rows.count()).toBeGreaterThan(2);
  const before = await rows.evaluateAll((els) =>
    els.slice(0, 3).map((e) => ({
      visible: e.classList.contains("visible"),
      x: new DOMMatrixReadOnly(getComputedStyle(e).transform).m41,
    })),
  );
  // rows below the fold have not been revealed yet: odd from the left, even from the right
  for (const [i, r] of before.entries()) {
    if (!r.visible) expect(Math.sign(r.x)).toBe(i % 2 === 0 ? -1 : 1);
  }
  await page.locator("#work").scrollIntoViewIfNeeded();
  await rows.nth(2).scrollIntoViewIfNeeded();
  await expect(rows.nth(0)).toHaveClass(/visible/);
  await expect
    .poll(() =>
      rows.nth(1).evaluate((e) => new DOMMatrixReadOnly(getComputedStyle(e).transform).m41),
    )
    .toBe(0);
});
