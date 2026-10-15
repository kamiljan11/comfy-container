import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment } from "react";
import { SkillsTab } from "../components/claude/SkillsTab";
import { Figure } from "../components/claude/Figure";
import type { Content, Figures, Item, Section } from "../components/claude/types";
import { en } from "../content/claude/en";
import { pl } from "../content/claude/pl";
import { REPO_URL } from "../lib/skillsCatalog";
import { useLang } from "../hooks/useLang";
import { type Lang } from "../i18n";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/claude")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Kamil Jan | Coding Higher Mind: the AI system behind the work",
        description:
          "The meta layer under every project Kamil Jan builds with AI: hardened prompts, automatic checks at every step, reviewer departments with fresh context, and a loop that turns failures into checks. PG 1.8.0, counted rather than estimated, with charts. Open source.",
        url: "https://kamiljan.com/claude",
      }),
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/claude" }],
  }),
  // ?tab=skills: the Skills and agents catalogue is a shareable link, not hidden state. `lang` is declared
  // here too, so switching tabs keeps ?lang= in the address bar (a shared link opens in the sender's language).
  validateSearch: (s: Record<string, unknown>): { tab?: "skills"; lang?: Lang } => ({
    ...(s.tab === "skills" ? { tab: "skills" as const } : {}),
    ...(s.lang === "en" || s.lang === "pl" ? { lang: s.lang } : {}),
  }),
  component: ClaudePage,
});

const CONTENT: Record<Lang, Content> = { en, pl };

// Interface words of the page itself; the article lives in src/content/claude.
type Ui = {
  system: string;
  skills: string;
  label: string;
  part: string;
  toMap: string;
  withChart: string;
  chartSr: string;
  counts: string;
};

const TABS: Record<Lang, Ui> = {
  en: {
    system: "The system",
    skills: "Skills and agents",
    label: "Page sections",
    part: "Part",
    toMap: "Back to the page map",
    withChart: "with a chart",
    chartSr: " (chart)",
    counts: "System counts",
  },
  pl: {
    system: "System",
    skills: "Skille i agenci",
    label: "Sekcje strony",
    part: "Część",
    toMap: "Wróć do mapy strony",
    withChart: "z wykresem",
    chartSr: " (wykres)",
    counts: "Liczby systemu",
  },
};

// The router marks the active tab (aria-current="page"). `tab: undefined` plus explicitUndefined makes
// "The system" inactive on ?tab=skills; without it both links matched the same /claude path.
const TAB_ACTIVE = { includeSearch: true, explicitUndefined: true } as const;

function ClaudeTabs({ lang }: { lang: Lang }) {
  const t = TABS[lang];
  return (
    <nav className="hm-tabs" aria-label={t.label}>
      <Link
        to="/claude"
        search={(prev) => ({ ...prev, tab: undefined })}
        activeOptions={TAB_ACTIVE}
        className="hm-tab"
      >
        {t.system}
      </Link>
      <Link
        to="/claude"
        search={(prev) => ({ ...prev, tab: "skills" as const })}
        activeOptions={TAB_ACTIVE}
        className="hm-tab"
      >
        {t.skills}
      </Link>
    </nav>
  );
}

function ClaudeHead({ title, role, lang }: { title: string; role: string; lang: Lang }) {
  return (
    <>
      <header className="cv-head">
        <h1>{title}</h1>
        <p className="cv-role">{role}</p>
      </header>
      <ClaudeTabs lang={lang} />
    </>
  );
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="cv-list">
      {items.map((it) => (
        <li key={it.label}>
          <b>{it.label}</b> {it.body}
        </li>
      ))}
    </ul>
  );
}

/**
 * The page map: every part as a card, every section in it as a link. It is the table of contents
 * and the overview in one, so a reader on a phone sees the whole shape before the first long section.
 */
