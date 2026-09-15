import { describe, expect, it } from "vitest";
import { normalize, paletteItems, paletteKeywords, paletteScore } from "./palette";
import { SERVICES, SERVICE_SLUGS } from "../data/services";
import { AREAS, AREA_SLUGS } from "../data/areas";
import { CASE_STUDIES } from "../data/caseStudies";
import { ABOUT_ITEMS } from "../data/siteMap";

describe("paletteItems", () => {
  for (const lang of ["pl", "en"] as const) {
    it(`offers every page, service, area and case study (${lang})`, () => {
      const items = paletteItems(lang);
      const by = (g: string) => items.filter((i) => i.group === g);
      expect(by("services")).toHaveLength(SERVICES[lang].length);
      expect(by("areas")).toHaveLength(AREAS[lang].length);
      expect(by("cases")).toHaveLength(CASE_STUDIES[lang].length);
      const pageHrefs = by("pages").map((i) => i.href);
      expect(pageHrefs).toEqual(expect.arrayContaining(["/", "/uslugi", "/obszary", "/kontakt"]));
      for (const a of ABOUT_ITEMS[lang]) {
        expect(pageHrefs).toContain(a.hash ? `${a.to}#${a.hash}` : a.to);
      }
    });

    it(`gives every item a unique id and an internal link (${lang})`, () => {
      const items = paletteItems(lang);
      expect(new Set(items.map((i) => i.id)).size).toBe(items.length);
      for (const i of items) {
        expect(i.href.startsWith("/")).toBe(true);
        expect(i.label.trim().length).toBeGreaterThan(0);
      }
    });
  }

  it("links services, areas and case studies to pages that exist", () => {
    const items = paletteItems("pl");
    const slugOf = (prefix: string) =>
      items.filter((i) => i.href.startsWith(prefix)).map((i) => i.href.slice(prefix.length));
    expect(slugOf("/uslugi/")).toEqual(SERVICE_SLUGS);
    expect(slugOf("/obszary/")).toEqual(AREA_SLUGS);
    expect(slugOf("/case-studies#")).toEqual(CASE_STUDIES.pl.map((c) => c.slug));
  });
});

describe("paletteKeywords", () => {
  it("finds a page by its Polish address on the English site", () => {
    const en = paletteItems("en");
    const hits = en.filter((i) => paletteScore(i.id, "uslugi", paletteKeywords(i)) > 0);
    expect(hits.map((i) => i.href)).toContain("/uslugi");
    expect(hits.filter((i) => i.group === "services")).toHaveLength(SERVICES.en.length);
  });

  it("ranks the label above the address", () => {
    const item = paletteItems("pl").find((i) => i.href === "/uslugi");
    expect(item).toBeDefined();
    if (!item) return;
    const kw = paletteKeywords(item);
    expect(kw[0]).toBe(item.label);
    expect(paletteScore(item.id, "uslugi", kw)).toBe(1);
  });
});

describe("normalize", () => {
  it("drops case and Polish diacritics, including ł", () => {
    expect(normalize("Zażółć GĘŚLĄ jaźń")).toBe("zazolc gesla jazn");
    expect(normalize("Łódź")).toBe("lodz");
  });
});

describe("paletteScore", () => {
  it("shows everything for an empty query", () => {
    expect(paletteScore("x", "", ["Usługi"])).toBe(1);
    expect(paletteScore("x", "   ", ["Usługi"])).toBe(1);
  });

  it("matches without diacritics and ignores case", () => {
    expect(paletteScore("x", "uslugi", ["Usługi"])).toBeGreaterThan(0);
    expect(paletteScore("x", "LODZ", ["Łódź"])).toBeGreaterThan(0);
  });

  it("needs every typed word, in any order, from the label or the hint", () => {
    const kw = ["Sprzedaż i marketing", "Automatyzacja sprzedaży i marketingu"];
    expect(paletteScore("x", "marketing sprzedaz", kw)).toBeGreaterThan(0);
    expect(paletteScore("x", "sprzedaz faktury", kw)).toBe(0);
  });

  it("ranks a label that starts with the query above one that contains it, above a hint-only match", () => {
    const starts = paletteScore("x", "hr", ["HR i rekrutacja", "Rekrutacja"]);
    const contains = paletteScore("x", "rekrutacja", ["HR i rekrutacja", "x"]);
    const hintOnly = paletteScore("x", "rekrutacja", ["Obszary", "HR i rekrutacja"]);
    expect(starts).toBeGreaterThan(contains);
    expect(contains).toBeGreaterThan(hintOnly);
    expect(hintOnly).toBeGreaterThan(0);
  });

  it("hides an item that matches nothing", () => {
    expect(paletteScore("x", "xyz", ["Usługi", "Sześć rodzajów pracy"])).toBe(0);
    expect(paletteScore("x", "abc", [])).toBe(0);
  });
});
