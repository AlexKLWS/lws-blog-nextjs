import React from 'react'
import Image from 'next/image'

import { MarkdownNodeProps } from 'types/markdown'

import styles from './ImageRenderer.module.scss'

const ImageRenderer = (props: MarkdownNodeProps) => {
  return (
    <div className={styles.ImageRenderer}>
      {props.src ? <Image width={'960px'} height={'500px'} objectFit={'contain'} src={props.src} alt='' /> : null}
    </div>
  )
}

export default ImageRenderer
