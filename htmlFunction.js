function onEditToolButtonClick(type){
    let tileType = parseInt(type);
    currEditIndex = tileType;
}

function addEditToolButton(indexX, indexY){
    let elementCopy = document.getElementById("buttonOptionToCopy").cloneNode(true);
    elementCopy.id = indexToId(indexX, indexY);
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
    
    let aMap = new Map(20, 20);
    if(levelButtonsInfo[level] != undefined && levelButtonsInfo[level].map != undefined){
        setMap(aMap, levelButtonsInfo[level].map);
    }else{
        setMap(aMap, 0);
    }

    switchMenus("gameMenu", "flex");
}