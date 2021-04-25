import Head from 'next/head'
import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'

import ArticleView from './ArticleView'
import { serverSideArticleClient } from 'facades/materialClientFacade'
import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'
import { Article } from 'types/materials'
import { baseURL } from 'consts/endpoints'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { fetchArticle } = serverSideArticleClient()
  if (!context.params) {
    return {
      props: {},
    }
  }
  const response = await fetchArticle((context.params['id'] as string) || '')
  return {
    props: { article: response.material, error: response.error },
  }
}

type Props = {
  article: Article
  error?: Error
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

    return 'Personal blog by Alex Korzh'
  }

  return (
    <>
      <Head>
        <title>{`${props.article?.name} - Alex Korzh`}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:image' content='/og_image.png' />
        <meta property='og:url' content={baseURL} />
        <meta property='og:type' content='blog' />
        <meta property='og:title' content={props.article?.name || 'Long Winter Shadows'} />
        <meta property='og:description' content={props.article?.subtitle || ''} />
        <meta name='twitter:card' content='summary' />
        <meta name='description' content={getMetaDescription()} />
      </Head>
      <ArticleView article={props.article} />
    </>
  )
}

export default ArticleController
