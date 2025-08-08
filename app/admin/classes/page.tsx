'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { BookOpen, Plus, Edit, Trash2, Users } from 'lucide-react'

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

export default function AdminClasses() {
  const { data: session } = useSession()

  // Mock classes data
  const classes = [
    { id: 1, name: '10A', subject: 'Mathematics', teacher: 'Dr. Smith', students: 28 },
    { id: 2, name: '11B', subject: 'Physics', teacher: 'Ms. Johnson', students: 25 },
    { id: 3, name: '9C', subject: 'English', teacher: 'Mr. Brown', students: 30 },
    { id: 4, name: '12A', subject: 'Chemistry', teacher: 'Dr. Wilson', students: 22 },
  ]

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="ADMIN">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Class Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage all classes, assign teachers, and view rosters</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </button>
          </div>
        </div>
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Classes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Teacher</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {classes.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{c.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{c.subject}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{c.teacher}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-primary-600 dark:text-primary-300 font-semibold flex items-center"><Users className="h-4 w-4 mr-1" />{c.students}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-500">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-danger-600 hover:text-danger-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
