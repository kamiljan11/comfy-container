import { describe, expect, it } from "vitest";
import { normalizeText } from "./text";

describe("normalizeText", () => {
  it("drops case and Polish diacritics, including ł", () => {
    expect(normalizeText("Zażółć GĘŚLĄ jaźń")).toBe("zazolc gesla jazn");
    expect(normalizeText("Łódź")).toBe("lodz");
  });

  it("folds other Latin accents too", () => {
    expect(normalizeText("Café Reykjavík")).toBe("cafe reykjavik");
  });

  it("keeps spaces and punctuation, so the caller decides what to trim", () => {
    expect(normalizeText("  Sprzedaż i marketing, HR ")).toBe("  sprzedaz i marketing, hr ");
  });
});
