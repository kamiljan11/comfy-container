// The figures added for sections that had only text: the three ideas, guarding the guards, and installing.
// Each draws its parts, the two diagrams explain a part on a tap, and on a phone they fold into one column.
import { test, expect } from "@playwright/test";

test("the three ideas and the guards draw their parts and explain one on a click", async ({
  page,
}) => {
  await page.goto("/claude?lang=en");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".is-row")).toHaveCount(3);
  await expect(page.locator(".gr-guard")).toHaveCount(4);
  await expect(page.locator(".gr-core")).toContainText("THE RULES");
  // the install section shows its four steps before the commands
  const install = page.locator("section", { has: page.locator("#install") });
  await expect(install.locator(".rs-step")).toHaveCount(4);

  const guards = page.locator(".ax-wrap", { has: page.locator('[data-explain="guard-2"]') });
  await guards.locator('[data-explain="guard-2"]').click();
  await expect(guards.locator(".ax-term")).toHaveText("Database target");
  await expect(guards.locator('[data-explain="guard-2"]')).toHaveClass(/ax-on/);
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

  test("the new figures fold into one column and tap to explain", async ({ page }) => {
    await page.goto("/claude?lang=pl");
    await page.waitForLoadState("networkidle");
    const box = async (selector: string) => {
      const b = await page.locator(selector).first().boundingBox();
      expect(b, `${selector} is drawn`).not.toBeNull();
      return b ?? { x: 0, y: 0, width: 0, height: 0 };
    };
    const core = await box(".gr-core");
    const guard = await box(".gr-guard");
    // one column: the guard sits under the rules, not beside them
    expect(guard.y).toBeGreaterThan(core.y);
    expect(Math.abs(guard.x - core.x)).toBeLessThanOrEqual(1);
    expect((await box(".is-after")).y).toBeGreaterThan((await box(".is-before")).y);

    const ideas = page.locator(".ax-wrap", { has: page.locator('[data-explain="idea-1"]') });
    await ideas.locator('[data-explain="idea-1"]').tap();
    await expect(ideas.locator(".ax-term")).toHaveText("Blizna");
    // the outer line is explained by its heading only, and the heading is marked when chosen
    const guards = page.locator(".ax-wrap", { has: page.locator('[data-explain="outer"]') });
    await guards.locator('[data-explain="outer"]').tap();
    await expect(guards.locator(".ax-term")).toHaveText("Uczciwa granica");
    const outline = await guards
      .locator('[data-explain="outer"]')
      .evaluate((e) => getComputedStyle(e).outlineStyle);
    expect(outline).toBe("solid");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