function PageMap({ c, lang }: { c: Content; lang: Lang }) {
  return (
    <section className="cv-sec" aria-labelledby="page-map">
      <h2 id="page-map">{c.mapTitle}</h2>
      <p className="ai-lead">{c.mapLead}</p>
      <nav aria-label={c.tocLabel}>
        <ol className="pm-grid">
          {c.parts.map((p, i) => {
            const secs = c.sections.filter((s) => s.part === i);
            return (
              <li key={p.title} className="pm-card">
                <a className="pm-head" href={`#part-${i + 1}`}>
                  <span className="pm-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="pm-title">{p.title}</span>
                </a>
                <p className="pm-blurb">{p.blurb}</p>
                <ol className="pm-links">
                  {secs.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>{s.title}</a>
                      {s.figure && (
                        <span className="pm-fig" title={TABS[lang].withChart}>
                          <span className="sr-only">{TABS[lang].chartSr}</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
}

function PartDivider({ c, i, lang }: { c: Content; i: number; lang: Lang }) {
  const t = TABS[lang];
  return (
    <div className="pm-divider" id={`part-${i + 1}`}>
      <span className="pm-divider-n">
        {t.part} {i + 1} / {c.parts.length}
      </span>
      <h2 className="pm-divider-t">{c.parts[i].title}</h2>
      <a className="pm-divider-up" href="#page-map" aria-label={t.toMap}>
        ↑
      </a>
    </div>
  );
}

function SectionBlock({ s, f }: { s: Section; f: Figures }) {
  return (
    <section className="cv-sec ai-sec" aria-labelledby={s.id}>
      <h2 id={s.id}>{s.title}</h2>
      {s.lead && <p className="ai-lead">{s.lead}</p>}
      {s.figure && <Figure k={s.figure} f={f} />}
      {s.paragraphs?.map((p, i) => (
        // static copy, never reordered: the position is a stable key
        <p key={`${s.id}-${String(i)}`}>{p}</p>
      ))}
      {s.code && (
        <ul className="cv-list">
          {s.code.map((line) => (
            <li key={line}>
              <code>{line}</code>
            </li>
          ))}
        </ul>
      )}
      {s.items && <ItemList items={s.items} />}
      {s.link && (
        <p>
          <a href={s.link.href} target="_blank" rel="noopener noreferrer">
            {s.link.text}
          </a>
        </p>
      )}
    </section>
  );
}

function ClaudePage() {
  const [lang] = useLang("en");
  const { tab } = Route.useSearch();
  const c = CONTENT[lang];

  if (tab === "skills") {
    return (
      <div className="cv-page">
        <article className="cv-paper">
          <ClaudeHead title={c.title} role={c.role} lang={lang} />
          <SkillsTab lang={lang} />
        </article>
      </div>
    );
  }

  return (
    <div className="cv-page">
      <div className="read-progress" aria-hidden="true" />
      <article className="cv-paper">
        <ClaudeHead title={c.title} role={c.role} lang={lang} />
        <p className="ai-lead">{c.versionLine}</p>

        <section className="cv-sec ai-sec">
          <p>{c.intro}</p>
          <p>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              {c.repoCta}
            </a>
          </p>
          <div className="ai-stats ai-stats-8" aria-label={TABS[lang].counts}>
            {c.stats.map((s) => (
              <div key={s.label} className="ai-stat">
                <span className="ai-stat-n">{s.n}</span>
                <span className="ai-stat-l">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="ai-stats-note">{c.statsNote}</p>
        </section>

        <PageMap c={c} lang={lang} />

        {c.sections.map((s, idx) => (
          <Fragment key={s.id}>
            {(idx === 0 || c.sections[idx - 1].part !== s.part) && (
              <PartDivider c={c} i={s.part} lang={lang} />
            )}
            <SectionBlock s={s} f={c.figures} />
          </Fragment>
        ))}

        <p className="ai-colophon">{c.colophon}</p>
      </article>
    </div>
  );
}
