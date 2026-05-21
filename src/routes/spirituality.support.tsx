import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/support')({ component: SupportPage })

function SupportPage() {
  return (
    <SpiritualityLayout eyebrow="Fair Exchange Model" title="Support the Mission">
      <p className="text-lg text-white/85 leading-relaxed mb-6">I wish to make this and all my work affordable and accessible to everyone. This project operates on the FAIR EXCHANGE MODEL, which means it's NOT FREE, but it's allowing you to contribute in a way that feels meaningful to you.</p>
      <p className="text-base text-white/75 leading-relaxed mb-8">I envision a community founded on honesty and openness, which is why I leave the choice of how you can support this work entirely up to you. It's important that it must come from good will, deeply from the heart.</p>

      <h2 className="mt-12 mb-6 text-2xl font-bold text-white">Ways to contribute</h2>
      <ul className="space-y-3 text-white/85 list-disc pl-6">
        <li>If you're interested in an offering but can't afford it — email <a href="mailto:hello@kamiljan.com" className="text-cyan-400 underline">hello@kamiljan.com</a>. Tell me your story; I'll send a discount code.</li>
        <li>Make a financial contribution — see options below.</li>
        <li>Share this work with people who might need it.</li>
        <li>Send a testimonial or feedback to <a href="mailto:hello@kamiljan.com" className="text-cyan-400 underline">hello@kamiljan.com</a>.</li>
        <li>Share your perspective on practical spirituality — what's missing, what could be better.</li>
        <li>Help grow the community — share your idea.</li>
        <li>Contribute creatively in a way that resonates with you.</li>
      </ul>

      <h2 className="mt-12 mb-6 text-2xl font-bold text-white">Financial contribution</h2>

      <div className="space-y-6 mt-6">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
          <div className="text-xs uppercase tracking-widest text-cyan-400/80 mb-3">Cards · Multi-Currency</div>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.revolut.me/kamil4b0" target="_blank" rel="noreferrer" className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white hover:bg-white/10">Revolut</a>
            <a href="https://paypal.me/kamiljanmsw?country.x=IS&locale.x=en_US" target="_blank" rel="noreferrer" className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white hover:bg-white/10">PayPal</a>
            <a href="https://wise.com/pay/me/kamiljanw4" target="_blank" rel="noreferrer" className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white hover:bg-white/10">Wise</a>
            <a href="https://buy.stripe.com/7sYfZhd575B3gcE1jw9IQ00" target="_blank" rel="noreferrer" className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white hover:bg-white/10">Stripe</a>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
          <div className="text-xs uppercase tracking-widest text-cyan-400/80 mb-3">Monthly · stability</div>
          <div className="flex flex-wrap gap-3">
            <a href="https://buymeacoffee.com/myspiritway" target="_blank" rel="noreferrer" className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white hover:bg-white/10">Buy Me a Coffee</a>
            <a href="https://ko-fi.com/myspiritway" target="_blank" rel="noreferrer" className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white hover:bg-white/10">Ko-Fi</a>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
          <div className="text-xs uppercase tracking-widest text-cyan-400/80 mb-3">Crypto</div>
          <p className="text-xs text-white/60 mb-2">BTC</p>
          <code className="block text-xs font-mono text-white/80 bg-black/40 p-3 rounded mb-3 break-all">bc1qmz0ydhuvlax9s8n6zgvxw5cvs5fucl0tt0jc23</code>
          <p className="text-xs text-white/60 mb-2">ETH (min. 0.1 ETH)</p>
          <code className="block text-xs font-mono text-white/80 bg-black/40 p-3 rounded break-all">0x1dA94A7bDd2aE4181Fb42c74C1E79d54CcEc8aD2</code>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
          <div className="text-xs uppercase tracking-widest text-cyan-400/80 mb-3">SWIFT Wire</div>
          <div className="text-sm text-white/80 space-y-1">
            <p>GBP, EUR, USD, CHF and more</p>
            <p>Kamil Włodarczyk</p>
            <p>IBAN: <code className="font-mono">LT79 3250 0272 4579 4080</code></p>
            <p>BIC/SWIFT: <code className="font-mono">REVOLT21</code></p>
            <p>Bank: Revolut Bank UAB · Konstitucijos ave. 21B, 08130, Vilnius, Lithuania</p>
            <p>Correspondent BIC: <code className="font-mono">CHASGB2L</code></p>
          </div>
        </div>
      </div>

      <p className="mt-12 text-white/75 leading-relaxed">Your support allows me to dedicate my time and energy to developing this project and helping others without needing to seek outside employment. The more this project grows, the more resources will be available — not just for its continued development but also for supporting other meaningful initiatives that can benefit the world.</p>
      <p className="mt-4 text-white/85 leading-relaxed font-semibold">Thank you for your kindness and generosity — it truly makes a difference.</p>
    </SpiritualityLayout>
  )
}
