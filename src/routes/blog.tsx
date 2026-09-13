import { createFileRoute } from "@tanstack/react-router";
import { type Lang } from "../i18n";
import { useLang } from "../hooks/useLang";

/**
 * /blog — in the menu before the first post, by Kamil's choice. Until a post
 * exists the page is noindex and stays out of the sitemap: an empty page in
 * Google is worse than no page. The topics listed are the ones people search
 * for most around this offer (see the phrase research, 2026-09-13).
 */

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — automatyzacja i AI w firmie | Kamil Jan" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: BlogPage,
});

type Copy = {
  eyebrow: string;
  h1: string;
  lead: string;
  soon: string;
  topics: Array<{ title: string; body: string }>;
  meanwhile: string;
  services: string;
  cases: string;
};

const COPY: Record<Lang, Copy> = {
  pl: {
    eyebrow: "BLOG",
    h1: "Automatyzacja i AI w firmie, bez obietnic bez pokrycia",
    lead: "Pierwsze wpisy są w przygotowaniu. Będą o tym, o co firmy pytają najczęściej — z przykładami z systemów, które działają na produkcji.",
    soon: "W przygotowaniu",
    topics: [
      {
        title: "Polityka korzystania z AI w firmie — wzór i wdrożenie",
        body: "Co w niej musi być, kto ją podpisuje i jak sprawić, żeby ktoś się do niej stosował.",
      },
      {
        title: "Automatyzacja faktur i KSeF: od czego zacząć",
        body: "Które kroki warto zautomatyzować od razu, a które zostawić księgowości.",
      },
      {
        title: "Ile kosztuje automatyzacja procesu i kiedy się nie opłaca",
        body: "Jak policzyć zwrot, zanim cokolwiek powstanie — i kiedy uczciwa odpowiedź brzmi „nie”.",
      },
    ],
    meanwhile: "Na razie zobacz",
    services: "usługi",
    cases: "realizacje",
  },
  en: {
    eyebrow: "BLOG",
    h1: "Automation and AI in a company, without promises nobody can keep",
    lead: "The first posts are being written. They cover what companies ask about most — with examples from systems running in production.",
    soon: "Coming up",
    topics: [
      {
        title: "A company AI-use policy — template and rollout",
        body: "What it has to contain, who signs it, and how to get people to actually follow it.",
      },
      {
        title: "Automating invoices and KSeF: where to start",
        body: "Which steps to automate first, and which to leave with accounting.",
      },
      {
        title: "What automating a process costs, and when it does not pay",
        body: "How to work out the return before anything is built — and when the honest answer is no.",
      },
    ],
    meanwhile: "Meanwhile, see the",
    services: "services",
    cases: "case studies",
  },
};

function BlogPage() {
  const [lang] = useLang("pl");
  const c = COPY[lang];
  return (
    <div className="svc-page blog-page">
      <div className="container">
        <header className="svc-head">
          <span className="svc-eyebrow">{c.eyebrow}</span>
          <h1 className="svc-h1">{c.h1}</h1>
          <p className="svc-lead">{c.lead}</p>
        </header>
        <ul className="blog-soon">
          {c.topics.map((p) => (
            <li key={p.title} className="blog-soon-item">
              <span className="blog-soon-tag">{c.soon}</span>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="blog-meanwhile">
          {c.meanwhile} <a href="/uslugi">{c.services}</a> · <a href="/case-studies">{c.cases}</a>
        </p>
      </div>
    </div>
  );
}
