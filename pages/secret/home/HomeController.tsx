import React, { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import HomeView from './HomeView'
import routes from 'consts/routes'
import { useMaterialPreviewsProvider } from 'facades/materialPreviewsFetchFacade'
import { resolveCategoryFromPathname } from 'helpers/resolveCategory'
import { page } from 'consts/query'
import { PreviewMaterial } from 'types/materials'

const HomeController: React.FC = () => {
  const router = useRouter()

  const { materialPreviews, pagesCount, fetchMaterialPreviews } = useMaterialPreviewsProvider(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
    const category = resolveCategoryFromPathname(router.pathname)
    const pageFromQuery = Number(router.query[page] || 1)
    fetchMaterialPreviews(category, pageFromQuery)
    if (pageFromQuery !== currentPage) {
      setCurrentPage(pageFromQuery as number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const getDifferentPageLink = (next?: boolean) => {
    let newPage = currentPage
    if (next) {
      newPage = currentPage + 1
      if (newPage > pagesCount) {
        newPage = pagesCount
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
      return `${routes.secret.pageEditor}/${previewMaterial.referenceId}`
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
          router.push(routes.secret.pageEditor)
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
      materialPreviews={materialPreviews}
      getDifferentPageLink={getDifferentPageLink}
      currentPage={currentPage}
      pagesCount={pagesCount}
      getPreviewItemLink={getPreviewItemLink}
    />
  )
}

export default HomeController
