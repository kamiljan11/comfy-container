import { describe, expect, it } from "vitest";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pagesToLoad, WINDOW } from "./bookWindow";
import { BOOK_PAGES, pageSrc } from "../data/bookPages";

describe("pagesToLoad", () => {
  it("loads the cover and the pages after it at the start", () => {
    expect([...pagesToLoad(0, 99)].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4]);
  });

  it("loads a window on both sides in the middle", () => {
    expect(pagesToLoad(50, 99).size).toBe(WINDOW * 2 + 1);
    expect(pagesToLoad(50, 99).has(46)).toBe(true);
    expect(pagesToLoad(50, 99).has(54)).toBe(true);
    expect(pagesToLoad(50, 99).has(45)).toBe(false);
  });

  it("never goes past the last page, even with a bad index", () => {
    const pages = pagesToLoad(500, 99);
    expect(Math.max(...pages)).toBe(98);
    expect(pagesToLoad(-3, 99).has(0)).toBe(true);
  });

  it("is empty for an empty book", () => {
    expect(pagesToLoad(0, 0).size).toBe(0);
  });
});

describe("the rendered book pages match the manifest", () => {
  for (const [book, meta] of Object.entries(BOOK_PAGES) as [
    keyof typeof BOOK_PAGES,
    (typeof BOOK_PAGES)["short"],
  ][]) {
    it(`${book}: ${String(meta.pages)} page images on disk, first and last present`, () => {
      const dir = join(process.cwd(), "public", "books", "pages", book);
      expect(readdirSync(dir).filter((f) => f.endsWith(".webp"))).toHaveLength(meta.pages);
      expect(existsSync(join(process.cwd(), "public", pageSrc(book, 1)))).toBe(true);
      expect(existsSync(join(process.cwd(), "public", pageSrc(book, meta.pages)))).toBe(true);
    });
  }
});

describe("the page counts the copy states", () => {
  it("match the PDFs, via the manifest", async () => {
    const { T } = await import("../i18n");
    for (const lang of ["pl", "en"] as const) {
      expect(T[lang].beyond.short).toContain(String(BOOK_PAGES.short.pages));
      expect(T[lang].beyond.full).toContain(String(BOOK_PAGES.full.pages));
    }
  });
});
