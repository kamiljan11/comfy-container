import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import NewsletterSignup from '../components/NewsletterSignup'

export const Route = createFileRoute('/spirituality/spiritual-marketing')({ component: SpiritualMarketingPage })

function SpiritualMarketingPage() {
  return (
    <SpiritualityLayout eyebrow="Conscious Business" title="Spiritual Marketing">
      <p className="text-lg text-white/85 leading-relaxed mb-6">Marketing aligned with consciousness — grow your spiritual or wellness brand without compromising integrity. Tools, frameworks, and direct guidance from 12 years of practice + building businesses.</p>
      <p className="text-base text-white/75 leading-relaxed mb-10">This is for spiritual teachers, coaches, healers, creators — anyone whose work touches people's inner lives and who wants their growth strategy to match their values.</p>

      <h2 className="mt-12 mb-6 text-2xl font-bold text-white">What's included</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
          <div className="text-[10px] uppercase tracking-widest text-cyan-400/80 mb-3">Foundation</div>
          <h3 className="text-base font-semibold text-white mb-2">Conscious Brand Strategy</h3>
          <p className="text-sm text-white/65">Position your work so the right people find you — without manipulation or noise.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
          <div className="text-[10px] uppercase tracking-widest text-cyan-400/80 mb-3">Distribution</div>
          <h3 className="text-base font-semibold text-white mb-2">Content Engine</h3>
          <p className="text-sm text-white/65">Sustainable YouTube + IG + email pipeline that doesn't burn you out.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
          <div className="text-[10px] uppercase tracking-widest text-cyan-400/80 mb-3">Conversion</div>
          <h3 className="text-base font-semibold text-white mb-2">Aligned Sales Flow</h3>
          <p className="text-sm text-white/65">Funnels that respect the reader — no fake urgency, no manipulation.</p>
        </div>
      </div>

      <div className="mt-14">
        <NewsletterSignup
          source="spiritual-marketing-page"
          tag="spiritual-marketing-interest"
          heading="Get the framework"
          subheading="Free Spiritual Marketing primer — plus weekly insights for conscious creators."
          buttonLabel="Send me the primer"
        />
      </div>

      <p className="mt-10 text-sm text-white/40 italic">Full content + 3 products being migrated from systeme.io. For the original landing page:</p>
      <a href="https://www.myspiritway.org/spiritual-marketing" target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-md border border-white/15 bg-white/[0.04] px-5 py-2 text-sm text-white/80 hover:bg-white/10">Visit original →</a>
    </SpiritualityLayout>
  )
}
