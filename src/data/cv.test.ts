// The CV style rules from the cv-writing skill, checked on the data so a later
// edit cannot slide back into third-person Polish, pronouns in English bullets,
// keyword soup in skills, or lines Kamil asked to drop.
import { describe, expect, it } from "vitest";
import { CV_CONTENT } from "./cv";

const pl = CV_CONTENT.pl;
const en = CV_CONTENT.en;

const bullets = (lang: "pl" | "en") => CV_CONTENT[lang].experience.flatMap((j) => j.bullets);
const allText = (lang: "pl" | "en") => {
  const c = CV_CONTENT[lang];
  return [
    c.summary,
    ...c.skills.map((s) => s.body),
    ...bullets(lang),
    ...c.education.map((s) => s.body),
  ].join("\n");
};

/** Polish past-tense verb forms: "zbudował", "prowadziła", "pomogło". */
// \b is ASCII-only in JS even with /u, so the word edges are spelled out.
const PL_PAST_VERB = /(?<!\p{L})\p{L}+(ł|ła|ło|li|ły)(?!\p{L})/gu;
/** Words that end like a past verb but are nouns or adjectives. */
const PL_NOT_VERBS = new Set([
  "dział",
  "udział",
  "kanały",
  "materiały",
  "zespół",
  "wokół",
  "skilli",
]);

describe("Polish CV", () => {
  it("never uses the past tense, so no 'zaprojektował / wdrożył'", () => {
    const hits = (allText("pl").match(PL_PAST_VERB) ?? []).filter(
      (w) => !PL_NOT_VERBS.has(w.toLowerCase()),
    );
    expect(hits).toEqual([]);
  });

  it("keeps the summary short", () => {
    const words = pl.summary.split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(40);
    expect(words).toBeLessThanOrEqual(90);
  });
});

describe("English CV", () => {
  it("has no pronouns in the summary, bullets or learning lines", () => {
    expect(allText("en")).not.toMatch(/\b(I|me|my|he|his|him|she|her)\b/);
  });

  it("keeps the summary short", () => {
    const words = en.summary.split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(40);
    expect(words).toBeLessThanOrEqual(90);
  });
});

describe("both languages", () => {
  for (const lang of ["pl", "en"] as const) {
    const c = CV_CONTENT[lang];

    it(`${lang}: skills are lists, not sentences`, () => {
      for (const s of c.skills) expect(s.body, s.label).not.toContain(";");
    });

    it(`${lang}: every bullet is at most about two lines`, () => {
      for (const b of bullets(lang)) expect(b.length, b).toBeLessThanOrEqual(260);
    });

    it(`${lang}: no line Kamil asked to drop comes back`, () => {
      expect(allText(lang)).not.toMatch(
        /wtorek|Tuesday|najlepszy sprzedawca|best salesman|od podstaw po|from the floor up|wykształcenie średnie|secondary education|islandzki \(|poziomy 1–2|Icelandic, levels|responsible for|odpowiedzialny za|passionate|pasjonat/i,
      );
    });

    it(`${lang}: lists Cetus Pro first, as the current role`, () => {
      expect(c.experience[0]?.org).toBe("Cetus Pro");
    });
  }

  it("has the same roles in the same order in both languages", () => {
    expect(pl.experience.map((j) => j.org.split(",")[0])).toEqual(
      en.experience
        .map((j) => j.org.split(",")[0])
        .map((o) =>
          o === "Independent"
            ? "Działalność własna"
            : o === "Poland & Iceland"
              ? "Polska i Islandia"
              : o,
        ),
    );
  });
});
