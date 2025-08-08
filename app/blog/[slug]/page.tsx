import ScrollProgressBar from '@/components/blog/ScrollProgressBar'
import { notFound } from 'next/navigation'

const content: Record<string, { title: string; body: string }[]> = {
  'designing-for-attention-in-education': [
    {
      title: 'Design for attention',
      body:
        'Micro-interactions, progressive disclosure, and timely feedback create momentum and reduce cognitive load. Keep context visible, actions clear, and noise low.',
    },
    {
      title: 'Delight without distraction',
      body:
        'Motion should support understanding. Favor small, meaningful transitions and reassurance states over flashy animations.',
    },
  ],
  'routines-that-make-schools-run': [
    {
      title: 'Attendance pulses',
      body:
        'Fast, reliable pulses help teachers spend less time logging and more time teaching. Habits beat heroics.',
    },
    {
      title: 'Quick grades & feedback',
      body:
        'Short cycles matter. Turnaround drives motivation. Simple tools, repeatable flows, and visibility across roles.',
    },
  ],
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blocks = content[params.slug]
  if (!blocks) return notFound()
  const title = blocks[0]?.title ?? 'Blog'
  return (
    <div>
      <ScrollProgressBar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 capitalize">{params.slug.replace(/-/g, ' ')}</h1>
        <article className="prose dark:prose-invert max-w-none">
          {blocks.map((b, i) => (
            <section key={i}>
              <h2>{b.title}</h2>
              <p>{b.body}</p>
            </section>
          ))}
        </article>
      </div>
    </div>
  )
}


