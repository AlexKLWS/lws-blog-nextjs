import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import styles from './InlineCodeRenderer.module.scss'

const InlineCodeRenderer = (props: MarkdownNodeProps) => {
  return <span className={styles.InlineCodeRenderer}>{props.value}</span>
}

export default InlineCodeRenderer
