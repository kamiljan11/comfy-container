import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("writes the Polish month in the genitive", () => {
    expect(formatDate("2026-09-21", "pl")).toBe("21 września 2026");
  });

  it("writes the English date day first", () => {
    expect(formatDate("2026-09-21", "en")).toBe("21 September 2026");
  });

  it("keeps the day on New Year's Eve regardless of timezone", () => {
    expect(formatDate("2026-12-31", "en")).toBe("31 December 2026");
  });
});
