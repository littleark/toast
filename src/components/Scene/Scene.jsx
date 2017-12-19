import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'

import {
  scaleLinear
} from 'd3-scale'
import {
  max as d3Max
} from 'd3-array'

import {BIG_TOAST_HEIGHT, MIN_HEIGHT} from './config'

import defs from './defs'

import World from '../World/World'
import Toasts from '../Toasts/Toasts'

const w = window
const d = document
const e = d.documentElement
const g = d.querySelector('body')

const margins = {
  top: 0,
  bottom: 20,
  left: 0,
  right: 30
}

const mapStateToProps = state => {
  // console.log('mapStateToProps', state)
  return {
    statuses: state.toast.statuses,
    table: state.toast.table,
    toast: state.toast.toast
  }
}

// function mapDispatchToProps (dispatch) {
//   return { actions: bindActionCreators(actions, dispatch) }
// }

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    updateToastShown: (shown) => { dispatch(actions.updateToastShown(shown)) }
  }
}

class Scene extends Component {
  constructor (props) {
    super(props)
    this.state = {
      y: 0,
    }
  }
  componentWillMount () {
    this.current = {
      shown:0,
    }
    this.old = {
      shown:0,
    }

    document.addEventListener('scroll', (e) => {
      const scrollTop = e.target.scrollingElement.scrollTop;
      // console.log('Scene', scrollTop)
      this.current.shown = Math.floor(scrollTop * this.state.height/2000);
      console.log('scroll', this.current.shown)
    })
  }
  componentDidMount () {
    let {table} = this.props

    let __width = w.innerWidth || e.clientWidth || g.clientWidth
    let __height = w.innerHeight || e.clientHeight || g.clientHeight

    let WIDTH = __width
    let HEIGHT = d3Max([__height - BIG_TOAST_HEIGHT - 60, MIN_HEIGHT - BIG_TOAST_HEIGHT - 60, 300])

    if (__width < __height) {
      HEIGHT = Math.min(HEIGHT, __height * 0.75 - BIG_TOAST_HEIGHT - 60)
    }

    let factorX = WIDTH / HEIGHT
    console.log('---------->', table.y * factorX, WIDTH, margins.left + margins.right)
    let xscale = scaleLinear().domain([0, table.y * factorX]).range([0, WIDTH - (margins.left + margins.right)])
    let yscale = scaleLinear().domain([0, table.y * 1]).range([HEIGHT - (margins.top + margins.bottom) + BIG_TOAST_HEIGHT, BIG_TOAST_HEIGHT])
    let hscale = scaleLinear().domain([0, table.y * 1]).range([0, HEIGHT - (margins.top + margins.bottom)])

    this.setState({
      width: WIDTH,
      height: HEIGHT,
      oWidth: WIDTH,
      oHeight: HEIGHT,
      factorX: factorX,
      scales: {
        xscale: xscale,
        yscale: yscale,
        hscale: hscale
      }
    }, () => {
      this.checkScroll();
    })

  }

  componentWillReceiveProps (nextProps) {
    // if(nextProps.table.y !== this.props.table.y) {
    let HEIGHT = this.state.oHeight * (nextProps.table.y / nextProps.table.old_y)

    let yscale = scaleLinear().domain([0, nextProps.table.y]).range([HEIGHT - (margins.top + margins.bottom) + BIG_TOAST_HEIGHT, BIG_TOAST_HEIGHT])
      // let hscale = scaleLinear().domain([0,nextProps.table.old_y]).range([0,HEIGHT-(margins.top+margins.bottom)]);

    this.setState({
      height: HEIGHT,
      scales: Object.assign({}, this.state.scales, {yscale: yscale})
    })

    // }

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

  checkScroll = () => {
    // if((typeof this.current.shown !== 'undefined') && (this.props.toast.shown !== this.current.shown)) {
    if(this.old.shown !== this.current.shown) {
      // this.setState({
      //   y: this.current.y
      // })
      // console.log(this.scene)
      this.toasts.getWrappedInstance().updateShown(this.current.shown)
      this.old.shown = this.current.shown;
      //console.log(this.props.toast.shown, '!==', this.current.shown)
      // this.props.updateToastShown(this.current.shown)
      // if(this.scene) {
      //     // this.scene.updatePosition(this.current.y);
      // }
    }
    requestAnimationFrame(this.checkScroll)
  }

  render () {
    if (!this.state.scales) {
      return <div id='toast' />
    }
    // console.log('!!!!', this.state.height)
    return <div id='toast'>
      <svg width={this.state.width} height={this.state.height + BIG_TOAST_HEIGHT}>
        {defs}
        <World margins={margins} scales={this.state.scales} width={this.state.width} height={this.state.height} />
        <Toasts ref={el => this.toasts = el} shown={0} margins={margins} scales={this.state.scales} width={this.state.width} height={this.state.height} />
      </svg>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scene)
