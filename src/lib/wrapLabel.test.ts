import { describe, expect, it } from "vitest";
import { wrapLabel } from "./wrapLabel";

describe("wrapLabel", () => {
  it("leaves a label that fits on one line", () => {
    expect(wrapLabel("lint + typecheck", 20)).toEqual(["lint + typecheck"]);
    expect(wrapLabel("  200 from   real domain ", 20)).toEqual(["200 from real domain"]);
  });

  it("breaks before a plus, picking the most balanced split", () => {
    expect(wrapLabel("quality + mutacje + gitleaks", 20)).toEqual([
      "quality + mutacje",
      "+ gitleaks",
    ]);
    expect(wrapLabel("tier + testy + recenzenci", 20)).toEqual(["tier + testy", "+ recenzenci"]);
    expect(wrapLabel("strażnik + zakaz no-verify", 20)).toEqual(["strażnik", "+ zakaz no-verify"]);
  });

  it("wraps on spaces when there is no plus to break at", () => {
    expect(wrapLabel("tylko aktualny merge-ref", 20)).toEqual(["tylko aktualny", "merge-ref"]);
    expect(wrapLabel("200 z prawdziwej domeny", 20)).toEqual(["200 z prawdziwej", "domeny"]);
  });

  it("falls back to spaces when no plus split fits", () => {
    expect(wrapLabel("verylongword + another verylongword", 12)).toEqual([
      "verylongword",
      "+ another",
      "verylongword",
    ]);
  });

  it("keeps an over-long single word whole instead of cutting it", () => {
    expect(wrapLabel("a supercalifragilistic b", 10)).toEqual(["a", "supercalifragilistic", "b"]);
  });

  it("never returns a line longer than max unless a single word is", () => {
    const text =
      "every escape hatch is a named variable (ALLOW_…=1), logged and reported in the weekly audit — bypassing the hooks is banned by standing rule";
    for (const line of wrapLabel(text, 80)) expect(line.length).toBeLessThanOrEqual(80);
  });
});
