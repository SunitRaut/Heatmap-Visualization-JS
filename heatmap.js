class HeatMap {
	
	/*
	Parameters:
	sensing_ellipse_param  
	sensing_ellipse_radius
	sensing_circle_radius
	
	*/
	
	
	constructor()
	{
		//this.locations = locations;
		//this.data = data;
		//Setting default values for Parameters
		this.sensing_circle_radius = 10;
		this.sensing_ellipse_radius = 22;
		this.sensing_ellipse_param = 0.8;
		this.wind_speed=0;
		this.wind_dir=0;
		this.colorMax=[255,0,0];	//red
		this.colorMin=[0,255,0];	//green
		this.colorCase=[1,-1,0];
		this.resolution = 20;
		this.spread = 0.8;
		//can be changed later using class methods 
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
		}//end of for
	
	}//end of calculate ColorCase()
	
	postSomething()
	{
		console.log("Posted Something");
		//console.log(this.locations);
		//console.log(this.data);
		//document.write("Hi");
	}
	
	//set values from 0 to 100
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

		}//end of for
		console.log("Hello");
		//console.log(LatList);
		//console.log(LngList);
		
	//determine region parameters
	var avg=0;var nCount=0;
	for(var a=0;a<((this.locations).length-1);a++)
		{ 
		 for(var b=a+1;b<((this.locations).length);b++)
			{
			  var f1= Math.abs(LatList[a]-LatList[b]); 
			  var f2= Math.abs(LngList[a]-LngList[b]);
			  var f = f1*f1+f2*f2;
			  var df = Math.sqrt(f);
			  //document.getElementById("demo").innerHTML+="<br>"+df;
			  
			  avg+=df;
			  nCount++;
			}//end of for b
		}//end of for a
	avg = avg / nCount;
	console.log(avg);
	this.avgdis = avg;	
		
	this.sensing_circle_radius = this.resolution/2;
	this.sensing_ellipse_radius = this.spread*this.resolution;
	this.sensing_ellipse_param = 0.8;

	//document.getElementById("demo").innerHTML+=LatList+"<br>"+LngList;
	 
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

		}//end of for
	

	

	//document.getElementById("demo").innerHTML+="<br>"+vNorth+"<br>"+vSouth+"<br>"+vEast+"<br>"+vWest;
	 this.vHeight=Math.ceil((this.vNorth-this.vSouth)*(this.resolution/this.avgdis)); this.vWidth=Math.ceil((this.vEast-this.vWest)*(this.resolution/this.avgdis));
	//document.getElementById("demo").innerHTML+="<br>"+vHeight+"px<br>"+vWidth+"px<br>";
	//document.getElementById("demo").innerHTML+="<br>"+LatPx+"<br>"+LngPx;
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
				  //document.getElementById("demo").innerHTML+="<br>"+df;
				  if(df<=(2*this.resolution)) {ellipseSet1[dfCount]=a;ellipseSet2[dfCount]=b;dfLength[dfCount]=df;dfCount++;}
					
				}//end of for b
			}//end of for a
	//document.getElementById("demo").innerHTML+="<br>"+dfLength+"<br>"+ellipseSet1+"<br>"+ellipseSet2;

	var imageBounds = {
		north : this.vNorth,
		south : this.vSouth,
		east : this.vEast,
		west : this.vWest

	};
	
		/*
		north: 19.083550,
		south: 19.080016,
		east: 72.835064,
		west: 72.821016


		north: 19.087174,
		south: 19.084099,
		east: 72.835255,
		west: 72.832180
	*/
	
	//vWidth=10;
		this.iMap = [];
		for(let i = 0; i < this.vWidth; i++) {
			this.iMap[i] = [];
			for(let j = 0; j < this.vHeight; j++) {
				this.iMap[i][j] = 0;
			}
		}

 

	//document.getElementById("demo").innerHTML+="<br>"+ellipseSet1.length;
	
	//p[0] = new PNGlib(vWidth, vHeight, 512); // construcor takes height, weight and color-depth
	//var background = p[0].color(0, 0, 0, 0); // set the background transparent

	
	

	for (var i = 0; i < this.vWidth; i++) {
		for (var j = 0; j < this.vHeight; j++) {
			//p.buffer[p.index(i , j)] = p.color(255, 255, 255);
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
			  //if ((Math.abs(d1+d2-d3))<=(300/dfLength[a])) {dCount++;continue;}
			  //if ((Math.abs(d1+d2-d3))<=(50*(20/dfLength[a]))) {dCount++;continue;}
			  if ((Math.abs(d1+d2-(this.sensing_ellipse_param*d3)))<=((2-this.sensing_ellipse_param)*(this.sensing_ellipse_radius))) {dCount++;break;}
			  //if (Math.abs(d1+d2)<=(45)) {dCount++;break;}
			  //if ((d1+d2)<=55) dCount++;
			  //d = e1+e2;
			  //if(d<=30) dCount++;

			 
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
		//var opa=0;
		//if(dCount>1)opa=255;
		//else if(dCount==2)opa=255;
		//else if(dCount==1)opa=155;
			  //p[0].buffer[p[0].index(i , j)] = p[0].color(255, 0, 0);
			  this.iMap[i][j]=1;
			}//end of if
			  
		}
	}

 //imgOverLay = "data:image/png;base64,"+p[0].getBase64();
		return this.iMap;

	} //end of shadeRegion




	createHeatMap(data)
	{
		
		this.data = data;
		var weight=0;
		
		//document.getElementById("demo").innerHTML+="<br>"+p.buffer[p.index(0 , 0)];
		//document.getElementById("demo").innerHTML+="<br>"+aqi[1]+"<br>";
		var computation=0;
		this.wMap=[];

			for(let i = 0; i < this.vWidth; i++) {
				this.wMap[i] = [];
				//oMap[i]=[];
				for(let j = 0; j < this.vHeight; j++) {
					this.wMap[i][j] = 0;
					//oMap[i][j]=0;
				}
			}



		//console.log(vWidth*vHeight);
		for (var i = 0; i < this.vWidth; i++) {
			for (var j = 0; j < this.vHeight; j++) {
				//p[0].buffer[p[0].index(i , j)] = p[0].color(255, 255, 255);
				var dCount=0;

		var wei=[];var dis=[];var distances=[];var wCount=0;var mul=1;var sum=0; var dSum=0;
		
		
		if(this.iMap[i][j]!=0)
				{
					
				//for(var a=0;a<(nodeMeta.length-1);a++)
				for(var a=0;a<((this.locations).length);a++)
					{
				  var ed1= Math.abs(this.LatPx[a]-j); //y axis
				  var ed2= Math.abs(this.LngPx[a]-i);//x axis
				  var ed8 = ed1*ed1+ed2*ed2;
				  var dd1 = Math.sqrt(ed8);//Distance between each node and sample point
			
				var x=i;
				var y=-1*j;
				var x1=this.LngPx[a];
				var y1=-1*this.LatPx[a];
				var slope=(y1-y)/(x1-x);

				var angle = Math.atan(slope)*(180/3.14);
				var theta=0;var heading=0;

				if((x>x1)&&(y>y1)) theta=0+angle; //first quadrant
				if((x<x1)&&(y>y1)) theta=180+angle; //second quadrant
				if((x<x1)&&(y<y1)) theta=180+angle; //third quadrabt
				if((x>x1)&&(y<y1)) theta=360+angle; //fourth quadrant


				heading = (450-theta)%360;
				var diff=0; 
		if(heading-this.wind_dir<=180)
				diff = Math.abs(heading - this.wind_dir);
		else if (heading-this.wind_dir>=180)
				diff = Math.abs(360-(heading-this.wind_dir))%180;
				//var ddd1 = Math.pow(((diff)/180),1)*dd1;
				var ddd1 = (0.1)*(this.wind_speed)*Math.pow(((diff)/180),2)+dd1;

				if((dd1)<(2*this.resolution)) {distances[wCount]=dd1;wei[wCount]=this.data[a];dis[wCount]=ddd1;wCount++;}
				}//end of for a


				sum=0;
		/*
				var d_min=parseInt(distances[0]);
				for (var z=1;z<=wCount;z++)
				{
				if(d_min>parseInt(distances[z])) d_min=parseInt(distances[z]);
				}
		*/
		//oMap[i][j]=Math.floor(255*(40-min(distances))/40)%256;
		//oMap[i][j]=255;
		//if(min(distances)>=30) {oMap[i][j]=50;}
		//else if(min(distances)>=25) {oMap[i][j]=120;}
		//else if(min(distances)>=20) {oMap[i][j]=200}

		//if(min(distances)<20) {oMap[i][j]=255;}
		//oMap[i][j]=255;
		//if(min(distances)==0) console.log(wCount);
		/*
		if(wCount<=2) {oMap[i][j]=105;}
		else{oMap[i][j]=255;}
		if(wCount==4) oMap[i][j]=255;
		*/

		//else if(min(distances)<40.0) {oMap[i][j]=255;}
		//else if(min(distances)<20.0) {/*console.log(min(distances));*/oMap[i][j]=155;}
		//console.log(oMap[i][j]);
		//else if(d_min>20) oMap[i][j]=100;
		//oMap[i][j]=(255*(min(distances)/40))%256;
		//oMap[i][j]=(255*((40-min(distances))/40))%256;
		//console.log(min(distances));
				//oMap[i][j]=150+(255/40)*(40-Math.floor(min(distances)));
				//if(oMap[i][j]>255)oMap[i][j]=255;
		//oMap[i][j]=40-min(distances);

		//oMap[i][j]=255;

				for(var bi=0;bi<dis.length;bi++)
				{
				  mul=wei[bi];	
				  for(var bj=0;bj<dis.length;bj++)
					  { if(bj!=bi) mul*=Math.pow(dis[bj],2);}
		// *Math.pow(diffe[bj],2)
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
		//if(wCount>6){document.getElementById("demo").innerHTML+=dis+"||";}
		//if (weight>100) {weight=100;}
		//weight=Math.floor((255*weight)/100);
		this.wMap[i][j]=weight;
		/*
		p[iBufferCount].buffer[p[iBufferCount].index(i , j)] = p[iBufferCount].color(p_red, p_green, p_blue);
		*/	

				}//end of if


			}//end of for j 
		}//end of for i

		//............



		var filter=[[1,1,1],[1,1,1],[1,1,1]];
		//var filter=[[0,0,0],[0,1,0],[0,0,0]];


		for (var i = 0; i < this.vWidth-3; i++) {
			for (var j = 0; j < this.vHeight-3; j++) {
		if(this.iMap[i][j]!=0)
		{
			var sum=0;var fsum=0;
				for(var a=0;a<9;a++){
				var aa=Math.floor(a/3);var ab=a%3;
				if(this.iMap[i+aa][j+ab]!=0)
		{
				sum+=this.wMap[i+aa][j+ab];
				fsum+=1;
				//filter[aa][ab];
		}

		}//end of a
		sum=sum/fsum;
		//var w=wMap[i][j];
		var w=sum;
		if (w>100) {w=100;}
		//w=Math.floor((255*w)/100);
		//var opacity;
		//opacity=oMap[i][j];
		//opacity=Math.floor((255/40)*oMap[i][j]);
		//opacity=255;
		//if(j>vHeight/2) opacity=255;
		//else opacity=200;
		//if(opacity==5) console.log(opacity);

		//Decide colour coding here
		this.wMap[i][j]=[];
		this.wMap[i][j]['red'] = 20;
		this.wMap[i][j]['green'] = 120;
		this.wMap[i][j]['blue'] = 0;
		var red,green,blue=0;
		
		//red
		
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
		
		//green
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
		
		//blue
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
		
		//green
		//green = ((this.colorMin[1]-this.colorMax[1])*(100-w))/100 + this.colorMax[1];
		//if((this.green>255)) console.log("Here");
		//blue
		
		if(red>255) red = 255;
		if(green>255) green = 255;
		if(blue>255) blue = 255;
		
		//if(red<0) red = 0;
		//if(green<0) green = 0;
		//if(blue<0) blue = 0;
		//red=0;blue=0;
		
		//Rounding off
		red = Math.floor(red);
		green = Math.floor(green);
		blue = Math.floor(blue);
		
		//3x Reduction in colour quantization
		
		red = red - red%4;
		green = green - green%4;
		blue = blue - blue%4;
		
		
		this.wMap[i][j]['red'] = red;
		this.wMap[i][j]['green'] = green;
		this.wMap[i][j]['blue'] = blue;

		

		//opacity=255;
		//w=Math.floor(oMap[i][j]);
		//w=opacity;
		//if((j>vWidth/2)&&(i>vHeight/2)) opacity=180;
		//if(opacity>255)opacity=255;
		//if(opacity<0) opacity=0;
		//if(w>200)console.log("200");
		//w=255;
		//opacity=255;
		//p[iBufferCount].buffer[p[iBufferCount].index(i , j)] = p[iBufferCount].color(p_red, p_green, p_blue,opacity);

		}//end of if iMap!=0			



		}//end of i
		}//end of j



		return this.wMap;



		//.............

	}//end of colourCodeRegion
	
}//End of HeatMap Class



//Auxilliary Functions 

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
