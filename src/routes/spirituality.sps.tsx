import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import MarkdownContent from '../components/MarkdownContent'
import part1 from '../content/spirituality/sps-part-1.md?raw'
import part2 from '../content/spirituality/sps-part-2.md?raw'

export const Route = createFileRoute('/spirituality/sps')({ component: SpsPage })

const sps = [part1, part2].join('\n\n')

function SpsPage() {
  return (
    <SpiritualityLayout eyebrow="The Complete Book" title="Simplified Practical Spirituality">
      <MarkdownContent source={sps} />
    </SpiritualityLayout>
  )
}
