import React from 'react'
import Head from 'next/head'

import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'

const EmptyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>LWS - Alex Korzh - 404</title>
        <meta name='description' content='Personal blog by Alex Korzh' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FullscreenMessageView title={`Sorry!`} subtitle={`This page doesn't exist!`} />
    </>
  )
}

export default EmptyPage
