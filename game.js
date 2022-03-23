endelessCanvas = true;
let map;
let backgroundContext = document.getElementById("backgroundCanvas").getContext("2d");
let isInEditiongMode = true;
let currEditIndex = 119;

window.addEventListener("load", function() {
    let aMap = new Map(20, 20, currSize);
    setMap(aMap);
});

function setMap(aMap){
    map = aMap;
    map.drawBackgroundTiles(backgroundContext);
}

function update() {

}

function draw() {
    if(isInEditiongMode && map){
        map.drawCanvasOutline(backgroundContext);
    }
};

function keyup(key) {
    
};

function mouseup() {
    // console.log(mouseX, mouseY);
    if(isInEditiongMode){
        let indexX = Math.floor(mouseX/map.tileSize);
        let indexY = Math.floor(mouseY/map.tileSize);
        if(indexX < map.sizeX && indexY < map.sizeY){
            console.log(indexX, indexY, currEditIndex);
            map.tiles[indexX][indexY].type = currEditIndex;
            map.tiles[indexX][indexY].redraw(backgroundContext, 0, 0);
        }
    }
};
