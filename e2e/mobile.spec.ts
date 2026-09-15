// Phone-sized checks for the mobile pass (PR #42). Runs in the "mobile" project
// (Pixel 7 emulation, 412 px wide, touch); the desktop project skips this file.
// Each test pins a problem the mobile audit measured, so it cannot come back unnoticed.
import { test, expect, type Page } from "@playwright/test";

const ROUTES = [
  "/?lang=pl",
  "/uslugi/systemy-dla-firm",
  "/obszary/sprzedaz-i-marketing",
  "/case-studies?lang=pl",
  "/claude?lang=pl",
  "/kontakt",
  "/o-mnie",
];

async function load(page: Page, route: string) {
  await page.goto(route);
  await page.waitForLoadState("networkidle");
}

for (const route of ROUTES) {
  test(`${route} does not scroll sideways`, async ({ page }) => {
    await load(page, route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("/o-mnie keeps the portrait below the contact text", async ({ page }) => {
  // A desktop `.contact:has(+ .beyond)` rule used to outrank the phone padding here,
  // and the portrait slid 257 px up under the heading.
  await load(page, "/o-mnie");
  const gap = await page.evaluate(() => {
    const inner = document.querySelector(".contact .contact-inner");
    const photo = document.querySelector(".contact .contact-photo");
    if (!inner || !photo) return null;
    return photo.getBoundingClientRect().top - inner.getBoundingClientRect().bottom;
  });
  expect(gap).not.toBeNull();
  expect(gap).toBeGreaterThanOrEqual(0);
});

test("service page sibling links are 44 px tap targets", async ({ page }) => {
  await load(page, "/uslugi/systemy-dla-firm");
  const heights = await page
    .locator(".sl-more-link")
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
  expect(heights.length).toBeGreaterThan(0);
  for (const h of heights) expect(h).toBeGreaterThanOrEqual(44);
});

test("contact form fields are at least 16 px, so iOS does not zoom", async ({ page }) => {
  await load(page, "/kontakt");
  const sizes = await page
    .locator(".kontakt-form input, .kontakt-form textarea")
    .evaluateAll((els) => els.map((el) => parseFloat(getComputedStyle(el).fontSize)));
  expect(sizes.length).toBeGreaterThan(0);
  for (const s of sizes) expect(s).toBeGreaterThanOrEqual(16);
});
