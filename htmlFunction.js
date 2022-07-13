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
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("levelChoose").style.display = "none";
    document.getElementById("gameMenu").style.display = "none";

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
        map: 1,
        buttonStyle: "sandDirt"
    },
    3: {
        level: 3,
        map: 3,
        buttonStyle: "stoneDirt"
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
    level = returnOnlyNumbersFromString(level);
    
    let aMap = new Map(gridSizeX, gridSizeY);
    if(levelButtonsInfo[level] != undefined && levelButtonsInfo[level].map != undefined){
        setMap(aMap, levelButtonsInfo[level].map);
    }else{
        setMap(aMap, 0);
    }

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

function switchMenus(menuId, newDisplay){
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("levelChoose").style.display = "none";
    document.getElementById("gameMenu").style.display = "none";

    document.getElementById(menuId).style.display = newDisplay;
}

function updateHealthStat(hp){
    document.getElementById("healthStat").innerHTML = hp + "HP";
}

function updateCoinStat(coins){
    document.getElementById("coinStat").innerHTML = coins + "C";
}