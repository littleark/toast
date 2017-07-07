import React from 'react'

import {BIG_TOAST_HEIGHT} from '../Scene/config'

const Floor = (props) => {

  const {margins, table, scales} = props
  const {hscale, yscale} = scales

  const y = yscale(0)
  const height = hscale(props.table.h)

  return  <g id="floor" transform={`translate(${0},${ (y) })`}>
            <rect x={0} y={0} width={props.width} height={margins.bottom} style={{fill:'url(#diagonalHatch)'}} />
            <rect x={0} y={0} width={props.width} height={margins.bottom} style={{fill:'url(#verticalGradient)'}} />
            <line x1={0} y1={0} x2={props.width} />
          </g>
}

export default Floor
