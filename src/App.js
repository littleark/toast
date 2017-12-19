import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'

import './bootstrap.css'
import './fonts.css'
import './App.css'

import Scene from './components/Scene/Scene'
import Sentence from './components/Sentence/Sentence'

const mapStateToProps = state => {
  return {
    statuses: state.toast.statuses,
    table: state.toast.table,
    toast: state.toast.toast
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    updateToastSize: (size) => { dispatch(actions.updateToastSize(size)) },
    updateTableHeight: (height) => { dispatch(actions.updateTableHeight(height)) },
    updateToastOverhang: (overhang) => { dispatch(actions.updateToastOverhang(overhang)) },
    updateToastShown: (shown) => { dispatch(actions.updateToastShown(shown)) }
  }
}



class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      y: 0
    }
  }
  componentWillMount () {
    this.current = {
      y:0,
      wheelDeltaY:0
    }
    const checkWheel = (e) => {
      if(e && e.wheelDeltaY && e.wheelDeltaY !== this.current.wheelDeltaY) {
        this.current.y = (e.wheelDeltaY < 0) ? this.current.y + 1 : this.current.y - 1
        this.current.y = this.current.y < 0 ? 0 : this.current.y
        this.current.wheelDeltaY = e.wheelDeltaY
        console.log(this.current.y, e.wheelDeltaY)

        this.setState({
          y: this.current.y
        })
      }
      requestAnimationFrame(() => checkWheel(this.e))
    }



    // document.addEventListener('mousewheel', (e) => {
    //   this.e = e
    // });
  }

  componentDidMount () {


    

    var gui = new window.dat.GUI()

    var controllers = {
      tableH: gui.add(this.props.table, 'y', 0.2, 10),
      bread_size: gui.add(this.props.toast, 'a', 0.1, 0.2).step(0.01),
      overhang: gui.add(this.props.toast, 'r', 0.0, 0.05).step(0.01),
      friction: gui.add(this.props.toast, 'f', 0.1, 0.6).step(0.1),
      bread_weight: gui.add(this.props.toast, 'm', 10, 30).step(1)
      // dt:gui.add(this.props.physics, "dt", 0.01,0.1).step(0.01)
    }

    controllers['tableH'].onFinishChange((value) => {
      this.props.updateTableHeight(value)
    })

    controllers['bread_size'].onFinishChange((value) => {
      this.props.updateToastSize(value)
    })

    controllers['overhang'].onFinishChange((value) => {
      this.props.updateToastOverhang(value)
    })
    //
    // controllers["bread_weight"].onFinishChange(function(value) {
    //   update();
    //   simulate();
    // });
    //
    // controllers["overhang"].onFinishChange(function(value) {
    //   update();
    //   simulate();
    // });
    //
    // controllers["friction"].onFinishChange(function(value) {
    //   update();
    //   simulate();
    // });
    //
    // controllers["dt"].onFinishChange(function(value) {
    //   update();
    // });
  }

  changeSomething () {
    // this.props.updateToastSize(0.2)
    this.props.updateTableHeight(1.1)
  }

  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div id='fold' className='col-xs-12'>
            <div className='row'>
              <div className='pull-right sentence-col col-xs-12'>
                <div className='row'>
                  <div className='col-xs-12 col-sm-4 col-md-7 pull-right'>
                    <h1 className='text-uppercase'>Butter or Bread?</h1>
                    <Sentence />
                  </div>
                </div>
              </div>
              <div className='col-xs-12' style={{position:'fixed', zIndex:999999999}}>
                <Scene ref={el => {
                  this.scene = el
                }} y={this.state.y}
                />
              </div>
              <div className='col-xs-12'>
                <div ref={el => this.scrollableDiv = el} style={{height:'4000px'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// export default App
export default connect(mapStateToProps, mapDispatchToProps)(App)
