import React from 'react'

import './FullscreenMessageView.module.scss'

type Props = {
  title: string
  subtitle: string
}

const FullscreenMessageView: React.FC<Props> = (props: Props) => {
  return (
    <div className={'FullscreenMessageView-container'}>
      <h1 className={'FullscreenMessageView-title'}>{props.title}</h1>
      <h3 className={'FullscreenMessageView-subtitle'}>{props.subtitle}</h3>
    </div>
  )
}

export default FullscreenMessageView
