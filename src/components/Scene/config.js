const sin = Math.sin
const cos = Math.cos
const RAD2DEG = 180/Math.PI

const DURATION = 1000
const FACTOR = 1

const BIG_TOAST_HEIGHT = 260
const BIGTOAST_DIST = 80

const MIN_HEIGHT = 400

const data = {
    table:{
      x:0,
      y:0.75, //table height m
      old_y:0.75, //table height m
      w:0.6, //table width
      h:0.04, //table thickness
      default_height:2, //dining table
      heights: [
        {
          name:"Coffee Table",
          y:0.45
        },
        {
          name:"Bar Table",
          y:0.65
        },
        {
          name:"Dining Table",
          y:0.75
        },
        {
          name:"Console Table",
          y:0.90
        },
        {
          name:"Poseur Table",
          y:1.10
        }
      ]
    },
    physics:{
      g:9.81, // gravity acceleration
      dt:0.005 //sampling time s
    },
    toast: {
      standard_a: 0.15,
      a: 0.15, //bread dimension m (area=a*a)
      m: 24.0, //bread weight gr
      h: 0.014, // thickness of the toast m
      r: 0.01, //initial hoverang m
      f:0.5 //dynamic friction coefficient
    },
    positions:[],
    end:{

    }
  }

export {data, BIG_TOAST_HEIGHT, BIGTOAST_DIST, MIN_HEIGHT}
