import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/support')({ component: SupportPage })

const SHARE_URL = 'https://kamiljan.com/spirituality/support'

const WAYS = [
  {
    icon: '💛',
    title: "Can't afford it right now?",
    desc: 'Email hello@kamiljan.com with your story — we will find a way. No one is turned away because of money.',
    action: { label: 'Write to me', href: 'mailto:hello@kamiljan.com?subject=Support%20—%20accessibility' },
  },
  {
    icon: '💸',
    title: 'Make a financial contribution',
    desc: 'Choose any of the methods below — cards, multi-currency, monthly recurring, crypto, or SWIFT wire. Give what feels meaningful.',
    action: { label: 'See payment options ↓', href: '#payments' },
  },
  {
    icon: '🔗',
    title: 'Share the work',
    desc: 'Send the link to one person it might help. Word of mouth is how this reaches the people who need it.',
    action: { label: 'Copy link', copy: SHARE_URL },
  },
  {
    icon: '✍️',
    title: 'Send a testimonial',
    desc: 'If the work moved something in you, write a few honest sentences. Your story helps others find this.',
    action: { label: 'Send testimonial', href: 'mailto:hello@kamiljan.com?subject=Testimonial' },
  },
  {
    icon: '🪞',
    title: 'Share your perspective',
    desc: "What's missing? What could be clearer? What would make this more useful? Honest feedback is gold.",
    action: { label: 'Send feedback', href: 'mailto:hello@kamiljan.com?subject=Feedback' },
  },
  {
    icon: '🤝',
    title: 'Contribute creatively',
    desc: 'Proactive ideas, collaborations, translations, illustrations, music — whatever flows naturally. Reach out.',
    action: { label: 'Get in touch', href: 'mailto:hello@kamiljan.com?subject=Creative%20contribution' },
  },
] as const

const CARD_LINKS = [
  { name: 'Revolut', href: 'https://www.revolut.me/kamil4b0' },
  { name: 'PayPal', href: 'https://paypal.me/kamiljanmsw?country.x=IS&locale.x=en_US' },
  { name: 'Wise', href: 'https://wise.com/pay/me/kamiljanw4' },
  { name: 'Stripe', href: 'https://buy.stripe.com/7sYfZhd575B3gcE1jw9IQ00' },
] as const

const MONTHLY_LINKS = [
  { name: 'Buy Me a Coffee', href: 'https://buymeacoffee.com/myspiritway' },
  { name: 'Ko-Fi', href: 'https://ko-fi.com/myspiritway' },
] as const

const BTC_ADDRESS = 'bc1qmz0ydhuvlax9s8n6zgvxw5cvs5fucl0tt0jc23'
const ETH_ADDRESS = '0x1dA94A7bDd2aE4181Fb42c74C1E79d54CcEc8aD2'

const SWIFT_LINES = [
  { label: 'Currencies', value: 'GBP, EUR, USD, CHF and more' },
  { label: 'Beneficiary', value: 'Kamil Włodarczyk' },
  { label: 'IBAN', value: 'LT79 3250 0272 4579 4080' },
  { label: 'BIC / SWIFT', value: 'REVOLT21' },
  { label: 'Bank', value: 'Revolut Bank UAB' },
  { label: 'Bank address', value: 'Konstitucijos ave. 21B, 08130, Vilnius, Lithuania' },
  { label: 'Correspondent BIC', value: 'CHASGB2L' },
] as const

function SupportPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <SpiritualityLayout>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative -mx-6 px-6 pt-2 pb-16 md:pb-20">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4">
          Fair Exchange Model
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
          Support the mission.<br />
          <span className="italic font-light text-amber-200">Give what feels right. Receive what helps.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
          This work is offered on the Fair Exchange Model — it&apos;s not free, but it isn&apos;t gatekept either.
          The invitation is to contribute something meaningful from the heart, in whatever form flows naturally for you.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#ways"
            className="rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all"
          >
            See ways to give
          </a>
          <a
            href="mailto:hello@kamiljan.com?subject=Sharing%20your%20work"
            className="rounded-md border border-white/20 bg-white/[0.05] px-7 py-3 text-sm text-white hover:bg-white/10 transition-all"
          >
            Or simply share this
          </a>
        </div>
      </section>

      {/* ── Why this model ─────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Why this model</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-8">
          Accessible to everyone, meaningful from everyone.
        </h2>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <p className="text-base md:text-lg text-white/80 leading-relaxed">
            I want this work accessible to everyone, regardless of where they are financially. Fair exchange means
            you contribute in a way that feels meaningful to you — financial support, sharing it with someone who
            needs it, honest feedback, your time, a creative contribution. Whatever flows naturally is welcome,
            and nothing is required to receive what&apos;s here.
          </p>
        </div>
      </section>

      {/* ── Ways to contribute ─────────────────────────────────────────── */}
      <section id="ways" className="py-16 border-t border-white/5 scroll-mt-24">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Ways to contribute</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          Pick whatever feels honest for you.
        </h2>
        <p className="text-base text-white/65 mb-10 max-w-2xl">
          Six paths. None of them is better than another — what matters is that it comes from goodwill.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {WAYS.map((w, i) => {
            const isCopy = 'copy' in w.action
            return (
              <div
                key={i}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all"
              >
                <div className="text-3xl leading-none mb-4">{w.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{w.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-5">{w.desc}</p>
                {isCopy ? (
                  <button
                    type="button"
                    onClick={() => copy(`way-${i}`, (w.action as { copy: string }).copy)}
                    className="rounded-md border border-white/20 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition-all"
                  >
                    {copied === `way-${i}` ? 'Copied' : w.action.label}
                  </button>
                ) : (
                  <a
                    href={(w.action as { href: string }).href}
                    className="inline-block rounded-md border border-white/20 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition-all"
                  >
                    {w.action.label}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Financial contribution ─────────────────────────────────────── */}
      <section id="payments" className="py-16 border-t border-white/5 scroll-mt-24">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Financial contribution</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          Pick whichever method is easiest for you.
        </h2>
        <p className="text-base text-white/65 mb-10 max-w-2xl">
          Cards, monthly recurring, crypto, or SWIFT wire — all welcome. Any amount lands the same: gratefully.
        </p>

        <div className="space-y-5">
          {/* Cards · Multi-currency */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-2">Cards · Multi-currency</div>
            <p className="text-sm text-white/65 mb-5">One-off card payment in your preferred currency.</p>
            <div className="flex flex-wrap gap-3">
              {CARD_LINKS.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-white/20 bg-white/[0.05] px-5 py-2.5 text-sm text-white hover:bg-white/10 transition-all"
                >
                  {l.name} →
                </a>
              ))}
            </div>
          </div>

          {/* Monthly */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-2">Monthly recurring</div>
            <p className="text-sm text-white/65 mb-5">For those who&apos;d like to give a little, regularly — stability matters.</p>
            <div className="flex flex-wrap gap-3">
              {MONTHLY_LINKS.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-white/20 bg-white/[0.05] px-5 py-2.5 text-sm text-white hover:bg-white/10 transition-all"
                >
                  {l.name} →
                </a>
              ))}
            </div>
          </div>

          {/* Crypto */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-2">Crypto</div>
            <p className="text-sm text-white/65 mb-5">Send to either address below — copy and paste from your wallet.</p>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wider text-white/60">BTC</p>
                  <button
                    type="button"
                    onClick={() => copy('btc', BTC_ADDRESS)}
                    className="rounded-md border border-white/20 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-white hover:bg-white/10 transition-all"
                  >
                    {copied === 'btc' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <code className="block text-xs font-mono text-white/85 bg-black/40 p-3 rounded-md break-all border border-white/5">
                  {BTC_ADDRESS}
                </code>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wider text-white/60">ETH <span className="text-white/40 normal-case">· min 0.1 ETH</span></p>
                  <button
                    type="button"
                    onClick={() => copy('eth', ETH_ADDRESS)}
                    className="rounded-md border border-white/20 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-white hover:bg-white/10 transition-all"
                  >
                    {copied === 'eth' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <code className="block text-xs font-mono text-white/85 bg-black/40 p-3 rounded-md break-all border border-white/5">
                  {ETH_ADDRESS}
                </code>
              </div>
            </div>
          </div>

          {/* SWIFT */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-2">SWIFT wire</div>
            <p className="text-sm text-white/65 mb-5">For bank transfers — multi-currency supported.</p>
            <dl className="grid gap-3 sm:grid-cols-[160px_1fr]">
              {SWIFT_LINES.map((row) => {
                const isCopyable = row.label === 'IBAN' || row.label === 'BIC / SWIFT' || row.label === 'Correspondent BIC'
                const copyKey = `swift-${row.label}`
                return (
                  <div key={row.label} className="sm:contents">
                    <dt className="text-xs uppercase tracking-wider text-white/50 sm:pt-1">{row.label}</dt>
                    <dd className="flex items-center gap-2 text-sm text-white/85">
                      <span className={isCopyable ? 'font-mono' : ''}>{row.value}</span>
                      {isCopyable && (
                        <button
                          type="button"
                          onClick={() => copy(copyKey, row.value)}
                          className="rounded-md border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/80 hover:bg-white/10 transition-all"
                        >
                          {copied === copyKey ? 'Copied' : 'Copy'}
                        </button>
                      )}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>
      </section>

      {/* ── What your support enables ──────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">What your support enables</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-8">
          A ripple, not a transaction.
        </h2>
        <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
          Your contribution gives me dedicated time to develop this work without seeking outside employment.
          As the project grows, resources become available to support other meaningful initiatives — people,
          ideas, and communities aligned with the same direction. What begins as a single act of generosity
          tends to ripple further than either of us can see.
        </p>
        <p className="mt-6 text-base md:text-lg italic text-amber-200 leading-relaxed max-w-2xl">
          Thank you — your kindness makes a real difference.
        </p>
      </section>

      <p className="mt-12 text-xs text-white/30 italic">
        Migrated from myspiritway.org/support_myspiritway. <Link to="/spirituality" className="underline hover:text-white/60">Back to spirituality home →</Link>
      </p>
    </SpiritualityLayout>
  )
}
