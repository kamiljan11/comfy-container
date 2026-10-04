import { describe, expect, it } from "vitest";
import { categoryLabel, groupSkills, loadCatalog, repoFileUrl, type Skill } from "./skillsCatalog";

const skill = (name: string, category: string): Skill => ({
  name,
  category,
  summary: "s",
  description: "d",
  path: `skills/${name}`,
  plugin: true,
});

describe("skillsCatalog", () => {
  it("loads the bundled snapshot with the supported schema", () => {
    const c = loadCatalog();
    expect(c.count).toBe(c.skills.length);
    expect(c.agents_count).toBe(c.agents.length);
    expect(c.skills.length).toBeGreaterThan(0);
  });

  it("rejects an unknown schema instead of rendering a broken page", () => {
    expect(() => loadCatalog({ schema_version: 2, skills: [], agents: [] })).toThrow(
      /unsupported schema/,
    );
  });

  it("groups in fixed order and never drops an unknown category", () => {
    const groups = groupSkills(
      [skill("a", "Pisanie"), skill("b", "Architektura i decyzje"), skill("c", "Nowa kategoria")],
      "en",
    );
    expect(groups.map((g) => g.label)).toEqual(["Architecture and decisions", "Writing", "Other"]);
    expect(groups.flatMap((g) => g.skills).length).toBe(3);
  });

  it("labels categories per language with diacritics in Polish", () => {
    expect(categoryLabel("Review i jakosc", "pl")).toBe("Review i jakość");
    expect(categoryLabel("Review i jakosc", "en")).toBe("Review and quality");
  });

  it("links into the public repository", () => {
    expect(repoFileUrl("skills/pg-review")).toBe(
      "https://github.com/kamiljan11/coding-higher-mind/tree/main/skills/pg-review",
    );
  });
});
