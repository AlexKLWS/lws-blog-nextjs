import React from 'react'

import BackgroundProcessingView from './BackgroundProcessingView'
import styles from './BackgroundView.module.scss'

const BackgroundView: React.FC = () => {
  return (
    <div className={styles.AppBackground}>
      <BackgroundProcessingView />
    </div>
  )
}

export default BackgroundView
