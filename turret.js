class Turret{
    constructor(id_, indexX, indexY, type_){
        this.id = id_;
        this.centerX = indexX*tileSize+tileSize/2;
        this.centerY = indexY*tileSize+tileSize/2;
        this.angle = 0;
        this.fireRate = 10;
        this.bulletType;
        this.target = null;
        this.possibleTargets;
        this.imageIndex = 249;
        this.reach = 3;
        this.type = type_;
        // console.log(type_);
    }
    drawSelf(){
        drawRotadedImage(this.imageIndex, this.centerX, this.centerY, this.angle + degreesToRadian(90));
        // if(this.secondImageIndex != null) drawRotadedImage(this.secondImageIndex, this.centerX+this.secondImaeOffsetX, this.centerY+this.secondImaeOffsetY, this.angle);
    }
    calculateAngle(){
        if(this.target != null){
            let futureSteps = 2;
            let nextTargetX = this.target.centerX + this.target.directionX * this.target.speed * futureSteps; //calculate for the next two steps
            let nextTargetY = this.target.centerY + this.target.directionY * this.target.speed * futureSteps; //calculate for the next two steps
            this.angle = Math.atan2(nextTargetY - this.centerY, nextTargetX - this.centerX);
        }
    }
    findTarget(){
        this.target = null;
        let minDistance = -1;
        for(let i in map.enemies){
            let enemy = map.enemies[i];
            if(this.possibleTargets[enemy.type]){
                let dist = getDistance(this.centerX, this.centerY, enemy.centerX, enemy.centerY);
                if((this.target == null || dist < minDistance) && dist < this.reach){
                    this.target = enemy;
                    minDistance = dist;
                }
            }
        }
    }
    shoot(){
        if(this.target != null){
            map.addBullet(this);
        }
    }
    update(time){
        if(this.target != null){
            if(this.target.isDead){
                this.findTarget();
                return;
            }
            this.calculateAngle();
            if(time%this.fireRate == 0){
                this.shoot();
            }
            if(getDistance(this.centerX, this.centerY, this.target.centerX, this.target.centerY) > this.reach){
                this.findTarget();
            }
        }else{
            this.findTarget();
        }
    }
}

class GreenTurret extends Turret{
    constructor(id_, indexX, indexY, type_){
        super(id_, indexX, indexY, type_);
        this.imageIndex = 249;
        this.reach = 120;
        this.bulletType = 0;
        this.fireRate = 30;
        this.possibleTargets = {0: true, 1: true, 2: true, 3:true};
    }
}

class RedTurret extends Turret{
    constructor(id_, indexX, indexY, type_){
        super(id_, indexX, indexY, type_);
        this.imageIndex = 250;
        this.reach = 150;
        this.bulletType = 1;
        this.fireRate = 25;
        this.possibleTargets = {0: true, 1: true, 2: true, 3:true};
    }
}

class GreyTurret1 extends Turret{
    constructor(id_, indexX, indexY, type_){
        super(id_, indexX, indexY, type_);
        this.imageIndex = 226;
        this.reach = 150;
        this.bulletType = 4;
        this.fireRate = 30;
        this.possibleTargets = {0: true, 1: true, 2: true, 3:true};
    }
}

class GreyTurret2 extends Turret{
    constructor(id_, indexX, indexY, type_){
        super(id_, indexX, indexY, type_);
        this.imageIndex = 203;
        this.reach = 175;
        this.bulletType = 6;
        this.fireRate = 25;
        this.possibleTargets = {0: true, 1: true, 2: true, 3:true};
    }
}

