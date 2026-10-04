import { type Lang } from "../i18n";
import raw from "../data/higher-mind-skills.json";

/**
 * Catalogue behind the Skills tab on /claude. The data file is a SNAPSHOT of `skills.json`, which the
 * public repository's exporter (`bin/pg-export-public.py`) generates from the skill files themselves,
 * so no description here is written by hand. Refresh (manual, after a release of coding-higher-mind):
 *   curl -fsSL https://raw.githubusercontent.com/kamiljan11/coding-higher-mind/main/skills.json \
 *     -o src/data/higher-mind-skills.json && npx vitest run src/lib/skillsCatalog.test.ts
 */

export type Skill = {
  name: string;
  category: string;
  summary: string;
  description: string;
  path: string;
  plugin: boolean;
};

export type Agent = {
  name: string;
  model: string;
  tools: string;
  summary: string;
  path: string;
};

type Catalog = {
  schema_version: number;
  count: number;
  skills: Skill[];
  agents_count: number;
  agents: Agent[];
  install: { plugin: string; full_pg: string };
};

export const REPO_URL = "https://github.com/kamiljan11/coding-higher-mind";
export const SUPPORTED_SCHEMA = 1;

/** Display order and labels; the exporter writes the Polish key without diacritics. */
const CATEGORIES: { key: string; label: Record<Lang, string> }[] = [
  {
    key: "Architektura i decyzje",
    label: { en: "Architecture and decisions", pl: "Architektura i decyzje" },
  },
  { key: "Review i jakosc", label: { en: "Review and quality", pl: "Review i jakość" } },
  { key: "Debug", label: { en: "Debugging", pl: "Debugowanie" } },
  { key: "Petle agentow", label: { en: "Agent loops", pl: "Pętle agentów" } },
  { key: "Frontend", label: { en: "Frontend", pl: "Frontend" } },
  { key: "Pisanie", label: { en: "Writing", pl: "Pisanie" } },
];

const OTHER: Record<Lang, string> = { en: "Other", pl: "Inne" };

export function categoryLabel(key: string, lang: Lang): string {
  return CATEGORIES.find((c) => c.key === key)?.label[lang] ?? OTHER[lang];
}

/** Groups skills in the fixed category order; unknown categories land in "Other" at the end, never vanish. */
export function groupSkills(skills: Skill[], lang: Lang): { label: string; skills: Skill[] }[] {
  const known = CATEGORIES.map((c) => ({
    label: c.label[lang],
    skills: skills.filter((s) => s.category === c.key),
  }));
  const rest = skills.filter((s) => !CATEGORIES.some((c) => c.key === s.category));
  return [...known, { label: OTHER[lang], skills: rest }].filter((g) => g.skills.length > 0);
}

export function repoFileUrl(path: string): string {
  return `${REPO_URL}/tree/main/${path}`;
}

const isStr = (v: unknown): v is string => typeof v === "string" && v.length > 0;
const hasStrings = (o: unknown, keys: string[]): boolean =>
  typeof o === "object" &&
  o !== null &&
  keys.every((k) => isStr((o as Record<string, unknown>)[k]));
/** Card links go to `${REPO_URL}/tree/main/<path>`; the snapshot is refreshed by hand, so only known folders pass. */
const SAFE_PATH = /^(skills|agents)\/[\w.-]+$/;
const isEntry = (o: unknown): boolean =>
  hasStrings(o, ["name", "summary", "path"]) && SAFE_PATH.test((o as { path: string }).path);

/**
 * Checks the shape the page renders. Throws with the reason; the component catches it and shows a
 * fallback instead of breaking the whole /claude route. The unit test runs it on the bundled snapshot,
 * so a bad refresh stops CI before it reaches production.
 */
export function loadCatalog(data: unknown = raw): Catalog {
  const c = data as Partial<Catalog>;
  const problem =
    c.schema_version !== SUPPORTED_SCHEMA
      ? `unsupported schema ${String(c.schema_version)} (expected ${SUPPORTED_SCHEMA})`
      : !Array.isArray(c.skills) || !c.skills.every(isEntry)
        ? "a skill without name, summary or path"
        : !Array.isArray(c.agents) || !c.agents.every(isEntry)
          ? "an agent without name, summary or path"
          : !hasStrings(c.install, ["plugin", "full_pg"])
            ? "missing install commands"
            : null;
  if (problem) throw new Error(`higher-mind-skills.json: ${problem}`);
  return c as Catalog;
}

const PL_LETTERS = /[ąćęłńóśźż]/gi;
const PL_WORD = /\b(i|oraz|nie|dla|przed|jako|zamiast|uzyj|dzial\w*|recenzj\w*|tylko|swiezy)\b/gi;

/**
 * Descriptions come from the skill files in whichever language the skill was written in. The card gets
 * the matching `lang` so a screen reader on an English page reads a Polish description as Polish.
 * Polish letters by density (a lone "ó" in an English text naming toRzeszów is not Polish), or two
 * common Polish words for skills written in ASCII Polish.
 */
export function detectLang(text: string): Lang {
  const letters = (text.match(PL_LETTERS) ?? []).length;
  const words = (text.match(PL_WORD) ?? []).length;
  return letters * 150 >= text.length || words >= 2 ? "pl" : "en";
}
