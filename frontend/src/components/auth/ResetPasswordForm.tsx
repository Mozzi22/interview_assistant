import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  ConfirmResetPasswordFormData,
  confirmResetPasswordValidation,
  ResetPasswordFormData,
  resetPasswordValidation
} from '@/components/auth/validation'
import PasswordInput from '@/components/ui/PasswordInput'
import {
  useConfirmResetPasswordMutation,
  useResetPasswordMutation
} from '@/store/services/signInApi'

import type { AuthView } from './AuthModal'

interface Props {
  onSwitchView: (view: AuthView) => void
}

const ResetPasswordForm = ({ onSwitchView }: Props) => {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const t = useTranslations('Auth')
  const tValidation = useTranslations('Validation')

  const reqSchema = resetPasswordValidation(tValidation)
  const confSchema = confirmResetPasswordValidation(tValidation)
  const reqForm = useForm<ResetPasswordFormData>({
    resolver: yupResolver(reqSchema)
  })
  const confForm = useForm<ConfirmResetPasswordFormData>({
    resolver: yupResolver(confSchema)
  })

  const [resetPassword] = useResetPasswordMutation()
  const [confirmResetPassword] = useConfirmResetPasswordMutation()

  const onRequestCode = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    setError('')
    try {
      await resetPassword(data).unwrap()
      setEmail(data.email)
      setStep(2)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.data?.error)
    } finally {
      setIsLoading(false)
    }
  }

  const onConfirmReset = async (data: ConfirmResetPasswordFormData) => {
    setIsLoading(true)
    setError('')
    try {
      await confirmResetPassword({ email, ...data }).unwrap()
      onSwitchView('login')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err)
      setError(err?.data?.error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
          {t('resetPassword')}
        </h2>
        <p className="text-sm text-text-muted mt-2">
          {t(step === 1 ? 'receiveEmail' : 'confirmReceiveEmail')}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-error-bg text-error rounded-lg text-sm">
          {error}
        </div>
      )}

      {step === 1 ? (
        <form
          key="form-1"
          onSubmit={reqForm.handleSubmit(onRequestCode)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {tValidation('email')}
            </label>
            <input
              {...reqForm.register('email')}
              type="email"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
              placeholder="you@example.com"
            />
            {reqForm.formState.errors.email && (
              <p className="text-error text-xs mt-1">
                {reqForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 mt-2 cursor-pointer"
          >
            {t(isLoading ? 'sendResetCodeProgress' : 'sendResetCode')}
          </button>
        </form>
      ) : (
        <form
          key="form-2"
          onSubmit={confForm.handleSubmit(onConfirmReset)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t('resetCode')}
            </label>
            <input
              {...confForm.register('code')}
              type="text"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
              placeholder="123456"
            />
            {confForm.formState.errors.code && (
              <p className="text-error text-xs mt-1">
                {confForm.formState.errors.code.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t('newPassword')}
            </label>
            <PasswordInput registration={confForm.register('password')} />
            {confForm.formState.errors.password && (
              <p className="text-error text-xs mt-1">
                {confForm.formState.errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 mt-2 cursor-pointer"
          >
            {t(isLoading ? 'resetPasswordProgress' : 'resetPassword')}
          </button>
        </form>
      )}

      <div className="text-center text-sm text-text-muted mt-4">
        {t('rememberPassword')}
        <button
          onClick={() => onSwitchView('login')}
          className="ml-2 text-primary hover:underline font-semibold cursor-pointer"
        >
          {t('signIn')}
        </button>
      </div>
    </div>
  )
}

export default ResetPasswordForm
