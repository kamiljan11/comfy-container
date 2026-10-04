import { type Lang } from "../../i18n";
import { groupSkills, loadCatalog, REPO_URL, repoFileUrl } from "../../lib/skillsCatalog";

const catalog = loadCatalog();

const T: Record<
  Lang,
  {
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
    model: string;
  }
> = {
  en: {
    lead: "The skills I use every day, open source. Each one is a folder with a SKILL.md: Claude reads the description and loads it when a task matches. The list below is generated from the public repository, so it never drifts from the code.",
    installTitle: "Install",
    installPlugin: "Just the skills, as a Claude Code plugin (no hooks, no settings changes):",
    installFull: "The whole system with hooks, gates and reviewer agents:",
    installNote: "One skill only: copy its folder from the repository into ~/.claude/skills/.",
    skillsTitle: "Skills",
    agentsTitle: "Reviewer agents",
    agentsLead:
      "Read-only reviewers with a fresh context, one speciality each. They are part of the full install and run through the pg-review and pg-council skills.",
    fullOnly: "needs the full install",
    source: "SKILL.md on GitHub",
    model: "model",
  },
  pl: {
    lead: "Skille, których używam na co dzień, otwarte dla wszystkich. Każdy to folder z plikiem SKILL.md: Claude czyta opis i ładuje skill, gdy zadanie pasuje. Lista poniżej jest generowana z publicznego repozytorium, więc nie rozjeżdża się z kodem.",
    installTitle: "Instalacja",
    installPlugin: "Same skille jako plugin Claude Code (bez hooków i bez zmian w ustawieniach):",
    installFull: "Cały system z hookami, bramkami i agentami-recenzentami:",
    installNote: "Jeden skill: skopiuj jego folder z repozytorium do ~/.claude/skills/.",
    skillsTitle: "Skille",
    agentsTitle: "Agenci-recenzenci",
    agentsLead:
      "Recenzenci tylko do odczytu, ze świeżym kontekstem, każdy z jedną specjalnością. Należą do pełnej instalacji i działają przez skille pg-review i pg-council.",
    fullOnly: "wymaga pełnej instalacji",
    source: "SKILL.md na GitHubie",
    model: "model",
  },
};

export function SkillsTab({ lang }: { lang: Lang }) {
  const t = T[lang];
  const groups = groupSkills(catalog.skills, lang);

  return (
    <>
      <section className="cv-sec">
        <p>{t.lead}</p>
        <div className="ai-stats" aria-label={t.skillsTitle}>
          <div className="ai-stat">
            <span className="ai-stat-n">{catalog.count}</span>
            <span className="ai-stat-l">{t.skillsTitle}</span>
          </div>
          <div className="ai-stat">
            <span className="ai-stat-n">{catalog.agents_count}</span>
            <span className="ai-stat-l">{t.agentsTitle}</span>
          </div>
        </div>
      </section>

      <section className="cv-sec">
        <h2>{t.installTitle}</h2>
        <p>{t.installPlugin}</p>
        <pre className="hm-code">
          <code>{catalog.install.plugin.replace(" && ", "\n")}</code>
        </pre>
        <p>{t.installFull}</p>
        <pre className="hm-code">
          <code>{catalog.install.full_pg.replace(/ && /g, "\n")}</code>
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
                <p className="hm-sum">{s.summary}</p>
                <p className="hm-meta">
                  <a href={repoFileUrl(s.path)} target="_blank" rel="noopener noreferrer">
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
              <p className="hm-sum">{a.summary}</p>
              <p className="hm-meta">
                <a href={repoFileUrl(a.path)} target="_blank" rel="noopener noreferrer">
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
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            github.com/kamiljan11/coding-higher-mind →
          </a>
        </p>
      </section>
    </>
  );
}
