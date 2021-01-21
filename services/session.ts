import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'
import jwt_decode from 'jwt-decode'

import { apiEndpoint } from 'consts/endpoints'
import { getCookie, setCookie } from 'helpers/cookies'
import { Session, Token } from 'types/session'
import { UserAccess } from 'types/user'
import { getAuthHeader } from 'helpers/getAuthHeader'
import { TOKEN_COOKIE_KEY } from 'consts/cookies'

export interface ISessionService {
  isTokenPresent: boolean
  getToken: () => string
  addOnManualUpdateCallback: (key: string, callback: () => void) => void
  login: (username: string, password: string) => Promise<boolean>
  checkUserAccess: (token?: string) => Promise<UserAccess | undefined>
}

@injectable()
export class SessionService implements ISessionService {
  private readonly _manualUpdateCallbacks: Map<string, () => void> = new Map()

  public get isTokenPresent() {
    try {
      return !!getCookie(TOKEN_COOKIE_KEY)
    } catch (error) {
      console.log('🚀 ~ file: session.ts ~ line 25 ~ SessionService ~ getisTokenPresent ~ error', error)
      return false
    }
  }

  public getToken() {
    try {
      return getCookie(TOKEN_COOKIE_KEY)
    } catch (error) {
      console.log('🚀 ~ file: session.ts ~ line 29 ~ SessionService ~ getToken ~ error', error)
      return ''
    }
  }

  public addOnManualUpdateCallback(key: string, callback: () => void) {
    this._manualUpdateCallbacks.set(key, callback)
  }

  public async login(username: string, password: string) {
    const data = new FormData()
    data.append('username', username)
    data.append('password', password)

    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `${apiEndpoint}/login`,
      data,
    }

    try {
      const response = await axios(request)
      const session: Session = response.data
      const decoded = jwt_decode<Token>(session.access_token)
      setCookie(TOKEN_COOKIE_KEY, session.access_token, decoded.exp)
      this._manualUpdateCallbacks.forEach((callback) => {
        callback()
      })
      return true
    } catch (e) {
      console.log('ERROR: ', e)
    }
    return false
  }

  public async checkUserAccess(token?: string) {
    const request: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiEndpoint}/auth/user-access`,
      headers: {
        ...getAuthHeader(token || this.getToken()),
      },
    }

    try {
      const response = await axios(request)
      console.log('🚀 ~ file: session.ts ~ line 80 ~ SessionService ~ checkUserAccess ~ response', response)
      return response.data as UserAccess
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }
}

export const SessionServiceId = Symbol('SessionService')
