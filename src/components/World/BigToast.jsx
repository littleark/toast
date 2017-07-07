import React from 'react'

import {format as d3_format} from 'd3-format'

import {BIG_TOAST_HEIGHT, BIGTOAST_DIST} from '../Scene/config'

const TABLE_STROKE = 2

const BigToast = (props) => {

  const {margins, toast, table, scales} = props
  const {xscale, yscale, hscale} = scales

  var d="m 95.161829,98.60232 c -22.408255,1.0226 -70.826949,2.5533 -90.8720704,0 C 1.0196925,78.79162 -0.00539653,61.02592 0.55664608,45.31811 0.76421863,39.49512 4.5324588,34.07612 4.2897586,29.57554 4.0757992,25.57677 -1.8000995,21.6001 0.55664608,16.25369 c 9.95709592,-22.5818098 90.87207092,-20.7418098 98.33829592,0 1.900088,5.27698 -3.64689,10.40247 -3.733113,13.32185 -0.105383,3.55375 3.270066,8.39204 3.733113,12.10991 2.187498,17.64567 1.219888,38.67157 -3.733113,56.91687 z";

  var size_cm=xscale.invert(100);
  var SIZE_FACTOR=1.6;
  var bigToastScale=xscale.copy().domain([0,xscale.domain()[1]*(1/SIZE_FACTOR)]);

  var size=bigToastScale(toast.a);

  let bigToastX = margins.left+xscale(table.w + toast.r)
  let bigToastY = BIG_TOAST_HEIGHT- BIGTOAST_DIST;

  const bread_size = bigToastScale(toast.a)
  const breadSizeHalf = bigToastScale(toast.a / 2)
  const hangout = bigToastScale(toast.a/2 + toast.r/SIZE_FACTOR)

  return  <g id="bigToast" transform={`translate(${bigToastX},${bigToastY})`}>
            <g transform={`translate(${-breadSizeHalf},${-bigToastScale(toast.a)}) scale(${SIZE_FACTOR*(toast.a/size_cm)})`}>
              <path d={d} style={{fill:"#111"}}/>
              <line className="butter" x1={85} y1={15} x2={15} y2={85} />
              <line className="butter" x1={60} y1={15} x2={15} y2={60} />
              <line className="butter" x1={35} y1={15} x2={15} y2={35} />
              <line className="butter" x1={85} y1={40} x2={40} y2={85} />
              <line className="butter" x1={85} y1={65} x2={65} y2={85} />

            </g>
            <line className="left lens" x1={-breadSizeHalf} y1={0} x2={-xscale(toast.a/2)-2} y2={BIGTOAST_DIST-hscale(toast.h)}/>
            <line className="right lens" x1={breadSizeHalf} y1={0} x2={xscale(toast.a/2)+2} y2={BIGTOAST_DIST-hscale(toast.h)}/>
            <g className="size" transform={`translate(${-breadSizeHalf},0)`}>
              <path className="bread-size" d={`m0,${-bread_size} l0,-5 l${bread_size},0 l0,5`}/>
              <rect />
              <text className="bread-size" x={breadSizeHalf} y={-(bread_size+10)}>{d3_format(",.3f")(toast.a)*100+"cm"}</text>
              <text className="hangout" x={(bread_size - hangout + (bread_size - hangout + hangout))/2} y={25}>{(d3_format(",.3f")(toast.a/2 + toast.r) * 100)+"cm"}</text>
              <path className="hangout" d={`m${bread_size - hangout},5 l0,5 l${hangout},0 l0,-5`}/>
            </g>
          </g>

}

export default BigToast
