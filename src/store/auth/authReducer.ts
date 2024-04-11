import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  authData: {
    accessToken: string | null
    isLoading: boolean
    error: string | null
  }
  profileData: {
    profile: string | null
    isLoading: boolean
    error: string | null
  }
}

const initialState: AuthState = {
  authData: {
    accessToken: null,
    isLoading: false,
    error: null,
  },
  profileData: {
    profile: null,
    isLoading: false,
    error: null,
  },
}

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state: AuthState) {
      state.authData.isLoading = true
    },
    loginSuccess(state: AuthState, action: PayloadAction<string>) {
      state.authData.accessToken = action.payload
      state.authData.isLoading = false
      state.authData.error = null
    },
    loginFailure(state: AuthState, action: PayloadAction<string>) {
      state.authData.isLoading = false
      state.authData.error = action.payload
    },
    loadProfileStart(state: AuthState) {
      state.profileData.isLoading = true
    },
    loadProfileSuccess(state: AuthState, action: PayloadAction<string>) {
      state.profileData.profile = action.payload
      state.profileData.isLoading = false
      state.profileData.error = null
    },
    loadProfileFailure(state: AuthState, action: PayloadAction<string>) {
      state.profileData.isLoading = false
      state.profileData.error = action.payload
    },
    logoutSuccess() {
      return initialState
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
  logoutSuccess,
} = authReducer.actions

export default authReducer.reducer
