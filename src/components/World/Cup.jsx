import React from 'react'

import {BIG_TOAST_HEIGHT} from '../Scene/config'

const Cup = (props) => {
  const {margins, toast, scales} = props
  const {xscale} = scales

  const smokeSmallPath = 'm 0,0 c -7.9853091,4.18678 -16.235929,9.63543 -14.637579,19.743246 1.73425,10.93612 10.72905,18.55258 0.88654,28.809245 -1.26833,1.3201 1.79896,1.22951 2.50431,0.49827 5.9533899,-6.205765 6.45813,-12.295045 3.3908399,-20.150935 -1.48187,-3.79205 -3.2420099,-7.35762 -3.8891099,-11.42145 C -13.065099,9.1501 -4.257969,4.14149 1.92838,0.89948 z' // 17.8x50.6

  const cupPath = 'm 0,0 c 0,0 -2.86729498,98.77329823 18.43259352,98.77329823 21.299883,0 23.347938,0 23.347938,0 l 4.431732,0 c 0,0 -4.09613,0 17.203748,0 21.299881,0 18.432589,-98.77329823 18.432589,-98.77329823 z' // 83.1x99.7

  const sizeCM = xscale.invert(100)

  let x = margins.left + xscale(0.1)
  let y = BIG_TOAST_HEIGHT - (100 * toast.standard_a / sizeCM)
  let step = 83 / 6

  return <g id='cup' transform={`translate(${x},${y + 1}) scale(${toast.standard_a / sizeCM})`}>
    <path d={cupPath} />
    <path d={smokeSmallPath} transform={`translate(${step + 17.8 / 2},${-60})`} />
    <path d={smokeSmallPath} transform={`translate(${step * 5 + 17.8 / 2},${-60})`} />
    <path d={smokeSmallPath} transform={`translate(${step * 3 + 17.8 / 2},${-60})`} />
  </g>
}

export default Cup
