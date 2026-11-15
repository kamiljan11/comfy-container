// The last part of /claude: the short versions and the questions with answers. An answer opens with a click
// or the keyboard, the page map lists the new part, and on paper every answer is printed, while the
// explanation panels from the figures print only when opened.
import { test, expect } from "@playwright/test";

test("a question opens its answer with a click and with the keyboard", async ({ page }) => {
  await page.goto("/claude?lang=en");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("#in-30-seconds")).toHaveText("In 30 seconds");
  const items = page.locator(".faq-item");
  await expect(items).toHaveCount(25);

  const first = items.first();
  await expect(first.locator(".faq-a")).toBeHidden();
  await first.locator(".faq-q").click();
  await expect(first.locator(".faq-a")).toBeVisible();

  const second = items.nth(1);
  await second.locator(".faq-q").focus();
  await page.keyboard.press("Enter");
  await expect(second.locator(".faq-a")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(second.locator(".faq-a")).toBeHidden();
});

test("the page map lists the new part and its sections", async ({ page }) => {
  await page.goto("/claude?lang=pl");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".pm-card").last().locator(".pm-title")).toHaveText(
    "W skrócie i pytania",
  );
  await expect(page.locator('.pm-links a[href="#faq-developers"]')).toHaveText(
    "Pytania programistów",
  );
});

test("on paper every answer prints, and only an opened explanation panel prints", async ({
  page,
}) => {
  await page.goto("/claude?lang=en");
  await page.waitForLoadState("networkidle");
  await page.locator(".ax-wrap").first().locator(".ax-chip").first().click();
  const opened = await page.locator(".faq-item[open]").count();

  // emulateMedia changes the CSS only; the print events are what a real print dialog sends
  await page.emulateMedia({ media: "print" });
  // twice: some browsers send beforeprint again (print preview re-renders) before one afterprint
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
  const items = page.locator(".faq-item");
  await expect(page.locator(".faq-item:not([open])")).toHaveCount(0);
  const panels = await page
    .locator(".ax-panel")
    .evaluateAll((els) => els.map((e) => getComputedStyle(e).display));
  expect(panels[0]).not.toBe("none");
  expect(panels.slice(1).every((d) => d === "none")).toBe(true);
  const chips = await page
    .locator(".ax-chips")
    .evaluateAll((els) => els.every((e) => getComputedStyle(e).display === "none"));
  expect(chips).toBe(true);

  // after printing, the answers the reader had not opened fold again
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await page.emulateMedia({ media: "screen" });
  await expect(page.locator(".faq-item[open]")).toHaveCount(opened);
  expect(await items.count()).toBeGreaterThan(opened);
});

test.describe("touch screen wider than a phone", () => {
  test.use({ viewport: { width: 1024, height: 768 }, hasTouch: true, isMobile: true });

  test("tap targets are 44 px on a coarse pointer", async ({ page }) => {
    await page.goto("/claude?lang=pl");
    await page.waitForLoadState("networkidle");
    expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
    const wrap = page.locator(".ax-wrap").first();
    await wrap.locator(".ax-chip").first().tap();
    for (const target of [
      wrap.locator(".ax-chip").first(),
      wrap.locator(".ax-close"),
      page.locator(".faq-q").first(),
    ]) {
      const box = await target.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
      expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
    }
  });
});
