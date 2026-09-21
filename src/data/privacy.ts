import { type Lang } from "../i18n";

/**
 * The privacy policy (/polityka-prywatnosci), as data.
 *
 * Written from what the code actually does, checked on 2026-09-21:
 * - the consultation form and the chat's lead step send name, email, company
 *   and message to the server, which asks Anthropic for a short summary and
 *   emails both to Kamil through Resend (src/server/lead.server.ts); nothing
 *   is written to a database;
 * - the chat sends messages to Anthropic to get answers and keeps the history
 *   in the browser's sessionStorage (src/components/ChatBot.tsx);
 * - the rate limiter keeps the IP address in server memory for 10 minutes
 *   (src/server/lead.server.ts, createLimiter);
 * - the language choice sits in localStorage (src/hooks/useLang.ts);
 * - fonts load from Google Fonts; the site runs on Vercel;
 * - no analytics, no advertising cookies, no newsletter in use.
 * If any of that changes, this file has to change in the same PR.
 *
 * Controller: Kamil personally (his answer, 2026-09-21).
 */

export type PrivacySection = { h: string; p: string[] };

export type PrivacyDoc = {
  title: string;
  lead: string;
  /** "Ostatnia zmiana" / "Last updated"; the date itself is PRIVACY_UPDATED */
  updatedLabel: string;
  sections: PrivacySection[];
};

/** The one place the policy date lives; the page formats it per language. */
export const PRIVACY_UPDATED = "2026-09-21";

