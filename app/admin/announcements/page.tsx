'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  Megaphone, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Filter, 
  Search
} from 'lucide-react'

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

export default function AdminAnnouncements() {
  const { data: session } = useSession()

  // Mock announcements data
  const announcements = [
    { id: 1, title: 'School Reopens', content: 'School will reopen on 10th Feb.', date: '2024-02-01', status: 'published' },
    { id: 2, title: 'Science Fair', content: 'Annual science fair on 15th Feb.', date: '2024-01-28', status: 'published' },
    { id: 3, title: 'Exam Schedule', content: 'Final exams from 1st March.', date: '2024-01-25', status: 'draft' },
    { id: 4, title: 'Holiday Notice', content: 'School closed on 26th Jan for Republic Day.', date: '2024-01-20', status: 'published' },
    { id: 5, title: 'New Library Books', content: 'New books added to the library.', date: '2024-01-18', status: 'draft' },
  ]

  const statuses = ['All', 'published', 'draft']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-success-600 bg-success-50'
      case 'draft':
        return 'text-warning-600 bg-warning-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Announcements</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage school-wide announcements</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <input className="input text-sm" placeholder="Search by title or content" />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select className="input text-sm">
                {statuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Announcements Table */}
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Announcements</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {announcements.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{a.title}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{a.content}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{a.date}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(a.status)}`}>
                        {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-500">
                          <Edit className="h-4 w-4" />
                        </button>
                        {a.status === 'draft' ? (
                          <button className="text-success-600 hover:text-success-500">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        ) : (
                          <button className="text-warning-600 hover:text-warning-500">
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
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
