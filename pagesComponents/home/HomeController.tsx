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
import absoluteUrl from 'next-absolute-url'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query[page] || 1)
  const { fetchMaterialPreviews } = serverSideMaterialPreviewsProvider()
  const response = await fetchMaterialPreviews(resolveCategoryFromPathname(context.resolvedUrl), currentPage, false)
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
    props: { pagePreviews: response, fullUrl },
  }
}

type Props = {
  pagePreviews: PagePreviewsData
  fullUrl: string
}

const HomeController: React.FC<Props> = (props: Props) => {
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
      if (newPage > props.pagePreviews.pagesCount) {
        newPage = props.pagePreviews.pagesCount
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

  if (!props.pagePreviews.materialPreviews || !props.pagePreviews.materialPreviews.length) {
    return <FullscreenMessageView title={`Sorry!`} subtitle={`There's nothing here yet!`} />
  }

  return (
    <>
      <Head>
        <meta property='og:url' content={props.fullUrl} />
      </Head>
      <HomeView
        materialPreviews={props.pagePreviews.materialPreviews}
        getDifferentPageLink={getDifferentPageLink}
        currentPage={currentPage}
        pagesCount={props.pagePreviews.pagesCount}
        getPreviewItemLink={getPreviewItemLink}
      />
    </>
  )
}

export default HomeController
