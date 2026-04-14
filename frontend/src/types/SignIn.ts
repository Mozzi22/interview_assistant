import { TServerResponse } from '@/types/common'

export type TSignInParams = {
  email: string
  password: string
}

export type TTokenRequest = {
  token: string
  user: { id: string; email: string }
}

export type TSignInResponse = TServerResponse<TTokenRequest>

export type TRegistrationParams = {
  email: string
  password: string
  confirm_password: string
}

export type TRegistrationResponse = TServerResponse<TTokenRequest>

export type TResetPasswordParams = {
  email: string
}

export type TConfirmResetPasswordParams = {
  code: string
  email: string
  password: string
}

export type TResetPasswordResponse = TServerResponse<{
  message: string
}>
