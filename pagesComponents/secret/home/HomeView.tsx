import React from 'react'
import { useTrail, animated } from 'react-spring'

import LinkWithStyles from 'components/LinkWithStyles'
import { PreviewMaterial } from 'types/materials'
import Arrow from 'assets/icons/Arrow.svg'
import External from 'assets/icons/External.svg'

import styles from './Home.module.scss'
import InlineIcon from 'components/InlineIcon'
import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'
import Dropdown from 'components/Dropdowns/Dropdown/Dropdown'
import { DropdownItem } from 'types/dropdown'
import { detectExternaUrl } from 'helpers/detectExternaUrl'
import { DEFAULT_DESCRIPTION } from 'consts/metaDefaults'

interface Props {
  materialPreviews: PreviewMaterial[]
  currentPage: number
  pagesCount: number
  dropdownItems: DropdownItem[]
  getDifferentPageLink: (next?: boolean) => string
  getPreviewItemLink: (previewMaterial: PreviewMaterial) => string
}

const HomeView: React.FC<Props> = (props: Props) => {
  const renderPreviewsItems = (previewMaterial: PreviewMaterial) => {
    const isExternalMaterial = detectExternaUrl(previewMaterial.url)
    return (
      <div key={previewMaterial.referenceId} className={styles.MaterialPreviewItemContainer}>
        <LinkWithStyles className={styles.MaterialPreviewItem} href={props.getPreviewItemLink(previewMaterial)}>
          <div className={styles.MaterialPreviewIconContainer}>
            <InlineIcon svg={previewMaterial.icon.data} />
          </div>
          <div>
            <p className={styles.MaterialPreviewItemsTitle}>{previewMaterial.name}</p>
            <p className={styles.MaterialPreviewItemsSubtitle}>{previewMaterial.subtitle}</p>
          </div>
          {isExternalMaterial && (
            <div className={styles.MaterialPreviewItemExternalLinkIconContainer}>
              <External />
            </div>
          )}
        </LinkWithStyles>
      </div>
    )
  }

  const renderPageControls = () => {
    return (
      <div className={styles.PaginationControlsContainer}>
        <div style={{ display: 'flex' }}>
          <LinkWithStyles ariaLabel={'Prev'} className='App-button' href={props.getDifferentPageLink()}>
            <Arrow />
          </LinkWithStyles>
          <p className={styles.PageIndex}>{`${props.currentPage}/${props.pagesCount}`}</p>
          <LinkWithStyles ariaLabel={'Next'} className='App-button' href={props.getDifferentPageLink(true)}>
            <Arrow className={styles.ArrowRight} />
          </LinkWithStyles>
        </div>
      </div>
    )
  }

  const transitions = useTrail(props.materialPreviews?.length || 0, {
    config: { mass: 5, tension: 1700, friction: 200 },
    from: { opacity: 0 },
    opacity: 1,
  })

  return (
    <>
      <DefaultLayoutWrapper isSecret>
        <div style={{ paddingBottom: '40px' }}>
          <Dropdown dropdownTriggerText={'+ Add'} items={props.dropdownItems} />
        </div>
        <div className={styles.HomeContainer}>
          <div className={styles.PreviewsGrid}>
            {transitions.map((style, index) => (
              <animated.div key={`${index}`} style={style}>
                {renderPreviewsItems(props.materialPreviews[index])}
              </animated.div>
            ))}
          </div>
          {props.pagesCount > 1 ? renderPageControls() : <div style={{ height: '48px' }} />}
        </div>
      </DefaultLayoutWrapper>
    </>
  )
}

export default HomeView
