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
});
