import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/iyss')({ component: IyssPage })

function IyssPage() {
  return (
    <SpiritualityLayout eyebrow="Activation Session" title="Integrate Your Shattered Self">
      <p className="text-lg text-white/85 leading-relaxed mb-6">A 21-day practice for integrating fragmented parts of the self. Ideal for shadow work, trauma processing, and creating a vision of inner wholeness and a beautiful future.</p>
      <p className="text-base text-white/75 leading-relaxed mb-4">Over time, life splits us. Old wounds, suppressed desires, parts of ourselves we abandoned to survive. Integration is the practice of inviting them back — without judgment, without rushing — until the inner system becomes whole again.</p>
      <p className="text-base text-white/75 leading-relaxed mb-8">Practise for 21 days continuously, then once a week thereafter to maintain inner balance.</p>

      <h2 className="mt-12 mb-6 text-2xl font-bold text-white">What you'll work through</h2>
      <ul className="space-y-3 text-white/85 list-disc pl-6">
        <li>Identifying fragmented or rejected parts of the self</li>
        <li>Compassionate dialogue with the inner critic, the wounded child, the perfectionist</li>
        <li>Reclaiming abandoned dreams and creative impulses</li>
        <li>Building a coherent inner narrative across past, present, and future self</li>
        <li>Setting a vision for the integrated self — anchored in daily practice</li>
      </ul>

      <p className="mt-12 text-sm text-white/40 italic">The full guided 21-day workbook is being migrated to kamiljan.com. In the meantime:</p>
      <a href="https://www.myspiritway.org/iyss" target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-md border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-cyan-100 hover:bg-cyan-400/20 transition-all">Read the original →</a>
    </SpiritualityLayout>
  )
}
