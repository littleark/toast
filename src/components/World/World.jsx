import React from 'react'
import { connect } from 'react-redux'

import Table from './Table'
import Cup from './Cup'
import BigToast from './BigToast'
import Floor from './Floor'

import './world.css'

const mapStateToProps = state => {
  
  return {
    table: state.toast.table,
    toast: state.toast.toast
  }
}

const World = (props) => {


  return  <g id="world" transform={`translate(${props.margins.left},${props.margins.top})`}>
            <Table scales={props.scales} table={props.table}/>
            <Cup scales={props.scales} margins={props.margins} toast={props.toast}/>
            <BigToast scales={props.scales} margins={props.margins} table={props.table} toast={props.toast}/>
            <Floor scales={props.scales} margins={props.margins} width={props.width} height={props.height} table={props.table}/>
          </g>

}

//export default World
export default connect(mapStateToProps)(World);
