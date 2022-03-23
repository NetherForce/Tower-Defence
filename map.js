class Tile{
    constructor(type_, indexX_, indexY_, size_){
        this.type = type_;
        this.indexX = indexX_;
        this.indexY = indexY_;
        this.size = size_;
        this.canBeBuildOn = true;
    }
    returnX(offsetX){
        return (this.indexX * this.size + offsetX);
    }
    returnY(offsetY){
        return (this.indexY * this.size + offsetY);
    }
    draw(context, offsetX, offsetY){
        try{
            let canvasPosition = idToIndex(this.type);
            drawTile(context, canvasPosition.x, canvasPosition.y, this.returnX(offsetX), this.returnY(offsetY), 0);
        }catch(error){
            console.error(error);
        }
    }
    redraw(context, offsetX, offsetY){
        try{
            let canvasPosition = idToIndex(this.type);
            redrawTile(context, canvasPosition.x, canvasPosition.y, this.returnX(offsetX), this.returnY(offsetY), 0);
        }catch(error){
            console.error(error);
        }
    }
}

class Map{
    constructor(sizeX_, sizeY_, tileSize_){
        this.sizeX = sizeX_;
        this.sizeY = sizeY_;
        this.tileSize = tileSize_;
        this.tiles=[];
        for(let i = 0; i < this.sizeX; i++){
            this.tiles[i] = [];
            for(let j = 0; j < this.sizeY; j++){
                this.tiles[i][j] = new Tile(119, i, j, this.tileSize);
            }
        }
        this.overlapTiles=[];
        this.offsetX = 0;
        this.offsetY = 0;
    }
    update(){
        //update all the overlapping assets
    }
    drawBackgroundTiles(backgroundContext){
        backgroundContext.clearRect(0, 0, backgroundContext.width, backgroundContext.height);

        for(let i = 0; i < this.sizeX; i++){
            for(let j = 0; j < this.sizeY; j++){
                this.tiles[i][j].draw(backgroundContext, this.offsetX, this.offsetY);
            }
        }
    }
    drawCanvasOutline(context){
        for(let i = 0; i < this.sizeX+1; i++){
            context.strokeStyle = "black";
            context.beginPath();
            context.moveTo(0, i*this.tileSize);
            context.lineTo(this.sizeY*this.tileSize, i*this.tileSize);
            context.stroke();
        }
        
        for(let i = 0; i < this.sizeY+1; i++){
            context.strokeStyle = "black";
            context.beginPath();
            context.moveTo(i*this.tileSize, 0);
            context.lineTo(i*this.tileSize, this.sizeX*this.tileSize);
            context.stroke();
        }
    }
}