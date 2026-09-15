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

/**
 * Pick a case study the way a keyboard user does: type its exact title, check it is
 * the selected row, press Enter. Clicking deep list rows proved flaky on CI (after the
 * list scrolled, the click point landed on the dialog overlay), and the thing under
 * test is the router-hash behaviour after the jump, not the pointer.
 */
async function selectCase(page: Page, slug: string) {
  const row = page.locator(`[cmdk-item][data-value="case:${slug}"]`);
  const title = (await row.locator(".cmdp-label").innerText()).trim();
  await page.keyboard.type(title);
  await expect(page.locator('[cmdk-item][data-selected="true"]')).toHaveAttribute(
    "data-value",
    `case:${slug}`,
  );
}

async function pickCase(page: Page, slug: string) {
  await selectCase(page, slug);
  await page.keyboard.press("Enter");
  // wait until the dialog is gone, not just closing, before the next step
  await expect(page.locator('[role="dialog"].cmdp')).toHaveCount(0);
}

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

  // Jump, then press Ctrl+K at once, while the palette is still animating closed:
  // the reopened dialog must start with an empty search, not the title just typed
  // (the mounted content used to keep it, and the next pick found nothing).
  await selectCase(page, first);
  // mark this dialog element, so the reopen can prove it landed inside the close
  // animation (same element back) rather than on a fresh mount, where an empty
  // search would pass without testing anything
  await dialog(page).evaluate((el) => el.setAttribute("data-e2e-first-opening", ""));
  await page.keyboard.press("Enter");
  await page.keyboard.press("Control+k");
  await expect(dialog(page)).toBeVisible();
  await expect(dialog(page)).toHaveAttribute("data-e2e-first-opening", "");
  await expect(dialog(page).locator("[cmdk-input]")).toHaveValue("");
  await expect(page).toHaveURL(
    (url) => url.pathname === "/case-studies" && url.hash === `#${first}`,
  );
  await expect(page.locator(`details#${first}`)).toHaveAttribute("open", "");

  await pickCase(page, second);
  await expect(page).toHaveURL(
    (url) => url.pathname === "/case-studies" && url.hash === `#${second}`,
  );
  await expect(dialog(page)).toBeHidden();
  await expect(page.locator(`details#${second}`)).toHaveAttribute("open", "");
});
