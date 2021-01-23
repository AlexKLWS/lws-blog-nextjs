import React from 'react'

import styles from './Contact.module.scss'
import LinkWithStyles from 'components/LinkWithStyles'
import routes from 'consts/routes'
import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'

const Contact: React.FC = () => {
  return (
    <DefaultLayoutWrapper>
      <div className={styles.ContactContainer}>
        <h1 className={styles.ContactTitle}>Contact</h1>
        <p className={styles.ContactInfo}>
          If you have any comments, questions or feedback about my work — just shoot me an email. For partnerships or
          collaborations inquiries please use email as well. Otherwise, feel free to reach out to me on social networks.
        </p>
        <a className={styles.ContactLink} href='mailto:alexkorzh7@pm.me'>
          alexkorzh7@pm.me
        </a>
        <a className={styles.ContactLink} href='https://github.com/AlexKLWS'>
          Github
        </a>
        <a className={styles.ContactLink} href='https://www.linkedin.com/in/aleksei-korzh-52952392'>
          LinkedIn
        </a>
        <div style={{ height: '16px' }} />
        <span className={styles.TwitterCaption}>Video games, code, art and everything related:</span>
        <a className={styles.ContactLink} href='https://twitter.com/longwinshadows'>
          @longwinshadows
        </a>
        <span className={styles.TwitterCaption}>Personal stuff, Russian politics, etc:</span>
        <a className={styles.ContactLink} href='https://twitter.com/alexkorzh7'>
          @alexkorzh7
        </a>
        <div className={styles.BottomSection}>
          <div className={styles.ContactSeparator} />
          <div className={styles.ContactSecretContainer}>
            <LinkWithStyles href={routes.login} className={styles.ContactSecret}>
              Log in
            </LinkWithStyles>
          </div>
        </div>
      </div>
    </DefaultLayoutWrapper>
  )
}

export default Contact
