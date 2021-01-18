import { useRef, useState, useEffect } from 'react'
import { IMaterialPreviewFetchService, MaterialPreviewFetchServiceId } from 'services/materialPreviewsFetch'
import { useInjection } from 'services/provider'
import { Subscription } from 'rxjs'
import { Category, PreviewMaterial } from 'types/materials'

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
