import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import NewsletterSignup from '../components/NewsletterSignup'

export const Route = createFileRoute('/spirituality/clarity')({ component: ClarityPage })

// TODO: paste your live Google Calendar booking link here once you have it.
const GOOGLE_CALENDAR_BOOKING_URL = 'https://calendar.google.com/calendar/appointments/AcZssZ3qXq8Wbu2cqI82BYwSNlYAhf4XBHJ4lFa_TBg=?gv=true'

function ClarityPage() {
  return (
    <SpiritualityLayout eyebrow="1:1 Consultation" title="Book a Clarity Call">
      <p className="text-lg text-white/85 leading-relaxed mb-6">A focused 1:1 session with Kamil Jan. Bring whatever you're stuck on — spiritual practice, life direction, integration of insights, business clarity — and leave with concrete next steps.</p>
      <p className="text-base text-white/75 leading-relaxed mb-8">Pick a time that works for you. Calendar shows live availability, syncs directly with Google Calendar.</p>

      <div className="rounded-lg border border-cyan-400/30 bg-cyan-400/5 p-6 text-center">
        <p className="text-sm text-white/80 mb-4">Ready to book?</p>
        <a
          href={GOOGLE_CALENDAR_BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-md border border-cyan-400/40 bg-cyan-400/15 px-6 py-3 text-cyan-100 hover:bg-cyan-400/25 transition-all font-medium"
        >
          Open booking calendar →
        </a>
        <p className="mt-4 text-xs text-white/40">Powered by Google Calendar · you'll receive a confirmation email after booking.</p>
      </div>

      <h2 className="mt-14 mb-4 text-2xl font-bold text-white">Not sure yet?</h2>
      <p className="text-base text-white/75 leading-relaxed mb-6">Join the community first — you'll receive practical spirituality insights, and we'll send you the booking link whenever you're ready.</p>
      <NewsletterSignup
        source="clarity-page"
        tag="clarity-interest"
        heading="Stay in the loop"
        subheading="Practical spirituality + community updates. No spam."
      />
    </SpiritualityLayout>
  )
}
