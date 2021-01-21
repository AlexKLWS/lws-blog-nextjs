import React from 'react'
import Image from 'next/image'
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
            <LinkWithStyles href={routes.contact} className={styles.HeaderPortrait}>
              <Image src={`/square_1.jpg`} width='44px' height='44px' alt='Alex Korzh' />
            </LinkWithStyles>
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
