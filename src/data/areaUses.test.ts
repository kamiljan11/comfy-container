import { describe, expect, it } from "vitest";
import { AREAS } from "./areas";
import { SERVICES } from "./services";

describe("area use cases", () => {
  for (const lang of ["pl", "en"] as const) {
    for (const a of AREAS[lang]) {
      it(`${a.slug} (${lang}) lists 8 distinct, short uses`, () => {
        const uses = a.uses ?? [];
        expect(uses).toHaveLength(8);
        expect(new Set(uses.map((u) => u.title)).size).toBe(8);
        for (const u of uses) {
          expect(u.title.length, u.title).toBeLessThanOrEqual(50);
          expect(u.body.length, u.body).toBeLessThanOrEqual(160);
          // humanizer rule: no em or en dash
          expect(`${u.title} ${u.body}`).not.toMatch(/[\u2013\u2014]/);
        }
      });
    }
  }

  it("keeps the same uses, in the same order, in both languages", () => {
    for (const a of AREAS.pl) {
      const en = AREAS.en.find((x) => x.slug === a.slug);
      expect(en?.uses?.length).toBe(a.uses?.length);
    }
  });

  it("gives service pages none, since they are not area catalogues", () => {
    for (const s of SERVICES.pl) expect(s.uses).toBeUndefined();
  });
});
