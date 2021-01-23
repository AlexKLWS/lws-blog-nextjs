import React from 'react'

import styles from './GuidePin.module.scss'
//@ts-ignore
import MapPin from 'assets/icons/MapPin.svg'
import { LocationType } from 'types/guide'
import GuideItemIcon from 'pagesComponents/guides/components/GuideItemIcon/GuideItemIcon'

type Props = {
  type: LocationType
  lat: number
  lng: number
  onPinPress: () => void
}

const GuidePin: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.GuidePinContainer}>
      <div className={styles.GuidePinIconContainer}>
        <GuideItemIcon type={props.type} />
      </div>
      <MapPin />
      <input
        className={styles.GuidePinButton}
        type={'button'}
        onClick={() => {
          props.onPinPress()
        }}
      />
    </div>
  )
}

export default GuidePin
