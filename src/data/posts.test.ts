// Guards for blog content: every post complete in both languages, heading ids
// unique (they are anchor targets), images present on disk with real alt text,
// and no dash-heavy or hype wording sneaking back in.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { POSTS, findPost } from "./posts";

describe("posts", () => {
  it("have unique slugs and ISO dates", () => {
    const slugs = POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of POSTS) expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  for (const post of POSTS) {
    for (const lang of ["pl", "en"] as const) {
      const b = post.body[lang];

      it(`${post.slug} (${lang}) has title, description and body`, () => {
        expect(b.title.length).toBeGreaterThan(10);
        expect(b.description.length).toBeGreaterThan(50);
        expect(b.description.length).toBeLessThanOrEqual(300);
        // a teaser for an article published elsewhere is short by design (ADR 0007)
        expect(b.blocks.length).toBeGreaterThan(post.external ? 1 : 5);
      });

      if (post.external) {
        it(`${post.slug} (${lang}) stays a teaser, not a copy of the article`, () => {
          // the portal's article is several thousand characters; a teaser that
          // grows past this has started copying it
          const chars = JSON.stringify(b.blocks).length;
          expect(chars).toBeLessThan(2500);
          expect(b.blocks.length).toBeLessThanOrEqual(8);
        });
      }

      it(`${post.slug} (${lang}) has unique heading ids`, () => {
        const ids = b.blocks.flatMap((x) => (x.t === "h2" ? [x.id] : []));
        expect(new Set(ids).size).toBe(ids.length);
      });

      it(`${post.slug} (${lang}) images exist and are described`, () => {
        for (const x of b.blocks) {
          if (x.t !== "img") continue;
          expect(existsSync(join(process.cwd(), "public", x.src)), x.src).toBe(true);
          expect(x.alt.length).toBeGreaterThan(20);
        }
      });

      it(`${post.slug} (${lang}) avoids hype words and dashes`, () => {
        const text = JSON.stringify(b);
        // humanizer rule: an em or en dash marks text as machine-written
        expect(text).not.toMatch(/[–—]/);
        expect(text).not.toMatch(
          /\b(revolutionary|game-chang|seamless|unlock|rewolucyjn|przełomow)/i,
        );
      });
    }
  }

  it("external posts point to an https article and name the site", () => {
    const external = POSTS.filter((p) => p.external);
    expect(external.length).toBeGreaterThan(0);
    for (const p of external) {
      expect(p.external?.url).toMatch(/^https:\/\/[^\s]+$/);
      expect(p.external?.source.length).toBeGreaterThan(2);
      // the teaser must not hotlink the portal's images
      expect(JSON.stringify(p.body)).not.toMatch(/torzeszow\.pl\/[^"\s]*\.(jpe?g|png|webp)/i);
    }
    expect(findPost("oszusci-moga-podrobic-glos-wnuczka")?.external?.url).toBe(
      "https://torzeszow.pl/news/oszusci-moga-podrobic-glos-wnuczka",
    );
  });

  it("findPost returns undefined for an unknown slug", () => {
    expect(findPost("nie-ma")).toBeUndefined();
    expect(findPost("claude-autoshutdown")?.repo).toContain("github.com/kamiljan11");
  });
});
