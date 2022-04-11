endelessCanvas = true;
let map;
let isInEditiongMode = false;
let currEditIndex = 119;
let time = 0;
let currEnemy;
let currTurrType = 0;
let gameStoped = false;

window.addEventListener("load", function() {
    let aMap = new Map(20, 20);
    setMap(aMap);
});

function setMap(aMap){
    map = aMap;
    for(let key in maps[0]){
        map[key] = maps[0][key];
    }
    map.drawBackgroundTiles();
    map.calculatePath();
}

function update() {
    if(gameStoped) return;
    time++;
    if(map){
        updatableContext.clearRect(0, 0, updatableCanvas.width, updatableCanvas.height);
        for(let i in map.enemies){
            let theEnemy = map.enemies[i];
            theEnemy.move();
        }

        for(let i in map.turrets){
            let theTurret = map.turrets[i];
            theTurret.update(time);
        }
        for(let i in map.bullets){
            let theBullet = map.bullets[i];
            theBullet.update();
        }

        if(!currEnemy){
            if(map.enemiesToSpawn[0] != undefined){
                currEnemy = new Enemy(map.enemies.length, map.path);
                currEnemy.setByType(map.enemiesToSpawn[0][0]);
                map.enemiesToSpawn[0][1]--;
                if(map.enemiesToSpawn[0][1] <= 0){
                    map.enemiesToSpawn.splice(0);
                }
            }
        }else{
            if(time%currEnemy.timeToSpawn == 0){
                currEnemy.spawn();
                map.enemies.push(currEnemy);
                currEnemy = undefined;
                if(map.enemiesToSpawn[0] != undefined){
                    currEnemy = new Enemy(map.enemies.length, map.path);
                    currEnemy.setByType(map.enemiesToSpawn[0][0]);
                    map.enemiesToSpawn[0][1]--;
                    if(map.enemiesToSpawn[0][1] <= 0){
                        map.enemiesToSpawn.splice(0, 1);
                    }
                }
            }
        }
    }
}

function draw() {
    if(map){
        for(let i in map.enemies){
            let theEnemy = map.enemies[i];
            theEnemy.drawSelf();
        }
        
        for(let i in map.turrets){
            let theTurret = map.turrets[i];
            theTurret.drawSelf();
        }
        
        for(let i in map.bullets){
            let theBullet = map.bullets[i];
            theBullet.drawSelf();
        }

        if(currTurrType != undefined){
            let indexX = Math.floor(mouseX/tileSize);
            let indexY = Math.floor(mouseY/tileSize);
            if(indexX < map.sizeX && indexY < map.sizeY){
                updatableContext.globalAlpha = 0.5;
                if(map.overlapTiles[indexX][indexY].type == -1 && tilesYouCanBuildOn[map.tiles[indexX][indexY].type]){
                    updatableContext.fillStyle = "lightgray";
                }else{
                    updatableContext.fillStyle = "red";
                }
                updatableContext.beginPath();
                updatableContext.arc(indexX*tileSize+tileSize/2, indexY*tileSize+tileSize/2, turretTypes[currTurrType].reach, 0, 2 * Math.PI, false);
                updatableContext.stroke();
                updatableContext.fillRect(indexX*tileSize, indexY*tileSize, tileSize, tileSize);
                updatableContext.globalAlpha = 1;
                
                drawRotadedImage(turretTypes[currTurrType].imageIndex, indexX*tileSize+tileSize/2, indexY*tileSize+tileSize/2, 0);
            }
        }
    }
};

function keyup(key) {
    
};

function mouseup(info) {
    console.log(info.button);
    let indexX = Math.floor(mouseX/tileSize);
    let indexY = Math.floor(mouseY/tileSize);
    if(isInEditiongMode){
        if(indexX < map.sizeX && indexY < map.sizeY){
            if(info.button == 0){
                console.log(indexX, indexY, currEditIndex);
                map.tiles[indexX][indexY].type = currEditIndex;
                tileFunctions.redraw(map.tiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
                if(map.overlapTiles[indexX][indexY].type != -1) tileFunctions.draw(map.overlapTiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
            }else if(info.button == 2){
                if(map.overlapTiles[indexX][indexY].type != currEditIndex){
                    map.overlapTiles[indexX][indexY].type = currEditIndex;
                    map.overlapTiles[indexX][indexY].canBeBuildOn = false;
                    tileFunctions.redraw(map.tiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
                    tileFunctions.draw(map.overlapTiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
                }else{
                    map.overlapTiles[indexX][indexY].type = -1;
                    tileFunctions.redraw(map.tiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
                }
            }else if(info.button == 4){
                map.startIndexX = indexX;
                map.startIndexY = indexY;

                context.globalAlpha = 0.5;
                context.fillStyle = "lime";
                context.fillRect(indexX*tileSize, indexY*tileSize, tileSize, tileSize);
                context.globalAlpha = 1;
            }else if(info.button == 3){
                map.endIndexX = indexX;
                map.endIndexY = indexY;

                context.globalAlpha = 0.5;
                context.fillStyle = "red";
                context.fillRect(indexX*tileSize, indexY*tileSize, tileSize, tileSize);
                context.globalAlpha = 1;
            }
        }
    }else{
        console.log(indexX, indexY, indexY*sheetLenghtX+indexX);
        map.placeTurret(indexX, indexY, currTurrType);
    }
};
