'use client'

import { useLang } from '@/components/providers/LanguageProvider'

export default function LanguageToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-3 py-1 text-sm ${lang === 'en' ? 'bg-primary-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-300'}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('hi')}
        className={`px-3 py-1 text-sm ${lang === 'hi' ? 'bg-primary-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-300'}`}
      >
        हिंदी
      </button>
    </div>
  )
}
