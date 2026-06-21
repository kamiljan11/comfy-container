import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { askBot } from '../lib/bot.functions'
import { submitLead } from '../lib/lead.functions'
import type { Lang } from '../i18n'

type Chip = { label: string; act: 'send' | 'wizard' | 'pick' | 'free' | 'wlink' | 'lead'; value?: string; href?: string; cta?: boolean }
type Msg = {
  role: 'user' | 'assistant'
  content: string
  typed?: boolean
  suggestions?: string[]
  failed?: boolean
  chips?: Chip[]
}

type Copy = {
  greet: string
  placeholder: string
  human: string
  title: string
  sub: string
  fallback: string
  starters: string[]
  nudge: string
  thinking: string[]
  retry: string
  wizardCta: string
  wizardIntro: string
  askLabel: string
  moreLabel: string
  wizard: { label: string; reply: string }[]
  leadCta: string
  leadTitle: string
  leadNamePh: string
  leadEmailPh: string
  leadMsgPh: string
  leadSend: string
  leadSending: string
  leadCancel: string
  leadSent: string
  leadErr: string
}

const COPY: Record<Lang, Copy> = {
  en: {
    greet: "Hi — I'm Kamil's AI assistant. Ask me about his work, skills, or whether he's a fit for your role.",
    placeholder: 'Ask anything…',
    human: 'Prefer a human?',
    title: "Kamil's AI",
    sub: 'trained on his work',
    fallback: "I can't reach my brain right now — but Kamil replies personally. Email hello@kamiljan.com or message him on WhatsApp.",
    starters: ['Is he a fit for my role?', 'What has he actually shipped?', 'What are his strengths and weaknesses?'],
    nudge: 'Ask my AI anything 👋',
    thinking: ['Thinking…', "Searching Kamil's work…"],
    retry: 'Try again',
    wizardCta: '🧭 Help me find the right fit',
    wizardIntro: "What brings you here? Pick one and I'll point you the right way:",
    askLabel: 'Ask a question',
    moreLabel: 'See other options',
    wizard: [
      { label: 'Hire Kamil for a role', reply: "Kamil is open to AI Automation & Implementation Engineer, AI solutions engineer, AI implementation and enablement, and Head of AI / Ops / Growth roles — remote-first. He ships AI into production and gets the team to actually run it. The fastest move is a one-line brief of the role — send it below and he replies personally." },
      { label: 'Get a product or site built', reply: "He handles the full build end to end and hands it over running and documented — full-stack React/TypeScript on Supabase, Vercel and Cloudflare. Tell him what you need and he'll scope it. Send it below." },
      { label: 'Add AI / automation to my business', reply: "His core work: ship AI into your production — voice agents, WhatsApp bots, n8n workflows, LLM and RAG — then train your team to run it. Tell him the task that eats the most time and he'll map it. Send it below." },
      { label: 'Train my team to use AI', reply: "An AI enablement engagement: he ships a real workflow into production while your team learns to run it — train-while-building, documented handoff. Share your team's setup and he'll tell you where he'd start. Send it below." },
      { label: 'Growth & marketing', reply: "He builds the whole funnel — site, tracking, copy, Meta and Google Ads, lead-gen systems — and judges on ROAS, not clicks. Tell him the goal and the market. Send it below." },
      { label: 'Just exploring', reply: "All good — ask me anything about Kamil's work, or browse his projects. When you're ready, he's one message away." },
    ],
    leadCta: '✉️ Send Kamil a message',
    leadTitle: 'Message Kamil',
    leadNamePh: 'Your name',
    leadEmailPh: 'Your email',
    leadMsgPh: 'What can he help with?',
    leadSend: 'Send to Kamil',
    leadSending: 'Sending…',
    leadCancel: 'Cancel',
    leadSent: 'Sent — Kamil will reply personally to {email}.',
    leadErr: "Couldn't send right now — reach him directly:",
  },
  pl: {
    greet: 'Cześć — jestem AI asystentem Kamila. Pytaj o jego pracę, umiejętności albo czy pasuje do Twojej roli.',
    placeholder: 'Zapytaj o cokolwiek…',
    human: 'Wolisz człowieka?',
    title: 'AI Kamila',
    sub: 'wytrenowany na jego pracy',
    fallback: 'Chwilowo nie mam dostępu do mózgu — ale Kamil odpisuje osobiście. Napisz na hello@kamiljan.com albo na WhatsApp.',
    starters: ['Czy pasuje do mojej roli?', 'Co realnie zbudował?', 'Jakie ma mocne i słabe strony?'],
    nudge: 'Zapytaj moje AI 👋',
    thinking: ['Myślę…', 'Przeszukuję pracę Kamila…'],
    retry: 'Spróbuj ponownie',
    wizardCta: '🧭 Pomóż mi wybrać',
    wizardIntro: 'Z czym przychodzisz? Wybierz, a skieruję Cię właściwie:',
    askLabel: 'Zadaj pytanie',
    moreLabel: 'Inne opcje',
    wizard: [
      { label: 'Zatrudnić Kamila (etat/rola)', reply: 'Kamil jest otwarty na role: Inżynier Automatyzacji i Wdrożeń AI, AI solutions engineer, wdrażanie i enablement AI oraz Head of AI / Ops / Growth — remote-first. Wdraża AI na produkcję i sprawia, że zespół realnie z niej korzysta. Najszybciej: wyślij jednolinijkowy opis roli poniżej, odpisuje osobiście.' },
      { label: 'Zbudować produkt lub stronę', reply: 'Przejmuje cały build od A do Z i oddaje działające oraz udokumentowane — full-stack React/TypeScript na Supabase, Vercel i Cloudflare. Napisz czego potrzebujesz, a wyceni zakres. Wyślij poniżej.' },
      { label: 'Wdrożyć AI / automatyzację w firmie', reply: 'Jego rdzeń: wdrożyć AI na Twoją produkcję — agenci głosowi, boty WhatsApp, n8n, LLM i RAG — a potem nauczyć zespół to obsługiwać. Napisz, które zadanie zżera najwięcej czasu, a on to zmapuje. Wyślij poniżej.' },
      { label: 'Przeszkolić zespół z AI', reply: 'Wdrożenie AI z naciskiem na ludzi: wdraża realny workflow na produkcję, a Twój zespół uczy się go obsługiwać — buduje i uczy w trakcie, z dokumentacją. Opisz sytuację zespołu, a powie od czego zacząć. Wyślij poniżej.' },
      { label: 'Wzrost i marketing', reply: 'Buduje cały lejek — strona, tracking, copy, reklamy Meta i Google, systemy lead-gen — i ocenia po ROAS, nie po klikach. Podaj cel i rynek. Wyślij poniżej.' },
      { label: 'Tylko się rozglądam', reply: 'Spoko — pytaj o cokolwiek z pracy Kamila albo przejrzyj projekty. Jak będziesz gotów, jest o jedną wiadomość stąd.' },
    ],
    leadCta: '✉️ Wyślij wiadomość do Kamila',
    leadTitle: 'Wiadomość do Kamila',
    leadNamePh: 'Twoje imię',
    leadEmailPh: 'Twój email',
    leadMsgPh: 'W czym może pomóc?',
    leadSend: 'Wyślij do Kamila',
    leadSending: 'Wysyłam…',
    leadCancel: 'Anuluj',
    leadSent: 'Wysłane — Kamil odpisze osobiście na {email}.',
    leadErr: 'Nie udało się wysłać — złap go bezpośrednio:',
  },
}

