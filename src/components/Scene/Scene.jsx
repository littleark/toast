import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import {
  scaleLinear
} from 'd3-scale'
import {
  max as d3_max
} from 'd3-array'

import {BIG_TOAST_HEIGHT, BIGTOAST_DIST, MIN_HEIGHT} from './config'

import defs from './defs'

import World from '../World/World'
import Toast from '../Toast/Toast'

const w = window,
      d = document,
      e = d.documentElement,
      g = d.querySelector('body')

const margins = {
  top:0,
  bottom:20,
  left:0,
  right:30
}

const mapStateToProps = state => {
  console.log("mapStateToProps", state)
  return {
    statuses: state.toast.statuses,
    table: state.toast.table,
    toast: state.toast.toast
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

class Scene extends Component {


  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

    let {table} = this.props

    let __width = w.innerWidth || e.clientWidth || g.clientWidth
    let __height = w.innerHeight|| e.clientHeight|| g.clientHeight

    let WIDTH = __width
    let HEIGHT = d3_max([__height - BIG_TOAST_HEIGHT - 60, MIN_HEIGHT- BIG_TOAST_HEIGHT - 60,300])

    if(__width < __height) {
      HEIGHT=Math.min(HEIGHT,__height*0.75- BIG_TOAST_HEIGHT - 60)
    }

    let factorX = WIDTH/HEIGHT

    let xscale = scaleLinear().domain([0, table.y*factorX]).range([0, WIDTH-(margins.left+margins.right)])
		let yscale = scaleLinear().domain([0, table.y*1]).range([HEIGHT-(margins.top+margins.bottom)+BIG_TOAST_HEIGHT, BIG_TOAST_HEIGHT])
		let hscale = scaleLinear().domain([0, table.y*1]).range([0, HEIGHT-(margins.top+margins.bottom)])


    this.setState({
      width: WIDTH,
      height: HEIGHT,
      oWidth: WIDTH,
      oHeight: HEIGHT,
      factorX: factorX,
      scales:{
        xscale: xscale,
        yscale: yscale,
        hscale: hscale
      }
    })

  }

  componentWillReceiveProps(nextProps) {

    //if(nextProps.table.y !== this.props.table.y) {
      let HEIGHT = this.state.oHeight * (nextProps.table.y / nextProps.table.old_y);

      let yscale = scaleLinear().domain([0,nextProps.table.y]).range([HEIGHT-(margins.top+margins.bottom)+BIG_TOAST_HEIGHT,BIG_TOAST_HEIGHT])
      //let hscale = scaleLinear().domain([0,nextProps.table.old_y]).range([0,HEIGHT-(margins.top+margins.bottom)]);

      this.setState({
        height: HEIGHT,
        scales: Object.assign({},this.state.scales,{yscale: yscale})
      })
    //}



    /*
    HEIGHT=HEIGHT * (data.table.y / data.table.old_y);
    var FACTOR_Y=HEIGHT/500;

    svg.attr("height",HEIGHT+BIG_TOAST_HEIGHT);

    yscale.domain([0,data.table.y]).range([HEIGHT-(margins.top+margins.bottom)+BIG_TOAST_HEIGHT,BIG_TOAST_HEIGHT]),
    hscale.domain([0,data.table.y]).range([0,HEIGHT-(margins.top+margins.bottom)]);
    */
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //
  // }

  render () {

    if(!this.state.scales) {
      return <div id="toast"></div>
    }
    console.log("!!!!", this.state.height)
    return  <div id="toast">
              <svg width={this.state.width} height={this.state.height + BIG_TOAST_HEIGHT}>
                {defs}
                <World margins={margins} scales={this.state.scales} width={this.state.width} height={this.state.height}/>
                <Toast margins={margins} scales={this.state.scales} width={this.state.width} height={this.state.height}/>
              </svg>
            </div>
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Scene);
