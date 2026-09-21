// The service and area hero, at desktop width (the phone case is in
// mobile.spec.ts). Written after a heading that measured "0 px overflow" was in
// fact splitting "przenoszenie" in two without a hyphen: overflow was the wrong
// thing to measure. This checks what a reader sees, that every word of the
// heading fits on one line, plus that the drawing is big enough to read.
import { test, expect, type Page } from "@playwright/test";

const PAGES = [
  "/uslugi/systemy-dla-firm",
  "/uslugi/automatyzacja-procesow",
  "/uslugi/ai-w-procesach",
  "/uslugi/integracje",
  "/uslugi/doradztwo-ai",
  "/uslugi/wdrozenie-i-szkolenie",
  "/obszary/sprzedaz-i-marketing",
  "/obszary/obsluga-klienta",
  "/obszary/administracja-i-dokumenty",
  "/obszary/hr-i-rekrutacja",
  "/obszary/dane-i-raporty",
  "/obszary/nietypowe-procesy-ai",
];

/** The widest word of the heading against the heading's own width, in px. */
async function widestWordVsHeading(page: Page) {
  return page.evaluate(() => {
    const h = document.querySelector(".sl-h1") as HTMLElement;
    const cs = getComputedStyle(h);
    const probe = document.createElement("span");
    probe.style.cssText = `font:${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily};letter-spacing:${cs.letterSpacing};white-space:nowrap;position:absolute;visibility:hidden`;
    document.body.appendChild(probe);
    let widest = 0;
    let word = "";
    for (const w of (h.textContent ?? "").split(/\s+/)) {
      probe.textContent = w;
      if (probe.offsetWidth > widest) {
        widest = probe.offsetWidth;
        word = w;
      }
    }
    probe.remove();
    return { word, widest, heading: h.clientWidth };
  });
}

for (const path of PAGES) {
  test(`${path}: every heading word fits, and the drawing is readable`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`${path}?lang=pl`);
    await page.waitForLoadState("networkidle");

    const { word, widest, heading } = await widestWordVsHeading(page);
    expect(
      widest,
      `"${word}" is ${String(widest)} px in a ${String(heading)} px heading`,
    ).toBeLessThanOrEqual(heading);

    const art = page.locator(".sl-hero-art");
    if ((await art.count()) > 0) {
      const box = await art.boundingBox();
      // below this the drawings' 12 px labels render at about 7 px
      expect(box?.width ?? 0).toBeGreaterThanOrEqual(440);
    }
  });
}
