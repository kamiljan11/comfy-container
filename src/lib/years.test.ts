import { describe, expect, it } from "vitest";
import { localizeYears } from "./years";

describe("localizeYears", () => {
  it("translates an open end on the Polish page", () => {
    expect(localizeYears("2021–now", "pl")).toBe("2021–obecnie");
  });

  it("keeps it in English on the English page", () => {
    expect(localizeYears("2021–now", "en")).toBe("2021–now");
  });

  it("leaves closed ranges and single years alone", () => {
    expect(localizeYears("2022–2024", "pl")).toBe("2022–2024");
    expect(localizeYears("2026", "pl")).toBe("2026");
  });

  it("does not touch 'now' inside another word", () => {
    expect(localizeYears("known", "pl")).toBe("known");
  });
});
