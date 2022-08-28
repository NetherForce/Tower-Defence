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
        this.enemiesToSpawn = [[-1, 5], [0, 10], [5, 5]]; //keeps track of the enemy types it needs to spawn and the number of them
        this.turrets = {};
        this.bullets = {};
        this.idCount = 0;
        this.globalHealth = 100;

        this.coins = 1000;

        this.pathTileIndex = 93;

        this.numberOfTanks = 0; //keeps track on the number of tanks on the map
        //is used to regulate the volume of tank movement sound
        this.tankMoveAudio;

        this.startingEnemyAngle;

        this.endlessMode = false;
        this.endlessModeProgression = 0;

        this.currLevel;
    }
    fillWithDefaultTiles(defaultTileID){
        this.tiles = [];
        this.overlapTiles = [];
        for(let i = 0; i < this.sizeX; i++){
            this.tiles[i] = [];
            this.overlapTiles[i] = [];
            for(let j = 0; j < this.sizeY; j++){
                this.tiles[i][j] = {
                    "type": defaultTileID,
                    "indexX": i,
                    "indexY": j,
                    "canBeBuildOn": true,
                };
                this.overlapTiles[i][j] = {
                    "type": -1,
                    "indexX": i,
                    "indexY": j,
                    "canBeBuildOn": true,
                };
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
                if(this.overlapTiles[i][j].type != -1) tileFunctions.draw(this.overlapTiles[i][j].type, i, j, this.offsetX, this.offsetY);
            }
        }
        // if(isInEditiongMode) this.drawCanvasOutline();
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

        //calculate starting enemy angle
        let pX1 = this.path.indexX;// * tileSize;
        let pY1 = this.path.indexY;// * tileSize;
        let pX2 = this.path.next.indexX;// * tileSize;
        let pY2 = this.path.next.indexY;// * tileSize;
        this.startingEnemyAngle = Math.atan2(pY2 - pY1, pX2 - pX1);
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
        this.enemies[this.idCount-1].angle = this.startingEnemyAngle;
        if((this.enemies[this.idCount-1].type == 4 || this.enemies[this.idCount-1].type == 5) && this.numberOfTanks < 10){
            this.numberOfTanks++;
            this.tankMoveAudio.volume = map.numberOfTanks/10 * audioVolume["sfx"];
        }
    }
    removeEnemy(enemyId, reachedEnd){
        this.enemies[enemyId].isDead = true;
        if(reachedEnd){
            this.globalHealth -= this.enemies[enemyId].dmg;
            updateHealthStat(this.globalHealth);
        }else{
            this.coins += enemyTypes[this.enemies[enemyId].type].rewardedCoins;
            updateCoinStat(this.coins);
        }
        if((this.enemies[enemyId].type == 4 || this.enemies[enemyId].type == 5) && this.numberOfTanks > 0){
            this.numberOfTanks--;
            this.tankMoveAudio.volume = map.numberOfTanks/10 * audioVolume["sfx"];
        }
        delete this.enemies[enemyId];

        if(this.globalHealth <= 0){
            console.log("GAME LOST!!!");
            showGameEndMenu(false);
        }
        if(isObjectEmpty(this.enemies) && this.enemiesToSpawn.length == 0){
            console.log("GAME WON!!!");
            showGameEndMenu(true);
        }
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
    addEnemiesForEndlessMode(){
        let enemyType = this.endlessModeProgression%6;
        let enemyNumber;

        if(enemyType != 4 && enemyType != 5){
            enemyNumber = (this.endlessModeProgression+1) * 5;
        }else{
            enemyNumber = Math.floor(this.endlessModeProgression/5 + 1) * 5;
        }

        this.enemiesToSpawn.push([-1, 5]);
        this.enemiesToSpawn.push([enemyType, enemyNumber]);
        this.endlessModeProgression++;
    }
}