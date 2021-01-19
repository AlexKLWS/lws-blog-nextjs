import React from 'react'

import { useImage } from 'react-image'

type Props = {
  src?: string
  className: string
}

const LoadableImage: React.FC<Props> = (props: Props) => {
  const { src } = useImage({
    srcList: props.src || '',
  })

  return <img src={src} className={props.className} alt='' />
}

export default LoadableImage
