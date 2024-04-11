import { Axios, AxiosPromise } from 'axios'
import { Endpoints } from '../endpoints'
import { axiosInstance } from '../instance'
import { ILoginRequest, ILoginresponse } from './types'

export const login = (params: ILoginRequest): AxiosPromise<ILoginresponse> =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, params)

export const logout = (): AxiosPromise => {
  return axiosInstance.get(Endpoints.AUTH.LOGOUT)
}

export const getProfile = (): AxiosPromise<string> =>
  axiosInstance.get(Endpoints.AUTH.PROFILE)
