'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  Calendar, 
  Clock, 
  MapPin,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Dialog } from '@headlessui/react'
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

export default function StudentSchedule() {
  const { data: session } = useSession()
  const [calendarOpen, setCalendarOpen] = useState(false)

  // Mock schedule data
  const schedule = [
    { day: 'Monday', classes: [
      { subject: 'Mathematics', time: '09:00 AM - 10:30 AM', room: 'Room 201', teacher: 'Dr. Smith', type: 'Lecture' },
      { subject: 'English Literature', time: '10:45 AM - 12:15 PM', room: 'Room 105', teacher: 'Ms. Johnson', type: 'Discussion' },
      { subject: 'Physics', time: '02:00 PM - 03:30 PM', room: 'Lab 301', teacher: 'Dr. Brown', type: 'Lab' },
    ]},
    { day: 'Tuesday', classes: [
      { subject: 'History', time: '09:00 AM - 10:30 AM', room: 'Room 203', teacher: 'Mr. Davis', type: 'Lecture' },
      { subject: 'Chemistry', time: '10:45 AM - 12:15 PM', room: 'Lab 302', teacher: 'Dr. Wilson', type: 'Lab' },
      { subject: 'Computer Science', time: '02:00 PM - 03:30 PM', room: 'Computer Lab', teacher: 'Ms. Garcia', type: 'Practical' },
    ]},
    { day: 'Wednesday', classes: [
      { subject: 'Mathematics', time: '09:00 AM - 10:30 AM', room: 'Room 201', teacher: 'Dr. Smith', type: 'Tutorial' },
      { subject: 'English Literature', time: '10:45 AM - 12:15 PM', room: 'Room 105', teacher: 'Ms. Johnson', type: 'Workshop' },
      { subject: 'Physical Education', time: '02:00 PM - 03:30 PM', room: 'Gymnasium', teacher: 'Coach Miller', type: 'Activity' },
    ]},
    { day: 'Thursday', classes: [
      { subject: 'Physics', time: '09:00 AM - 10:30 AM', room: 'Lab 301', teacher: 'Dr. Brown', type: 'Lecture' },
      { subject: 'History', time: '10:45 AM - 12:15 PM', room: 'Room 203', teacher: 'Mr. Davis', type: 'Discussion' },
      { subject: 'Chemistry', time: '02:00 PM - 03:30 PM', room: 'Lab 302', teacher: 'Dr. Wilson', type: 'Lecture' },
    ]},
    { day: 'Friday', classes: [
      { subject: 'Computer Science', time: '09:00 AM - 10:30 AM', room: 'Computer Lab', teacher: 'Ms. Garcia', type: 'Lecture' },
      { subject: 'Mathematics', time: '10:45 AM - 12:15 PM', room: 'Room 201', teacher: 'Dr. Smith', type: 'Problem Solving' },
      { subject: 'English Literature', time: '02:00 PM - 03:30 PM', room: 'Room 105', teacher: 'Ms. Johnson', type: 'Presentation' },
    ]},
  ]

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lecture':
        return 'text-primary-600 bg-primary-50'
      case 'lab':
        return 'text-success-600 bg-success-50'
      case 'discussion':
        return 'text-warning-600 bg-warning-50'
      case 'practical':
        return 'text-secondary-600 bg-secondary-50'
      case 'activity':
        return 'text-danger-600 bg-danger-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Schedule</h1>
            <p className="text-gray-600 dark:text-gray-300">View your class timetable and upcoming sessions</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-outline">
              <Calendar className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="btn btn-primary" onClick={() => setCalendarOpen(true)}>
              <BookOpen className="h-4 w-4 mr-2" />
              View Calendar
            </button>
            <Dialog open={calendarOpen} onClose={() => setCalendarOpen(false)} className="fixed z-[100] inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4">
                <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full mx-auto p-6 z-10">
                  <Dialog.Title className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary-600" /> Calendar View (Mock)
                  </Dialog.Title>
                  <div className="mb-4 text-gray-600 dark:text-gray-300">[A calendar view would appear here. This is a placeholder for now.]</div>
                  <button className="btn btn-outline w-full" onClick={() => setCalendarOpen(false)}>Close</button>
                </div>
              </div>
            </Dialog>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Classes</h2>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {today} • {currentTime}
            </div>
          </div>
          <div className="space-y-3">
            {schedule.find(day => day.day === today)?.classes.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{classItem.subject}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{classItem.teacher}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">{classItem.time}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">{classItem.room}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(classItem.type)}`}>
                    {classItem.type}
                  </span>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No classes scheduled for today
              </div>
            )}
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Schedule</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {schedule.map((day, dayIndex) => (
                <div key={dayIndex} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{day.day}</h3>
                  <div className="space-y-3">
                    {day.classes.map((classItem, classIndex) => (
                      <div key={classIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <BookOpen className="h-4 w-4 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{classItem.subject}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{classItem.teacher}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{classItem.time}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            <span className="text-xs text-gray-600 dark:text-gray-300">{classItem.room}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(classItem.type)}`}>
                          {classItem.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">15</div>
            <div className="text-sm text-gray-600">Total Classes</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-success-600">6</div>
            <div className="text-sm text-gray-600">Subjects</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-warning-600">3</div>
            <div className="text-sm text-gray-600">Lab Sessions</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-secondary-600">25h</div>
            <div className="text-sm text-gray-600">Weekly Hours</div>
          </div>
        </div>

        {/* Subject Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Breakdown</h3>
            <div className="space-y-3">
              {Array.from(new Set(schedule.flatMap(day => day.classes.map(c => c.subject)))).map(subject => {
                const classCount = schedule.flatMap(day => day.classes).filter(c => c.subject === subject).length
                return (
                  <div key={subject} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{subject}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(classCount / 15) * 100}%` }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{classCount} classes</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Class Types</h3>
            <div className="space-y-3">
              {Array.from(new Set(schedule.flatMap(day => day.classes.map(c => c.type)))).map(type => {
                const typeCount = schedule.flatMap(day => day.classes).filter(c => c.type === type).length
                return (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className={`h-2 rounded-full ${getTypeColor(type).split(' ')[0].replace('text-', 'bg-')}`} style={{ width: `${(typeCount / 15) * 100}%` }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{typeCount}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
