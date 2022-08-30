function onEditToolButtonClick(type){
    let tileType = returnOnlyNumbersFromString(type);
    console.log("New Tile Type: " + tileType);
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
        document.getElementById("gameEndMenu").style.display="none";

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
    6: {
        level: 6,
        map: 6,
        buttonStyle: "dirtSand"
    },
    7: {
        level: 7,
        map: 7,
        buttonStyle: "grassStone"
    },
    8: {
        level: 8,
        map: 8,
        buttonStyle: "sandDirt"
    },
    9: {
        level: 9,
        map: 9,
        buttonStyle: "stoneSand"
    },
    10: {
        level: 10,
        map: 10,
        buttonStyle: "sandStone"
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
    
    removeAndSetClassOnElement(null, "gameEndMenuButtonHolders", className);

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

    let endGameMenu = document.getElementById("gameEndMenu").querySelectorAll("button");
    for(let index in endGameMenu){
        let theButton = endGameMenu[index];

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

    document.getElementById("levelChoose").querySelector("#levelChooseButonHolder").appendChild(clonedDiv);
}

function levelChooseLockButton(level, isLocked){
    //lock or unlock button
    try{
        let elementId = "levelChooseButton_" + level;
        let theElement = document.getElementById("levelChoose").querySelector("#levelChooseButonHolder").querySelector("#" + elementId);
        if(isLocked){
            theElement.querySelector(".lockedImage").style.display = "flex";
            theElement.querySelector(".buttonPointer").style.display = "none";
            theElement.disabled = true;
        }else{
            theElement.querySelector(".lockedImage").style.display = "none";
            theElement.querySelector(".buttonPointer").style.display = "block";
            theElement.disabled = false;
        }
    }catch(error){
        console.error("levelChooseLockButton function", error);
    }
}

function levelChooseLockAllButtons(levelReached){
    //lock or unlock untill a certain button
    let theButtons = document.getElementById("levelChoose").querySelector("#levelChooseButonHolder").querySelectorAll("button");
    for(let key in theButtons){
        let aButton = theButtons[key];
        if(aButton.id == undefined) continue;
        let buttonLevel = returnOnlyNumbersFromString(aButton.id);

        levelChooseLockButton(buttonLevel, (buttonLevel>levelReached));
    }
}

function addAllLevelButtons(){
    for(let key in levelButtonsInfo){
        levelChooseAddButton(key);
    }
    levelChooseLockAllButtons(reachedLevel);
}

function onLevelButtonClick(level){
    level = returnOnlyNumbersFromString(level);
    
    console.log(gridSizeX, gridSizeY);
    let aMap = new Map(gridSizeX, gridSizeY);
    if(levelButtonsInfo[level] != undefined && levelButtonsInfo[level].map != undefined){
        setMap(aMap, levelButtonsInfo[level].map);
    }else{
        setMap(aMap, 0);
    }
    map.currLevel = level;

    setClassStyleOnMapLoad(levelButtonsInfo[level].buttonStyle);

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
    if(groupName == "sfx"){
        if(map.tankMoveAudio != undefined) map.tankMoveAudio.volume = map.numberOfTanks/10 * audioVolume["sfx"];
        setSLSFXVolume(audioVolume['sfx']);
    }else{
        setLSMusicVolume(audioVolume['music']);
    }

    // setAudioGroupVolume(groupName, newVolume/100);
}

function setAudioVolumeSliderValue(musicVolume, sfxVolume){
    document.getElementById("musicVolumeSlider").querySelector("input").value = musicVolume*100;
    document.getElementById("sfxVolumeSlider").querySelector("input").value = sfxVolume*100;
}
setAudioVolumeSliderValue(audioVolume['music'], audioVolume['sfx']);

function fromGameToMainMenu(){
    setDefaultGameSettings();
    switchMenus("levelChoose", "flex");
}

function startEndlessMode(){
    let aMap = new Map(gridSizeX, gridSizeY);
    setMap(aMap, 1);
    map.endlessMode = true;
    map.currLevel = -1;
    map.enemiesToSpawn = [];
    map.addEnemiesForEndlessMode();

    setClassStyleOnMapLoad(levelButtonsInfo[1].buttonStyle);

    switchMenus("gameMenu", "flex");
}

function showGameEndMenu(isGameWon){
    let gameEndMenuElement = document.getElementById("gameMenu").querySelector("#gameEndMenu");
    gameEndMenuElement.style.display = "flex";
    gameEndMenuElement.style.opacity = 0;

    let increaseOpacityFunction = () => {
        let timeToCall = 100;

        gameEndMenuElement.style.opacity = JSON.parse(gameEndMenuElement.style.opacity) + 0.1;

        if (gameEndMenuElement.style.opacity >= 1) {
            //loading done
        } else {
            setTimeout(increaseOpacityFunction, timeToCall);
        }
    };

    if(isGameWon){
        //do stuff when game is won
        gameEndMenuElement.querySelector("#gameEndMenuEndText").innerText = "Game Won!";

        //do other game won stuff (unlock next level and stuff)
    }else{
        //do stuff when game is lost
        gameEndMenuElement.querySelector("#gameEndMenuEndText").innerText = "Game Lost!";
    }

    increaseOpacityFunction();
}

function restartLevel(){
    console.log(map.currLevel);
    if(map.currLevel != -1){
        onLevelButtonClick("asdf" + (map.currLevel));
    }else{
        setDefaultGameSettings();
        startEndlessMode();
    }
}