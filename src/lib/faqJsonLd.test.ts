import { describe, expect, it } from "vitest";
import { faqJsonLd } from "./faqJsonLd";

type Parsed = {
  "@context": string;
  "@type": string;
  mainEntity: {
    "@type": string;
    name: string;
    acceptedAnswer: { "@type": string; text: string };
  }[];
};

describe("faqJsonLd", () => {
  it("lists every visible question as a schema.org FAQPage entry", () => {
    const out = JSON.parse(
      faqJsonLd([
        { q: "Ile to kosztuje?", a: "Widełki po obejrzeniu procesu." },
        { q: "Ile trwa?", a: "Tygodnie, nie miesiące." },
      ]),
    ) as Parsed;
    expect(out["@context"]).toBe("https://schema.org");
    expect(out["@type"]).toBe("FAQPage");
    expect(out.mainEntity).toHaveLength(2);
    expect(out.mainEntity.map((q) => q["@type"])).toEqual(["Question", "Question"]);
    expect(out.mainEntity.map((q) => q.name)).toEqual(["Ile to kosztuje?", "Ile trwa?"]);
    expect(out.mainEntity[1].acceptedAnswer).toEqual({
      "@type": "Answer",
      text: "Tygodnie, nie miesiące.",
    });
  });

  it("returns an empty list for a page without questions", () => {
    const out = JSON.parse(faqJsonLd([])) as Parsed;
    expect(out.mainEntity).toEqual([]);
  });

  it("cannot close its script tag, and still round-trips the text", () => {
    const evil = "</script><script>alert(1)</script>";
    const out = faqJsonLd([{ q: evil, a: "a" }]);
    expect(out).not.toContain("</script>");
    expect(out).not.toContain("<");
    const parsed = JSON.parse(out) as Parsed;
    expect(parsed.mainEntity[0].name).toBe(evil);
  });
});
