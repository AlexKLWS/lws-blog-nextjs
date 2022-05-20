import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import absoluteUrl from 'next-absolute-url'

import styles from './Contact.module.scss'
import LinkWithStyles from 'components/LinkWithStyles'
import routes from 'consts/routes'
import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'
import { DEFAULT_AUTHOR_NAME, DEFAULT_TITLE } from 'consts/metaDefaults'

export const getServerSideProps: GetServerSideProps = async (context) => {
  let fullUrl
  if (context.req) {
    // Server side rendering
    const { origin } = absoluteUrl(context.req)
    fullUrl = origin + context.req.url
  } else {
    // Client side rendering
    fullUrl =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
  }
  return {
    props: { fullUrl },
  }
}

type Props = {
  fullUrl: string
}

const Contact: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>{`${DEFAULT_TITLE} - ${DEFAULT_AUTHOR_NAME} - Contact`}</title>
        <meta property='og:url' content={props.fullUrl} />
      </Head>
      <DefaultLayoutWrapper>
        <div className={styles.ContactContainer}>
          <h1 className={styles.ContactTitle}>Contact</h1>
          <p className={styles.ContactInfo}>
            If you have any comments, questions or feedback about my work — just shoot me an email. For partnerships or
            collaborations inquiries please use email as well. Otherwise, feel free to reach out to me on social
            networks.
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
    </>
  )
}

export default Contact
