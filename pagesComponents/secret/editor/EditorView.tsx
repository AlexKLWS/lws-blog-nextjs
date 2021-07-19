import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

import styles from './Editor.module.scss'

import { EditorError } from 'types/verifier'
import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'
import SubmitModal from 'components/SubmitModal'
import FileUploadWidget from 'components/FileUploadWidget'
import InputDataController from 'components/MaterialDataFormItems/Input/InputDataController'
import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'

interface Props {
  onSubmit?: () => void
  validate?: () => void
  validationErrors: EditorError[]
  isLoading: boolean
  postError: Error | null
  clearPostError: () => void
  postWasSuccess: boolean
  clearPostSuccessFlag: () => void
}

const EditorView: React.FC<Props> = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const onSubmit = () => {
    if (props.onSubmit) {
      props.onSubmit()
    }
  }

  const onSubmitButtonClick = () => {
    props.clearPostError()
    props.clearPostSuccessFlag()
    if (props.validate) {
      props.validate()
    }
    setModalIsOpen(true)
  }

  return (
    <DefaultLayoutWrapper>
      <div>
        <h1 className='App-title'>Editor</h1>
        <PagePreviewEditorWidget />
        <InputDataController
          path={'metaDescription'}
          render={({ value, setValue }) => {
            return (
              <div className={styles.EditorFullWidthInputContainer}>
                <textarea
                  className={styles.EditorFullWidthInput}
                  placeholder='Meta Description'
                  rows={2}
                  value={value}
                  onChange={(event) => {
                    event.preventDefault()
                    setValue(event.target.value)
                  }}
                />
              </div>
            )
          }}
        />
        <InputDataController
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
          validationErrors={props.validationErrors}
          setModalIsOpen={setModalIsOpen}
          onSubmit={onSubmit}
          isLoading={props.isLoading}
          postError={props.postError}
          postWasSuccess={props.postWasSuccess}
        />
      </div>
    </DefaultLayoutWrapper>
  )
}

export default EditorView
