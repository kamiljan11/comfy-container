import { createFileRoute, Link } from "@tanstack/react-router";
import { type Lang } from "../i18n";
import { useLang } from "../hooks/useLang";
import { POSTS } from "../data/posts";
import { formatDate } from "../lib/formatDate";
import { pageMeta } from "../lib/seo";

/**
 * /blog — the list of posts from src/data/posts.ts, newest first. It was a
 * noindex placeholder until the first post existed; now it is a real page.
 */

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Blog: automatyzacja i AI w praktyce | Kamil Jan",
        description:
          "Wpisy o tym, co buduję z AI: narzędzia, które sam napisałem, wdrożenia, którymi mogę się podzielić, i rzeczy, których się przy tym nauczyłem.",
        url: "https://kamiljan.com/blog",
        locale: "pl_PL",
      }),
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/blog" }],
  }),
  component: BlogPage,
});

const COPY: Record<
  Lang,
  { eyebrow: string; h1: string; lead: string; read: string; source: string }
> = {
  pl: {
    eyebrow: "BLOG",
    h1: "Dzielę się tym, co robię z AI",
    lead: "Czego się uczę, nad czym pracuję i wdrożenia, którymi mogę się podzielić publicznie.",
    read: "Czytaj",
    source: "Opublikowane na",
  },
  en: {
    eyebrow: "BLOG",
    h1: "Sharing what I'm building with AI",
    lead: "What I'm learning, what I'm working on, and public implementations I can share.",
    read: "Read",
    source: "Published on",
  },
};

function BlogPage() {
  const [lang] = useLang("pl");
  const c = COPY[lang];
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="svc-page blog-page">
      <div className="container">
        <header className="svc-head">
          <span className="svc-eyebrow">{c.eyebrow}</span>
          <h1 className="svc-h1">{c.h1}</h1>
          <p className="svc-lead">{c.lead}</p>
        </header>
        <ul className="blog-list">
          {posts.map((p) => {
            const b = p.body[lang];
            return (
              <li key={p.slug} className="blog-item">
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="blog-thumb"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={p.cover.src}
                    alt={p.cover.alt[lang]}
                    width={p.cover.width}
                    height={p.cover.height}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
                <time dateTime={p.date}>{formatDate(p.date, lang)}</time>
                {p.external && (
                  // the full text lives on another site (ADR 0007); the card
                  // still opens our teaser, which links out in a new tab
                  <span className="blog-source">
                    {c.source} {p.external.source}
                  </span>
                )}
                <h2>
                  <Link to="/blog/$slug" params={{ slug: p.slug }}>
                    {b.title}
                  </Link>
                </h2>
                <p>{b.description}</p>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="blog-more">
                  {c.read} →
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
