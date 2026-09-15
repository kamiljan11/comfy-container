import { type ServiceFaq } from "../data/services";

/**
 * FAQPage JSON-LD, as a string, for the questions a page actually shows —
 * search and answer engines may only use FAQ markup for visible questions.
 * "<" is escaped so a question can never close the script tag it sits in.
 * Used from route head() so no component injects raw HTML itself.
 */
export function faqJsonLd(faq: ServiceFaq[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }).replace(/</g, "\\u003c");
}
