import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { type Lang } from "../i18n";
import { useLang } from "../hooks/useLang";
import { findPost, type Block } from "../data/posts";
import { formatDate } from "../lib/formatDate";
import { inlineSegments } from "../lib/inline";

/**
 * One blog post. Content comes from src/data/posts.ts; this file only lays it
 * out. Meta is Polish on the server (the blog's default language), the body
 * follows the language toggle like every other page.
 */

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    if (!findPost(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const p = findPost(params.slug);
    const b = p?.body.pl;
    const url = `https://kamiljan.com/blog/${params.slug}`;
    return {
      meta: [
        { title: b ? `${b.title} | Kamil Jan` : "Blog | Kamil Jan" },
        { name: "description", content: b?.description ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: b?.title ?? "" },
        { property: "og:description", content: b?.description ?? "" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: b?.title,
                description: b?.description,
                datePublished: p.date,
                author: {
                  "@type": "Person",
                  name: "Kamil Jan Włodarczyk",
                  url: "https://kamiljan.com",
                },
                mainEntityOfPage: url,
              }),
            },
          ]
        : [],
    };
  },
  component: PostPage,
});

const COPY: Record<Lang, { back: string; repo: string; cta: string; ctaLink: string }> = {
  pl: {
    back: "Wszystkie wpisy",
    repo: "Kod na GitHubie",
    cta: "Chcesz coś podobnego u siebie w firmie?",
    ctaLink: "Bezpłatna konsultacja",
  },
  en: {
    back: "All posts",
    repo: "Code on GitHub",
    cta: "Want something like this in your company?",
    ctaLink: "Free consultation",
  },
};

function Inline({ text }: { text: string }) {
  return (
    <>
      {inlineSegments(text).map((s, i) =>
        s.kind === "code" ? (
          <code key={i}>{s.text}</code>
        ) : s.kind === "link" ? (
          <a
            key={i}
            href={s.href}
            {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {s.text}
          </a>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

function PostBlock({ b }: { b: Block }) {
  switch (b.t) {
    case "h2":
      return (
        <h2 id={b.id} className="post-h2">
          {b.text}
        </h2>
      );
    case "p":
      return (
        <p>
          <Inline text={b.text} />
        </p>
      );
    case "list":
      return (
        <ul className="post-list">
          {b.items.map((it) => (
            <li key={it}>
              <Inline text={it} />
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="post-code">
          <code>{b.code}</code>
        </pre>
      );
    case "img":
      return (
        <figure className="post-fig">
          <img
            src={b.src}
            alt={b.alt}
            width={b.width}
            height={b.height}
            loading="lazy"
            decoding="async"
          />
          <figcaption>{b.caption}</figcaption>
        </figure>
      );
  }
}

function PostPage() {
  const { slug } = Route.useLoaderData();
  const [lang] = useLang("pl");
  const post = findPost(slug);
  if (!post) return null;
  const b = post.body[lang];
  const c = COPY[lang];
  return (
    <div className="svc-page post-page">
      <article className="post">
        <Link to="/blog" className="post-back">
          ← {c.back}
        </Link>
        <time className="post-date" dateTime={post.date}>
          {formatDate(post.date, lang)}
        </time>
        <h1 className="post-h1">{b.title}</h1>
        <p className="post-lead">{b.lead}</p>
        {post.repo && (
          <a className="post-repo" href={post.repo} target="_blank" rel="noreferrer">
            {c.repo} ↗
          </a>
        )}
        <div className="post-body">
          {b.blocks.map((x, i) => (
            <PostBlock key={i} b={x} />
          ))}
        </div>
        <aside className="post-cta">
          <p>{c.cta}</p>
          <Link to="/kontakt" className="btn-primary">
            {c.ctaLink}
          </Link>
        </aside>
      </article>
    </div>
  );
}
