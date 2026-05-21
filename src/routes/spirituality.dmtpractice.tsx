import { createFileRoute, Link } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import NewsletterSignup from '../components/NewsletterSignup'

export const Route = createFileRoute('/spirituality/dmtpractice')({ component: DmtPracticePage })

function DmtPracticePage() {
  return (
    <SpiritualityLayout eyebrow="Live Practice" title="Try the DMT Session">
      <p className="text-lg text-white/85 leading-relaxed mb-6">A guided live audio practice of the Dynamic Meditation Technique. Set aside 30–45 minutes uninterrupted. Find a quiet space. Wear loose clothing. Empty stomach. Do not practice while driving, swimming, or in any situation where altered states could pose risk.</p>

      <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-6 mb-8">
        <h3 className="text-base font-semibold text-amber-200 mb-2">Before you begin</h3>
        <ul className="text-sm text-white/75 space-y-2 list-disc pl-5">
          <li>Read the <Link to="/spirituality/dmt" className="text-cyan-400 underline">DMT introduction</Link> first if you haven't already.</li>
          <li>Do not practise if you have cardiac conditions, are pregnant, or have specific medical contraindications.</li>
          <li>If a memory or strong emotion comes up, breathe with it. It's a release — don't suppress it.</li>
          <li>Stay seated or lying down for at least 5 minutes after the practice before getting up.</li>
        </ul>
      </div>

      <h2 className="mt-12 mb-4 text-2xl font-bold text-white">The practice</h2>
      <p className="text-base text-white/75 leading-relaxed mb-6">Live online DMT sessions are being migrated to kamiljan.com. While we set up the new audio/video pipeline, the original session page is still live:</p>

      <a href="https://www.myspiritway.org/dmtpractice" target="_blank" rel="noreferrer" className="inline-block rounded-md border border-cyan-400/40 bg-cyan-400/15 px-6 py-3 text-cyan-100 hover:bg-cyan-400/25 transition-all font-medium">Open original DMT session →</a>

      <h2 className="mt-14 mb-4 text-2xl font-bold text-white">After the practice</h2>
      <p className="text-base text-white/75 leading-relaxed mb-6">Integration is everything. Journal what came up, even if it feels small. Drink water. Move gently. Sit with whatever arose for at least an hour before re-engaging your day.</p>
      <p className="text-base text-white/75 leading-relaxed mb-10">Join the practice community to get reminders, integration prompts, and access to future live sessions:</p>

      <NewsletterSignup
        source="dmtpractice-page"
        tag="dmt-practitioner"
        heading="DMT practice updates"
        subheading="Get notified about live sessions + integration support material."
        buttonLabel="Send me updates"
      />
    </SpiritualityLayout>
  )
}
