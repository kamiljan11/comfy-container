import { createFileRoute, notFound } from "@tanstack/react-router";
import { useLang } from "../hooks/useLang";
import { faqJsonLd } from "../lib/faqJsonLd";
import { pageFaq } from "../data/sharedFaq";
import { AREAS, AREA_SLUGS, getArea } from "../data/areas";
import { ServicePageBody } from "../components/ServicePageBody";

/**
 * One area page: a business function (sales, customer service, admin, HR,
 * data, unusual processes) rather than a kind of work. Polish slug, copy
 * follows the language toggle, server renders Polish — same rules as /uslugi.
 */

const MORE = { en: "Other areas", pl: "Inne obszary" } as const;

export const Route = createFileRoute("/obszary/$slug")({
  loader: ({ params }) => {
    if (!AREA_SLUGS.includes(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const a = getArea("pl", params.slug);
    return {
      meta: [
        { title: a?.metaTitle ?? "Obszary | Kamil Jan" },
        { name: "description", content: a?.metaDescription ?? "" },
      ],
      links: [{ rel: "canonical", href: `https://kamiljan.com/obszary/${params.slug}` }],
      // FAQPage for the FAQ this page shows (Polish, as rendered on the server)
      scripts: a ? [{ type: "application/ld+json", children: faqJsonLd(pageFaq(a, "pl")) }] : [],
    };
  },
  component: AreaPage,
});

function AreaPage() {
  const { slug } = Route.useLoaderData();
  const [lang] = useLang("pl");
  const a = getArea(lang, slug);
  if (!a) return null;
  return (
    <ServicePageBody
      s={a}
      lang={lang}
      others={AREAS[lang].filter((x) => x.slug !== slug)}
      othersTitle={MORE[lang]}
      othersTo="/obszary/$slug"
    />
  );
}
