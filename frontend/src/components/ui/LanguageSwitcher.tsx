'use client'

import { clsx } from 'clsx'
import { useLocale } from 'next-intl'

import { routing, usePathname, useRouter } from '@/i18n/routing'

const LanguageSwitcher = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLanguage = (newLocale: string) => {
    router.replace(pathname, {
      locale: newLocale as (typeof routing.locales)[number]
    })
  }

  return (
    <div className="flex items-center bg-sidebar/80  backdrop-blur-md shadow-sm rounded-full p-1 border border-border">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => toggleLanguage(loc)}
          className={clsx(
            'cursor-pointer px-3 py-1 text-xs font-bold rounded-full transition-all uppercase tracking-wider',
            locale === loc
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-text-muted hover:text-primary'
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
