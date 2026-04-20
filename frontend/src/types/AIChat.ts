import { AuthView } from '@/components/auth/AuthModal'
import { TServerResponse } from '@/types/common'

type ChatMessageAction = {
  type: 'NAVIGATE'
  payload: string
}
type ChatMessageModalAction = {
  type: 'OPEN_MODAL'
  payload: AuthView
}
export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  action?: ChatMessageAction | ChatMessageModalAction
}

export type TAIChatResponse = TServerResponse<ChatMessage>

export type TAIChatParams = {
  messages: ChatMessage[]
  context: {
    pathname: string
    is_authenticated: boolean
    modal: AuthView | null
  }
}
