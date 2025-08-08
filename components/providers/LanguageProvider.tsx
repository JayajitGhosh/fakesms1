'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Lang = 'en' | 'hi'

type Dictionary = Record<string, { en: string; hi: string }>

const DICT: Dictionary = {
  brand_tagline: { en: 'Smarter Schools. Happier Students.', hi: 'स्मार्ट स्कूल। खुशहाल विद्यार्थी।' },
  access_portal: { en: 'Access Portal', hi: 'पोर्टल खोलें' },
  learn_more: { en: 'Learn More', hi: 'और जानें' },
  role_based_access: { en: 'Role-Based Access', hi: 'भूमिका-आधारित प्रवेश' },
  powerful_features: { en: 'Powerful Features', hi: 'शक्तिशाली फीचर्स' },
  get_started: { en: 'Get Started', hi: 'शुरू करें' },
  sign_in: { en: 'Sign In', hi: 'साइन इन' },
  schools_glance: { en: 'Schools at a glance', hi: 'स्कूल्स एक नज़र में' },
  students: { en: 'Students', hi: 'विद्यार्थी' },
  teachers: { en: 'Teachers', hi: 'शिक्षक' },
  administrators: { en: 'Administrators', hi: 'प्रशासक' },
  student_login: { en: 'Student Login', hi: 'छात्र लॉगिन' },
  teacher_login: { en: 'Teacher Login', hi: 'शिक्षक लॉगिन' },
  admin_login: { en: 'Admin Login', hi: 'एडमिन लॉगिन' },
  ready_get_started: { en: 'Ready to Get Started?', hi: 'शुरू करने के लिए तैयार?' },
  start_free_trial: { en: 'Start Free Trial', hi: 'मुफ़्त ट्रायल शुरू करें' },
  sign_in_now: { en: 'Sign In Now', hi: 'अभी साइन इन करें' },
  features_tagline: { en: 'Everything you need to manage your educational institution effectively', hi: 'स्कूल प्रबंधन के लिए वह सब कुछ जो आपको चाहिए' },
}

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: keyof typeof DICT) => string
}

const LangContext = createContext<LangContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = (typeof window !== 'undefined' ? localStorage.getItem('lang') : null) as Lang | null
    if (stored === 'en' || stored === 'hi') setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') localStorage.setItem('lang', l)
  }

  const t = (key: keyof typeof DICT) => DICT[key]?.[lang] ?? key

  const value = useMemo(() => ({ lang, setLang, t }), [lang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
