import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { getArticleFetcher, useArticlePoster } from 'facades/materialClientFacade'
import { EditorError } from 'types/verifier'
import { DEFAULT_ARTICLE_DATA } from 'consts/defaults'
import { ARTICLE_DATA_VERIFIER } from 'consts/verifiers'
import { getServerSession } from 'facades/sessionFacade'
import { FormDataProvider } from 'components/Forms/FormProvider'
import EditorView from './EditorView'
import { Article } from 'types/materials'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getServerSession(context)
  const [_, error] = await session.checkUserAccess()
  if (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const { fetchArticle } = getArticleFetcher(session)
  if (!context.params) {
    return {
      props: {},
    }
  }
  const [article, articleFetchError] = await fetchArticle((context.params['id'] as string) || '')

  return {
    props: { article, error: articleFetchError },
  }
}

type Props = {
  article: Article
  error?: Error
}

const EditorController: React.FC<Props> = (props) => {
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [article, setArticle] = useState<Article | null>(null)
  const [postWasSuccess, setPostWasSuccess] = useState(false)

  const { postArticle } = useArticlePoster()
  const [validationErrors, setValidationErrors] = useState<EditorError[]>([])
  const router = useRouter()

  const performDataCheck = (errors: EditorError[]) => {
    setValidationErrors(errors)
  }

  const postArticleWrapped = async (currentData: any) => {
    const { id } = router.query
    setIsLoading(true)
    const [articleResponse, responseError] = await postArticle(currentData, id as string)
    if (responseError) {
      setError(responseError)
    } else {
      setArticle(articleResponse)
      setPostWasSuccess(true)
    }
    setIsLoading(false)
  }

  const clearError = () => {
    setError(null)
  }

  const clearPostSuccessFlag = () => {
    setPostWasSuccess(false)
  }

  return (
    <FormDataProvider
      defaultData={article || props.article || DEFAULT_ARTICLE_DATA}
      onSubmit={postArticleWrapped}
      validate={performDataCheck}
      verifier={ARTICLE_DATA_VERIFIER}
    >
      <EditorView
        validationErrors={validationErrors}
        isLoading={isLoading}
        postError={error}
        clearPostError={clearError}
        postWasSuccess={postWasSuccess}
        clearPostSuccessFlag={clearPostSuccessFlag}
      />
    </FormDataProvider>
  )
}

export default EditorController
