// /claude runs 16 screens on a phone. The table of contents (PR: feat/claude-toc)
// is built from the page's own headings after mount, so these checks pin that it
// appears, matches the headings, and actually jumps.
import { test, expect } from "@playwright/test";

test("the table of contents lists the page's sections and jumps to one", async ({ page }) => {
  await page.goto("/claude?lang=pl");
  await page.waitForLoadState("networkidle");

  const toc = page.locator(".ptoc");
  await expect(toc).toBeVisible();

  // one row per heading on the page, and the count badge agrees
  const headings = await page.locator(".cv-paper h2").count();
  const rows = toc.locator(".ptoc-list a");
  await expect(rows).toHaveCount(headings);
  await expect(toc.locator(".ptoc-count")).toHaveText(String(headings));

  // collapsed by default: the page is the content, not the list
  await expect(toc.locator(".ptoc-list")).toBeHidden();
  await toc.locator(".ptoc-sum").click();
  await expect(toc.locator(".ptoc-list")).toBeVisible();

  const third = rows.nth(2);
  const label = (await third.innerText()).trim();
  const href = await third.getAttribute("href");
  await third.click();

  expect(new URL(page.url()).hash).toBe(href);
  // the heading it points at carries that id and is on screen
  const target = page.locator(`#${String(href).slice(1)}`);
  await expect(target).toHaveText(label);
  await expect(target).toBeInViewport();
});

test("the list follows the language switch, labels and fragments both", async ({ page }) => {
  // The server renders English and the language hook switches the page in the
  // browser; a list built once kept the headings the reader never saw, and the
  // ids kept the language it first mounted in.
  await page.goto("/claude?lang=pl");
  await page.waitForLoadState("networkidle");

  const toc = page.locator(".ptoc");
  await toc.locator(".ptoc-sum").click();
  const rows = toc.locator(".ptoc-list a");
  const pl = await rows.allInnerTexts();
  const plHref = await rows.first().getAttribute("href");

  await page.locator(".lang-toggle").click();
  await expect(page.locator(".cv-paper h2").first()).not.toHaveText(pl[0] ?? "");

  await expect(async () => {
    const en = await rows.allInnerTexts();
    expect(en[0]).not.toBe(pl[0]);
    const enHref = await rows.first().getAttribute("href");
    expect(enHref).not.toBe(plHref);
    // and the link still lands on the heading it names
    const target = page.locator(`#${String(enHref).slice(1)}`);
    await expect(target).toHaveText((en[0] ?? "").trim());
  }).toPass({ timeout: 10_000 });
});
