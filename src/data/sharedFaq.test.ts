import { describe, expect, it } from "vitest";
import { pageFaq } from "./sharedFaq";
import { SERVICES, type Service } from "./services";

const base = SERVICES.pl[0] as Service;

describe("pageFaq", () => {
  it("adds the security and growth questions after the page's own", () => {
    const faq = pageFaq(base, "pl");
    expect(faq.slice(0, base.faq.length)).toEqual(base.faq);
    expect(faq.map((f) => f.q)).toContain("Czy to jest bezpieczne?");
    expect(faq.map((f) => f.q)).toContain("Czy system da się później rozbudować?");
  });

  it("does not repeat a question the page already asks", () => {
    const own: Service = {
      ...base,
      faq: [{ q: "Czy to jest bezpieczne?", a: "Własna odpowiedź." }],
    };
    const faq = pageFaq(own, "pl");
    expect(faq.filter((f) => f.q === "Czy to jest bezpieczne?")).toHaveLength(1);
    expect(faq[0]?.a).toBe("Własna odpowiedź.");
  });

  it("answers in English on English pages", () => {
    expect(pageFaq(SERVICES.en[0] as Service, "en").map((f) => f.q)).toContain("Is it secure?");
  });
});
