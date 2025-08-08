'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Filter,
  Download,
  Eye
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

export default function StudentGrades() {
  const { data: session } = useSession()

  // Mock grades data
  const grades = [
    { subject: 'Mathematics', grade: 92, type: 'Midterm', date: '2024-01-15', weight: 30, comments: 'Excellent work on calculus' },
    { subject: 'English Literature', grade: 88, type: 'Essay', date: '2024-01-12', weight: 25, comments: 'Strong analysis, minor grammar issues' },
    { subject: 'Physics', grade: 95, type: 'Lab Report', date: '2024-01-10', weight: 20, comments: 'Outstanding experimental work' },
    { subject: 'History', grade: 85, type: 'Quiz', date: '2024-01-08', weight: 15, comments: 'Good understanding of key concepts' },
    { subject: 'Chemistry', grade: 90, type: 'Final Exam', date: '2024-01-05', weight: 40, comments: 'Excellent performance' },
    { subject: 'Computer Science', grade: 87, type: 'Project', date: '2024-01-03', weight: 35, comments: 'Creative solution, well documented' },
  ]

  const subjects = ['All Subjects', 'Mathematics', 'English Literature', 'Physics', 'History', 'Chemistry', 'Computer Science']
  const gradeTypes = ['All Types', 'Midterm', 'Final Exam', 'Quiz', 'Essay', 'Lab Report', 'Project']

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-success-600 bg-success-50'
    if (grade >= 80) return 'text-primary-600 bg-primary-50'
    if (grade >= 70) return 'text-warning-600 bg-warning-50'
    return 'text-danger-600 bg-danger-50'
  }

  const getGradeLetter = (grade: number) => {
    if (grade >= 93) return 'A'
    if (grade >= 90) return 'A-'
    if (grade >= 87) return 'B+'
    if (grade >= 83) return 'B'
    if (grade >= 80) return 'B-'
    if (grade >= 77) return 'C+'
    if (grade >= 73) return 'C'
    if (grade >= 70) return 'C-'
    if (grade >= 67) return 'D+'
    if (grade >= 63) return 'D'
    return 'F'
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="STUDENT">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Grades</h1>
            <p className="text-gray-600 dark:text-gray-300">Track your academic performance</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="btn btn-primary">
              <Eye className="h-4 w-4 mr-2" />
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
                {gradeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grade Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-success-600">89.5%</div>
            <div className="text-sm text-gray-600">Overall Average</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">B+</div>
            <div className="text-sm text-gray-600">Current GPA</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-warning-600">6</div>
            <div className="text-sm text-gray-600">Total Assignments</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-secondary-600">95%</div>
            <div className="text-sm text-gray-600">Attendance Rate</div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Grades</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Weight</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Comments</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {grades.map((grade, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{grade.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{grade.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(grade.grade)}`}>
                        {grade.grade}% ({getGradeLetter(grade.grade)})
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{grade.weight}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{grade.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">{grade.comments}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Performance</h3>
            <div className="space-y-4">
              {grades.reduce((acc, grade) => {
                const existing = acc.find(item => item.subject === grade.subject)
                if (existing) {
                  existing.grades.push(grade.grade)
                } else {
                  acc.push({ subject: grade.subject, grades: [grade.grade] })
                }
                return acc
              }, [] as { subject: string; grades: number[] }[]).map((subject, index) => {
                const average = subject.grades.reduce((a, b) => a + b, 0) / subject.grades.length
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{subject.subject}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${average >= 90 ? 'bg-success-600' : average >= 80 ? 'bg-primary-600' : average >= 70 ? 'bg-warning-600' : 'bg-danger-600'}`}
                          style={{ width: `${average}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{average.toFixed(1)}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Grade Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">A (90-100%)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-success-600 h-2 rounded-full" style={{ width: '50%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">3</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">B (80-89%)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '33%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">2</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">C (70-79%)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-warning-600 h-2 rounded-full" style={{ width: '17%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
