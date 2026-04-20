import { TCategoriesResponse, TQuestionsResponse } from '@/types/Questions'
import { API_METHODS, QUESTIONS_API } from '@/utils/constants/api'

import { apiSlice } from './api'

export const questionsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<TCategoriesResponse, void>({
      query: (body) => ({
        url: QUESTIONS_API.CATEGORIES,
        method: API_METHODS.GET,
        body
      })
    }),
    getQuestionsByCategory: build.query<TQuestionsResponse, string>({
      query: (categoryId) => ({
        url: `${QUESTIONS_API.CATEGORIES}/${categoryId}/questions`,
        method: API_METHODS.GET
      })
    })
  })
})

export const { useGetCategoriesQuery, useLazyGetQuestionsByCategoryQuery } =
  questionsApi
