import { describe, expect, it } from "vitest";
import { collectToc, headingId } from "./pageToc";

/**
 * A stand-in for the page: enough of an element to be read and written the way
 * collectToc does it. The same nodes survive between calls, which is what makes
 * the language switch testable here (the real page keeps its DOM too).
 */
function fakeNode(text: string, id = "") {
  const attrs = new Map<string, string>();
  return {
    textContent: text,
    id,
    getAttribute: (name: string) => attrs.get(name) ?? null,
    setAttribute: (name: string, value: string) => {
      attrs.set(name, value);
    },
  };
}

type FakeNode = ReturnType<typeof fakeNode>;

function fakeDoc(nodes: FakeNode[], extraIds: string[] = []): ParentNode {
  const others = extraIds.map((id) => fakeNode("", id));
  return {
    querySelectorAll: (selector: string) =>
      selector === "[id]" ? [...nodes, ...others].filter((n) => n.id) : nodes,
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
    const nodes = [fakeNode("Prompt layer"), fakeNode("Git gates")];
    const entries = collectToc(fakeDoc(nodes));
    expect(entries).toEqual([
      { id: "prompt-layer-1", label: "Prompt layer" },
      { id: "git-gates-2", label: "Git gates" },
    ]);
    // the links point at these ids, so they have to be on the page
    expect(nodes.map((n) => n.id)).toEqual(["prompt-layer-1", "git-gates-2"]);
  });

  it("keeps an id the page author wrote", () => {
    const entries = collectToc(fakeDoc([fakeNode("Self-tests", "aivr")]));
    expect(entries).toEqual([{ id: "aivr", label: "Self-tests" }]);
  });

  it("skips a heading with no text, which would be a dead row", () => {
    const entries = collectToc(fakeDoc([fakeNode("  "), fakeNode("Doctrine")]));
    expect(entries).toHaveLength(1);
    expect(entries[0]?.label).toBe("Doctrine");
  });

  it("follows the language: the same heading gets the fragment of the words now shown", () => {
    // the page renders English first and the language hook switches it in the
    // browser, so the second pass must not leave a Polish heading under an
    // English fragment
    const nodes = [fakeNode("Prompt layer"), fakeNode("Git gates")];
    const doc = fakeDoc(nodes);
    collectToc(doc);

    nodes[0]!.textContent = "Warstwa promptu";
    nodes[1]!.textContent = "Bramki gita";
    const after = collectToc(doc);

    expect(after).toEqual([
      { id: "warstwa-promptu-1", label: "Warstwa promptu" },
      { id: "bramki-gita-2", label: "Bramki gita" },
    ]);
    expect(nodes.map((n) => n.id)).toEqual(["warstwa-promptu-1", "bramki-gita-2"]);
  });

  it("never takes an id another element on the page already uses", () => {
    const nodes = [fakeNode("Prompt layer")];
    const entries = collectToc(fakeDoc(nodes, ["prompt-layer-1"]));
    expect(entries[0]?.id).toBe("prompt-layer-1-2");
    expect(nodes[0]?.id).toBe("prompt-layer-1-2");
  });
});
