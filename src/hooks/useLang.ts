import { useEffect, useState } from "react";
import { type Lang } from "../i18n";

/**
 * Resolves the language from ?lang=, then localStorage, then the browser, and
 * keeps ?lang= in the URL so the choice survives a shared link.
 *
 * `ssrDefault` is what the server renders, before any of that is knowable. It
 * matters for search: the service pages carry Polish slugs and Polish meta, so
 * rendering English body copy underneath would hand Google a page whose title
 * and content disagree about their language — and the Polish phrase those
 * pages exist to rank for would never land. The client still corrects to the
 * reader's own preference on mount.
 */
export function useLang(ssrDefault: Lang = "en"): [Lang, () => void] {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return ssrDefault;
    const url = new URLSearchParams(window.location.search).get("lang") as Lang;
    if (url === "en" || url === "pl") return url;
    const saved = localStorage.getItem("kj-lang") as Lang;
    if (saved === "en" || saved === "pl") return saved;
    return navigator.language.startsWith("pl") ? "pl" : "en";
  });

  const toggle = () =>
    setLang((l) => {
      const next: Lang = l === "en" ? "pl" : "en";
      if (typeof window !== "undefined") localStorage.setItem("kj-lang", next);
      return next;
    });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const u = new URL(window.location.href);
    if (u.searchParams.get("lang") !== lang) {
      u.searchParams.set("lang", lang);
      window.history.replaceState({}, "", u);
    }
  }, [lang]);

  return [lang, toggle];
}
