import { useEffect, useRef, useState } from 'react'
import { Subscription } from 'rxjs/internal/Subscription'

import { useInjection } from 'services/provider'
import { MaterialClientServiceId, IMaterialClientService } from 'services/materialClient'
import { Article, ExtMaterial, Guide } from 'types/materials'

export const useArticleClient = () => {
  const service = useRef(useInjection<IMaterialClientService<Article>>(MaterialClientServiceId))

  const postArticle = (article: Article, referenceId?: string) => {
    service.current.postArticle(article, referenceId)
  }

  const fetchArticle = (id: string) => {
    service.current.fetchArticle(id)
  }

  const [article, setArticle] = useState<Article | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.material.subscribe((a) => {
        setArticle(a)
      }),
      service.current.error.subscribe((e) => {
        setError(e)
      }),
      service.current.isLoading.subscribe((l) => {
        setIsLoading(l)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { article, error, isLoading, postArticle, fetchArticle }
}

export const useGuideClient = () => {
  const service = useRef(useInjection<IMaterialClientService<Guide>>(MaterialClientServiceId))

  const postGuide = (guide: Guide, referenceId?: string) => {
    service.current.postGuide(guide, referenceId)
  }

  const fetchGuide = (id: string) => {
    service.current.fetchGuide(id)
  }

  const [guide, setGuide] = useState<Guide | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.material.subscribe((g) => {
        setGuide(g)
      }),
      service.current.error.subscribe((e) => {
        setError(e)
      }),
      service.current.isLoading.subscribe((l) => {
        setIsLoading(l)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { guide, error, isLoading, postGuide, fetchGuide }
}

export const useExtMaterialClient = () => {
  const service = useRef(useInjection<IMaterialClientService<ExtMaterial>>(MaterialClientServiceId))

  const postExtMaterial = (extMaterial: ExtMaterial, referenceId?: string) => {
    service.current.postExtMaterial(extMaterial, referenceId)
  }

  const fetchExtMaterial = (id: string) => {
    service.current.fetchExtMaterial(id)
  }

  const [extMaterial, setExtMaterial] = useState<ExtMaterial | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.material.subscribe((g) => {
        setExtMaterial(g)
      }),
      service.current.error.subscribe((e) => {
        setError(e)
      }),
      service.current.isLoading.subscribe((l) => {
        setIsLoading(l)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { extMaterial, error, isLoading, postExtMaterial, fetchExtMaterial }
}
