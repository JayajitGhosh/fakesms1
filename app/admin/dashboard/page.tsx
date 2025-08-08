'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus
} from 'lucide-react'

export default function AdminDashboard() {
  const { data: session } = useSession()

  // Mock data - in real app this would come from API
  const stats = [
    {
      name: 'Total Students',
      value: '1,247',
      icon: Users,
      color: 'primary',
      change: '+23 this month',
      trend: 'up',
    },
    {
      name: 'Total Teachers',
      value: '89',
      icon: Shield,
      color: 'success',
      change: '+5 this month',
      trend: 'up',
    },
    {
      name: 'Active Classes',
      value: '156',
      icon: BookOpen,
      color: 'warning',
      change: '+12 this semester',
      trend: 'up',
    },
    {
      name: 'System Health',
      value: '98%',
      icon: BarChart3,
      color: 'secondary',
      change: 'All systems operational',
      trend: 'stable',
    },
  ]

  const recentActivities = [
    { 
      type: 'user', 
      action: 'New student registration', 
      details: 'John Doe - Grade 10A',
      time: '2 minutes ago',
      status: 'success'
    },
    { 
      type: 'grade', 
      action: 'Grade report generated', 
      details: 'Midterm grades for all classes',
      time: '15 minutes ago',
      status: 'success'
    },
    { 
      type: 'system', 
      action: 'System backup completed', 
      details: 'Daily backup successful',
      time: '1 hour ago',
      status: 'success'
    },
    { 
      type: 'alert', 
      action: 'Low attendance alert', 
      details: 'Class 9B attendance below 80%',
      time: '2 hours ago',
      status: 'warning'
    },
  ]

  const systemMetrics = [
    { name: 'Database Performance', value: '98%', color: 'success' },
    { name: 'Server Uptime', value: '99.9%', color: 'success' },
    { name: 'Storage Usage', value: '67%', color: 'warning' },
    { name: 'Active Sessions', value: '234', color: 'primary' },
  ]

  const pendingApprovals = [
    { type: 'Teacher Registration', count: 3, priority: 'high' },
    { type: 'Class Schedule Changes', count: 7, priority: 'medium' },
    { type: 'Grade Appeals', count: 2, priority: 'high' },
    { type: 'System Access Requests', count: 5, priority: 'low' },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="h-4 w-4" />
      case 'grade':
        return <BarChart3 className="h-4 w-4" />
      case 'system':
        return <Shield className="h-4 w-4" />
      case 'alert':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-success-600 bg-success-50'
      case 'warning':
        return 'text-warning-600 bg-warning-50'
      case 'error':
        return 'text-danger-600 bg-danger-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-danger-600'
      case 'medium':
        return 'text-warning-600'
      case 'low':
        return 'text-success-600'
      default:
        return 'text-gray-600'
    }
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            System Overview
          </h1>
          <p className="text-gray-600">
            Welcome back, {session.user?.firstName}. Here's your administrative dashboard.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                      <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center text-sm ${
                      stat.trend === 'up' ? 'text-success-600' : 
                      stat.trend === 'down' ? 'text-danger-600' : 'text-gray-600'
                    }`}>
                      <TrendingUp className={`h-4 w-4 mr-1 ${
                        stat.trend === 'down' ? 'rotate-180' : ''
                      }`} />
                      {stat.change}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <a href="/admin/activities" className="text-sm text-primary-600 hover:text-primary-500">
                View all
              </a>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`bg-${activity.status === 'success' ? 'success' : 'warning'}-100 p-2 rounded-lg`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Metrics */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">System Metrics</h2>
              <a href="/admin/system" className="text-sm text-primary-600 hover:text-primary-500">
                View details
              </a>
            </div>
            <div className="space-y-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{metric.name}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold text-${metric.color}-600`}>{metric.value}</p>
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
              href="/admin/users"
              className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Users className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-primary-700">Manage Users</span>
            </a>
            <a
              href="/admin/classes"
              className="flex flex-col items-center p-4 bg-success-50 rounded-lg hover:bg-success-100 transition-colors"
            >
              <BookOpen className="h-8 w-8 text-success-600 mb-2" />
              <span className="text-sm font-medium text-success-700">Manage Classes</span>
            </a>
            <a
              href="/admin/analytics"
              className="flex flex-col items-center p-4 bg-warning-50 rounded-lg hover:bg-warning-100 transition-colors"
            >
              <BarChart3 className="h-8 w-8 text-warning-600 mb-2" />
              <span className="text-sm font-medium text-warning-700">View Analytics</span>
            </a>
            <a
              href="/admin/settings"
              className="flex flex-col items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <Shield className="h-8 w-8 text-secondary-600 mb-2" />
              <span className="text-sm font-medium text-secondary-700">System Settings</span>
            </a>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
              <span className="bg-danger-100 text-danger-800 text-xs font-medium px-2 py-1 rounded-full">
                17
              </span>
            </div>
            <div className="space-y-3">
              {pendingApprovals.map((approval, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{approval.type}</p>
                    <p className="text-sm text-gray-600">{approval.count} pending</p>
                  </div>
                  <span className={`text-sm font-medium ${getPriorityColor(approval.priority)}`}>
                    {approval.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
              <span className="bg-warning-100 text-warning-800 text-xs font-medium px-2 py-1 rounded-full">
                3
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-warning-50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-warning-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Storage space running low</p>
                  <p className="text-xs text-gray-600">67% used - consider cleanup</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-success-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Backup completed successfully</p>
                  <p className="text-xs text-gray-600">Daily backup at 2:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                <Clock className="h-4 w-4 text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">System maintenance scheduled</p>
                  <p className="text-xs text-gray-600">Sunday 3:00 AM - 5:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Add Section */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Add</h3>
            <Plus className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-sm font-medium text-gray-900">+ New User</p>
              <p className="text-xs text-gray-600">Add student or teacher</p>
            </button>
            <button className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-sm font-medium text-gray-900">+ New Class</p>
              <p className="text-xs text-gray-600">Create class schedule</p>
            </button>
            <button className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-sm font-medium text-gray-900">+ System Notice</p>
              <p className="text-xs text-gray-600">Post announcement</p>
            </button>
            <button className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-sm font-medium text-gray-900">+ Generate Report</p>
              <p className="text-xs text-gray-600">Create system report</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