const STORE_KEY = 'kb_chat_v3'
const NUDGE_KEY = 'kb_nudge_seen_v1'

const LINK_RE =
  /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:https?:\/\/|wa\.me\/)[^\s)]+)/g

function renderInline(text: string, kp: string) {
  return text.split(LINK_RE).map((part, i) => {
    const key = `${kp}-${i}`
    if (!part) return null
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
      return (
        <a key={key} href={`mailto:${part}`}>
          {part}
        </a>
      )
    }
    if (/^(https?:\/\/|wa\.me\/)/.test(part)) {
      const href = part.startsWith('http') ? part : `https://${part}`
      return (
        <a key={key} href={href} target="_blank" rel="noreferrer">
          {part}
        </a>
      )
    }
    return <span key={key}>{part}</span>
  })
}

const BOLD_RE = /\*\*([^*]+)\*\*|__([^_]+)__/g
function renderText(text: string) {
  const out: ReactNode[] = []
  let last = 0
  let i = 0
  let m: RegExpExecArray | null
  BOLD_RE.lastIndex = 0
  while ((m = BOLD_RE.exec(text)) !== null) {
    if (m.index > last) out.push(...renderInline(text.slice(last, m.index), `t${i}`))
    out.push(<strong key={`b${i}`}>{renderInline(m[1] ?? m[2], `b${i}`)}</strong>)
    last = m.index + m[0].length
    i++
  }
  if (last < text.length) out.push(...renderInline(text.slice(last), `t${i}`))
  return out
}

