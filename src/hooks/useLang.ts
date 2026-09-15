import { useCallback, useEffect, useSyncExternalStore } from "react";
import { type Lang } from "../i18n";

/**
 * One language for the whole site. The header lives in __root and every page
 * reads the same value, so a switch in the header changes the page under it.
 * Each route used to keep its own useState copy; with a global header that
 * would have meant flipping the flag without changing a word of the page.
 *
 * Resolution order: ?lang= in the URL, then localStorage, then the browser.
 * A language that arrived through ?lang= is saved as well, so following a
 * plain link to another page keeps it.
 *
 * `ssrDefault` is what the server renders, before any of that is knowable.
 * It matters for search: the service pages carry Polish slugs and Polish meta,
 * so rendering English body copy underneath would hand Google a page whose
 * title and content disagree about their language. Hydration renders the
 * server value first, then switches to the reader's own preference.
 */

const KEY = "kj-lang";

const isLang = (v: string | null | undefined): v is Lang => v === "en" || v === "pl";

/** Pure: which language a visit resolves to. Exported for tests. */
export function resolveLang(search: string, saved: string | null, browser: string): Lang {
  const fromUrl = new URLSearchParams(search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  if (isLang(saved)) return saved;
  return browser.toLowerCase().startsWith("pl") ? "pl" : "en";
}

/** Pure: what the server renders on a given path. Polish-first pages are the
 *  ones with Polish slugs and Polish meta. Exported for tests. */
export function ssrLangFor(pathname: string): Lang {
  return /^\/(uslugi|obszary|kontakt|blog|o-mnie|ksiazki)(\/|$)/.test(pathname) ? "pl" : "en";
}

let current: Lang | null = null;
const listeners = new Set<() => void>();

function persist(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch (err) {
    // private mode / blocked storage: the choice still holds for this page view
    console.warn("[lang] could not save the language choice", err);
  }
}

function readSaved(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null; // blocked storage reads as "nothing saved", same as a first visit
  }
}

function snapshot(): Lang {
  if (current) return current;
  current = resolveLang(window.location.search, readSaved(), navigator.language);
  if (isLang(new URLSearchParams(window.location.search).get("lang"))) persist(current);
  return current;
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function setLang(next: Lang) {
  current = next;
  persist(next);
  listeners.forEach((fn) => fn());
}

/** The store behind useLang, exported so its behaviour is testable without a DOM. */
export const langStore = { get: snapshot, set: setLang, subscribe };

export function useLang(ssrDefault: Lang = "en"): [Lang, () => void] {
  const lang = useSyncExternalStore(subscribe, snapshot, () => ssrDefault);

  // keep ?lang= in the address bar, so a shared link opens in the same language
  useEffect(() => {
    const u = new URL(window.location.href);
    if (u.searchParams.get("lang") !== lang) {
      u.searchParams.set("lang", lang);
      window.history.replaceState(window.history.state, "", u);
    }
  }, [lang]);

  const toggle = useCallback(() => setLang(snapshot() === "en" ? "pl" : "en"), []);
  return [lang, toggle];
}
