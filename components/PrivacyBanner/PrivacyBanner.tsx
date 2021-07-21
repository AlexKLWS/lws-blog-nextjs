import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'

import styles from './PrivacyBanner.module.scss'

import { BANNER_CONSENT_COOKIE_KEY } from 'consts/cookies'
import { setCookie, getCookie } from 'helpers/cookies'

const PrivacyBanner = () => {
  const [shouldShowBanner, setShouldShowBanner] = useState(false)
  const onAccessButtonPress = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    //Cookie expires after 3 months
    const expiryDate = DateTime.local().plus({ month: 3 })
    setCookie(BANNER_CONSENT_COOKIE_KEY, 'true', expiryDate.toSeconds())
    setShouldShowBanner(false)
  }

  useEffect(() => {
    const cookieUseAccepted = getCookie(BANNER_CONSENT_COOKIE_KEY)
    setShouldShowBanner(cookieUseAccepted !== 'true')
  }, [])

  if (!shouldShowBanner) {
    return null
  }

  return (
    <div className={styles.PrivacyBannerContainer}>
      <div className={styles.PrivacyBanner}>
        <p className={styles.PrivacyBannerText}>
          This website uses{' '}
          <a href='https://en.wikipedia.org/wiki/HTTP_cookie' className={'App-external-link'}>
            cookies
          </a>{' '}
          to enable authentication, and to persist user choice made on this banner. That&apos;s about it.{' '}
          <b>
            This website respects your privacy and doesn&apos;t store any third-party cookies. All collected analytics
            data is anonymous.
          </b>{' '}
          By continuing to use this website, you consent to the use of cookies.
        </p>
        <div className={styles.PrivacyBannerButtonContainer}>
          <input className='App-button' type={'submit'} onClick={onAccessButtonPress} value='Accept' />
        </div>
      </div>
    </div>
  )
}

export default PrivacyBanner
