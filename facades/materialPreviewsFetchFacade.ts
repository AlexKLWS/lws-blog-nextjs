import { useRef, useState, useEffect } from 'react'
import { IMaterialPreviewFetchService, MaterialPreviewFetchServiceId } from 'services/materialPreviewsFetch'
import { useInjection } from 'services/provider'
import { Subscription } from 'rxjs'
import { Category, PreviewMaterial } from 'types/materials'
import { container } from 'services/container'

export const useMaterialPreviewsProvider = (withHidden?: boolean) => {
  const service = useRef(useInjection<IMaterialPreviewFetchService>(MaterialPreviewFetchServiceId))

  const fetchMaterialPreviews = (category: Category, page: string | number) => {
    service.current.fetchMaterialPreviews(category, page, withHidden)
  }

  const [materialPreviews, setMaterialPreviews] = useState<PreviewMaterial[]>([])
  const [pagesCount, setPagesCount] = useState<number>(1)
  const [fetchInProgress, setFetchInProgress] = useState(true)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.materialPreviews.subscribe((m) => {
        setMaterialPreviews(m.materialPreviews)
        setPagesCount(m.pagesCount)
        setFetchInProgress(m.fetchInProgress)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { materialPreviews, pagesCount, fetchInProgress, fetchMaterialPreviews }
}

export const serverSideMaterialPreviewsProvider = (category: Category, page: string | number, withHidden: boolean) => {
  const service = container.get<IMaterialPreviewFetchService>(MaterialPreviewFetchServiceId)

  const fetchMaterialPreviews = () => {
    return service.fetchMaterialPreviews(category, page, withHidden)
  }

  return { fetchMaterialPreviews }
}
