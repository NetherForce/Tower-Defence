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
        this.tiles;
        this.overlapTiles;
        this.offsetX = 0;
        this.offsetY = 0;
        this.startIndexX;
        this.startIndexY;
        this.endIndexX;
        this.endIndexY;
        this.path;
        this.enemies = [];
        this.enemiesToSpawn = [[0, 100]]; //keeps track of the enemy types it needs to spawn and the number of them
        this.turrets = [];
        this.bullets = [];
        this.globalHealth = 100;
    }
    drawBackgroundTiles(){
        context.clearRect(0, 0, context.width, context.height);

        for(let i = 0; i < this.sizeX; i++){
            for(let j = 0; j < this.sizeY; j++){
                tileFunctions.draw(this.tiles[i][j].type, i, j, this.offsetX, this.offsetY);
                tileFunctions.draw(this.overlapTiles[i][j].type, i, j, this.offsetX, this.offsetY);
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
    calculateNextPathIndex(currIndexX, currIndexY, pastIndexX, pastIndexY){
        //currIndexX, currIndexY - indexes of the tiles we want to continue the path from
        //pastIndexX, pastIndexY - indexes of the tiles we came from
        let path = {
            indexX: currIndexX,
            indexY: currIndexY,
            next: null
        }
        if(currIndexX-1 > 0 && currIndexX-1 != pastIndexX && floorTiles[this.tiles[currIndexX-1][currIndexY].type] != undefined){
            path.next = this.calculateNextPathIndex(currIndexX-1, currIndexY, currIndexX, currIndexY);
        }
        if(currIndexX+1 < this.sizeX && currIndexX+1 != pastIndexX && floorTiles[this.tiles[currIndexX+1][currIndexY].type] != undefined){
            path.next = this.calculateNextPathIndex(currIndexX+1, currIndexY, currIndexX, currIndexY);
        }
        
        if(currIndexY-1 > 0 && currIndexY-1 != pastIndexY && floorTiles[this.tiles[currIndexX][currIndexY-1].type] != undefined){
            path.next = this.calculateNextPathIndex(currIndexX, currIndexY-1, currIndexX, currIndexY);
        }
        if(currIndexY+1 < this.sizeY && currIndexY+1 != pastIndexY && floorTiles[this.tiles[currIndexX][currIndexY+1].type] != undefined){
            path.next = this.calculateNextPathIndex(currIndexX, currIndexY+1, currIndexX, currIndexY);
        }

        // if(path.next != null){
        //     context.strokeWidth = 2;
        //     context.strokeStyle = "red";
        //     context.beginPath();
        //     context.moveTo(path.indexX*tileSize+tileSize/2, path.indexY*tileSize+tileSize/2);
        //     context.lineTo(path.next.indexX*tileSize+tileSize/2, path.next.indexY*tileSize+tileSize/2);
        //     context.stroke();
        // }
        
        // context.globalAlpha = 0.5;
        // context.fillStyle = "orange";
        // context.fillRect(currIndexX*tileSize, currIndexY*tileSize, tileSize, tileSize);
        // context.globalAlpha = 1;

        return path;
    }
    calculatePath(){
        this.path = this.calculateNextPathIndex(this.startIndexX, this.startIndexY, -1, -1);
    }
    removeEnemy(enemyId, reachedEnd){
        if(reachedEnd){
            this.globalHealth -= this.enemies[enemyId].dmg;
        }
        this.enemies[this.enemies.length-1].id = enemyId;
        this.enemies[enemyId] = this.enemies[this.enemies.length-1];
        this.enemies.pop();
    }
    placeTurret(indexX, indexY, type){
        if(this.overlapTiles[indexX][indexY].type == -1 && tilesYouCanBuildOn[this.tiles[indexX][indexY].type]){
            let turret = new Turret(this.turrets.length, indexX, indexY);
            turret.setByType(type);
            this.turrets.push(turret);
            this.overlapTiles[indexX][indexY].type = type;
        }   
    }
    removeBullet(bulletId){
        this.bullets[this.bullets.length-1].id = bulletId;
        this.bullets[bulletId] = this.bullets[this.bullets.length-1];
        this.bullets.pop();
    }
}