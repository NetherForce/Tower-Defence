let tilesheet = new Image();
tilesheet.src = "./assets/Tilesheet/towerDefense_tilesheet@2.png";
tilesheet.addEventListener("load", function() {
    loadTiles("tilesheetCanvas", tilesheet, originalTileSize, gridSizeX, gridSizeY, sheetLenghtX, sheetLenghtY);
});

let originalTileSize = 128; //in pixels
let cellStride;
let sheetLenghtX = 23, sheetLenghtY = 13;
let distBetweenCanvasTiles = 2; //in pixels
let tileCanvas;

let floorTiles = {
    24: true,
    29: true,
    34: true,
    93: true,
    98: true,
    103: true,
    157: true,
    158: true,
    159: true,
    160: true,
    162: true,
    167: true,
    172: true,
    231: true,
    236: true,
    241: true,

};

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
    // cellSize = Math.floor(cssPixelToRealPixel(cellSize));
    cellSize = Math.floor(cellSize);
    return Math.min(originalTileSize, cellSize);
}

function loadTiles(canvasId, tilesheet, originalSize, numCellsX, numCellsY, sheetLenghtX, sheetLenghtY, theSize = null){
    let newSize;
    let theCanvas = document.getElementById(canvasId);
    let theContext = theCanvas.getContext("2d");
    if(theSize == null){
        newSize = determineNewSize(numCellsX, numCellsY);
        tileSize = newSize;
        cellStride = tileSize+distBetweenCanvasTiles;

        theCanvas.width = sheetLenghtX*cellStride;
        theCanvas.height = sheetLenghtY*cellStride;

        canvas.width = numCellsX*cellStride;
        canvas.height = numCellsY*cellStride;

        updatableCanvas.width = numCellsX*cellStride;
        updatableCanvas.height = numCellsY*cellStride;
    }else{
        newSize = theSize;
        tileSize = newSize;
    }

    theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    updatableContext.clearRect(0, 0, theCanvas.width, theCanvas.height);

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
    isInEditiongMode ? document.getElementById("mapEditToolHolder").style.display = "block" : document.getElementById("mapEditToolHolder").style.display = "none";

    document.getElementById("gameToolHolder").innerHTML = "";
    for(let i in turretDisplayInfo){
        addGameToolButton(i, turretDisplayInfo[i].imageIndex, turretDisplayInfo[i].cost);
    }
    !isInEditiongMode ? document.getElementById("gameToolHolder").style.display = "block" : document.getElementById("gameToolHolder").style.display = "none";

    tileCanvas = theCanvas;
}

function drawTile(indexX, indexY, newX, newY, angle){
    let canvasX = indexX*cellStride;
    let canvasY = indexY*cellStride;

    context.drawImage(tileCanvas, canvasX, canvasY, tileSize, tileSize, newX, newY, tileSize, tileSize);
}

function redrawTile(indexX, indexY, newX, newY, angle){
    let canvasX = indexX*cellStride;
    let canvasY = indexY*cellStride;

    context.clearRect(newX, newY, tileSize, tileSize);

    context.drawImage(tileCanvas, canvasX, canvasY, tileSize, tileSize, newX, newY, tileSize, tileSize);
}

function drawRotadedImage(index, newX, newY, angle){
    let canvasX = (index%sheetLenghtX)*cellStride;
    let canvasY = Math.floor(index/sheetLenghtX)*cellStride;

    updatableContext.save();
    updatableContext.translate(newX, newY);

    updatableContext.rotate(angle);

    updatableContext.drawImage(tileCanvas, canvasX, canvasY, tileSize, tileSize, -tileSize/2, -tileSize/2, tileSize, tileSize);

    updatableContext.restore();
}