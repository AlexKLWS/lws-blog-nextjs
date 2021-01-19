import React from 'react'
import { useImage } from 'react-image'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'

import styles from './Header.module.scss'
import routes from 'consts/routes'
import { isSmallerScreenQuery } from 'consts/media'
import LinkWithStyles from 'components/LinkWithStyles'

const Header: React.FC = () => {
  const router = useRouter()
  const isSmallerScreen = useMediaQuery({
    query: isSmallerScreenQuery,
  })

  const getLinkStyle = (route: string) => {
    const currentRoute = router.pathname
    return route === currentRoute ? styles.ActiveSectionItem : styles.SectionItem
  }

  const { src } = useImage({
    srcList: `http://localhost:3000/square_1.jpg`,
    useSuspense: false,
  })

  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.HeaderTopContainer}>
        <LinkWithStyles href={routes.home} className={styles.HeaderTitle}>
          LONG WINTER SHADOWS
        </LinkWithStyles>
        <div className={styles.HeaderRightContainer}>
          <span className={styles.HeaderSubtitle}>Personal blog by</span>
          <span className={styles.HeaderSubtitle}>
            <LinkWithStyles href={routes.contact} className={styles.link}>
              Alex Korzh
            </LinkWithStyles>
          </span>
          {!isSmallerScreen && (
            <div className={styles.HeaderPortrait}>
              <img src={src} width='auto' height='100%' alt='' />
            </div>
          )}
        </div>
      </div>
      <nav className={styles.SectionsList}>
        <LinkWithStyles href={routes.life} className={getLinkStyle(routes.life)}>
          Life
        </LinkWithStyles>
        <LinkWithStyles href={routes.code} className={getLinkStyle(routes.code)}>
          Code
        </LinkWithStyles>
        <LinkWithStyles href={routes.guides} className={getLinkStyle(routes.guides)}>
          Guides
        </LinkWithStyles>
        <LinkWithStyles href={routes.projects} className={getLinkStyle(routes.projects)}>
          Projects
        </LinkWithStyles>
      </nav>
    </div>
  )
}

export default Header
