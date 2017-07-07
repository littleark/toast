import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from './actions';

import './bootstrap.css'
import './fonts.css'
import './App.css'

import Scene from './components/Scene/Scene'

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
        updateTableHeight: (height) => { dispatch(actions.updateTableHeight(height)) }
    }
}

class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var gui = new window.dat.GUI();

    var controllers={
      tableH:gui.add(this.props.table, "y", 0.2,10),
      bread_size:gui.add(this.props.toast, "a", 0.1,0.2).step(0.01),
      overhang:gui.add(this.props.toast, "r", 0.0,0.05).step(0.01),
      friction:gui.add(this.props.toast, "f", 0.1,0.6).step(0.1),
      bread_weight:gui.add(this.props.toast, "m", 10,30).step(1)//,
      //dt:gui.add(this.props.physics, "dt", 0.01,0.1).step(0.01)
    }


    controllers["tableH"].onFinishChange((value) => {
      this.props.updateTableHeight(value)
    });

    controllers["bread_size"].onFinishChange((value) => {
      //console.log(value)
      this.props.updateToastSize(value)
    });
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

  changeSomething() {
    //this.props.updateToastSize(0.2)
    this.props.updateTableHeight(1.1)
  }




  render() {
    return (
        <div className="container-fluid">
    			<div className="row">
    				<div id="fold" className="col-xs-12">
    							<div className="row">
    								<div className="pull-right sentence-col col-xs-12">
    									<div className="row">
    										<div className="col-xs-12 col-sm-4 col-md-7 pull-right">
    											<h1 className="text-uppercase">Butter or Bread?</h1>
    											<p className="sentence" id="sentence">A <b id="breadSize">15cm</b> large buttered toast,<br/>hanging out <b id="breadOut">6cm</b><br/>from the border of a dining table, will <b id="breadAction">fall</b>!<br/><em><span id="landStatus">And land butter-side <b id="breadStatus">down</b>!</span></em></p>
                          <button onClick={this.changeSomething.bind(this)}>click me</button>
    										</div>
    									</div>
    								</div>
    								<div className="col-xs-12">
                      <Scene />
                    </div>
    							</div>
    				</div>
          </div>
        </div>
    );
  }
}

//export default App
export default connect(mapStateToProps, mapDispatchToProps)(App);
