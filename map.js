class Tile{
    constructor(type_, indexX_, indexY_){
        this.type = type_;
        this.indexX = indexX_;
        this.indexY = indexY_;
        this.canBeBuildOn = true;
    }
    returnX(offsetX){
        return (this.indexX * currSize + offsetX);
    }
    returnY(offsetY){
        return (this.indexY * currSize + offsetY);
    }
    draw(context, offsetX, offsetY){
        try{
            let canvasPosition = idToIndex(this.type);
            drawTile(context, canvasPosition.x, canvasPosition.y, this.returnX(offsetX), this.returnY(offsetY), 0);
        }catch(error){
            console.error(error);
        }
    }
}

class Map{
    coinstructor(){
        this.sizeX;
        this.sizeY;
        this.tiles=[];
        this.overlapTiles=[];
        this.offsetX = 0;
        this.offsetY = 0;
    }
    update(){
        //update all the overlapping assets
    }
    drawBackgroundTiles(backgroundContext){
        for(let i = 0; i < this.sizeX; i++){
            for(let j = 0; j < this.sizeY; j++){
                this.tiles[i][j].draw(backgroundContext, this.offsetX, this.offsetY);
            }
        }
    }
}