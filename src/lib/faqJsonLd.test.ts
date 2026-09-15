import { describe, expect, it } from "vitest";
import { faqJsonLd } from "./faqJsonLd";

describe("faqJsonLd", () => {
  it("lists every visible question as a FAQPage entry", () => {
    const out = JSON.parse(
      faqJsonLd([
        { q: "Ile to kosztuje?", a: "Widełki po obejrzeniu procesu." },
        { q: "Ile trwa?", a: "Tygodnie, nie miesiące." },
      ]),
    ) as { "@type": string; mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(out["@type"]).toBe("FAQPage");
    expect(out.mainEntity.map((q) => q.name)).toEqual(["Ile to kosztuje?", "Ile trwa?"]);
    expect(out.mainEntity[1].acceptedAnswer.text).toBe("Tygodnie, nie miesiące.");
  });

  it("cannot close its script tag, and still round-trips the text", () => {
    const evil = "</script><script>alert(1)</script>";
    const out = faqJsonLd([{ q: evil, a: "a" }]);
    expect(out).not.toContain("</script>");
    expect(out).not.toContain("<");
    const parsed = JSON.parse(out) as { mainEntity: { name: string }[] };
    expect(parsed.mainEntity[0].name).toBe(evil);
  });
});
