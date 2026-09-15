import { describe, expect, it } from "vitest";
import {
  isMacPlatform,
  isPaletteShortcut,
  paletteItems,
  paletteKeywords,
  paletteScore,
  shortcutHint,
} from "./palette";
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

describe("isPaletteShortcut", () => {
  type Mods = Partial<Record<"ctrlKey" | "metaKey" | "altKey" | "shiftKey", boolean>>;
  const key = (k: string, mods: Mods = {}) => ({
    key: k,
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    shiftKey: false,
    ...mods,
  });

  it("opens on Ctrl+K off a Mac and on Cmd+K on a Mac", () => {
    expect(isPaletteShortcut(key("k", { ctrlKey: true }), false)).toBe(true);
    expect(isPaletteShortcut(key("k", { metaKey: true }), true)).toBe(true);
  });

  it("leaves Ctrl+K alone on a Mac, where it deletes to the end of the line", () => {
    expect(isPaletteShortcut(key("k", { ctrlKey: true }), true)).toBe(false);
  });

  it("ignores the other platform's modifier and both at once", () => {
    expect(isPaletteShortcut(key("k", { metaKey: true }), false)).toBe(false);
    expect(isPaletteShortcut(key("k", { ctrlKey: true, metaKey: true }), false)).toBe(false);
    expect(isPaletteShortcut(key("k", { ctrlKey: true, metaKey: true }), true)).toBe(false);
  });

  it("ignores AltGr (Ctrl+Alt), Shift and other keys", () => {
    expect(isPaletteShortcut(key("k", { ctrlKey: true, altKey: true }), false)).toBe(false);
    expect(isPaletteShortcut(key("K", { ctrlKey: true, shiftKey: true }), false)).toBe(false);
    expect(isPaletteShortcut(key("j", { ctrlKey: true }), false)).toBe(false);
    expect(isPaletteShortcut(key("k"), false)).toBe(false);
  });

  it("still works with Caps Lock on", () => {
    expect(isPaletteShortcut(key("K", { ctrlKey: true }), false)).toBe(true);
  });
});

describe("isMacPlatform / shortcutHint", () => {
  it("tells a Mac or iOS device from the rest", () => {
    expect(isMacPlatform("Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5)")).toBe(true);
    expect(isMacPlatform("Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)")).toBe(true);
    expect(isMacPlatform("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")).toBe(false);
    expect(isMacPlatform("Mozilla/5.0 (X11; Linux x86_64)")).toBe(false);
  });

  it("shows and announces the platform's own shortcut", () => {
    expect(shortcutHint(true)).toEqual({ label: "⌘K", aria: "Meta+K" });
    expect(shortcutHint(false)).toEqual({ label: "Ctrl K", aria: "Control+K" });
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
