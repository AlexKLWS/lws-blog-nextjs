import axios, { AxiosRequestConfig } from 'axios'

import { apiEndpoint } from 'consts/endpoints'
import { getAuthHeader } from 'helpers/getAuthHeader'
import { IClientSession } from 'session/clientSession'
import { Article, ExtMaterial, Guide, Material, MaterialPostResult } from 'types/materials'

export interface IMaterialPoster<T extends Material> {
  postArticle: (article: Article, referenceId?: string) => Promise<MaterialPostResult<T>>
  postExtMaterial: (page: ExtMaterial, referenceId?: string) => Promise<MaterialPostResult<T>>
  postGuide: (guide: Guide, referenceId?: string) => Promise<MaterialPostResult<T>>
}

export class MaterialPoster<T extends Material> implements IMaterialPoster<T> {
  private readonly _clientSession?: IClientSession

  constructor(clientSession?: IClientSession) {
    this._clientSession = clientSession
  }

  private _processIconDimensions(iconWidth: string | null, iconHeight: string | null) {
    let width
    if (iconWidth && iconWidth.length > 0) {
      width = iconWidth
    } else {
      width = iconHeight && iconHeight.length > 0 ? iconHeight : null
    }
    let height
    if (iconHeight && iconHeight.length > 0) {
      height = iconHeight
    } else {
      height = iconWidth && iconWidth.length > 0 ? iconWidth : null
    }
    return [width, height]
  }

  private async _prepareMaterialForPost<T extends Material>(data: Material, referenceId?: string): Promise<T> {
    let transformedData = { referenceId, ...data } as T
    let iconText = ''
    if (typeof transformedData.icon.data === 'string') {
      iconText = transformedData.icon.data
    } else {
      // @ts-expect-error
      iconText = await transformedData.icon.data.text()
    }
    const [iconWidth, iconHeight] = this._processIconDimensions(
      String(transformedData.icon.width),
      String(transformedData.icon.height),
    )
    transformedData.icon.data = iconText
    transformedData.icon.width = iconWidth
    transformedData.icon.height = iconHeight
    return transformedData
  }

  private postMaterial = async (url: string, material: T, referenceId?: string): Promise<MaterialPostResult<T>> => {
    try {
      const data = await this._prepareMaterialForPost<T>(material, referenceId)

      const request: AxiosRequestConfig = {
        method: 'POST',
        url,
        headers: {
          ...getAuthHeader(this._clientSession?.getToken()),
          'Content-Type': 'application/json',
        },
        data,
      }

      const response = await axios(request)
      return [response.data, null]
    } catch (e) {
      console.log('ERROR: ', e)
      return [null, e]
    }
  }

  public async postExtMaterial(extMaterial: ExtMaterial, referenceId?: string) {
    return this.postMaterial(`${apiEndpoint}/ext-materials`, extMaterial as any, referenceId)
  }

  public async postArticle(article: Article, referenceId?: string) {
    return this.postMaterial(`${apiEndpoint}/articles`, article as any, referenceId)
  }

  public async postGuide(guide: Guide, referenceId?: string) {
    return this.postMaterial(`${apiEndpoint}/guides`, guide as any, referenceId)
  }
}
