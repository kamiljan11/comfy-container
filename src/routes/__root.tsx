import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import siteCss from "../site.css?url";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kamil Jan",
  "url": "https://kamiljan.com",
  "image": "https://kamiljan.com/kamil.png",
  "email": "hello@kamiljan.com",
  "jobTitle": "Entrepreneur & Systems Builder",
  "description": "Iceland-based entrepreneur, operator, and AI automation architect. Founder of MAS Group, Flyt, Reykjawwwik, QuickFix, and more.",
  "address": { "@type": "PostalAddress", "addressLocality": "Reykjavík", "addressCountry": "IS" },
  "knowsAbout": ["Business Operations", "AI Automation", "Growth Marketing", "Systems Architecture", "B2B Operations", "MCP Servers", "LLM Workflows", "Voice Agents"],
  "sameAs": ["https://github.com/mountainallservice", "https://linkedin.com/in/myspiritway", "https://youtube.com/@myspiritway"]
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://kamiljan.com",
  "name": "Kamil Jan",
  "description": "Portfolio of Kamil Jan — entrepreneur, operator, and AI automation architect based in Reykjavík, Iceland."
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Go home</Link>
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
      { title: "Kamil Jan — Co-Founder, Operator & AI Architect | Reykjavík" },
      { name: "description", content: "Reykjavík-based entrepreneur who builds and scales businesses. Available as co-founder, advisor, or senior hire. 5+ years building B2B operations in Iceland." },
      { name: "author", content: "Kamil Jan" },
      { name: "keywords", content: "Kamil Jan, entrepreneur Iceland, AI automation Reykjavik, systems builder, co-founder Iceland, MAS Group, Flyt Iceland" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kamiljan.com" },
      { property: "og:site_name", content: "Kamil Jan" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "Kamil Jan — Co-Founder, Operator & AI Architect | Reykjavík" },
      { property: "og:description", content: "Reykjavík-based entrepreneur who builds and scales businesses. Available as co-founder, advisor, or senior hire." },
      { property: "og:image", content: "https://kamiljan.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kamil Jan — Co-Founder, Operator & AI Architect | Reykjavík" },
      { name: "twitter:description", content: "Reykjavík-based entrepreneur who builds and scales businesses. Available as co-founder, advisor, or senior hire." },
      { name: "twitter:image", content: "https://kamiljan.com/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: siteCss },
      { rel: "canonical", href: "https://kamiljan.com" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
