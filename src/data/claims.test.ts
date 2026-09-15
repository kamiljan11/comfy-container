import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/*
 * Claims the case studies do not back, found by the audits of 2026-09-13/15
 * and taken off the site. The site is also the grounding source for the chat
 * bot and a future email agent, so a phrase like this coming back is a
 * factual regression, not a wording choice. Add to the list; never remove
 * from it without a source in src/data/caseStudies.ts.
 */
const FORBIDDEN: { phrase: RegExp; why: string }[] = [
  { phrase: /top-rated/i, why: "Sleipnir: the case study says well-reviewed" },
  { phrase: /najwyżej ocenian/i, why: "Sleipnir: the case study says well-reviewed" },
  { phrase: /hand-built/i, why: "AI coding agents write the code; Kamil owns spec/review/deploy" },
  { phrase: /RAG over a knowledge base/i, why: "no case study uses RAG for this" },
  { phrase: /WhatsApp bots?,[^"]*running in production/i, why: "no WhatsApp bot is in production" },
  { phrase: /boty WhatsApp,[^"]*na produkcji/i, why: "no WhatsApp bot is in production" },
  { phrase: /AI champion/i, why: "no case study describes trained AI champions" },
  { phrase: /nextcar\.is/i, why: "no case study covers it" },
];

const FILES = [
  "src/i18n.ts",
  "src/routes/cv.tsx",
  "src/routes/__root.tsx",
  "src/routes/case-studies.tsx",
  "src/server/bot.server.ts",
  "src/data/services.ts",
  "src/data/areas.ts",
  "src/components/HomePage.tsx",
  "src/components/ChatBot.tsx",
];

describe("claims the site must not make", () => {
  for (const file of FILES) {
    it(`${file} carries none of the retracted claims`, () => {
      const text = readFileSync(file, "utf-8");
      const hits = FORBIDDEN.filter((f) => f.phrase.test(text)).map(
        (f) => `${String(f.phrase)} — ${f.why}`,
      );
      expect(hits).toEqual([]);
    });
  }
});
