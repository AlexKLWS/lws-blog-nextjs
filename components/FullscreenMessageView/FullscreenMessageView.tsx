import React from 'react'

import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'
import styles from './FullscreenMessageView.module.scss'

type Props = {
  title: string
  subtitle: string
}

const FullscreenMessageView: React.FC<Props> = (props: Props) => {
  return (
    <DefaultLayoutWrapper>
      <div className={styles.FullscreenMessageViewContainer}>
        <h1 className={styles.FullscreenMessageViewTitle}>{props.title}</h1>
        <h3 className={styles.FullscreenMessageViewSubtitle}>{props.subtitle}</h3>
      </div>
    </DefaultLayoutWrapper>
  )
}

export default FullscreenMessageView
