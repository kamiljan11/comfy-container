import { describe, expect, it } from "vitest";
import { createLimiter, firstForwardedIp } from "./rateLimit";

describe("createLimiter", () => {
  it("allows up to max hits inside the window, then refuses", () => {
    const l = createLimiter({ windowMs: 1000, max: 3 });
    expect([0, 10, 20].map((t) => l.hit("a", t))).toEqual([true, true, true]);
    expect(l.hit("a", 30)).toBe(false);
  });

  it("lets hits through again once the oldest leave the window", () => {
    const l = createLimiter({ windowMs: 1000, max: 2 });
    l.hit("a", 0);
    l.hit("a", 500);
    expect(l.hit("a", 900)).toBe(false);
    expect(l.hit("a", 1000)).toBe(true); // the hit at 0 is now outside
  });

  it("does not count refused hits against the caller", () => {
    const l = createLimiter({ windowMs: 1000, max: 1 });
    l.hit("a", 0);
    expect(l.hit("a", 100)).toBe(false);
    expect(l.hit("a", 200)).toBe(false);
    expect(l.hit("a", 1000)).toBe(true);
  });

  it("keeps keys independent", () => {
    const l = createLimiter({ windowMs: 1000, max: 1 });
    expect(l.hit("a", 0)).toBe(true);
    expect(l.hit("b", 0)).toBe(true);
    expect(l.hit("a", 1)).toBe(false);
  });

  it("caps memory by evicting the least recently seen key", () => {
    const l = createLimiter({ windowMs: 1000, max: 1, maxKeys: 2 });
    l.hit("a", 0);
    l.hit("b", 1);
    l.hit("c", 2); // evicts "a"
    expect(l.size()).toBe(2);
    expect(l.hit("a", 3)).toBe(true); // forgotten, so allowed again
  });
});

describe("firstForwardedIp", () => {
  it("takes the client address from a forwarded chain", () => {
    expect(firstForwardedIp("203.0.113.7, 10.0.0.1")).toBe("203.0.113.7");
    expect(firstForwardedIp(" 198.51.100.2 ")).toBe("198.51.100.2");
  });

  it("falls back to one shared bucket when the header is missing", () => {
    expect(firstForwardedIp(undefined)).toBe("unknown");
    expect(firstForwardedIp("")).toBe("unknown");
    expect(firstForwardedIp(" , 10.0.0.1")).toBe("unknown");
  });
});
