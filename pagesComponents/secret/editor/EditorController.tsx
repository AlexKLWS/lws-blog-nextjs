import 'reflect-metadata'
import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { useArticleClient } from 'facades/materialClientFacade'
import { EditorError } from 'types/verifier'
import { DEFAULT_ARTICLE_DATA } from 'consts/defaults'
import { ARTICLE_DATA_VERIFIER } from 'consts/verifiers'
import { getServerSession } from 'facades/sessionFacade'
import { FormDataProvider } from 'components/Forms/FormProvider'
import EditorView from './EditorView'

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
  return {
    props: {},
  }
}

const EditorController: React.FC = () => {
  const {
    article,
    fetchArticle,
    isLoading,
    postArticle,
    error,
    clearError,
    postWasSuccess,
    clearPostSuccessFlag,
  } = useArticleClient()
  const [validationErrors, setValidationErrors] = useState<EditorError[]>([])
  const router = useRouter()

  useEffect(() => {
    const { id } = router.query
    if (id) {
      fetchArticle(id as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const performDataCheck = (errors: EditorError[]) => {
    setValidationErrors(errors)
  }

  const postArticleWrapped = (currentData: any) => {
    const { id } = router.query
    postArticle(currentData, id as string)
  }

  return (
    <FormDataProvider
      defaultData={article || DEFAULT_ARTICLE_DATA}
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
