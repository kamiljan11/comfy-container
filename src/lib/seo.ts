/**
 * Per-page meta for a route's head(): the document title and description plus
 * the Open Graph and Twitter tags that LinkedIn, Facebook and X read when a
 * link is shared. __root.tsx sets site-wide defaults (image, site name,
 * homepage text); a child route's tags with the same name/property win, so
 * every page that uses this shows its own title in a share preview instead of
 * the homepage's.
 */
export type PageMetaInput = {
  title: string;
  description: string;
  url: string;
  /** og:locale; the root default is en_US, Polish pages pass pl_PL */
  locale?: "en_US" | "pl_PL";
};

export type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

export function pageMeta({ title, description, url, locale }: PageMetaInput): MetaTag[] {
  const tags: MetaTag[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (locale) tags.push({ property: "og:locale", content: locale });
  return tags;
}
