// The contact portrait is a sketch the visitor paints with a watercolour wash
// (src/components/SketchPortrait.tsx). The wash is a canvas, so these tests
// read its pixels: painted = pixels with alpha > 0.
import { test, expect, type Page } from "@playwright/test";

const painted = (page: Page) =>
  page.evaluate(() => {
    const c = document.querySelector<HTMLCanvasElement>(".sketch-wash");
    const ctx = c?.getContext("2d");
    if (!c || !ctx || !c.width) return -1;
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let n = 0;
    for (let i = 3; i < d.length; i += 4) if ((d[i] ?? 0) > 0) n++;
    return n;
  });

test("moving the cursor over the contact section paints the sketch", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "reduce" }); // no intro stroke, so paint is ours
  await page.goto("/o-mnie");
  const wrap = page.locator(".sketch-portrait");
  await wrap.scrollIntoViewIfNeeded();
  await expect(page.locator(".sketch-lines")).toBeVisible();
  await page.waitForTimeout(600);
  expect(await painted(page)).toBe(0);

  const b = await wrap.boundingBox();
  if (!b) throw new Error("portrait has no box");
  for (let i = 0; i <= 20; i++) {
    await page.mouse.move(b.x + b.width * (0.25 + i * 0.025), b.y + b.height * 0.45);
  }
  expect(await painted(page)).toBeGreaterThan(1000);
  expect(errors).toEqual([]);
});

test("the intro stroke paints once the section is in view", async ({ page }) => {
  await page.goto("/o-mnie");
  await page.locator(".sketch-portrait").scrollIntoViewIfNeeded();
  await expect.poll(() => painted(page), { timeout: 5000 }).toBeGreaterThan(1000);
});
