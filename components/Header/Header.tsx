import React from 'react'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'

import styles from './Header.module.scss'
import routes from 'consts/routes'
import { isSmallerScreenQuery } from 'consts/media'
import LinkWithStyles from 'components/LinkWithStyles'

type Props = {
  isSecret?: boolean
}

const Header: React.FC<Props> = (props: Props) => {
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
          <LinkWithStyles href={routes.contact} className={styles.HeaderSubtitleLink}>
            Alex Korzh
          </LinkWithStyles>
          {!isSmallerScreen && (
            <LinkWithStyles href={routes.contact} className={styles.HeaderPortrait}>
              <Image src={`/square_1.jpg`} width='44px' height='44px' alt='Alex Korzh' />
            </LinkWithStyles>
          )}
        </div>
      </div>
      <nav className={styles.SectionsList}>
        <LinkWithStyles
          href={props.isSecret ? routes.secret.life : routes.life}
          className={getLinkStyle(props.isSecret ? routes.secret.life : routes.life)}
        >
          Life
        </LinkWithStyles>
        <LinkWithStyles
          href={props.isSecret ? routes.secret.code : routes.code}
          className={getLinkStyle(props.isSecret ? routes.secret.code : routes.code)}
        >
          Code
        </LinkWithStyles>
        <LinkWithStyles
          href={props.isSecret ? routes.secret.guides : routes.guides}
          className={getLinkStyle(props.isSecret ? routes.secret.guides : routes.guides)}
        >
          Guides
        </LinkWithStyles>
        <LinkWithStyles
          href={props.isSecret ? routes.secret.projects : routes.projects}
          className={getLinkStyle(props.isSecret ? routes.secret.projects : routes.projects)}
        >
          Projects
        </LinkWithStyles>
      </nav>
    </div>
  )
}

export default Header
