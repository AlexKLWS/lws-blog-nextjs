import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { EditorError } from 'types/verifier'
import { getExtMaterialFetcher, useExtMaterialPoster } from 'facades/materialClientFacade'
import { DEFAULT_EXT_MATERIAL_DATA } from 'consts/defaults'
import { PAGE_DATA_VERIFIER } from 'consts/verifiers'
import { getServerSession } from 'facades/sessionFacade'
import { FormDataProvider } from 'components/Forms/FormProvider'
import ExtMaterialEditorView from './ExtMaterialEditorView'
import { ExtMaterial } from 'types/materials'

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
  const { fetchExtMaterial } = getExtMaterialFetcher(session)
  if (!context.params) {
    return {
      props: {},
    }
  }
  const [extMaterial, extMaterialFetchError] = await fetchExtMaterial((context.params['id'] as string) || '')

  return {
    props: { extMaterial, error: extMaterialFetchError },
  }
}

type Props = {
  extMaterial: ExtMaterial
  error?: Error
}

const ExtMaterialEditorController: React.FC<Props> = (props) => {
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [extMaterial, setExtMaterial] = useState<ExtMaterial | null>(null)
  const [postWasSuccess, setPostWasSuccess] = useState(false)

  const { postExtMaterial } = useExtMaterialPoster()
  const [validationErrors, setValidationErrors] = useState<EditorError[]>([])
  const router = useRouter()

  const performDataCheck = (errors: EditorError[]) => {
    setValidationErrors(errors)
  }

  const postExtMaterialWrapped = async (currentData: any) => {
    const { id } = router.query
    setIsLoading(true)
    const [extMaterial, responseError] = await postExtMaterial(currentData, id as string)
    if (responseError) {
      setError(responseError)
    } else {
      setExtMaterial(extMaterial)
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
      defaultData={extMaterial || props.extMaterial || DEFAULT_EXT_MATERIAL_DATA}
      onSubmit={postExtMaterialWrapped}
      validate={performDataCheck}
      verifier={PAGE_DATA_VERIFIER}
    >
      <ExtMaterialEditorView
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

export default ExtMaterialEditorController
