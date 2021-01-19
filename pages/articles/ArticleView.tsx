import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useTransition, animated } from 'react-spring'
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
  const transitions = useTransition(!!article, null, {
    config: { tension: 280, friction: 90 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const formattedDate = !!article && DateTime.fromISO(article.createdAt!).toLocaleString(DateTime.DATE_SHORT)

  return (
    <>
      <Head>
        <title>{`${article?.name} - Alex Korzh`}</title>
        <meta name='description' content={article?.subtitle} />
      </Head>
      <DefaultLayoutWrapper>
        <div className={styles.ArticleContainer}>
          {transitions.map(({ item, key, props }) =>
            !item ? (
              <animated.div
                key={key}
                style={{ ...props, padding: '20px 42px', position: 'absolute', right: 0, left: 0 }}
              >
                <div className={styles.ArticleTitleContainer}>
                  <div className={styles.ArticleTitleSkeletonLoader} />
                  <div className={styles.ArticleSubtitleSkeletonLoader} />
                </div>
                <div className={styles.ArticleTextSkeletonLoader} />
              </animated.div>
            ) : (
              <animated.div
                key={key}
                style={{ ...props, padding: '20px 42px', minHeight: '720px', position: 'relative' }}
              >
                <div className={styles.ArticleTitleContainer}>
                  <h1 className={styles.ArticleTitle}>{article?.name}</h1>
                  <h2 className={styles.ArticleSubtitle}>{article?.subtitle}</h2>
                </div>
                <LoadableArticleTextView text={article!.articleText} />
                <p className={styles.ArticleDate}>{formattedDate}</p>
              </animated.div>
            ),
          )}
        </div>
      </DefaultLayoutWrapper>
    </>
  )
}
