import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../hooks/useLang";
import { PRIVACY } from "../data/privacy";

/**
 * /polityka-prywatnosci — the GDPR information the consultation form and the
 * chat link to. Content lives in src/data/privacy.ts, written from what the
 * code does; this file only lays it out.
 */

export const Route = createFileRoute("/polityka-prywatnosci")({
  head: () => ({
    meta: [
      { title: "Polityka prywatności | Kamil Jan" },
      {
        name: "description",
        content:
          "Jakie dane zbiera kamiljan.com, po co, kto je przetwarza i jakie masz prawa. Administrator: Kamil Jan Włodarczyk.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/polityka-prywatnosci" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const [lang] = useLang("pl");
  const d = PRIVACY[lang];
  return (
    <div className="svc-page privacy-page">
      <article className="post">
        <h1 className="post-h1">{d.title}</h1>
        <p className="post-lead">{d.lead}</p>
        <p className="privacy-updated">{d.updated}</p>
        <div className="post-body">
          {d.sections.map((s) => (
            <section key={s.h}>
              <h2 className="post-h2">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
