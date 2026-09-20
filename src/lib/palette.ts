import { type Lang } from "../i18n";
import { SERVICES } from "../data/services";
import { AREAS } from "../data/areas";
import { CASE_STUDIES } from "../data/caseStudies";
import { ABOUT_ITEMS } from "../data/siteMap";
import { normalizeText } from "./text";

/**
 * The command palette (Ctrl+K / ⌘K) as data: every page of the site, built
 * from the same sources the menus and pages render, plus a matcher that
 * ignores case and Polish diacritics — "uslugi" finds "Usługi", "lodz" finds
 * "Łódź". Pure functions, so the list and the matching are unit-tested and the
 * component only renders them.
 */

export type PaletteGroup = "pages" | "services" | "areas" | "cases" | "faq";

export type PaletteItem = {
  id: string;
  group: PaletteGroup;
  label: string;
  hint: string;
  href: string;
  /**
   * FAQ rows carry their answer, so the palette can answer the question in
   * place. Everything else navigates and has none.
   */
  answer?: string;
};

type PaletteCopy = {
  title: string;
  description: string;
  open: string;
  placeholder: string;
  empty: string;
  groups: Record<PaletteGroup | "actions", string>;
  switchLang: string;
  email: string;
  copyEmail: string;
  copied: string;
  whatsapp: string;
  linkedin: string;
  answerOpen: string;
  answerBack: string;
  keyMove: string;
  keyPick: string;
  keyClose: string;
};

export const PALETTE_COPY: Record<Lang, PaletteCopy> = {
  en: {
    title: "Search the site",
    description: "Type to filter pages, services, areas and case studies. Enter opens, Esc closes.",
    open: "Search the site",
    placeholder: "Search pages, services, case studies…",
    empty: "Nothing matches. Try another word.",
    groups: {
      pages: "Pages",
      services: "Services",
      areas: "Areas",
      cases: "Case studies",
      faq: "Answers",
      actions: "Actions",
    },
    switchLang: "Przełącz na polski",
    email: "Write an email",
    copyEmail: "Copy the email address",
    copied: "Copied",
    whatsapp: "Message on WhatsApp",
    linkedin: "Open LinkedIn",
    answerOpen: "Read it on the page",
    answerBack: "Back to the list",
    keyMove: "move",
    keyPick: "open",
    keyClose: "close",
  },
  pl: {
    title: "Szukaj na stronie",
    description:
      "Wpisz, żeby zawęzić strony, usługi, obszary i realizacje. Enter otwiera, Esc zamyka.",
    open: "Szukaj na stronie",
    placeholder: "Szukaj stron, usług, realizacji…",
    empty: "Nic nie pasuje. Spróbuj innego słowa.",
    groups: {
      pages: "Strony",
      services: "Usługi",
      areas: "Obszary",
      cases: "Realizacje",
      faq: "Odpowiedzi",
      actions: "Akcje",
    },
    switchLang: "Switch to English",
    email: "Napisz e-mail",
    copyEmail: "Skopiuj adres e-mail",
    copied: "Skopiowano",
    whatsapp: "Napisz na WhatsAppie",
    linkedin: "Otwórz LinkedIn",
    answerOpen: "Przeczytaj na stronie",
    answerBack: "Wróć do listy",
    keyMove: "ruch",
    keyPick: "otwórz",
    keyClose: "zamknij",
  },
};

const PAGES: Record<Lang, { label: string; hint: string; href: string }[]> = {
  en: [
    { label: "Home", hint: "The offer on one page", href: "/" },
    { label: "Services", hint: "All six kinds of work", href: "/uslugi" },
    { label: "Areas", hint: "Where in a company the work lands", href: "/obszary" },
    {
      label: "Case studies",
      hint: `${String(CASE_STUDIES.en.length)} projects in full`,
      href: "/case-studies",
    },
    { label: "Free consultation", hint: "30 minutes, no obligation", href: "/kontakt" },
    { label: "Blog", hint: "First posts on the way", href: "/blog" },
  ],
  pl: [
    { label: "Strona główna", hint: "Oferta na jednej stronie", href: "/" },
    { label: "Usługi", hint: "Sześć rodzajów pracy", href: "/uslugi" },
    { label: "Obszary", hint: "Gdzie w firmie ląduje automatyzacja", href: "/obszary" },
    {
      label: "Realizacje",
      hint: `${String(CASE_STUDIES.pl.length)} projektów w pełnym opisie`,
      href: "/case-studies",
    },
    { label: "Bezpłatna konsultacja", hint: "30 minut, bez zobowiązań", href: "/kontakt" },
    { label: "Blog", hint: "Pierwsze wpisy w drodze", href: "/blog" },
  ],
};

