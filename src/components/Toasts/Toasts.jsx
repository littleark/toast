import React, { Component } from "react";
import { connect } from "react-redux";
import { format as d3Format } from "d3-format";

import "./toast.css";

const measures = {
  x: " cm",
  y: " m",
  deg: "\u00B0",
  t: " seconds"
};

const mapStateToProps = state => {
  return {
    table: state.toast.table,
    toast: state.toast.toast,
    statuses: state.toast.statuses
  };
};

class Toast extends Component {
  setStatus(visible) {
    this.toast.classList.toggle('hover', visible)
    // console.log(this.toast)
  }
  render () {
    const { width, margins, toast, table, xscale, yscale, hscale, classNames, rotate, x, y } = this.props;

    return (
      <g
        ref={el => this.toast = el}
        className={classNames.join(" ")}
        transform={`translate(${x},${y})`}
      >
        <g className="t" transform={rotate}>
          <rect
            className="bread"
            x={-xscale(toast.a / 2)}
            y={-hscale(toast.h)}
            width={xscale(toast.a)}
            height={hscale(toast.h)}
            rx={1}
            ry={1}
          />
          <line
            className="butter"
            x1={-xscale(toast.a / 2 - 0.005)}
            y1={-hscale(toast.h)}
            x2={xscale(toast.a / 2 - 0.005)}
            y2={-hscale(toast.h)}
          />
        </g>
        {/* <ToastInfo
          status={d}
          first={i === 0}
          last={i === statuses.length - 1}
          scales={scales}
          table={table}
          x1={-x + xscale(table.leg)}
          x2={
            width - xscale(table.w) - margins.left - margins.right - xscale(0.2)
          }
        /> */}
      </g>
    );
  }

};

class Toasts extends Component {

  constructor (props) {
    super(props);
    this.toastList = {};
    this.hideToastList = [];
  }

  updateShown = (percentage) => {
    const index = Math.floor((this.props.statuses.length - 1) * percentage);
    console.log(index,this.props.statuses.length, percentage)
    if(this.toastList[index]) {
      //console.log(index, this.toastList[index])
      this.hideToastList.forEach(toast => toast.setStatus(false))
      this.hideToastList = [];
      this.toastList[index].setStatus(true)
      this.hideToastList.push(this.toastList[index])
      // this.forceUpdate()
    }
  }

  render() {
    const {
      width,
      margins,
      toast,
      table,
      scales,
      statuses,
      shown
    } = this.props;
    const { xscale, yscale, hscale } = scales;

    if (!statuses) {
      return null;
    }

    const toasts = statuses.map((d, i) => {
      let classNames = ["toast"];

      if (Math.cos(d.rad) > 0) {
        classNames.push("safe");
      }

      if (i === 0 || i === statuses.length - 1) {
        classNames.push("visible");
      }

      if (i === statuses.length - 1) {
        classNames.push("last");
      }
      // console.log(shown)
      // if (i === toast.shown) {
      //   classNames.push("hover");
      // }
      let x = xscale(table.w + d.x);
      let y = yscale(d.y);

      let toastRotate = `rotate(${d.deg})`;
      if (d.table) {
        let dx = 0;
        let dy = 0;
        toastRotate = `rotate(${d.deg}, ${dx}, ${-dy})`;
      }

      return <Toast key={`status_${i}`} ref={el => {this.toastList[i] = el}} {...{x,y, ...scales, toast, table}} rotate={toastRotate} classNames={classNames}/>;
    });

    return (
      <g transform={`translate(${margins.left},${margins.top})`}>
        <g>{toasts}</g>
      </g>
    );
  }
}

const ToastInfo = props => {
  let { index, first, last, status, x1, x2, table } = props;
  let { xscale } = props.scales;
  const setSentence = (status, index) => {
    let y = table.y - status.y;

    measures.y = " m";
    if (y < 1) {
      y *= 100;
      measures.y = " cm";
    }

    if (first === 0) {
      return "The toast is in its initial position hanging out";
    }
    if (status.table) {
      return `The toast has not left the table yet after rotating by ${d3Format(
        ",.0f"
      )(status.deg)}${measures.deg}`; // +d3.format(',.2f')(d.deg)+measures.deg
    }
    if (last) {
      return `After falling for ${d3Format(",.2f")(y)}${
        measures.y
      } in ${d3Format(",.2f")(status.t)}${
        measures.t
      } the toast lands butter-side`;
    }
    return `After falling for ${d3Format(",.2f")(y)}${measures.y} in ${d3Format(
      ",.2f"
    )(status.t)}${measures.t} the toast has rotated by ${d3Format(",.0f")(
      status.deg
    )}${measures.deg}`;
  };

  return (
    <g className="info">
      <line
        x1={x1 + xscale(table.leg)}
        x2={x2 + xscale(table.leg)}
        y1={0}
        y2={0}
      />
      <rect x={x1} width={x2 - x1} y={-20} height={20} />
      <text x={x1 + xscale(table.leg)} y={0} dy={-4}>
        {setSentence(status, index)}
      </text>
    </g>
  );
};

export default connect(mapStateToProps, null, null, { withRef: true })(Toasts);
