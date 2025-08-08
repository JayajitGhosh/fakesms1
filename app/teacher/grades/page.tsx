'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  BookOpen, 
  TrendingUp, 
  Plus,
  Filter,
  Download,
  Edit,
  Save,
  X
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

export default function TeacherGrades() {
  const { data: session } = useSession()

  // Mock grades data
  const grades = [
    { 
      id: 1, 
      studentName: 'Alice Johnson', 
      studentId: 'STU001', 
      subject: 'Mathematics', 
      assignment: 'Midterm Exam', 
      grade: 92, 
      maxGrade: 100, 
      date: '2024-01-15',
      comments: 'Excellent work on calculus problems',
      status: 'graded'
    },
    { 
      id: 2, 
      studentName: 'Bob Smith', 
      studentId: 'STU002', 
      subject: 'Mathematics', 
      assignment: 'Midterm Exam', 
      grade: 85, 
      maxGrade: 100, 
      date: '2024-01-15',
      comments: 'Good understanding, minor calculation errors',
      status: 'graded'
    },
    { 
      id: 3, 
      studentName: 'Carol Davis', 
      studentId: 'STU003', 
      subject: 'Mathematics', 
      assignment: 'Midterm Exam', 
      grade: 78, 
      maxGrade: 100, 
      date: '2024-01-15',
      comments: 'Needs improvement in problem-solving',
      status: 'graded'
    },
    { 
      id: 4, 
      studentName: 'David Wilson', 
      studentId: 'STU004', 
      subject: 'Mathematics', 
      assignment: 'Homework 3', 
      grade: 0, 
      maxGrade: 20, 
      date: '2024-01-20',
      comments: '',
      status: 'pending'
    },
    { 
      id: 5, 
      studentName: 'Emma Brown', 
      studentId: 'STU005', 
      subject: 'Mathematics', 
      assignment: 'Homework 3', 
      grade: 0, 
      maxGrade: 20, 
      date: '2024-01-20',
      comments: '',
      status: 'pending'
    },
  ]

  const subjects = ['All Subjects', 'Mathematics', 'Physics', 'Chemistry', 'English']
  const assignments = ['All Assignments', 'Midterm Exam', 'Final Exam', 'Homework 1', 'Homework 2', 'Homework 3']
  const statuses = ['All Status', 'Graded', 'Pending', 'Late']

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100
    if (percentage >= 90) return 'text-success-600 bg-success-50'
    if (percentage >= 80) return 'text-primary-600 bg-primary-50'
    if (percentage >= 70) return 'text-warning-600 bg-warning-50'
    return 'text-danger-600 bg-danger-50'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graded':
        return 'text-success-600 bg-success-50'
      case 'pending':
        return 'text-warning-600 bg-warning-50'
      case 'late':
        return 'text-danger-600 bg-danger-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const calculateStats = () => {
    const total = grades.length
    const graded = grades.filter(g => g.status === 'graded').length
    const pending = grades.filter(g => g.status === 'pending').length
    const average = grades.filter(g => g.status === 'graded').reduce((acc, g) => acc + (g.grade / g.maxGrade * 100), 0) / graded || 0
    
    return { total, graded, pending, average: average.toFixed(1) }
  }

  const stats = calculateStats()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="TEACHER">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Grade Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Record and manage student grades</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="btn btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Grade
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
                {assignments.map(assignment => (
                  <option key={assignment} value={assignment}>{assignment}</option>
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

        {/* Grade Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Submissions</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-success-600">{stats.graded}</div>
            <div className="text-sm text-gray-600">Graded</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-warning-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-secondary-600">{stats.average}%</div>
            <div className="text-sm text-gray-600">Average Grade</div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Student Grades</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {grades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{grade.studentName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{grade.studentId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{grade.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{grade.assignment}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {grade.status === 'graded' ? (
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(grade.grade, grade.maxGrade)}`}>
                          {grade.grade}/{grade.maxGrade}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-400">-</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{grade.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(grade.status)}`}>
                        {grade.status.charAt(0).toUpperCase() + grade.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-500">
                          <Edit className="h-4 w-4" />
                        </button>
                        {grade.status === 'pending' && (
                          <button className="text-success-600 hover:text-success-500">
                            <Save className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Grade Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">A (90-100%)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-success-600 h-2 rounded-full" style={{ width: '33%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">1</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">B (80-89%)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '33%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">1</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">C (70-79%)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-warning-600 h-2 rounded-full" style={{ width: '33%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assignment Overview</h3>
            <div className="space-y-3">
              {Array.from(new Set(grades.map(g => g.assignment))).map(assignment => {
                const assignmentGrades = grades.filter(g => g.assignment === assignment)
                const graded = assignmentGrades.filter(g => g.status === 'graded')
                const average = graded.length > 0 ? graded.reduce((acc, g) => acc + (g.grade / g.maxGrade * 100), 0) / graded.length : 0
                
                return (
                  <div key={assignment} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{assignment}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${average}%` }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{average.toFixed(1)}%</span>
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
              <Plus className="h-6 w-6 text-primary-600 mb-2" />
              <span className="text-xs font-medium text-primary-700 dark:text-primary-300">Add Grade</span>
            </button>
            <button className="flex flex-col items-center p-3 bg-success-50 dark:bg-success-900/20 rounded-lg hover:bg-success-100 dark:hover:bg-success-900/30 transition-colors">
              <Download className="h-6 w-6 text-success-600 mb-2" />
              <span className="text-xs font-medium text-success-700 dark:text-success-300">Export</span>
            </button>
            <button className="flex flex-col items-center p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg hover:bg-warning-100 dark:hover:bg-warning-900/30 transition-colors">
              <TrendingUp className="h-6 w-6 text-warning-600 mb-2" />
              <span className="text-xs font-medium text-warning-700 dark:text-warning-300">Analytics</span>
            </button>
            <button className="flex flex-col items-center p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg hover:bg-danger-100 dark:hover:bg-danger-900/30 transition-colors">
              <X className="h-6 w-6 text-danger-600 mb-2" />
              <span className="text-xs font-medium text-danger-700 dark:text-danger-300">Bulk Edit</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
