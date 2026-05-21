import { createFileRoute } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import NewsletterSignup from '../components/NewsletterSignup'

export const Route = createFileRoute('/spirituality/blog')({ component: BlogPage })

interface BlogPost {
  slug: string
  title: string
  summary: string
  originalUrl: string
  publishedAt?: string
}

const POSTS: BlogPost[] = [
  {
    slug: 'modular-yoga-asana-for-daily-practice',
    title: 'Modular Yoga Asana for Daily Practice',
    summary: 'A flexible yoga sequence you can extend or compress depending on your day — designed to slot cleanly into the Eight Limbs morning practice.',
    originalUrl: 'https://www.myspiritway.org/blog/modular-yoga-asana-for-daily-practice',
  },
  // Add more posts here as they get migrated.
]

function BlogPage() {
  return (
    <SpiritualityLayout eyebrow="Blog" title="Notes on the practice">
      <p className="text-lg text-white/85 leading-relaxed mb-10">Practical reflections + tools for the path. Short reads, real applications.</p>

      <div className="space-y-4">
        {POSTS.map((p) => (
          <a
            key={p.slug}
            href={p.originalUrl}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all"
          >
            <h2 className="text-lg font-semibold text-white mb-2">{p.title}</h2>
            <p className="text-sm text-white/65 leading-relaxed">{p.summary}</p>
            <div className="mt-3 text-xs text-cyan-400/80">Read →</div>
          </a>
        ))}
      </div>

      <p className="mt-10 text-sm text-white/40 italic">Posts are being migrated from myspiritway.org/blog. Subscribe to get new entries as they go live here:</p>

      <div className="mt-6">
        <NewsletterSignup
          source="blog-page"
          tag="blog-reader"
          heading="New posts → your inbox"
          subheading="One short, practical note when there's something worth sharing."
          buttonLabel="Subscribe"
        />
      </div>
    </SpiritualityLayout>
  )
}
