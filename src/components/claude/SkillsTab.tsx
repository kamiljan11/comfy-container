import { type Lang } from "../../i18n";
import { cardText, groupSkills, loadCatalog, REPO_URL, repoFileUrl } from "../../lib/skillsCatalog";

type Copy = {
  lead: string;
  installTitle: string;
  installPlugin: string;
  installFull: string;
  installNote: string;
  skillsTitle: string;
  agentsTitle: string;
  agentsLead: string;
  fullOnly: string;
  source: string;
  newTab: string;
  model: string;
  unavailable: string;
  repoLink: string;
};

const T: Record<Lang, Copy> = {
  en: {
    lead: "The skills I use every day, open source. Each one is a folder with a SKILL.md: Claude reads the description and loads it when a task matches. The cards are a snapshot of the public repository's skills.json: the list comes from the skill files themselves, and the short descriptions are written in both languages next to them.",
    installTitle: "Install",
    installPlugin: "Just the skills, as a Claude Code plugin (no hooks, no settings changes):",
    installFull: "The whole system with hooks, gates and reviewer agents:",
    installNote: "One skill only: copy its folder from the repository into ~/.claude/skills/.",
    skillsTitle: "Skills",
    agentsTitle: "Reviewer agents",
    agentsLead:
      "Read-only reviewers with a fresh context, one speciality each. They are part of the full install and run through the pg-review and pg-council skills.",
    fullOnly: "needs the full install",
    source: "Open SKILL.md on GitHub",
    newTab: "(opens in a new tab)",
    model: "model",
    unavailable:
      "The skills catalogue is temporarily unavailable. The full list is in the repository:",
    repoLink: "github.com/kamiljan11/coding-higher-mind",
  },
  pl: {
    lead: "Skille, których używam na co dzień, otwarte dla wszystkich. Każdy to folder z plikiem SKILL.md: Claude czyta opis i ładuje skill, gdy zadanie pasuje. Karty to migawka pliku skills.json z publicznego repozytorium: lista pochodzi z samych plików skilli, a krótkie opisy są pisane w obu językach obok nich.",
    installTitle: "Instalacja",
    installPlugin: "Same skille jako plugin Claude Code (bez hooków i bez zmian w ustawieniach):",
    installFull: "Cały system z hookami, bramkami i agentami-recenzentami:",
    installNote: "Jeden skill: skopiuj jego folder z repozytorium do ~/.claude/skills/.",
    skillsTitle: "Skille",
    agentsTitle: "Agenci-recenzenci",
    agentsLead:
      "Recenzenci tylko do odczytu, ze świeżym kontekstem, każdy z jedną specjalnością. Należą do pełnej instalacji i działają przez skille pg-review i pg-council.",
    fullOnly: "wymaga pełnej instalacji",
    source: "Otwórz SKILL.md na GitHubie",
    newTab: "(otwiera się w nowej karcie)",
    model: "model",
    unavailable: "Katalog skilli jest chwilowo niedostępny. Pełna lista jest w repozytorium:",
    repoLink: "github.com/kamiljan11/coding-higher-mind",
  },
};

/** Shell commands joined with && in skills.json, one per line on the page (wraps on a phone, no side scroll). */
const asLines = (cmd: string): string => cmd.split(" && ").join("\n");

export function SkillsTab({ lang }: { lang: Lang }) {
  const t = T[lang];
  let catalog: ReturnType<typeof loadCatalog>;
  try {
    catalog = loadCatalog();
  } catch (e) {
    // Bad snapshot: this tab shows a way out, the rest of /claude keeps working.
    console.error("[claude/skills] catalogue rejected:", e instanceof Error ? e.message : e);
    return (
      <section className="cv-sec">
        <p>
          {t.unavailable}{" "}
          <a className="hm-link" href={REPO_URL} target="_blank" rel="noopener noreferrer">
            {t.repoLink}
          </a>
        </p>
      </section>
    );
  }
  const groups = groupSkills(catalog.skills, lang);

  return (
    <>
      <section className="cv-sec">
        <p>{t.lead}</p>
        <div className="ai-stats">
          <div className="ai-stat">
            <span className="ai-stat-n">{catalog.skills.length}</span>
            <span className="ai-stat-l">{t.skillsTitle}</span>
          </div>
          <div className="ai-stat">
            <span className="ai-stat-n">{catalog.agents.length}</span>
            <span className="ai-stat-l">{t.agentsTitle}</span>
          </div>
        </div>
      </section>

      <section className="cv-sec">
        <h2>{t.installTitle}</h2>
        <p>{t.installPlugin}</p>
        <pre className="hm-code">
          <code>{asLines(catalog.install.plugin)}</code>
        </pre>
        <p>{t.installFull}</p>
        <pre className="hm-code">
          <code>{asLines(catalog.install.full_pg)}</code>
        </pre>
        <p className="ai-lead">{t.installNote}</p>
      </section>

      {groups.map((g) => (
        <section className="cv-sec" key={g.label}>
          <h2>{g.label}</h2>
          <ul className="hm-grid">
            {g.skills.map((s) => (
              <li className="hm-card" key={s.name}>
                <h3 className="hm-name">{s.name}</h3>
                <p className="hm-sum" lang={cardText(s, lang).lang}>
                  {cardText(s, lang).text}
                </p>
                <p className="hm-meta">
                  <a
                    className="hm-link"
                    href={repoFileUrl(s.path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.source}: ${s.name} ${t.newTab}`}
                  >
                    {t.source}
                  </a>
                  {!s.plugin && <span className="hm-badge">{t.fullOnly}</span>}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="cv-sec">
        <h2>{t.agentsTitle}</h2>
        <p className="ai-lead">{t.agentsLead}</p>
        <ul className="hm-grid">
          {catalog.agents.map((a) => (
            <li className="hm-card" key={a.name}>
              <h3 className="hm-name">{a.name}</h3>
              <p className="hm-sum" lang={cardText(a, lang).lang}>
                {cardText(a, lang).text}
              </p>
              <p className="hm-meta">
                <a
                  className="hm-link"
                  href={repoFileUrl(a.path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${a.path} ${t.newTab}`}
                >
                  {a.path}
                </a>
                {a.model && (
                  <span className="hm-badge">
                    {t.model}: {a.model}
                  </span>
                )}
              </p>
            </li>
          ))}
        </ul>
        <p>
          <a className="hm-link" href={REPO_URL} target="_blank" rel="noopener noreferrer">
            {t.repoLink} →
          </a>
        </p>
      </section>
    </>
  );
}
