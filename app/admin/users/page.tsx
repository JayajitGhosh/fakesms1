'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  User, 
  UserPlus, 
  UserMinus, 
  UserCheck, 
  UserX, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle
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

export default function AdminUsers() {
  const { data: session } = useSession()

  // Mock users data
  const users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@demo.com', role: 'STUDENT', status: 'active', created: '2024-01-01' },
    { id: '2', name: 'Bob Smith', email: 'bob@demo.com', role: 'TEACHER', status: 'active', created: '2024-01-02' },
    { id: '3', name: 'Carol Davis', email: 'carol@demo.com', role: 'STUDENT', status: 'pending', created: '2024-01-03' },
    { id: '4', name: 'David Wilson', email: 'david@demo.com', role: 'ADMIN', status: 'active', created: '2024-01-04' },
    { id: '5', name: 'Emma Brown', email: 'emma@demo.com', role: 'STUDENT', status: 'inactive', created: '2024-01-05' },
    { id: '6', name: 'Frank Miller', email: 'frank@demo.com', role: 'TEACHER', status: 'active', created: '2024-01-06' },
    { id: '7', name: 'Grace Lee', email: 'grace@demo.com', role: 'STUDENT', status: 'pending', created: '2024-01-07' },
    { id: '8', name: 'Henry Clark', email: 'henry@demo.com', role: 'STUDENT', status: 'active', created: '2024-01-08' },
    { id: '9', name: 'Ivy Turner', email: 'ivy@demo.com', role: 'TEACHER', status: 'inactive', created: '2024-01-09' },
    { id: '10', name: 'Jack White', email: 'jack@demo.com', role: 'ADMIN', status: 'active', created: '2024-01-10' },
  ]

  const roles = ['All', 'STUDENT', 'TEACHER', 'ADMIN']
  const statuses = ['All', 'active', 'pending', 'inactive']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success-600 bg-success-50'
      case 'pending':
        return 'text-warning-600 bg-warning-50'
      case 'inactive':
        return 'text-danger-600 bg-danger-50'
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage all users, roles, and access</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-primary">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <input className="input text-sm" placeholder="Search by name or email" />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select className="input text-sm">
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <select className="input text-sm">
                {statuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-primary-600" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">{user.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{user.created}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-500">
                          <Edit className="h-4 w-4" />
                        </button>
                        {user.status !== 'active' && (
                          <button className="text-success-600 hover:text-success-500">
                            <UserCheck className="h-4 w-4" />
                          </button>
                        )}
                        {user.status === 'active' && (
                          <button className="text-warning-600 hover:text-warning-500">
                            <UserMinus className="h-4 w-4" />
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
