import { TServerResponse } from '@/types/common'

export type Category = {
  id: string
  slug: string
  name_en: string
  name_ua: string
  icon: string | null
  order: number
}

export type TCategoriesResponse = TServerResponse<Category[]>

export type Question = {
  id: string
  category_id: string
  question_en: string
  question_ua: string
  answer_en: string | null
  answer_ua: string | null
  difficulty: 'easy' | 'medium' | 'hard'
  order: number
}

export type TQuestionsResponse = TServerResponse<Question[]>
