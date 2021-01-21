import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
//@ts-ignore
import Arrow from 'assets/icons/Arrow.svg'

import styles from './GuideLocationsList.module.scss'

import { GuideLocationInfo } from 'types/guide'
import GuideItemIcon from 'pages/guides/components/GuideItemIcon/GuideItemIcon'

type Props = {
  isDisabled: boolean
  guideInfo: string
  locations: GuideLocationInfo[]
  locationsListIsOpen: boolean
  setLocationsListIsOpen: (value: boolean) => void
  onLocationPress: (location: GuideLocationInfo) => void
}

const GuideLocationsListView: React.FC<Props> = (props: Props) => {
  const buttonStateStyle = () => {
    return props.locationsListIsOpen ? 'hamburger hamburger--spin is-active' : 'hamburger hamburger--spin'
  }

  const buttonBackgroundStyle = () => {
    return props.isDisabled ? styles.DisabledGuideInfoContainer : styles.GuideInfoContainer
  }

  const [dimensionsStyle, animateDimensions] = useSpring(
    {
      config: { duration: 150 },
      width: '40px',
      height: '40px',
    },
    [],
  )

  const [opacityStyle, animateOpacity] = useSpring(
    {
      config: { duration: 150 },
      opacity: 0,
    },
    [],
  )

  useEffect(() => {
    if (props.locationsListIsOpen) {
      animateDimensions({ width: '420px', height: '520px' })
      setTimeout(() => {
        animateOpacity({ opacity: 1 })
      }, 300)
    } else {
      animateOpacity({ opacity: 0 })
      setTimeout(() => {
        animateDimensions({ width: '40px', height: '40px' })
      }, 200)
    }
  }, [props.locationsListIsOpen])

  const displayScrollIndicator = props.locations.length >= 6

  return (
    <animated.div className={buttonBackgroundStyle()} style={dimensionsStyle}>
      <div className={styles.GuideInfoButtonContainer}>
        <div className={styles.GuideInfoButton}>
          <button
            className={buttonStateStyle()}
            type='button'
            aria-label='Menu'
            aria-controls='navigation'
            onClick={() => {
              props.setLocationsListIsOpen(!props.locationsListIsOpen)
            }}
            disabled={props.isDisabled}
          >
            <span className='hamburger-box'>
              <span className='hamburger-inner'></span>
            </span>
          </button>
        </div>
      </div>
      {/*@ts-expect-error*/}
      <animated.div className={styles.GuideInfoLocationListContainer} style={opacityStyle}>
        <p className={styles.GuideInfoNote}>{props.guideInfo}</p>
        <div className={styles.GuideInfoLocationList}>
          {props.locations.map((location, index) => {
            return (
              <div
                key={`${index}`}
                className={styles.GuideInfoLocationListItem}
                onClick={() => {
                  props.setLocationsListIsOpen(false)
                  setTimeout(() => {
                    props.onLocationPress(location)
                  }, 100)
                }}
              >
                <GuideItemIcon type={location.type} />
                <h3 className={styles.GuideInfoLocationListItemLabel}>{location.title}</h3>
              </div>
            )
          })}
        </div>
      </animated.div>
      <div className={styles.GuideInfoBottomContainer}>
        <div className={styles.GuideInfoBottomContainerCenter}>
          {displayScrollIndicator && (
            <Arrow
              style={{
                transform: 'rotate(270deg)',
                transition: 'all 0.2s ease-in-out',
              }}
            />
          )}
        </div>
      </div>
    </animated.div>
  )
}

export default GuideLocationsListView
