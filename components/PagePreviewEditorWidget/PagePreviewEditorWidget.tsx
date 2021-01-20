import React from 'react'

import styles from './PagePreviewEditorWidget.module.scss'
import { Category } from 'types/materials'
import { IMaterialDataService } from 'services/materialData'
import InputDataController from 'components/MaterialDataFormItems/Input/InputDataController'
import EnumDropdown from 'components/Dropdowns/EnumDropdown/EnumDropdown'
import ArrayInputDataController from 'components/MaterialDataFormItems/Input/ArrayInputDataController'

type Props = {
  serviceInstance: IMaterialDataService
  firstCategoryToggleDisabled?: boolean
}

const PagePreviewEditorWidget: React.FC<Props> = (props: Props) => {
  const getIconButtonText = (value: File | string | null) => {
    if (!value) {
      return 'Add icon'
    }
    if (!(value as File).name) {
      return 'Change icon'
    }
    return (value as File).name
  }

  return (
    <div className={styles.PPEWInputContainer}>
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'name'}
        render={({ value, setValue }) => {
          return (
            <input
              className={styles.PPEWInput}
              placeholder='Title'
              value={value}
              onChange={(event) => {
                setValue(event.target.value)
              }}
            />
          )
        }}
      />
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'subtitle'}
        render={({ value, setValue }) => {
          return (
            <input
              className={styles.PPEWInput}
              placeholder='Subtitle'
              value={value}
              onChange={(event) => {
                setValue(event.target.value)
              }}
            />
          )
        }}
      />
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'icon.data'}
        render={({ value, setValue }) => {
          const onIconFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files || !event.target.files[0]) {
              return
            }
            setValue(event.target.files[0])
          }
          return (
            <>
              <input
                type='file'
                className='App-file-input'
                id='articleIcon'
                onChange={onIconFileChange}
                accept='.svg'
              />
              <label className='App-button' htmlFor='articleIcon'>
                {getIconButtonText(value)}
              </label>
              {value && (
                <div className={styles.PPEWIconRow}>
                  <InputDataController
                    serviceInstance={props.serviceInstance}
                    path={'icon.width'}
                    render={({ value, setValue }) => {
                      return (
                        <input
                          className={styles.PPEWIconDimensionsInput}
                          placeholder='Width'
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
                    path={'icon.height'}
                    render={({ value, setValue }) => {
                      return (
                        <input
                          className={styles.PPEWIconDimensionsInput}
                          placeholder='Height'
                          type='number'
                          value={value}
                          onChange={(event) => {
                            setValue(Number(event.target.value))
                          }}
                        />
                      )
                    }}
                  />
                </div>
              )}
            </>
          )
        }}
      />
      <ArrayInputDataController
        serviceInstance={props.serviceInstance}
        pathToArray={'categories'}
        minNumberOfElements={1}
        renderContentContainer={({ onItemAddButtonPress, itemsRenderList }) => {
          return (
            <div className={styles.PPEWDropdownContainer}>
              <div style={{ display: 'flex' }}>
                <span className='App-label'>Categories:</span>
                <button className='App-button' onClick={onItemAddButtonPress}>
                  +
                </button>
              </div>
              {itemsRenderList}
            </div>
          )
        }}
        renderItem={({ onItemRemoveButtonPress, value, setValue, minNumberOfElements, index }) => {
          return (
            <div style={{ padding: '8px 0px', display: 'inline-flex' }}>
              <div style={{ paddingRight: '8px', zIndex: 100 - index }}>
                <EnumDropdown
                  sourceEnum={Category as any}
                  value={value}
                  setValue={setValue}
                  disabled={props.firstCategoryToggleDisabled && index === 0}
                />
              </div>
              {index >= minNumberOfElements && (
                <button className='App-button' onClick={onItemRemoveButtonPress}>
                  -
                </button>
              )}
            </div>
          )
        }}
      />
      <InputDataController
        serviceInstance={props.serviceInstance}
        path={'hidden'}
        render={({ value, setValue }) => {
          return (
            <div style={{ display: 'flex', flex: 1, padding: '16px 0px', alignItems: 'center' }}>
              <span className='App-label'>Hidden: </span>
              <label className={styles.PPEWToggleContainer}>
                <input
                  className={styles.PPEWToggleInput}
                  type='checkbox'
                  checked={value}
                  onChange={() => {
                    setValue(!value)
                  }}
                />
                <span className={styles.PPEWToggle} />
              </label>
            </div>
          )
        }}
      />
    </div>
  )
}

export default PagePreviewEditorWidget
