import { describe, expect, it } from "vitest";
import { resolveLang, ssrLangFor } from "./useLang";

describe("resolveLang", () => {
  it("takes ?lang= over everything else", () => {
    expect(resolveLang("?lang=pl", "en", "en-US")).toBe("pl");
    expect(resolveLang("?x=1&lang=en", "pl", "pl-PL")).toBe("en");
  });

  it("falls back to the saved choice when the URL has none or an unknown value", () => {
    expect(resolveLang("", "pl", "en-US")).toBe("pl");
    expect(resolveLang("?lang=de", "en", "pl-PL")).toBe("en");
  });

  it("uses the browser language last, Polish only for pl*", () => {
    expect(resolveLang("", null, "pl-PL")).toBe("pl");
    expect(resolveLang("", null, "PL")).toBe("pl");
    expect(resolveLang("", "garbage", "en-GB")).toBe("en");
    expect(resolveLang("", null, "")).toBe("en");
  });
});

describe("ssrLangFor", () => {
  it("renders the Polish-slug pages in Polish on the server", () => {
    for (const p of ["/uslugi", "/uslugi/integracje", "/kontakt", "/blog", "/blog/", "/o-mnie"]) {
      expect(ssrLangFor(p)).toBe("pl");
    }
  });

  it("renders everything else in English, including look-alike paths", () => {
    for (const p of [
      "/",
      "/cv",
      "/claude",
      "/case-studies",
      "/uslugix",
      "/blogroll",
      "/kontakty",
      "/o-mniej",
    ]) {
      expect(ssrLangFor(p)).toBe("en");
    }
  });
});
