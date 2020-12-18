<html>

<head>
<title>Heatmap Demo - Try It Out!</title>
<script src="heatmap.js"></script>
<script src="https://www.xarg.org/download/pnglib.js"></script>
</head>

<body>

<script>
var loc = [[19.0454,72.8891],[19.045,72.8893],[19.0459,72.8894],[19.0452,72.8897],[19.0458,72.8898],[19.0458,72.8903],[19.0452,72.8903]];
var data = [0,78,0,5,83,5,100];
//var loc = [[1,1],[2000,3890]];
//var data = [20,49,56];

var p = new HeatMap();
p.postSomething();
p.setResolution(60);
var region = p.defineRegion(loc);

var image = new PNGlib(p.vWidth, p.vHeight, 256); // construcor takes height, weight and color-depth
var background = image.color(0, 0, 0, 0); // set the background transparent

for (var i = 0; i < p.vWidth; i++) {
		for (var j = 0; j < p.vHeight; j++) {
			if(region[i][j]==1)
			{
				image.buffer[image.index(i , j)] = image.color(255, 0, 0);
				
			}//end of if
		
		}//end of for j
	}//end of for i
var imgOverLay = "data:image/png;base64,"+image.getBase64();
document.write("<img src='"+imgOverLay+"'>");

//Set Colour in [r,g,b] format for maximum and minimum values respectively
p.setMaxMin([255,0,0],[0,255,0]);

//returns heatmap as a 3d array. heatmap[i][j][red|green|blue] 
var heatmap = p.createHeatMap(data);

for (var i = 0; i < p.vWidth; i++) {
		for (var j = 0; j < p.vHeight; j++) {
			if(p.iMap[i][j]==1)
			{
				image.buffer[image.index(i , j)] = image.color(heatmap[i][j]['red'], heatmap[i][j]['green'], heatmap[i][j]['blue']);
				
			}//end of if
		
		}//end of for j
	}//end of for i
imgOverLay = "data:image/png;base64,"+image.getBase64();
document.write("<img src='"+imgOverLay+"'>");


</script>




</body>
</html>
