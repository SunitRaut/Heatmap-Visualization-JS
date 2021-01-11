# Heatmap-Visualization-JS
[![GitHub release](https://img.shields.io/github/release/SunitRaut/Heatmap-Visualization-JS.svg)](https://github.com/SunitRaut/Heatmap-Visualization-JS)
[![license](https://img.shields.io/github/license/SunitRaut/Heatmap-Visualization-JS.svg)](https://github.com/SunitRaut/Heatmap-Visualization-JS/blob/master/LICENSE)

A Heatmap Visualization Generation library for JavaScript

# How to use this library

## Installation

Embed within html using <script> tag
```  
<script src= "https://SunitRaut.github.io/Heatmap-Visualization-JS/heatmap.js" > </script>
```

### Create HeatMap Object
```
var p = new HeatMap();
```
### Define Region for HeatMap
```
var loc = [[19.0454,72.8891],[19.045,72.8893],[19.0459,72.8894],[19.0452,72.8897],[19.0458,72.8898],[19.0458,72.8903],[19.0452,72.8903]];

var region = p.defineRegion(loc);
```

### Create HeatMap by adding data to region
```
var data = [12,43,64,53,34,23,38];

var heatmap = p.createHeatMap(data);
```

Check Demo here: https://SunitRaut.github.io/Heatmap-Visualization-JS/example
