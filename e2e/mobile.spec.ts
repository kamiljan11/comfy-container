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

test("the chat panel's own links are 44 px tap targets", async ({ page }) => {
  // Measured with the panel OPEN: closed it renders at scale(.97), so every control
  // in it reads 43 px in an audit while really being 44. These two links were the
  // genuine miss at 60x30.
  await load(page, "/?lang=pl");
  await page.locator(".chatbot-fab").click();
  // the panel animates from scale(.97) to its full size; measuring before that
  // settles reads 43.7 px even when the rule is right
  await expect(page.locator(".chatbot-panel")).toHaveCSS("transform", "none");
  const foot = page.locator(".chatbot-foot a");
  await expect(foot.first()).toBeVisible();
  const heights = await foot.evaluateAll((els) =>
    els.map((el) => el.getBoundingClientRect().height),
  );
  expect(heights.length).toBeGreaterThan(0);
  for (const h of heights) expect(h).toBeGreaterThanOrEqual(44);
});

test("the lead form's error links are 44 px tap targets too", async ({ page }) => {
  // The same rule covers `.chatbot-lead-err a`. The error state is reached by
  // failing the submit at the network layer, so no lead is actually sent.
  await load(page, "/?lang=pl");
  await page.route("**/_serverFn/**", (route) =>
    route.fulfill({ status: 500, contentType: "application/json", body: "{}" }),
  );
  await page.locator(".chatbot-fab").click();
  await expect(page.locator(".chatbot-panel")).toHaveCSS("transform", "none");
  await page.locator(".chatbot-starter.chatbot-cta").click();
  const fields = page.locator(".chatbot-lead-in");
  await fields.nth(0).fill("E2E");
  await fields.nth(1).fill("e2e@example.com");
  await fields.nth(2).fill("checking the error state");
  await page.locator(".chatbot-lead-send").click();
  const links = page.locator(".chatbot-lead-err a");
  await expect(links.first()).toBeVisible();
  const heights = await links.evaluateAll((els) =>
    els.map((el) => el.getBoundingClientRect().height),
  );
  expect(heights.length).toBeGreaterThan(0);
  for (const h of heights) expect(h).toBeGreaterThanOrEqual(44);
});
