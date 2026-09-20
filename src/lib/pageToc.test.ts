import { describe, expect, it } from "vitest";
import { collectToc, headingId } from "./pageToc";

/** A stand-in for the page: only what collectToc touches. */
function fakeDoc(headings: { text: string; id?: string }[]): ParentNode {
  const nodes = headings.map((h) => ({ textContent: h.text, id: h.id ?? "" }));
  return {
    querySelectorAll: () => nodes,
  } as unknown as ParentNode;
}

describe("headingId", () => {
  it("folds Polish letters so the fragment is plain ASCII", () => {
    expect(headingId("Bramki gita i wdrożenie", 0)).toBe("bramki-gita-i-wdrozenie-1");
    expect(headingId("Działy recenzentów", 3)).toBe("dzialy-recenzentow-4");
  });

  it("keeps two headings with the same words apart", () => {
    expect(headingId("Routines", 1)).not.toBe(headingId("Routines", 2));
  });

  it("still returns something usable for a heading with no letters", () => {
    expect(headingId("→ ↑", 0)).toBe("section-1");
  });
});

describe("collectToc", () => {
  it("lists the headings and writes back the ids it generated", () => {
    const doc = fakeDoc([{ text: "Prompt layer" }, { text: "Git gates" }]);
    const entries = collectToc(doc);
    expect(entries).toEqual([
      { id: "prompt-layer-1", label: "Prompt layer" },
      { id: "git-gates-2", label: "Git gates" },
    ]);
    // the links point at these ids, so they have to exist on the page
    const ids = [...doc.querySelectorAll("h2")].map((h) => h.id);
    expect(ids).toEqual(["prompt-layer-1", "git-gates-2"]);
  });

  it("keeps an id the page already had", () => {
    const entries = collectToc(fakeDoc([{ text: "Self-tests", id: "aivr" }]));
    expect(entries).toEqual([{ id: "aivr", label: "Self-tests" }]);
  });

  it("skips a heading with no text, which would be a dead row", () => {
    const entries = collectToc(fakeDoc([{ text: "  " }, { text: "Doctrine" }]));
    expect(entries).toHaveLength(1);
    expect(entries[0]?.label).toBe("Doctrine");
  });
});
