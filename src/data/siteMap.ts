import { type Lang } from "../i18n";

/**
 * The "About" group of the site map — one list shared by the header menu and
 * the command palette, so both always offer the same pages in the same words.
 */
export type AboutItem = {
  to: "/o-mnie" | "/cv" | "/claude" | "/ksiazki";
  hash?: string;
  label: string;
  hint: string;
};

export const ABOUT_ITEMS: Record<Lang, AboutItem[]> = {
  en: [
    { to: "/o-mnie", label: "About me", hint: "Who I am and how I work" },
    { to: "/o-mnie", hash: "capabilities", label: "Capabilities", hint: "What I build and run" },
    {
      to: "/o-mnie",
      hash: "engage",
      label: "Ways to work together",
      hint: "Consulting, builds, hiring",
    },
    { to: "/cv", label: "CV", hint: "Roles, companies, experience" },
    { to: "/claude", label: "AI system", hint: "How I build with AI agents" },
    { to: "/ksiazki", label: "Books", hint: "Two free guidebooks" },
  ],
  pl: [
    { to: "/o-mnie", label: "O mnie", hint: "Kim jestem i jak pracuję" },
    { to: "/o-mnie", hash: "capabilities", label: "Kompetencje", hint: "Co buduję i prowadzę" },
    {
      to: "/o-mnie",
      hash: "engage",
      label: "Formy współpracy",
      hint: "Doradztwo, wdrożenia, etat",
    },
    { to: "/cv", label: "CV", hint: "Role, firmy, doświadczenie" },
    { to: "/claude", label: "System AI", hint: "Jak buduję z agentami AI" },
    { to: "/ksiazki", label: "Książki", hint: "Dwa darmowe przewodniki" },
  ],
};
