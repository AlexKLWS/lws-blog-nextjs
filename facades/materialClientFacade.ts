import { useEffect, useRef, useState } from 'react'
import { Subscription } from 'rxjs/internal/Subscription'

import { useInjection } from 'services/provider'
import { MaterialClientServiceId, IMaterialClientService } from 'services/materialClient'
import { Article, ExtMaterial, Guide } from 'types/materials'
import { container } from 'services/container'

export const useArticleClient = () => {
  const service = useRef(useInjection<IMaterialClientService<Article>>(MaterialClientServiceId))

  const postArticle = (article: Article, referenceId?: string) => {
    service.current.postArticle(article, referenceId)
  }

  const fetchArticle = (id: string) => {
    service.current.fetchArticle(id)
  }

  const clearError = () => {
    service.current.clearError()
  }

  const clearPostSuccessFlag = () => {
    service.current.clearPostSuccessFlag()
  }

  const [article, setArticle] = useState<Article | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postWasSuccess, setPostWasSuccess] = useState<boolean>(false)

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
      service.current.postWasSuccess.subscribe((s) => {
        setPostWasSuccess(s)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { article, error, isLoading, postArticle, fetchArticle, clearError, postWasSuccess, clearPostSuccessFlag }
}

export const serverSideArticleClient = () => {
  const service = container.get<IMaterialClientService<Article>>(MaterialClientServiceId)

  const fetchArticle = (id: string) => {
    return service.fetchArticle(id)
  }

  return { fetchArticle }
}

export const useGuideClient = () => {
  const service = useRef(useInjection<IMaterialClientService<Guide>>(MaterialClientServiceId))

  const postGuide = (guide: Guide, referenceId?: string) => {
    service.current.postGuide(guide, referenceId)
  }

  const fetchGuide = (id: string) => {
    service.current.fetchGuide(id)
  }

  const clearError = () => {
    service.current.clearError()
  }

  const clearPostSuccessFlag = () => {
    service.current.clearPostSuccessFlag()
  }

  const [guide, setGuide] = useState<Guide | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postWasSuccess, setPostWasSuccess] = useState<boolean>(false)

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
      service.current.postWasSuccess.subscribe((s) => {
        setPostWasSuccess(s)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { guide, error, isLoading, postGuide, fetchGuide, clearError, postWasSuccess, clearPostSuccessFlag }
}

export const serverSideGuideClient = () => {
  const service = container.get<IMaterialClientService<Guide>>(MaterialClientServiceId)

  const fetchGuide = (id: string) => {
    return service.fetchGuide(id)
  }

  return { fetchGuide }
}

export const useExtMaterialClient = () => {
  const service = useRef(useInjection<IMaterialClientService<ExtMaterial>>(MaterialClientServiceId))

  const postExtMaterial = (extMaterial: ExtMaterial, referenceId?: string) => {
    service.current.postExtMaterial(extMaterial, referenceId)
  }

  const fetchExtMaterial = (id: string) => {
    service.current.fetchExtMaterial(id)
  }

  const clearError = () => {
    service.current.clearError()
  }

  const clearPostSuccessFlag = () => {
    service.current.clearPostSuccessFlag()
  }

  const [extMaterial, setExtMaterial] = useState<ExtMaterial | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postWasSuccess, setPostWasSuccess] = useState<boolean>(false)

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
      service.current.postWasSuccess.subscribe((s) => {
        setPostWasSuccess(s)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return {
    extMaterial,
    error,
    isLoading,
    postExtMaterial,
    fetchExtMaterial,
    clearError,
    postWasSuccess,
    clearPostSuccessFlag,
  }
}
