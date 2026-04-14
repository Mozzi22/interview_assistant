import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/store'
import { signInApi } from '@/store/services/signInApi'

interface UsersState {
  isAuthenticated: boolean
  user: null | { id: string; email: string }
  token: null | string
}

const initialState: UsersState = {
  isAuthenticated: false,
  user: null,
  token: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthenticated: (
      state,
      action: PayloadAction<UsersState['isAuthenticated']>
    ) => {
      state.isAuthenticated = action.payload
    },
    logout: () => initialState
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      signInApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.data.user
        state.token = action.payload.data.token
      }
    )
    builder.addMatcher(
      signInApi.endpoints.registration.matchFulfilled,
      (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.data.user
        state.token = action.payload.data.token
      }
    )
  }
})

export const { setIsAuthenticated, logout } = userSlice.actions

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated

export default userSlice.reducer
