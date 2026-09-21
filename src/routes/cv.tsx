import { pageMeta } from "../lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../hooks/useLang";
import { CV_CONTENT } from "../data/cv";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Kamil Jan Włodarczyk | CV",
        description:
          "CV of Kamil Jan Włodarczyk, AI automation & implementation engineer, builder and operator. Reykjavík, remote-first.",
        url: "https://kamiljan.com/cv",
      }),
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/cv" }],
  }),
  component: CVPage,
});

function CVPage() {
  const [lang] = useLang("en");

  const cv = CV_CONTENT[lang];

  return (
    <div className="cv-page">
      <div className="read-progress" aria-hidden="true" />
      <div className="cv-bar cv-bar-end">
        <button type="button" className="cv-download" onClick={() => window.print()}>
          {cv.download}
        </button>
      </div>

      <article className="cv-paper">
        <header className="cv-head">
          <h1>Kamil Jan Włodarczyk</h1>
          <p className="cv-role">{cv.role}</p>
          <p className="cv-contact">
            {cv.contact}
            <br />
            <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a> ·{" "}
            <a href="https://wa.me/3548888901" target="_blank" rel="noreferrer">
              WhatsApp +354 8888901
            </a>{" "}
            ·{" "}
            <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">
              linkedin.com/in/kamiljan11
            </a>{" "}
            ·{" "}
            <a href="https://kamiljan.com" target="_blank" rel="noreferrer">
              kamiljan.com
            </a>
          </p>
        </header>

        <section className="cv-sec">
          <h2>{cv.sec.summary}</h2>
          <p>{cv.summary}</p>
        </section>

        <section className="cv-sec">
          <h2>{cv.sec.skills}</h2>
          <ul className="cv-skills">
            {cv.skills.map((s, i) => (
              <li key={i}>
                <b>{s.label}</b> {s.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{cv.sec.experience}</h2>
          {cv.experience.map((e) => (
            <div key={e.role + e.org} className="cv-job">
              <div className="cv-job-head">
                <h3>
                  {e.role} <span>· {e.org}</span>
                </h3>
                <span className="cv-job-dates">{e.dates}</span>
              </div>
              {e.loc && <p className="cv-job-loc">{e.loc}</p>}
              <ul className="cv-bullets">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="cv-sec">
          <h2>{cv.sec.education}</h2>
          <ul className="cv-list">
            {cv.education.map((s, i) => (
              <li key={i}>
                <b>{s.label}</b> {s.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{cv.sec.languages}</h2>
          <ul className="cv-list">
            {cv.languages.map((s, i) => (
              <li key={i}>
                <b>{s.label}</b> {s.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{cv.sec.openTo}</h2>
          <p>{cv.openTo}</p>
        </section>
      </article>
    </div>
  );
}
