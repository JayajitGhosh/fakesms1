'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  Users, 
  BookOpen, 
  Calendar, 
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
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

export default function TeacherDashboard() {
  const { data: session } = useSession()

  // Mock data - in real app this would come from API
  const stats = [
    {
      name: 'Total Students',
      value: '156',
      icon: Users,
      color: 'primary',
      change: '+12 this semester',
    },
    {
      name: 'Classes Taught',
      value: '8',
      icon: BookOpen,
      color: 'success',
      change: '4 subjects',
    },
    {
      name: 'Average Grade',
      value: 'B+',
      icon: BarChart3,
      color: 'warning',
      change: '+0.3 from last term',
    },
    {
      name: 'Attendance Rate',
      value: '92%',
      icon: Calendar,
      color: 'secondary',
      change: '+5% this month',
    },
  ]

  const recentActivities = [
    { 
      type: 'grade', 
      subject: 'Mathematics', 
      action: 'Graded 25 assignments', 
      time: '2 hours ago',
      color: 'success'
    },
    { 
      type: 'attendance', 
      subject: 'Physics', 
      action: 'Marked attendance for Class 10A', 
      time: '4 hours ago',
      color: 'primary'
    },
    { 
      type: 'announcement', 
      subject: 'English', 
      action: 'Posted new assignment', 
      time: '1 day ago',
      color: 'warning'
    },
    { 
      type: 'grade', 
      subject: 'Chemistry', 
      action: 'Updated final grades', 
      time: '2 days ago',
      color: 'success'
    },
  ]

  const upcomingClasses = [
    { 
      subject: 'Mathematics', 
      class: '10A', 
      time: '09:00 AM', 
      duration: '45 min',
      students: 28
    },
    { 
      subject: 'Physics', 
      class: '11B', 
      time: '10:30 AM', 
      duration: '45 min',
      students: 25
    },
    { 
      subject: 'English', 
      class: '9C', 
      time: '02:00 PM', 
      duration: '45 min',
      students: 30
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'grade':
        return <BarChart3 className="h-4 w-4" />
      case 'attendance':
        return <CheckCircle className="h-4 w-4" />
      case 'announcement':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="TEACHER">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good morning, {session.user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Here's your teaching overview for today.
          </p>
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
          {/* Recent Activities */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <a href="/teacher/activities" className="text-sm text-primary-600 hover:text-primary-500">
                View all
              </a>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`bg-${activity.color}-100 p-2 rounded-lg`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.subject}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
              <a href="/teacher/schedule" className="text-sm text-primary-600 hover:text-primary-500">
                View schedule
              </a>
            </div>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      <BookOpen className="h-4 w-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{classItem.subject}</p>
                      <p className="text-sm text-gray-600">Class {classItem.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{classItem.time}</p>
                    <p className="text-xs text-gray-500">{classItem.duration} • {classItem.students} students</p>
                  </div>
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
              href="/teacher/attendance"
              className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <CheckCircle className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-primary-700">Take Attendance</span>
            </a>
            <a
              href="/teacher/grades"
              className="flex flex-col items-center p-4 bg-success-50 rounded-lg hover:bg-success-100 transition-colors"
            >
              <BarChart3 className="h-8 w-8 text-success-600 mb-2" />
              <span className="text-sm font-medium text-success-700">Record Grades</span>
            </a>
            <a
              href="/teacher/announcements"
              className="flex flex-col items-center p-4 bg-warning-50 rounded-lg hover:bg-warning-100 transition-colors"
            >
              <AlertCircle className="h-8 w-8 text-warning-600 mb-2" />
              <span className="text-sm font-medium text-warning-700">Post Announcement</span>
            </a>
            <a
              href="/teacher/classes"
              className="flex flex-col items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <Users className="h-8 w-8 text-secondary-600 mb-2" />
              <span className="text-sm font-medium text-secondary-700">Manage Classes</span>
            </a>
          </div>
        </div>

        {/* Teaching Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
              <span className="bg-danger-100 text-danger-800 text-xs font-medium px-2 py-1 rounded-full">
                5
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Grade assignments</span>
                <span className="text-danger-600 font-medium">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Update attendance</span>
                <span className="text-danger-600 font-medium">2</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Class Performance</h3>
              <span className="text-success-600 text-sm font-medium">+12%</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Average Grade</span>
                <span className="text-gray-900 font-medium">B+</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Attendance Rate</span>
                <span className="text-gray-900 font-medium">94%</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Add</h3>
              <Plus className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <button className="w-full text-left text-sm text-primary-600 hover:text-primary-500">
                + New Assignment
              </button>
              <button className="w-full text-left text-sm text-primary-600 hover:text-primary-500">
                + New Announcement
              </button>
              <button className="w-full text-left text-sm text-primary-600 hover:text-primary-500">
                + Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
