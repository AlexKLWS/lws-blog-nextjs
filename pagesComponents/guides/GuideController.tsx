import 'reflect-metadata'
import React from 'react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'

import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'
import { Guide } from 'types/materials'
import { serverSideGuideClient } from 'facades/materialClientFacade'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { fetchGuide } = serverSideGuideClient()
  if (!context.params) {
    return {
      props: {},
    }
  }
  const response = await fetchGuide((context.params['id'] as string) || '')
  return {
    props: { guide: response.material, error: response.error },
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
}

const GuideController: React.FC<Props> = (props: Props) => {
  if (props.error) {
    return <FullscreenMessageView title={`Sorry!`} subtitle={`There's nothing here yet!`} />
  }

  if (!props.guide) {
    return null
  }

  return (
    <LoadableGuideView
      guideName={props.guide.name}
      guideSubtitle={props.guide.subtitle}
      guideInfo={props.guide.info}
      locations={props.guide.locations}
      defaultZoom={props.guide.defaultZoom}
      defaultCenter={props.guide.defaultCenter}
    />
  )
}

export default GuideController
