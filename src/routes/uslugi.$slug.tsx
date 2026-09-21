import { createFileRoute, notFound } from "@tanstack/react-router";
import { useLang } from "../hooks/useLang";
import { faqJsonLd } from "../lib/faqJsonLd";
import { pageFaq } from "../data/sharedFaq";
import { SERVICES, SERVICE_SLUGS, getService } from "../data/services";
import { ServicePageBody } from "../components/ServicePageBody";
import { pageMeta } from "../lib/seo";

/**
 * One service page. The slug is language-independent (Polish, because these
 * pages exist to rank for Polish queries) while the copy switches with the
 * toggle, so a shared link keeps working regardless of the reader's language.
 * The sections themselves live in ServicePageBody, shared with /obszary.
 */

const MORE = { en: "Other things I build", pl: "Inne rzeczy, które buduję" } as const;

export const Route = createFileRoute("/uslugi/$slug")({
  loader: ({ params }) => {
    if (!SERVICE_SLUGS.includes(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    // Meta has to be resolvable on the server, before the client picks a
    // language. Polish is the default here because these pages target Polish
    // search queries.
    const s = getService("pl", params.slug);
    return {
      meta: [
        ...pageMeta({
          title: s?.metaTitle ?? "Usługi | Kamil Jan",
          description: s?.metaDescription ?? "",
          url: `https://kamiljan.com/uslugi/${params.slug}`,
          locale: "pl_PL",
        }),
      ],
      links: [{ rel: "canonical", href: `https://kamiljan.com/uslugi/${params.slug}` }],
      // FAQPage for the FAQ this page shows (Polish, as rendered on the server)
      scripts: s ? [{ type: "application/ld+json", children: faqJsonLd(pageFaq(s, "pl")) }] : [],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const [lang] = useLang("pl");
  const s = getService(lang, slug);
  if (!s) return null;
  return (
    <ServicePageBody
      s={s}
      lang={lang}
      others={SERVICES[lang].filter((x) => x.slug !== slug)}
      othersTitle={MORE[lang]}
      othersTo="/uslugi/$slug"
    />
  );
}
