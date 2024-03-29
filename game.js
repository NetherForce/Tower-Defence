endelessCanvas = true;
let map;
let isInEditiongMode = false;
let currEditIndex = 130;
let time = 0;
let currEnemy;
let currTurrType = 0;
let gameStoped = false;
let gameStarted = false;
let gameEnded = false;

function setDefaultGameSettings(){
    map = null;
    gameStoped = false;
    gameStarted = false;
    gameEnded = false;
    time = 0;
    currEnemy = null;
    currTurrType = 0;
}

window.addEventListener("load", function() {
    addAllLevelButtons();

    loadAudio();

    // let aMap = new Map(gridSizeX, gridSizeY);
    // setMap(aMap);
});

function setMap(aMap, mapToCopy){
    map = aMap;
    if(!isInEditiongMode){
        if(maps[mapToCopy] != undefined){
            for(let key in maps[mapToCopy]){
                map[key] = JSON.parse(JSON.stringify(maps[mapToCopy][key]));
            }
        }else{
            for(let key in maps[1]){
                map[key] = JSON.parse(JSON.stringify(maps[1][key]));
            }
        }
        map.pathTileIndex = map.tiles[map.startIndexX][map.startIndexY].type;
    }else{
        map.fillWithDefaultTiles(124);
        switchMenus("gameMenu", "flex");
    }
    map.drawBackgroundTiles();
    map.calculatePath();

    updateHealthStat(map.globalHealth);
    updateCoinStat(map.coins);

    map.tankMoveAudio = audioElement["Small_Tracks_Rattle_Slow"];
    map.tankMoveAudio.loop = true;
    map.tankMoveAudio.volume = map.numberOfTanks/10 * audioVolume["sfx"];
    map.tankMoveAudio.play();

    gameStarted = true;

    // for(let i=0; i < map.sizeX; i++){
    //     for(let j = 0; j < map.sizeY; j++){
    //         map.placeTurret(i, j, currTurrType);
    //     }
    // }
}

function update() {
    if(gameStoped || !gameStarted || isInEditiongMode) return;
    time++;
    if(map){
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
                if(map.enemiesToSpawn[0][0] != -1){
                    console.log(JSON.stringify(map.enemiesToSpawn[0]));
                    currEnemy = new Enemy(map.enemies.length, map.path);
                    currEnemy.setByType(map.enemiesToSpawn[0][0]);
                    map.enemiesToSpawn[0][1]--;
                    if(map.enemiesToSpawn[0][1] <= 0){
                        map.enemiesToSpawn.splice(0, 1);
                    }
                }else if(time%50 == 0){
                    map.enemiesToSpawn[0][1]--;
                    if(map.enemiesToSpawn[0][1] <= 0){
                        map.enemiesToSpawn.splice(0, 1);
                    }
                }
            }else{
                if(map.endlessMode){
                    map.addEnemiesForEndlessMode();
                }
            }
        }else{
            if(time%currEnemy.timeToSpawn == 0){
                map.addEnemy(-1, currEnemy);
                currEnemy = undefined;
                // if(map.enemiesToSpawn[0] != undefined){
                //     currEnemy = new Enemy(map.enemies.length, map.path);
                //     currEnemy.setByType(map.enemiesToSpawn[0][0]);
                //     map.enemiesToSpawn[0][1]--;
                //     if(map.enemiesToSpawn[0][1] <= 0){
                //         map.enemiesToSpawn.splice(0, 1);
                //     }
                // }
            }
        }
    }
}

function draw() {
    if(!gameStarted) return;
    if(map && !isInEditiongMode){
        updatableContext.clearRect(0, 0, updatableCanvas.width, updatableCanvas.height);
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

        if(currTurrType != undefined && !gameStoped){
            let indexX = Math.floor(mouseX/tileSize);
            let indexY = Math.floor(mouseY/tileSize);
            if(indexX < map.sizeX && indexY < map.sizeY && indexX >= 0 && indexY >= 0){
                updatableContext.globalAlpha = 0.5;
                if(map.overlapTiles[indexX][indexY].type == -1 && tilesYouCanBuildOn[map.tiles[indexX][indexY].type] && map.coins >= turretDisplayInfo[currTurrType].cost){
                    updatableContext.fillStyle = "lightgray";
                }else{
                    updatableContext.fillStyle = "red";
                }
                updatableContext.beginPath();
                updatableContext.arc(indexX*tileSize+tileSize/2, indexY*tileSize+tileSize/2, turretDisplayInfo[currTurrType].reachIndex * tileSize, 0, 2 * Math.PI, false);
                updatableContext.stroke();
                updatableContext.fillRect(indexX*tileSize, indexY*tileSize, tileSize, tileSize);
                updatableContext.globalAlpha = 1;
                
                drawRotadedImage(turretDisplayInfo[currTurrType].imageIndex, indexX*tileSize+tileSize/2, indexY*tileSize+tileSize/2, degreesToRadian(90));
            }
        }
    }
};

function keyup(key) {
    if(key == 27){
        //close|open pause menu 
        if(document.getElementById("pauseMenuHolder").style.display=="none"){
            showPauseMenu();
        }else{
            hidePauseMenu();
        }
    }
};

function mouseup(info) {
    // console.log(info.button);

    let indexX = Math.floor(mouseX/tileSize);
    let indexY = Math.floor(mouseY/tileSize);

    if(map == undefined || !gameStarted || gameStoped) return;

    // if(indexX < map.sizeX && indexY < map.sizeY) console.log(map.tiles[indexX][indexY], map.overlapTiles[indexX][indexY]);   
    
    
    // //for testing only
    // indexX = Math.floor(mouseX/cellStride);
    // indexY = Math.floor(mouseY/cellStride);
    // console.log(indexX, indexY);
    // console.log("==============================");
    // console.log("old index: " + (indexY*22+indexX));
    // console.log("new index: " + (indexY*23+indexX));
    // console.log("------------------------------");
    // return;

    if(isInEditiongMode){
        console.log(currEditIndex);
        if(indexX < map.sizeX && indexY < map.sizeY && indexX >= 0 && indexY >= 0){
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
        // console.log(indexX, indexY, indexY*sheetLenghtX+indexX);
        // console.log(map.tiles[indexX][indexY].type);
        // console.log(Math.floor(mouseY/cellStride)*sheetLenghtX + Math.floor(mouseX/cellStride));
        map.placeTurret(indexX, indexY, currTurrType);
    }
};
