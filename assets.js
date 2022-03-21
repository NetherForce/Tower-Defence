let tilesheet = new Image();
tilesheet.src = "./assets/Tilesheet/towerDefense_tilesheet@2.png";
tilesheet.addEventListener("load", function() {
    loadTiles("tilesheetCanvas", tilesheet, originalTileSize, determineNewSize(20, 20), sheetLenghtX, sheetLenghtY);
});

let originalTileSize = 128; //in pixels
let currSize;
let cellStride;
let sheetLenghtX = 29, sheetLenghtY = 13;
let distBetweenCanvasTiles = 2; //in pixels

function idToIndex(theId){
    return {
        x: theId-Math.floor(theId/sheetLenghtX),
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
    let theCanvas = document.getElementById(canvasId);
    let theContext = theCanvas.getContext("2d");
    theCanvas.width = sheetLenghtX*(newSize+distBetweenCanvasTiles);
    theCanvas.height = sheetLenghtY*(newSize+distBetweenCanvasTiles);

    currSize = newSize;
    cellStride = currSize+distBetweenCanvasTiles;

    theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);

    for(let i = 0; i < sheetLenghtX; i++){
        for(let j = 0; j < sheetLenghtY; j++){
            let sheetX = i*originalSize;
            let sheetY = j*originalSize;
            let newCanvasX = i*(newSize+distBetweenCanvasTiles);
            let newCanvasY = j*(newSize+distBetweenCanvasTiles);
            theContext.drawImage(tilesheet, sheetX, sheetY, originalSize, originalSize, newCanvasX, newCanvasY, newSize, newSize);
        }
    }
}

function drawTile(context, indexX, indexY, newX, newY, angle){
    let canvasX = indexX*cellStride;
    let canvasY = indexY*cellStride;

    context.drawImage(tilesheet, canvasX, canvasY, currSize, currSize, newX, newY, currSize, currSize);
}