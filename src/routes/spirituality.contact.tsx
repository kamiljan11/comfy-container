import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import SpiritualityLayout from '../components/SpiritualityLayout'
import { submitContactForm } from '../server/contact'

export const Route = createFileRoute('/spirituality/contact')({ component: ContactPage })

function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      await submitContactForm({
        data: {
          name: String(data.get('name') || ''),
          email: String(data.get('email') || ''),
          subject: String(data.get('subject') || ''),
          message: String(data.get('message') || ''),
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
    <SpiritualityLayout eyebrow="Contact" title="Get in touch">
      <p className="text-lg text-white/85 leading-relaxed mb-6">Drop a note — questions about the practice, feedback on the content, requests, partnerships, or just to say hello.</p>
      <p className="text-base text-white/75 mb-10">Direct email: <a href="mailto:hello@kamiljan.com" className="text-cyan-400 underline">hello@kamiljan.com</a></p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-widest text-white/60 mb-2">Your name</label>
            <input id="name" name="name" type="text" required disabled={status === 'sending'} className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/60 mb-2">Email</label>
            <input id="email" name="email" type="email" required disabled={status === 'sending'} className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none" />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-white/60 mb-2">Subject</label>
          <input id="subject" name="subject" type="text" disabled={status === 'sending'} className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="message" className="block text-xs uppercase tracking-widest text-white/60 mb-2">Message</label>
          <textarea id="message" name="message" required rows={6} disabled={status === 'sending'} className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none resize-y" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <button type="submit" disabled={status === 'sending'} className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-6 py-2.5 text-sm text-cyan-100 hover:bg-cyan-400/20 transition-all disabled:opacity-50">
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'sent' && <span className="text-sm text-green-400">✓ Message received. I'll reply soon.</span>}
          {status === 'error' && <span className="text-sm text-red-400">{errorMsg || 'Something went wrong. Please email hello@kamiljan.com instead.'}</span>}
        </div>
      </form>
    </SpiritualityLayout>
  )
}
