import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'

import { ArticleView } from './ArticleView'
import { serverSideArticleClient } from 'facades/materialClientFacade'
import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'
import { Article } from 'types/materials'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { fetchArticle } = serverSideArticleClient()
  if (!context.params) {
    return {
      props: {},
    }
  }
  const response = await fetchArticle(context.params['id'] || '')
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

  return <ArticleView article={props.article} />
}

export default ArticleController
