// Command palette (PR #38): opens from the header button and with Ctrl+K,
// navigates, and opens the case study it jumps to — also on the second jump
// within /case-studies. That second jump is the regression: a router
// navigation renders before pushState, so the page used to read the previous
// hash and open the previous study (src/lib/caseStudyHash.ts).
import { test, expect, type Page } from "@playwright/test";

// the palette's own dialog: the home page also has the chat bot panel, which
// is a role="dialog" too
// Only an OPEN palette counts: after a jump the closing dialog stays in the DOM
// for its exit animation, and treating it as open made the next step race it.
const dialog = (page: Page) => page.locator('[role="dialog"].cmdp[data-state="open"]');

/** Open with Ctrl+K once the page has hydrated (the shortcut is a client listener). */
async function openWithShortcut(page: Page) {
  await expect(async () => {
    if (!(await dialog(page).isVisible())) await page.keyboard.press("Control+k");
    await expect(dialog(page)).toBeVisible({ timeout: 1_000 });
  }).toPass({ timeout: 15_000 });
}

test("the header button and Ctrl+K open the palette, Escape closes it", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.locator(".nav-search").click();
  await expect(dialog(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog(page)).toBeHidden();

  await openWithShortcut(page);
});

test("typing filters without diacritics and Enter opens the page", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await openWithShortcut(page);

  // the home page is English; the Polish address still finds the services page
  await page.keyboard.type("uslugi");
  await expect(page.locator("[cmdk-item]").first()).toHaveAttribute("data-selected", "true");
  await page.keyboard.press("Enter");
  // the language hook keeps ?lang= in the address, so compare the path only
  await expect(page).toHaveURL((url) => url.pathname === "/uslugi");
  await expect(dialog(page)).toBeHidden();
});

test("two jumps on /case-studies each open the study they point at", async ({ page }) => {
  await page.goto("/case-studies");
  await page.waitForLoadState("networkidle");
  await openWithShortcut(page);

  const slugs = await page
    .locator('[cmdk-item][data-value^="case:"]')
    .evaluateAll((els) => els.map((el) => (el.getAttribute("data-value") ?? "").slice(5)));
  expect(slugs.length).toBeGreaterThan(8);
  const [first, second] = [slugs[3], slugs[8]];

  await page.locator(`[cmdk-item][data-value="case:${first}"]`).click();
  await expect(page).toHaveURL(
    (url) => url.pathname === "/case-studies" && url.hash === `#${first}`,
  );
  await expect(dialog(page)).toBeHidden();
  await expect(page.locator(`details#${first}`)).toHaveAttribute("open", "");

  await openWithShortcut(page);
  await page.locator(`[cmdk-item][data-value="case:${second}"]`).click();
  await expect(page).toHaveURL(
    (url) => url.pathname === "/case-studies" && url.hash === `#${second}`,
  );
  await expect(dialog(page)).toBeHidden();
  await expect(page.locator(`details#${second}`)).toHaveAttribute("open", "");
});
