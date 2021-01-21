/*Author:SunitRaut <github.com/SunitRaut/> | License: GPL-3.0 | View library on github: https://github.com/SunitRaut/Heatmap-Visualization-JS/ */
//Underconstruction: Minified JS below

class HeatMap {
	
	constructor()
	{
	  this.sensing_circle_radius = 10;
		this.sensing_ellipse_radius = 22;
		this.sensing_ellipse_param = 0.8;
		this.wind_speed=0;
		this.wind_dir=0;
		this.colorMax=[255,0,0];	//red
		this.colorMin=[0,255,0];	//green
		this.colorCase=[1,-1,0];
		this.resolution = 50;
		this.spread = 0.8;
	}
	
	setMaxMin(cMax,cMin)
	{
		this.colorMax=cMax;
		this.colorMin=cMin;
		this.calculateColorCase();
	}
	
	calculateColorCase()
	{
		for(var i=0;i<3;i++)
		{
			if(this.colorMax[i]==this.colorMin[i])
			{this.colorCase[i]=0;}
			else if(this.colorMax[i]>this.colorMin[i])
			{this.colorCase[i]=1;}	
			else
			{this.colorCase[i]=-1;}
		}
	
	}
	
	postSomething()
	{
		console.log("Posted Something");
	}
	
	setResolution(res)
	{
		this.resolution = res;
	}
	
	
	defineRegion(locations)
	{
		this.locations = locations;
		this.pxPerLength = 40000;
		
		
		
		var LatList=[];
		var LngList=[];
		
	for(var a=0;a<((this.locations).length);a++)
		
		{ 
		  LatList[a] = Number(this.locations[a][0]);
		  LngList[a] = Number(this.locations[a][1]);

		}
		console.log("Hello");
		
		
	
	var avg=0;var nCount=0;
	for(var a=0;a<((this.locations).length-1);a++)
		{ 
		 for(var b=a+1;b<((this.locations).length);b++)
			{
			  var f1= Math.abs(LatList[a]-LatList[b]); 
			  var f2= Math.abs(LngList[a]-LngList[b]);
			  var f = f1*f1+f2*f2;
			  var df = Math.sqrt(f);
			  
			  avg+=df;
			  nCount++;
			}
		}
	avg = avg / nCount;
	console.log(avg);
	this.avgdis = avg;	
		
	this.sensing_circle_radius = this.resolution/2;
	this.sensing_ellipse_radius = this.spread*this.resolution;
	this.sensing_ellipse_param = 0.8;
	 
	 this.vNorth = max(LatList)+2*this.avgdis;
	 this.vSouth = min(LatList)-2*this.avgdis;
	 this.vEast = max(LngList)+2*this.avgdis;
	 this.vWest = min(LngList)-2*this.avgdis;
	 
	 this.LatPx = [];
	 this.LngPx = [];
	 
	for(var a=0;a<((this.locations).length);a++)
		
		{ 
		  this.LatPx[a]=Math.ceil((this.vNorth-LatList[a])*(this.resolution/this.avgdis));
		  this.LngPx[a]=Math.floor((LngList[a]-this.vWest)*(this.resolution/this.avgdis));

		}
    
	 this.vHeight=Math.ceil((this.vNorth-this.vSouth)*(this.resolution/this.avgdis)); this.vWidth=Math.ceil((this.vEast-this.vWest)*(this.resolution/this.avgdis));
	var dfCount=0;
	
	var ellipseSet1 = [];
	var ellipseSet2 = [];
	var dfLength = [];
	
	for(var a=0;a<((this.locations).length-1);a++)
			{ 
			 for(var b=a+1;b<((this.locations).length);b++)
				{
				  var f1= Math.abs(this.LatPx[a]-this.LatPx[b]); 
				  var f2= Math.abs(this.LngPx[a]-this.LngPx[b]);
				  var f = f1*f1+f2*f2;
				  var df = Math.sqrt(f);
				  console.log(2*this.resolution+","+df);

				  if(df<=(2*this.resolution)) {ellipseSet1[dfCount]=a;ellipseSet2[dfCount]=b;dfLength[dfCount]=df;dfCount++;}
					
				}
			}
	var imageBounds = {
		north : this.vNorth,
		south : this.vSouth,
		east : this.vEast,
		west : this.vWest

	};
		this.iMap = [];
		for(let i = 0; i < this.vWidth; i++) {
			this.iMap[i] = [];
			for(let j = 0; j < this.vHeight; j++) {
				this.iMap[i][j] = 0;
			}
		}

	for (var i = 0; i < this.vWidth; i++) {
		for (var j = 0; j < this.vHeight; j++) {
			this.iMap[i][j]=0;
			var dCount=0;
			for(var a=0;a<(dfLength).length;a++)
			{ 
			  var ellipseMid1 = (this.LatPx[ellipseSet1[a]] + this.LatPx[ellipseSet2[a]])/2 ;
			  var ellipseMid2 = (this.LngPx[ellipseSet1[a]] + this.LngPx[ellipseSet2[a]])/2 ;
			  var e1= Math.abs(this.LatPx[ellipseSet1[a]]-j); 
			  var e2= Math.abs(this.LngPx[ellipseSet1[a]]-i);
			  var e3= Math.abs(this.LatPx[ellipseSet2[a]]-j);
			  var e4= Math.abs(this.LngPx[ellipseSet2[a]]-i);
			  var e5= Math.abs(ellipseMid1-j); 
			  var e6= Math.abs(ellipseMid2-i);
			  var e8 = e1*e1+e2*e2;
			  var e9 = e3*e3+e4*e4;
			  var e10 = e5*e5+e6*e6;
			  var d1 = Math.sqrt(e8);
			  if(d1>2*this.resolution) continue;
			  var d2 = Math.sqrt(e9);
			  if(d2>2*this.resolution) continue;
			  var d3 = Math.sqrt(e10);
			  if ((Math.abs(d1+d2-(this.sensing_ellipse_param*d3)))<=((2-this.sensing_ellipse_param)*(this.sensing_ellipse_radius))) {dCount++;break;}			 
			}
			for(var a=0;a<((this.locations).length);a++)
			{ 
			  var e1= Math.abs(this.LatPx[a]-j); 
			  var e2= Math.abs(this.LngPx[a]-i);
			  var e5 = e1*e1+e2*e2;
			  var d = Math.sqrt(e5);
			  
			  if (d<=this.sensing_circle_radius) dCount++;
			  if (d<=1) this.iMap[i][j]=2;
			 
			}
			if((dCount>0)&&(this.iMap[i][j]!=2))
			{
			  this.iMap[i][j]=1;
			}
			  
		}
	}

		return this.iMap;

	} 




