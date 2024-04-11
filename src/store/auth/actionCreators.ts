import { Dispatch } from '@reduxjs/toolkit'
import { ILoginRequest, ILoginResponse } from '../../api/auth/types'
import {
  loadProfileFailure,
  loadProfileStart,
  loadProfileSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from './authReducer'
import api from '../../api'
import { redirect } from 'react-router-dom'
import { AppDispatch, store } from '..'
import { AxiosPromise } from 'axios'
import { isTokenExpired } from '../../utils/jwt'

export const getProfile =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadProfileStart())

      const res = await api.auth.getProfile()

      dispatch(loadProfileSuccess(res.data))
    } catch (e: any) {
      console.error(e)

      dispatch(loadProfileFailure(e.message))
    }
  }

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(loginStart())

      const res = await api.auth.login(data)

      dispatch(loginSuccess(res.data.accessToken))
      dispatch(getProfile())
    } catch (e: any) {
      console.error(e)

      dispatch(loginFailure(e.message))
    }
  }

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await api.auth.logout()

      dispatch(logoutSuccess())

      redirect('/')
    } catch (e) {
      console.error(e)
    }
  }

//переменная для хранения запроса токена(для избежания "состояния гонки")
let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null

export const getAccessToken =
  () =>
  async (dispatch: Dispatch<any>): Promise<string | null> => {
    try {
      const accessToken = store.getState().auth.authData.accessToken
      // debugger
      if (!accessToken || isTokenExpired(accessToken)) {
        if (refreshTokenRequest === null) {
          refreshTokenRequest = api.auth.refreshToken()
        }

        const res = await refreshTokenRequest
        refreshTokenRequest = null

        dispatch(loginSuccess(res.data.accessToken))

        return res.data.accessToken
      }
      return accessToken
    } catch (e) {
      console.error(e)
      return null
    }
  }
