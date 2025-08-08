'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Info,
  Clock,
  Filter,
  Trash2,
  Check
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

export default function StudentNotifications() {
  const { data: session } = useSession()

  // Mock notifications data
  const notifications = [
    { 
      id: 1, 
      type: 'grade', 
      title: 'New grade posted', 
      message: 'Your Mathematics midterm grade has been posted. You scored 92%.', 
      time: '2 hours ago', 
      read: false, 
      priority: 'high',
      subject: 'Mathematics'
    },
    { 
      id: 2, 
      type: 'assignment', 
      title: 'New assignment due', 
      message: 'Physics lab report is due tomorrow. Please submit through the portal.', 
      time: '4 hours ago', 
      read: false, 
      priority: 'medium',
      subject: 'Physics'
    },
    { 
      id: 3, 
      type: 'announcement', 
      title: 'School event reminder', 
      message: 'Annual science fair is scheduled for next Friday. All students are encouraged to participate.', 
      time: '1 day ago', 
      read: true, 
      priority: 'low',
      subject: 'General'
    },
    { 
      id: 4, 
      type: 'attendance', 
      title: 'Attendance update', 
      message: 'Your attendance for this week has been updated. You have 95% attendance rate.', 
      time: '2 days ago', 
      read: true, 
      priority: 'medium',
      subject: 'General'
    },
    { 
      id: 5, 
      type: 'grade', 
      title: 'Grade updated', 
      message: 'Your English Literature essay grade has been updated to 88%.', 
      time: '3 days ago', 
      read: true, 
      priority: 'high',
      subject: 'English Literature'
    },
    { 
      id: 6, 
      type: 'assignment', 
      title: 'Assignment deadline extended', 
      message: 'The Computer Science project deadline has been extended by 2 days.', 
      time: '4 days ago', 
      read: true, 
      priority: 'medium',
      subject: 'Computer Science'
    },
  ]

  const notificationTypes = ['All', 'Grade', 'Assignment', 'Announcement', 'Attendance']
  const priorities = ['All', 'High', 'Medium', 'Low']

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'grade':
        return <CheckCircle className="h-4 w-4 text-success-600" />
      case 'assignment':
        return <AlertCircle className="h-4 w-4 text-warning-600" />
      case 'announcement':
        return <Info className="h-4 w-4 text-primary-600" />
      case 'attendance':
        return <Clock className="h-4 w-4 text-secondary-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-danger-600 bg-danger-50'
      case 'medium':
        return 'text-warning-600 bg-warning-50'
      case 'low':
        return 'text-success-600 bg-success-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="STUDENT">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-300">Stay updated with your academic activities</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-outline">
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </button>
            <button className="btn btn-outline">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </button>
          </div>
        </div>

        {/* Notification Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">{notifications.length}</div>
            <div className="text-sm text-gray-600">Total Notifications</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-warning-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-success-600">{notifications.filter(n => n.type === 'grade').length}</div>
            <div className="text-sm text-gray-600">Grade Updates</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-danger-600">{notifications.filter(n => n.priority === 'high').length}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select className="input text-sm">
                {notificationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <select className="input text-sm">
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`card p-4 transition-all ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Subject: {notification.subject}
                    </span>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <button className="text-xs text-blue-600 hover:text-blue-500">
                          Mark as read
                        </button>
                      )}
                      <button className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Types</h3>
            <div className="space-y-3">
              {Array.from(new Set(notifications.map(n => n.type))).map(type => {
                const count = notifications.filter(n => n.type === type).length
                return (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(count / notifications.length) * 100}%` }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Priority Distribution</h3>
            <div className="space-y-3">
              {Array.from(new Set(notifications.map(n => n.priority))).map(priority => {
                const count = notifications.filter(n => n.priority === priority).length
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{priority}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className={`h-2 rounded-full ${getPriorityColor(priority).split(' ')[0].replace('text-', 'bg-')}`} style={{ width: `${(count / notifications.length) * 100}%` }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
              <CheckCircle className="h-6 w-6 text-primary-600 mb-2" />
              <span className="text-xs font-medium text-primary-700 dark:text-primary-300">Mark All Read</span>
            </button>
            <button className="flex flex-col items-center p-3 bg-success-50 dark:bg-success-900/20 rounded-lg hover:bg-success-100 dark:hover:bg-success-900/30 transition-colors">
              <Filter className="h-6 w-6 text-success-600 mb-2" />
              <span className="text-xs font-medium text-success-700 dark:text-success-300">Filter</span>
            </button>
            <button className="flex flex-col items-center p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg hover:bg-warning-100 dark:hover:bg-warning-900/30 transition-colors">
              <Bell className="h-6 w-6 text-warning-600 mb-2" />
              <span className="text-xs font-medium text-warning-700 dark:text-warning-300">Settings</span>
            </button>
            <button className="flex flex-col items-center p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg hover:bg-danger-100 dark:hover:bg-danger-900/30 transition-colors">
              <Trash2 className="h-6 w-6 text-danger-600 mb-2" />
              <span className="text-xs font-medium text-danger-700 dark:text-danger-300">Clear All</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
