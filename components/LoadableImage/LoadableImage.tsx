import React from 'react'

import Image from 'next/image'

type Props = {
  src?: string
  className: string
}

const LoadableImage: React.FC<Props> = (props: Props) => {
  return (
    <div className={props.className}>
      {props.src ? (
        <Image src={props.src} objectFit={'contain'} height={'300px'} width={'400px'} alt='' />
      ) : (
        <div style={{ height: '300px', width: '400px' }} />
      )}
    </div>
  )
}

export default LoadableImage
