import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

import styles from './CodeRendererView.module.scss'
import { MarkdownNodeProps } from 'types/markdown'

const CodeRenderView = (props: MarkdownNodeProps) => {
  if (!props.value) {
    return null
  }
  return (
    <Highlight {...defaultProps} theme={theme} code={props.value!} language='jsx'>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className={styles.CodeRendererPre}>
          {tokens.map((line, i) => (
            /*@ts-ignore */
            <div className={styles.CodeRendererLine} key={i} {...getLineProps({ line, key: i })}>
              <span className={styles.CodeRendererLineContent}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeRenderView
