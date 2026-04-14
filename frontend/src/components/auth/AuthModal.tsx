'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ResetPasswordForm from './ResetPasswordForm'

export type AuthView = 'login' | 'register' | 'forgot_password'

type Props = {
  isOpen: boolean
  onClose: () => void
  initialView?: AuthView
  setAuthModal: Dispatch<SetStateAction<AuthView | null>>
}

const AuthModal = ({
  isOpen,
  onClose,
  initialView = 'login',
  setAuthModal
}: Props) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-card p-6 md:p-8 shadow-2xl md:rounded-3xl border border-border"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-text-muted hover:text-foreground transition-colors rounded-full hover:bg-foreground/10 cursor-pointer"
          >
            <X size={20} />
          </button>

          {initialView === 'login' && (
            <LoginForm onSwitchView={setAuthModal} onSuccess={onClose} />
          )}
          {initialView === 'register' && (
            <RegisterForm onSwitchView={setAuthModal} onSuccess={onClose} />
          )}
          {initialView === 'forgot_password' && (
            <ResetPasswordForm onSwitchView={setAuthModal} />
          )}
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

export default AuthModal
