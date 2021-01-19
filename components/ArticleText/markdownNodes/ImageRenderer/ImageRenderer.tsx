import React from 'react'
import { useImage } from 'react-image'

import { MarkdownNodeProps } from 'types/markdown'

import styles from './ImageRenderer.module.scss'

const ImageRenderer = (props: MarkdownNodeProps) => {
  const { src } = useImage({
    srcList: props.src ? props.src : '',
    useSuspense: false,
  })
  return <img className={styles.ImageRenderer} src={src} width={'100%'} alt='' />
}

export default ImageRenderer
