import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { EditorError } from 'types/verifier'
import { useExtMaterialClient } from 'facades/materialClientFacade'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import { DEFAULT_EXT_MATERIAL_DATA } from 'consts/defaults'
import { PAGE_DATA_VERIFIER } from 'consts/verifiers'

const LoadableExtMaterialEditorView = dynamic(() => import('./ExtMaterialEditorView'), {
  loading: () => {
    return <div>LOADING</div>
  },
})

const ExtMaterialEditorController: React.FC = () => {
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])

  const { extMaterial, fetchExtMaterial, postExtMaterial } = useExtMaterialClient()
  const { service } = useMaterialDataServiceProvider(PAGE_DATA_VERIFIER, DEFAULT_EXT_MATERIAL_DATA)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchExtMaterial(id as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    if (extMaterial) {
      service.updateData(extMaterial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extMaterial])

  const performDataCheck = () => {
    const errors = service.verifyData()
    setSubmitErrors(errors)
  }

  const postWrapped = () => {
    const currentData = service.currentData
    postExtMaterial(currentData, id as string)
  }

  return (
    <LoadableExtMaterialEditorView
      serviceInstance={service}
      submitErrors={currentSubmitErrors}
      performDataCheck={performDataCheck}
      submitData={postWrapped}
    />
  )
}

export default ExtMaterialEditorController
