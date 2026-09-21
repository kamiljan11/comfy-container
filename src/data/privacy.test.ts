// The privacy policy has to match what the site does. These checks pin the
// facts it states to the code, so a change on one side fails the build.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PRIVACY } from "./privacy";

const src = (p: string) => readFileSync(new URL(p, import.meta.url), "utf8");
const text = (lang: "pl" | "en") => JSON.stringify(PRIVACY[lang]);

describe("privacy policy", () => {
  it("has the same sections in both languages", () => {
    expect(PRIVACY.pl.sections).toHaveLength(PRIVACY.en.sections.length);
  });

  for (const lang of ["pl", "en"] as const) {
    it(`${lang}: names the controller and a contact address`, () => {
      expect(text(lang)).toContain("Kamil Jan Włodarczyk");
      expect(text(lang)).toContain("hello@kamiljan.com");
    });

    it(`${lang}: names every processor the code calls`, () => {
      for (const name of ["Vercel", "Resend", "Anthropic", "Google"]) {
        expect(text(lang)).toContain(name);
      }
    });

    it(`${lang}: has no em or en dash`, () => {
      expect(text(lang)).not.toMatch(/[\u2013\u2014]/);
    });
  }

  it("states the IP window the rate limiter really uses", () => {
    expect(src("../server/lead.server.ts")).toContain("windowMs: 10 * 60_000");
    expect(text("pl")).toContain("10 minut");
  });

  it("says the chat history lives in sessionStorage, as the chat does", () => {
    expect(src("../components/ChatBot.tsx")).toContain("sessionStorage.setItem");
    expect(text("pl")).toContain("sessionStorage");
  });

  it("says there is no analytics, and the root layout loads none", () => {
    expect(src("../routes/__root.tsx")).not.toMatch(
      /googletagmanager|gtag\(|clarity\.ms|plausible/,
    );
    expect(text("en")).toContain("no analytics");
  });
});
