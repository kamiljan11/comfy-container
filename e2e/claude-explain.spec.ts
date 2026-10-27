// /claude figures explain their parts in plain words: pointing at a part, tapping it, or picking its button
// shows the explanation under the figure; Esc hides it. Checked with a mouse, a keyboard and a touch screen.
import { test, expect, type Page } from "@playwright/test";

const panelOf = (page: Page, i = 0) => page.locator(".ax-wrap").nth(i).locator(".ax-panel");

test("mouse: pointing at a diagram box explains it and marks its button", async ({ page }) => {
  await page.goto("/claude?lang=en");
  await page.waitForLoadState("networkidle");
  const wraps = page.locator(".ax-wrap");
  expect(await wraps.count()).toBeGreaterThanOrEqual(10);
  const wrap = page.locator(".ax-wrap", { has: page.locator('[data-explain="bridge"]') });
  await wrap.locator('[data-explain="bridge"]').hover();
  const pressed = wrap.locator('.ax-chip[aria-pressed="true"]');
  await expect(pressed).toHaveCount(1);
  await expect(wrap.locator(".ax-term")).toHaveText((await pressed.textContent()) ?? "");
  await expect(wrap.locator(".ax-body")).not.toBeEmpty();
  await expect(wrap.locator('[data-explain="bridge"]')).toHaveClass(/ax-on/);
  // Esc works after pointing too, when focus never entered the figure (pg-review r1 code)
  await page.keyboard.press("Escape");
  await expect(wrap.locator(".ax-hint")).toBeVisible();
  // a stage name in the pipeline is a target itself, not only the dot under it
  const pipe = page.locator(".ax-wrap", { has: page.locator('[data-explain="stage-2"]') });
  await pipe.locator('[data-explain="stage-2"] text').first().hover();
  await expect(pipe.locator('.ax-chip[aria-pressed="true"]')).toHaveCount(1);
});

test("keyboard: focusing a button explains it, Esc hides it", async ({ page }) => {
  await page.goto("/claude?lang=pl");
  await page.waitForLoadState("networkidle");
  const chip = page.locator(".ax-wrap").first().locator(".ax-chip").nth(1);
  await chip.focus();
  await expect(chip).toHaveAttribute("aria-pressed", "true");
  await expect(panelOf(page).locator(".ax-term")).toHaveText((await chip.textContent()) ?? "");
  await page.keyboard.press("Escape");
  await expect(panelOf(page).locator(".ax-hint")).toBeVisible();
  // "Hide" keeps keyboard focus in the panel instead of dropping it to <body>
  await chip.click();
  await panelOf(page).locator(".ax-close").focus();
  await page.keyboard.press("Enter");
  await expect(panelOf(page)).toBeFocused();
  await expect(
    page.locator(".ax-wrap").first().locator('.ax-chip[aria-pressed="true"]'),
  ).toHaveCount(0);
});

test.describe("phone", () => {
  test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

  test("tap on a part explains it, no sideways scroll of the page", async ({ page }) => {
    await page.goto("/claude?lang=pl");
    await page.waitForLoadState("networkidle");
    const wrap = page.locator(".ax-wrap", { has: page.locator('[data-explain="level-2"]') });
    await wrap.locator('[data-explain="level-2"]').tap();
    await expect(wrap.locator('.ax-chip[aria-pressed="true"]')).toHaveCount(1);
    await expect(wrap.locator(".ax-body")).not.toBeEmpty();
    // the panel sits below a tall figure: after a tap it must be on screen, not only filled
    await expect(wrap.locator(".ax-panel")).toBeInViewport({ ratio: 0.9 });
    for (const target of [wrap.locator(".ax-chip").first(), wrap.locator(".ax-close")]) {
      expect((await target.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
    await wrap.locator(".ax-close").tap();
    await expect(wrap.locator(".ax-hint")).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow).toBe(false);
  });
});

test("every chart explains its parts, and a table row, a group of squares and a bar show they are chosen", async ({
  page,
}) => {
  await page.goto("/claude?lang=en");
  await page.waitForLoadState("networkidle");
  // no chart is left as the one figure a reader cannot ask about
  expect(await page.locator(".ch-fig").count()).toBe(
    await page.locator(".ax-wrap .ch-fig").count(),
  );

  const calib = page.locator(".ax-wrap", { has: page.locator('tr[data-explain="row-5"]') });
  await calib.locator('tr[data-explain="row-5"] th').click();
  await expect(calib.locator(".ax-term")).toHaveText("Routines' scope");
  const tint = await calib
    .locator('tr[data-explain="row-5"] td')
    .first()
    .evaluate((e) => getComputedStyle(e).backgroundColor);
  expect(tint).not.toBe("rgba(0, 0, 0, 0)");

  // a group lights up all of its squares, not only its line in the key
  const waffle = page.locator(".ax-wrap", { has: page.locator(".wf-grid") });
  await waffle.locator(".ax-chip", { hasText: "Active" }).click();
  const active = Number(await waffle.locator('li[data-explain="group-0"] b').textContent());
  expect(active).toBeGreaterThan(0);
  await expect(waffle.locator(".wf-cell.ax-on")).toHaveCount(active);

  // an explained bar keeps its colour (the panel's teal tint must not wash a red bar out)
  const rounds = page.locator(".ax-wrap", { has: page.locator('g[data-explain="final"]') });
  await rounds.locator(".ax-chip", { hasText: "Final checks" }).click();
  const fill = await rounds
    .locator('g[data-explain="final"] rect.ch-svg-b')
    .evaluate((e) => getComputedStyle(e).fill);
  expect(fill).toBe("rgb(180, 68, 46)");
});
