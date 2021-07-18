import 'reflect-metadata'
import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Cookies from 'cookies'
import dynamic from 'next/dynamic'

import { EditorError } from 'types/verifier'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import { GUIDE_DATA_VERIFIER } from 'consts/verifiers'
import { DEFAULT_GUIDE_DATA } from 'consts/defaults'
import { useGuideClient } from 'facades/materialClientFacade'
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
  const { service } = useMaterialDataServiceProvider(GUIDE_DATA_VERIFIER, DEFAULT_GUIDE_DATA)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchGuide(id as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    if (guide) {
      service.updateData(guide)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guide])

  const performDataCheck = () => {
    const errors = service.verifyData()
    setValidationErrors(errors)
  }

  const postGuideWrapped = () => {
    const currentData = service.currentData
    postGuide(currentData, id as string)
  }

  return (
    <LoadableEditorView
      submitData={postGuideWrapped}
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

export default GuideEditorController