function parseReply(text: string): { body: string; suggestions: string[] } {
  const m = text.match(/\n?\s*SUGGESTED:\s*([^\n]*)\s*$/i)
  if (!m || m.index === undefined) return { body: text.trim(), suggestions: [] }
  const body = text.slice(0, m.index).trim()
  const suggestions = m[1]
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3)
  return { body: body || text.trim(), suggestions }
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const handler = () => setReduce(mq.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])
  return reduce
}

function Typed({ text, onDone, onTick }: { text: string; onDone: () => void; onTick: () => void }) {
  const reduce = usePrefersReducedMotion()
  const tokens = useMemo(() => text.split(/(\s+)/), [text])
  const [n, setN] = useState(reduce ? tokens.length : 0)
  const done = useRef(false)

  useEffect(() => {
    if (reduce || n >= tokens.length) {
      if (!done.current) {
        done.current = true
        onDone()
      }
      return
    }
    const id = window.setTimeout(() => {
      setN((x) => x + 1)
      onTick()
    }, 18)
    return () => window.clearTimeout(id)
  }, [n, tokens.length, reduce]) // eslint-disable-line react-hooks/exhaustive-deps

  if (reduce || n >= tokens.length) return <>{renderText(text)}</>
  return (
    <span className="chatbot-reveal">
      {tokens.slice(0, n).join('')}
      <i className="chatbot-caret" />
    </span>
  )
}

