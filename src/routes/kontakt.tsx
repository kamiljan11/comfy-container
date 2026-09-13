import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { type Lang } from "../i18n";
import { useLang } from "../hooks/useLang";
import { submitLead } from "../lib/lead.functions";
import { consultMessage } from "../lib/consult";

/**
 * /kontakt — the page every "free consultation" button lands on. The form uses
 * the chat's lead path (submitLead → Resend), the one that is known to deliver;
 * the older contact server function still sits on a stub transport.
 */

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Bezpłatna konsultacja 30 min — Kamil Jan" },
      {
        name: "description",
        content:
          "Umów bezpłatną, 30-minutową rozmowę o jednym procesie w Twojej firmie. Powiem wprost, co warto zautomatyzować, a czego nie ruszać.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/kontakt" }],
  }),
  component: ContactPage,
});

type Copy = {
  eyebrow: string;
  h1: string;
  lead: string;
  prepTitle: string;
  prep: Array<{ title: string; body: string }>;
  getTitle: string;
  get: string[];
  formTitle: string;
  name: string;
  email: string;
  company: string;
  message: string;
  messageHint: string;
  send: string;
  sending: string;
  sent: string;
  sentBody: string;
  failed: string;
  unconfigured: string;
  or: string;
};

const COPY: Record<Lang, Copy> = {
  pl: {
    eyebrow: "BEZPŁATNA KONSULTACJA · 30 MIN",
    h1: "Pokaż mi proces, który zjada najwięcej czasu",
    lead: "W 30 minut przejdziemy przez jeden proces w Twojej firmie. Powiem wprost, co warto zautomatyzować, czego nie ruszać i od czego zacząć. Bez zobowiązań i bez prezentacji sprzedażowej.",
    prepTitle: "Jak się przygotować",
    prep: [
      {
        title: "Wybierz jeden proces",
        body: "Ten, o który najczęściej ktoś pyta albo który najczęściej się sypie — faktury, wyceny, zamówienia, raport w arkuszu.",
      },
      {
        title: "Policz go z grubsza",
        body: "Ile razy w tygodniu, ile osób, ile minut za każdym razem. Wystarczy szacunek, dokładne liczby ustalimy razem.",
      },
      {
        title: "Miej przykład pod ręką",
        body: "Jeden dokument, arkusz albo mail, na którym ten proces dziś stoi. Na przykładzie widać więcej niż w opisie.",
      },
    ],
    getTitle: "Co wyniesiesz z rozmowy",
    get: [
      "Ocenę, czy ten proces w ogóle warto automatyzować — i uczciwe „nie”, jeśli rachunek nie wychodzi",
      "Kolejność kroków: co najpierw, co później, co zostawić ludziom",
      "Rozeznanie, czy wystarczy mniejsze wdrożenie, czy potrzebny jest większy zespół (z software house'em CetusPro z Rzeszowa)",
    ],
    formTitle: "Umów konsultację",
    name: "Imię i nazwisko",
    email: "E-mail",
    company: "Firma (opcjonalnie)",
    message: "Jaki proces chcesz pokazać?",
    messageHint:
      "2–3 zdania wystarczą. Odpiszę w ciągu jednego dnia roboczego z propozycją terminu.",
    send: "Wyślij zgłoszenie",
    sending: "Wysyłam…",
    sent: "Dziękuję — zgłoszenie dotarło",
    sentBody: "Odpiszę na podany e-mail z propozycją terminu.",
    failed: "Nie udało się wysłać formularza. Napisz proszę bezpośrednio:",
    unconfigured: "Formularz chwilowo nie działa. Napisz proszę bezpośrednio:",
    or: "albo napisz na",
  },
  en: {
    eyebrow: "FREE CONSULTATION · 30 MIN",
    h1: "Show me the process that eats the most time",
    lead: "In 30 minutes we go through one process in your company. I will tell you plainly what is worth automating, what to leave alone and where to start. No commitment and no sales deck.",
    prepTitle: "How to prepare",
    prep: [
      {
        title: "Pick one process",
        body: "The one people ask about most, or the one that breaks most often — invoices, quotes, orders, the report in a spreadsheet.",
      },
      {
        title: "Size it roughly",
        body: "How many times a week, how many people, how many minutes each time. An estimate is enough; we will pin the numbers down together.",
      },
      {
        title: "Have an example ready",
        body: "One document, spreadsheet or email the process runs on today. An example shows more than a description.",
      },
    ],
    getTitle: "What you leave with",
    get: [
      "A view on whether this process is worth automating at all — and an honest “no” if the numbers do not work",
      "An order of steps: what first, what later, what to leave with people",
      "A sense of whether a small build is enough or a bigger team is needed (with CetusPro, a Rzeszów software house)",
    ],
    formTitle: "Book the consultation",
    name: "Name",
    email: "Email",
    company: "Company (optional)",
    message: "Which process do you want to show me?",
    messageHint:
      "Two or three sentences are enough. I reply within one working day with a proposed time.",
    send: "Send request",
    sending: "Sending…",
    sent: "Thank you — your request arrived",
    sentBody: "I will reply to the email you gave with a proposed time.",
    failed: "The form could not be sent. Please write directly:",
    unconfigured: "The form is unavailable right now. Please write directly:",
    or: "or write to",
  },
};

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; reason: string };

