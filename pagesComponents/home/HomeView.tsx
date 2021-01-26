import React from 'react'
import { useTrail, animated } from 'react-spring'
import Head from 'next/head'

import LinkWithStyles from 'components/LinkWithStyles'
import { PreviewMaterial } from 'types/materials'
import Arrow from 'assets/icons/Arrow.svg'

import styles from './Home.module.scss'
import InlineIcon from 'components/InlineIcon'
import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'

interface Props {
  materialPreviews: PreviewMaterial[]
  currentPage: number
  pagesCount: number
  getDifferentPageLink: (next?: boolean) => string
  getPreviewItemLink: (previewMaterial: PreviewMaterial) => string
}

const HomeView: React.FC<Props> = (props: Props) => {
  const renderPreviewsItems = (previewMaterial: PreviewMaterial) => {
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
      <Head>
        <title>LWS - Alex Korzh - Home</title>
        <meta name='description' content='Personal blog by Alex Korzh' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <DefaultLayoutWrapper>
        <div className={styles.HomeContainer}>
          <div className={styles.PreviewsGrid}>
            {transitions.map((style, index) => (
              //@ts-expect-error
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
