'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { 
  Menu, 
  X, 
  GraduationCap, 
  Users, 
  Shield, 
  Home,
  BookOpen,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  User,
  Moon,
  Sun,
  AlertCircle,
  ArrowRight
} from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Dialog } from '@headlessui/react'

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: 'STUDENT' | 'TEACHER' | 'ADMIN'
}

const navigationItems = {
  STUDENT: [
    { name: 'Dashboard', href: '/student/dashboard', icon: Home },
    { name: 'My Grades', href: '/student/grades', icon: BookOpen },
    { name: 'Attendance', href: '/student/attendance', icon: Calendar },
    { name: 'Schedule', href: '/student/schedule', icon: Calendar },
    { name: 'Announcements', href: '/student/announcements', icon: Bell },
  ],
  TEACHER: [
    { name: 'Dashboard', href: '/teacher/dashboard', icon: Home },
    { name: 'My Classes', href: '/teacher/classes', icon: BookOpen },
    { name: 'Grade Management', href: '/teacher/grades', icon: BarChart3 },
    { name: 'Attendance', href: '/teacher/attendance', icon: Calendar },
    { name: 'Announcements', href: '/teacher/announcements', icon: Bell },
  ],
  ADMIN: [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Class Management', href: '/admin/classes', icon: BookOpen },
    { name: 'Payment Pipeline', href: '/admin/payments/pipeline', icon: Bell },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ],
}

const roleConfig = {
  STUDENT: { color: 'primary', icon: GraduationCap, title: 'Student Portal' },
  TEACHER: { color: 'success', icon: Users, title: 'Teacher Portal' },
  ADMIN: { color: 'warning', icon: Shield, title: 'Admin Portal' },
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  // Payment pipeline mock summary for admin
  const paymentSummary = [
    { status: 'Pending', count: 2 },
    { status: 'Partial', count: 1 },
    { status: 'Paid', count: 1 },
    { status: 'Overdue', count: 1 },
  ]
  const criticalStudents = [
    { name: 'Bob Smith', email: 'bob@demo.com', amountDue: 1500, dueDate: '2024-02-05' },
    { name: 'Emma Brown', email: 'emma@demo.com', amountDue: 2000, dueDate: '2024-01-15' },
  ]
  
  const config = roleConfig[userRole]
  const navigation = navigationItems[userRole]
  const Icon = config.icon
  const router = useRouter()

  // Helper for logo click
  const logoHref = userRole === 'ADMIN' ? '/admin/dashboard' : userRole === 'TEACHER' ? '/teacher/dashboard' : userRole === 'STUDENT' ? '/student/dashboard' : '/'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className={`fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-900 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <Link href={logoHref} className="flex items-center space-x-3 group" onClick={() => setSidebarOpen(false)}>
              <div className={`bg-${config.color}-600 p-2 rounded-lg group-hover:scale-105 transition-transform`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600">{config.title}</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const ItemIcon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`sidebar-link ${
                    isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <ItemIcon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <Link href={logoHref} className="flex items-center space-x-3 group">
              <div className={`bg-${config.color}-600 p-2 rounded-lg group-hover:scale-105 transition-transform`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600">{config.title}</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const ItemIcon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`sidebar-link group ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
                >
                  <ItemIcon className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="transition-colors">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Bell icon with payment notifications for admin */}
              {userRole === 'ADMIN' ? (
                <button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative" onClick={() => setNotifOpen(true)}>
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-danger-600 text-white text-xs rounded-full px-1.5 py-0.5">{criticalStudents.length}</span>
                </button>
              ) : userRole === 'TEACHER' ? (
                <button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                </button>
              ) : null}
              {/* Payment pipeline modal for admin */}
              {userRole === 'ADMIN' && (
                <Dialog open={notifOpen} onClose={() => setNotifOpen(false)} className="fixed z-[100] inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                    <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-lg w-full mx-auto p-6 z-10">
                      <Dialog.Title className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-primary-600" /> Payment Pipeline Alerts
                      </Dialog.Title>
                      <div className="mb-4">
                        <div className="flex space-x-2 mb-2">
                          {paymentSummary.map(s => (
                            <div key={s.status} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                              {s.status}: <span className="font-bold">{s.count}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mb-2 text-sm text-danger-600 font-semibold">Critical/Overdue Students:</div>
                        <ul className="mb-2">
                          {criticalStudents.map(s => (
                            <li key={s.email} className="flex items-center space-x-2 mb-1">
                              <AlertCircle className="h-4 w-4 text-danger-600" />
                              <span className="font-medium">{s.name}</span>
                              <span className="text-xs text-gray-500">({s.email})</span>
                              <span className="text-xs text-danger-600 ml-2">₹{s.amountDue} due {s.dueDate}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href="/admin/payments/pipeline" className="btn btn-primary w-full flex items-center justify-center mt-2">
                          <ArrowRight className="h-4 w-4 mr-2" /> Go to Payment Pipeline
                        </Link>
                      </div>
                      <button className="btn btn-outline w-full" onClick={() => setNotifOpen(false)}>Close</button>
                    </div>
                  </div>
                </Dialog>
              )}

              <button
                onClick={toggleTheme}
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                title="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(true)}
                  className="flex items-center space-x-3 focus:outline-none"
                  title="Profile"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {session?.user?.firstName} {session?.user?.lastName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-200 capitalize">
                      {session?.user?.role?.toLowerCase()}
                    </div>
                  </div>
                </button>
                <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} className="fixed z-[100] inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                    <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-xs w-full mx-auto p-6 z-10">
                      <Dialog.Title className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary-600" /> Profile
                      </Dialog.Title>
                      <div className="flex flex-col items-center mb-4">
                        <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                          <User className="h-8 w-8 text-gray-600" />
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">{session?.user?.firstName} {session?.user?.lastName}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-200">{session?.user?.email}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-200 capitalize">{session?.user?.role?.toLowerCase()}</div>
                      </div>
                      <button className="btn btn-outline w-full mb-2">Change Profile Picture</button>
                      <button
                        onClick={() => { setProfileOpen(false); signOut({ callbackUrl: '/' }) }}
                        className="btn btn-danger w-full mb-2"
                      >
                        Logout
                      </button>
                      <button className="btn btn-outline w-full" onClick={() => setProfileOpen(false)}>Close</button>
                    </div>
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
