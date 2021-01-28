import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import styles from './LinkRenderer.module.scss'

const LinkRenderer = (props: MarkdownNodeProps) => {
  return (
    <a href={props.href} className={'App-external-link'}>
      {props.children}
    </a>
  )
}

export default LinkRenderer
