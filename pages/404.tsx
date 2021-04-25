import React from 'react'
import Head from 'next/head'

import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'
import { DEFAULT_DESCRIPTION } from 'consts/metaDefaults'

const EmptyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>LWS - Alex Korzh - 404</title>
        <meta name='description' content={DEFAULT_DESCRIPTION} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FullscreenMessageView title={`Sorry!`} subtitle={`This page doesn't exist!`} />
    </>
  )
}

export default EmptyPage
