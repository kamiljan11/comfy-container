import { useEffect, useRef, useState } from 'react'
import { askBot } from '../lib/bot.functions'
import type { Lang } from '../i18n'

type Msg = { role: 'user' | 'assistant'; content: string }

const COPY: Record<
  Lang,
  {
    greet: string
    placeholder: string
    human: string
    title: string
    sub: string
    fallback: string
    starters: string[]
    nudge: string
  }
> = {
  en: {
    greet: "Hi — I'm Kamil's AI assistant. Ask me about his work, skills, or whether he's a fit for your role.",
    placeholder: 'Ask anything…',
    human: 'Prefer a human?',
    title: "Kamil's AI",
    sub: 'trained on his work',
    fallback: "I can't reach my brain right now — but Kamil replies personally. Email hello@kamiljan.com or message him on WhatsApp.",
    starters: ['Is Kamil a fit for an AI role?', 'What has he actually built?', 'How do I reach him?'],
    nudge: 'Ask my AI anything 👋',
  },
  pl: {
    greet: 'Cześć — jestem AI asystentem Kamila. Pytaj o jego pracę, umiejętności albo czy pasuje do Twojej roli.',
    placeholder: 'Zapytaj o cokolwiek…',
    human: 'Wolisz człowieka?',
    title: 'AI Kamila',
    sub: 'wytrenowany na jego pracy',
    fallback: 'Chwilowo nie mam dostępu do mózgu — ale Kamil odpisuje osobiście. Napisz na hello@kamiljan.com albo na WhatsApp.',
    starters: ['Czy Kamil pasuje do roli AI?', 'Co realnie zbudował?', 'Jak się z nim skontaktować?'],
    nudge: 'Zapytaj moje AI 👋',
  },
}

const STORE_KEY = 'kb_chat_v1'
const NUDGE_KEY = 'kb_nudge_seen_v1'

// Turn emails, wa.me and http(s) links inside a bot reply into real anchors.
const LINK_RE =
  /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:https?:\/\/|wa\.me\/)[^\s)]+)/g

function renderText(text: string) {
  return text.split(LINK_RE).map((part, i) => {
    if (!part) return null
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`}>
          {part}
        </a>
      )
    }
    if (/^(https?:\/\/|wa\.me\/)/.test(part)) {
      const href = part.startsWith('http') ? part : `https://${part}`
      return (
        <a key={i} href={href} target="_blank" rel="noreferrer">
          {part}
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export default function ChatBot({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [nudge, setNudge] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'assistant', content: t.greet }])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hydrated = useRef(false)

  // Restore a prior conversation for this browser session (client-only).
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Msg[]
        if (Array.isArray(parsed) && parsed.length > 1) setMsgs(parsed)
      }
    } catch {
      /* ignore */
    }
    hydrated.current = true
  }, [])

  // Persist conversation (skip the seed-only state).
  useEffect(() => {
    if (!hydrated.current) return
    try {
      if (msgs.length > 1) sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs))
    } catch {
      /* ignore */
    }
  }, [msgs])

  // One-time gentle nudge to draw the eye to the assistant.
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

  // Reset greeting if language flips and only the seed message exists.
  useEffect(() => {
    setMsgs((m) => (m.length <= 1 ? [{ role: 'assistant', content: t.greet }] : m))
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [open, msgs, busy])

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

  const send = async (textArg?: string) => {
    const text = (textArg ?? input).trim()
    if (!text || busy) return
    const next: Msg[] = [...msgs, { role: 'user', content: text }]
    setMsgs(next)
    setInput('')
    setBusy(true)
    try {
      const res = await askBot({ data: { messages: next } })
      setMsgs([...next, { role: 'assistant', content: res.ok ? res.text : t.fallback }])
    } catch {
      setMsgs([...next, { role: 'assistant', content: t.fallback }])
    } finally {
      setBusy(false)
    }
  }

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

        <div className="chatbot-msgs" ref={scrollRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`chatbot-msg ${m.role}`}>
              {m.role === 'assistant' ? renderText(m.content) : m.content}
            </div>
          ))}
          {busy && (
            <div className="chatbot-msg assistant chatbot-typing">
              <span />
              <span />
              <span />
            </div>
          )}
          {showStarters && (
            <div className="chatbot-starters">
              {t.starters.map((q) => (
                <button key={q} type="button" className="chatbot-starter" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

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
