"use client"
import Link from 'next/link'
import { GraduationCap, Users, Shield, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useLang } from '@/components/providers/LanguageProvider'

const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), { ssr: false })
const LanguageToggle = dynamic(() => import('@/components/LanguageToggle'), { ssr: false })
const HomeMetrics = dynamic(() => import('@/components/charts/HomeMetrics'), { ssr: false })
const RubiksCube = dynamic(() => import('@/components/RubiksCube'), { ssr: false })
const FeaturesReel = dynamic(() => import('@/components/FeaturesReel'), { ssr: false })

export default function HomePage() {
  const { t } = useLang()
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <RubiksCube />
              <div className="p-1 rounded-lg">
                <Image src="/brand/flyminds-logo.svg" alt="FlyMinds" width={40} height={40} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FlyMinds EduManage</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('brand_tagline')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Link href="/auth/login" className="btn btn-outline">{t('sign_in')}</Link>
              <Link href="/auth/register" className="btn btn-primary">{t('get_started')}</Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Modern School
              <span className="text-primary-600"> Management</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Streamline your educational institution with our comprehensive management system. 
              Designed for students, teachers, and administrators with role-based access and powerful features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login" className="btn btn-primary text-lg px-8 py-3">
                {t('access_portal')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="#features" className="btn btn-outline text-lg px-8 py-3">{t('learn_more')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact + Live Metrics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: value props with icons */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Built for engagement. Designed for clarity.
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                A frictionless experience for students, teachers, and admins. Clear hierarchy, focused actions, and delightful feedback keep everyone moving forward.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Faster grading', value: '2x', tint: 'primary' },
                  { label: 'Higher attendance', value: '+12%', tint: 'success' },
                  { label: 'Happier staff', value: '94%', tint: 'warning' },
                ].map((s, i) => (
                  <div key={i} className={`rounded-xl px-4 py-3 border bg-white/60 backdrop-blur shadow-soft dark:bg-gray-900/40 dark:border-gray-800 animate-fade-in`}>
                    <div className={`text-2xl font-bold ${
                      s.tint === 'primary' ? 'text-primary-600' :
                      s.tint === 'success' ? 'text-success-600' :
                      'text-warning-600'
                    }`}>{s.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: live metrics chart */}
            <HomeMetrics />
          </div>
          <div className="mt-8">
            <FeaturesReel />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('role_based_access')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Different interfaces and features tailored for each user type
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div className="card p-8 text-center hover:shadow-medium transition-shadow dark:bg-gray-900/50">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('students')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Access grades, attendance, class schedules, and announcements. 
                Track your academic progress and stay connected with teachers.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                <li>• View grades and progress reports</li>
                <li>• Check attendance records</li>
                <li>• Access class schedules</li>
                <li>• Read announcements</li>
              </ul>
              <Link href="/auth/login?role=student" className="btn btn-primary w-full">{t('student_login')}</Link>
            </div>

            {/* Teacher Card */}
            <div className="card p-8 text-center hover:shadow-medium transition-shadow dark:bg-gray-900/50">
              <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('teachers')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Manage classes, record grades, take attendance, and communicate with students. 
                Access comprehensive teaching tools and analytics.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                <li>• Manage class rosters</li>
                <li>• Record grades and attendance</li>
                <li>• Create announcements</li>
                <li>• View student analytics</li>
              </ul>
              <Link href="/auth/login?role=teacher" className="btn btn-success w-full">{t('teacher_login')}</Link>
            </div>

            {/* Admin Card */}
            <div className="card p-8 text-center hover:shadow-medium transition-shadow dark:bg-gray-900/50">
              <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('administrators')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Full system control with user management, school-wide analytics, 
                and administrative tools for comprehensive oversight.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                <li>• Manage all users and classes</li>
                <li>• View system analytics</li>
                <li>• Generate reports</li>
                <li>• System configuration</li>
              </ul>
              <Link href="/auth/login?role=admin" className="btn btn-warning w-full">{t('admin_login')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage your educational institution effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Grade Management', desc: 'Comprehensive grading system with multiple assessment types' },
              { title: 'Attendance Tracking', desc: 'Real-time attendance monitoring and reporting' },
              { title: 'Class Management', desc: 'Organize classes, subjects, and student rosters' },
              { title: 'Communication', desc: 'Announcements and messaging between users' },
              { title: 'Analytics Dashboard', desc: 'Data-driven insights and performance metrics' },
              { title: 'User Management', desc: 'Role-based access control and user administration' },
              { title: 'Reporting System', desc: 'Generate detailed reports and transcripts' },
              { title: 'Mobile Responsive', desc: 'Access from any device with responsive design' },
            ].map((feature, index) => (
              <div key={index} className="card p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Loved by modern schools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Greenwood High', quote: 'Attendance is up 12% and grading is twice as fast.' },
              { name: 'Lakeside Academy', quote: 'Our staff actually enjoy using it. Parents do too.' },
              { name: 'Aurora Public School', quote: 'From chaos to clarity in a week. Brilliant UX.' },
            ].map((t, i) => (
              <div key={i} className="card p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">“{t.quote}”</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of educational institutions using our modern management system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register" 
              className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/auth/login" 
              className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-1 rounded-lg">
                  <Image src="/brand/flyminds-logo.svg" alt="FlyMinds" width={28} height={28} />
                </div>
                <span className="text-xl font-bold">FlyMinds</span>
              </div>
              <p className="text-gray-400">
                Modern school management system designed for the digital age.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduManage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