/** Every destination the palette offers, grouped, in the page language. */
export function paletteItems(lang: Lang): PaletteItem[] {
  const pages = [
    ...PAGES[lang],
    ...ABOUT_ITEMS[lang].map((a) => ({
      label: a.label,
      hint: a.hint,
      href: a.hash ? `${a.to}#${a.hash}` : a.to,
    })),
  ].map((p) => ({ id: `page:${p.href}`, group: "pages" as const, ...p }));

  const services = SERVICES[lang].map((s) => ({
    id: `service:${s.slug}`,
    group: "services" as const,
    label: s.navLabel,
    hint: s.h1,
    href: `/uslugi/${s.slug}`,
  }));

  const areas = AREAS[lang].map((a) => ({
    id: `area:${a.slug}`,
    group: "areas" as const,
    label: a.navLabel,
    hint: a.h1,
    href: `/obszary/${a.slug}`,
  }));

  const cases = CASE_STUDIES[lang].map((c) => ({
    id: `case:${c.slug}`,
    group: "cases" as const,
    label: c.title,
    hint: c.stack.slice(0, 3).join(" · "),
    href: `/case-studies#${c.slug}`,
  }));

  const faq = [...faqRows(SERVICES[lang], "uslugi"), ...faqRows(AREAS[lang], "obszary")];

  return [...pages, ...services, ...areas, ...cases, ...faq];
}

/**
 * One row per question on a service or area page. The answer travels with the
 * row so the palette can show it without a page load; `href` is where the same
 * answer lives on the site, for readers who want the surrounding page.
 */
function faqRows(
  pages: { slug: string; navLabel: string; faq: { q: string; a: string }[] }[],
  section: "uslugi" | "obszary",
): PaletteItem[] {
  return pages.flatMap((page) =>
    page.faq.map((entry, i) => ({
      id: `faq:${section}:${page.slug}:${String(i)}`,
      group: "faq" as const,
      label: entry.q,
      hint: page.navLabel,
      href: `/${section}/${page.slug}#faq-${String(i + 1)}`,
      answer: entry.a,
    })),
  );
}

/**
 * What an item is matched on: its label first (ranked highest), then the
 * hint, then its address — so the Polish slug finds a page in either
 * language ("uslugi" on the English site, "case" on the Polish one).
 */
export function paletteKeywords(item: PaletteItem): string[] {
  // The address is a keyword for destinations, so the Polish slug finds a page
  // in either language. FAQ rows are deliberately left out of that: 25 of them
  // sit under /uslugi/, and typing "uslugi" used to surface all of them
  // alongside the page the visitor actually meant.
  return item.group === "faq" ? [item.label, item.hint] : [item.label, item.hint, item.href];
}

/** A Mac (or an iPhone/iPad with a keyboard): the palette's modifier is ⌘, not Ctrl. */
export function isMacPlatform(userAgent: string): boolean {
  return /Mac|iPhone|iPad/.test(userAgent);
}

type ShortcutKeys = Pick<KeyboardEvent, "key" | "ctrlKey" | "metaKey" | "altKey" | "shiftKey">;

/**
 * Whether a keydown opens the palette: K with the platform's own modifier and
 * nothing else. Only ⌘K on a Mac, because Ctrl+K in a Mac text field deletes to
 * the end of the line; no Alt (AltGr is Ctrl+Alt on Windows) and no Shift
 * (Ctrl+Shift+K is a browser shortcut).
 */
export function isPaletteShortcut(e: ShortcutKeys, mac: boolean): boolean {
  const modifier = mac ? e.metaKey && !e.ctrlKey : e.ctrlKey && !e.metaKey;
  return modifier && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "k";
}

/** The shortcut as shown on the header button and announced to screen readers. */
export function shortcutHint(mac: boolean): { label: string; aria: string } {
  return mac ? { label: "⌘K", aria: "Meta+K" } : { label: "Ctrl K", aria: "Control+K" };
}

/**
 * The palette's filter (cmdk `filter` signature). Every typed word has to
 * appear in the label or the hint; a label that starts with the query ranks
 * first, then one that contains it, then a match only in the hint.
 * Returns 0 to hide an item.
 */
export function paletteScore(_value: string, search: string, keywords: string[] = []): number {
  const query = normalizeText(search).trim();
  if (!query) return 1;
  const label = normalizeText(keywords[0] ?? "");
  const haystack = normalizeText(keywords.join(" "));
  const words = query.split(/\s+/);
  if (!words.every((w) => haystack.includes(w))) return 0;
  if (label.startsWith(query)) return 1;
  if (label.includes(query)) return 0.8;
  return 0.5;
}
