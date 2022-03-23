class Tile{
    constructor(type_, indexX_, indexY_){
        this.type = type_;
        this.indexX = indexX_;
        this.indexY = indexY_;
        this.canBeBuildOn = true;
    }
}

class Map{
    constructor(sizeX_, sizeY_){
        this.sizeX = sizeX_;
        this.sizeY = sizeY_;
        this.tiles=mapBackgroundTiles[0];
        this.overlapTiles=[];
        this.offsetX = 0;
        this.offsetY = 0;
    }
    update(){
        //update all the overlapping assets
    }
    drawBackgroundTiles(){
        context.clearRect(0, 0, context.width, context.height);

        for(let i = 0; i < this.sizeX; i++){
            for(let j = 0; j < this.sizeY; j++){
                tileFunctions.draw(this.tiles[i][j].type, i, j, this.offsetX, this.offsetY);
            }
        }
    }
    drawCanvasOutline(){
        for(let i = 0; i < this.sizeX+1; i++){
            context.strokeStyle = "black";
            context.beginPath();
            context.moveTo(0, i*tileSize);
            context.lineTo(this.sizeY*tileSize, i*tileSize);
            context.stroke();
        }
        
        for(let i = 0; i < this.sizeY+1; i++){
            context.strokeStyle = "black";
            context.beginPath();
            context.moveTo(i*tileSize, 0);
            context.lineTo(i*tileSize, this.sizeX*tileSize);
            context.stroke();
        }
    }
}