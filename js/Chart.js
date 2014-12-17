d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

function Chart(data,options) {

	console.log("Chart",data,options)

	var container=d3.select(options.container);

	var WIDTH=options.width || 300,
		HEIGHT=options.height || 200;

	var margins={
		top:10,
		bottom:50,
		left:options.align=="left"?100:50,
		right:options.align=="left"?50:100
	}

	var padding={
		top:0,
		bottom:0,
		left:0,
		right:0	
	}

	var x_extent=d3.extent(data[0].data,function(d){
		return d.x;
	});
	var y_extent=d3.extent(data[0].data,function(d){
		return d.y;
	});

	console.log("EXTENTS",x_extent,y_extent)

	var xscale=d3.scale.linear().domain(x_extent).range([padding.left,WIDTH-(margins.left+margins.right+padding.left+padding.right)]).nice(),
		yscale=d3.scale.linear().domain(y_extent).range([HEIGHT-(margins.bottom+margins.top+padding.top+padding.bottom),padding.bottom]).nice();

	if(options.invertedAxis) {
		yscale.domain([y_extent[1],y_extent[0]])
	}

	var chart=container.append("div")
				.attr("class","chart");

	

	var title=d3.select("div#title h4")
		.text("title");

	var svg=chart.append("svg")
					.attr("width",WIDTH)
					.attr("height",HEIGHT);
	//var tooltip=new Tooltip(options);

	var grid=svg.append("g")
				.attr("id","grid")
				.classed("left",options.align=="left")
					.attr("transform","translate("+margins.left+","+(margins.top+padding.top)+")");

	var chart=svg.append("g")
				.attr("id","chart")
				.classed("left",options.align=="left")
					.attr("transform","translate("+margins.left+","+(margins.top+padding.top)+")");
	
	

	var series=chart.selectAll("g.series")
					.data(data,function(d){
						return d.name;
					})
					.enter()
					.append("g")
						.attr("class","series")
						.attr("id",function(d,i){
							return "serie_"+d.name
						})
						.on("click",function(d){
							series.classed("selected",false)
							d3.select(this)
								.classed("selected",true)
								.moveToFront();
						})

	var line = d3.svg.line()
	    .x(function(d,i) { return xscale(d.x); })
	    .y(function(d,i) { return yscale(d.y); })
	   
	if(options.interpolate) {
	    line.interpolate(options.interpolate);
	}

	series.append("path")
			.attr("class","bg")
			.attr("d",function(d){
				return line(d.data)
			});

	series.append("path")
			.attr("d",function(d){
				console.log("PAAAAATHHHH",d)
				return line(d.data)
			})
	
	/*
	var prev=null;
	var delta=options.align=="left"?-30:30;
	series.append("text")
			.attr("x",function(d){
				var x=xscale.range()[options.align=="left"?0:1];
				d.x=x;
				d.txt_x=x+delta;
				return x+delta;
			})
			.attr("dy","0.4em")
			.attr("y",function(d){
				var y = yscale(options.align=="left"?d.value[0].value:d.value[d.value.length-1].value);
				d.y=y;

				if(prev) {
					console.log(d.key,prev-10,"<"+y+"<",prev+10)
					
					if(options.invertedAxis) {
						if(y<prev+10) {
							//console.log("mod",d.key,y+10);
							y=prev+10;
						}	
					} else {
						if(y<prev+10) {
							//console.log("mod",d.key,y+10);
							y=prev+10;
						}
					}
				}
				prev=y;
				d.txt_y=y;

				return y;
			})
			.text(function(d){
				return d.key+"/"+(+d.key+1);
			})

	series
			.append("line")
				.attr("class","link")
				.classed("straight",function(d){
					return d.y==d.txt_y;
				})
				.attr("x1",function(d){
					var x=d.x;
					return x+2;
				})
				.attr("y1",function(d){
					return d.y;
				})
				.attr("x2",function(d){
					return d.txt_x-2;
				})
				.attr("y2",function(d){
					return d.txt_y;
				})

	if(!options.left) {
		series
				.filter(function(d){
					console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",d.value.length,xscale.domain()[1])
					return d.value.length!=xscale.domain()[1]+1;
				})
				.append("line")
					.attr("class","link")
					.classed("straight",1)
					.attr("x1",function(d){
						var x=d.x;

						//x-=(d.x-xscale(d.value.length-1))

						return x+2;
					})
					.attr("y1",function(d){
						return d.y;
					})
					.attr("x2",function(d){
						var x=d.x;

						x-=(d.x-xscale(d.value.length-1))

						return x+2;
					})
					.attr("y2",function(d){
						return d.y;
					})
	}
		
	*/

	var points=series.selectAll("g.point")
					.data(function(d){
						console.log("---------------->",d);
						return d.data;
					})
					.enter()
					.append("g")
						.attr("class","point")
						.attr("transform",function(d,i){
							var x=xscale(d.x),
								y=yscale(d.y);
							//console.log(i,d,"=",y)
							return "translate("+x+","+(y)+")"
						})

	points.append("circle")
			.attr("cx",0)
			.attr("cy",0)
			.attr("r",3)

	points.append("circle")
			.attr("class","bg")
			.attr("cx",0)
			.attr("cy",0)
			.attr("r",8)
			.on("mouseover",function(d,i){
				
			})
			.on("mouseout",function(d,i){
				
			})
	
	var xAxis = d3.svg.axis()
					    .scale(xscale)
					    .orient("bottom")
					    .tickFormat(d3.format(",.2f"))
					    //.tickValues([1,2,3])
					    //.ticks(xscale.domain()[1])

	var xaxis=grid.append("g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(0," + (yscale.range()[0]/2) + ")")

	xaxis.call(xAxis)

	var yAxis = d3.svg.axis()
					    .scale(yscale)
					    .orient(options.align=="left"?"right":"left")
					    .tickFormat(d3.format(",.2f"));

	var yaxis=grid.append("g")
			    .attr("class", "y axis")
			    .attr("transform", function(){
			    	var x=0;
			    	if(options.align=="left") {
			    		x=xscale.range()[1]+padding.right;
			    	}
			    	return "translate("+x+"," + 0 + ")";	
			    })

	yaxis.call(yAxis)

	this.update=function(data) {
		console.log("UPDATE DATA",data);
		
		x_extent=d3.extent(data[0].data,function(d){
			return d.x;
		});
		y_extent=d3.extent(data[0].data,function(d){
			return d.y;
		});
	
		console.log("EXTENTS",x_extent,y_extent)

		xscale.domain(x_extent).nice();
		yscale.domain(y_extent).nice();

		series=series.data(data,function(d){
					return d.name;
			});

		console.log(series.data())

		series.select("path.bg")
				.attr("d",function(d){
					console.log("!!!!!!!!!!!!!",d)
					return line(d.data)
				});
		series.select("path:not(.bg)")
				.transition()
				.duration(1000)
				.attr("d",function(d){
					console.log("!!!!!!!!!!!!!",d)
					return line(d.data)
				});
		
		points=series.selectAll("g.point")
					.data(function(d){
						console.log("---------------->",d);
						return d.data;
					});
		
		points.exit().remove();

		var new_points=points
						.enter()
						.append("g")
							.attr("class","point")
							.attr("transform",function(d,i){
								var x=xscale(d.x),
									y=yscale(d.y);
								//console.log(i,d,"=",y)
								return "translate("+x+","+(y)+")"
							})

		new_points.append("circle")
				.attr("cx",0)
				.attr("cy",0)
				.attr("r",3)

		new_points.append("circle")
				.attr("class","bg")
				.attr("cx",0)
				.attr("cy",0)
				.attr("r",8)
				.on("mouseover",function(d,i){
					
				})
				.on("mouseout",function(d,i){
					
				})

		points.attr("transform",function(d,i){
				var x=xscale(d.x),
					y=yscale(d.y);
				//console.log(i,d,"=",y)
				return "translate("+x+","+(y)+")"
			})

		xaxis.call(xAxis);

	}	



}

