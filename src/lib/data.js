import {data} from '../components/Scene/config'

const sin = Math.sin
const cos = Math.cos
const RAD2DEG = 180/Math.PI

const calculateStatuses = (options,silent = false) => {
  if(options) {
    //console.log("############ SIMULATION #############");
  }

  var statuses=[];

  var counter = 0;

  var t = 0,
    Fp = 0, //perpendicular force
    Ff = 0, //friction force
    JC, //moment of inertia
    vr = 0,
    ar = 0,
    Om = 0,
    aphi = 0,
    r = (options && options.toast && options.toast.r)?options.toast.r:data.toast.r,
    m = (options && options.toast && options.toast.m)?options.toast.m:data.toast.m,
    a = (options && options.toast && options.toast.a)?options.toast.a:data.toast.a,
    f = (options && options.toast && options.toast.f)?options.toast.f:data.toast.f,
    g = (options && options.physics && options.physics.g)?options.physics.g:data.physics.g,
    dt = (options && options.physics && options.physics.dt)?options.physics.dt:data.physics.dt,
    h = (options && options.table && options.table.y)?options.table.y:data.table.y;

  var xC=0,
    yC=0,
    phi=0; //bread angle rad

  JC = m*a*a/3;
  Fp = m*JC/(JC+m*r*r)*(g*cos(phi)-2*vr*Om);

  ////console.log(JC,Fp);

  statuses.push({
    t:t,
    x:r,
    y:h-yC,
    rad:phi,
    deg:phi*RAD2DEG,
    p:counter,
    table:1
  });
  counter++;
  //r=0;
  if(r===0) {
    debug("Toast not leaving the table "+h+"m", silent);
    if(!options) {
      data.statuses=statuses;
    } else {
      //console.log("############ END SIMULATION #############");
      options.statuses=statuses;
    }
    return;
  }

  while (Fp>0) {  // table loop

    Fp = m*JC/(JC+m*r*r)*(g*cos(phi)-2*vr*Om);
    Ff = f*Fp;

    aphi= (r/JC)*Fp;
    ar = -Ff/m + r*Om*Om + g*sin(phi);
    if (ar<0) ar = 0;

    Om = Om + aphi*dt;
    vr = vr + ar*dt;

    r = r + vr*dt;
    phi = phi + Om*dt;
    xC = r*cos(phi);
    yC = r*sin(phi);

    t = t + dt;

    statuses.push({
      t:t,
      x:xC,
      y:h-yC,
      rad:phi,
      deg:phi*RAD2DEG,
      p:counter,
      table:1
    });

    counter++;

  }  // end table loop

  debug("Condition leaving the table "+h+"m", silent);


  var vfx = vr*cos(phi),
    vfy = vr*sin(phi);


  //while (yC <= h-data.toast.a/2) {
  while (h-yC >= 0){//data.toast.a/2) {





    vfy = vfy + g*dt;
    xC = xC + vfx * dt;
    yC = yC + vfy * dt;
    phi = phi + Om*dt;

    t = t + dt;

    //debug();

    var alpha=phi%(Math.PI/2);

    if(phi>Math.PI/2 && phi<=Math.PI) {
      alpha=Math.PI/2 - alpha;
    }

    if(phi>Math.PI*3/2 && phi<2*Math.PI) {
      alpha=Math.PI/2 - alpha;
    }

    var b=data.toast.a/2 * Math.sin(alpha);

    //console.log(h-yC,">",b)

    //hi=phi%(Math.PI*2)
    //if (h-yC >= data.toast.a/2) {
    if (h-yC >= b) {
      statuses.push({
        t:t,
        x:xC,
        y:h-yC,
        rad:phi,
        deg:phi*RAD2DEG,
        p:counter,
        table:0,
      });
    }

    counter ++;

  }

  debug("Final conditions", silent);

  if (cos(phi) >0) {
    console.log("BREAD SIDE");
  } else {
    console.log("BUTTER SIDE");
  }

  function debug(condition, silent) {
    if(silent) {
      return;
    }
    console.log("####################################");
    if(condition) {
      console.log(condition);
    }
    console.log(
        "N",counter+"",
        "Fp",Fp+"",
        "Ff",Ff+"",
        "aphi",aphi+"",
        "ar",ar+"",
        "Om",Om+"",
        "phi",phi+"",
        "deg",(phi*RAD2DEG)+"",
        "vr",vr+"",
        "r",r+"",
        "t",t+"",
        "xC",xC+"",
        "yC",yC+"",
        "y",(h-yC),
        "toast side / 2",data.toast.a/2
      );
    console.log(statuses)
    console.log("####################################");
  }

  return statuses


}

export {calculateStatuses}
