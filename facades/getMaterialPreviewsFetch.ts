import { MaterailPreviewFetchService } from 'services/materialPreviewsFetch'
import { Category } from 'types/materials'
import { IServerSession } from 'session/serverSession'

export const getMaterialPreviewsFetch = (serverSession?: IServerSession) => {
  const service = new MaterailPreviewFetchService(serverSession)

  const fetchMaterialPreviews = (category: Category, page: string | number, withHidden: boolean) => {
    return service.fetchMaterialPreviews(category, page, withHidden)
  }

  return { fetchMaterialPreviews }
}
