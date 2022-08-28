var tileSize;
var updatableCanvas = document.getElementById("updatable-canvas");
var updatableContext = updatableCanvas.getContext("2d");
updatableContext.globalAlpha = 0.5;
updatableContext.fillStyle = "purple";
updatableContext.fillRect(0, 0, updatableCanvas.width, updatableCanvas.height);

var gridSizeX = 20;
var gridSizeY = 20;

var tilesYouCanBuildOn = {
    50: true,
    55: true,
    60: true,
    119: true,
    124: true,
    129: true,
    188: true,
    193: true,
    198: true,
    257: true,
    262: true,
    267: true,
}

var borderSize = 25;

var audioVolume = {
    "sfx": 1,
    "music": 1,
}

var reachedLevel = 1;

var everythingLoaded = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
        clearInterval(everythingLoaded);

        console.log("everything has loaded");
    }
  }, 10);