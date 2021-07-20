import axios, { AxiosRequestConfig } from 'axios'

import { Category } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'
import { PagePreviewsData } from 'types/pagePreviewData'
import { ISessionService } from './session'
import { getAuthHeader } from 'helpers/getAuthHeader'

export interface IMaterialPreviewFetchService {
  fetchMaterialPreviews: (
    category: Category,
    page: string | number,
    includeHidden?: boolean,
  ) => Promise<[PagePreviewsData | null, Error | null]>
}

interface RequestParams {
  page?: string | number
  category?: number
  include_hidden?: boolean
}

const PAGE_PREVIEW_DATA_DEFAULTS = {
  materialPreviews: [],
  pagesCount: 1,
  fetchInProgress: true,
}

export class MaterailPreviewFetchService implements IMaterialPreviewFetchService {
  private readonly _sessionService: ISessionService

  public constructor(sessionService: ISessionService) {
    this._sessionService = sessionService
  }

  public async fetchMaterialPreviews(
    category: Category,
    page: string | number,
    includeHidden?: boolean,
  ): Promise<[PagePreviewsData | null, Error | null]> {
    const params: RequestParams = {
      category,
      page,
      include_hidden: includeHidden,
    }

    const request: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        ...getAuthHeader(this._sessionService.getToken()),
        'Content-Type': 'application/json',
      },
      url: `${apiEndpoint}/previews`,
      params,
    }

    try {
      const response = await axios(request)
      const responseData = response.data
        ? { materialPreviews: response.data.previews, pagesCount: response.data.pageCount, fetchInProgress: false }
        : PAGE_PREVIEW_DATA_DEFAULTS
      return [responseData, null]
    } catch (e) {
      console.log('ERROR: ', e)
      return [null, e]
    }
  }

  public async fetchMaterialsForCategory(category: Category) {
    return Promise.resolve()
  }
}
