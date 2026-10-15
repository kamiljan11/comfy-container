// /claude is ~30 screens on a phone. The page map at the top replaced the collapsed table of contents:
// a card per part with a link to every section. These checks pin that it lists every section, that its
// links land on the heading they name, and that the anchors stay the same when the language changes
// (a shared /claude#review link must open the same section in either language).
import { test, expect } from "@playwright/test";

test("the page map links every section and jumps to one", async ({ page }) => {
  await page.goto("/claude?lang=pl");
  await page.waitForLoadState("networkidle");

  const map = page.locator(".pm-grid");
  await expect(map).toBeVisible();

  // one link per section heading (all h2 except the map's own)
  const headings = await page.locator(".cv-paper h2[id]:not(#page-map)").count();
  const links = map.locator(".pm-links a");
  await expect(links).toHaveCount(headings);

  const third = links.nth(2);
  const label = (await third.innerText()).trim();
  const href = await third.getAttribute("href");
  await third.click();

  expect(new URL(page.url()).hash).toBe(href);
  const target = page.locator(`#${String(href).slice(1)}`);
  await expect(target).toHaveText(label);
  await expect(target).toBeInViewport();

  // every part divider links back to the map
  await page.locator(".pm-divider-up").first().click();
  await expect(page.locator("#page-map")).toBeInViewport();
});

test("the map follows the language switch, and the anchors stay put", async ({ page }) => {
  await page.goto("/claude?lang=pl");
  await page.waitForLoadState("networkidle");

  const links = page.locator(".pm-links a");
  const pl = await links.allInnerTexts();
  const plHrefs = await links.evaluateAll((els) => els.map((a) => a.getAttribute("href")));

  await page.locator(".lang-toggle").click();

  await expect(async () => {
    const en = await links.allInnerTexts();
    expect(en[0]).not.toBe(pl[0]);
    const enHrefs = await links.evaluateAll((els) => els.map((a) => a.getAttribute("href")));
    expect(enHrefs).toEqual(plHrefs);
    await expect(page.locator(String(enHrefs[0]))).toHaveText((en[0] ?? "").trim());
  }).toPass({ timeout: 10_000 });
});
