'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  Download,
  Filter
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

export default function StudentAttendance() {
  const { data: session } = useSession()

  // Mock attendance data
  const attendance = [
    { date: '2024-01-15', subject: 'Mathematics', status: 'present', time: '09:00 AM', teacher: 'Dr. Smith' },
    { date: '2024-01-15', subject: 'English Literature', status: 'present', time: '10:30 AM', teacher: 'Ms. Johnson' },
    { date: '2024-01-14', subject: 'Physics', status: 'absent', time: '02:00 PM', teacher: 'Dr. Brown' },
    { date: '2024-01-14', subject: 'History', status: 'present', time: '03:30 PM', teacher: 'Mr. Davis' },
    { date: '2024-01-13', subject: 'Chemistry', status: 'late', time: '09:00 AM', teacher: 'Dr. Wilson' },
    { date: '2024-01-13', subject: 'Computer Science', status: 'present', time: '10:30 AM', teacher: 'Ms. Garcia' },
    { date: '2024-01-12', subject: 'Mathematics', status: 'present', time: '09:00 AM', teacher: 'Dr. Smith' },
    { date: '2024-01-12', subject: 'English Literature', status: 'present', time: '10:30 AM', teacher: 'Ms. Johnson' },
    { date: '2024-01-11', subject: 'Physics', status: 'present', time: '02:00 PM', teacher: 'Dr. Brown' },
    { date: '2024-01-11', subject: 'History', status: 'present', time: '03:30 PM', teacher: 'Mr. Davis' },
  ]

  const subjects = ['All Subjects', 'Mathematics', 'English Literature', 'Physics', 'History', 'Chemistry', 'Computer Science']
  const statuses = ['All Status', 'Present', 'Absent', 'Late']

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-success-600" />
      case 'absent':
        return <XCircle className="h-4 w-4 text-danger-600" />
      case 'late':
        return <Clock className="h-4 w-4 text-warning-600" />
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

  const calculateStats = () => {
    const total = attendance.length
    const present = attendance.filter(a => a.status === 'present').length
    const absent = attendance.filter(a => a.status === 'absent').length
    const late = attendance.filter(a => a.status === 'late').length
    const rate = ((present + late) / total * 100).toFixed(1)
    
    return { total, present, absent, late, rate }
  }

  const stats = calculateStats()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="STUDENT">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Attendance</h1>
            <p className="text-gray-600 dark:text-gray-300">Track your class attendance and punctuality</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="btn btn-primary">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select className="input text-sm">
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <select className="input text-sm">
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-success-600">{stats.rate}%</div>
            <div className="text-sm text-gray-600">Attendance Rate</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.present}</div>
            <div className="text-sm text-gray-600">Present</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-danger-600">{stats.absent}</div>
            <div className="text-sm text-gray-600">Absent</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-warning-600">{stats.late}</div>
            <div className="text-sm text-gray-600">Late</div>
          </div>
        </div>

        {/* Attendance Calendar View */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">This Week's Attendance</h2>
          <div className="grid grid-cols-5 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{day}</div>
                <div className="space-y-1">
                  {attendance.filter(a => {
                    const date = new Date(a.date)
                    return date.getDay() === (index + 1)
                  }).map((record, recordIndex) => (
                    <div key={recordIndex} className={`p-1 rounded text-xs ${getStatusColor(record.status)}`}>
                      {record.subject}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Table */}
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Attendance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Teacher</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {attendance.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{record.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{record.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{record.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(record.status)}
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{record.teacher}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject-wise Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject-wise Attendance</h3>
            <div className="space-y-4">
              {Array.from(new Set(attendance.map(a => a.subject))).map(subject => {
                const subjectAttendance = attendance.filter(a => a.subject === subject)
                const total = subjectAttendance.length
                const present = subjectAttendance.filter(a => a.status === 'present').length
                const rate = ((present / total) * 100).toFixed(1)
                
                return (
                  <div key={subject} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{subject}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${rate >= 90 ? 'bg-success-600' : rate >= 80 ? 'bg-primary-600' : rate >= 70 ? 'bg-warning-600' : 'bg-danger-600'}`}
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{rate}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Attendance Trends</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">This Week</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-success-600 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Last Week</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">This Month</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-warning-600 h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
