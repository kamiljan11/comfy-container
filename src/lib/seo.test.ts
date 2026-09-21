import { describe, expect, it } from "vitest";
import { pageMeta } from "./seo";

const find = (tags: ReturnType<typeof pageMeta>, key: string) =>
  tags.find((t) => ("property" in t && t.property === key) || ("name" in t && t.name === key));

describe("pageMeta", () => {
  it("gives share previews the page's own title, description and url", () => {
    const tags = pageMeta({ title: "T", description: "D", url: "https://kamiljan.com/x" });
    expect(tags[0]).toEqual({ title: "T" });
    expect(find(tags, "og:title")).toEqual({ property: "og:title", content: "T" });
    expect(find(tags, "twitter:title")).toEqual({ name: "twitter:title", content: "T" });
    expect(find(tags, "og:description")).toEqual({ property: "og:description", content: "D" });
    expect(find(tags, "twitter:description")).toEqual({
      name: "twitter:description",
      content: "D",
    });
    expect(find(tags, "og:url")).toEqual({ property: "og:url", content: "https://kamiljan.com/x" });
  });

  it("sets og:locale only when asked, so English pages keep the root default", () => {
    expect(find(pageMeta({ title: "T", description: "D", url: "u" }), "og:locale")).toBeUndefined();
    expect(
      find(pageMeta({ title: "T", description: "D", url: "u", locale: "pl_PL" }), "og:locale"),
    ).toEqual({ property: "og:locale", content: "pl_PL" });
  });
});
