import { describe, expect, it } from "vitest";
import {
  categoryLabel,
  detectLang,
  groupSkills,
  loadCatalog,
  repoFileUrl,
  type Skill,
} from "./skillsCatalog";
import raw from "../data/higher-mind-skills.json";

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

  it("rejects items the page would render as undefined", () => {
    const noPath = { ...raw, skills: [{ ...raw.skills[0], path: "" }] };
    expect(() => loadCatalog(noPath)).toThrow(/without name, summary or path/);
    const noInstall = { ...raw, install: {} };
    expect(() => loadCatalog(noInstall)).toThrow(/install/);
  });

  it("detects the description language for the lang attribute", () => {
    expect(detectLang("Recenzja dzialowa diffu: finderzy rownolegle i weryfikator")).toBe("pl");
    expect(detectLang("Systematyczny debugging zamiast zgadywania i latania objawow")).toBe("pl");
    expect(detectLang("Master architecture-decision skill: choose the right architecture")).toBe(
      "en",
    );
  });

  it("links into the public repository", () => {
    expect(repoFileUrl("skills/pg-review")).toBe(
      "https://github.com/kamiljan11/coding-higher-mind/tree/main/skills/pg-review",
    );
  });
});
