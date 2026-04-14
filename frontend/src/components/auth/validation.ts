import { useTranslations } from 'next-intl'
import * as yup from 'yup'

export const loginValidation = (
  t: ReturnType<typeof useTranslations<'Validation'>>
) =>
  yup
    .object({
      email: yup
        .string()
        .required(t('isRequired', { field: t('email') }))
        .email(t('isInvalidEmail')),
      password: yup
        .string()
        .required(t('isRequired', { field: t('password') }))
        .min(6, t('mustBeAtLeast', { field: t('password'), count: 6 }))
    })
    .required()

export type LoginFormData = yup.InferType<ReturnType<typeof loginValidation>>

export const registrationValidation = (
  t: ReturnType<typeof useTranslations<'Validation'>>
) =>
  yup
    .object({
      email: yup
        .string()
        .required(t('isRequired', { field: t('email') }))
        .email(t('isInvalidEmail')),
      password: yup
        .string()
        .required(t('isRequired', { field: t('password') }))
        .min(6, t('mustBeAtLeast', { field: t('password'), count: 6 })),
      confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], t('passwordMustMatch'))
        .required('Required')
    })
    .required()

export type RegistrationFormData = yup.InferType<
  ReturnType<typeof registrationValidation>
>

export const resetPasswordValidation = (
  t: ReturnType<typeof useTranslations<'Validation'>>
) =>
  yup
    .object({
      email: yup
        .string()
        .required(t('isRequired', { field: t('email') }))
        .email(t('isInvalidEmail'))
    })
    .required()

export type ResetPasswordFormData = yup.InferType<
  ReturnType<typeof resetPasswordValidation>
>

export const confirmResetPasswordValidation = (
  t: ReturnType<typeof useTranslations<'Validation'>>
) =>
  yup
    .object({
      code: yup.string().required(t('isRequired', { field: t('code') })),
      password: yup
        .string()
        .required(t('isRequired', { field: t('password') }))
        .min(6, t('mustBeAtLeast', { field: t('password'), count: 6 }))
    })
    .required()

export type ConfirmResetPasswordFormData = yup.InferType<
  ReturnType<typeof confirmResetPasswordValidation>
>
