import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import HomeView from './HomeView'
import { serverSideMaterialPreviewsProvider } from 'facades/materialPreviewsFetchFacade'
import { page } from 'consts/query'
import { PreviewMaterial } from 'types/materials'
import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'
import { PagePreviewsData } from 'types/pagePreviewData'
import { resolveCategoryFromPathname } from 'helpers/resolveCategory'
import Head from 'next/head'
import { DEFAULT_AUTHOR_NAME, DEFAULT_DESCRIPTION, DEFAULT_TITLE, OPEN_GRAPH_IMAGE } from 'consts/metaDefaults'
import { baseURL } from 'consts/endpoints'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query[page] || 1)
  const { fetchMaterialPreviews } = serverSideMaterialPreviewsProvider(
    resolveCategoryFromPathname(context.resolvedUrl),
    currentPage,
    false,
  )
  const response = await fetchMaterialPreviews()
  return {
    props: response,
  }
}

const HomeController: React.FC<PagePreviewsData> = (props: PagePreviewsData) => {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
    const pageFromQuery = Number(router.query[page] || 1)
    if (pageFromQuery !== currentPage) {
      setCurrentPage(pageFromQuery as number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const getDifferentPageLink = (next?: boolean) => {
    let newPage = currentPage
    if (next) {
      newPage = currentPage + 1
      if (newPage > props.pagesCount) {
        newPage = props.pagesCount
      }
    } else {
      newPage = currentPage - 1
      if (newPage < 1) {
        newPage = 1
      }
    }
    return `${router.pathname}?${page}=${newPage}`
  }

  const getPreviewItemLink = (previewMaterial: PreviewMaterial) => {
    if (previewMaterial.url) {
      return previewMaterial.url
    } else if (previewMaterial.isGuideMaterial) {
      return `/guides/${previewMaterial.referenceId}`
    } else {
      return `/articles/${previewMaterial.referenceId}`
    }
  }

  if (!props.materialPreviews || !props.materialPreviews.length) {
    return <FullscreenMessageView title={`Sorry!`} subtitle={`There's nothing here yet!`} />
  }

  return (
    <>
      <Head>
        <title>{`${DEFAULT_TITLE} - ${DEFAULT_AUTHOR_NAME}`}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:image' content={OPEN_GRAPH_IMAGE} />
        <meta property='og:url' content={baseURL} />
        <meta property='og:type' content='website' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:title' content={DEFAULT_TITLE} />
        <meta property='og:description' content={DEFAULT_DESCRIPTION} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:image' content={OPEN_GRAPH_IMAGE} />
        <meta property='vk:image' content={OPEN_GRAPH_IMAGE} />
        <meta name='description' content={DEFAULT_DESCRIPTION} />
      </Head>
      <HomeView
        materialPreviews={props.materialPreviews}
        getDifferentPageLink={getDifferentPageLink}
        currentPage={currentPage}
        pagesCount={props.pagesCount}
        getPreviewItemLink={getPreviewItemLink}
      />
    </>
  )
}

export default HomeController
