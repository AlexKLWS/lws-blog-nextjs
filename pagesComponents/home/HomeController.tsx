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
    <HomeView
      materialPreviews={props.materialPreviews}
      getDifferentPageLink={getDifferentPageLink}
      currentPage={currentPage}
      pagesCount={props.pagesCount}
      getPreviewItemLink={getPreviewItemLink}
    />
  )
}

export default HomeController
