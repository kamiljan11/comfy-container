import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../components/HomePage";

export const Route = createFileRoute("/")({
  // The canonical used to live in __root, which meant every other route
  // emitted a second one pointing here. It belongs to the page it names.
  head: () => ({ links: [{ rel: "canonical", href: "https://kamiljan.com/" }] }),
  component: OfferHome,
});

function OfferHome() {
  return <HomePage variant="offer" />;
}
