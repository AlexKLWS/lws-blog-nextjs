import React from 'react'
import ReactMarkdown from 'react-markdown'

import CodeRenderView from 'components/ArticleText/markdownNodes/CodeRenderer/CodeRendererView'
import ImageRenderer from 'components/ArticleText/markdownNodes/ImageRenderer/ImageRenderer'
import InlineCodeRenderer from 'components/ArticleText/markdownNodes/InlineCodeRenderer/InlineCodeRenderer'
import TextRenderer from 'components/ArticleText/markdownNodes/TextRenderer/TextRenderer'
import LinkRenderer from 'components/ArticleText/markdownNodes/LinkRenderer/LinkRenderer'
import ParagraphRenderer from './markdownNodes/ParagraphRenderer/ParagraphRenderer'
import ListRenderer from './markdownNodes/ListRenderer/ListRenderer'
import ListItemRenderer from './markdownNodes/ListItemRenderer/ListItemRenderer'
import BlockQuoteRenderer from './markdownNodes/BlockQuoteRenderer/BlockQuoteRenderer'
import ThematicBreakRenderer from './markdownNodes/ThematicBreakRenderer/ThematicBreakRenderer'

type Props = {
  text: string
}

const ArticleTextView: React.FC<Props> = (props: Props) => {
  return (
    <ReactMarkdown
      source={props.text}
      escapeHtml={false}
      renderers={{
        code: CodeRenderView,
        inlineCode: InlineCodeRenderer,
        text: TextRenderer,
        image: ImageRenderer,
        link: LinkRenderer,
        paragraph: ParagraphRenderer,
        list: ListRenderer,
        listItem: ListItemRenderer,
        blockquote: BlockQuoteRenderer,
        thematicBreak: ThematicBreakRenderer,
      }}
    />
  )
}

export default ArticleTextView
