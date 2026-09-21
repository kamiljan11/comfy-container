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

test("the CV prints without the footer", async ({ page }) => {
  await page.goto("/cv?lang=pl");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("footer.sf")).toBeHidden();
});
