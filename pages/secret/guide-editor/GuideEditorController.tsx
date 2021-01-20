import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loadable from 'react-loadable'

import { EditorError } from 'types/verifier'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import { GUIDE_DATA_VERIFIER } from 'consts/verifiers'
import { DEFAULT_GUIDE_DATA } from 'consts/defaults'
import { useGuideClient } from 'facades/materialClientFacade'

const LoadableEditorView = Loadable({
  loader: () => import('./GuideEditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const GuideEditorController = () => {
  const { guide, fetchGuide, postGuide } = useGuideClient()
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])
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
    setSubmitErrors(errors)
  }

  const postGuideWrapped = () => {
    const currentData = service.currentData
    postGuide(currentData, id as string)
  }

  return (
    <LoadableEditorView
      submitData={postGuideWrapped}
      performDataCheck={performDataCheck}
      serviceInstance={service}
      submitErrors={currentSubmitErrors}
    />
  )
}

export default GuideEditorController
