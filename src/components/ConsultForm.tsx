import { useState, type FormEvent } from "react";
import { type Lang } from "../i18n";
import { submitLead } from "../lib/lead.functions";
import { consultMessage } from "../lib/consult";

/**
 * The free-consultation form, shared by /kontakt and every service and area
 * page, so a reader can ask about a service without leaving the page they are
 * reading. It goes out through the chat's lead path (submitLead → Resend), the
 * one known to deliver; `source` is the page it sat on and ends up in the
 * email header, so Kamil sees which service brought the request.
 *
 * Every failure is logged with its reason and shown with the e-mail address as
 * a way out, never swallowed.
 */

type FormCopy = {
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
  limited: string;
  or: string;
  privacy: string;
  privacyLink: string;
};

const COPY: Record<Lang, FormCopy> = {
  pl: {
    name: "Imię i nazwisko",
    email: "E-mail",
    company: "Firma (opcjonalnie)",
    message: "Jaki proces chcesz pokazać?",
    messageHint:
      "2–3 zdania wystarczą. Odpiszę w ciągu jednego dnia roboczego z propozycją terminu.",
    send: "Wyślij zgłoszenie",
    sending: "Wysyłam…",
    sent: "Dziękuję, zgłoszenie dotarło",
    sentBody: "Odpiszę na podany e-mail z propozycją terminu.",
    failed: "Nie udało się wysłać formularza. Napisz proszę bezpośrednio:",
    unconfigured: "Formularz chwilowo nie działa. Napisz proszę bezpośrednio:",
    limited: "Za dużo zgłoszeń z tego adresu w krótkim czasie. Spróbuj za kilka minut albo napisz:",
    or: "albo napisz na",
    privacy:
      "Administratorem danych jest Kamil Jan Włodarczyk. Dane z formularza służą tylko do odpowiedzi na zgłoszenie.",
    privacyLink: "Polityka prywatności",
  },
  en: {
    name: "Name",
    email: "Email",
    company: "Company (optional)",
    message: "Which process do you want to show me?",
    messageHint:
      "Two or three sentences are enough. I reply within one working day with a proposed time.",
    send: "Send request",
    sending: "Sending…",
    sent: "Thank you, your request arrived",
    sentBody: "I will reply to the email you gave with a proposed time.",
    failed: "The form could not be sent. Please write directly:",
    unconfigured: "The form is unavailable right now. Please write directly:",
    limited:
      "Too many requests from this address in a short time. Try again in a few minutes or write to:",
    or: "or write to",
    privacy:
      "Your data is controlled by Kamil Jan Włodarczyk and used only to reply to your request.",
    privacyLink: "Privacy policy",
  },
};

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; reason: string };

type Props = {
  lang: Lang;
  /** The page the form sits on, e.g. "/kontakt" or "/uslugi/integracje". */
  source: string;
  /** Prefix for the field ids, so two forms can never share one on a page. */
  idPrefix: string;
};

export function ConsultForm({ lang, source, idPrefix }: Props) {
  const c = COPY[lang];
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const hintId = `${idPrefix}-hint`;

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
          message: consultMessage({
            company: field("company"),
            message: field("message"),
            lang,
            source,
          }),
          transcript: [],
          hp: field("website"),
        },
      });
      if (res.ok) {
        setStatus({ state: "sent" });
      } else {
        console.error("[consult-form] lead rejected", { source, reason: res.error });
        setStatus({ state: "error", reason: res.error });
      }
    } catch (err) {
      console.error("[consult-form] lead request failed", { source }, err);
      setStatus({ state: "error", reason: "network" });
    }
  };

  if (status.state === "sent") {
    return (
      <div className="kontakt-done" role="status">
        <strong>{c.sent}</strong>
        <span>{c.sentBody}</span>
      </div>
    );
  }

  return (
    <>
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
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={3500}
            rows={5}
            aria-describedby={hintId}
          />
          <small id={hintId}>{c.messageHint}</small>
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
            {status.reason === "unconfigured"
              ? c.unconfigured
              : status.reason === "rate-limited"
                ? c.limited
                : c.failed}{" "}
            <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a>
          </p>
        )}
        <p className="kontakt-privacy">
          {c.privacy} <a href="/polityka-prywatnosci">{c.privacyLink}</a>
        </p>
        <button
          type="submit"
          className="btn-primary kontakt-send"
          disabled={status.state === "sending"}
        >
          {status.state === "sending" ? c.sending : c.send}
        </button>
      </form>
      <p className="kontakt-alt">
        {c.or} <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a> ·{" "}
        <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </p>
    </>
  );
}
