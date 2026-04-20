'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Bot, MessageSquare, Send, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { usePathname } from '@/i18n/routing'
import { selectModal, setModal } from '@/store/features/uiSlice'
import { selectIsAuthenticated } from '@/store/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useSendChatMessageMutation } from '@/store/services/aiApi'
import { ChatMessage } from '@/types/AIChat'

const ChatBot = () => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const t = useTranslations('Chat')

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I am your AI assistant. How can I help you today?'
    }
  ])
  const [input, setInput] = useState('')

  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const modal = useAppSelector(selectModal)

  const [sendMessage, { isLoading }] = useSendChatMessageMutation()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: input.trim() }
    ]
    setMessages(newMessages)
    setInput('')

    try {
      const response = await sendMessage({
        messages: newMessages,
        context: {
          pathname,
          is_authenticated: isAuthenticated,
          modal
        }
      }).unwrap()
      if (response.data) {
        setMessages([...newMessages, response.data])
        if (
          response.data.action?.type === 'NAVIGATE' &&
          response.data.action.payload
        ) {
          router.push(response.data.action.payload)
        }
        if (
          response.data.action?.type === 'OPEN_MODAL' &&
          response.data.action.payload
        ) {
          dispatch(setModal(response.data.action.payload))
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Oops, something went wrong. Please try again later.'
        }
      ])
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all z-50 cursor-pointer ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageSquare size={24} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-sidebar/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-sidebar">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Bot size={20} />
                </div>
                <span className="font-semibold">{t('AIAssistant')}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground selection:text-primary-foreground rounded-br-sm'
                        : 'bg-sidebar border border-border text-foreground rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-sidebar border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-border bg-sidebar/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('AIAssistantPlaceholder')}
                  className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-primary text-primary-foreground rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity cursor-pointer"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
