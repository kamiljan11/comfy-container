// The bot answers only from its own prompt, so the prompt has to keep up with the
// site. These checks fail when a service or area is added, renamed or removed and
// nobody told the bot: it would then invent an answer or send people to the wrong page.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SERVICES } from "../data/services";
import { AREAS } from "../data/areas";
import { CASE_STUDIES } from "../data/caseStudies";

const PROMPT = readFileSync(new URL("./bot.server.ts", import.meta.url), "utf8");

describe("the bot's prompt knows the site", () => {
  it("names every service page", () => {
    for (const s of SERVICES.pl) expect(PROMPT).toContain(`/uslugi/${s.slug}`);
  });

  it("names every area page", () => {
    for (const a of AREAS.pl) expect(PROMPT).toContain(`/obszary/${a.slug}`);
  });

  it("counts the case studies the way the data does", () => {
    // claude-review caught this at 22 against 20 real entries: a number typed
    // by hand into a prompt the bot treats as fact.
    expect(PROMPT).toContain(`${String(CASE_STUDIES.pl.length)} write-ups of real builds`);
  });

  it("points at the consultation form, which is how people start", () => {
    expect(PROMPT).toContain("kamiljan.com/kontakt");
  });

  it("never sends anyone to the blog, which has no articles", () => {
    expect(PROMPT).toContain("blog page with no articles");
    expect(PROMPT).not.toContain("kamiljan.com/blog");
  });
});