function Tooltip(options) {

	var container=d3.select(options.container+" .distance-chart div.chart");

	var tooltip=container.append("div")
			.attr("id","tooltip")

	var div=tooltip.append("div")

	var title=div.append("h2")
		.html("<span></span> Giornata")

	var ul=div.append("ol");

	var tm=null;

	this.hide=function() {
		tm=setTimeout(function(){
			tooltip.classed("hidden",true)
		},200)
	}
	this.update=function(x,y,YEAR,day) {

		if(tm) {
			clearTimeout(tm);
			tm=null;
		}

		console.log(x,y,YEAR,day)

		console.log(options.distances[YEAR][day])

		var teams=ul.selectAll("li")
			.data(function(){
				var li=[];
				options.distances[YEAR][day].forEach(function(d,i){
					if(i===0) {
						li.push({
							team:d.prev_team,
							points:d.prev
						})
					}
					li.push({
						team:d.team,
						points:d.p
					})
				});
				return li;
			})
		teams
			.enter()
			.append("li");

		teams
			.html(function(d){
				return "<span class=\"team\">"+d.team+"</span>"+"<span class=\"points\">"+d.points+"</span>";
			})

		var title=div.select("h2")
					.html("<span>"+day+"</span>&deg; Giornata")

		tooltip.style({
			top:(y-12)+"px",
			left:x+"px"
		})
		.classed("hidden",false)

		

	}

}