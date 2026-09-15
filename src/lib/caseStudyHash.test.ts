import { describe, expect, it, vi } from "vitest";
import { hashToId, openStudy } from "./caseStudyHash";

type FakeEl = { tagName: string; open: boolean; scrollIntoView: ReturnType<typeof vi.fn> };

function fakeDoc(els: Record<string, FakeEl>) {
  return {
    getElementById: (id: string) => (els[id] ?? null) as unknown as HTMLElement | null,
  };
}

function el(tagName: string): FakeEl {
  return { tagName, open: false, scrollIntoView: vi.fn() };
}

describe("hashToId", () => {
  it("drops the leading # and accepts the router's hash without it", () => {
    expect(hashToId("#field-pricing-pwa")).toBe("field-pricing-pwa");
    expect(hashToId("field-pricing-pwa")).toBe("field-pricing-pwa");
  });

  it("percent-decodes the id", () => {
    expect(hashToId("#caf%C3%A9")).toBe("café");
  });

  it("falls back to the raw text on a malformed escape instead of throwing", () => {
    expect(hashToId("#bad%E0")).toBe("bad%E0");
  });

  it("gives an empty id for an empty hash", () => {
    expect(hashToId("")).toBe("");
    expect(hashToId("#")).toBe("");
  });
});

describe("openStudy", () => {
  it("opens the study with that id and scrolls it into view", () => {
    const study = el("DETAILS");
    expect(openStudy("a", fakeDoc({ a: study }))).toBe(true);
    expect(study.open).toBe(true);
    expect(study.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("opens only the study named, not another one", () => {
    const a = el("DETAILS");
    const b = el("DETAILS");
    openStudy("b", fakeDoc({ a, b }));
    expect(a.open).toBe(false);
    expect(b.open).toBe(true);
  });

  it("leaves anything that isn't a study alone", () => {
    const heading = el("H2");
    expect(openStudy("h", fakeDoc({ h: heading }))).toBe(false);
    expect(heading.open).toBe(false);
    expect(heading.scrollIntoView).not.toHaveBeenCalled();
    expect(openStudy("missing", fakeDoc({}))).toBe(false);
    expect(openStudy("", fakeDoc({ "": el("DETAILS") }))).toBe(false);
  });
});
