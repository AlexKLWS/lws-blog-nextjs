import React from 'react'
import LinkWithStyles from 'components/LinkWithStyles'

import styles from './Footer.module.scss'
import routes from 'consts/routes'

const Footer: React.FC = () => {
  return (
    <div className={styles.FooterContainer}>
      <nav className={styles.FooterLinksContainer}>
        <LinkWithStyles href={routes.home} className={styles.FooterItem}>
          Home
        </LinkWithStyles>
        <LinkWithStyles href={routes.life} className={styles.FooterItem}>
          Life
        </LinkWithStyles>
        <LinkWithStyles href={routes.code} className={styles.FooterItem}>
          Code
        </LinkWithStyles>
        <LinkWithStyles href={routes.guides} className={styles.FooterItem}>
          Guides
        </LinkWithStyles>
        <LinkWithStyles href={routes.projects} className={styles.FooterItem}>
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
