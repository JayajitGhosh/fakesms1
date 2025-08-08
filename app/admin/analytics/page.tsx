'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { BarChart3, PieChart, TrendingUp, Users, BookOpen } from 'lucide-react'

// Extend NextAuth session type
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      firstName?: string
      lastName?: string
      role?: string
    }
  }
}

export default function AdminAnalytics() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="ADMIN">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-300">System analytics and key metrics</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="flex justify-center mb-2"><Users className="h-6 w-6 text-primary-600" /></div>
            <div className="text-2xl font-bold text-primary-600">1200</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="card p-4 text-center">
            <div className="flex justify-center mb-2"><BookOpen className="h-6 w-6 text-success-600" /></div>
            <div className="text-2xl font-bold text-success-600">900</div>
            <div className="text-sm text-gray-600">Active Students</div>
          </div>
          <div className="card p-4 text-center">
            <div className="flex justify-center mb-2"><TrendingUp className="h-6 w-6 text-warning-600" /></div>
            <div className="text-2xl font-bold text-warning-600">80</div>
            <div className="text-sm text-gray-600">Active Teachers</div>
          </div>
          <div className="card p-4 text-center">
            <div className="flex justify-center mb-2"><PieChart className="h-6 w-6 text-secondary-600" /></div>
            <div className="text-2xl font-bold text-secondary-600">45</div>
            <div className="text-sm text-gray-600">Classes</div>
          </div>
        </div>
        <div className="card p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Charts (Coming Soon)</h2>
          <div className="flex justify-center items-center h-40 text-gray-400">[Placeholder for analytics charts]</div>
        </div>
      </div>
    </DashboardLayout>
  )
}
