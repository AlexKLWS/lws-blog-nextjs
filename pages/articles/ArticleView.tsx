import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useSpring, animated } from 'react-spring'
import { DateTime } from 'luxon'

import { Article } from 'types/materials'

import styles from './Article.module.scss'
import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'

interface Props {
  article: Article | null
}

const LoadableArticleTextView = dynamic(() => import('../../components/ArticleText/ArticleTextView'), {
  loading: () => {
    return <div className={styles.ArticleTextSkeletonLoader} />
  },
})

export const ArticleView: React.FC<Props> = ({ article }: Props) => {
  const [style, _] = useSpring(
    {
      config: { tension: 280, friction: 90 },
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    [],
  )
  const formattedDate = !!article && DateTime.fromISO(article.createdAt!).toLocaleString(DateTime.DATE_SHORT)

  return (
    <>
      <Head>
        <title>{`${article?.name} - Alex Korzh`}</title>
        <meta name='description' content={article?.subtitle} />
      </Head>
      <DefaultLayoutWrapper>
        <div className={styles.ArticleContainer}>
          {/* @ts-expect-error */}
          <animated.div style={{ ...style, padding: '20px 42px', minHeight: '720px', position: 'relative' }}>
            <div className={styles.ArticleTitleContainer}>
              <h1 className={styles.ArticleTitle}>{article?.name}</h1>
              <h2 className={styles.ArticleSubtitle}>{article?.subtitle}</h2>
            </div>
            <LoadableArticleTextView text={article!.articleText} />
            <p className={styles.ArticleDate}>{formattedDate}</p>
          </animated.div>
        </div>
      </DefaultLayoutWrapper>
    </>
  )
}
