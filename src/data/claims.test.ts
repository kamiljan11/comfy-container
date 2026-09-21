import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/*
 * Claims the case studies do not back, found by the audits of 2026-09-13/15
 * and taken off the site. The site is also the grounding source for the chat
 * bot and a future email agent, so a phrase like this coming back is a
 * factual regression, not a wording choice. Add to the list; never remove
 * from it without a source in src/data/caseStudies.ts.
 */
const FORBIDDEN: { phrase: RegExp; why: string }[] = [
  {
    phrase: /(blisko|close to|około|about) 40 (developer|programist)/i,
    why: "CetusPro headcount not confirmed for publication (2026-09-21)",
  },
  {
    phrase: /(live at|działa na) masgroup\.is/i,
    why: "masgroup.is is the company site, not the platform",
  },
  { phrase: /top-rated/i, why: "Sleipnir: the case study says well-reviewed" },
  { phrase: /najwyżej ocenian/i, why: "Sleipnir: the case study says well-reviewed" },
  { phrase: /hand-built/i, why: "AI coding agents write the code; Kamil owns spec/review/deploy" },
  { phrase: /RAG over a knowledge base/i, why: "no case study uses RAG for this" },
  { phrase: /WhatsApp bots?[^.]{0,120}in production/i, why: "no WhatsApp bot is in production" },
  { phrase: /production[^.]{0,80}WhatsApp bots?/i, why: "no WhatsApp bot is in production" },
  { phrase: /boty WhatsApp[^.]{0,120}na produkcj/i, why: "no WhatsApp bot is in production" },
  { phrase: /produkcj[^.]{0,80}boty WhatsApp/i, why: "no WhatsApp bot is in production" },
  { phrase: /AI champion/i, why: "no case study describes trained AI champions" },
  { phrase: /nextcar\.is/i, why: "no case study covers it" },
];

// Every source file the site renders or the bot grounds on — including the
// case studies themselves. Tests are skipped: this file has to name the phrases.
const FILES = readdirSync("src", { recursive: true, encoding: "utf8" })
  .filter((f) => /\.(ts|tsx)$/.test(f) && !/\.test\.tsx?$/.test(f))
  .map((f) => join("src", f));

// Copy is often split across lines as "a" + "b"; join the seams so a phrase
// cut in two is still caught as one sentence.
const seamless = (text: string) => text.replace(/["'`]\s*\+\s*["'`]/g, "");

describe("claims the site must not make", () => {
  it("scans the whole source tree", () => {
    expect(FILES.length).toBeGreaterThan(20);
    expect(FILES).toContain(join("src", "data", "caseStudies.ts"));
  });

  for (const file of FILES) {
    it(`${file} carries none of the retracted claims`, () => {
      const text = seamless(readFileSync(file, "utf-8"));
      const hits = FORBIDDEN.filter((f) => f.phrase.test(text)).map(
        (f) => `${String(f.phrase)} — ${f.why}`,
      );
      expect(hits).toEqual([]);
    });
  }

  it("catches a phrase split across a string concatenation", () => {
    const split = seamless('"Helped grow it into a top-" + "rated tour"');
    expect(FORBIDDEN.some((f) => f.phrase.test(split))).toBe(true);
  });
});
