import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

import styles from './Guide.module.scss'

import { mapStyles } from 'consts/mapStyles'
import Footer from 'components/Footer/Footer'
import GuidePin from './components/GuidePin/GuidePin'
import { GuideLocationInfo, LocationCoords } from 'types/guide'
import GuideLocationInfoView from './components/GuideLocationInfo/GuideLocationInfoView'
import GuideLocationsListView from './components/GuideLocationsList/GuideLocationsListView'
import { Guide } from 'types/materials'

const API_KEY = process.env.NEXT_PUBLIC_GMAPS_API_KEY || ''
const LOCATION_INFO_ANIMATION_SYNC_DELAY = 400

type Props = {
  guide: Guide
}

const GuideView: React.FC<Props> = (props: Props) => {
  const defaultProps = {
    center: props.guide.defaultCenter,
    zoom: props.guide.defaultZoom,
  }

  const [currentLocationInfo, setCurrentLocationInfo] = useState<GuideLocationInfo>(
    props.guide.locations && props.guide.locations[0],
  )
  const [centerCoords, setCenterCoords] = useState<LocationCoords>(props.guide.defaultCenter)
  const [locationInfoIsShown, setLocationInfoIsShown] = useState(false)
  const [locationsListIsOpen, setLocationsListIsOpen] = useState(false)

  const onPinPress = (location: GuideLocationInfo) => {
    setCurrentLocationInfo(location)
    setCenterCoords(location.coordinates)
    if (locationsListIsOpen) {
      setLocationsListIsOpen(false)
      setTimeout(() => {
        setLocationInfoIsShown(true)
      }, LOCATION_INFO_ANIMATION_SYNC_DELAY)
    } else {
      setLocationInfoIsShown(true)
    }
  }

  const onLocationPress = (location: GuideLocationInfo) => {
    setCurrentLocationInfo(location)
    setCenterCoords(location.coordinates)
    setTimeout(() => {
      setLocationInfoIsShown(true)
    }, LOCATION_INFO_ANIMATION_SYNC_DELAY)
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        center={centerCoords}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{
          fullscreenControl: false,
          styles: mapStyles,
        }}
        onDragEnd={(map: any) => {
          setCenterCoords({ lat: map.center.lat(), lng: map.center.lng() })
        }}
      >
        {props.guide.locations
          ? props.guide.locations.map((location, index) => {
              return (
                <GuidePin
                  key={`${index}`}
                  type={location.type}
                  lat={location.coordinates.lat}
                  lng={location.coordinates.lng}
                  onPinPress={() => {
                    onPinPress(location)
                  }}
                />
              )
            })
          : null}
      </GoogleMapReact>
      <div className={styles.GuideContentContainer}>
        <div className={styles.GuideInnerContentContainer}>
          <div className={styles.GuideInfoAlignmentContainer}>
            <GuideLocationsListView
              guideInfo={props.guide.info}
              isDisabled={locationInfoIsShown}
              locationsListIsOpen={locationsListIsOpen}
              setLocationsListIsOpen={setLocationsListIsOpen}
              locations={props.guide.locations}
              onLocationPress={onLocationPress}
            />
          </div>

          <GuideLocationInfoView
            locationInfo={currentLocationInfo}
            isShown={locationInfoIsShown}
            onCloseClick={() => {
              setLocationInfoIsShown(false)
            }}
          />

          <div style={{ flex: 1 }} />
        </div>
      </div>
      <div className={styles.GuideFooterContentContainer}>
        <div className={styles.GuideFooterInnerContentContainer}>
          <div className={styles.GuideFooterWrapper}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideView
