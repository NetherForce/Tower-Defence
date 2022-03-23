endelessCanvas = true;
let map;
let isInEditiongMode = true;
let currEditIndex = 119;

window.addEventListener("load", function() {
    let aMap = new Map(20, 20);
    setMap(aMap);
});

function setMap(aMap){
    map = aMap;
    map.drawBackgroundTiles();
}

function update() {

}

function draw() {
    if(isInEditiongMode && map){
        // map.drawCanvasOutline();
    }
};

function keyup(key) {
    
};

function mouseup() {
    // console.log(mouseX, mouseY);
    if(isInEditiongMode){
        let indexX = Math.floor(mouseX/tileSize);
        let indexY = Math.floor(mouseY/tileSize);
        console.log(indexX, indexY);
        if(indexX < map.sizeX && indexY < map.sizeY){
            console.log(indexX, indexY, currEditIndex);
            map.tiles[indexX][indexY].type = currEditIndex;
            tileFunctions.redraw(map.tiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
        }
    }
};
