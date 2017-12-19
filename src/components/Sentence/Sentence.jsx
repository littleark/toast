import React from 'react'
import { connect } from 'react-redux'

import './sentence.css'

const mapStateToProps = state => {
  return {
    table: state.toast.table,
    toast: state.toast.toast
  }
}

const Sentence = (props) => {
  const {toast} = props

  return <p className='sentence' id='sentence'>
            A <b id='breadSize'>{`${toast.a * 100}cm`}</b> large buttered toast,<br />
            hanging out <b id='breadOut'>{`${(toast.r + toast.a / 2) * 100}cm`}</b><br />from the border of a dining table, will <b id='breadAction'>fall</b>!<br /><em><span id='landStatus'>And land butter-side <b id='breadStatus'>down</b>!</span></em>
  </p>
}

export default connect(mapStateToProps)(Sentence)
