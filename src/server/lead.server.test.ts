// Pure-helper tests only — sendLead() itself does network I/O (Resend + Anthropic)
// and is exercised manually/in prod, not here. See docs/ARCHITECTURE.md for the
// full lead-capture flow.
import { describe, expect, it } from "vitest";
import { br, esc, isValidEmail } from "./lead.server";

describe("esc", () => {
  it("escapes the characters that would break the lead email's HTML", () => {
    expect(esc("<script>alert('x')</script>")).toBe("&lt;script&gt;alert('x')&lt;/script&gt;");
  });

  it("escapes a bare ampersand", () => {
    expect(esc("Q&A")).toBe("Q&amp;A");
  });

  it("leaves plain text untouched", () => {
    expect(esc("hello world")).toBe("hello world");
  });
});

describe("br", () => {
  it("turns newlines into <br/> after escaping", () => {
    expect(br("line one\nline <two>")).toBe("line one<br/>line &lt;two&gt;");
  });

  it("returns escaped text unchanged when there is no newline", () => {
    expect(br("no breaks here")).toBe("no breaks here");
  });
});

describe("isValidEmail", () => {
  it("accepts a normal address", () => {
    expect(isValidEmail("visitor@example.com")).toBe(true);
  });

  it("rejects a missing @", () => {
    expect(isValidEmail("visitor.example.com")).toBe(false);
  });

  it("rejects a missing domain", () => {
    expect(isValidEmail("visitor@")).toBe(false);
  });

  it("rejects a one-character TLD", () => {
    expect(isValidEmail("visitor@example.c")).toBe(false);
  });

  it("rejects embedded whitespace", () => {
    expect(isValidEmail("visitor @example.com")).toBe(false);
  });
});
