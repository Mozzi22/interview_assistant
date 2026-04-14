import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { LoginFormData, loginValidation } from '@/components/auth/validation'
import { useSignInMutation } from '@/store/services/signInApi'

import type { AuthView } from './AuthModal'

type Props = {
  onSwitchView: (view: AuthView) => void
  onSuccess: () => void
}

const LoginForm = ({ onSwitchView, onSuccess }: Props) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const t = useTranslations('Auth')
  const tValidation = useTranslations('Validation')

  const [signIn] = useSignInMutation()

  const schema = loginValidation(tValidation)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')
    try {
      await signIn(data).unwrap()
      onSuccess()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.data?.error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
          {t('welcomeBack')}
        </h2>
        <p className="text-sm text-text-muted mt-2">{t('signInDesc')}</p>
      </div>

      {error && (
        <div className="p-3 bg-error-bg text-error rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {tValidation('email')}
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-error text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {tValidation('password')}
          </label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-error text-xs mt-1">{errors.password.message}</p>
          )}
          <div className="flex justify-end mt-1">
            <button
              type="button"
              onClick={() => onSwitchView('forgot_password')}
              className="text-xs text-primary hover:underline cursor-pointer"
            >
              {t('forgotPassword')}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50  cursor-pointer"
        >
          {t(isLoading ? 'signInProgress' : 'signIn')}
        </button>
      </form>

      <div className="text-center text-sm text-text-muted">
        {t('doNotHaveAccount')}
        <button
          onClick={() => onSwitchView('register')}
          className="ml-2 text-primary hover:underline font-semibold cursor-pointer"
        >
          {t('signUp')}
        </button>
      </div>
    </div>
  )
}

export default LoginForm
