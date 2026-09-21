import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PainIcon } from "./PainIcon";
import { SERVICE_SLUGS } from "../data/services";

const render = (slug: string) => renderToStaticMarkup(createElement(PainIcon, { slug }));

describe("PainIcon", () => {
  it("has a drawing for every service slug", () => {
    // a typo in a BY_SLUG key would otherwise leave a homepage card without its drawing, silently
    for (const slug of SERVICE_SLUGS) {
      const html = render(slug);
      expect(html, slug).toContain('class="pain-icon"');
      expect(html, slug).toContain('aria-hidden="true"');
      expect(html, `${slug} draws something`).toMatch(/<(path|rect|circle)\b/);
    }
  });

  it("gives every card its own drawing", () => {
    const drawings = new Set(SERVICE_SLUGS.map(render));
    expect(drawings.size).toBe(SERVICE_SLUGS.length);
  });

  it("renders nothing for a slug without a drawing", () => {
    expect(render("no-such-service")).toBe("");
  });
});