	createHeatMap(data)
	{
		
		this.data = data;
		var weight=0;
		
		var computation=0;
		this.wMap=[];

			for(let i = 0; i < this.vWidth; i++) {
				this.wMap[i] = [];
				for(let j = 0; j < this.vHeight; j++) {
					this.wMap[i][j] = 0;
				}
			}



		for (var i = 0; i < this.vWidth; i++) {
			for (var j = 0; j < this.vHeight; j++) {
				var dCount=0;

		var wei=[];var dis=[];var distances=[];var wCount=0;var mul=1;var sum=0; var dSum=0;
		
		
		if(this.iMap[i][j]!=0)
				{
					
				for(var a=0;a<((this.locations).length);a++)
					{
				  var ed1= Math.abs(this.LatPx[a]-j); 
				  var ed2= Math.abs(this.LngPx[a]-i);
				  var ed8 = ed1*ed1+ed2*ed2;
				  var dd1 = Math.sqrt(ed8);
			var ddd1 = dd1;
			
			if(this.wind_speed>0)
			{
				var x=i;
				var y=-1*j;
				var x1=this.LngPx[a];
				var y1=-1*this.LatPx[a];
				var slope=(y1-y)/(x1-x);

				var angle = Math.atan(slope)*(180/3.14);
				var theta=0;var heading=0;

				if((x>x1)&&(y>y1)) theta=0+angle; 
				if((x<x1)&&(y>y1)) theta=180+angle; 
				if((x<x1)&&(y<y1)) theta=180+angle; 
				if((x>x1)&&(y<y1)) theta=360+angle; 


				heading = (450-theta)%360;
				var diff=0; 
				if(heading-this.wind_dir<=180)
					diff = Math.abs(heading - this.wind_dir);
				else if (heading-this.wind_dir>=180)
					diff = Math.abs(360-(heading-this.wind_dir))%180;
				
				ddd1 = (0.1)*(this.wind_speed)*Math.pow(((diff)/180),2)+dd1;
			}
			
				if((dd1)<(2*this.resolution)) {distances[wCount]=dd1;wei[wCount]=this.data[a];dis[wCount]=ddd1;wCount++;}
				}

				sum=0;

				for(var bi=0;bi<dis.length;bi++)
				{
				  mul=wei[bi];	
				  for(var bj=0;bj<dis.length;bj++)
					  { if(bj!=bi) mul*=Math.pow(dis[bj],2);}
		
				 sum+=mul;
				}
		 
				dSum=0;
				for(var bi=0;bi<dis.length;bi++)
				{
				  mul=1;	
				  for(var bj=0;bj<dis.length;bj++)
					  { if(bj!=bi) mul*=Math.pow(dis[bj],2);}
				
		  dSum+=mul;}
		weight=0;
		weight = sum/dSum;

		this.wMap[i][j]=weight;

				}


			}
		}


		var filter=[[1,1,1],[1,1,1],[1,1,1]];


		for (var i = 0; i < this.vWidth-3; i++) {
			for (var j = 0; j < this.vHeight-3; j++) {
		if(this.iMap[i][j]!=0)
		{
			var sum=0;var fsum=0;
				for(var a=0;a<9;a++)
				{
					var aa=Math.floor(a/3);var ab=a%3;
					if(this.iMap[i+aa][j+ab]!=0)
					{
						sum+=this.wMap[i+aa][j+ab];
						fsum+=1;
					}

				}
		
		sum=sum/fsum;
		
		var w=sum;
		if (w>100) {w=100;}


		this.wMap[i][j]=[];
		this.wMap[i][j]['red'] = 0;
		this.wMap[i][j]['green'] = 0;
		this.wMap[i][j]['blue'] = 0;
		var red,green,blue=0;
		
		
		if(this.colorCase[0]==1)
		{
			if(w<=50)
			{
				red = ((this.colorMax[0]-this.colorMin[0])*2*(w)/100) + this.colorMin[0];
			}
			else 
			{
				red = this.colorMax[0];
			}
		}
			
		else if(this.colorCase[0]==-1)
		{
			
			if(w<=50)
			{
				red = this.colorMin[0];
			}
			else
			{
				red = ((this.colorMin[0]-this.colorMax[0])*(100-w))/100 + this.colorMax[0];
			}
		}
		else
		{
			red = this.colorMin[0];
		}
		
		
		if(this.colorCase[1]==1)
		{
			if(w<=50)
			{
				green = ((this.colorMax[1]-this.colorMin[1])*2*(w)/100) + this.colorMin[1];
			}
			else 
			{
				green = this.colorMax[1];
			}
		}
			
		else if(this.colorCase[1]==-1)
		{
			
			if(w<=50)
			{
				green = this.colorMin[1];
			}
			else
			{
				green = ((this.colorMin[1]-this.colorMax[1])*(100-w))/100 + this.colorMax[1];
			}
		}
		else
		{ 
			green = this.colorMin[1];
		}		
		
		
		if(this.colorCase[2]==1)
		{
			if(w<=50)
			{
				blue = ((this.colorMax[2]-this.colorMin[2])*2*(w)/100) + this.colorMin[2];
			}
			else 
			{
				blue = this.colorMax[2];
			}
		}
			
		else if(this.colorCase[2]==-1)
		{
			
			if(w<=50)
			{
				blue = this.colorMin[2];
			}
			else
			{
				blue = ((this.colorMin[2]-this.colorMax[2])*(100-w))/100 + this.colorMax[2];
			}
		}
		else
		{
		
			blue = this.colorMin[2]; 
		}	
		
	
		
		if(red>255) red = 255;
		if(green>255) green = 255;
		if(blue>255) blue = 255;
		

		red = Math.floor(red);
		green = Math.floor(green);
		blue = Math.floor(blue);
		
		
		red = red - red%4;
		green = green - green%4;
		blue = blue - blue%4;
		
		
		this.wMap[i][j]['red'] = red;
		this.wMap[i][j]['green'] = green;
		this.wMap[i][j]['blue'] = blue;


		}		



		}
		}



		return this.wMap;




	}
	
}



function max(input) {
     if (toString.call(input) !== "[object Array]")  
       return false;
  return Math.max.apply(null, input);
	}
function min(input) {
     if (toString.call(input) !== "[object Array]")  
       return false;
  return Math.min.apply(null, input);
	}
