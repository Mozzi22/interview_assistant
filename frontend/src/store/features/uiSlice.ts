import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthView } from '@/components/auth/AuthModal'
import { RootState } from '@/store'

interface UiState {
  modal: null | AuthView
}

const initialState: UiState = {
  modal: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<UiState['modal']>) => {
      state.modal = action.payload
    }
  }
})

export const { setModal } = uiSlice.actions

export const selectModal = (state: RootState) => state.ui.modal

export default uiSlice.reducer
