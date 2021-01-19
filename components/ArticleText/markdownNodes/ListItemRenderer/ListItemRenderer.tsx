import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import styles from './ListItemRenderer.module.scss'

const ListItemRenderer = (props: MarkdownNodeProps) => {
  return <li className={styles.ListItemRenderer}>{props.children}</li>
}

export default ListItemRenderer
