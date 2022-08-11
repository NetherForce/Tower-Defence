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
        this.enemies = {};
        this.enemiesToSpawn = [[0, 10]]; //keeps track of the enemy types it needs to spawn and the number of them
        this.turrets = {};
        this.bullets = {};
        this.idCount = 0;
        this.globalHealth = 100;

        this.coins = 1000;

        this.pathTileIndex = 93;
    }
    fillWithDefaultTiles(defaultTileID){
        this.tiles = [];
        this.overlapTiles = [];
        for(let i = 0; i < this.sizeX; i++){
            this.tiles[i] = [];
            this.overlapTiles[i] = [];
            for(let j = 0; j < this.sizeY; j++){
                this.tiles[i][j] = defaultTileID;
                this.overlapTiles[i][j] = -1;
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
    drawBackgroundTiles(){
        context.clearRect(0, 0, context.width, context.height);

        for(let i = 0; i < this.sizeX; i++){
            for(let j = 0; j < this.sizeY; j++){
                // console.log(i, j, this.tiles);
                // console.log(this.tiles[i][j].type, this.offsetX, this.offsetY);
                tileFunctions.draw(this.tiles[i][j].type, i, j, this.offsetX, this.offsetY);
                tileFunctions.draw(this.overlapTiles[i][j].type, i, j, this.offsetX, this.offsetY);
            }
        }
        // this.drawCanvasOutline();
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
    addEnemy(type, enemy=null){
        if(enemy != null){
            currEnemy.spawn();
            currEnemy.id = this.idCount;
            this.idCount++;
            this.enemies[currEnemy.id] = currEnemy;
        }else{
            let newEnemy = new Enemy(this.idCount, this.path);
            newEnemy.setByType(type);
            this.idCount++;
            this.enemies[newEnemy.id] = newEnemy;
        }
    }
    removeEnemy(enemyId, reachedEnd){
        if(reachedEnd){
            this.globalHealth -= this.enemies[enemyId].dmg;
            updateHealthStat(this.globalHealth);
        }else{
            this.coins += enemyTypes[this.enemies[enemyId].type].rewardedCoins;
            updateCoinStat(this.coins);
        }
        delete this.enemies[enemyId];
    }
    placeTurret(indexX, indexY, type){
        if(this.coins < turretDisplayInfo[type].cost) return;
        if(indexX < 0 || indexX >= this.sizeX) return;
        if(indexY < 0 || indexY >= this.sizeY) return;
        if(this.overlapTiles[indexX][indexY].type != -1) return;
        if(!tilesYouCanBuildOn[this.tiles[indexX][indexY].type]) return;
        
        let turret = new turretTypes[type](this.idCount, indexX, indexY, type);
        this.idCount++;
        this.turrets[turret.id] = turret;
        this.overlapTiles[indexX][indexY].type = -2;

        copyAudioAndPlay(turretDisplayInfo[type].placeAudio);

        // for(let i = 0; i < turretDisplayInfo.reloadTimes; i++){
        //     this.turrets[turret.id].reload();
        // }

        this.coins -= turretDisplayInfo[type].cost;
        updateCoinStat(this.coins);
    }
    addBullet(turret){
        let newBullet = new bulletTypes[turret.bulletType](this.idCount, turret.id);
        this.idCount++;

        newBullet.setDirectiron(turret.angle);

        newBullet.centerX = turret.centerX;
        newBullet.centerY = turret.centerY;

        this.bullets[newBullet.id] = newBullet;
    }
    addRocket(turret, isLeft = true){
        let newBullet = new bulletTypes[turret.bulletType](this.idCount, turret.id);
        this.idCount++;

        newBullet.setDirectiron(turret.angle);

        newBullet.updateAngle(turret.angle, turret.centerX, turret.centerY, isLeft);

        this.bullets[newBullet.id] = newBullet;

        return newBullet.id;
    }
    removeBullet(bulletId){
        delete this.bullets[bulletId];
    }
    fixPosisionsOnResize(oldSize, newSize){
        for(let i in this.bullets){
            this.bullets[i].centerX = this.bullets[i].centerX/oldSize * newSize;
            this.bullets[i].centerY = this.bullets[i].centerY/oldSize * newSize;
        }
        
        for(let i in this.enemies){
            this.enemies[i].centerX = this.enemies[i].centerX/oldSize * newSize;
            this.enemies[i].centerY = this.enemies[i].centerY/oldSize * newSize;
        }
    }
}