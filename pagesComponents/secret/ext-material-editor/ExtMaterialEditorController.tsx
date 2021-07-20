import 'reflect-metadata'
import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { EditorError } from 'types/verifier'
import { useExtMaterialClient } from 'facades/materialClientFacade'
import { DEFAULT_EXT_MATERIAL_DATA } from 'consts/defaults'
import { PAGE_DATA_VERIFIER } from 'consts/verifiers'
import { getServerSession } from 'facades/sessionFacade'
import { FormDataProvider } from 'components/Forms/FormProvider'
import ExtMaterialEditorView from './ExtMaterialEditorView'

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

const ExtMaterialEditorController: React.FC = () => {
  const {
    extMaterial,
    fetchExtMaterial,
    postExtMaterial,
    error,
    isLoading,
    clearError,
    postWasSuccess,
    clearPostSuccessFlag,
  } = useExtMaterialClient()

  const [validationErrors, setValidationErrors] = useState<EditorError[]>([])

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchExtMaterial(id as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const performDataCheck = (errors: EditorError[]) => {
    setValidationErrors(errors)
  }

  const postWrapped = (currentData: any) => {
    postExtMaterial(currentData, id as string)
  }

  return (
    <FormDataProvider
      defaultData={extMaterial || DEFAULT_EXT_MATERIAL_DATA}
      onSubmit={postWrapped}
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
