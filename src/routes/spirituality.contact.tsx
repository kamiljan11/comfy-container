import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import SpiritualityLayout from '../components/SpiritualityLayout'
import { submitContactForm } from '../lib/contact.functions'

export const Route = createFileRoute('/spirituality/contact')({
  head: () => ({
    meta: [
      { title: 'Contact Kamil Jan' },
      { name: 'description', content: 'Get in touch — questions, feedback, partnerships. I read every message that comes in.' },
      { property: 'og:title', content: 'Contact Kamil Jan' },
      { property: 'og:description', content: 'Get in touch — questions, feedback, partnerships. I read every message that comes in.' },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality/contact' },
      { property: 'og:image', content: 'https://kamiljan.com/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality/contact' },
    ],
  }),
  component: ContactPage,
})

const EMAIL = 'hello@kamiljan.com'

type QuickLink = {
  eyebrow: string
  title: string
  desc: string
  cta: string
  to?: string
  href?: string
  external?: boolean
}

const QUICK_LINKS: QuickLink[] = [
  {
    eyebrow: 'Work together',
    title: 'Book a Clarity Call',
    desc: 'Free 45-minute conversation. We map the closest energy block and your next three steps.',
    cta: 'Open booking →',
    to: '/spirituality/clarity',
  },
  {
    eyebrow: 'Read',
    title: 'The Practical Spirituality book',
    desc: 'A grounded guide to integrating spiritual practice into ordinary life.',
    cta: 'Read the book →',
    to: '/spirituality/sps',
  },
  {
    eyebrow: 'Practice',
    title: 'The DMT practice',
    desc: 'A daily method for working with the breath, attention, and the body’s natural chemistry.',
    cta: 'See the practice →',
    to: '/spirituality/dmtpractice',
  },
  {
    eyebrow: 'Follow along',
    title: 'YouTube & Instagram',
    desc: 'Weekly videos and short reflections from the path. Free, public, no funnel.',
    cta: 'Open YouTube →',
    href: 'https://youtube.com/@myspiritway',
    external: true,
  },
]

function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [copied, setCopied] = useState(false)

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore — user can still click the mailto link
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const subject = String(data.get('subject') || '').trim()
    const message = String(data.get('message') || '').trim()

    // Local validation before posting
    if (!name) {
      setStatus('error')
      setErrorMsg('Please add your name.')
      return
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }
    if (!message || message.length < 5) {
      setStatus('error')
      setErrorMsg('Please write a short message (at least a few words).')
      return
    }

    setStatus('sending')
    try {
      await submitContactForm({
        data: { name, email, subject, message },
      })
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <SpiritualityLayout>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative -mx-6 px-6 pt-2 pb-16 md:pb-20">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4">
          Get in touch
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
          Drop a note. Real reply.<br />
          <span className="italic font-light text-amber-200">I read everything that comes in.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
          Questions about the practice, feedback on a video or chapter, partnership ideas,
          collaborations, or just a hello — all welcome. This page goes straight to my inbox; there
          is no assistant, no autoresponder, no filter.
        </p>
        <p className="mt-4 text-base text-white/65 max-w-2xl">
          Take a minute, write what’s true. I’ll come back to you personally.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#contact-form"
            className="rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all"
          >
            Write a message
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-md border border-white/20 bg-white/[0.05] px-7 py-3 text-sm text-white hover:bg-white/10 transition-all"
          >
            Email directly
          </a>
        </div>
      </section>

      {/* ── Direct email card ──────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Direct email</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
          The fastest way to reach me.
        </h2>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Write to</p>
              <a
                href={`mailto:${EMAIL}`}
                className="text-2xl md:text-3xl font-semibold text-amber-200 hover:text-amber-100 underline-offset-4 hover:underline transition-all break-all"
              >
                {EMAIL}
              </a>
              <p className="mt-3 text-sm text-white/60 max-w-md">
                One inbox. Read by me, not a team. Replies usually go out within 2–3 days.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="rounded-md border border-white/20 bg-white/[0.05] px-5 py-2.5 text-sm text-white hover:bg-white/10 transition-all"
              >
                {copied ? '✓ Copied' : 'Copy email'}
              </button>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-md bg-amber-300 px-5 py-2.5 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all"
              >
                Open mail client →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick links grid ───────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Other paths</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          You may also be looking for —
        </h2>
        <p className="text-base text-white/65 mb-10 max-w-2xl">
          If your message is one of the questions below, there’s probably a faster answer waiting.
          Pick whichever fits and skip the inbox.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {QUICK_LINKS.map((l, i) => {
            const body = (
              <>
                <p className="text-[11px] uppercase tracking-[0.2em] text-amber-300/70 mb-2">{l.eyebrow}</p>
                <h3 className="text-lg font-semibold text-white mb-2">{l.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-4">{l.desc}</p>
                <span className="text-sm font-medium text-amber-200 group-hover:text-amber-100">{l.cta}</span>
              </>
            )
            const classes =
              'group block rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all'
            if (l.external && l.href) {
              return (
                <a key={i} href={l.href} target="_blank" rel="noreferrer" className={classes}>
                  {body}
                </a>
              )
            }
            return (
              <Link key={i} to={l.to!} className={classes}>
                {body}
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Contact form ───────────────────────────────────────────────── */}
      <section id="contact-form" className="py-16 border-t border-white/5 scroll-mt-24">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Send a message</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          Or use the form. Same inbox.
        </h2>
        <p className="text-base text-white/65 mb-10 max-w-2xl">
          Fill in what feels right. Subject is optional but helpful — it tells me at a glance whether
          your note is urgent, a question, or a hello.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8" noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={status === 'sending'}
                placeholder="Jane Doe"
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={status === 'sending'}
                placeholder="you@example.com"
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
              Subject <span className="text-white/30 normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              disabled={status === 'sending'}
              placeholder="Question about the DMT practice"
              className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={7}
              disabled={status === 'sending'}
              placeholder="Write what’s on your mind…"
              className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none resize-y"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-md border border-white/20 bg-white/[0.05] px-7 py-3 text-sm text-white hover:bg-white/10 transition-all"
              >
                Or use email
              </a>
            </div>
            <div className="text-sm min-h-[1.25rem]" aria-live="polite">
              {status === 'sent' && (
                <span className="text-green-300">✓ Received. I’ll reply within 2–3 days.</span>
              )}
              {status === 'error' && (
                <span className="text-red-300">
                  {errorMsg || `Something went wrong. Email ${EMAIL} instead.`}
                </span>
              )}
            </div>
          </div>
        </form>

        <p className="mt-6 text-sm text-white/60 italic">
          I aim to reply within 2–3 days. If urgent, mention it in the subject.
        </p>
      </section>

      {/* ── Migration footer note ──────────────────────────────────────── */}
      <p className="mt-12 text-xs text-white/30 italic">
        Migrated from myspiritway.org/contact-myspiritway.{' '}
        <Link to="/spirituality" className="underline hover:text-white/60">Back to spirituality home →</Link>
      </p>
    </SpiritualityLayout>
  )
}
