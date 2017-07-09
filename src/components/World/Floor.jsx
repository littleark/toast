import React from 'react'

const Floor = (props) => {
  const {margins, scales} = props
  const {yscale} = scales

  const y = yscale(0)

  return <g id='floor' transform={`translate(${0},${(y)})`}>
    <rect x={0} y={0} width={props.width} height={margins.bottom} style={{fill: 'url(#diagonalHatch)'}} />
    <rect x={0} y={0} width={props.width} height={margins.bottom} style={{fill: 'url(#verticalGradient)'}} />
    <line x1={0} y1={0} x2={props.width} />
  </g>
}

export default Floor
