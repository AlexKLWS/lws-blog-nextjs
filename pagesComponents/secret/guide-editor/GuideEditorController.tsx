import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { EditorError } from 'types/verifier'
import { GUIDE_DATA_VERIFIER } from 'consts/verifiers'
import { DEFAULT_GUIDE_DATA } from 'consts/defaults'
import { getGuideFetcher, useGuidePoster } from 'facades/materialClientFacade'
import { getServerSession } from 'facades/sessionFacade'
import { FormDataProvider } from 'components/Forms/FormProvider'
import GuideEditorView from './GuideEditorView'
import { Guide } from 'types/materials'

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
  const { fetchGuide } = getGuideFetcher(session)
  if (!context.params) {
    return {
      props: {},
    }
  }
  const [guide, guideFetchError] = await fetchGuide((context.params['id'] as string) || '')

  return {
    props: { guide, error: guideFetchError },
  }
}

type Props = {
  guide: Guide
  error?: Error
}

const GuideEditorController: React.FC<Props> = (props) => {
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [guide, setGuide] = useState<Guide | null>(null)
  const [postWasSuccess, setPostWasSuccess] = useState(false)

  const { postGuide } = useGuidePoster()
  const [validationErrors, setValidationErrors] = useState<EditorError[]>([])
  const router = useRouter()

  const performDataCheck = (errors: EditorError[]) => {
    setValidationErrors(errors)
  }

  const postGuideWrapped = async (currentData: any) => {
    const { id } = router.query
    setIsLoading(true)
    const [guideResponse, responseError] = await postGuide(currentData, id as string)
    if (responseError) {
      setError(responseError)
    } else {
      setGuide(guideResponse)
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
      defaultData={guide || props.guide || DEFAULT_GUIDE_DATA}
      onSubmit={postGuideWrapped}
      validate={performDataCheck}
      verifier={GUIDE_DATA_VERIFIER}
    >
      <GuideEditorView
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

export default GuideEditorController
