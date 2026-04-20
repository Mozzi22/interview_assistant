'use client'

import { Lock } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import CategoriesSidebar from '@/app/[locale]/questions/components/CategoriesSidebar'
import QuestionsList from '@/app/[locale]/questions/components/QuestionsList'
import { selectIsAuthenticated } from '@/store/features/userSlice'
import { useAppSelector } from '@/store/hooks'
import { TLocale } from '@/types/common'

const Questions = () => {
  const locale = useLocale() as TLocale
  const t = useTranslations('Questions')

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-20">
        <Lock className="w-16 h-16 text-primary mb-6" />
        <h1 className="text-4xl font-extrabold mb-4">{t('accessDenied')}</h1>
        <p className="text-text-muted mb-8">{t('accessDeniedDesc')}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-32 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
          {t('title')}
        </h1>
        <p className="text-text-muted text-lg">{t('subtitle')}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <CategoriesSidebar
          locale={locale}
          isAuthenticated={isAuthenticated}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <QuestionsList locale={locale} selectedCategory={selectedCategory} />
      </div>
    </div>
  )
}

export default Questions
