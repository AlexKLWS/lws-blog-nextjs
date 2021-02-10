import React from 'react'
import LinkWithStyles from 'components/LinkWithStyles'

import styles from './Footer.module.scss'
import routes from 'consts/routes'

type Props = {
  isSecret?: boolean
}

const Footer: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.FooterContainer}>
      <nav className={styles.FooterLinksContainer}>
        <LinkWithStyles href={props.isSecret ? routes.secret.home : routes.home} className={styles.FooterItem}>
          Home
        </LinkWithStyles>
        <LinkWithStyles href={props.isSecret ? routes.secret.life : routes.life} className={styles.FooterItem}>
          Life
        </LinkWithStyles>
        <LinkWithStyles href={props.isSecret ? routes.secret.code : routes.code} className={styles.FooterItem}>
          Code
        </LinkWithStyles>
        <LinkWithStyles href={props.isSecret ? routes.secret.guides : routes.guides} className={styles.FooterItem}>
          Guides
        </LinkWithStyles>
        <LinkWithStyles href={props.isSecret ? routes.secret.projects : routes.projects} className={styles.FooterItem}>
          Projects
        </LinkWithStyles>
        <LinkWithStyles href={routes.contact} className={styles.FooterItem}>
          Contact
        </LinkWithStyles>
      </nav>
      <span className={styles.FooterCopyrightName}>&copy; Alex Korzh</span>
    </div>
  )
}

export default Footer
