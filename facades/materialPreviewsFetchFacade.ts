import { MaterailPreviewFetchService } from 'services/materialPreviewsFetch'
import { Category } from 'types/materials'
import { ISessionService } from 'services/session'

export const serverSideMaterialPreviewsProvider = (sessionService: ISessionService) => {
  const service = new MaterailPreviewFetchService(sessionService)

  const fetchMaterialPreviews = (category: Category, page: string | number, withHidden: boolean) => {
    return service.fetchMaterialPreviews(category, page, withHidden)
  }

  return { fetchMaterialPreviews }
}
