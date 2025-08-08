'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      const scrolled = Math.max(0, Math.min(1, (window.scrollY || 0) / (total || 1)))
      setProgress(scrolled)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-primary-600 transition-[width] duration-100 ease-out"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  )
}


