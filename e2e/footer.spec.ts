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

test("desktop footer shows every column open", async ({ page }) => {
  await page.goto("/?lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("footer.sf .sf-fold[open]")).toHaveCount(3);
  await expect(page.locator('footer.sf a[href="/uslugi/integracje"]')).toBeVisible();
  // a screen reader can still activate the summary; the column reopens
  await page
    .locator("footer.sf .sf-sum")
    .first()
    .evaluate((el) => (el as HTMLElement).click());
  await expect(page.locator("footer.sf .sf-fold[open]")).toHaveCount(3);
});

test("the footer folds and unfolds when the viewport crosses 768 px", async ({ page }) => {
  // rotating a tablet or resizing a window after hydration
  await page.goto("/?lang=pl");
  await page.waitForLoadState("networkidle");
  const open = page.locator("footer.sf .sf-fold[open]");
  await expect(open).toHaveCount(3);
  await page.setViewportSize({ width: 400, height: 900 });
  await expect(open).toHaveCount(0);
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(open).toHaveCount(3);
});

test.describe("desktop without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("the closed columns are still shown", async ({ page }) => {
    // the server sends closed <details>; site.css shows their content on a
    // desktop before (or without) hydration setting them open
    await page.goto("/?lang=pl", { waitUntil: "domcontentloaded" });
    await expect(page.locator("footer.sf .sf-fold[open]")).toHaveCount(0);
    await expect(page.locator('footer.sf a[href="/uslugi/integracje"]')).toBeVisible();
  });
});

// the fold and its one-column CSS share one threshold: at 768 px the CSS
// stacked the columns while the fold (then < 768) left them open, 1479 px tall
for (const [width, open] of [
  [767, 0],
  [768, 0],
  [769, 3],
] as const) {
  test(`at ${width} px ${open} footer columns are open`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/?lang=pl");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("footer.sf .sf-fold[open]")).toHaveCount(open);
    if (!open) {
      const height = await page
        .locator("footer.sf")
        .evaluate((f) => f.getBoundingClientRect().height);
      expect(height).toBeLessThan(1000);
    }
  });
}

test("on a tablet the chat bubble does not cover the footer's last line", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 1000 });
  await page.goto("/?lang=pl");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const fab = (await page.locator(".chatbot-fab").boundingBox())!;
  const lines = await page
    .locator(".sf-bottom > *")
    .evaluateAll((els) => els.map((e) => e.getBoundingClientRect().toJSON() as DOMRect));
  for (const r of lines) {
    const overlaps =
      r.right > fab.x &&
      r.left < fab.x + fab.width &&
      r.bottom > fab.y &&
      r.top < fab.y + fab.height;
    expect(overlaps, JSON.stringify(r)).toBe(false);
  }
});

test("the CV prints without the footer", async ({ page }) => {
  await page.goto("/cv?lang=pl");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("footer.sf")).toBeHidden();
});
