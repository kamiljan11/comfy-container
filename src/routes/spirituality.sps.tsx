import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import MarkdownContent from '../components/MarkdownContent'
import part1 from '../content/spirituality/sps-part-1.md?raw'
import part2 from '../content/spirituality/sps-part-2.md?raw'
import part3 from '../content/spirituality/sps-part-3.md?raw'
import part4 from '../content/spirituality/sps-part-4.md?raw'
import part5 from '../content/spirituality/sps-part-5.md?raw'
import part6 from '../content/spirituality/sps-part-6.md?raw'

export const Route = createFileRoute('/spirituality/sps')({ component: SpsPage })

const sps = [part1, part2, part3, part4, part5, part6].join('\n\n')

function SpsPage() {
  return (
    <SpiritualityLayout eyebrow="The Complete Book" title="Simplified Practical Spirituality">
      <MarkdownContent source={sps} />
    </SpiritualityLayout>
  )
}
