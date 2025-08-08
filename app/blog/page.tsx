import Link from 'next/link'

const posts = [
  {
    slug: 'designing-for-attention-in-education',
    title: 'Designing for Attention in Education',
    excerpt:
      'How micro-interactions and progressive disclosure improve focus and outcomes across classrooms.',
  },
  {
    slug: 'routines-that-make-schools-run',
    title: 'Routines that Make Schools Run',
    excerpt:
      'Practical rituals for teachers and students: attendance pulses, quick-grades, and feedback loops.',
  },
]

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">FlyMinds Blog</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Insights on UX for schools, productivity, and culture.
      </p>
      <div className="space-y-6">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block card p-6">
            <h2 className="text-xl font-semibold mb-1">{p.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}


