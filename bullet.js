class Bullet{
    constructor(id_, parentId_){
        this.id = id_;
        this.centerX = 0;
        this.centerY = 0;
        this.speed = 10;
        this.directionX = 0;
        this.directionY = 0;
        this.angle = 0;
        this.dmg;
        this.target = null;
        this.imageIndex = 0;
        this.parentId = parentId_;
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
            this.angle = Math.atan2(this.target.centerY - this.centerY, this.target.centerX - this.centerX);
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
        drawRotadedImage(this.imageIndex, this.centerX, this.centerY, this.angle + degreesToRadian(90));
    }
}

class Bullet1 extends Bullet{
    constructor(id_, parentId_){
        super(id_, parentId_);
        this.imageIndex = 272;
        this.dmg = 10;
    }
}

class Bullet2 extends Bullet{
    constructor(id_, parentId_){
        super(id_, parentId_);
        this.imageIndex = 273;
        this.dmg = 15;
    }
}

class Bullet3 extends Bullet{
    constructor(id_, parentId_){
        super(id_, parentId_);
        this.imageIndex = 274;
        this.dmg = 20;
    }
}

class Bullet4 extends Bullet{
    constructor(id_, parentId_){
        super(id_, parentId_);
        this.imageIndex = 275;
        this.dmg = 25;
    }
}

class Bullet5 extends Bullet{
    constructor(id_, parentId_){
        super(id_, parentId_);
        this.imageIndex = 295;
        this.dmg = 20;
    }
}

class Bullet6 extends Bullet{
    constructor(id_, parentId_){
        super(id_, parentId_);
        this.imageIndex = 296;
        this.dmg = 25;
    }
}

class Bullet7 extends Bullet{
    constructor(id_, parentId_){
        super(id_, parentId_);
        this.imageIndex = 297;
        this.speed = 10;
        this.dmg = 30;
    }
}

class Bullet8 extends Bullet{
    constructor(id_, parentId_){
        super(id_, parentId_);
        this.imageIndex = 298;
        this.speed = 10;
        this.dmg = 35;
    }
}

class Rocket1 extends Bullet{
    constructor(id_, parentId_){
        super(id_, parentId_);
        this.imageIndex = 251;
        this.speed = 10;
        this.dmg = 100;

        this.isFired = false;
    }
    updateAngle(newAngle, turretX, turretY){
        this.setDirectiron(newAngle);

        //calculate new position
        let newX, newY;

        this.centerX = turretX;
        this.centerY = turretY;
    }
    update(){
        if(!this.isFired) return;

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
            this.angle = Math.atan2(this.target.centerY - this.centerY, this.target.centerX - this.centerX);
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
}

class Rocket2 extends Bullet{
    constructor(id_, parentId_){
        super(id_, parentId_);
        this.imageIndex = 252;
        this.speed = 10;
        this.dmg = 120;

        this.isFired = false;
    }
    updateAngle(newAngle, turretX, turretY){
        this.setDirectiron(newAngle);

        //calculate new position
        let newX, newY;

        // this.centerX = newX;
        // this.centerY = newY;
    }
    update(){
        if(!this.isFired) return;

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
            this.angle = Math.atan2(this.target.centerY - this.centerY, this.target.centerX - this.centerX);
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
}

//initialize bulletTypes variable
let bulletTypes = {
    0: Bullet1,
    1: Bullet2,
    2: Bullet3,
    3: Bullet4,
    4: Bullet5,
    5: Bullet6,
    6: Bullet7,
    7: Bullet8,
    8: Rocket1,
    9: Rocket1,
}