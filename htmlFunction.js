function onEditToolButtonClick(type){
    let tileType = returnOnlyNumbersFromString(type);
    currEditIndex = tileType;
}

function addEditToolButton(indexX, indexY){
    let elementCopy = document.getElementById("mapEditButtonOptionToCopy").cloneNode(true);
    elementCopy.id = "mapEditButtonOption" + indexToId(indexX, indexY);
    elementCopy.style.display = "inline";

    elementCopy.style.backgroundPosition = ""+(-indexX*32 + "px ") + (-indexY*32 + "px");

    document.getElementById("mapEditToolHolder").appendChild(elementCopy);
}

function switchMenus(menuId, newDisplay){
    document.getElementById("mainMenu").style.display = "none"; //default flex
    document.getElementById("levelChoose").style.display = "none"; //default flex
    document.getElementById("gameMenu").style.display = "none";
        document.getElementById("pauseMenuHolder").style.display="none";
        document.getElementById("pauseMenuSettings").style.display="none";

    document.getElementById(menuId).style.display = newDisplay;
}

function onChooseLevelClick(){
    switchMenus('levelChoose', 'flex');

    //play sound
}

let levelButtonsInfo = {
    1: {
        level: 1,
        map: 1,
        buttonStyle: "grassDirt"
    },
    2: {
        level: 2,
        map: 2,
        buttonStyle: "dirtStone"
    },
    3: {
        level: 3,
        map: 3,
        buttonStyle: "grassSand"
    },
    4: {
        level: 4,
        map: 4,
        buttonStyle: "dirtGrass"
    },
    5: {
        level: 5,
        map: 5,
        buttonStyle: "sandGrass"
    },
}

let classNamePairs = {
    "grassDirt": "sandStone",
    "sandDirt": "grassStone",
    "stoneDirt": "grassSand",
    "dirtGrass": "stoneSand",
    "sandGrass": "dirtStone",
    "stoneGrass": "sandDirt",
    "grassSand": "stoneDirt",
    "dirtSand": "stoneGrass",
    "stoneSand": "dirtGrass",
    "grassStone": "dirtSand",
    "dirtStone": "sandGrass",
    "sandStone": "grassDirt",
}

function removeAndSetClassOnElement(theElement, elementId, classNameToAdd){
    if(theElement == null) theElement = document.getElementById(elementId);

    // console.log(theElement, "---", elementId, "---", classNameToAdd);

    theElement.classList.remove("grassDirt");
    theElement.classList.remove("sandDirt");
    theElement.classList.remove("stoneDirt");
    theElement.classList.remove("dirtGrass");
    theElement.classList.remove("sandGrass");
    theElement.classList.remove("stoneGrass");
    theElement.classList.remove("grassSand");
    theElement.classList.remove("dirtSand");
    theElement.classList.remove("stoneSand");
    theElement.classList.remove("grassStone");
    theElement.classList.remove("dirtStone");
    theElement.classList.remove("sandStone");

    theElement.classList.add(classNameToAdd);
}

function setClassStyleOnMapLoad(className){
    let secondaryClassName = classNamePairs[className];

    removeAndSetClassOnElement(null, "canvas-id", className);

    removeAndSetClassOnElement(null, "pauseMenu", className);

    let pauseMenuButtons = document.getElementById("pauseMenuButtonHolder").querySelectorAll("button");
    for(let index in pauseMenuButtons){
        let theButton = pauseMenuButtons[index];

        if(isElement(theButton)) removeAndSetClassOnElement(theButton, "", secondaryClassName);
    }

    let pauseMenuSettingsButtons = document.getElementById("pauseMenuSettings").querySelectorAll("button");
    for(let index in pauseMenuSettingsButtons){
        let theButton = pauseMenuSettingsButtons[index];

        if(isElement(theButton)) removeAndSetClassOnElement(theButton, "", secondaryClassName);
    }
}

function levelChooseAddButton(level){
    let clonedDiv = document.getElementById("levelChoose").querySelector("#buttonToClone").cloneNode(true);

    clonedDiv.style.display = "inline-block";

    clonedDiv.classList.remove("sandStone");

    clonedDiv.id = "levelChooseButton_" + level;
    clonedDiv.querySelector("p").innerText = level;
    
    let levelInfo = levelButtonsInfo[level];

    if(levelInfo != undefined){
        clonedDiv.classList.add(levelInfo.buttonStyle);
    }else{
        clonedDiv.classList.add("grassDirt");
    }

    document.getElementById("levelChoose").querySelector("#buttonHolder").appendChild(clonedDiv);
}

function addAllLevelButtons(){
    for(let key in levelButtonsInfo){
        levelChooseAddButton(key);
    }
}

function onLevelButtonClick(level){
    level = returnOnlyNumbersFromString(level)-1;
    
    let aMap = new Map(gridSizeX, gridSizeY);
    if(levelButtonsInfo[level] != undefined && levelButtonsInfo[level].map != undefined){
        setMap(aMap, levelButtonsInfo[level].map);
    }else{
        setMap(aMap, 0);
    }

    setClassStyleOnMapLoad(levelButtonsInfo[level+1].buttonStyle);

    switchMenus("gameMenu", "flex");
}

function onGameToolButtonClick(type){
    let turretType = returnOnlyNumbersFromString(type);
    currTurrType = turretType;
}

function addGameToolButton(type, imageIndex, price){
    let elementCopy = document.getElementById("gameButtonOptionToCopy").cloneNode(true);
    elementCopy.id = "gameButtonOption_" + type;
    elementCopy.style.display = "inline";

    index = idToIndex(imageIndex);

    elementCopy.querySelector(".gameButtonImage").style.backgroundPosition = ""+(-index.x*32 + "px ") + (-index.y*32 + "px");

    elementCopy.querySelector(".gameButtonPriceDisplayer").innerHTML = price + "C";

    document.getElementById("gameToolHolder").appendChild(elementCopy);
}

function updateHealthStat(hp){
    document.getElementById("healthStat").innerHTML = hp + "HP";
}

function updateCoinStat(coins){
    document.getElementById("coinStat").innerHTML = coins + "C";
}

function showPauseMenu(){
    document.getElementById("pauseMenuHolder").style.display="inline-block";
    gameStoped = true;
    hidePauseMenuSettings();
    if(map != undefined && map.tankMoveAudio != undefined) map.tankMoveAudio.pause();
}

function hidePauseMenu(){
    document.getElementById("pauseMenuHolder").style.display="none";
    gameStoped = false;
    if(map.tankMoveAudio != undefined) map.tankMoveAudio.play();
}

function showPauseMenuSettings(){
    document.getElementById("pauseMenuButtonHolder").style.display="none";
    document.getElementById("pauseMenuSettings").style.display="inline-block";
}

function hidePauseMenuSettings(){
    document.getElementById("pauseMenuButtonHolder").style.display="inline-block";
    document.getElementById("pauseMenuSettings").style.display="none";
}

function onVolumeChange(groupName, newVolume){
    audioVolume[groupName] = newVolume/100;
    if(groupName = "sfx" && map.tankMoveAudio != undefined){
        map.tankMoveAudio.volume = map.numberOfTanks/10 * audioVolume["sfx"];
    }
    //save in local storage

    // setAudioGroupVolume(groupName, newVolume/100);
}

function fromGameToMainMenu(){
    map = null;
    gameStoped = false;
    gameStarted = false;
    time = 0;
    currEnemy = null;
    currTurrType = 0;
    switchMenus("levelChoose", "flex");
}