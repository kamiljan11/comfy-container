import { describe, expect, it } from "vitest";
import { CASE_STUDIES, FEATURED } from "./caseStudies";
import { FEATURED_PL } from "./caseStudies.pl";

const PROSE = [
  "title",
  "resultsPreview",
  "problem",
  "context",
  "myRole",
  "build",
  "evals",
  "limitations",
  "results",
  "principle",
] as const;

describe("case studies in two languages", () => {
  it("keeps the same studies in the same order", () => {
    expect(FEATURED_PL.map((s) => s.slug)).toEqual(FEATURED.map((s) => s.slug));
    expect(CASE_STUDIES.en).toBe(FEATURED);
    expect(CASE_STUDIES.pl).toBe(FEATURED_PL);
  });

  it("translates the prose, not the facts", () => {
    FEATURED.forEach((en, i) => {
      const pl = FEATURED_PL[i];
      // the stack is a list of product names; a translation must not touch it
      expect(pl.stack).toEqual(en.stack);
      // one decision block per decision — a dropped or invented one is a
      // change of substance, not of language
      expect(pl.decisions.length).toBe(en.decisions.length);
      for (const f of PROSE) {
        expect(pl[f].trim().length, `${en.slug}.${f}`).toBeGreaterThan(0);
        expect(pl[f], `${en.slug}.${f} left in English`).not.toBe(en[f]);
      }
    });
  });

  it("carries every number from the English text into the Polish one", () => {
    // Years, counts and percentages are the facts a reader checks first; a
    // translation that lost one silently is wrong even when it reads well.
    // Two-digit-and-up numbers as sets per study — Polish formatting may
    // reorder them, writes 3 400 where English writes 3,400 (so thousands
    // separators go), and spells small counts out ("3am" -> "trzeciej").
    const digits = (s: string) =>
      new Set(s.replace(/(\d)[,\u00a0\u202f ](?=\d{3}(?!\d))/g, "$1").match(/\d{2,}/g) ?? []);
    FEATURED.forEach((en, i) => {
      const pl = FEATURED_PL[i];
      const join = (s: typeof en) =>
        [...PROSE.map((f) => s[f]), ...s.decisions.flatMap((d) => Object.values(d))].join(" ");
      const missing = [...digits(join(en))].filter((n) => !digits(join(pl)).has(n));
      expect(missing, `${en.slug}: numbers missing in Polish`).toEqual([]);
    });
  });
});

describe("case-study count", () => {
  it("is twenty — the /case-studies intro says so in words", () => {
    // src/routes/case-studies.tsx: "Twenty projects" / "Dwadzieścia projektów".
    // Change both intros together with this number.
    expect(CASE_STUDIES.en).toHaveLength(20);
    expect(CASE_STUDIES.pl).toHaveLength(20);
  });
});
