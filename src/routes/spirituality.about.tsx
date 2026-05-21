import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/about')({ component: AboutPage })

function AboutPage() {
  return (
    <SpiritualityLayout eyebrow="About" title="Kamil Jan — Teacher of Practical Spirituality">
      <p className="text-lg text-white/85 leading-relaxed mb-6">Welcome to MySpiritWay (or actually, YourSpiritWay). I'd like you to see me as a friend on the same path. However, for the sake of structure, you can call me a Practical Spiritual Teacher.</p>
      <p className="text-base text-white/75 leading-relaxed mb-4">My quest for knowledge and understanding has always been present, fuelled by life events and inner calling. Over the years I followed the thread of what many traditions call God — the deep, ever-present reality that connects everything. Each step revealed another layer, and at some point a quiet happiness began to fill my being.</p>
      <p className="text-base text-white/75 leading-relaxed mb-4">One of my primary ongoing tasks over the years has been to develop a practical, step-by-step path toward complete life satisfaction. The main focus: enhance a person's consciousness through tools that actually work in everyday life.</p>
      <p className="text-base text-white/75 leading-relaxed mb-4">I actively work to expand the set of practical tools and continuously follow the process of deep inner evolution, sharing new findings with the supportive community.</p>
      <p className="text-base text-white/75 leading-relaxed mb-8">My biggest dream is to create a self-sufficient village where people will live in a healthy, balanced way and support each other's creative potential.</p>

      <p className="mt-12 text-sm text-white/40 italic">Extended bio + photos are being moved over. For now you can also read the original:</p>
      <a href="https://www.myspiritway.org/aboutkamiljan" target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-md border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-cyan-100 hover:bg-cyan-400/20 transition-all">Read the original →</a>
    </SpiritualityLayout>
  )
}
