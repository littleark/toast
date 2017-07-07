import React from 'react'

const defs = (
  <defs>
    <linearGradient id="tableEdge">
      <stop offset="50%" stopColor="#fff"></stop>
      <stop offset="100%" stopColor="#ddd"></stop>
    </linearGradient>
    <linearGradient id="verticalGradient" x1={0} y1={0} x2={0} y2={1}>
      <stop offset="0%" stopColor="#f4f4f4" stopOpacity="0"></stop>
      <stop offset="100%" stopColor="#f4f4f4" stopOpacity="1"></stop>
    </linearGradient>
    <pattern id="diagonalHatch" width={5} height={5} patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1={0} y1={0} x2={0} y2={5} style={{stroke:"#333", strokeOpacity:1, strokeWidth:1}}/>
    </pattern>
  </defs>
)

export default defs
