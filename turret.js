let turretTypes = {
    0: {
        imageIndex: 239,
        reach: 200,
        bulletType: 0,
        fireRate: 20,
        possibleTargets: {0: true, 1: true, 2: true, 3:true}
    }
}

class Turret{
    constructor(id_, indexX, indexY){
        this.id = id_;
        this.centerX = indexX*tileSize+tileSize/2;
        this.centerY = indexY*tileSize+tileSize/2;
        this.angle = 0;
        this.fireRate = 10;
        this.bulletType;
        this.target = null;
        this.possibleTargets;
        this.imageIndex = 239;
        this.reach = 3;
    }
    setByType(type){
        this.type = type;
        type = turretTypes[type]
        for(let key in type){
            this[key] = type[key];
        }
    }
    drawSelf(){
        drawRotadedImage(this.imageIndex, this.centerX, this.centerY, this.angle);
        // if(this.secondImageIndex != null) drawRotadedImage(this.secondImageIndex, this.centerX+this.secondImaeOffsetX, this.centerY+this.secondImaeOffsetY, this.angle);
    }
    calculateAngle(){
        if(this.target != null){
            let futureSteps = 2;
            let nextTargetX = this.target.centerX + this.target.directionX * this.target.speed * futureSteps; //calculate for the next two steps
            let nextTargetY = this.target.centerY + this.target.directionY * this.target.speed * futureSteps; //calculate for the next two steps
            this.angle = degreesToRadian(90) + Math.atan2(nextTargetY - this.centerY, nextTargetX - this.centerX);
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
            let newBullet = new Bullet(map.bullets.length, this.id);

            newBullet.setByType(this.bulletType);
            newBullet.setDirectiron(this.angle-degreesToRadian(90));

            newBullet.centerX = this.centerX;
            newBullet.centerY = this.centerY;

            map.bullets.push(newBullet);
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