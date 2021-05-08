import Head from 'next/head'
import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import absoluteUrl from 'next-absolute-url'

import ArticleView from './ArticleView'
import { serverSideArticleClient } from 'facades/materialClientFacade'
import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'
import { Article } from 'types/materials'
import { DEFAULT_AUTHOR_NAME, DEFAULT_DESCRIPTION, DEFAULT_TITLE, OPEN_GRAPH_IMAGE } from 'consts/metaDefaults'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { fetchArticle } = serverSideArticleClient()
  if (!context.params) {
    return {
      props: {},
    }
  }
  const response = await fetchArticle((context.params['id'] as string) || '')
  let fullUrl
  if (context.req) {
    // Server side rendering
    const { origin } = absoluteUrl(context.req)
    fullUrl = origin + context.req.url
  } else {
    // Client side rendering
    fullUrl =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
  }
  return {
    props: { article: response.material, error: response.error, fullUrl },
  }
}

type Props = {
  article: Article
  error?: Error
  fullUrl: string
}

const ArticleController: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (props.error) {
    return <FullscreenMessageView title={`Sorry!`} subtitle={`There's nothing here yet!`} />
  }

  const getMetaDescription = () => {
    if (props.article?.metaDescription) {
      return props.article?.metaDescription
    }

    if (props.article?.subtitle) {
      return props.article?.subtitle
    }

    return DEFAULT_DESCRIPTION
  }

  const getMetaTitle = () => {
    if (props.article?.name) {
      return `${props.article?.name} - ${DEFAULT_AUTHOR_NAME}`
    }

    return `${DEFAULT_TITLE} - ${DEFAULT_AUTHOR_NAME}`
  }

  return (
    <>
      <Head>
        <title>{getMetaTitle()}</title>
        <meta property='og:url' content={props.fullUrl} />
        <meta property='og:title' content={props.article?.name || `${DEFAULT_TITLE} - ${DEFAULT_AUTHOR_NAME}`} />
        <meta property='og:description' content={props.article?.subtitle || DEFAULT_DESCRIPTION} />
        <meta name='description' content={getMetaDescription()} />
      </Head>
      <ArticleView article={props.article} />
    </>
  )
}

export default ArticleController
