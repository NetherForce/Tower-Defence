let bulletTypes = {
    0: {
        imageIndex: 261,
        speed: 10,
        dmg: 10
    },
    1: {
        imageIndex: 262,
        speed: 30,
        dmg: 10
    },
    2: {
        imageIndex: 263,
        speed: 30,
        dmg: 10
    },
    3: {
        imageIndex: 264,
        speed: 30,
        dmg: 10
    },
    4: {
        imageIndex: 283,
        speed: 30,
        dmg: 10
    },
    5: {
        imageIndex: 284,
        speed: 30,
        dmg: 10
    },
    6: {
        imageIndex: 285,
        speed: 30,
        dmg: 10
    },
    7: {
        imageIndex: 286,
        speed: 30,
        dmg: 10
    },
    8: {
        imageIndex: 241,
        speed: 30,
        dmg: 10
    },
    9: {
        imageIndex: 242,
        speed: 30,
        dmg: 10
    }
}

class Bullet{
    constructor(id_, parentId_){
        this.id = id_;
        this.centerX;
        this.centerY;
        this.speed;
        this.directionX;
        this.directionY;
        this.angle;
        this.dmg;
        this.target = null;
        this.imageIndex = 0;
        this.parentId = parentId_;
    }
    setByType(type){
        this.type = type;
        type = bulletTypes[type]
        for(let key in type){
            this[key] = type[key];
        }
    }
    setDirectiron(angle){
        this.angle = angle;
        let dir = vectorFromAngle(angle);
        this.directionX = dir.x;
        this.directionY = dir.y;
    }
    update(){
        this.centerX += this.directionX*this.speed;
        this.centerY += this.directionY*this.speed;
    
        if(!areColliding(this.centerX-tileSize/2, this.centerY-tileSize/2, tileSize, tileSize, 0, 0, map.sizeX*tileSize, map.sizeY*tileSize)){
            map.removeBullet(this.id);
            return;
        }

        if(this.target != null){
            let direction = normalizeVector(this.target.centerX-this.centerX, this.target.centerY-this.centerY);
            this.directionX = direction.x;
            this.directionY = direction.y;
            this.angle = degreesToRadian(90) + Math.atan2(this.target.centerY - this.centerY, this.target.centerX - this.centerX);
        }else{
            for(let i in map.enemies){
                let enemy = map.enemies[i];
                if(getDistance(this.centerX, this.centerY, enemy.centerX, enemy.centerY) < tileSize/2){
                    enemy.health -= this.dmg;
                    map.removeBullet(this.id);
                    if(enemy.health <= 0){
                        enemy.isDead = true;
                        map.removeEnemy(enemy.id, false);
                        return;
                    }
                }
            }
        }
    }
    drawSelf(){
        drawRotadedImage(this.imageIndex, this.centerX, this.centerY, this.angle);
    }
}