'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Eye, EyeOff, GraduationCap, Users, Shield } from 'lucide-react'

const roles = [
  { id: 'student', name: 'Student', icon: GraduationCap, color: 'primary' },
  { id: 'teacher', name: 'Teacher', icon: Users, color: 'success' },
  { id: 'admin', name: 'Administrator', icon: Shield, color: 'warning' },
]

function selectedRoleClasses(roleId: string) {
  switch (roleId) {
    case 'teacher':
      return 'border-success-500 bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-300'
    case 'admin':
      return 'border-warning-500 bg-warning-50 text-warning-700 dark:bg-warning-900/20 dark:text-warning-300'
    default:
      return 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
  }
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState(searchParams.get('role') || 'student')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Redirect based on role
        const redirectPath = selectedRole === 'admin' ? '/admin/dashboard' 
          : selectedRole === 'teacher' ? '/teacher/dashboard' 
          : '/student/dashboard'
        router.push(redirectPath)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleColor = (roleId: string) => {
    const role = roles.find(r => r.id === roleId)
    if (!role) return 'primary'
    return role.color
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-950 dark:to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-xl ${
              selectedRole === 'teacher' ? 'bg-success-600' : 
              selectedRole === 'admin' ? 'bg-warning-600' : 
              'bg-primary-600'
            }`}>
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your {selectedRole} account
          </p>
        </div>

        {/* Role Selection */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-soft">
          <label className="label">Select Role</label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => {
              const Icon = role.icon
              const isSelected = selectedRole === role.id
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? selectedRoleClasses(role.id)
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className={`h-5 w-5 mx-auto mb-1 ${
                    isSelected ? 'opacity-100' : 'text-gray-400'
                  }`} />
                  <span className={`text-xs font-medium ${
                    isSelected ? 'opacity-100' : 'text-gray-600'
                  }`}>
                    {role.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Login Form */}
        <div className="card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 text-danger-700 dark:text-danger-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`btn w-full py-3 text-base font-medium ${
                  selectedRole === 'teacher' ? 'btn-success' : 
                  selectedRole === 'admin' ? 'btn-warning' : 
                  'btn-primary'
                }`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">New to EduManage?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/auth/register"
                className="btn btn-outline w-full"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Demo Credentials</h3>
          <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <p><strong>Student:</strong> student@demo.com / password123</p>
            <p><strong>Teacher:</strong> teacher@demo.com / password123</p>
            <p><strong>Admin:</strong> admin@demo.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
