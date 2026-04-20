import type { Request, Response } from 'express'
import { GoogleGenAI, Type } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string
})

const tools = [
  {
    functionDeclarations: [
      {
        name: 'navigate_to_page',
        description: 'Navigate to a page',
        parameters: {
          type: Type.OBJECT,
          properties: {
            path: {
              type: Type.STRING,
              enum: ['/', '/questions']
            }
          },
          required: ['path']
        }
      },
      {
        name: 'open_modal',
        description: 'Open a modal window (login, register, forgot password)',
        parameters: {
          type: Type.OBJECT,
          properties: {
            modal: {
              type: Type.STRING,
              enum: ['login', 'register', 'forgot_password']
            }
          },
          required: ['modal']
        }
      }
    ]
  }
]

const buildSystemPrompt = (context: any) => {
  return `
You are an AI assistant for an interview preparation platform.

Your job is to HELP users navigate and use the app.

=== RULES ===
- If user wants to navigate → use navigate_to_page
- If user wants to login/register/forgot password → use open_modal
- If already on the page → DO NOT navigate, explain instead
- Prefer actions over plain text
- Be concise

=== APP STATE ===
Current path: ${context.pathname}
Authenticated: ${context.is_authenticated}
Open modal: ${context.modal}

=== AVAILABLE ===
Pages:
- "/"
- "/questions"

Modals:
- "login"
- "register"
- "forgot_password"
`
}

const mapMessages = (messages: any[]) => {
  return messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }))
}

const handleAction = (call: any, context: any) => {
  if (!call || !call.name) return null

  switch (call.name) {
    case 'navigate_to_page': {
      const path = call.args?.path

      if (!path) return null

      // prevent useless navigation
      if (path === context.pathname) {
        return {
          type: 'MESSAGE',
          content: `You are already on ${path}`
        }
      }

      return {
        type: 'NAVIGATE',
        payload: path
      }
    }

    case 'open_modal': {
      const modal = call.args?.modal

      if (!modal) return null

      // prevent reopening same modal
      if (context.modal === modal) {
        return {
          type: 'MESSAGE',
          content: `${modal} is already open`
        }
      }

      // prevent login if already authenticated
      if (context.is_authenticated && modal === 'login') {
        return {
          type: 'MESSAGE',
          content: `You are already logged in`
        }
      }

      // prevent registration if already authenticated
      if (context.is_authenticated && modal === 'register') {
        return {
          type: 'MESSAGE',
          content: `You are already logged in`
        }
      }

      return {
        type: 'OPEN_MODAL',
        payload: modal
      }
    }

    default:
      return null
  }
}

export const chat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, context } = req.body

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required' })
      return
    }

    const systemInstruction = buildSystemPrompt(context || {})

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: mapMessages(messages),
      config: {
        systemInstruction,
        tools
      }
    })

    const functionCalls = response.functionCalls

    if (functionCalls && functionCalls.length > 0) {
      const action = handleAction(functionCalls[0], context || {})

      if (action) {
        res.json({
          data: {
            role: 'assistant',
            content: action.type === 'MESSAGE' ? action.content : 'Executing action...',
            action
          }
        })
      }
    }

    res.json({
      data: {
        role: 'assistant',
        content: response.text || 'I am not sure how to help with that.'
      }
    })
  } catch (error: any) {
    console.error('AI API Error:', error)

    res.status(500).json({
      error: 'Failed to generate response'
    })
  }
}
