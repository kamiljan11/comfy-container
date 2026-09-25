// The contact portrait is Kamil's photo with the hero's network drawn over it
// (src/components/NetworkPortrait.tsx). The canvas is read through its pixels
// and the node count the component writes to data-nodes.
import { test, expect, type Page } from "@playwright/test";

const litPixels = (page: Page) =>
  page.evaluate(() => {
    const c = document.querySelector<HTMLCanvasElement>(".net-canvas");
    const ctx = c?.getContext("2d");
    if (!c || !ctx || !c.width) return -1;
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let n = 0;
    for (let i = 3; i < d.length; i += 4) if ((d[i] ?? 0) > 0) n++;
    return n;
  });
const nodeCount = (page: Page) =>
  page.locator(".net-portrait").evaluate((el) => Number((el as HTMLElement).dataset.nodes ?? -1));

test("the photo is in front and the network is drawn over it", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/o-mnie");
  const wrap = page.locator(".net-portrait");
  await wrap.scrollIntoViewIfNeeded();
  await expect(page.locator(".net-photo")).toBeVisible();
  expect(await page.locator(".net-photo").getAttribute("src")).toBe("/kamil-cutout.webp");
  await expect.poll(() => litPixels(page)).toBeGreaterThan(200);
  expect(errors).toEqual([]);
});

test("a cursor stroke over the section adds nodes to the network", async ({ page }) => {
  await page.goto("/o-mnie");
  const wrap = page.locator(".net-portrait");
  await wrap.scrollIntoViewIfNeeded();
  await expect.poll(() => nodeCount(page)).toBeGreaterThan(0);
  const before = await nodeCount(page);
  const b = await wrap.boundingBox();
  if (!b) throw new Error("portrait has no box");
  for (let i = 0; i <= 24; i++) {
    await page.mouse.move(b.x + b.width * (0.2 + i * 0.025), b.y + b.height * 0.4);
  }
  await expect.poll(() => nodeCount(page)).toBeGreaterThan(before + 5);
});

test("with reduced motion the network is one still frame and the cursor adds nothing", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/o-mnie");
  const wrap = page.locator(".net-portrait");
  await wrap.scrollIntoViewIfNeeded();
  await expect.poll(() => litPixels(page)).toBeGreaterThan(200);
  const before = await nodeCount(page);
  const b = await wrap.boundingBox();
  if (!b) throw new Error("portrait has no box");
  for (let i = 0; i <= 12; i++) await page.mouse.move(b.x + b.width * (0.2 + i * 0.05), b.y + 100);
  await page.waitForTimeout(300);
  expect(await nodeCount(page)).toBe(before);
});
