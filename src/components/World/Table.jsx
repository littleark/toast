import React from 'react'

import {BIG_TOAST_HEIGHT} from '../Scene/config'

const TABLE_STROKE = 0


const Table = (props) => {

  const {xscale, yscale, hscale} = props.scales

  const x = xscale(props.table.x)
  const y = yscale(props.table.y)
  const width = xscale(props.table.w)
  const height = hscale(props.table.h)

  const legHeight = yscale(0) - (y + height - TABLE_STROKE)
  let bottomHeight = hscale(0.15)

  bottomHeight = (bottomHeight ) > legHeight ? hscale(props.table.y / 2 ) : bottomHeight

  return  <g id="table" transform={`translate(${x},${y})`}>
            <rect className="tableEdge" x={0} y={-BIG_TOAST_HEIGHT} width={width} height={BIG_TOAST_HEIGHT} />
            <rect className="top" x={0} y={TABLE_STROKE/2} width={width} height={height - TABLE_STROKE}/>
            <rect className="bottom" x={0} y={height-TABLE_STROKE/2} width={xscale(props.table.w-0.1-0.05)} height={bottomHeight} />
            <rect className="leg" x={xscale(props.table.w-0.08-0.07)} y={height-TABLE_STROKE/2} width={xscale(0.07)} height={legHeight + 1} />
          </g>

}

export default Table
