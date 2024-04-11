import { AxiosPromise } from 'axios'
import { Endpoints } from '../endpoints'
import { axiosInstance } from '../instance'
import { ILoginRequest, ILoginresponse } from './types'

export const login = (params: ILoginRequest): AxiosPromise<ILoginresponse> =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, params)
