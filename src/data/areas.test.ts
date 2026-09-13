import { describe, expect, it } from "vitest";
import { AREAS, AREA_SLUGS, getArea } from "./areas";

const LANGS = ["en", "pl"] as const;

describe("areas", () => {
  it("has the six areas in the same order in both languages", () => {
    expect(AREA_SLUGS).toHaveLength(6);
    for (const lang of LANGS) {
      expect(AREAS[lang].map((a) => a.slug)).toEqual(AREA_SLUGS);
    }
  });

  it.each(LANGS)("keeps the shape the service layout expects (%s)", (lang) => {
    for (const a of AREAS[lang]) {
      expect(a.problems, a.slug).toHaveLength(6);
      expect(a.micro, a.slug).toHaveLength(3);
      expect(a.points.length, a.slug).toBeGreaterThanOrEqual(4);
      expect(a.faq.length, a.slug).toBeGreaterThanOrEqual(4);
      expect(a.navLabel.length, a.slug).toBeGreaterThan(0);
      expect(a.h1.length, a.slug).toBeGreaterThan(0);
    }
  });

  it("keeps meta within what search results show", () => {
    for (const a of AREAS.pl) {
      expect(a.metaTitle.length, a.slug).toBeLessThanOrEqual(60);
      expect(a.metaDescription.length, a.slug).toBeLessThanOrEqual(160);
    }
  });

  it("looks up by slug and misses unknown ones", () => {
    expect(getArea("pl", "hr-i-rekrutacja")?.slug).toBe("hr-i-rekrutacja");
    expect(getArea("en", "hr-i-rekrutacja")?.slug).toBe("hr-i-rekrutacja");
    expect(getArea("pl", "nope")).toBeUndefined();
  });
});
