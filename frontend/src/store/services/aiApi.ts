import { TAIChatParams, TAIChatResponse } from '@/types/AIChat'
import { AI_API, API_METHODS } from '@/utils/constants/api'

import { apiSlice } from './api'

export const aiApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    sendChatMessage: build.mutation<TAIChatResponse, TAIChatParams>({
      query: (body) => ({
        url: AI_API.CHAT,
        method: API_METHODS.POST,
        body
      })
    })
  })
})

export const { useSendChatMessageMutation } = aiApi
