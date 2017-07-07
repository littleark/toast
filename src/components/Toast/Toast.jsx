import React from 'react'
import { connect } from 'react-redux'

import './toast.css'

const mapStateToProps = state => {

  return {
    table: state.toast.table,
    toast: state.toast.toast,
    statuses: state.toast.statuses
  }
}

const Toast = (props) => {

  const {margins, toast, table, scales, statuses} = props
  const {xscale, yscale, hscale} = scales

  if(!statuses) {
    return null
  }

  const lastStatus=statuses[statuses.length-1];

  const toasts = statuses.map((d,i) => {
    let className = ["toast"]

    if(Math.cos(d.rad) > 0 ) {
      className.push("safe")
    }

    if(i === 0 || i === statuses.length - 1) {
      className.push("visible")
    }

    if(i === statuses.length - 1) {
      className.push("last")
    }
    let x = xscale(table.w + d.x)
    let y = yscale(d.y)

    let toastRotate = `rotate(${d.deg})`
    if(d.table) {
      let dx = 0
      let dy = 0
      toastRotate = `rotate(${d.deg}, ${dx}, ${-dy})`
    }

    return  <g key={`status_${i}`} className={className.join(" ")} rel={`${d.p}: ${d.y},${d.deg}`} transform={`translate(${x},${y})`}>
              <g className="t" transform={toastRotate}>
                <rect className="bread" x={-xscale(toast.a/2)} y={-hscale(toast.h)} width={xscale(toast.a)} height={hscale(toast.h)} rx={1} ry={1} />
                <line className="butter" x1={-xscale(toast.a/2-0.005)} y1={-hscale(toast.h)} x2={xscale(toast.a/2-0.005)} y2={-hscale(toast.h)} />
              </g>
            </g>
  })

  return  <g transform={`translate(${props.margins.left},${props.margins.top})`}>
            <g>
              {toasts}
            </g>
          </g>

}

export default connect(mapStateToProps)(Toast);
