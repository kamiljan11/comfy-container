import { describe, expect, it } from "vitest";
import { consultMessage } from "./consult";

describe("consultMessage", () => {
  it("labels the source and the company in Polish", () => {
    expect(consultMessage({ company: " MAS ", message: " Faktury ręcznie ", lang: "pl" })).toBe(
      "Bezpłatna konsultacja — formularz /kontakt\nFirma: MAS\n\nFaktury ręcznie",
    );
  });

  it("labels them in English", () => {
    expect(consultMessage({ company: "Acme", message: "Quotes", lang: "en" })).toBe(
      "Free consultation — /kontakt form\nCompany: Acme\n\nQuotes",
    );
  });

  it("drops the company line when the field is empty or blank", () => {
    expect(consultMessage({ company: "   ", message: "Hi", lang: "en" })).toBe(
      "Free consultation — /kontakt form\n\nHi",
    );
  });
});
