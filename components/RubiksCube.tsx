'use client'

import { useEffect, useRef, useState } from 'react'

export default function RubiksCube() {
  const [isScrambling, setIsScrambling] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [rotation, setRotation] = useState({ x: 20, y: -30, z: 0 })
  const intervalRef = useRef<number | null>(null)
  const [stickers, setStickers] = useState<string[][]>(() => SOLVED())

  useEffect(() => {
    const onScroll = () => {
      const scrolled = (window.scrollY || 0)
      const shouldHide = scrolled > 400
      setHidden(shouldHide)
      if (shouldHide && intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
        setIsScrambling(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggle = () => {
    if (hidden) return
    if (!isScrambling) {
      // start scrambling: random rotations every 600ms
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      intervalRef.current = window.setInterval(() => {
        setRotation({
          x: Math.floor(Math.random() * 360) - 180,
          y: Math.floor(Math.random() * 360) - 180,
          z: Math.floor(Math.random() * 360) - 180,
        })
        setStickers(randomStickers())
      }, 600)
      setIsScrambling(true)
    } else {
      // stop and solve (return to angled showcase)
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsScrambling(false)
      setRotation({ x: 20, y: -30, z: 0 })
      setStickers(SOLVED())
    }
  }

  const size = 36 // px
  const half = size / 2

  return (
    <button
      type="button"
      aria-label="Rubik's cube"
      onClick={toggle}
      className={`relative h-10 w-10 rounded-md ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity`}
      title={isScrambling ? 'Solve' : 'Scramble'}
    >
      <div className="rc-persp" style={{ perspective: '800px', width: '100%', height: '100%' }}>
        <div
          className="rc-cube"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            margin: '2px auto',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
            transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {faces.map((face, faceIdx) => (
            <div
              key={face.name}
              className={`rc-face rc-${face.name}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: face.transform(half),
                background: 'rgba(0,0,0,0.25)',
              }}
            >
              <div className="rc-stickers">
                {stickers[faceIdx]?.map((color, i) => (
                  <div key={i} className="rc-sticker" style={{ background: color }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .rc-face { position: absolute; border-radius: 6px; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15); }
        .rc-stickers { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); gap: 1px; padding: 3px; height: 100%; }
        .rc-sticker { border-radius: 2px; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1); }
      `}</style>
    </button>
  )
}

const faces = [
  { name: 'front', transform: (d: number) => `translateZ(${d}px)` },
  { name: 'back', transform: (d: number) => `rotateY(180deg) translateZ(${d}px)` },
  { name: 'right', transform: (d: number) => `rotateY(90deg) translateZ(${d}px)` },
  { name: 'left', transform: (d: number) => `rotateY(-90deg) translateZ(${d}px)` },
  { name: 'top', transform: (d: number) => `rotateX(90deg) translateZ(${d}px)` },
  { name: 'bottom', transform: (d: number) => `rotateX(-90deg) translateZ(${d}px)` },
]

const FACE_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#eab308', '#8b5cf6']

function SOLVED(): string[][] {
  return FACE_COLORS.map((c) => Array.from({ length: 9 }, () => c))
}

function randomStickers(): string[][] {
  const pool = FACE_COLORS.flatMap((c) => Array.from({ length: 9 }, () => c))
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  const out: string[][] = []
  for (let f = 0; f < 6; f++) out.push(pool.slice(f * 9, f * 9 + 9))
  return out
}
