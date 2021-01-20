import React, { useState } from 'react'

import styles from './GuideEditor.module.scss'

import PagePreviewEditorWidget from 'components/PagePreviewEditorWidget'
import FileUploadWidget from 'components/FileUploadWidget'
import SubmitModal from 'components/SubmitModal'
import { EditorError } from 'types/verifier'
import GuideLocationItem from './GuideLocationItem'
import { IMaterialDataService } from 'services/materialData'
import InputDataController from 'components/MaterialDataFormItems/Input/InputDataController'
import ArrayInputDataController from 'components/MaterialDataFormItems/Input/ArrayInputDataController'

type Props = {
  serviceInstance: IMaterialDataService
  submitErrors: EditorError[]
  submitData: () => void
  performDataCheck: () => void
}

const GuideEditorView: React.FC<Props> = (props: Props) => {
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
      <h1 className='App-title'>Guide Editor</h1>
      <PagePreviewEditorWidget serviceInstance={props.serviceInstance} firstCategoryToggleDisabled />
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'info'}
        render={({ value, setValue }) => {
          return (
            <div className={styles.GEFullWidthInputContainer}>
              <textarea
                className={styles.GEFullWidthInput}
                placeholder='Guide Info'
                rows={2}
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                }}
              />
            </div>
          )
        }}
      />
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'defaultZoom'}
        render={({ value, setValue }) => {
          return (
            <input
              className={styles.GEInput}
              placeholder='Default Zoom'
              type='number'
              value={value}
              onChange={(event) => {
                setValue(Number(event.target.value))
              }}
            />
          )
        }}
      />
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'defaultCenter'}
        render={({ value, setValue }) => {
          return (
            <div className={styles.GECoordinatesInputContainer}>
              <input
                className={styles.GEInput}
                placeholder='Latitude'
                type='number'
                value={value ? value.lat : ''}
                onChange={(event) => {
                  setValue({ lat: Number(event.target.value), lng: (!!value && value.lng) || '' })
                }}
              />
              <input
                className={styles.GEInput}
                placeholder='Longitude'
                type='number'
                value={value ? value.lng : ''}
                onChange={(event) => {
                  setValue({ lng: Number(event.target.value), lat: (!!value && value.lat) || '' })
                }}
              />
            </div>
          )
        }}
      />
      <ArrayInputDataController
        serviceInstance={props.serviceInstance}
        pathToArray={'locations'}
        renderContentContainer={({ onItemAddButtonPress, itemsRenderList }) => {
          return (
            <>
              <ul style={{ listStyleType: 'none' }}>{itemsRenderList}</ul>
              <div className={styles.GEAddLocationsButtonContainer}>
                <input className='App-button' onClick={onItemAddButtonPress} type={'submit'} value={'Add Location'} />
              </div>
            </>
          )
        }}
        renderItem={({ onItemRemoveButtonPress, index }) => {
          return (
            <GuideLocationItem
              serviceInstance={props.serviceInstance}
              index={index}
              pathToArray={'locations'}
              onRemoveButtonPress={onItemRemoveButtonPress}
            />
          )
        }}
      />
      <div className={styles.GEButtonContainer}>
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

export default GuideEditorView
