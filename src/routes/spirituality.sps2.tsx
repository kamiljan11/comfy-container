import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import MarkdownContent from '../components/MarkdownContent'
import sps2 from '../content/spirituality/sps2.md?raw'

export const Route = createFileRoute('/spirituality/sps2')({
  head: () => ({
    meta: [
      { title: 'Simplified Practical Spirituality² — Short Version' },
      { name: 'description', content: 'The full book in 66 minutes. The essence without losing depth.' },
      { property: 'og:title', content: 'Simplified Practical Spirituality² — Short Version' },
      { property: 'og:description', content: 'The full book in 66 minutes. The essence without losing depth.' },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality/sps2' },
      { property: 'og:image', content: 'https://kamiljan.com/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality/sps2' },
    ],
  }),
  component: Sps2Page,
})

function Sps2Page() {
  return (
    <SpiritualityLayout eyebrow="Short Version" title="The Simplified Practical Spirituality²">
      <MarkdownContent source={sps2} />
    </SpiritualityLayout>
  )
}