export default function ChatBot({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [phase, setPhase] = useState(0)
  const [nudge, setNudge] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'assistant', content: t.greet, typed: true }])
  // lead form
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [leadName, setLeadName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [leadMsg, setLeadMsg] = useState('')
  const [leadHp, setLeadHp] = useState('')

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hydrated = useRef(false)

  const scrollToEnd = () =>
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Msg[]
        if (Array.isArray(parsed) && parsed.length > 1) {
          setMsgs(parsed.map((m) => ({ ...m, typed: true })))
        }
      }
    } catch {
      /* ignore */
    }
    hydrated.current = true
  }, [])

  useEffect(() => {
    if (!hydrated.current) return
    try {
      if (msgs.length > 1) sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs))
    } catch {
      /* ignore */
    }
  }, [msgs])

  useEffect(() => {
    if (open) return
    let seen = false
    try {
      seen = sessionStorage.getItem(NUDGE_KEY) === '1'
    } catch {
      /* ignore */
    }
    if (seen) return
    const id = window.setTimeout(() => setNudge(true), 4500)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    setMsgs((m) => (m.length <= 1 ? [{ role: 'assistant', content: t.greet, typed: true }] : m))
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!busy) {
      setPhase(0)
      return
    }
    const id = window.setTimeout(() => setPhase(1), 900)
    return () => window.clearTimeout(id)
  }, [busy])

  useEffect(() => {
    if (open) {
      scrollToEnd()
      if (!leadOpen) inputRef.current?.focus()
    }
  }, [open, msgs, busy, leadOpen])

  const dismissNudge = () => {
    setNudge(false)
    try {
      sessionStorage.setItem(NUDGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const toggle = () => {
    dismissNudge()
    setOpen((o) => !o)
  }

  const ask = async (history: Msg[]) => {
    setBusy(true)
    try {
      const res = await askBot({ data: { messages: history.map((m) => ({ role: m.role, content: m.content })) } })
      const ok = res.ok
      const parsed = ok ? parseReply(res.text) : { body: t.fallback, suggestions: [] }
      setMsgs([
        ...history,
        { role: 'assistant', content: parsed.body, suggestions: parsed.suggestions, typed: false, failed: !ok },
      ])
    } catch {
      setMsgs([...history, { role: 'assistant', content: t.fallback, typed: false, failed: true }])
    } finally {
      setBusy(false)
    }
  }

  const send = (textArg?: string) => {
    const text = (textArg ?? input).trim()
    if (!text || busy) return
    const history: Msg[] = [...msgs, { role: 'user', content: text, typed: true }]
    setMsgs(history)
    setInput('')
    ask(history)
  }

  const retry = () => {
    if (busy) return
    let h = [...msgs]
    while (h.length && h[h.length - 1].role === 'assistant') h = h.slice(0, -1)
    if (!h.length) return
    setMsgs(h)
    ask(h)
  }

  // ── Mini wizard (deterministic, no LLM call) ──
  const contactChips: Chip[] = [
    { label: t.leadCta, act: 'lead', cta: true },
    { label: 'WhatsApp', act: 'wlink', href: 'https://wa.me/3548888901' },
    { label: 'Email', act: 'wlink', href: 'mailto:hello@kamiljan.com' },
    { label: t.moreLabel, act: 'wizard' },
  ]

  const startWizard = () => {
    if (busy) return
    const chips: Chip[] = t.wizard.map((o, i) => ({ label: o.label, act: 'pick', value: String(i) }))
    setMsgs((m) => [...m, { role: 'assistant', content: t.wizardIntro, typed: true, chips }])
  }

  const chooseWizard = (idx: string) => {
    const o = t.wizard[Number(idx)]
    if (!o) return
    setMsgs((m) => [...m, { role: 'assistant', content: o.reply, typed: false, chips: contactChips }])
  }

  const openLead = () => {
    setLeadStatus('idle')
    setLeadOpen(true)
  }

  const submitLeadForm = async () => {
    if (leadStatus === 'sending' || !leadEmail.trim() || !leadMsg.trim()) return
    setLeadStatus('sending')
    try {
      const res = await submitLead({
        data: {
          name: leadName,
          email: leadEmail,
          message: leadMsg,
          hp: leadHp,
          transcript: msgs.map((m) => ({ role: m.role, content: m.content })),
        },
      })
      if (res.ok) {
        setLeadOpen(false)
        setLeadStatus('idle')
        setMsgs((m) => [...m, { role: 'assistant', content: t.leadSent.replace('{email}', leadEmail), typed: false }])
        setLeadName('')
        setLeadMsg('')
        setLeadHp('')
      } else {
        setLeadStatus('error')
      }
    } catch {
      setLeadStatus('error')
    }
  }

  const handleChip = (c: Chip) => {
    if (c.act === 'send') send(c.value)
    else if (c.act === 'wizard') startWizard()
    else if (c.act === 'pick' && c.value) chooseWizard(c.value)
    else if (c.act === 'free') inputRef.current?.focus()
    else if (c.act === 'lead') openLead()
  }

  const markTyped = (i: number) =>
    setMsgs((ms) => ms.map((x, idx) => (idx === i ? { ...x, typed: true } : x)))

  const renderChips = (chips: Chip[]) => (
    <div className="chatbot-starters chatbot-chips">
      {chips.map((c, i) =>
        c.act === 'wlink' ? (
          <a
            key={i}
            className={`chatbot-starter${c.cta ? ' chatbot-cta' : ''}`}
            href={c.href}
            target={c.href?.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
          >
            {c.label}
          </a>
        ) : (
          <button key={i} type="button" className={`chatbot-starter${c.cta ? ' chatbot-cta' : ''}`} onClick={() => handleChip(c)}>
            {c.label}
          </button>
        ),
      )}
    </div>
  )

  const last = msgs[msgs.length - 1]
  const ready = !busy && last?.role === 'assistant' && last.typed
  const lastChips = ready && last.chips?.length ? last.chips : null
  const showRetry = ready && !!last.failed
  const followups = ready && !last.failed && !last.chips ? last.suggestions ?? [] : []
  const showStarters = msgs.length === 1 && !busy

  return (
    <>
      {/* Panel */}
      <div className={`chatbot-panel${open ? ' open' : ''}`} role="dialog" aria-label={t.title}>
        <div className="chatbot-head">
          <div className="chatbot-head-id">
            <span className="chatbot-dot" />
            <div>
              <div className="chatbot-title">{t.title}</div>
              <div className="chatbot-sub">{t.sub}</div>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="chatbot-msgs" ref={scrollRef} role="log" aria-live="polite" aria-relevant="additions">
          {msgs.map((m, i) => {
            const animateThis = m.role === 'assistant' && i === msgs.length - 1 && !m.typed
            return (
              <div
                key={i}
                className={`chatbot-msg ${m.role}`}
                onClick={animateThis ? () => markTyped(i) : undefined}
              >
                {m.role === 'assistant' ? (
                  animateThis ? (
                    <Typed text={m.content} onDone={() => markTyped(i)} onTick={scrollToEnd} />
                  ) : (
                    renderText(m.content)
                  )
                ) : (
                  m.content
                )}
              </div>
            )
          })}
          {busy && (
            <div className="chatbot-msg assistant chatbot-think">
              <span className="chatbot-typing">
                <span />
                <span />
                <span />
              </span>
              <span className="chatbot-think-label">{t.thinking[phase]}</span>
            </div>
          )}

          {showStarters && (
            <div className="chatbot-starters">
              {t.starters.map((q) => (
                <button key={q} type="button" className="chatbot-starter" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
              <button type="button" className="chatbot-starter chatbot-wizard-launch" onClick={startWizard}>
                {t.wizardCta}
              </button>
              <button type="button" className="chatbot-starter chatbot-cta" onClick={openLead}>
                {t.leadCta}
              </button>
            </div>
          )}
          {lastChips ? (
            renderChips(lastChips)
          ) : showRetry ? (
            <div className="chatbot-starters">
              <button type="button" className="chatbot-starter chatbot-retry" onClick={retry}>
                ↻ {t.retry}
              </button>
            </div>
          ) : followups.length > 0 ? (
            <div className="chatbot-starters chatbot-followups">
              {followups.map((q) => (
                <button key={q} type="button" className="chatbot-starter" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {leadOpen ? (
          <form
            className="chatbot-lead"
            onSubmit={(e) => {
              e.preventDefault()
              submitLeadForm()
            }}
          >
            <div className="chatbot-lead-head">
              <span>{t.leadTitle}</span>
              <button type="button" className="chatbot-lead-cancel" onClick={() => setLeadOpen(false)}>
                {t.leadCancel}
              </button>
            </div>
            <input
              className="chatbot-lead-in"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder={t.leadNamePh}
              aria-label={t.leadNamePh}
            />
            <input
              className="chatbot-lead-in"
              type="email"
              required
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              placeholder={t.leadEmailPh}
              aria-label={t.leadEmailPh}
            />
            <textarea
              className="chatbot-lead-in chatbot-lead-msg"
              required
              rows={3}
              value={leadMsg}
              onChange={(e) => setLeadMsg(e.target.value)}
              placeholder={t.leadMsgPh}
              aria-label={t.leadMsgPh}
            />
            {/* honeypot — hidden from humans */}
            <input
              className="chatbot-lead-hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={leadHp}
              onChange={(e) => setLeadHp(e.target.value)}
            />
            {leadStatus === 'error' && (
              <div className="chatbot-lead-err">
                {t.leadErr}{' '}
                <a href="https://wa.me/3548888901" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>{' '}
                ·{' '}
                <a href="mailto:hello@kamiljan.com">Email</a>
              </div>
            )}
            <button
              type="submit"
              className="chatbot-lead-send"
              disabled={leadStatus === 'sending' || !leadEmail.trim() || !leadMsg.trim()}
            >
              {leadStatus === 'sending' ? t.leadSending : t.leadSend}
            </button>
          </form>
        ) : (
          <form
            className="chatbot-input"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h10M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        )}

        <div className="chatbot-foot">
          <span>{t.human}</span>
          <a href="https://wa.me/3548888901" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <span className="chatbot-foot-sep">·</span>
          <a href="mailto:hello@kamiljan.com">Email</a>
        </div>
      </div>

      {/* Nudge bubble */}
      {nudge && !open && (
        <button className="chatbot-nudge" onClick={toggle} aria-label={t.nudge}>
          {t.nudge}
          <span
            className="chatbot-nudge-x"
            role="button"
            aria-label="Dismiss"
            onClick={(e) => {
              e.stopPropagation()
              dismissNudge()
            }}
          >
            ×
          </span>
        </button>
      )}

      {/* FAB */}
      <button className={`chatbot-fab${open ? ' active' : ''}`} onClick={toggle} aria-label={t.title}>
        <span className="chatbot-fab-ring" />
        {open ? (
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v8a1.5 1.5 0 0 1-1.5 1.5H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 13.5v-8Z"
              fill="currentColor"
            />
            <circle cx="9" cy="9.5" r="1" fill="#06101a" />
            <circle cx="12" cy="9.5" r="1" fill="#06101a" />
            <circle cx="15" cy="9.5" r="1" fill="#06101a" />
          </svg>
        )}
      </button>
    </>
  )
}
