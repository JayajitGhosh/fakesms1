'use client'

import { useState } from 'react'

export default function FidgetSpinner() {
  const [clicks, setClicks] = useState(0)
  const speed = Math.min(2 + clicks * 0.2, 20)
  return (
    <button
      type="button"
      aria-label="Fidget spinner"
      onClick={() => setClicks((c) => c + 1)}
      className="relative h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 overflow-hidden"
      title="Spin me"
    >
      <div
        className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary-500"
        style={{ animation: `spin ${1 / speed}s linear infinite` as any }}
      />
      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </button>
  )
}
