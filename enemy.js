let enemyTypes = {
    0: {
        maxHealth: 20,
        health: 20,
        dmg: 5,
        imageIndex: 235,
        secondImageIndex: null,
        timeToSpawn: 20,
        speed: 1.5,
        secondImaeOffsetX: 0,
        secondImaeOffsetY: 0,
    },
    1: {
        maxHealth: 30,
        health: 30,
        dmg: 10,
        imageIndex: 236,
        secondImageIndex: null,
        timeToSpawn: 20,
        speed: 1.5,
        secondImaeOffsetX: 0,
        secondImaeOffsetY: 0,
    },
    2: {
        maxHealth: 40,
        health: 40,
        dmg: 15,
        imageIndex: 237,
        secondImageIndex: null,
        timeToSpawn: 20,
        speed: 1.7,
        secondImaeOffsetX: 0,
        secondImaeOffsetY: 0,
    },
    3: {
        maxHealth: 50,
        health: 50,
        dmg: 20,
        imageIndex: 238,
        secondImageIndex: null,
        timeToSpawn: 20,
        speed: 1.7,
        secondImaeOffsetX: 0,
        secondImaeOffsetY: 0,
    },
    4: {
        maxHealth: 500,
        health: 500,
        dmg: 50,
        imageIndex: 257,
        secondImageIndex: 279,
        timeToSpawn: 50,
        speed: 1.2,
        secondImaeOffsetX: 0,
        secondImaeOffsetY: 0,
    },
    5: {
        maxHealth: 600,
        health: 600,
        dmg: 60,
        imageIndex: 258,
        secondImageIndex: 280,
        timeToSpawn: 50,
        speed: 1.3,
        secondImaeOffsetX: 0,
        secondImaeOffsetY: 0,
    }
}

class Enemy{
    constructor(id_, path_){
        this.id = id_
        this.centerX;
        this.centerY;
        this.angle=0;
        this.angleOffset=0;
        this.speed=1.2;
        this.path = path_;
        this.directionX;
        this.directionY;
        this.maxHealth = 100;
        this.health = 100;
        this.dmg = 100;
        this.imageIndex = 257;
        this.secondImageIndex = 279;
        this.secondImaeOffsetX = 0;
        this.secondImaeOffsetY = 0;
        this.timeToSpawn = 50;
        this.isDead = false;
    }
    setByType(type){
        this.type = type;
        type = enemyTypes[type]
        for(let key in type){
            this[key] = type[key];
        }
    }
    drawSelf(){
        drawRotadedImage(this.imageIndex, this.centerX, this.centerY, this.angle);
        if(this.secondImageIndex != null) drawRotadedImage(this.secondImageIndex, this.centerX+this.secondImaeOffsetX, this.centerY+this.secondImaeOffsetY, this.angle);
    
        //draw healthbar
        updatableContext.globalAlpha = 0.5;

        updatableContext.fillStyle = "green";
        updatableContext.strokeStyle = "black";

        updatableContext.fillRect(this.centerX - 20/2, this.centerY - 15, this.health*20/this.maxHealth, 5);
        updatableContext.strokeRect(this.centerX - 20/2, this.centerY - 15, 20, 5);

        updatableContext.globalAlpha = 1;
    }
    draw(){
        // let redrawIndexX=[];
        // let redrawIndexY=[];

        // let topRightX=Math.floor(this.centerX+tileSize/2-1);
        // let topRightY=Math.floor(this.centerY-tileSize/2+1);
        // let bottomRightX=Math.floor(this.centerX+tileSize/2-1);
        // let bottomRightY=Math.floor(this.centerY+tileSize/2-1);
        // let topLeftX=Math.floor(this.centerX-tileSize/2+1);
        // let topLeftY=Math.floor(this.centerY-tileSize/2+1);
        // let bottomLeftX=Math.floor(this.centerX-tileSize/2+1);
        // let bottomLeftY=Math.floor(this.centerY+tileSize/2-1);

        // redrawIndexX.push(Math.floor(topRightX/tileSize));
        // redrawIndexX.push(Math.floor(bottomRightX/tileSize));
        // redrawIndexX.push(Math.floor(topLeftX/tileSize));
        // redrawIndexX.push(Math.floor(bottomLeftX/tileSize));
        
        // redrawIndexY.push(Math.floor(topRightY/tileSize));
        // redrawIndexY.push(Math.floor(bottomRightY/tileSize));
        // redrawIndexY.push(Math.floor(topLeftY/tileSize));
        // redrawIndexY.push(Math.floor(bottomLeftY/tileSize));
        
        // for(let i = 0; i < redrawIndexX.lenght; i++){
        //     let indexX = redrawIndexX[i];
        //     let indexY = redrawIndexY[i];

        //     tileFunctions.redraw(map.tiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
        //     tileFunctions.draw(map.overlapTiles[indexX][indexY].type, indexX, indexY, map.offsetX, map.offsetY);
        // }

        this.drawSelf();

        // drawCircle(topRightX, topRightY, 2, "black");
        // drawCircle(bottomRightX, bottomRightY, 2, "black");
        // drawCircle(topLeftX, topLeftY, 2, "black");
        // drawCircle(bottomLeftX, bottomLeftY, 2, "black");
        
        // drawCircle(this.centerX, this.centerY, 2, "black");
    }
    calculateDirection(){
        if(this.path != null){
            let nextPointX = this.path.indexX*tileSize+tileSize/2;
            let nextPointY = this.path.indexY*tileSize+tileSize/2;
            let normalizedDirection = normalizeVector(nextPointX-this.centerX, nextPointY-this.centerY);
            this.angleOffset = getAngleBetweenVectors(this.directionX, this.directionY, normalizedDirection.x, normalizedDirection.y);
            // if(this.angleOffset > degreesToRadian(180)){
            //     this.angleOffset = this.angleOffset - degreesToRadian(360);
            // }
            // if(this.angleOffset < -degreesToRadian(180)){
            //     this.angleOffset = degreesToRadian(180) + this.angleOffset;
            // }
            this.directionX = normalizedDirection.x;
            this.directionY = normalizedDirection.y;
        }
    }
    move(){
        this.centerX += this.directionX * this.speed;
        this.centerY += this.directionY * this.speed;

        if(this.angleOffset != undefined && this.angleOffset != 0){
            this.angle += this.angleOffset/1.5;
            this.angleOffset -= this.angleOffset/1.5;

            if(this.angleOffset <= 0.2){
                this.angle += this.angleOffset;
                this.angleOffset=0;
            }
        }

        if(this.path != null){
            if(getDistance(this.centerX, this.centerY, this.path.indexX*tileSize+tileSize/2, this.path.indexY*tileSize+tileSize/2) <= this.speed){
                this.centerX = this.path.indexX*tileSize+tileSize/2;
                this.centerY = this.path.indexY*tileSize+tileSize/2;

                this.path = this.path.next;
                if(this.path == null){
                    setTimeout(map.removeEnemy(this.id, true), 0);
                }

                this.calculateDirection();
            }
        }
    }
    spawn(){
        if(this.path != undefined){
            this.centerX = this.path.indexX*tileSize+tileSize/2;
            this.centerY = this.path.indexY*tileSize+tileSize/2;
            this.path = this.path.next;
            this.calculateDirection();
            this.draw();
        }
    }
    despawn(){
        //asdf
    }
}