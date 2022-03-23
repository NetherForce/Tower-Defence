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