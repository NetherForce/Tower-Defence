var tileFunctions = new (function (){
    function returnX(indexX, offsetX){
        return (indexX * tileSize + offsetX);
    }
    this.returnX = returnX;

    function returnY(indexY, offsetY){
        return (indexY * tileSize + offsetY);
    }
    this.returnY = returnY;

    function draw(type, indexX, indexY, offsetX, offsetY){
        try{
            let canvasPosition = idToIndex(type);
            drawTile(canvasPosition.x, canvasPosition.y, returnX(indexX, offsetX), returnY(indexY, offsetY), 0);
        }catch(error){
            console.error(error);
        }
    }
    this.draw = draw;

    function redraw(type, indexX, indexY, offsetX, offsetY){
        try{
            let canvasPosition = idToIndex(type);
            redrawTile(canvasPosition.x, canvasPosition.y, returnX(offsetX), returnY(offsetY), 0);
        }catch(error){
            console.error(error);
        }
    }
    this.redraw = redraw;
});