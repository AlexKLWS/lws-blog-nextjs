import React from 'react'
import { Transition } from 'react-transition-group'
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

  const transitionStyles: any = {
    entering: { width: '420px', height: '520px' },
    entered: { width: '420px', height: '520px' },
    exiting: { width: '40px', height: '40px', transitionDelay: '0.1s' },
    exited: { width: '40px', height: '40px' },
  }

  const transitionStylesOpacity: any = {
    entering: { opacity: 1, transitionDelay: '0.4s' },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }

  const displayScrollIndicator = props.locations.length >= 6

  return (
    <Transition in={props.locationsListIsOpen} timeout={300}>
      {(state) => (
        <div className={buttonBackgroundStyle()} style={{ ...transitionStyles[state] }}>
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
          <div className={styles.GuideInfoLocationListContainer} style={{ ...transitionStylesOpacity[state] }}>
            <p className={styles.GuideInfoNote}>{props.guideInfo}</p>
            <div className={styles.GuideInfoLocationList}>
              {props.locations.map((location, index) => {
                return (
                  <div
                    key={`${index}`}
                    className={styles.GuideInfoLocationListItem}
                    onClick={() => {
                      props.setLocationsListIsOpen(false)
                      props.onLocationPress(location)
                    }}
                  >
                    <GuideItemIcon type={location.type} />
                    <h3 className={styles.GuideInfoLocationListItemLabel}>{location.title}</h3>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.GuideInfoBottomContainer}>
            <div className={styles.GuideInfoBottomContainerCenter}>
              {displayScrollIndicator && (
                <Arrow
                  style={{
                    transform: 'rotate(270deg)',
                    transition: 'all 0.2s ease-in-out',
                    ...transitionStylesOpacity[state],
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default GuideLocationsListView
