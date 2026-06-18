/**
 * Lead delivery — server-only. Receives a visitor's message from the chat,
 * writes a short AI brief, and emails it to Kamil via Resend. The recipient is
 * hardcoded to Kamil, so this is NOT an open relay — the worst an abuser can do
 * is mail Kamil's own inbox.
 *
 * Enable: set RESEND_API_KEY as a server secret (via Lovable, like LOVABLE_API_KEY).
 * For best deliverability also verify a domain in Resend and set RESEND_FROM to a
 * sender on that domain (e.g. "kamiljan.com <bot@kamiljan.com>"). Until then it
 * falls back to Resend's onboarding sender, which can only deliver to Kamil's own
 * Resend account email. Without the key the bot degrades to direct WhatsApp/email.
 */
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { generateText } from 'ai'

const MODEL = 'google/gemini-3-flash-preview'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export type LeadMessage = { role: 'user' | 'assistant'; content: string }
export type LeadInput = {
  name?: string
  email?: string
  message?: string
  transcript?: LeadMessage[]
  hp?: string // honeypot — real users never fill this
}
export type LeadResult = { ok: true } | { ok: false; error: string }

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function br(s: string) {
  return esc(s).replace(/\n/g, '<br/>')
}

async function buildBrief(transcript: LeadMessage[], message: string): Promise<string> {
  const key = process.env.LOVABLE_API_KEY
  if (!key) return ''
  try {
    const gateway = createOpenAICompatible({
      name: 'lovable',
      baseURL: 'https://ai.gateway.lovable.dev/v1',
      headers: { 'Lovable-API-Key': key, 'X-Lovable-AIG-SDK': 'vercel-ai-sdk' },
    })
    const convo = transcript
      .slice(-20)
      .map((m) => `${m.role}: ${m.content}`)
      .join('\n')
      .slice(0, 6000)
    const res = await generateText({
      model: gateway(MODEL),
      system:
        'You write a 2-3 sentence brief of a website lead for the site owner (Kamil Jan). Cover who they seem to be, what they want, and any urgency or hiring signal. Plain text, no preamble, no markdown.',
      messages: [{ role: 'user', content: `Visitor message:\n${message}\n\nChat so far:\n${convo || '(none)'}` }],
    })
    return (res.text || '').trim()
  } catch {
    return ''
  }
}

export async function sendLead(input: LeadInput): Promise<LeadResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, error: 'unconfigured' }

  // Honeypot: a bot filled the hidden field — silently accept and drop.
  if (input.hp && input.hp.trim()) return { ok: true }

  const name = (input.name || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 120)
  const email = (input.email || '').replace(/\s+/g, '').slice(0, 160)
  const message = (input.message || '').trim().slice(0, 4000)
  const transcript = Array.isArray(input.transcript) ? input.transcript.slice(-20) : []
  if (message.length < 2) return { ok: false, error: 'empty' }
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'bad-email' }

  const summary = await buildBrief(transcript, message)
  const tr = transcript.map((m) => `${m.role === 'user' ? 'Visitor' : 'Bot'}: ${m.content}`).join('\n')
  const from = process.env.RESEND_FROM || 'kamiljan.com (bot) <leads@mountaincar.is>'
  const to = process.env.LEAD_TO || 'hello@kamiljan.com'

  const html =
    `<h2 style="margin:0 0 12px">New lead from kamiljan.com</h2>` +
    `<p><b>Name:</b> ${esc(name || '(not given)')}<br/><b>Email:</b> ${esc(email)}</p>` +
    `<p><b>Message:</b><br/>${br(message)}</p>` +
    (summary ? `<p><b>AI brief:</b><br/>${br(summary)}</p>` : '') +
    (tr ? `<hr/><p style="color:#888;font-size:13px"><b>Chat transcript:</b><br/>${br(tr)}</p>` : '')
  const text =
    `New lead from kamiljan.com\n\nName: ${name || '(not given)'}\nEmail: ${email}\n\nMessage:\n${message}\n\n` +
    (summary ? `AI brief:\n${summary}\n\n` : '') +
    (tr ? `--- transcript ---\n${tr}` : '')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New lead from kamiljan.com — ${name || email}`,
        html,
        text,
      }),
    })
    if (!r.ok) return { ok: false, error: 'send-failed' }
    return { ok: true }
  } catch {
    return { ok: false, error: 'send-failed' }
  }
}
