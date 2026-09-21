import { pageMeta } from "../lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../components/HomePage";

/** /o-mnie — who Kamil is. Same body as the homepage, the personal half. */
export const Route = createFileRoute("/o-mnie")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "O mnie | Kamil Jan | automatyzacja i wdrożenia AI",
        description:
          "Kamil Jan: ponad 12 lat prowadzenia firm, sześć własnych. Buduję systemy i automatyzacje AI działające na produkcji i szkolę zespoły, które je prowadzą.",
        url: "https://kamiljan.com/o-mnie",
        locale: "pl_PL",
      }),
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/o-mnie" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return <HomePage variant="about" />;
}
