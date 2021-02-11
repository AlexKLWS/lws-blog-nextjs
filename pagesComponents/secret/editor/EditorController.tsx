import 'reflect-metadata'
import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Cookies from 'cookies'
import dynamic from 'next/dynamic'

import { useArticleClient } from 'facades/materialClientFacade'
import { EditorError } from 'types/verifier'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import { DEFAULT_ARTICLE_DATA } from 'consts/defaults'
import { ARTICLE_DATA_VERIFIER } from 'consts/verifiers'
import { TOKEN_COOKIE_KEY } from 'consts/cookies'
import { userAccessServerSideProvider } from 'facades/sessionFacade'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res)
  const token = cookies.get(TOKEN_COOKIE_KEY)
  const { checkUserAccess } = userAccessServerSideProvider()
  const response = await checkUserAccess(token)
  if (response === undefined) {
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

const LoadableEditorView = dynamic(() => import('./EditorView'), {
  loading: () => {
    return <div>LOADING</div>
  },
})

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
  const { service } = useMaterialDataServiceProvider(ARTICLE_DATA_VERIFIER, DEFAULT_ARTICLE_DATA)

  const [validationErrors, setValidationErrors] = useState<EditorError[]>([])
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchArticle(id as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    if (article) {
      service.updateData(article)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article])

  const performDataCheck = () => {
    const errors = service.verifyData()
    setValidationErrors(errors)
  }

  const postArticleWrapped = () => {
    const currentData = service.currentData
    postArticle(currentData, id as string)
  }

  return (
    <LoadableEditorView
      serviceInstance={service}
      submitData={postArticleWrapped}
      performDataCheck={performDataCheck}
      validationErrors={validationErrors}
      isLoading={isLoading}
      postError={error}
      clearPostError={clearError}
      postWasSuccess={postWasSuccess}
      clearPostSuccessFlag={clearPostSuccessFlag}
    />
  )
}

export default EditorController
