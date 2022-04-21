import React, { useMemo } from 'react'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'
import profilePic from '../../public/square_1.jpg'

import styles from './Header.module.scss'
import routes from 'consts/routes'
import { isSmallerScreenQuery } from 'consts/media'
import LinkWithStyles from 'components/LinkWithStyles'
import Dropdown from 'components/Dropdowns/Dropdown/Dropdown'
import { getDropdownLabel } from 'helpers/getDropdownLabel'

type Props = {
  isSecret?: boolean
}

const Header: React.FC<Props> = (props: Props) => {
  const router = useRouter()
  const isSmallerScreen = useMediaQuery({
    query: isSmallerScreenQuery,
  })

  const dropdownItems = useMemo(
    () => [
      {
        label: 'Life',
        callback: () => {
          router.push(props.isSecret ? routes.secret.life : routes.life)
        },
      },
      {
        label: 'Code',
        callback: () => {
          router.push(props.isSecret ? routes.secret.code : routes.code)
        },
      },
      {
        label: 'Guides',
        callback: () => {
          router.push(props.isSecret ? routes.secret.guides : routes.guides)
        },
      },
      {
        label: 'Projects',
        callback: () => {
          router.push(props.isSecret ? routes.secret.projects : routes.projects)
        },
      },
      {
        label: 'Games',
        callback: () => {
          router.push(props.isSecret ? routes.secret.games : routes.games)
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

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
              <Image src={profilePic} width='44px' height='44px' alt='Alex Korzh' />
            </LinkWithStyles>
          )}
        </div>
      </div>
      {isSmallerScreen ? (
        <div className={styles.DropdownContainer}>
          <Dropdown dropdownTriggerText={getDropdownLabel(router.pathname)} items={dropdownItems} />
        </div>
      ) : (
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
          <LinkWithStyles
            href={props.isSecret ? routes.secret.games : routes.games}
            className={getLinkStyle(props.isSecret ? routes.secret.games : routes.games)}
          >
            Games
          </LinkWithStyles>
        </nav>
      )}
    </div>
  )
}

export default Header
