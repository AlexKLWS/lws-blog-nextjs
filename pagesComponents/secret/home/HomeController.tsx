import React, { useMemo, useState } from 'react'
import absoluteUrl from 'next-absolute-url'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import HomeView from './HomeView'
import routes from 'consts/routes'
import { getMaterialPreviewsFetch } from 'facades/getMaterialPreviewsFetch'
import { resolveCategoryFromPathname } from 'helpers/resolveCategory'
import { page } from 'consts/query'
import { PreviewMaterial } from 'types/materials'
import { PagePreviewsData } from 'types/pagePreviewData'
import { getServerSession } from 'facades/sessionFacade'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getServerSession(context)
  const [_, error] = await session.checkUserAccess()
  if (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const currentPage = Number(context.query[page] || 1)
  const { fetchMaterialPreviews } = getMaterialPreviewsFetch(session)
  const [pagePreviews, pagePreviewsFetchError] = await fetchMaterialPreviews(
    resolveCategoryFromPathname(context.resolvedUrl),
    currentPage,
    true,
  )
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
    props: { pagePreviews, fullUrl },
  }
}

type Props = {
  pagePreviews: PagePreviewsData
  fullUrl: string
}

const HomeController: React.FC<Props> = (props) => {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)

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
      return `${routes.secret.extMaterialEditor}/${previewMaterial.referenceId}`
    } else if (previewMaterial.isGuideMaterial) {
      return `${routes.secret.guideEditor}/${previewMaterial.referenceId}`
    } else {
      return `${routes.secret.editor}/${previewMaterial.referenceId}`
    }
  }

  const dropdownItems = useMemo(
    () => [
      {
        label: 'Add article',
        callback: () => {
          router.push(routes.secret.editor)
        },
      },
      {
        label: 'Add guides',
        callback: () => {
          router.push(routes.secret.guideEditor)
        },
      },
      {
        label: 'Add page',
        callback: () => {
          router.push(routes.secret.extMaterialEditor)
        },
      },
      {
        label: 'Add files',
        callback: () => {
          router.push(routes.secret.fileUpload)
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <HomeView
      dropdownItems={dropdownItems}
      materialPreviews={props.pagePreviews.materialPreviews}
      getDifferentPageLink={getDifferentPageLink}
      currentPage={currentPage}
      pagesCount={props.pagePreviews.pagesCount}
      getPreviewItemLink={getPreviewItemLink}
    />
  )
}

export default HomeController
