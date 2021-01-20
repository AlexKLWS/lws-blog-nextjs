import React, { Suspense } from 'react'
import { Transition } from 'react-transition-group'

import styles from './GuideLocationInfo.module.scss'

import { GuideLocationInfo } from 'types/guide'
import LoadableImage from 'components/LoadableImage/LoadableImage'

const DURATION = 300

type Props = {
  isShown: boolean
  locationInfo: GuideLocationInfo
  onCloseClick: () => void
}

const GuideLocationInfoView: React.FC<Props> = (props: Props) => {
  const defaultStyle = {
    transition: `${DURATION}ms ease-in-out`,
    opacity: 0,
    transform: 'scale(0.95)',
  }

  const transitionStyles: any = {
    entering: { opacity: 1, transform: 'scale(1)', pointerEvents: 'all' },
    entered: { opacity: 1, transform: 'scale(1)', pointerEvents: 'all' },
    exiting: { opacity: 0, transform: 'scale(0.95)', pointerEvents: 'none' },
    exited: { opacity: 0, transform: 'scale(0.95)', pointerEvents: 'none' },
  }

  return (
    <Transition in={props.isShown} timeout={DURATION} unmountOnExit>
      {(state) => (
        <div
          className={styles.GuideLocationInfo}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {props.isShown ? (
            <div className={styles.GuideCloseButtonContainer}>
              <div className={styles.GuideCloseButton}>
                <button
                  className={'hamburger hamburger--spin is-active'}
                  type='button'
                  onClick={() => {
                    props.onCloseClick()
                  }}
                >
                  <span className='hamburger-box'>
                    <span className='hamburger-inner'></span>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ height: '40px' }} />
          )}
          <div className={styles.GuideLocationInfoContents}>
            <Suspense fallback={<div className={styles.GuideLocationInfoPhotoPlaceholder} />}>
              <LoadableImage src={props.locationInfo.imageUrl} className={styles.GuideLocationInfoPhoto} />
            </Suspense>
            <div className={styles.GuideLocationInfoTextContainer}>
              <h2 className={styles.GuideLocationInfoTitle}>{props.locationInfo.title}</h2>
              <p className={styles.GuideLocationInfoDescription}>{props.locationInfo.description}</p>
              <span className={styles.GuideLocationInfoAddress}>{props.locationInfo.address}</span>
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default GuideLocationInfoView
