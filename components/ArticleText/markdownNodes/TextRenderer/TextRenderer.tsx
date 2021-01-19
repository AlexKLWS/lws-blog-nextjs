import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import styles from './TextRenderer.module.scss'

const TextRenderer = (props: MarkdownNodeProps) => {
  return <span className={styles.TextRenderer}>{props.value}</span>
}

export default TextRenderer
