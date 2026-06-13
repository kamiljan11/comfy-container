import { useEffect, useRef, useState } from 'react'
import { askBot } from '../lib/bot.functions'
import type { Lang } from '../i18n'

type Msg = { role: 'user' | 'assistant'; content: string }

const COPY: Record<Lang, { greet: string; placeholder: string; human: string; title: string; sub: string; fallback: string }> = {
  en: {
    greet: "Hi — I'm Kamil's AI assistant. Ask me about his work, skills, or whether he's a fit for your role.",
    placeholder: 'Ask anything…',
    human: 'Prefer a human?',
    title: "Kamil's AI",
    sub: 'trained on his work',
    fallback: "I can't reach my brain right now — but Kamil replies personally. Email hello@kamiljan.com or message him on WhatsApp.",
  },
  pl: {
    greet: 'Cześć — jestem AI asystentem Kamila. Pytaj o jego pracę, umiejętności albo czy pasuje do Twojej roli.',
    placeholder: 'Zapytaj o cokolwiek…',
    human: 'Wolisz człowieka?',
    title: 'AI Kamila',
    sub: 'wytrenowany na jego pracy',
    fallback: 'Chwilowo nie mam dostępu do mózgu — ale Kamil odpisuje osobiście. Napisz na hello@kamiljan.com albo na WhatsApp.',
  },
}

export default function ChatBot({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'assistant', content: t.greet }])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // reset greeting if language flips and only the seed message exists
  useEffect(() => {
    setMsgs((m) => (m.length <= 1 ? [{ role: 'assistant', content: t.greet }] : m))
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [open, msgs, busy])

  const send = async () => {
    const text = input.trim()
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="chatbot-msgs" ref={scrollRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`chatbot-msg ${m.role}`}>{m.content}</div>
          ))}
          {busy && (
            <div className="chatbot-msg assistant chatbot-typing"><span /><span /><span /></div>
          )}
        </div>

        <form
          className="chatbot-input"
          onSubmit={(e) => { e.preventDefault(); send() }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
          />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h10M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </form>

        <div className="chatbot-foot">
          <span>{t.human}</span>
          <a href="https://wa.me/3548888901" target="_blank" rel="noreferrer">WhatsApp</a>
          <span className="chatbot-foot-sep">·</span>
          <a href="mailto:hello@kamiljan.com">Email</a>
        </div>
      </div>

      {/* FAB */}
      <button
        className={`chatbot-fab${open ? ' active' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={t.title}
      >
        <span className="chatbot-fab-ring" />
        {open ? (
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v8a1.5 1.5 0 0 1-1.5 1.5H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 13.5v-8Z" fill="currentColor" /><circle cx="9" cy="9.5" r="1" fill="#06101a" /><circle cx="12" cy="9.5" r="1" fill="#06101a" /><circle cx="15" cy="9.5" r="1" fill="#06101a" /></svg>
        )}
      </button>
    </>
  )
}
