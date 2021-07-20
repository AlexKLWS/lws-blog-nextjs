import axios, { AxiosRequestConfig } from 'axios'
import { GetServerSidePropsContext } from 'next'
import Cookies from 'cookies'
import { ParsedUrlQuery } from 'node:querystring'

import { TOKEN_COOKIE_KEY } from 'consts/cookies'
import { apiEndpoint } from 'consts/endpoints'
import { getAuthHeader } from 'helpers/getAuthHeader'
import { UserAccess } from 'types/user'

export interface IServerSession {
  getToken: () => string | undefined
  checkUserAccess: () => Promise<[UserAccess | null, Error | null]>
}

export class ServerSession {
  private readonly _token?: string

  constructor(context: GetServerSidePropsContext<ParsedUrlQuery>) {
    const cookies = new Cookies(context.req, context.res)
    const token = cookies.get(TOKEN_COOKIE_KEY)
    this._token = token
  }

  public getToken() {
    return this._token
  }

  public checkUserAccess = async (): Promise<[UserAccess | null, Error | null]> => {
    try {
      const request: AxiosRequestConfig = {
        method: 'GET',
        url: `${apiEndpoint}/auth/user-access`,
        headers: {
          ...getAuthHeader(this.getToken()),
        },
      }

      const response = await axios(request)
      return [response.data as UserAccess, null]
    } catch (e) {
      console.log('ERROR: ', e)
      return [null, e]
    }
  }
}
