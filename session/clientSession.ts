import axios, { AxiosRequestConfig } from 'axios'
import jwt_decode from 'jwt-decode'

import { apiEndpoint } from 'consts/endpoints'
import { getCookie, setCookie } from 'helpers/cookies'
import { TokenResponse, Token } from 'types/session'
import { TOKEN_COOKIE_KEY } from 'consts/cookies'

export interface IClientSession {
  getToken: () => string
  login: (username: string, password: string) => Promise<boolean>
}

export class ClientSession implements IClientSession {
  public getToken() {
    try {
      return getCookie(TOKEN_COOKIE_KEY)
    } catch (error) {
      return ''
    }
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
      const session: TokenResponse = response.data
      const decoded = jwt_decode<Token>(session.access_token)
      setCookie(TOKEN_COOKIE_KEY, session.access_token, decoded.exp)
      return true
    } catch (e) {
      console.log('ERROR: ', e)
    }
    return false
  }
}
