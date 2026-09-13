import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../components/HomePage";

/** /o-mnie — who Kamil is. Same body as the homepage, the personal half. */
export const Route = createFileRoute("/o-mnie")({
  head: () => ({
    meta: [
      { title: "O mnie — Kamil Jan | automatyzacja i wdrożenia AI" },
      {
        name: "description",
        content:
          "Kamil Jan: ponad 12 lat prowadzenia firm, sześć własnych. Buduję systemy i automatyzacje AI działające na produkcji i szkolę zespoły, które je prowadzą.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/o-mnie" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return <HomePage variant="about" />;
}