export const PRIVACY: Record<Lang, PrivacyDoc> = {
  pl: {
    title: "Polityka prywatności",
    lead: "Co dzieje się z danymi, które zostawiasz na tej stronie. Krótko, bo strona zbiera ich niewiele.",
    updatedLabel: "Ostatnia zmiana",
    sections: [
      {
        h: "Kto jest administratorem",
        p: [
          "Administratorem danych jest Kamil Jan Włodarczyk, osoba fizyczna, Reykjavík, Islandia. Kontakt w każdej sprawie dotyczącej danych: hello@kamiljan.com.",
        ],
      },
      {
        h: "Formularz konsultacji",
        p: [
          "Formularz na stronach usług, obszarów i w zakładce Kontakt zbiera imię i nazwisko, adres e-mail, opcjonalnie nazwę firmy i treść wiadomości. Te dane służą wyłącznie do odpowiedzi na Twoje zgłoszenie i rozmowy o ewentualnej współpracy.",
          "Po wysłaniu formularza serwer przygotowuje krótkie podsumowanie zgłoszenia przy pomocy modelu AI (Anthropic) i wysyła zgłoszenie razem z podsumowaniem na mój adres e-mail przez usługę Resend. Strona nie zapisuje zgłoszeń w żadnej bazie danych. Zostają w mojej skrzynce pocztowej.",
          "Podstawa prawna: art. 6 ust. 1 lit. b RODO (działania na Twoje żądanie przed zawarciem umowy) oraz art. 6 ust. 1 lit. f RODO (odpowiedź na wiadomość). Podanie danych jest dobrowolne, ale bez adresu e-mail nie mogę odpowiedzieć.",
        ],
      },
      {
        h: "Asystent na czacie",
        p: [
          "Wiadomości wpisane w czacie trafiają do modelu AI (Anthropic), który przygotowuje odpowiedź. Historia rozmowy jest przechowywana tylko w Twojej przeglądarce (sessionStorage) i znika po zamknięciu karty.",
          "Jeśli w czacie zostawisz dane kontaktowe, rozmowa trafia do mnie tak samo jak zgłoszenie z formularza. Podstawa prawna: art. 6 ust. 1 lit. f RODO.",
          "Nie wpisuj w czacie danych wrażliwych, na przykład o zdrowiu.",
        ],
      },
      {
        h: "Dane techniczne",
        p: [
          "Żeby chronić formularz przed automatycznym zalewaniem, serwer pamięta adres IP przez 10 minut, tylko w pamięci, bez zapisu na dysk. Serwery hostingu (Vercel) prowadzą standardowe logi techniczne.",
          "Czcionki ładują się z Google Fonts, więc Twoja przeglądarka łączy się z serwerami Google, które widzą adres IP.",
          "W przeglądarce zapisuję jedną rzecz: wybrany język strony (localStorage). Strona nie używa narzędzi analitycznych ani ciasteczek reklamowych.",
        ],
      },
      {
        h: "Komu przekazuję dane",
        p: [
          "Dane przetwarzają w moim imieniu dostawcy usług: Vercel (hosting), Resend (wysyłka e-maili), Anthropic (model AI) i Google (czcionki). Mają siedziby w USA. Przekazanie danych poza Europejski Obszar Gospodarczy odbywa się na podstawie mechanizmów przewidzianych w RODO, czyli decyzji Komisji Europejskiej o adekwatności (EU-US Data Privacy Framework) albo standardowych klauzul umownych.",
          "Nie sprzedaję danych i nie przekazuję ich nikomu w celach marketingowych.",
        ],
      },
      {
        h: "Jak długo",
        p: [
          "Wiadomości z formularza i czatu przechowuję tak długo, jak trwa rozmowa o współpracy. Jeśli do współpracy nie dojdzie, usuwam je najpóźniej 2 lata po ostatnim kontakcie. Jeśli dojdzie, obowiązują okresy wynikające z przepisów, na przykład podatkowych.",
        ],
      },
      {
        h: "Twoje prawa",
        p: [
          "Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia oraz prawo sprzeciwu. Wystarczy napisać na hello@kamiljan.com.",
          "Możesz też złożyć skargę do organu nadzorczego, na przykład do Prezesa Urzędu Ochrony Danych Osobowych w Polsce albo do Persónuvernd na Islandii.",
          "Nie podejmuję wobec Ciebie decyzji opartych wyłącznie na automatycznym przetwarzaniu. Podsumowanie od AI pomaga mi tylko szybciej przeczytać zgłoszenie.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    lead: "What happens to the data you leave on this site. Short, because the site collects very little.",
    updatedLabel: "Last updated",
    sections: [
      {
        h: "Who is responsible",
        p: [
          "The data controller is Kamil Jan Włodarczyk, a private individual, Reykjavík, Iceland. For anything about your data: hello@kamiljan.com.",
        ],
      },
      {
        h: "The consultation form",
        p: [
          "The form on the service, area and contact pages collects your name, email address, optionally your company, and your message. I use them only to reply to your request and to talk about working together.",
          "When you send the form, the server asks an AI model (Anthropic) for a short summary and emails your request with that summary to me through Resend. The site does not store requests in any database. They stay in my inbox.",
          "Legal basis: Art. 6(1)(b) GDPR (steps taken at your request before a contract) and Art. 6(1)(f) GDPR (replying to your message). Giving the data is voluntary, but without an email address I can't reply.",
        ],
      },
      {
        h: "The chat assistant",
        p: [
          "Messages you type in the chat go to an AI model (Anthropic) that writes the reply. The conversation history is kept only in your browser (sessionStorage) and disappears when you close the tab.",
          "If you leave contact details in the chat, the conversation reaches me the same way a form request does. Legal basis: Art. 6(1)(f) GDPR.",
          "Please don't type sensitive data, such as health information, into the chat.",
        ],
      },
      {
        h: "Technical data",
        p: [
          "To protect the form from automated floods, the server remembers the IP address for 10 minutes, in memory only, never written to disk. The hosting servers (Vercel) keep standard technical logs.",
          "Fonts load from Google Fonts, so your browser connects to Google's servers, which see your IP address.",
          "The site saves one thing in your browser: the language you picked (localStorage). It uses no analytics tools and no advertising cookies.",
        ],
      },
      {
        h: "Who else processes the data",
        p: [
          "Service providers process data on my behalf: Vercel (hosting), Resend (email delivery), Anthropic (AI model) and Google (fonts). They are based in the USA. Transfers outside the European Economic Area rely on the mechanisms the GDPR provides: the European Commission's adequacy decision (EU-US Data Privacy Framework) or standard contractual clauses.",
          "I don't sell data and don't pass it to anyone for marketing.",
        ],
      },
      {
        h: "How long",
        p: [
          "I keep messages from the form and the chat for as long as we are talking about working together. If we don't end up working together, I delete them no later than 2 years after the last contact. If we do, the periods required by law, such as tax law, apply.",
        ],
      },
      {
        h: "Your rights",
        p: [
          "You have the right to access your data, to have it corrected or deleted, to restrict its processing, to data portability, and to object. Just write to hello@kamiljan.com.",
          "You can also complain to a supervisory authority, for example the President of the Personal Data Protection Office (UODO) in Poland or Persónuvernd in Iceland.",
          "I make no decisions about you based solely on automated processing. The AI summary only helps me read your request faster.",
        ],
      },
    ],
  },
};
