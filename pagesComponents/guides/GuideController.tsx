import 'reflect-metadata'
import React from 'react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'

import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'
import { Guide } from 'types/materials'
import { serverSideGuideClient } from 'facades/materialClientFacade'
import Head from 'next/head'
import { DEFAULT_AUTHOR_NAME, DEFAULT_DESCRIPTION, DEFAULT_TITLE, OPEN_GRAPH_IMAGE } from 'consts/metaDefaults'
import { baseURL } from 'consts/endpoints'
import absoluteUrl from 'next-absolute-url'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { fetchGuide } = serverSideGuideClient()
  if (!context.params) {
    return {
      props: {},
    }
  }
  const response = await fetchGuide((context.params['id'] as string) || '')
  let fullUrl
  if (context.req) {
    // Server side rendering
    const { origin } = absoluteUrl(context.req)
    fullUrl = origin + context.req.url
  } else {
    // Client side rendering
    fullUrl =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
  }
  return {
    props: { guide: response.material, error: response.error, fullUrl },
  }
}

const LoadableGuideView = dynamic(() => import('./GuideView'), {
  loading: () => {
    return <FullscreenMessageView title={`Loading...`} subtitle={``} />
  },
})

type Props = {
  guide: Guide
  error?: Error
  fullUrl: string
}

const GuideController: React.FC<Props> = (props: Props) => {
  if (props.error) {
    return <FullscreenMessageView title={`Sorry!`} subtitle={`There's nothing here yet!`} />
  }

  if (!props.guide) {
    return null
  }

  const getMetaDescription = () => {
    if (props.guide?.metaDescription) {
      return props.guide?.metaDescription
    }

    if (props.guide?.subtitle) {
      return props.guide?.subtitle
    }

    return DEFAULT_DESCRIPTION
  }

  const getMetaTitle = () => {
    if (props.guide?.name) {
      return `${props.guide?.name} - ${DEFAULT_AUTHOR_NAME}`
    }

    return `${DEFAULT_TITLE} - ${DEFAULT_AUTHOR_NAME}`
  }

  return (
    <>
      <Head>
        <title>{getMetaTitle()}</title>
        <meta property='og:url' content={props.fullUrl} />
        <meta property='og:title' content={props.guide?.name || DEFAULT_TITLE} />
        <meta property='og:description' content={props.guide?.subtitle || DEFAULT_DESCRIPTION} />
        <meta name='description' content={getMetaDescription()} />
      </Head>
      <LoadableGuideView guide={props.guide} />
    </>
  )
}

export default GuideController
