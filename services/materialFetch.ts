import axios, { AxiosRequestConfig } from 'axios'

import { apiEndpoint } from 'consts/endpoints'
import { getAuthHeader } from 'helpers/getAuthHeader'
import { IServerSession } from 'session/serverSession'
import { Material, MaterialFetchResult } from 'types/materials'

export interface IMaterialFetcher<T extends Material> {
  fetchArticle: (id: string) => Promise<MaterialFetchResult<T>>
  fetchExtMaterial: (id: string) => Promise<MaterialFetchResult<T>>
  fetchGuide: (id: string) => Promise<MaterialFetchResult<T>>
}

export class MaterialFetcher<T extends Material> implements IMaterialFetcher<T> {
  private readonly _serverSession?: IServerSession

  constructor(serverSession?: IServerSession) {
    this._serverSession = serverSession
  }

  private fetchMaterial = async (url: string, id: string): Promise<MaterialFetchResult<T>> => {
    try {
      const params = {
        id,
      }

      const request: AxiosRequestConfig = {
        method: 'GET',
        url,
        params,
        headers: {
          ...getAuthHeader(this._serverSession?.getToken()),
        },
      }

      const response = await axios(request)
      return [response.data, null]
    } catch (e) {
      console.log('ERROR: ', e)
      return [null, e]
    }
  }

  public fetchArticle = async (id: string): Promise<MaterialFetchResult<T>> => {
    return this.fetchMaterial(`${apiEndpoint}/articles`, id)
  }

  public fetchExtMaterial = async (id: string): Promise<MaterialFetchResult<T>> => {
    return this.fetchMaterial(`${apiEndpoint}/ext-materials`, id)
  }

  public fetchGuide = async (id: string): Promise<MaterialFetchResult<T>> => {
    return this.fetchMaterial(`${apiEndpoint}/guides`, id)
  }
}
