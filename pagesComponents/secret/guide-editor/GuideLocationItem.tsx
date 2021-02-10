import React from 'react'

import styles from './GuideEditor.module.scss'

import { LocationType } from 'types/guide'
import ArrayItemValueInputDataController from 'components/MaterialDataFormItems/Input/ArrayItemValueInputDataController'
import { IMaterialDataService } from 'services/materialData'
import EnumDropdown from 'components/Dropdowns/EnumDropdown/EnumDropdown'

type Props = {
  serviceInstance: IMaterialDataService
  pathToArray: string
  index: number
  onRemoveButtonPress: () => void
}

const GuideLocationItem: React.FC<Props> = (props: Props) => {
  return (
    <li style={{ padding: '0px 0px 40px 0px' }}>
      <div className={styles.GELocationItemInputContainer}>
        <ArrayItemValueInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'type'}
          render={({ value, setValue }) => {
            return <EnumDropdown sourceEnum={LocationType as any} value={value} setValue={setValue} />
          }}
        />
      </div>
      <div className={styles.GELocationItemInputContainer}>
        <ArrayItemValueInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'title'}
          render={({ value, setValue }) => {
            return (
              <input
                placeholder='Title'
                className={styles.GEInput}
                onChange={(event) => {
                  setValue(event.target.value)
                }}
                value={value}
              />
            )
          }}
        />
      </div>
      <div className={styles.GECoordinatesInputContainer}>
        <ArrayItemValueInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'coordinates'}
          render={({ value, setValue }) => {
            return (
              <>
                <input
                  className={styles.GEInput}
                  placeholder='Latitude'
                  value={value ? value.lat : ''}
                  type='number'
                  onChange={(event) => {
                    setValue({ lat: Number(event.target.value), lng: (!!value && value.lng) || '' })
                  }}
                />
                <input
                  className={styles.GEInput}
                  placeholder='Longitude'
                  value={value ? value.lng : ''}
                  type='number'
                  onChange={(event) => {
                    setValue({ lng: Number(event.target.value), lat: (!!value && value.lat) || '' })
                  }}
                />
              </>
            )
          }}
        />
      </div>
      <div className={styles.GELocationItemInputContainer}>
        <ArrayItemValueInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'address'}
          render={({ value, setValue }) => {
            return (
              <input
                placeholder='Address'
                className={styles.GEInput}
                onChange={(event) => {
                  setValue(event.target.value)
                }}
                value={value}
              />
            )
          }}
        />
      </div>
      <div className={styles.GELocationItemInputContainer}>
        <ArrayItemValueInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'imageUrl'}
          render={({ value, setValue }) => {
            return (
              <input
                placeholder='Image URL'
                className={styles.GEInput}
                onChange={(event) => {
                  setValue(event.target.value)
                }}
                value={value}
              />
            )
          }}
        />
      </div>
      <div className={styles.GELocationItemInputContainer}>
        <ArrayItemValueInputDataController
          index={props.index}
          serviceInstance={props.serviceInstance}
          pathToArray={props.pathToArray}
          pathToValue={'description'}
          render={({ value, setValue }) => {
            return (
              <div className={styles.GEFullWidthInputContainer}>
                <textarea
                  placeholder='Description'
                  className={styles.GEFullWidthInput}
                  rows={3}
                  onChange={(event) => {
                    setValue(event.target.value)
                  }}
                  value={value}
                />
              </div>
            )
          }}
        />
      </div>
      <div className={styles.GELocationItemInputContainer}>
        <input className='App-button' onClick={props.onRemoveButtonPress} type={'submit'} value={'Remove'} />
      </div>
    </li>
  )
}

export default GuideLocationItem
