'use client'

import { useEffect, useState } from 'react'

interface UserShape {
  id: string
  role: string
  isActive: boolean
}

export default function Paywall() {
  const [user, setUser] = useState<UserShape | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/user')
        if (!res.ok) return setLoading(false)
        const data = await res.json()
        setUser({ id: data.id, role: data.role, isActive: data.isActive })
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return null
  const locked = user && user.role === 'STUDENT' && !user.isActive
  if (!locked) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur">
      <div className="card p-6 max-w-md text-center">
        <h3 className="text-xl font-semibold mb-2">Access Pending Approval</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Your student account is awaiting payment/approval. Please contact administration for details.
        </p>
        <div className="text-sm text-gray-500">Certain areas are locked until approval is completed.</div>
      </div>
    </div>
  )
}
