import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { Cursor } from "../components/Cursor";
import { useLang, ssrLangFor } from "../hooks/useLang";
import { SiteHeader } from "../components/SiteHeader";
import appCss from "../styles.css?url";
import siteCss from "../site.css?url";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kamil Jan",
  alternateName: "Kamil Jan Włodarczyk",
  url: "https://kamiljan.com",
  image: "https://kamiljan.com/kamil.png",
  email: "hello@kamiljan.com",
  jobTitle: "AI Automation & Implementation Engineer",
  description:
    "Iceland-based builder and operator who ships AI in production and trains teams to adopt it. Founder of MAS Group, Flyt, Reykjawwwik, QuickFix, and more.",
  address: { "@type": "PostalAddress", addressLocality: "Reykjavík", addressCountry: "IS" },
  knowsAbout: [
    "AI Enablement",
    "AI Adoption",
    "AI Coaching",
    "Team Training",
    "AI Automation",
    "Business Operations",
    "Growth Marketing",
    "Systems Architecture",
    "B2B Operations",
    "MCP Servers",
    "LLM Workflows",
    "Voice Agents",
  ],
  sameAs: ["https://linkedin.com/in/kamiljan11", "https://github.com/kamiljan11"],
  author: [
    {
      "@type": "Book",
      name: "Simplified Practical Spirituality: The Complete Guidebook",
      url: "https://kamiljan.com/books/Simplified-Practical-Spirituality.pdf",
      isAccessibleForFree: true,
    },
    {
      "@type": "Book",
      name: "Simplified Practical Spirituality²: The Short Version",
      url: "https://kamiljan.com/books/Simplified-Practical-Spirituality-Short.pdf",
      isAccessibleForFree: true,
    },
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://kamiljan.com",
  name: "Kamil Jan",
  description:
    "Portfolio of Kamil Jan, entrepreneur, operator, and AI automation & implementation engineer based in Reykjavík, Iceland.",
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#06090a" },
      { title: "Kamil Jan | AI Builder, Operator & Team Enablement | Reykjavík" },
      {
        name: "description",
        content:
          "Reykjavík-based builder who ships AI in production and trains teams to actually use it. Available as an AI enablement lead, co-founder, advisor, or senior hire. 5+ years building B2B operations in Iceland.",
      },
      { name: "author", content: "Kamil Jan" },
      {
        name: "keywords",
        content:
          "Kamil Jan, AI enablement, AI coach, AI trainer, AI adoption, AI implementation, AI automation Reykjavik, builder Iceland, co-founder Iceland, MAS Group, Flyt Iceland",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kamiljan.com" },
      { property: "og:site_name", content: "Kamil Jan" },
      { property: "og:locale", content: "en_US" },
      {
        property: "og:title",
        content: "Kamil Jan | AI Builder, Operator & Team Enablement | Reykjavík",
      },
      {
        property: "og:description",
        content:
          "Reykjavík-based builder who ships AI in production and trains teams to actually use it. Available as an AI enablement lead, co-founder, advisor, or senior hire.",
      },
      { property: "og:image", content: "https://kamiljan.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Kamil Jan | AI Builder, Operator & Team Enablement | Reykjavík",
      },
      {
        name: "twitter:description",
        content:
          "Reykjavík-based builder who ships AI in production and trains teams to actually use it. Available as an AI enablement lead, co-founder, advisor, or senior hire.",
      },
      { name: "twitter:image", content: "https://kamiljan.com/og-image.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: siteCss },
      // No canonical here on purpose. A root-level one is emitted on every
      // page, so /cv, /claude, /case-studies and /uslugi/* each shipped two
      // canonical tags — their own and this one pointing at the homepage.
      // Google discards all of them when a page declares more than one, so
      // every route was effectively running without a canonical. Each route
      // that has a real URL declares its own; the homepage route declares this.
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  // The document language follows the same store the header and the pages
  // read: Polish on the server for the Polish-slug routes (/uslugi, /obszary,
  // /kontakt, /blog, /o-mnie), English elsewhere, and the reader's choice
  // once hydrated. A fixed lang="en" over Polish copy misled search engines
  // and screen readers alike.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [lang] = useLang(ssrLangFor(pathname));
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </head>
      <body>
        <Cursor />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // one header for every route; it used to live inside the homepage only
  return (
    <>
      <SiteHeader />
      <Outlet />
    </>
  );
}
