import { type Lang } from "../i18n";

/**
 * A project's years as the page's language says them. The data keeps one
 * form ("2021–now", "2022–2024", "2026"); only an open end is translated,
 * and only when it is the whole last part, so a label can never be mangled
 * mid-word.
 */
const OPEN_END: Record<Lang, string> = { en: "now", pl: "obecnie" };

export function localizeYears(years: string, lang: Lang): string {
  const m = /^(\d{4})–now$/.exec(years);
  return m ? `${m[1] ?? ""}–${OPEN_END[lang]}` : years;
}
