import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import styles from './LinkRenderer.module.scss'

const LinkRenderer = (props: MarkdownNodeProps) => {
  return (
    <a href={props.href} className={styles.LinkRenderer}>
      {props.children}
    </a>
  )
}

export default LinkRenderer
