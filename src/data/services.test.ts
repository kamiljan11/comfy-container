import { describe, expect, it } from "vitest";
import { SERVICES, SERVICE_SLUGS, pickHomePains, type Service } from "./services";

const svc = (slug: string, tags: string[]): Service =>
  ({
    slug,
    problems: tags.map((tag) => ({ tag, title: `${slug}-${tag}`, body: "b" })),
  }) as unknown as Service;

describe("pickHomePains", () => {
  it.each(["en", "pl"] as const)("gives one card per service in %s, six different tags", (lang) => {
    const pains = pickHomePains(SERVICES[lang]);
    expect(pains.map((p) => p.slug)).toEqual(SERVICE_SLUGS);
    expect(new Set(pains.map((p) => p.tag)).size).toBe(pains.length);
    expect(pains.every((p) => p.title.length > 0 && p.body.length > 0)).toBe(true);
  });

  it("takes the i-th problem of the i-th service", () => {
    const pains = pickHomePains([svc("a", ["x", "y"]), svc("b", ["x", "y"])]);
    expect(pains.map((p) => p.title)).toEqual(["a-x", "b-y"]);
  });

  it("wraps around when a service has fewer problems than its position", () => {
    const pains = pickHomePains([svc("a", ["x"]), svc("b", ["x"]), svc("c", ["x", "y"])]);
    expect(pains.map((p) => p.title)).toEqual(["a-x", "b-x", "c-x"]);
  });

  it("skips a service with no problems instead of emitting an empty card", () => {
    const pains = pickHomePains([svc("a", ["x"]), svc("b", []), svc("c", ["x", "y", "z"])]);
    expect(pains.map((p) => p.slug)).toEqual(["a", "c"]);
    expect(pains[1]?.title).toBe("c-z");
  });
});
