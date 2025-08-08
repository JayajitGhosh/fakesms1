'use client'

import { useMemo } from 'react'

const items = [
  { title: 'Smart Grading', chip: '2x faster' },
  { title: 'Attendance Pulse', chip: '+12%' },
  { title: 'Focus Mode', chip: 'less noise' },
  { title: 'Instant Announcements', chip: 'zero delay' },
  { title: 'Class Planner', chip: 'drag & drop' },
  { title: 'Insights', chip: 'actionable' },
]

export default function FeaturesReel() {
  const data = useMemo(() => items, [])
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto snap-x snap-mandatory py-3">
      {data.map((it, i) => (
        <div
          key={i}
          className="snap-start shrink-0 w-56 card p-4 hover:scale-[1.02] transition-transform"
        >
          <div className="text-sm text-primary-600 mb-1">{it.chip}</div>
          <div className="font-semibold">{it.title}</div>
        </div>
      ))}
    </div>
  )
}
