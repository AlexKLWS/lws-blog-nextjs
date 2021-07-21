import { useRef } from 'react'

import { Article, ExtMaterial, Guide } from 'types/materials'
import { MaterialFetcher } from 'services/materialFetch'
import { IServerSession } from 'session/serverSession'
import { MaterialPoster } from 'services/materialPost'
import { ClientSession } from 'session/clientSession'

export const useArticlePoster = () => {
  const poster = useRef(new MaterialPoster<Article>(new ClientSession())).current

  const postArticle = (article: Article, referenceId?: string) => {
    return poster.postArticle(article, referenceId)
  }

  return { postArticle }
}

export const getArticleFetcher = (session?: IServerSession) => {
  const fetcher = new MaterialFetcher<Article>(session)

  const fetchArticle = (id: string) => {
    return fetcher.fetchArticle(id)
  }

  return { fetchArticle }
}

export const useGuidePoster = () => {
  const poster = useRef(new MaterialPoster<Guide>(new ClientSession())).current

  const postGuide = (article: Guide, referenceId?: string) => {
    return poster.postGuide(article, referenceId)
  }

  return { postGuide }
}

export const getGuideFetcher = (session?: IServerSession) => {
  const fetcher = new MaterialFetcher<Guide>(session)

  const fetchGuide = (id: string) => {
    return fetcher.fetchGuide(id)
  }

  return { fetchGuide }
}

export const useExtMaterialPoster = () => {
  const poster = useRef(new MaterialPoster<ExtMaterial>(new ClientSession())).current

  const postExtMaterial = (article: ExtMaterial, referenceId?: string) => {
    return poster.postExtMaterial(article, referenceId)
  }

  return { postExtMaterial }
}

export const getExtMaterialFetcher = (session?: IServerSession) => {
  const fetcher = new MaterialFetcher<ExtMaterial>(session)

  const fetchExtMaterial = (id: string) => {
    return fetcher.fetchExtMaterial(id)
  }

  return { fetchExtMaterial }
}
