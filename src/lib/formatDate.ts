import { type Lang } from "../i18n";

/**
 * A post date ("2026-09-21") as a reader expects it: "21 września 2026" /
 * "21 September 2026". Pinned to UTC noon so the server and a browser in any
 * timezone print the same day and hydration never mismatches.
 */
export function formatDate(iso: string, lang: Lang): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === "pl" ? "pl-PL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
