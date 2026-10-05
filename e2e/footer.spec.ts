// One footer on every route (Kamil: most subpages had none). It is rendered by
// __root, so a page cannot forget it and none can have two.
import { test, expect } from "@playwright/test";

const PAGES = [
  "/",
  "/o-mnie",
  "/uslugi",
  "/uslugi/integracje",
  "/obszary/dane-i-raporty",
  "/case-studies",
  "/blog",
  "/kontakt",
  "/ksiazki",
  "/claude",
  "/cv",
];

for (const path of PAGES) {
  test(`${path} ends with the site footer`, async ({ page }) => {
    await page.goto(`${path}?lang=pl`);
    await page.waitForLoadState("networkidle");
    const footer = page.locator("footer.sf");
    await expect(footer).toHaveCount(1);
    await expect(footer.locator('a[href="/uslugi/integracje"]')).toHaveCount(1);
    await expect(footer.locator('a[href="/cv"]')).toHaveCount(1);
    await expect(footer.locator('a[href="mailto:hello@kamiljan.com"]')).toHaveCount(1);
    // nothing on the page comes after it
    const last = await page.evaluate(() => {
      const f = document.querySelector("footer.sf");
      let n = f?.nextElementSibling;
      while (n && (getComputedStyle(n).position === "fixed" || n.tagName === "SCRIPT"))
        n = n.nextElementSibling;
      return n ? n.outerHTML.slice(0, 80) : null;
    });
    expect(last).toBeNull();
  });
}

test("desktop footer shows every column open, with no accordion", async ({ page }) => {
  await page.goto("/?lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("footer.sf .sf-fold")).toHaveCount(0);
  await expect(page.locator('footer.sf a[href="/uslugi/integracje"]')).toBeVisible();
});

// the fold and its one-column CSS share one threshold: at 768 px the CSS
// stacked the columns while the fold (then < 768) left them open, 1479 px tall
for (const [width, folds] of [
  [767, 3],
  [768, 3],
  [769, 0],
] as const) {
  test(`at ${width} px the footer has ${folds} folded columns`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/?lang=pl");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("footer.sf .sf-fold")).toHaveCount(folds);
    if (folds) {
      const height = await page
        .locator("footer.sf")
        .evaluate((f) => f.getBoundingClientRect().height);
      expect(height).toBeLessThan(1000);
    }
  });
}

test("the CV prints without the footer", async ({ page }) => {
  await page.goto("/cv?lang=pl");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("footer.sf")).toBeHidden();
});
