# Heatmap-Visualization-JS
[![GitHub release](https://img.shields.io/github/release/SunitRaut/Heatmap-Visualization-JS.svg)](https://github.com/SunitRaut/Heatmap-Visualization-JS)
[![license](https://img.shields.io/github/license/SunitRaut/Heatmap-Visualization-JS.svg)](https://github.com/SunitRaut/Heatmap-Visualization-JS/blob/main/LICENSE)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.4451598.svg)](https://doi.org/10.5281/zenodo.4451598)


A Heatmap Visualization Generation library for JavaScript

# How to use this library

## Installation

Embed within html using <script> tag
```  
<script src= "https://SunitRaut.github.io/Heatmap-Visualization-JS/heatmap.js" > </script>
```
For faster download, you may embed the minified version instead
```  
<script src= "https://SunitRaut.github.io/Heatmap-Visualization-JS/heatmap-minified.js" > </script>
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


## If you Like my Work, Buy me a Coffee!

If this library makes your life easier and has helped bring your project to reality, I would appreciate a small token of gratitude. Click on the below icon to contribute.

<a href="https://www.buymeacoffee.com/sunitraut" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

