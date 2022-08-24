function cssPixelToRealPixel(value){
    let scale = window.devicePixelRatio;
    return value*scale;
}

function checkIfArrayHasValue(array, value){
    for(let key in array){
        if(array[key] == value) return true;
    }

    return false;
}

function drawCircle(x, y, r, color){
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.fill();
}

function normalizeVector(vecX, vecY){
    let vecLength = Math.sqrt(vecX*vecX + vecY*vecY);

    return {
        x: vecX/vecLength,
        y: vecY/vecLength
    }
}

function getDistance(x1, y1, x2, y2){
    let a = x1 - x2;
    let b = y1 - y2;
    
    return Math.sqrt( a*a + b*b );
}

function getAngleBetweenVectors(vec1X, vec1Y, vec2X, vec2Y){
    let firstAngle = Math.atan2(vec1Y, vec1X);
    let secondAngle = Math.atan2(vec2Y, vec2X);

    if(isNaN(secondAngle - firstAngle)) return 0;

    return secondAngle - firstAngle;
}

function degreesToRadian(degrees){
    return degrees * (Math.PI/180);
}

function radianToDegrees(rad){
    return rad * (180/Math.PI);
}

function vectorFromAngle(angle){
    return normalizeVector(Math.cos(angle), Math.sin(angle));
}

function returnOnlyNumbersFromString(string){
    let res = string.replace(/\D/g, "");
    return JSON.parse(res);
}

function getNameOfDocumentFromSource(src){
    return src.match(/[^\/]+(?=\.[^\/.]*$)/, "")[0];
}

function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;  
}