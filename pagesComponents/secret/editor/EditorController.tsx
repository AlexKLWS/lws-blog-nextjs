import 'reflect-metadata'
import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Cookies from 'cookies'
import dynamic from 'next/dynamic'

import { useArticleClient } from 'facades/materialClientFacade'
import { EditorError } from 'types/verifier'
import { DEFAULT_ARTICLE_DATA } from 'consts/defaults'
import { ARTICLE_DATA_VERIFIER } from 'consts/verifiers'
import { TOKEN_COOKIE_KEY } from 'consts/cookies'
import { userAccessServerSideProvider } from 'facades/sessionFacade'
import { FormDataProvider } from 'components/Forms/FormProvider'

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
      {({ onSubmit, validateWrapped }: any) => (
        <LoadableEditorView
          validationErrors={validationErrors}
          submitData={onSubmit}
          performDataCheck={validateWrapped}
          isLoading={isLoading}
          postError={error}
          clearPostError={clearError}
          postWasSuccess={postWasSuccess}
          clearPostSuccessFlag={clearPostSuccessFlag}
        />
      )}
    </FormDataProvider>
  )
}

export default EditorController
