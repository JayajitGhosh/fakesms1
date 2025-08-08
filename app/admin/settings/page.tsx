'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  Cog, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Save, 
  Shield, 
  Palette
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

export default function AdminSettings() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">Configure branding, integrations, and security</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-primary">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Branding */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Branding</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Organization Name</label>
              <input className="input" defaultValue="FlyMinds EduManage" />
            </div>
            <div>
              <label className="label">Logo</label>
              <div className="flex items-center space-x-2">
                <input type="file" className="input" />
                <ImageIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Google Classroom Link</label>
              <div className="flex items-center space-x-2">
                <input className="input" placeholder="https://classroom.google.com/" />
                <LinkIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div>
              <label className="label">Slack Webhook</label>
              <input className="input" placeholder="https://hooks.slack.com/services/..." />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Password Policy</label>
              <select className="input">
                <option>Standard (min 8 chars)</option>
                <option>Strong (min 12 chars, symbols)</option>
              </select>
            </div>
            <div>
              <label className="label">2FA</label>
              <select className="input">
                <option>Disabled</option>
                <option>Enabled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
          <div className="flex items-center space-x-4">
            <Palette className="h-6 w-6 text-primary-600" />
            <span className="text-gray-600 dark:text-gray-300">Theme: Light / Dark / System</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
