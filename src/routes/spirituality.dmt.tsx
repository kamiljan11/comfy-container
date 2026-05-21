import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/dmt')({ component: DmtPage })

function DmtPage() {
  return (
    <SpiritualityLayout eyebrow="Activation Session" title="Dynamic Meditation Technique (DMT)">
      <p className="text-lg text-white/85 leading-relaxed mb-6">Accelerate the evolution of consciousness through the spiritual practice of Dynamic Meditation Technique (DMT). Rooted in the ancient 8 Limbs of Yoga — a complete system guiding the seeker toward the state of higher consciousness, a deep union with all that is.</p>
      <p className="text-base text-white/75 leading-relaxed mb-4">The result of over ten years of dedication to refining spiritual practices for personal and spiritual growth. DMT represents a unique fusion of proven spiritual techniques, carefully crafted to produce real-life benefits rather than just promises.</p>
      <p className="text-base text-white/75 leading-relaxed mb-8">DMT invites you to delve into your inner self, offering deep insights into who you are and your place in the universe.</p>

      <h2 className="mt-12 mb-6 text-2xl font-bold text-white">Benefits</h2>
      <ul className="space-y-3 text-white/85">
        <li><strong className="text-white">Emotional release</strong> — a safe environment for releasing built-up stress and suppressed emotions.</li>
        <li><strong className="text-white">Trauma processing</strong> — secure space for confronting and working through past traumas.</li>
        <li><strong className="text-white">Deep transformation</strong> — unlocks new levels of self-awareness and accelerates spiritual growth.</li>
        <li><strong className="text-white">Intuitive guidance</strong> — opens the ability to perceive information beyond the ordinary senses.</li>
        <li><strong className="text-white">Deep meditation</strong> — from the first session, reach a state of profound peace.</li>
        <li><strong className="text-white">Powerful energy healing</strong> — balances the body's energy system to release blockages.</li>
        <li><strong className="text-white">Spiritual awakening</strong> — access deeper, previously unreachable layers of consciousness.</li>
        <li><strong className="text-white">Supercharge manifestation</strong> — raise your consciousness to become a powerful magnet for what aligns with your evolution.</li>
      </ul>

      <h2 className="mt-12 mb-6 text-2xl font-bold text-white">FAQ</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">What are DMT sessions?</h3>
          <p className="text-white/75">An intensive complete spiritual process aimed at enhancing inner awareness through rhythmic breathing, presence, and integration.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Who should avoid participating?</h3>
          <p className="text-white/75">Not recommended for individuals with cardiac conditions, pregnant women, or those with specific medical contraindications. Always consult a healthcare provider if uncertain.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Can I practice DMT while driving or swimming?</h3>
          <p className="text-white/75">No. Never practice DMT while driving, swimming, or in any situation where altered states could pose a risk.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">How can I prepare for the session?</h3>
          <p className="text-white/75">Practise on an empty stomach. If possible, do some simple stretches beforehand. Approach the session with openness and presence.</p>
        </div>
      </div>

      <p className="mt-12 text-sm text-white/40 italic">Full session content + practice video coming soon. For the live online practice, the original page is still available:</p>
      <a href="https://www.myspiritway.org/dmtpractice" target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-md border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-cyan-100 hover:bg-cyan-400/20 transition-all">Try the session online →</a>
    </SpiritualityLayout>
  )
}
