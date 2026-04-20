'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import { selectModal, setModal } from '@/store/features/uiSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ResetPasswordForm from './ResetPasswordForm'

export type AuthView = 'login' | 'register' | 'forgot_password'

const AuthModal = () => {
  const dispatch = useAppDispatch()

  const modal = useAppSelector(selectModal)

  const onChangeModal = (view: AuthView | null) => dispatch(setModal(view))
  const onClose = () => onChangeModal(null)

  return (
    <AnimatePresence>
      {!!modal && (
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

            {modal === 'login' && (
              <LoginForm onSwitchView={onChangeModal} onSuccess={onClose} />
            )}
            {modal === 'register' && (
              <RegisterForm onSwitchView={onChangeModal} onSuccess={onClose} />
            )}
            {modal === 'forgot_password' && (
              <ResetPasswordForm onSwitchView={onChangeModal} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AuthModal
