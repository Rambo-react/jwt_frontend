import { Dispatch } from '@reduxjs/toolkit'
import { ILoginRequest } from '../../api/auth/types'
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from './authReducer'
import api from '../../api'
import { redirect } from 'react-router-dom'

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart())

      const res = await api.auth.login(data)

      dispatch(loginSuccess(res.data.accessToken))
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
