import { useState } from 'react'
import { subscribeToNewsletter } from '../lib/newsletter.functions'

interface Props {
  source?: string
  tag?: string
  heading?: string
  subheading?: string
  buttonLabel?: string
}

/**
 * Reusable email opt-in form. Drop this anywhere — pages, modals, footers.
 *
 * Posts to `subscribeToNewsletter` server function which (1) records the lead
 * and (2) kicks off the welcome sequence via the pluggable email transport.
 * Until a real provider is wired up, everything runs in stub mode — logs to
 * the server console so we can verify the data path end-to-end.
 */
export default function NewsletterSignup({
  source = 'inline',
  tag,
  heading = 'Join the Community',
  subheading = 'Updates about newest projects + practical insights. Unsubscribe anytime.',
  buttonLabel = 'Subscribe',
}: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      await subscribeToNewsletter({
        data: {
          email: String(data.get('email') || ''),
          name: String(data.get('name') || ''),
          source,
          tag,
        },
      })
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-xl font-semibold text-white mb-1">{heading}</h3>
      <p className="text-sm text-white/60 mb-5">{subheading}</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="name"
            type="text"
            placeholder="Your name (optional)"
            disabled={status === 'sending'}
            className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="you@email.com"
            required
            disabled={status === 'sending'}
            className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-100 hover:bg-cyan-400/20 transition-all disabled:opacity-50"
          >
            {status === 'sending' ? 'Subscribing…' : buttonLabel}
          </button>
          {status === 'sent' && <span className="text-sm text-green-400">✓ You're in. Check your inbox.</span>}
          {status === 'error' && <span className="text-sm text-red-400">{errorMsg}</span>}
        </div>
      </form>
      <p className="mt-3 text-[10px] text-white/30">By subscribing you accept to receive emails. Unsubscribe anytime via link in any email.</p>
    </div>
  )
}
