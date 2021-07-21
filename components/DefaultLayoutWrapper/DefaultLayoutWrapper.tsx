import React from 'react'
import { useMediaQuery } from 'react-responsive'
import dynamic from 'next/dynamic'

import styles from './DefaultLayoutWrapper.module.scss'
import { isDesktopOrLaptopQuery } from 'consts/media'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

type Props = {
  isSecret?: boolean
  hideHeader?: boolean
  hideFooter?: boolean
  children?: React.ReactNode
}

const Loading = () => {
  return <div style={{ backgroundColor: '#000' }} />
}

const LoadableBackgroundView = dynamic(() => import('components/Background/BackgroundView'), {
  loading: Loading,
  ssr: false,
})

const DefaultLayoutWrapper: React.FC<Props> = (props: Props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: isDesktopOrLaptopQuery,
  })

  return (
    <>
      <a className='App-skip-link' href='#main'>
        Skip to main
      </a>
      {isDesktopOrLaptop && <LoadableBackgroundView />}
      <div className={styles.AppFlexContainer}>
        <div className={styles.AppContainer}>
          {!props.hideHeader && <Header isSecret={props.isSecret} />}
          <main id='main'>{props.children}</main>
          {!props.hideFooter && <Footer isSecret={props.isSecret} />}
        </div>
      </div>
    </>
  )
}

export default DefaultLayoutWrapper
