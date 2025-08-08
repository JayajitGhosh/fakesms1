'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Bell } from 'lucide-react'

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

export default function StudentAnnouncements() {
  const { data: session } = useSession()

  // Mock announcements data
  const announcements = [
    { id: 1, title: 'School Reopens', content: 'School will reopen on 10th Feb.' },
    { id: 2, title: 'Science Fair', content: 'Annual science fair on 15th Feb.' },
    { id: 3, title: 'Exam Schedule', content: 'Final exams from 1st March.' },
    { id: 4, title: 'Holiday Notice', content: 'School closed on 26th Jan for Republic Day.' },
  ]

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="STUDENT">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Announcements</h1>
            <p className="text-gray-600 dark:text-gray-300">Stay updated with the latest school announcements</p>
          </div>
        </div>
        <div className="space-y-4">
          {announcements.map(a => (
            <div key={a.id} className="card p-4 flex items-start space-x-3">
              <Bell className="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">{a.title}</div>
                <div className="text-gray-600 dark:text-gray-300">{a.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
