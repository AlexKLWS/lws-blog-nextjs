import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import styles from './BlockQuoteRenderer.module.scss'

const BlockQuoteRenderer = (props: MarkdownNodeProps) => {
  return <blockquote className={styles.BlockQuoteRenderer}>{props.children}</blockquote>
}

export default BlockQuoteRenderer
