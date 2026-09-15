import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Illustration } from "./illustrations";
import { SERVICE_SLUGS } from "../data/services";
import { AREA_SLUGS } from "../data/areas";

const render = (slug: string, lang: "pl" | "en") =>
  renderToStaticMarkup(createElement(Illustration, { slug, lang }));

describe("hero illustrations", () => {
  it("has a drawing for every service and area page, in both languages", () => {
    // a typo in a BY_SLUG key would otherwise render a silent, empty hero
    for (const slug of [...SERVICE_SLUGS, ...AREA_SLUGS]) {
      for (const lang of ["pl", "en"] as const) {
        const html = render(slug, lang);
        expect(html, `${slug} (${lang})`).toContain('<figure class="sl-hero-art">');
        expect(html).toContain(`id="ill-${slug}-t"`);
        expect(html).toContain(`aria-labelledby="ill-${slug}-t ill-${slug}-d"`);
      }
    }
  });

  it("titles the drawing in the page language", () => {
    const pl = render("systemy-dla-firm", "pl");
    const en = render("systemy-dla-firm", "en");
    expect(pl).toContain('<title id="ill-systemy-dla-firm-t">Trzy wersje');
    expect(en).toContain('<title id="ill-systemy-dla-firm-t">Three versions');
  });

  it("renders nothing for a page without a drawing", () => {
    expect(render("nie-ma-takiej-strony", "pl")).toBe("");
  });
});
