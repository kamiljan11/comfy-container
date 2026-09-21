// Share previews (LinkedIn, Facebook, X) read og:* from the server HTML. Before
// this test every page except blog posts sent the homepage's og:title.
import { test, expect } from "@playwright/test";

// English pages keep the root en_US; everything else is Polish on the server
const EN = new Set(["/case-studies", "/claude", "/cv"]);

const PAGES = [
  "/case-studies",
  "/claude",
  "/cv",
  "/kontakt",
  "/ksiazki",
  "/o-mnie",
  "/obszary",
  "/obszary/obsluga-klienta",
  "/polityka-prywatnosci",
  "/uslugi",
  "/uslugi/integracje",
  "/blog",
  "/blog/claude-autoshutdown",
];

const meta = (html: string, key: string): string | undefined => {
  const re = new RegExp(`<meta[^>]+(?:property|name)="${key}"[^>]+content="([^"]*)"`, "g");
  const all = [...html.matchAll(re)].map((m) => m[1]);
  return all.at(-1);
};

test("every page has its own og:title, matching its <title>, and its own og:url", async ({
  request,
}) => {
  const home = await (await request.get("/")).text();
  const homeOg = meta(home, "og:title");
  const seen = new Map<string, string>();
  for (const path of PAGES) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    const html = await res.text();
    const title = /<title>([^<]*)<\/title>/.exec(html)?.[1];
    const ogTitle = meta(html, "og:title");
    expect(ogTitle, path).toBeTruthy();
    // one tag, not the root default plus the page's: crawlers often read the first
    expect(html.match(/property="og:title"/g)?.length, path).toBe(1);
    expect(ogTitle, `${path} still shares the homepage title`).not.toBe(homeOg);
    expect(ogTitle, path).toBe(title);
    expect(meta(html, "twitter:title"), path).toBe(ogTitle);
    expect(meta(html, "og:description")?.length ?? 0, `${path} og:description`).toBeGreaterThan(40);
    expect(meta(html, "og:locale"), path).toBe(EN.has(path) ? "en_US" : "pl_PL");
    expect(meta(html, "og:url"), path).toBe(`https://kamiljan.com${path}`);
    expect(seen.get(ogTitle ?? ""), `${path} shares og:title with`).toBeUndefined();
    seen.set(ogTitle ?? "", path);
  }
});
