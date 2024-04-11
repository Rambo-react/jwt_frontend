import { getUnixTime } from './date'

export interface IAuthTokenInfo {
  exp: number
  iat: number
  login: string
}

const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true
  }

  try {
    const tokenInfo = token.split('.')[1]
    const tokenInfoDecoded = window.atob(tokenInfo)
    const { exp, iat }: IAuthTokenInfo = JSON.parse(tokenInfoDecoded)

    // осталось времени для протухания токена
    const tokenleftTime = exp - getUnixTime()
    // рефреш токена при осташихся секундах
    const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_MULTIPLIER

    return tokenleftTime < minLifeTimeForUpdate
  } catch (e) {
    console.error(e)
    return true
  }
}
