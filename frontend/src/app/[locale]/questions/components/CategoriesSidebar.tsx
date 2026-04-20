import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'

import { useGetCategoriesQuery } from '@/store/services/questionsApi'
import { TLocale } from '@/types/common'

type Props = {
  locale: TLocale
  isAuthenticated: boolean
  selectedCategory: string | null
  setSelectedCategory: Dispatch<SetStateAction<string | null>>
}

const CategoriesSidebar = ({
  locale,
  isAuthenticated,
  selectedCategory,
  setSelectedCategory
}: Props) => {
  const t = useTranslations('Questions')

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined, {
      skip: !isAuthenticated
    })

  const categories = categoriesData?.data || []

  return (
    <div className="w-full md:w-1/4 space-y-2">
      {categoriesLoading ? (
        <div className="text-center py-8 text-text-muted">{t('loading')}</div>
      ) : (
        categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full text-left px-6 py-4 rounded-xl border transition-all cursor-pointer ${
              selectedCategory === category.id
                ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                : 'border-border bg-sidebar/50 text-text-muted hover:border-primary/50'
            }`}
          >
            {category[`name_${locale}`]}
          </button>
        ))
      )}
    </div>
  )
}

export default CategoriesSidebar
