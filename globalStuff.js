var tileSize;
var updatableCanvas = document.getElementById("updatable-canvas");
var updatableContext = updatableCanvas.getContext("2d");
updatableContext.globalAlpha = 0.5;
updatableContext.fillStyle = "purple";
updatableContext.fillRect(0, 0, updatableCanvas.width, updatableCanvas.height);

var tilesYouCanBuildOn = {
    48: true,
    53: true,
    58: true,
    114: true,
    119: true,
    124: true,
    180: true,
    185: true,
    190: true,
    246: true,
    251: true,
    256: true,
    151: true,
    152: true,
    153: true,
}