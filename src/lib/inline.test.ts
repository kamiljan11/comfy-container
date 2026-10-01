import { describe, expect, it } from "vitest";
import { inlineSegments } from "./inline";

describe("inlineSegments", () => {
  it("returns plain text untouched", () => {
    expect(inlineSegments("Zwykłe zdanie.")).toEqual([{ kind: "text", text: "Zwykłe zdanie." }]);
  });

  it("splits out links and code in order", () => {
    expect(
      inlineSegments("Pobierz z [Releases](https://github.com/x/releases) i uruchom `run.vbs`."),
    ).toEqual([
      { kind: "text", text: "Pobierz z " },
      { kind: "link", text: "Releases", href: "https://github.com/x/releases" },
      { kind: "text", text: " i uruchom " },
      { kind: "code", text: "run.vbs" },
      { kind: "text", text: "." },
    ]);
  });

  it("accepts site-relative links", () => {
    expect(inlineSegments("[CV](/cv)")).toEqual([{ kind: "link", text: "CV", href: "/cv" }]);
  });

  it("keeps an unsafe link as plain text", () => {
    expect(inlineSegments("[x](javascript:alert(1))")).toEqual([
      { kind: "text", text: "[x](javascript:alert(1)" },
      { kind: "text", text: ")" },
    ]);
  });

  it("leaves an unclosed backtick alone", () => {
    expect(inlineSegments("a `b")).toEqual([{ kind: "text", text: "a `b" }]);
  });

  it("splits out bold key facts", () => {
    expect(inlineSegments("Straty: **3 252 247 zł**, głównie seniorów.")).toEqual([
      { kind: "text", text: "Straty: " },
      { kind: "bold", text: "3 252 247 zł" },
      { kind: "text", text: ", głównie seniorów." },
    ]);
  });

  it("leaves unclosed or empty bold markers as text", () => {
    expect(inlineSegments("a **b")).toEqual([{ kind: "text", text: "a **b" }]);
    expect(inlineSegments("a ****")).toEqual([{ kind: "text", text: "a ****" }]);
  });

  it("does not turn bold text inside code into bold", () => {
    expect(inlineSegments("`**x**`")).toEqual([{ kind: "code", text: "**x**" }]);
  });
});
