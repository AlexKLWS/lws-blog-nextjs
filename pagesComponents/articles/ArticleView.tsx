import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useMediaQuery } from 'react-responsive'
import { DateTime } from 'luxon'

import { Article } from 'types/materials'

import styles from './Article.module.scss'
import { isSmallerScreenQuery } from 'consts/media'
import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'
import ArticleTextView from 'components/ArticleText/ArticleTextView'

type Props = {
  article: Article | null
}

const ArticleView: React.FC<Props> = ({ article }: Props) => {
  const isSmallerScreen = useMediaQuery({
    query: isSmallerScreenQuery,
  })

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
    <DefaultLayoutWrapper>
      <div className={styles.ArticleContainer}>
        <animated.div
          style={{
            ...style,
            padding: isSmallerScreen ? '20px 8px' : '20px 42px',
            minHeight: '720px',
            position: 'relative',
          }}
        >
          <div className={styles.ArticleTitleContainer}>
            <h1 className={styles.ArticleTitle}>{article?.name}</h1>
            <h2 className={styles.ArticleSubtitle}>{article?.subtitle}</h2>
          </div>
          <ArticleTextView text={article?.articleText || ''} />
          <p className={styles.ArticleDate}>{formattedDate}</p>
        </animated.div>
      </div>
    </DefaultLayoutWrapper>
  )
}

export default ArticleView