class RocketTurred extends Turret{
    constructor(id_, indexX, indexY, type_){
        super(id_, indexX, indexY, type_);
        this.imageIndex = 228;
        this.reach = 200;
        this.bulletType = 8;
        this.fireRate = 80;
        this.possibleTargets = {4: true, 5: true};

        this.leftRocketId = null;
        this.rightRocketId = null;

        this.fireNext = 0; //0-fires left rocket, 1 - fires right rocket
        this.reload();
        this.reload();
    }
    calculateAngle(){
        if(this.target != null){
            let futureSteps = 2;
            let nextTargetX = this.target.centerX + this.target.directionX * this.target.speed * futureSteps; //calculate for the next two steps
            let nextTargetY = this.target.centerY + this.target.directionY * this.target.speed * futureSteps; //calculate for the next two steps
            this.angle = Math.atan2(nextTargetY - this.centerY, nextTargetX - this.centerX);
            if(this.leftRocketId != null && map.bullets[this.leftRocketId] != undefined) map.bullets[this.leftRocketId].updateAngle(this.angle, this.centerX, this.centerY, true);
            if(this.rightRocketId != null && map.bullets[this.rightRocketId] != undefined) map.bullets[this.rightRocketId].updateAngle(this.angle, this.centerX, this.centerY, false);
        }
    }
    shoot(){
        if(this.fireNext == 0){
            if(this.leftRocketId != null && map.bullets[this.leftRocketId] != undefined){
                map.bullets[this.leftRocketId].isFired = true;
                this.leftRocketId = null;
                this.fireNext = 1;
            }else if(this.rightRocketId != null && map.bullets[this.rightRocketId] != undefined){
                map.bullets[this.rightRocketId].isFired = true;
                this.rightRocketId = null;
                this.fireNext = 0;
            }
        }else{
            if(this.rightRocketId != null && map.bullets[this.rightRocketId] != undefined){
                map.bullets[this.rightRocketId].isFired = true;
                this.rightRocketId = null;
                this.fireNext = 0;
            }else if(this.leftRocketId != null && map.bullets[this.leftRocketId] != undefined){
                map.bullets[this.leftRocketId].isFired = true;
                this.leftRocketId = null;
                this.fireNext = 1;
            }
        }
    }
    reload(){
        if(this.fireNext == 0){
            if(this.leftRocketId == null){
                this.leftRocketId = map.addRocket(this, true);
            }else if(this.rightRocketId == null){
                this.rightRocketId = map.addRocket(this, false);
            }
        }else{
            if(this.rightRocketId == null){
                this.rightRocketId = map.addRocket(this, false);
            }else if(this.leftRocketId == null){
                this.leftRocketId = map.addRocket(this, true);
            }
        }
    }
    update(time){
        if(this.target != null){
            if(this.target.isDead){
                this.findTarget();
                return;
            }
            this.calculateAngle();
            if(time%this.fireRate == 0){
                this.shoot();
            }else if(time%(this.fireRate/2) == 0){
                this.reload();
            }
            if(getDistance(this.centerX, this.centerY, this.target.centerX, this.target.centerY) > this.reach){
                this.findTarget();
            }
        }else{
            this.findTarget();
            if(this.target == null && time%this.fireRate == 0 && (this.leftRocketId == null || this.rightRocketId == null)){
                this.reload();
            }
        }
    }
}

class BigRocketTurred extends Turret{
    constructor(id_, indexX, indexY, type_){
        super(id_, indexX, indexY, type_);
        this.imageIndex = 229;
        this.reach = 200;
        this.bulletType = 9;
        this.fireRate = 50;
        this.possibleTargets = {4: true, 5: true};
    }
    calculateAngle(){
        if(this.target != null){
            let futureSteps = 2;
            let nextTargetX = this.target.centerX + this.target.directionX * this.target.speed * futureSteps; //calculate for the next two steps
            let nextTargetY = this.target.centerY + this.target.directionY * this.target.speed * futureSteps; //calculate for the next two steps
            this.angle = Math.atan2(nextTargetY - this.centerY, nextTargetX - this.centerX);
            if(this.rocketId != null && map.bullets[this.rocketId] != undefined) map.bullets[this.rocketId].updateAngle(this.angle, this.centerX, this.centerY);
        }
    }
    shoot(){
        if(this.target != null && this.rocketId != null && map.bullets[this.rocketId] != undefined){
            map.bullets[this.rocketId].isFired = true;
            this.rocketId = null;
        }
    }
    reload(){
        if(this.rocketId == null){
            this.rocketId = map.addRocket(this);
        }
    }
    update(time){
        if(this.target != null){
            if(this.target.isDead){
                this.findTarget();
                return;
            }
            this.calculateAngle();
            if(time%this.fireRate == 0){
                this.shoot();
            }else if(time%(this.fireRate/2) == 0){
                this.reload();
            }
            if(getDistance(this.centerX, this.centerY, this.target.centerX, this.target.centerY) > this.reach){
                this.findTarget();
            }
        }else{
            this.findTarget();
        }
    }
}

//initialize turretTypes variable
let turretTypes = {
    0: GreenTurret,
    1: RedTurret,
    2: GreyTurret1,
    3: GreyTurret2,
    4: RocketTurred,
    5: BigRocketTurred,
}

//display indexes
let turretDisplayInfo = {
    0: {
        imageIndex: 249,
        reach: 120,
    },
    1: {
        imageIndex: 250,
        reach: 150,
    },
    2: {
        imageIndex: 226,
        reach: 150,
    },
    3: {
        imageIndex: 203,
        reach: 175,
    },
    4: {
        imageIndex: 205,
        reach: 200,
    },
    5: {
        imageIndex: 206,
        reach: 200,
    },
}