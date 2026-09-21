import { type Lang } from "../i18n";
import { type Service, type ServiceFaq } from "./services";

/**
 * Two questions every service and area page answers, kept in one place
 * instead of copied twelve times. The letsautomate comparison (2026-09-21)
 * showed both on every page of theirs and on none of ours: "is it secure" and
 * "can it grow later". Answers only claim what the site already states
 * elsewhere (access rules in the database, code and data on the client's side,
 * automated checks before production).
 */
const SHARED: Record<Lang, ServiceFaq[]> = {
  pl: [
    {
      q: "Czy to jest bezpieczne?",
      a: "Dostępu do danych pilnuje sama baza danych, a nie ukryty przycisk w aplikacji, więc handlowiec technicznie nie odczyta cudzych klientów. Klucze i hasła do usług są poza kodem. Każda zmiana, zanim trafi na produkcję, przechodzi automatyczne sprawdzenia, w tym skan pod kątem wycieku sekretów. Kod i dane zostają po Waszej stronie.",
    },
    {
      q: "Czy system da się później rozbudować?",
      a: "Tak, i zwykle tak to wygląda: zaczynamy od jednego procesu, a kolejne dochodzą etapami. Kod jest w Waszym repozytorium razem z dokumentacją, więc rozbudowę może zrobić też ktoś inny niż ja.",
    },
  ],
  en: [
    {
      q: "Is it secure?",
      a: "Access to data is enforced by the database itself, not by a hidden button in the app, so a salesperson technically cannot read another rep's clients. Keys and passwords live outside the code. Every change goes through automated checks before it reaches production, including a scan for leaked secrets. The code and the data stay on your side.",
    },
    {
      q: "Can the system grow later?",
      a: "Yes, and that is usually how it goes: we start with one process and add the next ones in stages. The code sits in your repository with its documentation, so someone other than me can extend it too.",
    },
  ],
};

/** The page's own questions first, then the shared ones it doesn't already ask. */
export function pageFaq(s: Service, lang: Lang): ServiceFaq[] {
  const own = new Set(s.faq.map((f) => f.q.toLowerCase()));
  return [...s.faq, ...SHARED[lang].filter((f) => !own.has(f.q.toLowerCase()))];
}
