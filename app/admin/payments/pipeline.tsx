'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Bell, AlertCircle, CheckCircle, XCircle, ArrowRight, Mail } from 'lucide-react'
import { useState } from 'react'

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

const initialPipeline = {
  Pending: [
    { id: 'stu1', name: 'Alice Johnson', email: 'alice@demo.com', amountDue: 1200, dueDate: '2024-02-10', status: 'Pending', critical: false },
    { id: 'stu2', name: 'Bob Smith', email: 'bob@demo.com', amountDue: 1500, dueDate: '2024-02-05', status: 'Pending', critical: true },
  ],
  Partial: [
    { id: 'stu3', name: 'Carol Davis', email: 'carol@demo.com', amountDue: 600, dueDate: '2024-02-15', status: 'Partial', critical: false },
  ],
  Paid: [
    { id: 'stu4', name: 'David Wilson', email: 'david@demo.com', amountDue: 0, dueDate: '2024-01-20', status: 'Paid', critical: false },
  ],
  Overdue: [
    { id: 'stu5', name: 'Emma Brown', email: 'emma@demo.com', amountDue: 2000, dueDate: '2024-01-15', status: 'Overdue', critical: true },
  ],
}

const statusOrder = ['Pending', 'Partial', 'Paid', 'Overdue']

export default function PaymentPipeline() {
  const { data: session } = useSession()
  const [pipeline, setPipeline] = useState(initialPipeline)
  const [dragged, setDragged] = useState<{ id: string; from: string } | null>(null)

  if (!session) return <div>Loading...</div>

  // Drag and drop handlers (mocked, no backend)
  const onDragStart = (id: string, from: string) => setDragged({ id, from })
  const onDrop = (to: string) => {
    if (!dragged) return
    const student = pipeline[dragged.from].find(s => s.id === dragged.id)
    if (!student) return
    setPipeline(prev => {
      const newPrev = { ...prev }
      newPrev[dragged.from] = newPrev[dragged.from].filter(s => s.id !== dragged.id)
      newPrev[to] = [...newPrev[to], { ...student, status: to }]
      return newPrev
    })
    setDragged(null)
  }

  return (
    <DashboardLayout userRole="ADMIN">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Payment Pipeline</h1>
            <p className="text-gray-600 dark:text-gray-300">Track and manage student fee status. Drag cards to update status.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statusOrder.map(status => (
            <div key={status} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 min-h-[400px] flex flex-col">
              <div className="flex items-center mb-4">
                <span className="font-semibold text-lg text-gray-900 dark:text-white">{status}</span>
                {status === 'Overdue' && <AlertCircle className="ml-2 h-5 w-5 text-danger-600 animate-pulse" />}
              </div>
              <div
                className="flex-1 space-y-4 min-h-[300px]"
                onDragOver={e => e.preventDefault()}
                onDrop={() => onDrop(status)}
              >
                {pipeline[status].length === 0 && (
                  <div className="text-gray-400 text-sm text-center mt-8">No students</div>
                )}
                {pipeline[status].map(student => (
                  <div
                    key={student.id}
                    className={`card p-4 cursor-move relative ${student.critical ? 'border-2 border-danger-600 animate-pulse' : ''}`}
                    draggable
                    onDragStart={() => onDragStart(student.id, status)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{student.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">₹{student.amountDue}</div>
                        <div className="text-xs text-gray-500">Due: {student.dueDate}</div>
                      </div>
                    </div>
                    {student.critical && (
                      <div className="absolute top-2 right-2 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 text-danger-600" />
                        <span className="text-xs text-danger-600 font-semibold">Critical</span>
                      </div>
                    )}
                    <div className="flex space-x-2 mt-3">
                      <button className="btn btn-xs btn-outline flex items-center">
                        <Mail className="h-4 w-4 mr-1" />Send Reminder
                      </button>
                      <button className="btn btn-xs btn-outline flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />Mark Paid
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
