import { useEffect, useMemo, useRef, useState } from 'react'
import { askBot } from '../lib/bot.functions'
import type { Lang } from '../i18n'

type Msg = {
  role: 'user' | 'assistant'
  content: string
  typed?: boolean
  suggestions?: string[]
  failed?: boolean
}

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
    thinking: string[]
    retry: string
  }
> = {
  en: {
    greet: "Hi — I'm Kamil's AI assistant. Ask me about his work, skills, or whether he's a fit for your role.",
    placeholder: 'Ask anything…',
    human: 'Prefer a human?',
    title: "Kamil's AI",
    sub: 'trained on his work',
    fallback: "I can't reach my brain right now — but Kamil replies personally. Email hello@kamiljan.com or message him on WhatsApp.",
    starters: ['Is Kamil a fit for my role?', 'What has he actually built?', 'How do I reach him?'],
    nudge: 'Ask my AI anything 👋',
    thinking: ['Thinking…', "Searching Kamil's work…"],
    retry: 'Try again',
  },
  pl: {
    greet: 'Cześć — jestem AI asystentem Kamila. Pytaj o jego pracę, umiejętności albo czy pasuje do Twojej roli.',
    placeholder: 'Zapytaj o cokolwiek…',
    human: 'Wolisz człowieka?',
    title: 'AI Kamila',
    sub: 'wytrenowany na jego pracy',
    fallback: 'Chwilowo nie mam dostępu do mózgu — ale Kamil odpisuje osobiście. Napisz na hello@kamiljan.com albo na WhatsApp.',
    starters: ['Czy Kamil pasuje do mojej roli?', 'Co realnie zbudował?', 'Jak się z nim skontaktować?'],
    nudge: 'Zapytaj moje AI 👋',
    thinking: ['Myślę…', 'Przeszukuję pracę Kamila…'],
    retry: 'Spróbuj ponownie',
  },
}

const STORE_KEY = 'kb_chat_v2'
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

// Split the model's reply into the visible body and the trailing "SUGGESTED:" chips.
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

// Word-by-word reveal for a freshly-arrived bot message. Skippable, reduced-motion aware.
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hydrated = useRef(false)

  const scrollToEnd = () =>
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })

  // Restore a prior conversation for this browser session (client-only).
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
    setMsgs((m) => (m.length <= 1 ? [{ role: 'assistant', content: t.greet, typed: true }] : m))
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  // Phased thinking label during the (single) request.
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

  const markTyped = (i: number) =>
    setMsgs((ms) => ms.map((x, idx) => (idx === i ? { ...x, typed: true } : x)))

  const showStarters = msgs.length === 1 && !busy
  const last = msgs[msgs.length - 1]
  const showRetry = !busy && last?.role === 'assistant' && !!last.failed
  const followups =
    !busy && last?.role === 'assistant' && last.typed && !last.failed ? last.suggestions ?? [] : []

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
            </div>
          )}
          {followups.length > 0 && (
            <div className="chatbot-starters chatbot-followups">
              {followups.map((q) => (
                <button key={q} type="button" className="chatbot-starter" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
          {showRetry && (
            <div className="chatbot-starters">
              <button type="button" className="chatbot-starter chatbot-retry" onClick={retry}>
                ↻ {t.retry}
              </button>
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
