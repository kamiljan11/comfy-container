/**
 * Pluggable email transport.
 *
 * Right now we run in STUB mode — emails are written to the console so we can
 * confirm the contact and welcome-sequence flows work end to end. Nothing is
 * lost; once Kamil hands over credentials we flip ONE switch in this file to
 * route everything through the real provider.
 *
 * To enable real sending:
 *   1. Set EMAIL_PROVIDER env var to 'resend' (or whichever provider).
 *   2. Add the provider's API key as an env var (e.g. RESEND_API_KEY).
 *   3. Implement the matching transport below — `resendTransport` already
 *      has a stub call site.
 *
 * The interface stays the same across providers so routes never need to
 * change.
 */

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  from?: string;
}

export interface EmailTransport {
  name: string;
  send(msg: EmailMessage): Promise<{ ok: true; id: string } | { ok: false; error: string }>;
}

// ── Stub transport (default) ─────────────────────────────────────────────────
const stubTransport: EmailTransport = {
  name: "stub",
  async send(msg) {
    // eslint-disable-next-line no-console
    console.log("[email:stub] would send", {
      to: msg.to,
      subject: msg.subject,
      from: msg.from ?? "hello@kamiljan.com",
      replyTo: msg.replyTo,
      textPreview: msg.text.slice(0, 200),
    });
    return { ok: true, id: `stub-${Date.now()}` };
  },
};

// ── Resend transport (ready to wire) ─────────────────────────────────────────
// Uncomment + set RESEND_API_KEY once you have the account.
const resendTransport: EmailTransport = {
  name: "resend",
  async send(msg) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[email:resend] RESEND_API_KEY not set, falling back to stub");
      return stubTransport.send(msg);
    }
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: msg.from ?? "Kamil Jan <hello@kamiljan.com>",
          to: msg.to,
          subject: msg.subject,
          text: msg.text,
          html: msg.html,
          reply_to: msg.replyTo,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        return { ok: false, error: `Resend ${res.status}: ${errText.slice(0, 200)}` };
      }
      const body = (await res.json()) as { id?: string };
      return { ok: true, id: body.id ?? "unknown" };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "unknown" };
    }
  },
};

// ── Active transport selection ───────────────────────────────────────────────
function pickTransport(): EmailTransport {
  const provider = process.env.EMAIL_PROVIDER ?? "stub";
  if (provider === "resend") return resendTransport;
  return stubTransport;
}

export async function sendEmail(msg: EmailMessage): Promise<void> {
  const transport = pickTransport();
  const result = await transport.send(msg);
  if (!result.ok) {
    console.error(`[email:${transport.name}] send failed:`, result.error);
    // Don't throw — we never want a failing provider to lose the user's submission.
    // The form caller logs the data, and the user always gets the success state.
  }
}

/**
 * Trigger a welcome-sequence email. Today this just sends one immediate
 * welcome message via the active transport. When Kamil hands over the
 * sequence content (extracted from Systeme.io), we drop the additional
 * messages into the `welcomeSequence` array and add a scheduler (Cloudflare
 * Cron) that dispatches them on the right cadence.
 */
export interface SequenceEmail {
  delayHours: number;
  subject: string;
  body: string;
}

export const welcomeSequence: SequenceEmail[] = [
  {
    delayHours: 0,
    subject: "Welcome to MySpiritWay (now at kamiljan.com)",
    body: "Hi {{name}},\n\nThanks for connecting. You'll find the full Simplified Practical Spirituality at https://kamiljan.com/spirituality.\n\n— Kamil",
  },
  // TODO: paste extracted email-campaign content here once exported from Systeme.io.
];

export async function startWelcomeSequence(_subscriber: {
  email: string;
  name?: string;
}): Promise<void> {
  // First email goes out immediately. Future emails are queued via the cron
  // worker once we add it (see iteration 5 of the migration plan).
  const first = welcomeSequence[0];
  if (!first) return;
  await sendEmail({
    to: _subscriber.email,
    subject: first.subject,
    text: first.body.replace("{{name}}", _subscriber.name ?? "friend"),
  });
}
