import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import styles from './ParagraphRenderer.module.scss'

const ParagraphRenderer = (props: MarkdownNodeProps) => {
  return <p className={styles.ParagraphRenderer}>{props.children}</p>
}

export default ParagraphRenderer