function ContactPage() {
  const [lang] = useLang("pl");
  const c = COPY[lang];
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const field = (k: string) => String(f.get(k) ?? "");
    setStatus({ state: "sending" });
    try {
      const res = await submitLead({
        data: {
          name: field("name"),
          email: field("email"),
          message: consultMessage({ company: field("company"), message: field("message"), lang }),
          transcript: [],
          hp: field("website"),
        },
      });
      if (res.ok) {
        setStatus({ state: "sent" });
      } else {
        console.error("[kontakt] lead rejected", { reason: res.error });
        setStatus({ state: "error", reason: res.error });
      }
    } catch (err) {
      console.error("[kontakt] lead request failed", err);
      setStatus({ state: "error", reason: "network" });
    }
  };

  return (
    <div className="svc-page kontakt-page">
      <div className="container">
        <header className="svc-head">
          <span className="svc-eyebrow">{c.eyebrow}</span>
          <h1 className="svc-h1">{c.h1}</h1>
          <p className="svc-lead">{c.lead}</p>
        </header>

        <div className="kontakt-grid">
          <div className="kontakt-info">
            <h2 className="kontakt-h2">{c.prepTitle}</h2>
            <ol className="kontakt-steps">
              {c.prep.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span>{p.body}</span>
                </li>
              ))}
            </ol>
            <h2 className="kontakt-h2">{c.getTitle}</h2>
            <ul className="kontakt-get">
              {c.get.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>

          <div className="kontakt-card">
            <h2 className="kontakt-h2">{c.formTitle}</h2>
            {status.state === "sent" ? (
              <div className="kontakt-done" role="status">
                <strong>{c.sent}</strong>
                <span>{c.sentBody}</span>
              </div>
            ) : (
              <form className="kontakt-form" onSubmit={onSubmit}>
                <label>
                  <span>{c.name}</span>
                  <input name="name" required maxLength={120} autoComplete="name" />
                </label>
                <label>
                  <span>{c.email}</span>
                  <input name="email" type="email" required maxLength={160} autoComplete="email" />
                </label>
                <label>
                  <span>{c.company}</span>
                  <input name="company" maxLength={120} autoComplete="organization" />
                </label>
                <label>
                  <span>{c.message}</span>
                  <textarea name="message" required minLength={10} maxLength={3500} rows={5} />
                  <small>{c.messageHint}</small>
                </label>
                {/* honeypot: hidden from people and from assistive tech, bots fill it */}
                <input
                  className="kontakt-hp"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                {status.state === "error" && (
                  <p className="kontakt-error" role="alert">
                    {status.reason === "unconfigured" ? c.unconfigured : c.failed}{" "}
                    <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a>
                  </p>
                )}
                <button
                  type="submit"
                  className="btn-primary kontakt-send"
                  disabled={status.state === "sending"}
                >
                  {status.state === "sending" ? c.sending : c.send}
                </button>
              </form>
            )}
            <p className="kontakt-alt">
              {c.or} <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a> ·{" "}
              <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
