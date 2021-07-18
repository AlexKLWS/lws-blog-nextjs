import 'reflect-metadata'
import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Cookies from 'cookies'
import dynamic from 'next/dynamic'

import { EditorError } from 'types/verifier'
import { GUIDE_DATA_VERIFIER } from 'consts/verifiers'
import { DEFAULT_GUIDE_DATA } from 'consts/defaults'
import { useGuideClient } from 'facades/materialClientFacade'
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

const LoadableEditorView = dynamic(() => import('./GuideEditorView'), {
  loading: () => {
    return <div>LOADING</div>
  },
})

const GuideEditorController = () => {
  const {
    guide,
    fetchGuide,
    postGuide,
    error,
    isLoading,
    clearError,
    postWasSuccess,
    clearPostSuccessFlag,
  } = useGuideClient()
  const [validationErrors, setValidationErrors] = useState<EditorError[]>([])

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchGuide(id as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const performDataCheck = (errors: EditorError[]) => {
    setValidationErrors(errors)
  }

  const postGuideWrapped = (currentData: any) => {
    postGuide(currentData, id as string)
  }

  return (
    <FormDataProvider
      defaultData={guide || DEFAULT_GUIDE_DATA}
      onSubmit={postGuideWrapped}
      validate={performDataCheck}
      verifier={GUIDE_DATA_VERIFIER}
    >
      {({ onSubmit, validateWrapped }: any) => (
        <LoadableEditorView
          submitData={onSubmit}
          performDataCheck={validateWrapped}
          validationErrors={validationErrors}
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

export default GuideEditorController
