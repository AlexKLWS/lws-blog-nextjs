import React, { useState } from 'react'

import styles from './ExtMaterialEditor.module.scss'
import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'
import { EditorError } from 'types/verifier'
import SubmitModal from 'components/SubmitModal'
import { IMaterialDataService } from 'services/materialData'
import InputDataController from 'components/MaterialDataFormItems/Input/InputDataController'

interface Props {
  serviceInstance: IMaterialDataService
  submitData: () => void
  performDataCheck: () => void
  submitErrors: EditorError[]
}

const ExtMaterialEditorView = (props: Props) => {
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
      <h1 className='App-title'>Page Editor</h1>
      <PagePreviewEditorWidget serviceInstance={props.serviceInstance} />
      <div className={styles.EMEURLcontainer}>
        <InputDataController
          serviceInstance={props.serviceInstance}
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
        submitErrors={props.submitErrors}
        setModalIsOpen={setModalIsOpen}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default ExtMaterialEditorView
