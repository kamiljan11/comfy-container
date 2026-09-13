import { createFileRoute, Link } from "@tanstack/react-router";
import { type Lang } from "../i18n";
import { useLang } from "../hooks/useLang";

/**
 * /blog — in the menu before the first post, by Kamil's choice. Until a post
 * exists the page is noindex and stays out of the sitemap: an empty page in
 * Google is worse than no page. No topic titles here on purpose — Kamil: don't
 * invent them, just say posts are coming.
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
  meanwhile: string;
  services: string;
  cases: string;
};

const COPY: Record<Lang, Copy> = {
  pl: {
    eyebrow: "BLOG",
    h1: "Dzielę się tym, co robię z AI",
    lead: "Czego się uczę, nad czym pracuję, co mnie ostatnio zaciekawiło — i wdrożenia, którymi mogę się podzielić publicznie. Pierwsze wpisy w drodze.",
    meanwhile: "Na razie zobacz",
    services: "usługi",
    cases: "realizacje",
  },
  en: {
    eyebrow: "BLOG",
    h1: "Sharing what I'm building with AI",
    lead: "What I'm learning, what I'm working on, what caught my interest — and public implementations I can share. First posts on the way.",
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
        <p className="blog-meanwhile">
          {c.meanwhile} <Link to="/uslugi">{c.services}</Link> ·{" "}
          <Link to="/case-studies">{c.cases}</Link>
        </p>
      </div>
    </div>
  );
}
