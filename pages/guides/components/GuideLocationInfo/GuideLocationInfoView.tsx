import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

import styles from './GuideLocationInfo.module.scss'

import { GuideLocationInfo } from 'types/guide'
import LoadableImage from 'components/LoadableImage/LoadableImage'

type Props = {
  isShown: boolean
  locationInfo: GuideLocationInfo
  onCloseClick: () => void
}

const GuideLocationInfoView: React.FC<Props> = (props: Props) => {
  const [transitionStyle, animateTransition] = useSpring(
    {
      config: { duration: 200 },
      opacity: 0,
      transform: 'scale(0.95)',
      pointerEvents: 'none',
    },
    [],
  )

  useEffect(() => {
    if (props.isShown) {
      animateTransition({ delay: 50, opacity: 1, transform: 'scale(1)', pointerEvents: 'all' })
    } else {
      animateTransition({ delay: 50, opacity: 0, transform: 'scale(0.95)', pointerEvents: 'none' })
    }
  }, [props.isShown])

  return (
    <animated.div className={styles.GuideLocationInfo} style={transitionStyle}>
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
        <LoadableImage src={props.locationInfo.imageUrl} className={styles.GuideLocationInfoPhoto} />
        <div className={styles.GuideLocationInfoTextContainer}>
          <h2 className={styles.GuideLocationInfoTitle}>{props.locationInfo.title}</h2>
          <p className={styles.GuideLocationInfoDescription}>{props.locationInfo.description}</p>
          <span className={styles.GuideLocationInfoAddress}>{props.locationInfo.address}</span>
        </div>
      </div>
    </animated.div>
  )
}

export default GuideLocationInfoView
