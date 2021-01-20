import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

import styles from './Editor.module.scss'

import { EditorError } from 'types/verifier'
import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'
import SubmitModal from 'components/SubmitModal'
import FileUploadWidget from 'components/FileUploadWidget'
import { IMaterialDataService } from 'services/materialData'
import InputDataController from 'components/MaterialDataFormItems/Input/InputDataController'

interface Props {
  serviceInstance: IMaterialDataService
  submitData: () => void
  performDataCheck: () => void
  submitErrors: EditorError[]
}

const EditorView: React.FC<Props> = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const onSubmit = () => {
    props.submitData()
    setModalIsOpen(false)
  }

  const onSubmitButtonClick = () => {
    props.performDataCheck()
    setModalIsOpen(true)
  }

  return (
    <div>
      <h1 className='App-title'>Editor</h1>
      <PagePreviewEditorWidget serviceInstance={props.serviceInstance} />
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'articleText'}
        render={({ value, setValue }) => {
          return <SimpleMDE value={value} onChange={setValue} />
        }}
      />
      <div className={styles.EditorButtonContainer}>
        <input className='App-button' onClick={onSubmitButtonClick} type={'submit'} value={'Submit'} />
      </div>
      <FileUploadWidget />
      <SubmitModal
        modalIsOpen={modalIsOpen}
        submitErrors={props.submitErrors}
        setModalIsOpen={setModalIsOpen}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default EditorView
