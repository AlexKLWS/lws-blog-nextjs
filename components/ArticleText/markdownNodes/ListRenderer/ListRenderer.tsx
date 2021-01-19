import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import styles from './ListRenderer.module.scss'

const ListRenderer = (props: MarkdownNodeProps) => {
  if (props.ordered) {
    return <ol className={styles.ListRenderer}>{props.children}</ol>
  } else {
    return <ul className={styles.ListRenderer}>{props.children}</ul>
  }
}

export default ListRenderer
