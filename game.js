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
        map.drawCanvasOutline();
    }
};

function keyup(key) {
    
};

function mouseup(info) {
    if(isInEditiongMode){
        let indexX = Math.floor(mouseX/tileSize);
        let indexY = Math.floor(mouseY/tileSize);
        
        if(indexX < map.sizeX && indexY < map.sizeY){
            if(info.button == 0){
                console.log(indexX, indexY, currEditIndex);
                map.tiles[indexX][indexY].type = currEditIndex;
                tileFunctions.redraw(map.tiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
            }else{
                if(map.overlapTiles[indexX][indexY].type != currEditIndex){
                    map.overlapTiles[indexX][indexY].type = currEditIndex;
                    tileFunctions.redraw(map.tiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
                    tileFunctions.draw(map.overlapTiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
                }else{
                    map.overlapTiles[indexX][indexY].type = -1;
                    tileFunctions.redraw(map.tiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
                }
            }
        }
    }
};
