		var sin=Math.sin,
			cos=Math.cos,
			RAD2DEG=180/Math.PI;

		var DURATION=1000;
		var FACTOR=1;

		var data={
				table:{
					x:0,
					y:0.96, //table height m
					w:0.6, //table width
					h:0.05 //table thickness
				},
				physics:{
					g:9.81, // gravity acceleration
					dt:0.005 //sampling time s
				},
				toast: {
					a: 0.15, //bread dimension m (area=a*a)
					m: 24.0, //bread weight gr
					h: 0.014, // thickness of the toast m
					r: 0.01, //initial hoverang m
					f:0.5 //dynamic friction coefficient
				},
				positions:[],
				end:{

				}
			};
		data.table.old_y=data.table.y;


		//console.log(data)
		

		function calculateStatuses(options,silent) {
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
				debug("Toast not leaving the table "+h+"m");
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
			
			debug("Condition leaving the table "+h+"m");

			
			var vfx = vr*cos(phi),
				vfy = vr*sin(phi);
			var beta=0;

			//while(((h-yC)/Math.sin(beta)-(data.toast.a/2))>0) {
			while (yC <= h-data.toast.a/2) {

				

				

				vfy = vfy + g*dt;
				xC = xC + vfx * dt;
				yC = yC + vfy * dt;
				phi = phi + Om*dt;

				t = t + dt;

				/*
				if(phi>=0 && phi<Math.PI/2) {
					if(!silent)
						console.log("q1")
					beta=phi;
				}
				if(phi>=Math.PI/2 && phi<Math.PI) {
					if(!silent)
						console.log("q2")
					beta=Math.PI - phi;
				}
				if(phi>=Math.PI && phi<2*Math.PI*3/4) {
					if(!silent)
						console.log("q3")
					beta=phi - Math.PI;
				}
				if(phi>=2*Math.PI*3/4 && phi<2*Math.PI*2) {
					if(!silent)
						console.log("q4")
					beta=Math.PI*2 - phi;
				}*/

				//debug();

				/*if (((h-yC)/Math.cos(beta))<(data.toast.a/2)) {
					break;
				}*/

				
				
				//hi=phi%(Math.PI*2)

				statuses.push({
					t:t,
					x:xC,
					y:h-yC,
					rad:phi,
					deg:phi*RAD2DEG,
					p:counter,
					table:0,
					beta:beta
				});
				
				counter ++;

			}



			debug("Final conditions");

			if (cos(phi) >0) {
				console.log("BREAD SIDE");
			} else {
				console.log("BUTTER SIDE");
			}

			if(!options) {
				data.statuses=statuses;
			} else {
				//console.log("############ END SIMULATION ############# statuses",statuses.length);
				options.statuses=statuses;
			}

			function debug(condition) {
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
						"yC",yC+""//,
						//"beta",beta+"",
						//"beta deg",(beta*RAD2DEG),
						//"dist",(h-yC),
						//"l",(h-yC)/Math.cos(beta),
						//"touching?",((h-yC)/Math.cos(beta))<(data.toast.a/2)
					);
				console.log("####################################");
			}
		}
		calculateStatuses();

		//console.log(data.positions)
		//console.log(data.statuses)

		var sentence=new Sentence({
			sentence:"#sentence"
		})

		var margins={
			top:0,
			bottom:0,
			left:0,
			right:30
		}

		var BIG_TOAST_HEIGHT=200;

		var WIDTH=500,
			HEIGHT=300;

		WIDTH=WIDTH*2;

		var TABLE_STROKE=2;

		var svg=d3.select("#toast")
					.append("svg")
					.attr("width",WIDTH)
					.attr("height",HEIGHT+BIG_TOAST_HEIGHT);

  		var defs=svg.append("defs")

  		defs
			.append("radialGradient")
				.attr("id","toastGradient")
				.selectAll("stop")
					.data([
						{
							offset:"5%",
							stopColor:"#C79637"
							//stopColor:"#EDD79D"
						},
						{
							offset:"100%",
							stopColor:"#EDD79D"
							//stopColor:"#C79637"
					}
				])
					.enter()
					.append("stop")
						.attr("offset",function(d){
							return d.offset;
						})
						.attr("stop-color",function(d){
							return d.stopColor;
						})

		defs
			.append("linearGradient")
				.attr("id","tableBottomGradient")
				.selectAll("stop")
					.data([
						{
							offset:"95%",
							stopColor:"#C9A533"
							//stopColor:"#EDD79D"
						},
						{
							offset:"100%",
							stopColor:"#A27D2D"
							//stopColor:"#C79637"
					}
				])
					.enter()
					.append("stop")
						.attr("offset",function(d){
							return d.offset;
						})
						.attr("stop-color",function(d){
							return d.stopColor;
						})

		defs
			.append("linearGradient")
				.attr("id","tableShadowGradient")
				.attr({
					x1:"0",
					x2:"0",
					y1:"0",
					y2:"1"
				})
				.selectAll("stop")
					.data([
						{
							offset:"0%",
							stopColor:"#000",
							stopOpacity:0.3
						},
						{
							offset:"100%",
							stopColor:"#000",
							stopOpacity:0.0
					}
				])
					.enter()
					.append("stop")
						.attr("offset",function(d){
							return d.offset;
						})
						.attr("stop-color",function(d){
							return d.stopColor;
						})
						.attr("stop-opacity",function(d){
							return d.stopOpacity;
						})

		var xscale=d3.scale.linear().domain([0,1*2]).range([0,WIDTH-(margins.left+margins.right)]),
			yscale=d3.scale.linear().domain([0,data.table.y*FACTOR]).range([HEIGHT-(margins.top+margins.bottom)+BIG_TOAST_HEIGHT,BIG_TOAST_HEIGHT]),
			hscale=d3.scale.linear().domain([0,data.table.y*FACTOR]).range([0,HEIGHT-(margins.top+margins.bottom)]);

		var xscale2=xscale.copy().domain([0,0.75*2]);

		var BIGTOAST_DIST=60;
		var bigToast=svg.append("g")
						.attr("id","bigToast")
						.attr("transform","translate("+(margins.left+xscale(data.table.w+data.toast.r))+","+(BIG_TOAST_HEIGHT - xscale2(data.toast.a/2) - BIGTOAST_DIST)+")");
						//.attr("transform","translate("+(margins.left+xscale(data.table.w+data.toast.r))+","+(margins.top-xscale2(data.toast.a)/2-BIGTOAST_DIST)+")");
		
		bigToast.append("rect")
					.attr("class","bread")
					.attr("x",-xscale2(data.toast.a/2))
					.attr("y",-(xscale2(data.toast.a/2)))
					.attr("width",xscale2(data.toast.a))
					.attr("height",xscale2(data.toast.a))
					//.attr("fill","url(#toastGradient)")
					.attr("rx",3)
					.attr("ry",3)
		bigToast.append("rect")
					.attr("class","butter")
					.attr("x",-xscale2(data.toast.a/2-0.01))
					.attr("y",-xscale2(data.toast.a/2-0.01))
					.attr("width",xscale2(data.toast.a-0.02))
					.attr("height",xscale2(data.toast.a-0.02))
					.attr("rx",5)
					.attr("ry",5)

		bigToast.append("line")
				.attr("class","left")
					

		bigToast.append("line")
				.attr("class","right")
					
		
		var world=svg.append("g")
						.attr("id","world")
						.attr("transform","translate("+margins.left+","+margins.top+")")

		var table=world.append("g")
					.attr("id","table")
					.attr("transform",function(){

						var x=xscale(data.table.x),
							y=yscale(data.table.y);

						return "translate("+x+","+y+")";
					});
		table.append("rect")
				.attr("class","top")
				.attr("x",0)
				.attr("y",TABLE_STROKE/2)
				.attr("width",xscale(data.table.w))
				.attr("height",hscale(data.table.h)-TABLE_STROKE);

		table.append("rect")
				.attr("class","bottom")
				.attr("x",0)
				.attr("y",hscale(data.table.h)-TABLE_STROKE/2)
				.attr("width",xscale(data.table.w-0.1))
				.attr("height",hscale(data.table.h*4));

		table.append("rect")
				.attr("class","leg")
				.attr("x",xscale(data.table.w-0.05-0.05))
				.attr("y",hscale(data.table.h)-TABLE_STROKE/2)
				.attr("width",xscale(0.05))
				.attr("height",hscale(data.table.y - data.table.h));

		table.append("rect")
				.attr("class","shadow")
				.attr("x",0)
				.attr("y",hscale(data.table.h))
				.attr("width",xscale(data.table.w-0.1))
				.attr("height",hscale(0.03));

		function heightFormat(value) {
			if(value>=1) {
				return d3.round(value,2)+"m";
			}
			return d3.round(value*100,0)+"cm";
		}

		table.append("text")
				.attr("class","info")
				.attr("x",xscale(data.table.w-0.05-0.05)-15)
				.attr("y",hscale(data.table.h*5+(data.table.y-data.table.h*5)/2))
				.text(heightFormat(data.table.y))


		var floor=world.append("g")
					.attr("id","floor")
					.attr("transform","translate(0,"+(BIG_TOAST_HEIGHT+hscale(data.table.y))+")")
					
		floor.append("rect")
			.attr("x",0)
			.attr("y",0)
			.attr("width",xscale.range()[1])
			.attr("height",3)

		var ix=world.append("g")
					.attr("id","ix");

		var toast=world.append("g")
					.attr("id","toast");

		var angle=world.append("g")
					.attr("class","angle")
					.attr("transform",function(){
						var x=xscale(data.table.x+data.table.w)+30,
							y=yscale.range()[0]-10;
						return "translate("+x+","+y+")"
					})
					.append("text")
						.attr("x",0)
						.attr("y",0)
						//.html(d3.round(data.end.thetaDeg,3)+"&deg;")
						.html(d3.round(data.statuses[data.statuses.length-1].deg,3)+"&deg;")

		update();

		

		//AXIS

		var xAxis = d3.svg.axis().scale(xscale).orient("top");
		var yAxis = d3.svg.axis().scale(yscale).orient("right");

		var axes=svg.append("g")
						.attr("id","axes")
						.attr("transform","translate("+margins.left+","+margins.top+")")

		axes.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0,0)")
	      .call(xAxis)

	   	axes.append("g")
	      .attr("class", "y axis")
	      .attr("transform", "translate("+(WIDTH-(margins.left+margins.right))+",0)")
	      .call(yAxis)


	    function changeTableHeight(h) {
	    	
	    	data.table.y=h || data.table.y;
	    	//HEIGHT= WIDTH * data.table.y*FACTOR;
	    	//HEIGHT=Math.round((WIDTH+margins.top)*data.table.y*FACTOR);
	    	HEIGHT=HEIGHT * (data.table.y / data.table.old_y);
	    	data.table.old_y=data.table.y;

	    	svg.attr("height",HEIGHT+BIG_TOAST_HEIGHT);

	    	//yscale.domain([0,data.table.y*FACTOR]).range([HEIGHT-(margins.top+margins.bottom),0]);
			//hscale.domain([0,data.table.y*FACTOR]).range([0,HEIGHT-(margins.top+margins.bottom)]);

			yscale.domain([0,data.table.y*FACTOR]).range([HEIGHT-(margins.top+margins.bottom)+BIG_TOAST_HEIGHT,BIG_TOAST_HEIGHT]);
			hscale.domain([0,data.table.y*FACTOR]).range([0,HEIGHT-(margins.top+margins.bottom)]);

			table
				//.transition()
				//.duration(DURATION)
				.attr("transform",function(){

					var x=xscale(data.table.x),
						y=yscale(data.table.y);

					return "translate("+x+","+y+")";
				});
			/*table.select("rect.top")
					.transition()
					.duration(DURATION)
					.attr("height",hscale(data.table.h));

			table.select("rect.bottom")
					.transition()
					.duration(DURATION)	
						.attr("y",hscale(data.table.h))
						.attr("height",hscale(data.table.h*3));*/

			table.select("rect.leg")
					.transition()
					.duration(DURATION)	
						//.attr("y",hscale(data.table.h))
						.attr("height",hscale(data.table.y - data.table.h))
						.each("end",function(){
							update();
						})

			axes.selectAll(".y.axis")
				.transition()
				.duration(DURATION)
					.call(yAxis);
			
			floor
				.transition()
				.duration(DURATION)
					//.attr("transform","translate(0,"+yscale.range()[0]+")")
					//.attr("transform","translate(0,"+hscale(data.table.y)+")")
					.attr("transform","translate(0,"+(BIG_TOAST_HEIGHT+hscale(data.table.y))+")")
					.each("end",function(){
						update();
					})
			
			

	    }

	    function update() {
	    	//data.end=calculateTimeAngle();
	    	//calculateAllPositions();

	    	calculateStatuses();
	    	data.end=data.statuses[data.statuses.length-1].deg;
			
	    	sentence.setValue("#breadSize",(data.toast.a*100)+"cm");
	    	sentence.setValue("#breadOut",((data.toast.r+data.toast.a/2)*100)+"cm");
	    	sentence.setValue("#tableHeight",(data.table.y<1)?d3.round(data.table.y*100,0)+"cm":d3.round(data.table.y,2)+"m");
	    	sentence.setValue("#breadAction",(data.statuses.length>1)?"fall":"not fall");

			if(data.statuses.length<=1) {
				sentence.hide("#landStatus");
			} else {
				sentence.show("#landStatus");
			}
			
	    	sentence.setValue("#breadStatus",(cos(data.statuses[data.statuses.length-1].rad)>0)?"up":"down");

			console.log("UPDATE DATA:",data)	    	

	    	var toasts=toast.selectAll("g.toast")
						//.data(data.positions,function(d,i){
						.data(data.statuses,function(d,i){
							return "p"+d.p;
						});

			var new_toasts=toasts
								.enter()
								.append("g")
									.attr("class","toast")
									.classed("safe",function(d){
										return cos(d.rad)>0;
									})
									.classed("visible",function(d,i){
										return i===0 || i==data.statuses.length-1
									})
									.classed("last",function(d,i){
										return i==data.statuses.length-1
									})
									.attr("rel",function(d){
										////console.log("rel",d.p)
										return d.p+": "+d.y+","+d.deg;
									})
									.attr("transform",function(d,i){
										var x=xscale(data.table.w+d.x),
											y=yscale(d.y);//-hscale(data.toast.h/2),
											//dy=0;//y-yscale(data.table.y);



										return "translate("+(x)+","+y+")"
									})
									.on("mouseover",function(){
										var sel = d3.select(this);
										sel.moveToFront();
									})
							

			toasts.exit().remove();

			var ix=new_toasts.append("g")
						.attr("class","ix");

			ix.append("rect")
				.attr("x",0)
				.attr("y",-hscale(data.toast.h))
				.attr("width",0)
				.attr("height",hscale(data.toast.h))

			var g=new_toasts.append("g")
					.attr("class","t")

			g.append("rect")
					.attr("x",-xscale(data.toast.a/2))
					.attr("y",-hscale(data.toast.h))
					.attr("width",hscale(data.toast.a))
					.attr("height",hscale(data.toast.h))
					.attr("rx",1)
					.attr("ry",1)

			g.append("line")
					.attr("class","butter")
					.attr("x1",-xscale(data.toast.a/2-0.005))
					.attr("y1",-hscale(data.toast.h))
					.attr("x2",xscale(data.toast.a/2-0.005))
					.attr("y2",-hscale(data.toast.h))

			/*new_toasts.append("line")
					.attr("class","x dropline")
					.attr("x1",0)
					.attr("x2",function(d){
						var w=xscale(1)-xscale(data.table.w+d.x);
						return w;
					})
					.attr("y1",-hscale(data.toast.h/2))
					.attr("y2",-hscale(data.toast.h/2))

			new_toasts.append("line")
					.attr("class","y dropline")
					.attr("x1",0)
					.attr("x2",0)
					.attr("y1",-hscale(data.toast.h/2))
					.attr("y2",function(d){
						var h=-(yscale(d.y));//-yscale(1)-hscale(data.toast.h/2));
						return h;
					})*/
			g.append("circle")
					.attr("class","marker")
					.attr("cx",xscale(data.toast.a/2))
					.attr("cy",-hscale(data.toast.h/2))
					.attr("r",0.5)

			g.append("circle")
					.attr("class","marker")
					.attr("cx",-xscale(data.toast.a/2))
					.attr("cy",-hscale(data.toast.h/2))
					.attr("r",0.5)
			/*
			g.append("circle")
					.attr("cx",0)
					.attr("cy",-hscale(data.toast.h/2))
					.attr("r",1.5)
			*/

			var ARROW_SIDE=0.015,
				ARROWS=6;

			var arrows=g.selectAll("path.arrow")
				.data(d3.range(ARROWS))
				.enter()
					.append("path")
					.attr("class","arrow")
					.attr("d",function(){
						var l=xscale(ARROW_SIDE),
							y=0;
						
						return "M"+0+","+0+"l"+(l/2)+","+(-l)+"l"+(l/2)+","+l+"Z";
					})

			toasts.selectAll("path.arrow")
				.attr("transform",function(d){
					var l=xscale(ARROW_SIDE),
						dx=xscale((data.toast.a-ARROW_SIDE*ARROWS)/(ARROWS-1)),
						x=-xscale(data.toast.a/2)+(l+dx)*d;
						//x=-xscale(data.toast.a/2)+(l*2*d)+l*3/4;

					return "translate("+x+","+(-hscale(data.toast.h*1.6))+")"
				})

			toasts.select("g.t rect")
					.attr("x",-xscale(data.toast.a/2))
					.attr("width",xscale(data.toast.a))

			toasts.selectAll("circle.marker")
					.attr("cx",function(d,i){
						return xscale(data.toast.a/2)*(i?1:-1)
					})

			toasts.select("g.t line.butter")
					.attr("x1",-xscale(data.toast.a/2-0.005))
					.attr("x2",xscale(data.toast.a/2-0.005))	

			/*toasts.select("g.t line.butter")
					.attr("class","butter")
					.attr("x1",-xscale(data.toast.a/2))
					.attr("x2",xscale(data.toast.a/2))*/

			/*toasts.select("line.x.dropline")
					.attr("x2",function(d){
						var w=xscale(1)-xscale(data.table.w+data.toast.r+d.x);
						return w;
					})

			toasts.select("line.y.dropline")
					.attr("y2",function(d){
						var h=-(yscale(d.y));
						return h;
					})*/
			var current_statuses=toasts.data();
			toasts
				.select("g.ix rect")
						.attr("width",function(d){
							return xscale.range()[1] - xscale(data.table.w+d.x)
						})
						.attr("height",function(d,i){
							if (i<current_statuses.length-1) {
								//console.log(i,current_statuses[i+1].y,d.y)
								return hscale(d.y - current_statuses[i+1].y);	
							}
							return hscale(data.toast.h);
						})

			toasts
				.classed("visible",function(d,i){
					return i===0 || i==data.statuses.length-1
				})
				.classed("last",function(d,i){
					return i==data.statuses.length-1
				})
				.classed("safe",function(d){
					return cos(d.rad)>0;
				})
				.transition()
				.duration(DURATION)
				.attr("transform",function(d,i){
					var x=xscale(data.table.w+d.x),
						y=yscale(d.y);//-hscale(data.toast.h/2);
					//y=yscale(data.table.y);

					return "translate("+x+","+y+")";
				})
				.select("g.t")
					.attr("transform",function(d){
						if(d.table) {
							
							var dx=xscale(d.x),
								dy=yscale.range()[0] - yscale(data.table.y-d.y)
							
							//console.log("----> X",d.x,dx)
							//console.log("----> Y",data.table.y,d.y,data.table.y-d.y,dy)
							////console.log("---------->",d.x,d.y,data.table.y,dx,dy)
							dx=dy=0;
							return "rotate("+d.deg+","+(dx)+","+(-dy)+")";	
						}
						return "rotate("+d.deg+")";	
						
					})
			/*toasts
				.select("circle.center")
					.attr("cx",function(d){
						//return -(xscale(data.toast.r));
						if(d.table) {
							var dx=d.x/Math.cos(d.rad);
							//console.log("DEG ",d.deg,"DX",dx,"->",xscale(dx))
							return -(xscale(dx));
						} else {
							return 0;
						}
					})*/
					

			table
				.transition()
				.duration(DURATION)
				.attr("transform",function(){

					var x=xscale(data.table.x),
						y=yscale(data.table.y);


					return "translate("+x+","+y+")";
				});

			angle.html(function(){
				var last=current_statuses[current_statuses.length-1];
				console.log("LAST",last)

				console.log(Math.sin(last.rad)*(last.y),data.toast.a/2)

				var alpha=d3.round((last.deg%360),3)+"&deg;"

				
				return alpha;
			})

			world.select("g.angle")
				.attr("transform",function(){
					var d=toasts.data()[toasts.data().length-1];
					var x=xscale(data.table.x+data.table.w)+d.x,
						y=yscale(d.y);
					return "translate("+x+","+y+")"
				})
				.select("text")
					.html(d3.round(data.statuses[data.statuses.length-1].deg,3)+"&deg;");

			//.attr("transform","translate("+(margins.left+xscale(data.table.w+data.toast.r))+","+(margins.top-xscale2(data.toast.a)/2-60)+")");
			bigToast.attr("transform","translate("+(margins.left+xscale(data.table.w+data.toast.r))+","+(BIG_TOAST_HEIGHT - xscale2(data.toast.a/2) - BIGTOAST_DIST)+")");

			bigToast.select("rect.bread")
						.attr("x",-xscale2(data.toast.a)/2)
						.attr("y",-xscale2(data.toast.a)/2)
						.attr("width",xscale2(data.toast.a))
						.attr("height",xscale2(data.toast.a))

			bigToast.select("rect.butter")
					.attr("x",-xscale2(data.toast.a/2-0.01))
					.attr("y",-xscale2(data.toast.a/2-0.01))
					.attr("width",xscale2(data.toast.a-0.02))
					.attr("height",xscale2(data.toast.a-0.02))

			bigToast.select("line.left")
					.attr("x1",-xscale2(data.toast.a)/2-2)
					.attr("y1",xscale2(data.toast.a)/2)
					.attr("x2",-xscale(data.toast.a)/2-2)
					.attr("y2",BIGTOAST_DIST+xscale2(data.toast.a)/2-hscale(data.toast.h))

			bigToast.select("line.right")
					.attr("x1",xscale2(data.toast.a)/2+2)
					.attr("y1",xscale2(data.toast.a)/2)
					.attr("x2",xscale(data.toast.a)/2+2)
					.attr("y2",BIGTOAST_DIST+xscale2(data.toast.a)/2-hscale(data.toast.h))

	    }

	    var simulation={
			table: {
				y:10
			},
			physics:{
				dt:0.001 //sampling time s
			},
			toast:{
				
			}
		}
		calculateStatuses(simulation,true);

		//console.log(simulation)
		

		function Sentence(options) {

			var sentence=d3.select(options.sentence),
				indicators=options.indicators;

			this.setValue=function(indicator,value) {
				sentence.select(indicator).text(value);
			}

			this.show=function(indicator) {
				sentence.select(indicator).classed("hidden",false)
			}

			this.hide=function(indicator) {
				sentence.select(indicator).classed("hidden",true)
			}

		}
		
		var PHIvsYChart=new Chart([
				{
					name:"line1",
					strokeWidth:3,
					data:simulation.statuses.map(function(d){
						return {
							x: -d.y+(simulation.table.y),
							y: Math.cos(d.rad)
						}
					})
				}
			],{
				container:"#angle_vs_y",
				invertedAxis:false,
				showZeroAxis:true
				//interpolate:"monotone"
			});

		var PHIvsTChart=new Chart([
				{
					name:"line2",
					strokeWidth:3,
					data:simulation.statuses.map(function(d){
						return {
							x: d.t,
							y: Math.cos(d.rad)
						}
					})
				}
			],{
				container:"#angle_vs_t",
				invertedAxis:false,
				showZeroAxis:true
				//interpolate:"monotone"
			});

		var PHIvsXYChart=new Chart([
				{
					name:"lineY",
					stroke:"#336699",
					strokeWidth:3,
					data:simulation.statuses.map(function(d){
						//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",d.y)
						return {
							x: d.t,
							y: (simulation.table.y - d.y)
						}
					})
				},
				{
					name:"lineX",
					stroke:"#a0091d",
					strokeWidth:3,
					data:simulation.statuses.map(function(d){
						return {
							x: d.t,
							y: d.x
						}
					})
				}
			],{
				container:"#angle_vs_xy",
				invertedAxis:false
				//interpolate:"monotone"
			});

		function simulate(options) {
		
			simulation.toast.r=data.toast.r;
			if(options && options.toast && options.toast.r) {
				simulation.toast.r = options.toast.r;
			}

			simulation.toast.m=data.toast.m;
			if(options && options.toast && options.toast.m) {
				simulation.toast.m = options.toast.m;
			}

			simulation.toast.a=data.toast.a;
			if(options && options.toast && options.toast.a) {
				simulation.toast.a = options.toast.a;
			}

			simulation.toast.f=data.toast.f;
			if(options && options.toast && options.toast.f) {
				simulation.toast.f = options.toast.f;
			}

			
			calculateStatuses(simulation,true);
			
			PHIvsYChart.update([
				{
					name:"line1",
					data:simulation.statuses.map(function(d){
						return {
							x: -d.y+(simulation.table.y),
							y: Math.cos(d.rad)
						}
					})
				}
			]);
			PHIvsTChart.update([
				{
					name:"line2",
					data:simulation.statuses.map(function(d){
						return {
							x: d.t,
							y: Math.cos(d.rad)
						}
					})
				}
			]);
			PHIvsXYChart.update([
				{
					name:"lineY",
					data:simulation.statuses.map(function(d){
						return {
							x: d.t,
							y: (simulation.table.y - d.y)
						}
					})
				},
				{
					name:"lineX",
					data:simulation.statuses.map(function(d){
						return {
							x: d.t,
							y: d.x
						}
					})
				}
			]);
		}
		
		

	    var gui = new dat.GUI();

		var controllers={
			tableH:gui.add(data.table, "y", 0.2,10),
			bread_size:gui.add(data.toast, "a", 0.1,0.2).step(0.01),
			overhang:gui.add(data.toast, "r", 0.0,0.05).step(0.01),
			friction:gui.add(data.toast, "f", 0.1,0.6).step(0.1),
			bread_weight:gui.add(data.toast, "m", 10,30).step(1),
			dt:gui.add(data.physics, "dt", 0.01,0.1).step(0.01)
		}
		

		controllers["tableH"].onFinishChange(function(value) {
			changeTableHeight();
		});

		controllers["bread_size"].onFinishChange(function(value) {
			update();
			simulate();
		});

		controllers["bread_weight"].onFinishChange(function(value) {
			update();
			simulate();
		});	

		controllers["overhang"].onFinishChange(function(value) {
			update();
			simulate();
		});

		controllers["friction"].onFinishChange(function(value) {
			update();
			simulate();
		});

		controllers["dt"].onFinishChange(function(value) {
			update();
		});		

		d3.selection.prototype.moveToFront = function() {
		  return this.each(function(){
		    this.parentNode.appendChild(this);
		  });
		};