import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import raw from "../../data/higher-mind-skills.json";

describe("SkillsTab", () => {
  it("renders every skill and agent card with a GitHub link", async () => {
    const { SkillsTab } = await import("./SkillsTab");
    const html = renderToString(createElement(SkillsTab, { lang: "pl" }));
    expect(html.match(/class="hm-card"/g)?.length).toBe(raw.skills.length + raw.agents.length);
    expect(html).toContain("https://github.com/kamiljan11/coding-higher-mind/tree/main/skills/");
    expect(html).toContain("Otwórz SKILL.md na GitHubie");
    expect(html).toContain('lang="pl"');
  });

  it("shows a fallback instead of crashing the route when the snapshot is bad", async () => {
    vi.resetModules();
    vi.doMock("../../data/higher-mind-skills.json", () => ({ default: { schema_version: 99 } }));
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const { SkillsTab } = await import("./SkillsTab");
      const html = renderToString(createElement(SkillsTab, { lang: "en" }));
      expect(html).toContain("temporarily unavailable");
      expect(html).not.toContain('class="hm-card"');
      expect(errors).toHaveBeenCalled();
    } finally {
      vi.doUnmock("../../data/higher-mind-skills.json");
      errors.mockRestore();
    }
  });
});
