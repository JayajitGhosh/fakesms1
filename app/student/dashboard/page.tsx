'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bell
} from 'lucide-react'
import { Dialog } from '@headlessui/react'
import { useState } from 'react'

export default function StudentDashboard() {
  const { data: session } = useSession()
  const [notifOpen, setNotifOpen] = useState(false)

  // Mock data - in real app this would come from API
  const stats = [
    {
      name: 'Total Classes',
      value: '6',
      icon: BookOpen,
      color: 'primary',
      change: '+2 from last semester',
    },
    {
      name: 'Attendance Rate',
      value: '94%',
      icon: Calendar,
      color: 'success',
      change: '+3% from last month',
    },
    {
      name: 'Average Grade',
      value: 'A-',
      icon: TrendingUp,
      color: 'warning',
      change: '+0.2 from last term',
    },
    {
      name: 'Hours Studied',
      value: '24h',
      icon: Clock,
      color: 'secondary',
      change: 'This week',
    },
  ]

  const recentGrades = [
    { subject: 'Mathematics', grade: 92, type: 'Midterm', date: '2024-01-15' },
    { subject: 'English Literature', grade: 88, type: 'Essay', date: '2024-01-12' },
    { subject: 'Physics', grade: 95, type: 'Lab Report', date: '2024-01-10' },
    { subject: 'History', grade: 85, type: 'Quiz', date: '2024-01-08' },
  ]

  const attendanceData = [
    { date: '2024-01-15', status: 'present', subject: 'Mathematics' },
    { date: '2024-01-15', status: 'present', subject: 'English' },
    { date: '2024-01-14', status: 'absent', subject: 'Physics' },
    { date: '2024-01-14', status: 'present', subject: 'History' },
    { date: '2024-01-13', status: 'late', subject: 'Mathematics' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-success-600" />
      case 'absent':
        return <XCircle className="h-4 w-4 text-danger-600" />
      case 'late':
        return <AlertCircle className="h-4 w-4 text-warning-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-success-600 bg-success-50'
      case 'absent':
        return 'text-danger-600 bg-danger-50'
      case 'late':
        return 'text-warning-600 bg-warning-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  // Mock notifications
  const notifications = [
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {session.user?.firstName}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Here's what's happening with your academic progress today.
            </p>
          </div>
          <button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative" onClick={() => setNotifOpen(true)}>
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full px-1.5 py-0.5">{notifications.length}</span>
          </button>
          <Dialog open={notifOpen} onClose={() => setNotifOpen(false)} className="fixed z-[100] inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <Dialog.Overlay className="fixed inset-0 bg-black/30" />
              <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full mx-auto p-6 z-10">
                <Dialog.Title className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary-600" /> Announcements
                </Dialog.Title>
                <div className="space-y-2 mb-4">
                  {notifications.map(n => (
                    <div key={n.id} className="p-2 rounded bg-primary-50 dark:bg-primary-900/20">
                      <div className="font-medium text-gray-900 dark:text-white">{n.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{n.content}</div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-outline w-full" onClick={() => setNotifOpen(false)}>Close</button>
              </div>
            </div>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="card p-6">
                <div className="flex items-center">
                  <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Grades */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Grades</h2>
              <a href="/student/grades" className="text-sm text-primary-600 hover:text-primary-500">
                View all
              </a>
            </div>
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{grade.subject}</p>
                    <p className="text-sm text-gray-600">{grade.type} • {grade.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{grade.grade}%</p>
                    <p className="text-xs text-gray-500">
                      {grade.grade >= 90 ? 'A' : grade.grade >= 80 ? 'B' : grade.grade >= 70 ? 'C' : 'D'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Attendance</h2>
              <a href="/student/attendance" className="text-sm text-primary-600 hover:text-primary-500">
                View all
              </a>
            </div>
            <div className="space-y-3">
              {attendanceData.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-medium text-gray-900">{record.subject}</p>
                      <p className="text-sm text-gray-600">{record.date}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/student/schedule"
              className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Calendar className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-primary-700">View Schedule</span>
            </a>
            <a
              href="/student/grades"
              className="flex flex-col items-center p-4 bg-success-50 rounded-lg hover:bg-success-100 transition-colors"
            >
              <BookOpen className="h-8 w-8 text-success-600 mb-2" />
              <span className="text-sm font-medium text-success-700">Check Grades</span>
            </a>
            <a
              href="/student/attendance"
              className="flex flex-col items-center p-4 bg-warning-50 rounded-lg hover:bg-warning-100 transition-colors"
            >
              <CheckCircle className="h-8 w-8 text-warning-600 mb-2" />
              <span className="text-sm font-medium text-warning-700">Attendance</span>
            </a>
            <a
              href="/student/announcements"
              className="flex flex-col items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <AlertCircle className="h-8 w-8 text-secondary-600 mb-2" />
              <span className="text-sm font-medium text-secondary-700">Announcements</span>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
