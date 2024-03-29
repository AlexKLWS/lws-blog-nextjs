import React, { useState } from 'react'

import styles from './ExtMaterialEditor.module.scss'
import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'
import { EditorError } from 'types/verifier'
import SubmitModal from 'components/SubmitModal'
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

const ExtMaterialEditorView = (props: Props) => {
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
        <h1 className='App-title'>Page Editor</h1>
        <PagePreviewEditorWidget />
        <div className={styles.EMEURLcontainer}>
          <InputDataController
            path={'url'}
            render={({ value, setValue }) => {
              return (
                <input
                  placeholder='URL'
                  className='App-input'
                  onChange={(event) => {
                    setValue(event.target.value)
                  }}
                  value={value}
                />
              )
            }}
          />
        </div>
        <div className={styles.EMEButtonContainer}>
          <input className='App-button' onClick={onSubmitButtonClick} type={'submit'} value={'Submit'} />
        </div>
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

export default ExtMaterialEditorView
