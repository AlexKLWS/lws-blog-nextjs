import React from 'react'

const injectPropForKey = (s: string, key: string, value: string) => {
  const indexOfWidth = s.indexOf(key)
  if (indexOfWidth < 0) {
    const indexOfG = s.indexOf('<svg') + 4
    s = [s.slice(0, indexOfG), ` ${key}="${value}" `, s.slice(indexOfG)].join('')
  } else {
    const indexOfOpeningQMark = s.indexOf(`"`, indexOfWidth)
    const indexOfClosingQMark = s.indexOf(`"`, indexOfOpeningQMark + 1)
    const substringToReplace = s.slice(indexOfWidth, indexOfClosingQMark + 1)
    s = s.replace(substringToReplace, `${key}="${value}"`)
  }
  return s
}

const InlineIcon = ({ svg, height = '58px', width = '58px' }: { svg: string; height?: string; width?: string }) => {
  svg = injectPropForKey(svg, 'width', width)
  svg = injectPropForKey(svg, 'height', height)
  return <div style={{ width: '100%', height: 'auto' }} dangerouslySetInnerHTML={{ __html: svg }} />
}

export default InlineIcon
