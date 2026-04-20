import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { useLazyGetQuestionsByCategoryQuery } from '@/store/services/questionsApi'
import { TLocale } from '@/types/common'

type Props = {
  locale: TLocale
  selectedCategory: string | null
}

const QuestionsList = ({ locale, selectedCategory }: Props) => {
  const t = useTranslations('Questions')

  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const [fetchQuestions, { data: questionsData, isLoading: questionsLoading }] =
    useLazyGetQuestionsByCategoryQuery()

  useEffect(() => {
    const fetchActualQuestions = (selectedCategory: string) => {
      fetchQuestions(selectedCategory)
      setExpandedQuestion(null)
    }
    if (selectedCategory) fetchActualQuestions(selectedCategory)
  }, [selectedCategory, fetchQuestions])

  const questions = questionsData?.data || []

  return (
    <div className="w-full md:w-3/4">
      {!selectedCategory ? (
        <div className="h-full flex items-center justify-center border-2 border-dashed border-border rounded-2xl p-12 text-text-muted">
          {t('selectCategory')}
        </div>
      ) : questionsLoading ? (
        <div className="text-center py-12 text-text-muted">{t('loading')}</div>
      ) : questions.length === 0 ? (
        <div className="h-full flex items-center justify-center border-2 border-dashed border-border rounded-2xl p-12 text-text-muted">
          {t('noQuestions')}
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="border border-border rounded-xl bg-sidebar/30 overflow-hidden shadow-sm"
            >
              <button
                onClick={() =>
                  setExpandedQuestion(
                    expandedQuestion === question.id ? null : question.id
                  )
                }
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-sidebar/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col pr-4">
                  <span className="font-semibold text-lg">
                    {question[`question_${locale}`]}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full uppercase font-bold
                          ${
                            question.difficulty === 'easy'
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                              : question.difficulty === 'medium'
                                ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                : 'bg-red-500/10 text-red-500 border border-red-500/20'
                          }
                        `}
                    >
                      {t(question.difficulty)}
                    </span>
                  </div>
                </div>
                {expandedQuestion === question.id ? (
                  <ChevronUp className="text-text-muted min-w-[24px]" />
                ) : (
                  <ChevronDown className="text-text-muted min-w-[24px]" />
                )}
              </button>

              <AnimatePresence>
                {expandedQuestion === question.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border bg-sidebar/10"
                  >
                    <div className="px-6 py-6 text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {question[`answer_${locale}`]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default QuestionsList
