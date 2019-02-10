/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/
//Creating margins,group and svg 
var margin={top:10,left:100,right:200,bottom:100};

var height=450 - margin.left - margin.top;
var width=900 - margin.top - margin.bottom;

var svg=d3.select("#chart-area").append("svg").attr("height",height+margin.top+margin.bottom)
											  .attr("width",width+margin.left+margin.right)

/*var t=d3.transition().duration(100);	*/									  

var g=svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

var num=0;
//XLabel
var xLabel=g.append("text").attr("class","x label")
						   .attr("x",width/2)
						   .attr("y",height+80)
						   .style("font-size","20px")
						   .attr("text-anchor","middle")
						   .text("GDP Per Capita ($)")
//YLabel
var yLabel=g.append("text").attr("class","y label")
                           .attr("x",-(height/2))
                           .attr("y",-80)
                           .style("font-size","20px")
						   .attr("text-anchor","middle")
						   .text("Life Expectancy (Years)")
						   .attr("transform","rotate("+(-90)+")")
//Year Label
var yearLabel=g.append("text").attr("class","Num label")
							  .attr("x",width-70)
							  .attr("y",height-30)
							  .style("font-size","30px")
//scale functions
var x=d3.scaleLog().rangeRound([0,width])
					 .base(10);
					 
var pop=d3.scaleLinear().domain([2000,1400000000]).range([1*Math.PI, 12*Math.PI]); 		
//Splitting given range in to two 		 
/*var z=d3.scaleLog().domain([1000000001,14000000000])
				   .range([7,25])
				   .base(10);	
var z1=d3.scaleLog().domain([1,100000000])
.range([1,4])
.base(10);			 */ 			   
var y=d3.scaleLinear().rangeRound([height,0]);				   	
var color=d3.scaleOrdinal().domain(["asia","europe","americas","africa"])
						   .range(["orange","grey","lightblue","blue"])		
						   
//X and Y axes generators						   

var xaxisgroup=g.append("g")
 .attr("class","x axis")
 .attr("transform","translate(0,"+height+")")
 

 
 var yaxisgroup=g.append("g")
  .attr("class","y axis")
  
var i=0;
var diff=0;
//Interval function
d3.json("data/data.json").then(function(data){
	console.log(data);
	data.forEach(d=>{
		d.year=+d.year;
	})
	var max=d3.max(data,function(d){
		return d.year;
	})
	var min=d3.min(data,function(d){
		return d.year;
	})
	diff=max-min;
	d3.interval(function(){
		if(i<diff){
			i=i+1;}
			else{
				i=0;
			}
		update(data);
		
	},100);

//Labels for continents
var data1=["Asia","Europe","Americas","Africa"];
var rects=g.selectAll("rect").data(data1).enter()
                          .append("rect").attr("x",width+20)
													.attr("y",function(d,i){
														return ((height-120)+((i)*20));})
													.attr("height",10)
										      .attr("width",10)
											    .attr("fill",(function(d,i){
														return color(d[i]);
													}))

for(var j in data1){
var Labels=g.append("text").attr("class","labels")
            							 .attr("x",width+40)			 				 						   
													 .attr("y",((height-110)+((j)*20)))
													 .style("font-size","15px")
													 .text(data1[j]);	 
}
	});
	//Deleting null values from given Json file using Filter function
/*	data.forEach(d=>{
	   for(var i=0;i<254;i++){
		for(var j in d.countries[i])
		   arr.push([j, d.countries[i][j]])    
		arr1=arr.filter(function(d){
		 return d[1]!=null;
		})	
		delete d.countries[i];
		d.countries[i]=arr1;
		arr=[];
		arr1=[];
	 }
*/	
//Update function
var xd1=300,yd1=1;
var xd2=150000,yd2=90;

function update(data){   
	x.domain([xd1,xd2]);
	y.domain([yd1,yd2]);

	//X axis
	var xAxisCall=d3.axisBottom(x).ticks(3);
	 xaxisgroup.call(xAxisCall);
	 
	//Y axis
	var yAxisCall=d3.axisLeft(y);
   yaxisgroup.call(yAxisCall);

	var dd=data[i].countries;
	num=data[i].year;
	yearLabel.text(num);
		 var circles=g.selectAll("circle")
				  .data(dd,function(dd){
                      return dd.year;
				  })
		circles.exit().remove();		  
				  
				  circles.enter()
				  .append("circle")
				  .attr("cx",function(dd){
					if((dd.income!=null)&&(dd.life_exp!=null)&&(dd.population!=null)){  
								dd.income=+dd.income; 
					if(x(dd.income>0)){			 
                    return x(dd.income);}}
				  })
				  
				  .attr("cy",function(dd){
					if((dd.income!=null)&&(dd.life_exp!=null)&&(dd.population!=null)){ 
						        dd.life_exp=+dd.life_exp;  
                     return y(dd.life_exp);}
				  })
				  
				  .attr("r",function(dd){
					if((dd.income!=null)&&(dd.life_exp!=null)&&(dd.population!=null)){ 
							 return pop(dd.population);
					}
				  })
				  
				  .attr("fill",function(dd){
					  return color(dd.continent);
				  })

				}
