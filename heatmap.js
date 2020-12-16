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
	}
	
	postSomething()
	{
		console.log("Posted Something");
		//console.log(this.locations);
		//console.log(this.data);
		//document.write("Hi");
	}
	
	
	
	
	shadeRegion(locations)
	{
		this.locations = locations;
		var LatList=[];
		var LngList=[];
		
	for(var a=0;a<((this.locations).length);a++)
		
		{ 
		  LatList[a] = Number(this.locations[a][0]);
		  LngList[a] = Number(this.locations[a][1]);

		}//end of for
		console.log("Hello");
		console.log(LatList);
		console.log(LngList);

	//document.getElementById("demo").innerHTML+=LatList+"<br>"+LngList;
	 
	 this.vNorth = max(LatList)+0.0010;
	 this.vSouth = min(LatList)-0.0010;
	 this.vEast = max(LngList)+0.0010;
	 this.vWest = min(LngList)-0.0010;
	 
	 var LatPx = [];
	 var LngPx = [];
	 
			for(var a=0;a<((this.locations).length);a++)
			
			{ 
			  LatPx[a]=Math.ceil((this.vNorth-LatList[a])*(20/0.0005));
			  LngPx[a]=Math.floor((LngList[a]-this.vWest)*(20/0.0005));

			}//end of for


	//document.getElementById("demo").innerHTML+="<br>"+vNorth+"<br>"+vSouth+"<br>"+vEast+"<br>"+vWest;
	 this.vHeight=Math.ceil((this.vNorth-this.vSouth)*(20/0.0005)); this.vWidth=Math.ceil((this.vEast-this.vWest)*(20/0.0005));
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
				  var f1= Math.abs(LatPx[a]-LatPx[b]); 
				  var f2= Math.abs(LngPx[a]-LngPx[b]);
				  var f = f1*f1+f2*f2;
				  var df = Math.sqrt(f);
				  //document.getElementById("demo").innerHTML+="<br>"+df;
				  if(df<=50) {ellipseSet1[dfCount]=a;ellipseSet2[dfCount]=b;dfLength[dfCount]=df;dfCount++;}
					
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
			  var ellipseMid1 = (LatPx[ellipseSet1[a]] + LatPx[ellipseSet2[a]])/2 ;
			  var ellipseMid2 = (LngPx[ellipseSet1[a]] + LngPx[ellipseSet2[a]])/2 ;
			  var e1= Math.abs(LatPx[ellipseSet1[a]]-j); 
			  var e2= Math.abs(LngPx[ellipseSet1[a]]-i);
			  var e3= Math.abs(LatPx[ellipseSet2[a]]-j);
			  var e4= Math.abs(LngPx[ellipseSet2[a]]-i);
			  var e5= Math.abs(ellipseMid1-j); 
			  var e6= Math.abs(ellipseMid2-i);
			  var e8 = e1*e1+e2*e2;
			  var e9 = e3*e3+e4*e4;
			  var e10 = e5*e5+e6*e6;
			  var d1 = Math.sqrt(e8);
			  if(d1>50) continue;
			  var d2 = Math.sqrt(e9);
			  if(d2>50) continue;
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
			  var e1= Math.abs(LatPx[a]-j); 
			  var e2= Math.abs(LngPx[a]-i);
			 
			  var e5 = e1*e1+e2*e2;
			 
			  var d = Math.sqrt(e5);
			  
			  if (d<=this.sensing_circle_radius) dCount++;
			 
			
			 
			}
			if(dCount>0)
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


	} //end of shadeRegion
	
	colourCodeRegion()
	{
		
	}
	
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