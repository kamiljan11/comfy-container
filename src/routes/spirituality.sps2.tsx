import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import MarkdownContent from '../components/MarkdownContent'
import sps2 from '../content/spirituality/sps2.md?raw'

export const Route = createFileRoute('/spirituality/sps2')({ component: Sps2Page })

function Sps2Page() {
  return (
    <SpiritualityLayout eyebrow="Short Version" title="The Simplified Practical Spirituality²">
      <MarkdownContent source={sps2} />
    </SpiritualityLayout>
  )
}
