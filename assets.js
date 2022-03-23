let tilesheet = new Image();
tilesheet.src = "./assets/Tilesheet/towerDefense_tilesheet@2.png";
tilesheet.addEventListener("load", function() {
    loadTiles("tilesheetCanvas", tilesheet, originalTileSize, determineNewSize(20, 20), sheetLenghtX, sheetLenghtY);
});

let originalTileSize = 128; //in pixels
let currSize;
let cellStride;
let sheetLenghtX = 22, sheetLenghtY = 13;
let distBetweenCanvasTiles = 2; //in pixels
let tileCanvas;

function idToIndex(theId){
    return {
        x: theId-Math.floor(theId/sheetLenghtX)*sheetLenghtX,
        y: Math.floor(theId/sheetLenghtX)
    }
}

function indexToId(x, y){
    return (y*sheetLenghtX + x);
}

function determineNewSize(cellCountX, cellCountY){
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let cellSize = Math.min(windowWidth/cellCountX, windowHeight/cellCountY);
    cellSize = Math.floor(cssPixelToRealPixel(cellSize));
    return Math.min(originalTileSize, cellSize);
}

function loadTiles(canvasId, tilesheet, originalSize, newSize, sheetLenghtX, sheetLenghtY){
    currSize = newSize;
    cellStride = currSize+distBetweenCanvasTiles;
    
    let theCanvas = document.getElementById(canvasId);
    let theContext = theCanvas.getContext("2d");
    theCanvas.width = sheetLenghtX*cellStride;
    theCanvas.height = sheetLenghtY*cellStride;
    
    let theBackgroundCanvas = document.getElementById("backgroundCanvas");
    let theBackgroundContext = theBackgroundCanvas.getContext("2d");
    theBackgroundCanvas.width = sheetLenghtX*cellStride;
    theBackgroundCanvas.height = sheetLenghtY*cellStride;

    theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
    theBackgroundContext.clearRect(0, 0, theCanvas.width, theCanvas.height);

    document.getElementById("mapEditToolHolder").innerHTML = "";
    for(let j = 0; j < sheetLenghtY; j++){
        for(let i = 0; i < sheetLenghtX; i++){
            let sheetX = i*originalSize;
            let sheetY = j*originalSize;
            let newCanvasX = i*cellStride;
            let newCanvasY = j*cellStride;
            theContext.drawImage(tilesheet, sheetX, sheetY, originalSize, originalSize, newCanvasX, newCanvasY, newSize, newSize);

            addEditToolButton(i, j);
        }
    }

    tileCanvas = theCanvas;
}

function drawTile(context, indexX, indexY, newX, newY, angle){
    let canvasX = indexX*cellStride;
    let canvasY = indexY*cellStride;

    context.drawImage(tileCanvas, canvasX, canvasY, currSize, currSize, newX, newY, currSize, currSize);
}

function redrawTile(context, indexX, indexY, newX, newY, angle){
    let canvasX = indexX*cellStride;
    let canvasY = indexY*cellStride;
    
    console.log(newY, newY, currSize, currSize);

    context.clearRect(newY, newY, currSize, currSize);

    context.drawImage(tileCanvas, canvasX, canvasY, currSize, currSize, newX, newY, currSize, currSize);
}