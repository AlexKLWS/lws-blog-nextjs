import React from 'react'

import { LocationType } from 'types/guide'

import Cafe from 'assets/icons/Cafe.svg'
import Bar from 'assets/icons/Bar.svg'
import Restaurant from 'assets/icons/Restaurant.svg'
import GenericIcon from 'assets/icons/Generic.svg'

const GuideItemIcon = ({ type, styleOverride }: { type: LocationType; styleOverride?: React.CSSProperties }) => {
  switch (type) {
    case LocationType.BAR:
      return <Bar style={styleOverride || pinIconStyle} alt='Bar' />
    case LocationType.CAFE:
      return <Cafe style={styleOverride || pinIconStyle} alt='Cafe' />
    case LocationType.RESTAURANT:
      return <Restaurant style={styleOverride || pinIconStyle} alt='Restaurant' />
    default:
      return <GenericIcon style={styleOverride || pinIconStyle} alt='' />
  }
}

const pinIconStyle = { width: '20px', height: '20px' }

export default GuideItemIcon
