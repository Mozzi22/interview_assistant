import {
  TConfirmResetPasswordParams,
  TRegistrationParams,
  TRegistrationResponse,
  TResetPasswordParams,
  TResetPasswordResponse,
  TSignInParams,
  TSignInResponse
} from '@/types/SignIn'
import { API_METHODS, SIGN_IN_API } from '@/utils/constants/api'

import { apiSlice } from './api'

export const signInApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<TRegistrationResponse, TRegistrationParams>({
      query: (body) => ({
        url: SIGN_IN_API.REGISTRATION,
        method: API_METHODS.POST,
        body
      })
    }),
    signIn: build.mutation<TSignInResponse, TSignInParams>({
      query: (body) => ({
        url: SIGN_IN_API.LOGIN,
        method: API_METHODS.POST,
        body
      })
    }),
    resetPassword: build.mutation<TResetPasswordResponse, TResetPasswordParams>(
      {
        query: (body) => ({
          url: SIGN_IN_API.RESET_PASSWORD_REQUEST,
          method: API_METHODS.POST,
          body
        })
      }
    ),
    confirmResetPassword: build.mutation<
      TResetPasswordResponse,
      TConfirmResetPasswordParams
    >({
      query: (body) => ({
        url: SIGN_IN_API.RESET_PASSWORD_CONFIRM,
        method: API_METHODS.POST,
        body
      })
    })
  })
})

export const {
  useRegistrationMutation,
  useSignInMutation,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation
} = signInApi
